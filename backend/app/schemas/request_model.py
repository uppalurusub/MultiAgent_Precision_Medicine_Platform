from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class Demographics(BaseModel):
    age: int
    gender: str
    ethnicity: Optional[str] = None
    weight_kg: Optional[float] = None
    height_cm: Optional[float] = None


class Diagnosis(BaseModel):
    diagnosis_code: str
    diagnosis_name: str
    stage: Optional[str] = None
    severity: Optional[str] = None
    diagnosis_date: Optional[date] = None


class Symptom(BaseModel):
    symptom_name: str
    duration: Optional[str] = None
    severity: Optional[str] = None


class GenomicVariant(BaseModel):
    gene: str
    mutation: str
    variant_type: Optional[str] = None
    pathogenicity: str
    allele_frequency: Optional[float] = None


class Biomarker(BaseModel):
    biomarker_name: str
    value: str
    interpretation: Optional[str] = None


class LabResult(BaseModel):
    test_name: str
    result: str
    reference_range: Optional[str] = None
    abnormal_flag: Optional[bool] = False


class Medication(BaseModel):
    medication_name: str
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    indication: Optional[str] = None


class FamilyHistory(BaseModel):
    relation: str
    condition: str


class LifestyleFactors(BaseModel):
    smoking_status: Optional[str] = None
    alcohol_use: Optional[str] = None
    exercise_level: Optional[str] = None
    diet_type: Optional[str] = None


class PrecisionMedicineRequest(BaseModel):

    patient_id: str = Field(..., description="Unique patient identifier")

    patient_name: str

    date_of_birth: Optional[date] = None

    demographics: Demographics

    diagnoses: List[Diagnosis]

    symptoms: List[Symptom]

    genomic_variants: List[GenomicVariant]

    biomarkers: Optional[List[Biomarker]] = []

    lab_results: Optional[List[LabResult]] = []

    current_medications: Optional[List[Medication]] = []

    allergies: Optional[List[str]] = []

    family_history: Optional[List[FamilyHistory]] = []

    lifestyle_factors: Optional[LifestyleFactors] = None

    clinical_notes: Optional[str] = None

    treatment_goals: Optional[List[str]] = []

    requested_analysis: Optional[List[str]] = [
        "genomic_analysis",
        "diagnostic_assessment",
        "treatment_recommendation",
        "clinical_trial_matching",
        "research_summary"
    ]