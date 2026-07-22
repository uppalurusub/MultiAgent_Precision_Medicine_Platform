import streamlit as st
from components.response_view import render_api_response
from utils.formatters import humanize_key, format_value

PREFERRED = [
    "genomic_analysis",
    "diagnostic_assessment",
    "treatment_recommendation",
    "treatment_recommendations",
    "clinical_trial_matching",
    "research_summary",
    "research_evidence",
    "tumor_board_recommendation",
]

def _render_section(title, value):
    st.subheader(title)
    if isinstance(value, dict):
        cols = st.columns(2)
        scalar_items = [(k, v) for k, v in value.items()
                        if not isinstance(v, (dict, list))]
        for i, (key, item) in enumerate(scalar_items):
            with cols[i % 2]:
                st.markdown(
                    f"""<div class="detail-card">
                    <span class="detail-label">{humanize_key(key)}:</span>
                    <span class="detail-value">{format_value(item)}</span>
                    </div>""",
                    unsafe_allow_html=True,
                )
        for key, item in value.items():
            if isinstance(item, (dict, list)):
                with st.expander(humanize_key(key), expanded=True):
                    render_api_response({key: item})
    elif isinstance(value, list):
        render_api_response({"results": value})
    else:
        st.write(format_value(value))

def render_simulation_results(response):
    st.markdown("## Precision Medicine Analysis Results")
    rendered = set()
    for key in PREFERRED:
        if key in response:
            _render_section(humanize_key(key), response[key])
            rendered.add(key)
    remaining = {k: v for k, v in response.items() if k not in rendered}
    if remaining:
        st.markdown("### Additional Results")
        render_api_response(remaining)

def render_simulation_status(response):
    st.markdown("## Platform Status / Version")
    if not response:
        st.info("No status data available.")
        return
    cols = st.columns(min(len(response), 3))
    for i, (key, value) in enumerate(response.items()):
        with cols[i % len(cols)]:
            st.metric(humanize_key(key), format_value(value))
