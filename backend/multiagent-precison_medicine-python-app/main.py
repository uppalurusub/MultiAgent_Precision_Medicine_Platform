from contextlib import asynccontextmanager
from datetime import datetime
import traceback
import uuid

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from loguru import logger

from routers.precision_medicine_router import router
from fastapi.middleware.cors import (
    CORSMiddleware,
)

# ==========================================================
# Application Lifespan
# ==========================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info(
        "=" * 80
    )
    logger.info(
        "Starting Multi-Agent Precision Medicine Platform"
    )
    logger.info(
        "AutoGen Version: 0.7.5"
    )
    logger.info(
        "=" * 80
    )

    yield

    logger.info(
        "=" * 80
    )
    logger.info(
        "Stopping Multi-Agent Precision Medicine Platform"
    )
    logger.info(
        "=" * 80
    )


# ==========================================================
# FastAPI Application
# ==========================================================

app = FastAPI(
    title="Multi-Agent Precision Medicine Platform",
    description="""
    AI-Powered Precision Medicine Platform

    Agents:
    - Genomics Agent
    - Diagnosis Agent
    - Treatment Agent
    - Research Agent

    Features:
    - Personalized Treatment
    - Clinical Decision Support
    - Clinical Trial Matching
    - Pharmacogenomics
    - Evidence-Based Recommendations
    """,
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# Middleware
# ==========================================================

@app.middleware("http")
async def request_logging_middleware(
    request: Request,
    call_next
):
    request_id = str(uuid.uuid4())

    start_time = datetime.now()

    logger.info(
        f"[{request_id}] "
        f"Incoming Request | "
        f"Method={request.method} | "
        f"Path={request.url.path}"
    )

    try:

        response = await call_next(request)

        execution_time = (
            datetime.now() - start_time
        ).total_seconds()

        logger.success(
            f"[{request_id}] "
            f"Completed | "
            f"Status={response.status_code} | "
            f"Execution={execution_time:.2f}s"
        )

        response.headers["X-Request-ID"] = request_id

        return response

    except Exception as ex:

        execution_time = (
            datetime.now() - start_time
        ).total_seconds()

        logger.exception(
            f"[{request_id}] "
            f"Failed | "
            f"Execution={execution_time:.2f}s | "
            f"Error={str(ex)}"
        )

        raise ex


# ==========================================================
# Global Exception Handler
# ==========================================================

@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception
):

    logger.error(
        f"Unhandled Exception: {str(exc)}"
    )

    logger.error(
        traceback.format_exc()
    )

    return JSONResponse(
        status_code=500,
        content={
            "status": "FAILED",
            "message": str(exc)
        }
    )


# ==========================================================
# Root Endpoint
# ==========================================================

@app.get("/")
async def root():

    logger.info(
        "Root Endpoint Invoked"
    )

    return {
        "application":
            "Multi-Agent Precision Medicine Platform",
        "version":
            "1.0.0",
        "autogen_version":
            "0.7.5",
        "status":
            "RUNNING"
    }


# ==========================================================
# Health Check
# ==========================================================

@app.get("/health")
async def health():

    logger.info(
        "Health Check Invoked"
    )

    return {
        "status": "UP",
        "application":
            "Multi-Agent Precision Medicine Platform"
    }


# ==========================================================
# Register Routers
# ==========================================================

app.include_router(
    router,
    prefix="/api/v1",
    tags=["Precision Medicine"]
)