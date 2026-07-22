// src/types/precisionMedicine.ts

// ============================================================
// Common Types
// ============================================================

export type Severity =
  | "Low"
  | "Moderate"
  | "High"
  | "Severe"
  | string;

export type Gender =
  | "Male"
  | "Female"
  | "Other"
  | string;

export type VariantType =
  | "SNV"
  | "INDEL"
  | "CNV"
  | "Fusion"
  | string;

export type Pathogenicity =
  | "Pathogenic"
  | "Likely Pathogenic"
  | "Uncertain Significance"
  | "Likely Benign"
  | "Benign"
  | string;

export type Priority =
  | "High"
  | "Medium"
  | "Low"
  | string;

export type RiskLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Critical"
  | string;

export type PrecisionMedicineStatus =
  | "SUCCESS"
  | "FAILED"
  | "PROCESSING"
  | string;


// ============================================================
// Precision Medicine Request Types
// ============================================================

export interface PatientDemographics {
  age: number;
  gender: Gender;
  ethnicity: string;
  weight_kg: number;
  height_cm: number;
}

export interface Diagnosis {
  diagnosis_code: string;
  diagnosis_name: string;
  stage: string;
  severity: Severity;
  diagnosis_date: string;
}

export interface Symptom {
  symptom_name: string;
  duration: string;
  severity: Severity;
}

export interface GenomicVariant {
  gene: string;
  mutation: string;
  variant_type: VariantType;
  pathogenicity: Pathogenicity;
  allele_frequency: number;
}

export interface Biomarker {
  biomarker_name: string;
  value: string;
  interpretation: string;
}

export interface LabResult {
  test_name: string;
  result: string;
  reference_range: string;
  abnormal_flag: boolean;
}

export interface CurrentMedication {
  medication_name: string;
  dosage: string;
  frequency: string;
  indication: string;
}

export interface FamilyHistory {
  relation: string;
  condition: string;
}

export interface LifestyleFactors {
  smoking_status: string;
  alcohol_use: string;
  exercise_level: string;
  diet_type: string;
}

export type RequestedAnalysis =
  | "genomic_analysis"
  | "diagnostic_assessment"
  | "treatment_recommendation"
  | "clinical_trial_matching"
  | "research_summary"
  | string;

export interface PrecisionMedicineRequest {
  patient_id: string;
  patient_name: string;
  date_of_birth: string;

  demographics: PatientDemographics;

  diagnoses: Diagnosis[];

  symptoms: Symptom[];

  genomic_variants: GenomicVariant[];

  biomarkers: Biomarker[];

  lab_results: LabResult[];

  current_medications: CurrentMedication[];

  allergies: string[];

  family_history: FamilyHistory[];

  lifestyle_factors: LifestyleFactors;

  clinical_notes: string;

  treatment_goals: string[];

  requested_analysis: RequestedAnalysis[];
}


// ============================================================
// Precision Medicine Response Types
// ============================================================

export interface GenomicFinding {
  gene: string;
  mutation: string;
  significance: string;
  therapeutic_implication: string;
}

export interface BiomarkerInterpretation {
  biomarker_name: string;
  value: string;
  interpretation: string;
  clinical_relevance: string;
}

export interface DiagnosticAssessment {
  primary_diagnosis: string;
  disease_stage: string;
  confidence_score: number;
  rationale: string;
}

export interface TreatmentRecommendation {
  treatment_name: string;
  treatment_type: string;
  priority: Priority;
  rationale: string;
  expected_benefit: string;
}

export interface DrugGeneInteraction {
  medication: string;
  gene: string;
  interaction: string;
  recommendation: string;
}

export interface ClinicalTrialMatch {
  trial_id: string;
  trial_title: string;
  eligibility_score: number;
  recruiting_status: string;
  rationale: string;
}

export interface ResearchEvidence {
  title: string;
  evidence_level: string;
  summary: string;
  publication_year: number;
}

export interface RiskAssessment {
  risk_type: string;
  risk_score: number;
  risk_level: RiskLevel;
  recommendation: string;
}

export interface TumorBoardRecommendation {
  consensus_decision: string;
  rationale: string;
  participating_agents: string[];
}

export interface PrecisionMedicineResponse {
  patient_id: string;

  patient_name: string;

  case_summary: string;

  genomic_findings: GenomicFinding[];

  biomarker_interpretations: BiomarkerInterpretation[];

  diagnostic_assessment: DiagnosticAssessment;

  treatment_recommendations: TreatmentRecommendation[];

  drug_gene_interactions: DrugGeneInteraction[];

  clinical_trial_matches: ClinicalTrialMatch[];

  research_evidence: ResearchEvidence[];

  risk_assessments: RiskAssessment[];

  tumor_board_recommendation: TumorBoardRecommendation;

  final_personalized_care_plan: string;

  monitoring_plan: string[];

  follow_up_recommendations: string[];

  confidence_score: number;

  generated_by_agents: string[];

  execution_time_seconds: number;

  status: PrecisionMedicineStatus;
}


// ============================================================
// API Error Response
// ============================================================

export interface ApiErrorResponse {
  detail?: string;
}


// ============================================================
// Form Helper Types
// ============================================================

export interface PrecisionMedicineFormState {
  request: PrecisionMedicineRequest;
  isSubmitting: boolean;
  error: string | null;
}


// ============================================================
// Initial Request State
// ============================================================

export const initialPrecisionMedicineRequest: PrecisionMedicineRequest = {
  patient_id: "",
  patient_name: "",
  date_of_birth: "",

  demographics: {
    age: 0,
    gender: "",
    ethnicity: "",
    weight_kg: 0,
    height_cm: 0,
  },

  diagnoses: [],

  symptoms: [],

  genomic_variants: [],

  biomarkers: [],

  lab_results: [],

  current_medications: [],

  allergies: [],

  family_history: [],

  lifestyle_factors: {
    smoking_status: "",
    alcohol_use: "",
    exercise_level: "",
    diet_type: "",
  },

  clinical_notes: "",

  treatment_goals: [],

  requested_analysis: [],
};