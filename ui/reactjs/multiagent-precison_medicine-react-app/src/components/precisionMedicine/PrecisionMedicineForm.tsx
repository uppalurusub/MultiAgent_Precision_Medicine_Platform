// src/components/precisionMedicine/PrecisionMedicineForm.tsx

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type {
  PrecisionMedicineRequest,
} from "../../models/precisionMedicine";

interface PrecisionMedicineFormProps {
  onSubmit: (
    request: PrecisionMedicineRequest,
  ) => Promise<void>;
  loading: boolean;
}

const initialFormData: PrecisionMedicineRequest = {
  patient_id: "PAT-2026-1001",
  patient_name: "John Smith",
  date_of_birth: "1968-04-15",

  demographics: {
    age: 58,
    gender: "Male",
    ethnicity: "Caucasian",
    weight_kg: 82.5,
    height_cm: 178.0,
  },

  diagnoses: [
    {
      diagnosis_code: "C34.90",
      diagnosis_name: "Non-Small Cell Lung Cancer",
      stage: "IIIA",
      severity: "High",
      diagnosis_date: "2025-11-10",
    },
    {
      diagnosis_code: "E11.9",
      diagnosis_name: "Type 2 Diabetes Mellitus",
      stage: "Chronic",
      severity: "Moderate",
      diagnosis_date: "2020-03-15",
    },
  ],

  symptoms: [
    {
      symptom_name: "Persistent Cough",
      duration: "4 months",
      severity: "Moderate",
    },
    {
      symptom_name: "Weight Loss",
      duration: "3 months",
      severity: "Severe",
    },
    {
      symptom_name: "Shortness of Breath",
      duration: "2 months",
      severity: "Moderate",
    },
    {
      symptom_name: "Fatigue",
      duration: "5 months",
      severity: "Moderate",
    },
  ],

  genomic_variants: [
    {
      gene: "EGFR",
      mutation: "L858R",
      variant_type: "SNV",
      pathogenicity: "Pathogenic",
      allele_frequency: 0.42,
    },
    {
      gene: "TP53",
      mutation: "R273H",
      variant_type: "SNV",
      pathogenicity: "Likely Pathogenic",
      allele_frequency: 0.31,
    },
  ],

  biomarkers: [
    {
      biomarker_name: "PD-L1",
      value: "75%",
      interpretation: "High Expression",
    },
    {
      biomarker_name: "Tumor Mutational Burden",
      value: "12 Mut/Mb",
      interpretation: "Moderate",
    },
  ],

  lab_results: [
    {
      test_name: "Hemoglobin",
      result: "12.4",
      reference_range: "13.5-17.5",
      abnormal_flag: true,
    },
    {
      test_name: "White Blood Cell Count",
      result: "7.8",
      reference_range: "4.0-11.0",
      abnormal_flag: false,
    },
    {
      test_name: "HbA1c",
      result: "7.1",
      reference_range: "<5.7",
      abnormal_flag: true,
    },
  ],

  current_medications: [
    {
      medication_name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice Daily",
      indication: "Diabetes",
    },
    {
      medication_name: "Amlodipine",
      dosage: "5 mg",
      frequency: "Once Daily",
      indication: "Hypertension",
    },
  ],

  allergies: ["Penicillin", "Sulfa Drugs"],

  family_history: [
    {
      relation: "Father",
      condition: "Lung Cancer",
    },
    {
      relation: "Mother",
      condition: "Breast Cancer",
    },
  ],

  lifestyle_factors: {
    smoking_status: "Former Smoker",
    alcohol_use: "Occasional",
    exercise_level: "Moderate",
    diet_type: "Balanced",
  },

  clinical_notes:
    "Patient diagnosed with Stage IIIA EGFR-positive NSCLC. PET scan shows localized disease without distant metastasis. Candidate for targeted therapy. ECOG performance status is 1.",

  treatment_goals: [
    "Targeted Therapy",
    "Improve Progression-Free Survival",
    "Reduce Tumor Burden",
    "Maintain Quality of Life",
    "Evaluate Clinical Trial Eligibility",
  ],

  requested_analysis: [
    "genomic_analysis",
    "diagnostic_assessment",
    "treatment_recommendation",
    "clinical_trial_matching",
    "research_summary",
  ],
};

const analysisOptions = [
  "genomic_analysis",
  "diagnostic_assessment",
  "treatment_recommendation",
  "clinical_trial_matching",
  "research_summary",
];

const formatLabel = (value: string): string =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );

const PrecisionMedicineForm = ({
  onSubmit,
  loading,
}: PrecisionMedicineFormProps) => {
  const [formData, setFormData] =
    useState<PrecisionMedicineRequest>(
      initialFormData,
    );

  const handlePatientChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDemographicsChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      demographics: {
        ...previous.demographics,
        [name]:
          name === "age" ||
          name === "weight_kg" ||
          name === "height_cm"
            ? Number(value)
            : value,
      },
    }));
  };

  const handleLifestyleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      lifestyle_factors: {
        ...previous.lifestyle_factors,
        [name]: value,
      },
    }));
  };

  const updateArrayField = <
    K extends
      | "diagnoses"
      | "symptoms"
      | "genomic_variants"
      | "biomarkers"
      | "lab_results"
      | "current_medications"
      | "family_history",
  >(
    field: K,
    index: number,
    property: string,
    value: string | number | boolean,
  ) => {
    setFormData((previous) => {
      const items = [...previous[field]] as Array<
        Record<string, unknown>
      >;

      items[index] = {
        ...items[index],
        [property]: value,
      };

      return {
        ...previous,
        [field]: items,
      } as PrecisionMedicineRequest;
    });
  };

  const removeArrayItem = (
    field:
      | "diagnoses"
      | "symptoms"
      | "genomic_variants"
      | "biomarkers"
      | "lab_results"
      | "current_medications"
      | "family_history",
    index: number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: previous[field].filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const addDiagnosis = () => {
    setFormData((previous) => ({
      ...previous,
      diagnoses: [
        ...previous.diagnoses,
        {
          diagnosis_code: "",
          diagnosis_name: "",
          stage: "",
          severity: "",
          diagnosis_date: "",
        },
      ],
    }));
  };

  const addSymptom = () => {
    setFormData((previous) => ({
      ...previous,
      symptoms: [
        ...previous.symptoms,
        {
          symptom_name: "",
          duration: "",
          severity: "",
        },
      ],
    }));
  };

  const addGenomicVariant = () => {
    setFormData((previous) => ({
      ...previous,
      genomic_variants: [
        ...previous.genomic_variants,
        {
          gene: "",
          mutation: "",
          variant_type: "",
          pathogenicity: "",
          allele_frequency: 0,
        },
      ],
    }));
  };

  const addBiomarker = () => {
    setFormData((previous) => ({
      ...previous,
      biomarkers: [
        ...previous.biomarkers,
        {
          biomarker_name: "",
          value: "",
          interpretation: "",
        },
      ],
    }));
  };

  const addLabResult = () => {
    setFormData((previous) => ({
      ...previous,
      lab_results: [
        ...previous.lab_results,
        {
          test_name: "",
          result: "",
          reference_range: "",
          abnormal_flag: false,
        },
      ],
    }));
  };

  const addMedication = () => {
    setFormData((previous) => ({
      ...previous,
      current_medications: [
        ...previous.current_medications,
        {
          medication_name: "",
          dosage: "",
          frequency: "",
          indication: "",
        },
      ],
    }));
  };

  const addFamilyHistory = () => {
    setFormData((previous) => ({
      ...previous,
      family_history: [
        ...previous.family_history,
        {
          relation: "",
          condition: "",
        },
      ],
    }));
  };

  const handleStringArrayChange = (
    field: "allergies" | "treatment_goals",
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const handleAnalysisChange = (
    analysis: string,
  ) => {
    setFormData((previous) => {
      const selected =
        previous.requested_analysis.includes(analysis);

      return {
        ...previous,
        requested_analysis: selected
          ? previous.requested_analysis.filter(
              (item) => item !== analysis,
            )
          : [
              ...previous.requested_analysis,
              analysis,
            ],
      };
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onSubmit(formData);
  };

  return (
    <form
      className="precision-form"
      onSubmit={handleSubmit}
    >
      <div className="form-header">
        <h2>Patient Clinical Profile</h2>
        <p>
          Configure patient, clinical, genomic, and
          precision medicine analysis information.
        </p>
      </div>

      <section className="form-section">
        <h3>Patient Information</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Patient ID</label>
            <input
              name="patient_id"
              value={formData.patient_id}
              onChange={handlePatientChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Patient Name</label>
            <input
              name="patient_name"
              value={formData.patient_name}
              onChange={handlePatientChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handlePatientChange}
              required
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <h3>Demographics</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.demographics.age}
              onChange={handleDemographicsChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.demographics.gender}
              onChange={handleDemographicsChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ethnicity</label>
            <input
              name="ethnicity"
              value={formData.demographics.ethnicity}
              onChange={handleDemographicsChange}
            />
          </div>

          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              name="weight_kg"
              value={formData.demographics.weight_kg}
              onChange={handleDemographicsChange}
            />
          </div>

          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              step="0.1"
              name="height_cm"
              value={formData.demographics.height_cm}
              onChange={handleDemographicsChange}
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Diagnoses</h3>

          <button
            type="button"
            className="add-button"
            onClick={addDiagnosis}
          >
            + Add Diagnosis
          </button>
        </div>

        {formData.diagnoses.map(
          (diagnosis, index) => (
            <div
              className="dynamic-card"
              key={`diagnosis-${index}`}
            >
              <div className="form-grid">
                {Object.entries(diagnosis).map(
                  ([key, value]) => (
                    <div
                      className="form-group"
                      key={key}
                    >
                      <label>{formatLabel(key)}</label>

                      <input
                        type={
                          key === "diagnosis_date"
                            ? "date"
                            : "text"
                        }
                        value={String(value)}
                        onChange={(event) =>
                          updateArrayField(
                            "diagnoses",
                            index,
                            key,
                            event.target.value,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeArrayItem(
                    "diagnoses",
                    index,
                  )
                }
              >
                Remove
              </button>
            </div>
          ),
        )}
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Symptoms</h3>

          <button
            type="button"
            className="add-button"
            onClick={addSymptom}
          >
            + Add Symptom
          </button>
        </div>

        {formData.symptoms.map((symptom, index) => (
          <div
            className="dynamic-card"
            key={`symptom-${index}`}
          >
            <div className="form-grid">
              {Object.entries(symptom).map(
                ([key, value]) => (
                  <div
                    className="form-group"
                    key={key}
                  >
                    <label>{formatLabel(key)}</label>

                    <input
                      value={String(value)}
                      onChange={(event) =>
                        updateArrayField(
                          "symptoms",
                          index,
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </div>
                ),
              )}
            </div>

            <button
              type="button"
              className="remove-button"
              onClick={() =>
                removeArrayItem("symptoms", index)
              }
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Genomic Variants</h3>

          <button
            type="button"
            className="add-button"
            onClick={addGenomicVariant}
          >
            + Add Variant
          </button>
        </div>

        {formData.genomic_variants.map(
          (variant, index) => (
            <div
              className="dynamic-card"
              key={`variant-${index}`}
            >
              <div className="form-grid">
                {Object.entries(variant).map(
                  ([key, value]) => (
                    <div
                      className="form-group"
                      key={key}
                    >
                      <label>{formatLabel(key)}</label>

                      <input
                        type={
                          key === "allele_frequency"
                            ? "number"
                            : "text"
                        }
                        step="0.01"
                        value={String(value)}
                        onChange={(event) =>
                          updateArrayField(
                            "genomic_variants",
                            index,
                            key,
                            key === "allele_frequency"
                              ? Number(
                                  event.target.value,
                                )
                              : event.target.value,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeArrayItem(
                    "genomic_variants",
                    index,
                  )
                }
              >
                Remove
              </button>
            </div>
          ),
        )}
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Biomarkers</h3>

          <button
            type="button"
            className="add-button"
            onClick={addBiomarker}
          >
            + Add Biomarker
          </button>
        </div>

        {formData.biomarkers.map(
          (biomarker, index) => (
            <div
              className="dynamic-card"
              key={`biomarker-${index}`}
            >
              <div className="form-grid">
                {Object.entries(biomarker).map(
                  ([key, value]) => (
                    <div
                      className="form-group"
                      key={key}
                    >
                      <label>{formatLabel(key)}</label>

                      <input
                        value={String(value)}
                        onChange={(event) =>
                          updateArrayField(
                            "biomarkers",
                            index,
                            key,
                            event.target.value,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeArrayItem(
                    "biomarkers",
                    index,
                  )
                }
              >
                Remove
              </button>
            </div>
          ),
        )}
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Lab Results</h3>

          <button
            type="button"
            className="add-button"
            onClick={addLabResult}
          >
            + Add Lab Result
          </button>
        </div>

        {formData.lab_results.map(
          (lab, index) => (
            <div
              className="dynamic-card"
              key={`lab-${index}`}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>Test Name</label>
                  <input
                    value={lab.test_name}
                    onChange={(event) =>
                      updateArrayField(
                        "lab_results",
                        index,
                        "test_name",
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Result</label>
                  <input
                    value={lab.result}
                    onChange={(event) =>
                      updateArrayField(
                        "lab_results",
                        index,
                        "result",
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Reference Range</label>
                  <input
                    value={lab.reference_range}
                    onChange={(event) =>
                      updateArrayField(
                        "lab_results",
                        index,
                        "reference_range",
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={lab.abnormal_flag}
                      onChange={(event) =>
                        updateArrayField(
                          "lab_results",
                          index,
                          "abnormal_flag",
                          event.target.checked,
                        )
                      }
                    />
                    Abnormal Result
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeArrayItem(
                    "lab_results",
                    index,
                  )
                }
              >
                Remove
              </button>
            </div>
          ),
        )}
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Current Medications</h3>

          <button
            type="button"
            className="add-button"
            onClick={addMedication}
          >
            + Add Medication
          </button>
        </div>

        {formData.current_medications.map(
          (medication, index) => (
            <div
              className="dynamic-card"
              key={`medication-${index}`}
            >
              <div className="form-grid">
                {Object.entries(medication).map(
                  ([key, value]) => (
                    <div
                      className="form-group"
                      key={key}
                    >
                      <label>{formatLabel(key)}</label>

                      <input
                        value={String(value)}
                        onChange={(event) =>
                          updateArrayField(
                            "current_medications",
                            index,
                            key,
                            event.target.value,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeArrayItem(
                    "current_medications",
                    index,
                  )
                }
              >
                Remove
              </button>
            </div>
          ),
        )}
      </section>

      <section className="form-section">
        <h3>Allergies</h3>

        <div className="form-group">
          <label>
            Allergies — comma separated
          </label>

          <input
            value={formData.allergies.join(", ")}
            onChange={(event) =>
              handleStringArrayChange(
                "allergies",
                event.target.value,
              )
            }
          />
        </div>
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h3>Family History</h3>

          <button
            type="button"
            className="add-button"
            onClick={addFamilyHistory}
          >
            + Add Family History
          </button>
        </div>

        {formData.family_history.map(
          (history, index) => (
            <div
              className="dynamic-card"
              key={`history-${index}`}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>Relation</label>

                  <input
                    value={history.relation}
                    onChange={(event) =>
                      updateArrayField(
                        "family_history",
                        index,
                        "relation",
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Condition</label>

                  <input
                    value={history.condition}
                    onChange={(event) =>
                      updateArrayField(
                        "family_history",
                        index,
                        "condition",
                        event.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  removeArrayItem(
                    "family_history",
                    index,
                  )
                }
              >
                Remove
              </button>
            </div>
          ),
        )}
      </section>

      <section className="form-section">
        <h3>Lifestyle Factors</h3>

        <div className="form-grid">
          {Object.entries(
            formData.lifestyle_factors,
          ).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label>{formatLabel(key)}</label>

              <input
                name={key}
                value={value}
                onChange={handleLifestyleChange}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="form-section">
        <h3>Clinical Notes</h3>

        <div className="form-group">
          <textarea
            rows={6}
            value={formData.clinical_notes}
            onChange={(event) =>
              setFormData((previous) => ({
                ...previous,
                clinical_notes: event.target.value,
              }))
            }
          />
        </div>
      </section>

      <section className="form-section">
        <h3>Treatment Goals</h3>

        <div className="form-group">
          <label>
            Treatment Goals — comma separated
          </label>

          <textarea
            rows={4}
            value={formData.treatment_goals.join(
              ", ",
            )}
            onChange={(event) =>
              handleStringArrayChange(
                "treatment_goals",
                event.target.value,
              )
            }
          />
        </div>
      </section>

      <section className="form-section">
        <h3>Requested Analysis</h3>

        <div className="analysis-options">
          {analysisOptions.map((analysis) => (
            <label
              className="analysis-option"
              key={analysis}
            >
              <input
                type="checkbox"
                checked={formData.requested_analysis.includes(
                  analysis,
                )}
                onChange={() =>
                  handleAnalysisChange(analysis)
                }
              />

              <span>{formatLabel(analysis)}</span>
            </label>
          ))}
        </div>
      </section>

      <button
        className="analyze-button"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Generating Precision Medicine Plan..."
          : "Generate Precision Medicine Plan"}
      </button>
    </form>
  );
};

export default PrecisionMedicineForm;