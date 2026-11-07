import copy
import streamlit as st

def _text_list(label, values, key):
    text = st.text_area(label, value="\n".join(values), key=key, height=120)
    return [x.strip() for x in text.splitlines() if x.strip()]

def render_simulation_form(default_request):
    data = copy.deepcopy(default_request)
    st.markdown("## Patient Precision Medicine Request")
    tabs = st.tabs([
        "Patient", "Clinical", "Genomics", "Labs & Medications",
        "History & Lifestyle", "Analysis"
    ])

    with tabs[0]:
        c1, c2, c3 = st.columns(3)
        data["patient_id"] = c1.text_input("Patient ID", data["patient_id"])
        data["patient_name"] = c2.text_input("Patient Name", data["patient_name"])
        data["date_of_birth"] = c3.text_input("Date of Birth", data["date_of_birth"])
        d = data["demographics"]
        c1, c2, c3, c4, c5 = st.columns(5)
        d["age"] = c1.number_input("Age", 0, 130, int(d["age"]))
        d["gender"] = c2.text_input("Gender", d["gender"])
        d["ethnicity"] = c3.text_input("Ethnicity", d["ethnicity"])
        d["weight_kg"] = c4.number_input("Weight (kg)", 0.0, value=float(d["weight_kg"]))
        d["height_cm"] = c5.number_input("Height (cm)", 0.0, value=float(d["height_cm"]))

    with tabs[1]:
        st.subheader("Diagnoses")
        data["diagnoses"] = st.data_editor(data["diagnoses"], num_rows="dynamic",
                                           use_container_width=True, key="diagnoses")
        st.subheader("Symptoms")
        data["symptoms"] = st.data_editor(data["symptoms"], num_rows="dynamic",
                                          use_container_width=True, key="symptoms")
        data["clinical_notes"] = st.text_area(
            "Clinical Notes", data["clinical_notes"], height=160
        )

    with tabs[2]:
        st.subheader("Genomic Variants")
        data["genomic_variants"] = st.data_editor(
            data["genomic_variants"], num_rows="dynamic",
            use_container_width=True, key="genomic_variants"
        )
        st.subheader("Biomarkers")
        data["biomarkers"] = st.data_editor(
            data["biomarkers"], num_rows="dynamic",
            use_container_width=True, key="biomarkers"
        )

    with tabs[3]:
        st.subheader("Lab Results")
        data["lab_results"] = st.data_editor(
            data["lab_results"], num_rows="dynamic",
            use_container_width=True, key="lab_results"
        )
        st.subheader("Current Medications")
        data["current_medications"] = st.data_editor(
            data["current_medications"], num_rows="dynamic",
            use_container_width=True, key="current_medications"
        )

    with tabs[4]:
        data["allergies"] = _text_list(
            "Allergies (one per line)", data["allergies"], "allergies"
        )
        st.subheader("Family History")
        data["family_history"] = st.data_editor(
            data["family_history"], num_rows="dynamic",
            use_container_width=True, key="family_history"
        )
        l = data["lifestyle_factors"]
        c1, c2 = st.columns(2)
        l["smoking_status"] = c1.text_input("Smoking Status", l["smoking_status"])
        l["alcohol_use"] = c2.text_input("Alcohol Use", l["alcohol_use"])
        l["exercise_level"] = c1.text_input("Exercise Level", l["exercise_level"])
        l["diet_type"] = c2.text_input("Diet Type", l["diet_type"])

    with tabs[5]:
        data["treatment_goals"] = _text_list(
            "Treatment Goals (one per line)",
            data["treatment_goals"], "treatment_goals"
        )
        available = [
            "genomic_analysis", "diagnostic_assessment",
            "treatment_recommendation", "clinical_trial_matching",
            "research_summary"
        ]
        data["requested_analysis"] = st.multiselect(
            "Requested Analysis", available,
            default=data["requested_analysis"]
        )

    with st.expander("Request JSON Preview"):
        st.json(data)
    submitted = st.button(
        "🚀 Generate Precision Medicine Plan",
        type="primary", use_container_width=True
    )
    return submitted, data

def render_status_form():
    st.markdown("## Platform Status")
    return st.button("🔄 Check Platform Status", type="primary",
                     use_container_width=True)
