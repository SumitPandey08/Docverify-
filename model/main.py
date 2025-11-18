import os
import json
from flask import Flask, request, jsonify
from utils.extractor import docExtractor
from utils.image_comparator import ImageComparator
from utils.logger import get_logger
import werkzeug.utils

logger = get_logger(__name__)

app = Flask(__name__)

@app.route("/api/extract", methods=["POST"])
def extract_text_from_image():
    """
    API endpoint to extract text from an uploaded image.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = werkzeug.utils.secure_filename(file.filename)
        upload_folder = "model/uploads"
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        image_path = os.path.join(upload_folder, filename)
        file.save(image_path)

        logger.info(f"Starting document text extraction for: {image_path}")

        # 1. Extract text from the document
        extraction_result = docExtractor(image_path)
        if extraction_result.get("error"):
            logger.error(f"Error during text extraction: {extraction_result['error']}")
            return jsonify(extraction_result), 500

        logger.info("Text extraction successful.")
        return jsonify(extraction_result)

@app.route("/api/cnn", methods=["POST"])
def compare_images():
    """
    API endpoint to compare two images and return a similarity score.
    """
    data = request.get_json()
    image_path1 = data.get('image_path1')
    image_path2 = data.get('image_path2')

    if not image_path1 or not image_path2:
        return jsonify({"error": "Please provide two image paths"}), 400

    logger.info(f"Comparing images: {image_path1} and {image_path2}")

    comparator = ImageComparator()
    similarity_score = float(comparator.compare_two_images(image_path1, image_path2))
    logger.info(f"Image similarity score: {similarity_score}")

    return jsonify({"similarity_score": similarity_score})

if __name__ == "__main__":
    # Create the 'uploads' directory if it doesn't exist
    if not os.path.exists("model/uploads"):
        os.makedirs("model/uploads")
    app.run(port=5001, debug=True)
