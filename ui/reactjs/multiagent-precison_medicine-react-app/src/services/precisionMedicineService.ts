// src/services/precisionMedicineService.ts

import axios from "axios";

import { generatePrecisionMedicinePlan } from "../api/precisionMedicineApi";

import type {
  ApiErrorResponse,
  PrecisionMedicineRequest,
  PrecisionMedicineResponse,
} from "../models/precisionMedicine";

/**
 * Service responsible for Precision Medicine business/API orchestration.
 */
class PrecisionMedicineService {
  /**
   * Generates a personalized precision medicine plan.
   *
   * POST /api/v1/precision-medicine
   *
   * @param request Patient clinical, genomic, and treatment data.
   * @returns Multi-agent precision medicine analysis.
   */
  async generatePrecisionMedicinePlan(
    request: PrecisionMedicineRequest,
  ): Promise<PrecisionMedicineResponse> {
    try {
      return await generatePrecisionMedicinePlan(request);
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const errorMessage =
          error.response?.data?.detail ??
          error.message ??
          "Precision medicine analysis failed.";

        throw new Error(errorMessage);
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error(
        "An unexpected error occurred while generating the precision medicine plan.",
      );
    }
  }
}

export const precisionMedicineService =
  new PrecisionMedicineService();