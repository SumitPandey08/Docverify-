
from pydantic import BaseModel, Field
from typing import Optional

class LogicalChecks(BaseModel):
    """Container for logical and cross-field validation results."""
    
    is_valid_age: bool = Field(
        description="True if the Date of Birth indicates the person is 18 years or older as of today's date (Oct 2025)."
    )
    validity_duration_check: str = Field(
        description="Check if the period between 'Valid Till' and 'Date of Issue' is a standard duration (e.g., 20 years for a fresh non-transport license). Report 'Inconsistent' if duration is less than 5 years or more than 20 years."
    )
    is_data_consistent: bool = Field(
        description="True if all extracted dates (DOI, Valid Till, DOB) are temporally logical (e.g., DOI is after DOB). False if any date is logically impossible."
    )

class DrivingLicenceData(BaseModel):
    """Schema for all validated, corrected, and logically checked Indian DL data."""
    
    # Core Extracted Fields
    full_name: str = Field(description="The individual's full name, corrected for OCR errors.")
    father_spouse_name: Optional[str] = Field(description="The Father's or Spouse's name, if present.")
    date_of_birth: str = Field(description="The date of birth in 'DD/MM/YYYY' format.")
    dl_number: str = Field(description="The complete Driving Licence Number.")
    date_of_issue: str = Field(description="The date the DL was issued in 'DD/MM/YYYY' format.")
    valid_till: str = Field(description="The expiration date of the DL in 'DD/MM/YYYY' format.")
    blood_group: Optional[str] = Field(description="The Blood Group (e.g., 'A+', 'O-').")
    address: str = Field(description="The full residence address, cleaned of line breaks.")
    issuing_authority: str = Field(description="The RTO or Issuing Authority (e.g., 'MAHARASHTRA' or 'RTO NASHIK').")
    
    # New Nested Validation/Metadata Fields
    logical_checks: LogicalChecks # Nested Pydantic model for logical rules
    
    authenticity_assessment: str = Field(
        description="A subjective assessment based on the text structure and content. Report 'High Risk' if multiple OCR errors were corrected AND a logical check failed. Report 'Low Risk' otherwise."
    )
    validation_notes: str = Field(
        description="A summary of all corrections made and all validation outcomes."
    )

class NameValidationResult(BaseModel):
    """Schema for the validated and corrected name extraction."""
    
    full_name: str = Field(
        description="The final, correctly spelled, and capitalized full name extracted from the document."
    )
    initial_extraction: str = Field(
        description="The raw name data that was initially extracted by your OCR/tool (for logging)."
    )
    confidence_score: float = Field(
        description="A confidence score from 0.0 to 1.0, where 1.0 is highest confidence in the full_name."
    )
    validation_notes: str = Field(
        description="A brief note on any correction made. Write 'No correction necessary' if none was needed."
    )
    is_valid: bool = Field(
        description="True if the name required no meaningful correction, False otherwise."
    )

