
import os
import re
import json
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
from google import genai
from .schemas import DrivingLicenceData
from dotenv import load_dotenv

load_dotenv()

def extract_and_validate_all_data(document_raw_text: str) -> DrivingLicenceData:
    """
    Uses the Gemini API to extract, validate, correct, and perform logical checks.
    """
    
    # --- Robust Environment Variable Check ---
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise RuntimeError(
            "GEMINI_API_KEY environment variable not loaded. Cannot run validation. "
            "Please set it in your environment."
        )

    client = genai.Client(api_key=gemini_api_key)

    # 2. Craft the Prompt for comprehensive extraction, correction, and LOGICAL CHECKING
    # NOTE: The prompt now explicitly asks for the logical checks.
    prompt = f"""
    SYSTEM INSTRUCTION: You are an expert Document Data Extractor and **Advanced Logic Validator** specializing in **Indian Driving Licences**. 
    Your task is to extract, correct, validate, and format ALL required fields from the 'DOCUMENT RAW TEXT'.
    
    **PRIMARY RULES:**
    1. **Correction:** Correct common OCR errors (e.g., 'BHARRSH' to 'BHAWESH').
    2. **Formatting:** Standardize all dates to **DD/MM/YYYY**.
    
    **LOGICAL VALIDATION RULES (CRITICAL):**
    A. **Age Check:** Determine if the person is 18 years or older based on the DOB and today's assumed date (October 2025).
    B. **Validity Check:** Verify the duration (Valid Till minus Date of Issue) is logically sound for a standard DL (5-20 years).
    C. **Consistency Check:** Ensure Date of Issue is after Date of Birth.
    D. **Authenticity Assessment:** If multiple OCR corrections were required AND any of the logical checks (A, B, or C) fail, set 'authenticity_assessment' to 'High Risk'. Otherwise, set it to 'Low Risk'.

    DOCUMENT RAW TEXT (Including all OCR noise from the scan):
    ---
    {document_raw_text}
    ---

    TASK:
    Extract all data points into the final JSON structure, strictly adhering to the schema and performing all logical checks and assessments.
    """

    # 3. Make the API Call with Structured Output Configuration
    response = client.models.generate_content(
        model='gemini-2.5-pro', # PRO is better for complex reasoning and logical checks
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=DrivingLicenceData,
            temperature=0.1 # Keep it low for deterministic reasoning
        )
    )

    # 4. Process the Structured Output
    json_data = json.loads(response.text)
    return DrivingLicenceData(**json_data)


def docExtractor(image_path: str) -> dict:
    """
    OCR extractor to get raw text, which is then sent to Gemini for final cleanup.
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at '{image_path}'")

    final_result = {
        "status": "failure",
        "raw_text": "",
        "final_validated_data": None
    }

    try:
        # Image Processing and Raw OCR Text Extraction
        img = Image.open(image_path)
        img = img.convert("L")
        img = img.filter(ImageFilter.SHARPEN)
        img = ImageEnhance.Contrast(img).enhance(2)
        
        tessdata_dir_config = r'--psm 6' # Assume a single uniform block of text
        raw_text = pytesseract.image_to_string(img, lang="eng", config=tessdata_dir_config)
        clean_text = re.sub(r"\s+", " ", raw_text).strip()
        
        final_result["raw_text"] = clean_text
        final_result["status"] = "success"

        # --- GEMINI VALIDATION INTEGRATION (Single Call) ---
        print("\n[INFO] Sending raw OCR text to Gemini for comprehensive extraction, correction, and LOGICAL CHECKING...")
        
        # Call the Gemini validation function with the raw text
        validated_data_obj = extract_and_validate_all_data(clean_text)
        
        # Store the clean, Pydantic-validated data
        final_result["final_validated_data"] = validated_data_obj.model_dump() 
        
        print(f"[INFO] Gemini Extraction Complete. Name: {validated_data_obj.full_name}, Assessment: {validated_data_obj.authenticity_assessment}")
        
        return final_result

    except pytesseract.TesseractNotFoundError:
        return {"error": "Tesseract not installed. Please install 'tesseract-ocr'."}
    except RuntimeError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"Unexpected error in docExtractor: {e}"}
