# AI Hospital Operations Optimization Platform

A modern **React.js + TypeScript healthcare operations application** designed to optimize hospital admissions, bed utilization, staffing, medical resources, and financial operations through an AI-powered Hospital Operations API.

The application provides a structured hospital operations input interface, validates operational data, communicates with the backend optimization service, and presents executive KPIs, AI agent recommendations, operational risk alerts, optimization recommendations, and final COO decisions in a responsive dashboard.

---

## Overview

Hospital operations involve multiple interconnected operational areas, including:

* Patient admissions
* ICU and ward bed capacity
* Clinical staffing
* Medical equipment and resources
* Pharmacy stock
* Revenue and operational cost
* Claims and billing
* Patient flow efficiency

Managing these operational dimensions independently can result in resource bottlenecks, staffing shortages, inefficient bed allocation, and financial inefficiencies.

The **AI Hospital Operations Optimization Platform** provides a centralized frontend for submitting hospital operational data to an AI-driven optimization service.

The backend analyzes the operational state and returns:

* Executive operational summaries
* Hospital health scores
* Operational efficiency scores
* Admission optimization recommendations
* Bed utilization recommendations
* Staffing optimization recommendations
* Medical resource recommendations
* Revenue optimization insights
* Operational KPIs
* Risk alerts
* AI agent recommendations
* Final COO decisions
* Recommended next actions

---

## Key Features

### Hospital Operations Data Management

Capture detailed hospital operational information including:

* Hospital identity
* Hospital location
* Total hospital capacity
* Current patient population
* Operational optimization goals
* Additional operational notes

---

### Patient Admission Management

Create and manage multiple patient admission records.

Each admission includes:

* Patient ID
* Patient name
* Age
* Gender
* Department
* Admission type
* Severity
* Estimated length of stay
* ICU requirement

The interface dynamically supports adding and removing admission records.

---

### Bed Capacity Management

Capture hospital bed utilization information for:

* ICU beds
* Ward beds
* Private rooms

The application validates that occupied beds cannot exceed the configured total bed capacity.

---

### Staffing Management

Manage staffing availability across multiple hospital departments.

Supported staffing metrics include:

* Doctors available
* Nurses available
* Technicians available
* Support staff available
* Current shift

Multiple departmental staffing records can be dynamically added or removed.

---

### Medical Resource Management

Capture the current availability of critical hospital resources.

Supported resources include:

* Ventilators
* Oxygen units
* Operation theaters
* Ambulances
* Diagnostic machines
* Pharmacy stock percentage

---

### Revenue and Financial Operations

Capture hospital financial operational metrics including:

* Daily revenue
* Monthly revenue
* Operational cost
* Outstanding claims
* Pending bills

These metrics are analyzed by the optimization service to identify revenue and financial improvement opportunities.

---

### AI-Based Operations Optimization

The application integrates with the Hospital Operations Optimization API.

```text
POST /api/v1/operations/optimize
```

The API analyzes hospital operational data and returns AI-generated optimization recommendations.

---

### Executive Summary Dashboard

The optimization result displays:

* Overall hospital operational status
* Hospital health score
* Operational efficiency score
* Key operational findings

The executive summary provides hospital leadership with a high-level view of the current operational state.

---

### Operational KPI Dashboard

The application presents critical hospital operational KPIs.

Supported KPIs include:

* Hospital capacity utilization
* Patient-to-bed ratio
* Average length of stay
* Patient flow efficiency
* Revenue per patient

---

### Admissions Optimization

The admissions optimization section displays:

* Total admissions processed
* Emergency cases
* Elective cases
* Critical cases
* AI-generated admission recommendations

---

### Bed Optimization

Bed optimization analysis includes:

* ICU occupancy rate
* Ward occupancy rate
* Private room occupancy rate
* Available ICU beds
* Available ward beds
* Bed management recommendations

---

### Staffing Optimization

The staffing optimization dashboard displays:

* Doctor utilization rate
* Nurse utilization rate
* Technician utilization rate
* Staffing gap identification
* Staffing recommendations

---

### Resource Optimization

The resource optimization section analyzes:

* Ventilator utilization
* Oxygen utilization
* Equipment utilization
* Pharmacy stock percentage

The system also displays AI-generated resource management recommendations.

---

### Revenue Optimization

The revenue optimization dashboard presents:

* Daily revenue
* Projected monthly revenue
* Operational cost
* Profit margin
* Outstanding claims

Financial recommendations are provided to improve hospital operational performance.

---

### Operational Risk Alerts

Operational risks identified by the backend are displayed in a dedicated risk alert section.

When no operational risks are detected, the application clearly indicates that no operational risk alerts were identified.

---

### AI Agent Recommendations

The platform displays recommendations generated by specialized AI agents.

Each recommendation contains:

* Agent name
* Recommendation
* Priority
* Confidence score

Markdown content returned by AI agents is rendered using `react-markdown`.

This allows structured AI responses containing:

* Headings
* Paragraphs
* Bullet lists
* Numbered lists
* Emphasis

to be presented as formatted dashboard content.

---

### Final COO Decision

The application prominently displays the final Chief Operating Officer decision returned by the optimization platform.

Example decisions may include:

```text
APPROVED
REJECTED
REVIEW_REQUIRED
```

---

### Recommended Next Actions

The application presents AI-generated operational next actions as structured Markdown lists.

These actions can guide hospital leadership and operations teams in implementing the recommended optimization strategy.

---

### Request Validation

The service layer performs client-side business validation before sending requests to the backend.

Validation includes:

* Request ID validation
* Hospital name validation
* Hospital ID validation
* Hospital capacity validation
* Current patient count validation
* Admission validation
* Patient information validation
* Estimated length-of-stay validation
* Bed occupancy validation
* Staffing validation
* Resource validation
* Pharmacy stock percentage validation
* Revenue validation
* Optimization goal validation

This reduces unnecessary invalid API requests.

---

### API Error Handling

The application provides centralized Axios error handling.

Supported scenarios include:

* HTTP `400` invalid request errors
* HTTP `422` FastAPI validation errors
* HTTP `500` server errors
* Request timeout errors
* Network connectivity errors
* Unexpected application errors

FastAPI validation messages are extracted and converted into user-friendly frontend error messages.

---

## Technology Stack

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| React.js         | Frontend UI development                 |
| TypeScript       | Static typing and application models    |
| Vite             | Frontend development and build tooling  |
| React Router DOM | Client-side routing                     |
| Axios            | HTTP API communication                  |
| React Markdown   | AI recommendation Markdown rendering    |
| CSS3             | Responsive dashboard styling            |
| FastAPI API      | Hospital operations backend integration |

---

## Project Architecture

```text
src/
│
├── api/
│   ├── apiClient.ts
│   └── operationsApi.ts
│
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   └── operations/
│       ├── OperationsForm.tsx
│       ├── OperationsLoader.tsx
│       └── OperationsResult.tsx
│
├── models/
│   └── operations.ts
│
├── pages/
│   └── OperationsPage.tsx
│
├── services/
│   └── operationsService.ts
│
├── styles/
│   └── operations.css
│
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

---

## Architecture Overview

The application follows a layered frontend architecture.

```text
User
  │
  ▼
OperationsPage
  │
  ├── OperationsForm
  │
  ├── OperationsLoader
  │
  └── OperationsResult
  │
  ▼
OperationsService
  │
  ▼
Operations API Layer
  │
  ▼
Axios API Client
  │
  ▼
Hospital Operations FastAPI Backend
```

---

## Application Layers

### API Client Layer

File:

```text
src/api/apiClient.ts
```

The API client provides centralized Axios configuration.

Responsibilities include:

* API base URL configuration
* Request timeout configuration
* JSON request headers
* API request logging
* API response logging
* Centralized request interceptor
* Centralized response interceptor

Default backend API URL:

```text
http://127.0.0.1:8000/api/v1
```

The API URL can be configured using:

```text
VITE_API_BASE_URL
```

---

### Operations API Layer

File:

```text
src/api/operationsApi.ts
```

The API layer contains the direct HTTP communication implementation.

Supported API operation:

```text
POST /operations/optimize
```

The API function accepts:

```typescript
HospitalOperationsRequest
```

and returns:

```typescript
HospitalOperationsResponse
```

---

### Service Layer

File:

```text
src/services/operationsService.ts
```

The service layer provides business validation and API error handling.

Responsibilities include:

* Request validation
* Hospital information validation
* Admission validation
* Bed capacity validation
* Staffing validation
* Resource validation
* Revenue validation
* API communication orchestration
* Axios error transformation
* FastAPI validation error extraction

The service layer separates business rules from React UI components.

---

### Model Layer

File:

```text
src/models/operations.ts
```

The model layer contains TypeScript interfaces for API requests and responses.

Major request models include:

```text
HospitalInfo
Admission
BedStatus
StaffingStatus
ResourceStatus
RevenueStatus
HospitalOperationsRequest
```

Major response models include:

```text
ExecutiveSummary
AdmissionsOptimization
BedOptimization
StaffingOptimization
ResourceOptimization
RevenueOptimization
OperationalKPIs
AgentRecommendation
HospitalOperationsResponse
```

The model also defines domain-specific type aliases for:

```text
OperationsStatus
OverallOperationsStatus
FinalDecision
AdmissionType
Severity
Gender
Shift
RecommendationPriority
```

---

### Component Layer

The operations UI is divided into reusable React components.

#### OperationsForm

File:

```text
src/components/operations/OperationsForm.tsx
```

Responsibilities:

* Manage hospital operations form state
* Capture hospital information
* Manage dynamic admission records
* Manage dynamic staffing records
* Capture bed utilization
* Capture medical resource availability
* Capture revenue information
* Perform initial UI validation
* Submit optimization requests

The component uses React `useState` for strongly typed form state management.

---

#### OperationsLoader

File:

```text
src/components/operations/OperationsLoader.tsx
```

Displays the AI operations processing state while the optimization API request is running.

The loader communicates that specialized hospital operations agents are processing the request.

---

#### OperationsResult

File:

```text
src/components/operations/OperationsResult.tsx
```

Displays the complete Hospital Operations Optimization response.

The component renders:

* Result header
* Request information
* Executive summary
* Operational KPIs
* Admissions optimization
* Bed optimization
* Staffing optimization
* Resource optimization
* Revenue optimization
* Operational risk alerts
* AI agent recommendations
* Final COO decision
* Next actions
* Execution details

AI-generated recommendation content is rendered using Markdown.

---

### Page Layer

File:

```text
src/pages/OperationsPage.tsx
```

The page component orchestrates the Hospital Operations Optimization workflow.

Responsibilities include:

* Maintaining loading state
* Maintaining result state
* Maintaining error state
* Calling the operations service
* Displaying the operations form
* Displaying the loader
* Displaying API errors
* Displaying optimization results

Application state:

```typescript
const [loading, setLoading] = useState(false);

const [result, setResult] =
  useState<HospitalOperationsResponse | null>(null);

const [error, setError] =
  useState<string | null>(null);
```

---

## Routing

Routing is configured in:

```text
src/App.tsx
```

Available route:

```text
/operations
```

The root route automatically redirects to:

```text
/operations
```

Unknown routes are also redirected to the Hospital Operations page.

Routing flow:

```text
/
      │
      ▼
/operations
      │
      ▼
OperationsPage
```

---

## API Configuration

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

The application uses the environment variable in the Axios client:

```typescript
baseURL:
  import.meta.env.VITE_API_BASE_URL ??
  "http://127.0.0.1:8000/api/v1"
```

If the environment variable is not configured, the application uses the local FastAPI backend.

---

## API Endpoint

### Optimize Hospital Operations

```http
POST /api/v1/operations/optimize
```

### Request Model

```typescript
HospitalOperationsRequest
```

Example request structure:

```json
{
  "request_id": "OPS-001",
  "analysis_timestamp": "2026-07-11T10:00:00.000Z",
  "hospital_info": {
    "hospital_name": "City General Hospital",
    "hospital_id": "HOSP-001",
    "city": "Hyderabad",
    "state": "Telangana",
    "total_capacity": 500,
    "current_patient_count": 420
  },
  "admissions": [
    {
      "patient_id": "PAT-001",
      "patient_name": "Patient One",
      "age": 55,
      "gender": "Male",
      "department": "Cardiology",
      "admission_type": "Emergency",
      "severity": "High",
      "estimated_length_of_stay": 5,
      "requires_icu": false
    }
  ],
  "bed_status": {
    "total_icu_beds": 50,
    "occupied_icu_beds": 42,
    "total_ward_beds": 350,
    "occupied_ward_beds": 300,
    "total_private_rooms": 100,
    "occupied_private_rooms": 78
  },
  "staffing_status": [
    {
      "department": "Cardiology",
      "doctors_available": 10,
      "nurses_available": 25,
      "technicians_available": 5,
      "support_staff_available": 8,
      "current_shift": "Morning"
    }
  ],
  "resource_status": {
    "ventilators_available": 25,
    "oxygen_units_available": 100,
    "operation_theaters_available": 8,
    "ambulances_available": 12,
    "diagnostic_machines_available": 20,
    "pharmacy_stock_percentage": 85
  },
  "revenue_status": {
    "daily_revenue": 500000,
    "monthly_revenue": 15000000,
    "operational_cost": 10000000,
    "outstanding_claims": 2500000,
    "pending_bills": 1000000
  },
  "optimization_goal": "Improve hospital operational efficiency and patient flow",
  "additional_notes": "Prioritize ICU capacity and emergency admissions"
}
```

---

## API Response

The backend returns a:

```typescript
HospitalOperationsResponse
```

The response contains the following high-level structure:

```json
{
  "request_id": "OPS-001",
  "analysis_timestamp": "2026-07-11T10:00:00.000Z",
  "status": "SUCCESS",
  "executive_summary": {},
  "admissions_optimization": {},
  "bed_optimization": {},
  "staffing_optimization": {},
  "resource_optimization": {},
  "revenue_optimization": {},
  "risk_alerts": [],
  "operational_kpis": {},
  "agent_recommendations": [],
  "agent_outputs": [],
  "final_decision": "APPROVED",
  "next_actions": [],
  "execution_time_seconds": 2.5,
  "generated_by": "Hospital Operations AI Platform",
  "model_version": "1.0",
  "metadata": {}
}
```

---

## Installation

### Prerequisites

Ensure the following software is installed:

* Node.js 18 or later
* npm
* Hospital Operations FastAPI backend

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

---

### Clone the Repository

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd <project-directory>
```

---

### Install Dependencies

```bash
npm install
```

If required, install the primary application dependencies:

```bash
npm install axios react-router-dom react-markdown
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The Vite development server will display the application URL.

Typically:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173/operations
```

---

## Running the Backend

Ensure the Hospital Operations FastAPI backend is running.

Example:

```bash
uvicorn main:app --reload
```

Default backend URL:

```text
http://127.0.0.1:8000
```

API base URL:

```text
http://127.0.0.1:8000/api/v1
```

Operations endpoint:

```text
http://127.0.0.1:8000/api/v1/operations/optimize
```

---

## Build for Production

Create the production build:

```bash
npm run build
```

The optimized application is generated in:

```text
dist/
```

---

## Preview Production Build

Run:

```bash
npm run preview
```

---

## Application Workflow

```text
1. User opens the Hospital Operations page
                │
                ▼
2. User enters hospital operational information
                │
                ▼
3. User enters patient admission information
                │
                ▼
4. User enters bed utilization information
                │
                ▼
5. User enters departmental staffing information
                │
                ▼
6. User enters medical resource availability
                │
                ▼
7. User enters hospital financial information
                │
                ▼
8. Frontend validates the request
                │
                ▼
9. OperationsService processes the request
                │
                ▼
10. Operations API sends POST /operations/optimize
                │
                ▼
11. Hospital Operations AI backend analyzes data
                │
                ▼
12. AI agents generate optimization recommendations
                │
                ▼
13. Optimization response is returned
                │
                ▼
14. OperationsResult renders the dashboard
                │
                ▼
15. Final COO decision and next actions are displayed
```

---

## Error Handling Flow

```text
API / Validation Error
        │
        ▼
OperationsService
        │
        ▼
Axios Error Detection
        │
        ├── 400 Invalid Request
        │
        ├── 422 Validation Error
        │
        ├── 500 Server Error
        │
        ├── Timeout
        │
        └── Network Error
        │
        ▼
User-Friendly Error Message
        │
        ▼
OperationsPage Error Display
```

---

## UI Design

The application uses custom CSS located in:

```text
src/styles/operations.css
```

The UI provides:

* Responsive hospital operations dashboard
* Left-aligned operational content
* Executive summary cards
* KPI metric grids
* Structured optimization sections
* Status badges
* Recommendation blocks
* AI agent recommendation cards
* Confidence score indicators
* Operational risk messages
* Final decision panels
* Responsive mobile layouts

The dashboard is optimized for operational and executive healthcare use cases.

---

## Responsive Design

The application includes responsive styling for devices below:

```css
@media (max-width: 768px)
```

Mobile optimizations include:

* Reduced page padding
* Smaller page headings
* Single-column metric grids
* Vertical result headers
* Full-width form buttons
* Responsive operations sections

---

## TypeScript Benefits

The application uses TypeScript interfaces throughout the architecture.

Benefits include:

* Strong API contract definitions
* Compile-time type checking
* Improved IDE IntelliSense
* Safer form state management
* Typed service methods
* Typed API responses
* Reduced runtime errors
* Easier frontend/backend contract maintenance

Example:

```typescript
async optimizeOperations(
  request: HospitalOperationsRequest,
): Promise<HospitalOperationsResponse>
```

---

## Healthcare Operations Use Cases

The platform can support several hospital operational scenarios.

### Hospital Command Center

Monitor and optimize hospital-wide operational performance.

### Bed Management

Identify ICU, ward, and private room capacity constraints.

### Emergency Department Operations

Prioritize emergency and critical patient admissions.

### Workforce Optimization

Identify doctor, nurse, and technician utilization gaps.

### Resource Planning

Optimize ventilators, oxygen, operation theaters, and diagnostic equipment.

### Pharmacy Operations

Monitor pharmacy stock levels and identify supply risks.

### Revenue Cycle Management

Analyze revenue, costs, claims, and outstanding financial obligations.

### Executive Decision Support

Provide AI-generated operational recommendations and final COO decisions.

---

## Future Enhancements

Potential enhancements include:

* Real-time hospital command center dashboard
* WebSocket-based live operational updates
* Bed occupancy trend charts
* Staffing utilization charts
* Department-level performance dashboards
* Revenue trend analytics
* Patient flow visualization
* Operational risk severity classification
* AI agent execution timeline
* Agent reasoning visualization
* PDF optimization report export
* Excel report export
* Authentication and authorization
* Role-based access control
* Hospital multi-tenant support
* Audit trail management
* Notification management
* Email alerts
* SMS operational alerts
* Integration with Hospital Information Systems
* Integration with Electronic Health Record systems
* Integration with Clinical Decision Support systems
* Kubernetes deployment
* Docker containerization
* Azure deployment
* CI/CD pipeline integration
* Automated frontend testing
* End-to-end API testing

---

## Recommended Testing Strategy

The application can be tested using:

### Unit Testing

Recommended tools:

```text
Vitest
React Testing Library
```

Test:

* Form validation
* Service validation
* API error handling
* Formatting utilities
* Dynamic admissions
* Dynamic staffing records

### Integration Testing

Test:

```text
OperationsForm
      │
      ▼
OperationsService
      │
      ▼
Operations API
```

### End-to-End Testing

Recommended tools:

```text
Playwright
Cypress
```

Test the complete workflow from hospital data entry to the final optimization dashboard.

---

## Security Considerations

For production healthcare deployments, consider implementing:

* HTTPS
* OAuth 2.0
* OpenID Connect
* JWT authentication
* Role-based access control
* API authorization
* Input sanitization
* Content Security Policy
* Secure environment variables
* API rate limiting
* Audit logging
* Data encryption
* Secure healthcare data handling
* PHI protection
* HIPAA-aligned controls where applicable
* Applicable regional healthcare privacy requirements

Sensitive patient information should not be logged in production browser consoles or exposed through unsecured API communication.

---

## Development Principles

The project follows several frontend architecture principles:

* Separation of concerns
* Layered frontend architecture
* Strong TypeScript contracts
* Reusable React components
* Centralized API configuration
* Centralized business validation
* Centralized API error handling
* Component-based UI architecture
* Responsive design
* Domain-driven healthcare models

---

## Conclusion

The **AI Hospital Operations Optimization Platform** provides a scalable React.js and TypeScript frontend architecture for AI-powered hospital operational decision support.

The application integrates structured hospital operational data with an optimization API and transforms the AI response into an executive-ready healthcare operations dashboard.

Its layered architecture separates:

```text
UI Components
Business Services
API Communication
TypeScript Domain Models
Page Orchestration
Styling
```

This architecture provides a strong foundation for building an enterprise-grade **AI Hospital Command Center**, **Hospital Operations Intelligence Platform**, or **Agentic AI Healthcare Operations System**.

---

## License

This project is intended for educational, research, demonstration, and healthcare AI application development purposes.

Add the appropriate production license based on organizational and deployment requirements.
