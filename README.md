Student-Job-Tracker
📝 Job Tracker App
A simple job tracking web application that helps you keep track of job applications you've submitted. You can add, update, delete, and filter job entries by date and status.

Built using:

⚛️ React (Frontend)
🎨 Tailwind CSS (UI Styling)
🚀 Express + MongoDB (Backend)
🔐 JWT Auth (Login & Signup)
✨ Features
Add and edit job applications with company, role, date, status, and link
Filter jobs by:
Application status (Applied, Interview, Offer, Rejected)
Date range
Update job status directly from the dashboard
Delete jobs
Login & Signup with JWT authentication
Responsive modern UI
📸 Demo
Coming soon...

🚀 Getting Started

1. Clone the repo
   git clone https://github.com/your-username/job-tracker-app.git
   cd job-tracker-app
2. Setup Backend (Express + MongoDB)
   bash
   Copy
   Edit
   cd backend
   npm install
   Add a .env file with:

env
Copy
Edit
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Start backend server:

bash
Copy
Edit
npm start 3. Setup Frontend (React + Tailwind)
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
The frontend runs at: http://localhost:5173

The backend API runs at: http://localhost:5000/api

🧠 Project Structure
css
Copy
Edit
📁 backend

└── config
├── models
├── routes
├── controllers
└── server.js

📁 frontend
├── components
├── hooks
├── pages
├── App.jsx
└── main.jsx
Part 2 - AI Tools Tool Used: ChatGPT

How I Used It:

Broke down the entire project into manageable tasks and suggested a timeline.

Provided guidance and starter code to create a clean and responsive login page using React and Tailwind CSS.

Helped generate commented code snippets for better readability and learning.

Assisted in resolving deployment-related errors during Vercel and Render setup.

How It Helped:

Improved code readability by suggesting comments and organizing the folder structure.

Made it easier to learn and understand Express routing, middleware usage, and Mongoose setup.

Manual Changes Made:

I rewrote and styled UI components to match my design preference.

Customized the API routes and added validation logic manually.

Refined database models and included additional fields as per project requirements.
