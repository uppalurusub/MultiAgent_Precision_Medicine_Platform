import streamlit as st

def render_sidebar():
    with st.sidebar:
        st.title("🧬 Precision Medicine")
        st.caption("Multi-Agent Healthcare Digital Twin")
        base_url = st.text_input(
            "FastAPI Base URL",
            value=st.session_state.get("base_url", "http://127.0.0.1:8000/api/v1"),
        )
        st.session_state.base_url = base_url.rstrip("/")
        st.divider()
        page = st.radio(
            "Navigation",
            ["Precision Medicine Analysis", "Platform Status"],
        )
        st.divider()
        st.info(
            "Router mapping:\n\n"
            "POST /precision-medicine\n\n"
            "GET /precision-medicine/health\n\n"
            "GET /precision-medicine/version"
        )
        return page, st.session_state.base_url
