import json
from pathlib import Path
import streamlit as st

from api.precision_medicine_api import (
    health_check, simulate_patient_digital_twin, get_simulation_status
)
from components.agent_results import (
    render_simulation_results, render_simulation_status
)
from components.request_form import render_simulation_form, render_status_form
from components.response_view import render_api_error
from components.sidebar import render_sidebar

st.set_page_config(
    page_title="Healthcare Digital Twin | Precision Medicine",
    page_icon="🧬", layout="wide"
)

st.markdown("""
<style>
.block-container {padding-top: 1.5rem; padding-bottom: 3rem; max-width: 1500px;}
.detail-card {background:#fff; border:1px solid #e2e8f0; border-radius:10px;
padding:14px 16px; margin:6px 0; min-height:58px;}
.detail-label {font-weight:700; margin-right:8px; color:#334155;}
.detail-value {color:#0f172a;}
div[data-testid="stMetric"] {background:#fff; border:1px solid #e2e8f0;
padding:16px; border-radius:12px;}
</style>
""", unsafe_allow_html=True)

DEFAULT_REQUEST = json.loads(
    (Path(__file__).parent / "precision_medicine_request.json").read_text()
)

page, base_url = render_sidebar()
st.title("🧬 Healthcare Digital Twin")
st.caption("Multi-Agent Precision Medicine Platform")

if page == "Precision Medicine Analysis":
    try:
        health = health_check(base_url)
        st.success(f"API Health: {health.get('status', 'UNKNOWN')} — "
                   f"{health.get('service', '')}")
    except Exception as exc:
        st.warning(f"Health check unavailable: {exc}")

    submitted, payload = render_simulation_form(DEFAULT_REQUEST)
    if submitted:
        try:
            with st.spinner("Agents are generating the precision medicine plan..."):
                response = simulate_patient_digital_twin(base_url, payload)
            st.session_state["simulation_response"] = response
            st.success("Precision medicine analysis completed.")
        except Exception as exc:
            render_api_error(exc)

    if st.session_state.get("simulation_response"):
        render_simulation_results(st.session_state["simulation_response"])
else:
    if render_status_form():
        try:
            with st.spinner("Checking platform..."):
                health = health_check(base_url)
                version = get_simulation_status(base_url)
            render_simulation_status({**health, **version})
        except Exception as exc:
            render_api_error(exc)
