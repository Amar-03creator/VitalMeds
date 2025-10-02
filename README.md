# VitalMEDS - B2B Pharmaceutical Distribution Platform

A modern MERN stack application for pharmaceutical distribution with complete transparency and verification systems.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with 3-day token expiration
- **B2B Verification**: GSTIN + Drug License OR Aadhaar + PAN verification options
- **Admin Approval Workflow**: Manual approval system for business verification
- **Responsive Design**: Mobile-friendly interface built with shadcn/ui
- **Complete Transparency**: Both parties can verify each other's credentials

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- React Router DOM for routing
- shadcn/ui for components
- Tailwind CSS for styling
- Axios for API calls

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Express CORS for cross-origin requests

**Database:**
- MongoDB Atlas (Cloud)

## 📁 Project Structure

    VitalMEDS/
    ├── client/ # React frontend
    │ ├── public/ # Static assets
    │ ├── src/
    │ │ ├── components/ # Reusable components
    │ │ │ ├── ui/ # shadcn/ui components
    │ │ │ ├── common/ # Common components (Navbar, etc.)
    │ │ │ └── layouts/ # Layout components
    │ │ ├── pages/ # Page components
    │ │ │ ├── client/ # Client-specific pages
    │ │ │ ├── LandingPage.jsx
    │ │ │ └── HomePage.jsx
    │ │ ├── contexts/ # React contexts
    │ │ │ └── AuthContext.jsx
    │ │ ├── services/ # API services
    │ │ │ └── api.js
    │ │ ├── App.jsx
    │ │ ├── main.jsx
    │ │ └── index.css
    │ ├── package.json
    │ ├── vite.config.js
    │ └── tailwind.config.js
    ├── server/ # Node.js backend
    │ ├── controllers/ # Route controllers
    │ │ └── authController.js
    │ ├── models/ # Mongoose models
    │ │ └── User.js
    │ ├── routes/ # API routes
    │ │ └── authRoutes.js
    │ ├── middleware/ # Custom middleware
    │ │ └── auth.js
    │ ├── config/ # Configuration files
    │ ├── server.js
    │ ├── package.json
    │ └── .env
    ├── .gitignore
    ├── .gitattributes
    └── README.md

---
## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation
#### 1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd VitalMEDS
    ```
#### 2.  **Install backend dependencies**
    ```bash
    cd server
    npm install
    ```
#### 3.  **Install frontend dependencies**
    ```bash
    cd ../client
    npm install
    ```

### Environment Setup
- Create a `.env` file in the `server` directory with the following variables:
- NODE_ENV=development
- PORT=5000
- MONGODB_URI=your_mongodb_atlas_connection_string
- JWT_SECRET=your_jwt_secret_key
- FRONTEND_URL=http://localhost:5173


### Start the development servers

#### **Backend (in one terminal):**
```bash
cd server
npm run dev
```

#### **Frontend (in a new terminal):**
```bash
cd client
npm run dev
```

### Access the application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🧪 Testing

### Manual Testing Flow

1.  **Registration**: Create a new business account.
2.  **Database Verification**: Check the user document in MongoDB.
3.  **Admin Approval**: Manually update the user status to "Approved".
4.  **Login**: Sign in with the approved account.
5.  **Protected Routes**: Access the dashboard and features.

---
## 🔐 Authentication Flow

1.  A user registers with their business details.
2.  The account is created with a "Pending Approval" status.
3.  The admin manually verifies and approves the account.
4.  The user can then log in and access the full platform.
5.  A JWT is stored in `localStorage` with a 3-day expiration to keep the user logged in.

---
## 🚀 Deployment

-   **Frontend**: Vercel, Netlify (recommended)
-   **Backend**: Render, Railway
-   **Database**: MongoDB Atlas

---
## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
## 📧 Contact

- Project Developer - Amarnath Nayak
- Project Link: https://github.com/Amar-03creator/VitalMeds.git
- Mail: 456amarnath@gmail.com

---
## 📄 License

This project is licensed under the MIT License.


