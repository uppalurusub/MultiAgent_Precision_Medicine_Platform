import streamlit as st
from utils.formatters import format_value, humanize_key

def render_api_error(error):
    st.error("API request failed")
    st.code(str(error))

def _render_mapping(data):
    for key, value in data.items():
        label = humanize_key(key)
        if isinstance(value, dict):
            with st.expander(label, expanded=True):
                _render_mapping(value)
        elif isinstance(value, list):
            st.markdown(f"**{label}:**")
            for index, item in enumerate(value, 1):
                if isinstance(item, dict):
                    with st.container(border=True):
                        st.markdown(f"**Item {index}**")
                        _render_mapping(item)
                else:
                    st.markdown(f"- {format_value(item)}")
        else:
            st.markdown(f"**{label}:** {format_value(value)}")

def render_api_response(response):
    if not response:
        st.info("No API response available.")
        return
    _render_mapping(response)
    with st.expander("Raw API Response"):
        st.json(response)
