// src/components/precisionMedicine/PrecisionMedicineResult.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type {
  PrecisionMedicineResponse,
} from "../../models/precisionMedicine";

interface PrecisionMedicineResultProps {
  result: PrecisionMedicineResponse;
}

const formatPercentage = (value: number): string =>
  `${(value * 100).toFixed(0)}%`;

const formatExecutionTime = (seconds: number): string =>
  `${seconds.toFixed(2)} seconds`;

const formatAgentName = (agent: string): string =>
  agent.replace(/Agent$/, " Agent");

const formatClinicalMarkdown = (
  content: string,
): string => {
  if (!content) {
    return "No information available.";
  }

  return content
    .replace(
      /^([A-Z][A-Z_]+):$/gm,
      (_, heading: string) =>
        `## ${heading
          .replace(/_/g, " ")
          .replace(/\b\w/g, (character: string) =>
            character.toUpperCase(),
          )}`,
    )
    .replace(
      /^- ([A-Za-z][A-Za-z ]+):/gm,
      "- **$1:**",
    );
};

const PrecisionMedicineResult = ({
  result,
}: PrecisionMedicineResultProps) => {
  return (
    <section className="precision-result">
      <header className="result-header">
        <div>
          <span className="result-eyebrow">
            Multi-Agent Clinical Intelligence
          </span>

          <h1>Precision Medicine Plan</h1>

          <p>
            Personalized genomic, diagnostic, treatment,
            and research intelligence report
          </p>
        </div>

        <div className="patient-summary">
          <span>
            Patient ID:
            <strong>{result.patient_id}</strong>
          </span>

          <span>
            Patient Name:
            <strong>{result.patient_name}</strong>
          </span>

          <span>
            Status:
            <strong
              className={`status-badge status-${result.status.toLowerCase()}`}
            >
              {result.status}
            </strong>
          </span>
        </div>
      </header>

      <div className="result-content">
        <section className="result-section">
          <h2>Executive Case Summary</h2>

          <div className="markdown-report">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {formatClinicalMarkdown(
                result.case_summary,
              )}
            </ReactMarkdown>
          </div>
        </section>

        <section className="result-section">
          <h2>Genomic Findings</h2>

          <div className="clinical-card-grid">
            {result.genomic_findings.map(
              (finding, index) => (
                <article
                  className="clinical-card"
                  key={`${finding.gene}-${finding.mutation}-${index}`}
                >
                  <div className="card-heading">
                    <span className="card-icon">🧬</span>

                    <div>
                      <h3>{finding.gene}</h3>
                      <p>{finding.mutation}</p>
                    </div>
                  </div>

                  <dl className="clinical-details">
                    <div>
                      <dt>Significance:</dt>
                      <dd>{finding.significance}</dd>
                    </div>

                    <div>
                      <dt>Therapeutic Implication:</dt>
                      <dd>
                        {
                          finding.therapeutic_implication
                        }
                      </dd>
                    </div>
                  </dl>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="result-section">
          <h2>Biomarker Interpretations</h2>

          <div className="clinical-card-grid">
            {result.biomarker_interpretations.map(
              (biomarker, index) => (
                <article
                  className="clinical-card"
                  key={`${biomarker.biomarker_name}-${index}`}
                >
                  <div className="card-heading">
                    <span className="card-icon">🔬</span>

                    <div>
                      <h3>
                        {biomarker.biomarker_name}
                      </h3>

                      <p className="metric-value">
                        {biomarker.value}
                      </p>
                    </div>
                  </div>

                  <dl className="clinical-details">
                    <div>
                      <dt>Interpretation:</dt>
                      <dd>
                        {biomarker.interpretation}
                      </dd>
                    </div>

                    <div>
                      <dt>Clinical Relevance:</dt>
                      <dd>
                        {biomarker.clinical_relevance}
                      </dd>
                    </div>
                  </dl>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="result-section">
          <h2>Diagnostic Assessment</h2>

          <div className="diagnostic-card">
            <div className="diagnostic-primary">
              <span>Primary Diagnosis:</span>

              <h3>
                {
                  result.diagnostic_assessment
                    .primary_diagnosis
                }
              </h3>

              <p>
                Stage{" "}
                {
                  result.diagnostic_assessment
                    .disease_stage
                }
              </p>
            </div>

            <div className="confidence-panel">
              <span>Diagnostic Confidence:</span>

              <strong>
                {formatPercentage(
                  result.diagnostic_assessment
                    .confidence_score,
                )}
              </strong>

              <div className="confidence-track">
                <div
                  className="confidence-fill"
                  style={{
                    width: formatPercentage(
                      result.diagnostic_assessment
                        .confidence_score,
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rationale-box">
            <strong>Clinical Rationale:</strong>

            <p>
              {result.diagnostic_assessment.rationale}
            </p>
          </div>
        </section>

        <section className="result-section">
          <h2>Personalized Treatment Recommendations</h2>

          <div className="recommendation-list">
            {result.treatment_recommendations.map(
              (treatment, index) => (
                <article
                  className="recommendation-card"
                  key={`${treatment.treatment_name}-${index}`}
                >
                  <div className="recommendation-header">
                    <div>
                      <h3>
                        {treatment.treatment_name}
                      </h3>

                      <p>
                        {treatment.treatment_type}
                      </p>
                    </div>

                    <span
                      className={`priority-badge priority-${treatment.priority.toLowerCase()}`}
                    >
                      {treatment.priority} Priority
                    </span>
                  </div>

                  <div className="recommendation-details">
                    <div>
                      <strong>Rationale:</strong>
                      <p>{treatment.rationale}</p>
                    </div>

                    <div>
                      <strong>Expected Benefit:</strong>
                      <p>
                        {treatment.expected_benefit}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="result-section">
          <h2>Drug-Gene Interactions</h2>

          <div className="responsive-table">
            <table className="clinical-table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Gene</th>
                  <th>Interaction</th>
                  <th>Recommendation</th>
                </tr>
              </thead>

              <tbody>
                {result.drug_gene_interactions.map(
                  (interaction, index) => (
                    <tr
                      key={`${interaction.medication}-${interaction.gene}-${index}`}
                    >
                      <td>
                        <strong>
                          {interaction.medication}
                        </strong>
                      </td>

                      <td>
                        <span className="gene-badge">
                          {interaction.gene}
                        </span>
                      </td>

                      <td>{interaction.interaction}</td>

                      <td>
                        {interaction.recommendation}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="result-section">
          <h2>Clinical Trial Matches</h2>

          <div className="recommendation-list">
            {result.clinical_trial_matches.map(
              (trial, index) => (
                <article
                  className="trial-card"
                  key={`${trial.trial_id}-${index}`}
                >
                  <div className="trial-header">
                    <div>
                      <span className="trial-id">
                        {trial.trial_id}
                      </span>

                      <h3>{trial.trial_title}</h3>
                    </div>

                    <span className="recruiting-badge">
                      {trial.recruiting_status}
                    </span>
                  </div>

                  <div className="trial-score">
                    <div>
                      <span>Eligibility Score:</span>

                      <strong>
                        {formatPercentage(
                          trial.eligibility_score,
                        )}
                      </strong>
                    </div>

                    <div className="confidence-track">
                      <div
                        className="confidence-fill"
                        style={{
                          width: formatPercentage(
                            trial.eligibility_score,
                          ),
                        }}
                      />
                    </div>
                  </div>

                  <div className="rationale-box">
                    <strong>Matching Rationale:</strong>
                    <p>{trial.rationale}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="result-section">
          <h2>Research Evidence</h2>

          <div className="clinical-card-grid">
            {result.research_evidence.map(
              (evidence, index) => (
                <article
                  className="clinical-card"
                  key={`${evidence.title}-${index}`}
                >
                  <h3>{evidence.title}</h3>

                  <div className="evidence-meta">
                    <span>
                      {evidence.evidence_level}
                    </span>

                    <span>
                      {evidence.publication_year}
                    </span>
                  </div>

                  <p>{evidence.summary}</p>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="result-section">
          <h2>Clinical Risk Assessment</h2>

          <div className="clinical-card-grid">
            {result.risk_assessments.map(
              (risk, index) => (
                <article
                  className="risk-card"
                  key={`${risk.risk_type}-${index}`}
                >
                  <div className="risk-header">
                    <h3>{risk.risk_type}</h3>

                    <span
                      className={`risk-badge risk-${risk.risk_level.toLowerCase()}`}
                    >
                      {risk.risk_level}
                    </span>
                  </div>

                  <div className="risk-score">
                    <span>Risk Score:</span>

                    <strong>
                      {formatPercentage(risk.risk_score)}
                    </strong>
                  </div>

                  <div className="confidence-track">
                    <div
                      className="confidence-fill"
                      style={{
                        width: formatPercentage(
                          risk.risk_score,
                        ),
                      }}
                    />
                  </div>

                  <p>{risk.recommendation}</p>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="result-section tumor-board-section">
          <h2>Tumor Board Recommendation</h2>

          <div className="tumor-board-decision">
            <span>Consensus Decision:</span>

            <h3>
              {
                result.tumor_board_recommendation
                  .consensus_decision
              }
            </h3>

            <p>
              {
                result.tumor_board_recommendation
                  .rationale
              }
            </p>
          </div>

          <div className="agent-section">
            <strong>Participating Agents:</strong>

            <div className="agent-badges">
              {result.tumor_board_recommendation.participating_agents.map(
                (agent) => (
                  <span
                    className="agent-badge"
                    key={agent}
                  >
                    {formatAgentName(agent)}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="result-section care-plan-section">
          <h2>Final Personalized Care Plan</h2>

          <div className="markdown-report care-plan-report">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {formatClinicalMarkdown(
                result.final_personalized_care_plan,
              )}
            </ReactMarkdown>
          </div>
        </section>

        <div className="plan-grid">
          <section className="result-section plan-section">
            <h2>Monitoring Plan</h2>

            <ul className="clinical-action-list">
              {result.monitoring_plan.map(
                (item, index) => (
                  <li key={`${item}-${index}`}>
                    <span className="action-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </section>

          <section className="result-section plan-section">
            <h2>Follow-Up Recommendations</h2>

            <ul className="clinical-action-list">
              {result.follow_up_recommendations.map(
                (item, index) => (
                  <li key={`${item}-${index}`}>
                    <span className="action-icon">→</span>
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>

        <section className="result-section analysis-summary">
          <h2>Multi-Agent Analysis Summary</h2>

          <div className="summary-metrics">
            <div className="summary-metric">
              <span>Overall Confidence:</span>

              <strong>
                {formatPercentage(
                  result.confidence_score,
                )}
              </strong>

              <div className="confidence-track">
                <div
                  className="confidence-fill"
                  style={{
                    width: formatPercentage(
                      result.confidence_score,
                    ),
                  }}
                />
              </div>
            </div>

            <div className="summary-metric">
              <span>Execution Time:</span>

              <strong>
                {formatExecutionTime(
                  result.execution_time_seconds,
                )}
              </strong>
            </div>

            <div className="summary-metric">
              <span>Analysis Status:</span>

              <strong
                className={`status-badge status-${result.status.toLowerCase()}`}
              >
                {result.status}
              </strong>
            </div>
          </div>

          <div className="agent-section">
            <strong>Generated By Agents:</strong>

            <div className="agent-badges">
              {result.generated_by_agents.map(
                (agent) => (
                  <span
                    className="agent-badge"
                    key={agent}
                  >
                    {formatAgentName(agent)}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PrecisionMedicineResult;