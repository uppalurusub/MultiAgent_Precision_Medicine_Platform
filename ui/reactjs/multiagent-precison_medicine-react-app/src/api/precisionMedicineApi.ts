// src/api/precisionMedicineApi.ts

import apiClient from "./apiClient";

import type {
  PrecisionMedicineRequest,
  PrecisionMedicineResponse,
} from "../models/precisionMedicine";

const PRECISION_MEDICINE_ENDPOINT =
  "/api/v1/precision-medicine";

/**
 * Generates a personalized precision medicine plan.
 *
 * POST /api/v1/precision-medicine
 *
 * @param request Precision medicine patient and clinical data.
 * @returns Generated multi-agent precision medicine response.
 */
export const generatePrecisionMedicinePlan = async (
  request: PrecisionMedicineRequest,
): Promise<PrecisionMedicineResponse> => {
  const response =
    await apiClient.post<PrecisionMedicineResponse>(
      PRECISION_MEDICINE_ENDPOINT,
      request,
    );

  return response.data;
};