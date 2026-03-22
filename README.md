# Akshay Ghavale - Full Stack Portfolio

A modern, interactive developer portfolio showcasing backend engineering expertise with Spring Boot and Cloud technologies.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Java, Spring Boot, Spring Data JPA, Hibernate
- **Database**: MySQL
- **Cloud/DevOps**: (Configured for) Google Cloud Run, Docker, GitHub Actions

## 📦 Project Structure

- `frontend/`: React application (Vite)
- `backend/`: Spring Boot REST API
- `schema.sql`: MySQL database initialization script

## 🛠️ Local Setup

### 1. Database (MySQL)
- Create a database named `portfolio_db`.
- Run the script in `schema.sql` to create the `contact_messages` table.
- Update `backend/src/main/resources/application.properties` with your MySQL credentials.

### 2. Backend (Spring Boot)
- Navigate to `backend/`.
- Run using Maven:
  ```bash
  mvn spring-boot:run
  ```
- The API will be available at `http://localhost:8080`.

### 3. Frontend (React)
- Navigate to `frontend/`.
- Install dependencies:
  ```bash
  npm install
  ```
- Start development server:
  ```bash
  npm run dev
  ```
- Open `http://localhost:5173`.

## 🚢 Deployment Guide (Free & Worldwide)

### Option 1: Google Cloud Run (Free Tier)
Deploy highly-scalable containers directly to `europe-west3` (Frankfurt) for ultra-low latency.

1. **Authenticate**: Open your terminal and run `gcloud auth login`.
2. **Deploy Backend**:
   ```bash
   cd backend
   gcloud run deploy portfolio-backend --source . --region europe-west3 --allow-unauthenticated --max-instances 1 --set-env-vars="spring.mail.password=YOUR_APP_PASSWORD,spring.datasource.url=jdbc:h2:mem:portfolio_db;MODE=MySQL"
   ```
3. **Deploy Frontend**:
   Update `VITE_API_BASE_URL` in `frontend/src/App.tsx` with your new backend URL, then deploy:
   ```bash
   cd frontend
   gcloud run deploy portfolio-frontend --source . --region europe-west3 --allow-unauthenticated --max-instances 1
   ```

### Option 2: Render & Vercel (Automated CI/CD)
Push this repository securely to GitHub to unlock automated deployments:
1. **Backend ([Render.com](https://render.com))**: Create a New Web Service, connect your Repo, and Render will auto-detect the provided `Dockerfile`. Add the environment variables from Option 1.
2. **Frontend ([Vercel.com](https://vercel.com))**: Import your Repo, set the Root Directory to `frontend/`, add your backend URL to Environment Variables as `VITE_API_BASE_URL`, and click Deploy!

---
Built by Antigravity (Google Deepmind) for Akshay Ghavale.
