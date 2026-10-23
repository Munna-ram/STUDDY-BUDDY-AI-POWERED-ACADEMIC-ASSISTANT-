# 🎓 StudyBuddy - Premium Academic Command Center

**StudyBuddy** is a high-performance, single-page web application (SPA) and Progressive Web App (PWA) designed exclusively for B.Tech students. It serves as a comprehensive academic dashboard to track tasks, plan study milestones, calculate CGPA, manage job applications, and prepare for technical interviews.

## ✨ Key Features
*   **Interactive Dashboard:** Real-time productivity metrics, upcoming task previews, and overall progress tracking.
*   **Action Tasks & Study Planner:** Kanban-style task management and milestone scheduling with local storage persistence.
*   **Custom Focus Timer:** Pomodoro-based study timer with quick-adjust buttons (+/- 5 min) and customizable intervals.
*   **SGPA / CGPA Predictor:** Instant grade calculation based on semester performance.
*   **Project Portfolio:** A dedicated space to track personal projects, tech stacks, and GitHub repositories.
*   **Job & Internship Tracker:** Status-based application management (Applied, Interviewing, Offer Received, Rejected).
*   **B.Tech Skills Roadmap:** A structured 4-year checklist covering C/C++, Data Structures, System Design, and DevOps.
*   **Resource Vault:** 6 customizable subject folders with local file-attachment UI.
*   **Interview Mastery Checklist:** A top 1% candidate tracker covering Technical Core, Communication, HR/Behavioral, and Personal Branding.

## 🛠️ Tech Stack
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Styling:** Tailwind CSS (via CDN)
*   **UI/UX:** Custom Glassmorphism, CSS Keyframe Animations, Responsive Design
*   **Data Persistence:** Browser LocalStorage API
*   **Typography:** Google Fonts (Plus Jakarta Sans)
*   **PWA Ready:** `manifest.json` and Service Worker (`sw.js`) integration for offline capabilities and mobile installation.

## 🚀 How to Run
1. Clone this repository to your local machine.
2. Ensure `index.html`, `manifest.json`, and `sw.js` are in the root directory.
3. Open `index.html` in any modern web browser (Chrome, Safari, Edge).
4. **Mobile Users:** Tap the "Menu" button and select "Install App" to add StudyBuddy to your home screen as a native application.

## 📱 Mobile Responsiveness & Optimization
StudyBuddy is engineered for seamless cross-device compatibility. It features an off-canvas slide-out sidebar for mobile displays, fluid grid layouts, and strict text-wrapping protocols to prevent screen overflow. The animated gradient background utilizes hardware-accelerated CSS to ensure 60fps performance without lagging mobile devices.

## 💾 Data Privacy
All tasks, plans, job applications, and portfolio data are saved entirely locally on the user's device using the `LocalStorage` API. No external databases are required, ensuring zero latency, maximum privacy, and complete offline availability.
