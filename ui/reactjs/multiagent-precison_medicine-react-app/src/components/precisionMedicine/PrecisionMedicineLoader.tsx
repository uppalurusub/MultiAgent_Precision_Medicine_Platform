// src/components/precisionMedicine/PrecisionMedicineLoader.tsx

import { useEffect, useState } from "react";

interface AnalysisStage {
  id: number;
  icon: string;
  agent: string;
  title: string;
  description: string;
}

const analysisStages: AnalysisStage[] = [
  {
    id: 1,
    icon: "🧬",
    agent: "Genomics Agent",
    title: "Genomic Analysis",
    description:
      "Analyzing genomic variants, mutations, biomarkers, and therapeutic implications.",
  },
  {
    id: 2,
    icon: "🩺",
    agent: "Diagnosis Agent",
    title: "Diagnostic Assessment",
    description:
      "Evaluating diagnoses, symptoms, laboratory results, and clinical evidence.",
  },
  {
    id: 3,
    icon: "💊",
    agent: "Treatment Agent",
    title: "Treatment Recommendation",
    description:
      "Identifying targeted therapies, drug-gene interactions, and personalized treatment options.",
  },
  {
    id: 4,
    icon: "🔬",
    agent: "Research Agent",
    title: "Research & Clinical Trials",
    description:
      "Reviewing clinical evidence, treatment guidelines, and clinical trial eligibility.",
  },
  {
    id: 5,
    icon: "👥",
    agent: "Multi-Agent Tumor Board",
    title: "Clinical Consensus",
    description:
      "Synthesizing agent findings into the final personalized precision medicine care plan.",
  },
];

const PrecisionMedicineLoader = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const stageTimer = window.setInterval(() => {
      setActiveStage((previousStage) =>
        previousStage < analysisStages.length - 1
          ? previousStage + 1
          : previousStage,
      );
    }, 12000);

    return () => window.clearInterval(stageTimer);
  }, []);

  useEffect(() => {
    const elapsedTimer = window.setInterval(() => {
      setElapsedSeconds(
        (previousSeconds) => previousSeconds + 1,
      );
    }, 1000);

    return () => window.clearInterval(elapsedTimer);
  }, []);

  const progressPercentage =
    ((activeStage + 1) / analysisStages.length) * 100;

  const formatElapsedTime = (
    totalSeconds: number,
  ): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const getStageStatus = (
    index: number,
  ): "completed" | "active" | "pending" => {
    if (index < activeStage) {
      return "completed";
    }

    if (index === activeStage) {
      return "active";
    }

    return "pending";
  };

  return (
    <section
      className="precision-loader"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loader-header">
        <div className="loader-dna">
          <span>🧬</span>
        </div>

        <div>
          <span className="loader-eyebrow">
            Multi-Agent Clinical Intelligence
          </span>

          <h2>
            Generating Precision Medicine Plan
          </h2>

          <p>
            Specialized clinical AI agents are analyzing
            genomic, diagnostic, treatment, and research
            evidence.
          </p>
        </div>
      </div>

      <div className="loader-status-panel">
        <div className="loader-spinner" />

        <div className="active-agent-content">
          <span className="active-agent-label">
            Currently Processing
          </span>

          <h3>
            {analysisStages[activeStage].icon}{" "}
            {analysisStages[activeStage].agent}
          </h3>

          <strong>
            {analysisStages[activeStage].title}
          </strong>

          <p>
            {
              analysisStages[activeStage]
                .description
            }
          </p>
        </div>

        <div className="elapsed-time">
          <span>Elapsed Time</span>

          <strong>
            {formatElapsedTime(elapsedSeconds)}
          </strong>
        </div>
      </div>

      <div className="analysis-progress">
        <div className="progress-header">
          <span>Analysis Progress</span>

          <strong>
            {Math.round(progressPercentage)}%
          </strong>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(
            progressPercentage,
          )}
        >
          <div
            className="progress-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>

      <div className="analysis-stage-list">
        {analysisStages.map((stage, index) => {
          const status = getStageStatus(index);

          return (
            <article
              className={`analysis-stage stage-${status}`}
              key={stage.id}
            >
              <div className="stage-status-icon">
                {status === "completed" && "✓"}

                {status === "active" && (
                  <span className="stage-pulse" />
                )}

                {status === "pending" && stage.id}
              </div>

              <div className="stage-agent-icon">
                {stage.icon}
              </div>

              <div className="stage-content">
                <div className="stage-heading">
                  <h3>{stage.agent}</h3>

                  <span
                    className={`stage-badge stage-badge-${status}`}
                  >
                    {status === "completed" &&
                      "Completed"}

                    {status === "active" &&
                      "Processing"}

                    {status === "pending" &&
                      "Waiting"}
                  </span>
                </div>

                <strong>{stage.title}</strong>

                <p>{stage.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="loader-footer">
        <div className="loader-footer-icon">
          ℹ️
        </div>

        <div>
          <strong>
            Precision Medicine Analysis in Progress
          </strong>

          <p>
            Multi-agent clinical analysis may take several
            minutes. Please keep this page open while the
            personalized care plan is generated.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrecisionMedicineLoader;