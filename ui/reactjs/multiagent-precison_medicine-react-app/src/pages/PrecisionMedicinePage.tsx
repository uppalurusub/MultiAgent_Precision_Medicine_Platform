import { useState } from "react";

import PrecisionMedicineForm from "../components/precisionMedicine/PrecisionMedicineForm";
import PrecisionMedicineLoader from "../components/precisionMedicine/PrecisionMedicineLoader";
import PrecisionMedicineResult from "../components/precisionMedicine/PrecisionMedicineResult";

import { precisionMedicineService } from "../services/precisionMedicineService";

import type {
  PrecisionMedicineRequest,
  PrecisionMedicineResponse,
} from "../types/precisionMedicine";

import "../styles/precisionMedicine.css";

const PrecisionMedicinePage = () => {
  const [result, setResult] =
    useState<PrecisionMedicineResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    request: PrecisionMedicineRequest,
  ) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response =
        await precisionMedicineService.generatePrecisionMedicinePlan(
          request,
        );

      setResult(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Precision medicine analysis failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="precision-page">
      <header className="precision-page-header">
        <div className="header-icon">🧬</div>

        <div>
          <h1>Precision Medicine Platform</h1>
          <p>
            Multi-Agent Genomic, Diagnostic, Treatment,
            and Clinical Research Intelligence
          </p>
        </div>
      </header>

      <PrecisionMedicineForm
        onSubmit={handleSubmit}
        loading={loading}
      />

      {error && (
        <div className="error-message" role="alert">
          <strong>Analysis Failed</strong>
          <p>{error}</p>
        </div>
      )}

      {loading && <PrecisionMedicineLoader />}

      {result && (
        <PrecisionMedicineResult result={result} />
      )}
    </main>
  );
};

export default PrecisionMedicinePage;