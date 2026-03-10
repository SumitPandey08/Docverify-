# 🛡️ DocVerify: The AI-Powered Document Authenticity Agent

DocVerify is a high-integrity document issuance and verification system. It allows organizations to define, issue, and verify official documents (Degrees, Certificates, ID Cards) using a combination of **QR-based validation**, **cryptographic database checks**, and a **Sophisticated AI Verification Agent** (built with Gemini & LangGraph).

---

## 🚀 The Core Workflow

### 1. Organization Onboarding & Asset Setup
*   **Registration:** Organizations sign up to receive a unique **Integration API Key**.
*   **Global Assets:** Organizations upload their **Official Seal** and **Authorized Signature** (recommended as background-less PNGs).
*   **Branding:** These assets are globally applied to every document issued by the organization, ensuring consistent visual authority.

### 2. Document Blueprints (Templates)
*   **Defining Fields:** Organizations create "Models" (e.g., *Master's Degree*). They define required fields like *Student Name*, *Major*, and *GPA*.
*   **Auto-Layout Engine:** Organizations upload a base background image. Our **Sharp-powered engine** handles the rest—automatically aligning text, placing the **QR Code (Top-Right)**, and stamping the **Seal & Signature (Bottom)**.

### 3. Issuance & Generation
*   **User Application:** Users apply for documents through the portal.
*   **Approval:** Once an organization approves a request, the system generates a high-resolution, tamper-evident document image.
*   **Embedded Security:** Each document contains a unique **Document ID** and a **Secure QR Code** containing encrypted metadata.

### 4. AI-Powered Verification (The "Agent")
*   **Multimodal Analysis:** When a document is uploaded for verification, our **AI Agent** (Gemini + LangGraph) performs a multi-step audit:
    *   **OCR & Parsing:** Extracts all text and dates.
    *   **Visual Consistency:** Checks the structure against the reference model.
    *   **Seal/Sign Audit:** Verifies the presence and alignment of official organizational assets.
    *   **Database Source-of-Truth:** Cross-references the Document ID and metadata directly with the secure database.
*   **Confidence Breakdown:** The agent provides a detailed report with scores for *Textual Accuracy*, *Visual Match*, and *Database Trust*.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), TailwindCSS, Lucide-React, Framer Motion |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | MongoDB (Mongoose) |
| **Imaging** | Sharp, QRCode.js |
| **AI/LLM** | Google Gemini (1.5 Flash/Pro), LangGraph, LangChain |
| **Storage** | Local Disk (Uploads) / Expandable to S3/Cloudinary |

---

## 🚦 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   Google Gemini API Key

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-repo/doc-verify-agent.git
    cd doc-verify-agent
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with:
    # MONGO_URI=your_mongodb_uri
    # GEMINI_API_KEY=your_gemini_api_key
    # PORT=5000
    npm run dev
    ```

3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## 🔐 Security Features
*   **Tamper Evidence:** Any modification to the printed text will fail the AI-driven OCR vs. Database comparison.
*   **Anti-Forgery:** The combination of an auto-generated layout and uniquely placed organization assets makes manual forgery extremely difficult.
*   **Intelligent Matching:** The AI Agent is designed to be "smart"—handling minor OCR errors while remaining strict on critical data like IDs and Dates.

---

*Built with ❤️ for High-Trust Environments.*
