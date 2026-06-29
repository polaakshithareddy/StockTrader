# StockTrade Platform 📈

A modern, full-stack Paper Trading Application built to simulate real-time stock market mechanics. Users can track live stock prices, execute risk-free trades, build a comprehensive portfolio, and even consult an integrated AI Financial Advisor.

![StockTrade Banner](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200&h=400)

## 🌍 Live Demo

| Service | URL |
|---|---|
| 🖥️ Frontend | [stock-trader-omega.vercel.app](https://stock-trader-omega.vercel.app) |
| ⚙️ Backend API | [stocktrader-c1je.onrender.com](https://stocktrader-c1je.onrender.com) |

## 🔐 Test Credentials

You can use the following credentials to explore the platform without creating an account:

| Role | Email | Password |
|---|---|---|
| 👤 Regular User | `user@stocktrade.com` | `User@123` |
| 🛡️ Admin | `admin@gmail.com` | `admin123` |

> **Note:** The Admin account has access to the Admin Control Panel where you can view all users and global transactions.

## 🚀 Features

- **Real-Time Market Data:** Live stock quotes fetched via Finnhub API.
- **Paper Trading:** Execute buy/sell orders securely using a simulated $100,000 starting balance.
- **Portfolio Management:** Track realized gains, current holdings, and overall net worth.
- **Interactive Stock Charts:** Beautiful, responsive charting using Recharts.
- **AI Financial Advisor:** An integrated chatbot that answers market-related queries instantly.
- **Secure Authentication:** JWT-based user authentication and protected routing.
- **Admin Dashboard:** Centralized view to monitor global application activity (users, total transaction volumes).

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS + Material-UI (MUI) components
- **Routing:** React Router v6
- **Data Visualization:** Recharts
- **HTTP Client:** Axios

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt.js
- **Real-Time Prices:** Simulated WebSocket price broadcasting via Socket.io

## ⚙️ Installation & Setup

If you wish to run this application locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/polaakshithareddy/StockTrader.git
cd StockTrader
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory and add:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

## 🌐 Deployment
This application is designed to be easily deployed:
- **Backend:** Configured for seamless deployment on Render.com
- **Frontend:** Configured with `vercel.json` for easy Vercel routing deployment.

---

*Designed and engineered with passion for modern web development.*
