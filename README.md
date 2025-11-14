# eClinic (Efficient Clinic) — System Design

## 1. Problem Selection

This project addresses **two interconnected challenges** faced by rural healthcare clinics:  

- **The Waiting Room Crisis** — Patients experience long, uncertain wait times (4–6 hours on average) because clinics operate on a *first-come, first-served* basis with no visibility or prioritization. Urgent cases are sometimes missed or require disruptive reshuffling.  
- **Consultation Overload** — Nurses spend excessive time on repetitive administrative tasks, leaving less focus on patient care. In fast-paced environments, this can lead to mistakes and burnout.  

These two problems reinforce each other: long queues result partly from time-consuming consultations, while inefficient triage worsens congestion. Addressing both improves **clinic flow, patient experience, and care quality**.

---

## 2. User Research & Assumptions

### Users
- **Patients:** Primarily residents of rural areas seeking care in local clinics.  
- **Nurses:** Clinically skilled but often managing heavy workloads with minimal technical tools.  
- **Clinic Admins:** May occasionally access reports or analytics (future feature).

### Assumptions
| User | Assumptions |
|------|--------------|
| **Patients** | - Most have access to basic phones (feature phones).  <br> - Prefer numeric/short responses via USSD.<br> - Comfortable describing symptoms briefly.<br> - Expect transparency about wait time and care priority. |
| **Nurses** | - Have access to smartphones or a computer.<br> - Can communicate in English.<br> - Comfortable entering vitals digitally.<br> - Need a fast, low-complexity dashboard that fits existing workflow. |
| **Clinic Infrastructure** | - Clinics have at least one internet-connected device.<br> - Electricity may be intermittent.<br> - Backend should support intermittent connectivity. |

---

## 3. Solution Overview

**eClinic** is a lightweight digital triage and consultation support system designed for rural clinics.  

![solution_overview](https://github.com/user-attachments/assets/a9f1881c-c41d-4fc0-9c0b-de66d5466ce3)

It integrates **USSD-based patient pre-registration** with an **AI-assisted triage and summarization tool** to streamline care delivery and reduce administrative burden.

### How It Works (Flow)

1. **Patient Intake (USSD):**  
   Patients dial a USSD code (via Africa’s Talking API) and answer short questions about symptoms, pain level, and location.  
2. **Backend Processing:**  
   The responses are stored securely in a PostgreSQL database.  
3. **Frontend (Next.js):**  
   Nurses log in to view patient queues with symptom summaries. They can add vital signs (e.g., temperature, blood pressure).  
4. **AI Recommendation (LLM):**  
   When ready, the nurse triggers an AI (LLM) summarization model that processes both patient input and nurse data to provide:  
   - A quick **triage recommendation** (e.g., “urgent,” “routine,” “follow-up”), and  
   - A **summary** of possible next steps.  
5. **Nurse Decision:**  
   The nurse reviews the recommendation, adds their final notes or prescriptions, and confirms the case.  
6. **Outcome Published:**  
   The decision is recorded in the system and can be used for follow-up or reporting.

This approach provides patients with clarity and nurses with decision support — all without requiring smartphones or high connectivity.

---

## 4. System Architecture
### Components

| Component | Description |
|------------|--------------|
| **USSD Gateway** | Powered by *Africa’s Talking*, collects symptom data from patients using feature phones. |
| **Backend (NestJS)** | Manages patient records, handles API requests, stores data in PostgreSQL, and integrates with the AI service. Chosen for its **modular architecture**, scalability, and TypeScript support. |
| **Frontend (Next.js)** | Provides a nurse dashboard and admin portal, supports AI result display and prescription entry. Chosen for **fast rendering**, **API integration**, and **built-in AI-friendly frameworks**. |
| **Database (PostgreSQL)** | Stores patient profiles, vitals, and AI-generated summaries securely. |
| **AI Service (LLM)** | Summarizes patient symptoms and vitals, and recommends triage categories. Hosted as a service integrated with the backend. |
| **Authentication** | Role-based access for nurses and admins, with encrypted API tokens. |
| **Connectivity Handling** | Backend queueing and caching ensure no data loss during network downtime. |

---

### Data Flow
Patient (via USSD) → Africa’s Talking Gateway → Backend (NestJS) → Database (PostgreSQL) → Nurse Dashboard (Next.js) → (Nurse adds vitals) → AI Service (LLM) → AI Recommendation → Nurse Review → Final Decision Saved.

#### Database Diagram:
![db_diagram](https://github.com/user-attachments/assets/0adaf059-aac2-43b3-8b86-0461dab20f1c)

Adjusted for NestJS model structure.

---

## 5. Data Privacy & Security

Because healthcare data is highly sensitive, the system incorporates the following safeguards:

- **Encrypted communication:** All API traffic via HTTPS/TLS.  
- **Data anonymization:** Personally identifiable information is minimized in AI requests.  
- **Access control:** Role-based login for nurses and admins.  
- **Secure storage:** PostgreSQL configured with row-level security and encrypted backups.  
---

## 6. Future Vision (6-Month Roadmap)

If given six additional months, the project would evolve as follows:

| # | Focus | Description |
|--------|--------|-------------|
| **#1** | **Pilot Deployment** | Deploy in clinics to collect real usage data and user feedback. |
| **#2** | **AI Localization** | Fine-tune the LLM on local medical data (symptom phrasing, common illnesses). Improve triage accuracy and adapt language support. |
| **#3** | **Expand Scope** | Add Problem 3 (“Knowledge Gap”) by integrating an AI-assisted reference guide for rural healthcare workers. Explore **voice-enabled USSD** for low-literacy users. |



## How To Run the Project:

```:bash
docker compose --env-file .env.local up --build
```
Actual file used will be shared upon request, or you can follow the guide as defined here <.env.local.example>

Navigate to - http://localhost:3000/

Backend: https://eclinic-backend.vercel.app/
Frontend: (https://eclinicfrontend.vercel.app/)
PM Tool: https://app.todoist.com/app/project/eclinic-6fFgj2HCJ5VcffGg
