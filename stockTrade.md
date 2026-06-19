## **STOCK TRADER – ONLINE TRADING & INVESTMENT PLATFORM** 

## **INTRODUCTION** 

Stock Trader is a modern web-based stock trading and investment platform designed to help users invest, analyze, and manage their portfolios efficiently. The platform provides real-time stock market data, interactive charts, portfolio tracking, watchlists, and secure trading functionalities. 

Users can monitor stock prices, analyze market trends, execute trades, and manage investments from a single dashboard. The system offers a seamless trading experience through an intuitive interface and real-time updates. 

## **SCENARIO:** 

## **Saketh First Stock Investment** 

Rahul is a college student interested in investing in the stock market. However, he finds it difficult to track stock prices across multiple websites and understand market movements. 

## **1. Account Registration** 

Rahul creates an account on Stock Trader and securely logs in. 

## **2. Market Exploration** 

He browses the available stocks and views detailed information such as: 

- Current Price 

- Market Capitalization 

- Price Change 

- Trading Volume 

- Historical Charts 

## **3. Watchlist Creation** 

Rahul adds his favorite stocks to a watchlist for future tracking. 

## **4. Stock Analysis** 

Using interactive charts and market indicators, he analyzes stock performance. 

## **5. Trade Execution** 

Rahul purchases shares directly through the trading interface. 

## **6. Portfolio Monitoring** 

The purchased stocks appear in his portfolio dashboard. 

## **7. Profit Tracking** 

Rahul tracks profits, losses, and overall portfolio growth in real time. 

. 

## **SYSTEM REQUIREMENTS :** 

## **1. Software Requirements** 

These are the essential tools and platforms required to develop, test, and run the application efficiently. 

- **Operating System** : Windows 10/11, macOS, or Linux — Supports cross-platform development and testing. 

- **Node.js (v16 or above)** : Provides the runtime environment for building and managing frontend logic and Powers the server-side logic and handles API routing.  👉 Download Node.js 

- **npm (v8 or above)** : A package manager required to install dependencies for React and related libraries. 

- **React.js** : A JavaScript library for building dynamic and responsive user interfaces. 

- **Browser** : Google Chrome / Firefox (latest version) — For rendering and testing the UI in real-time. 

- **Express.js** : A lightweight web framework for building RESTful APIs. 

- **MongoDB** NoSQL database used to store user details, stock information, portfolios, watchlists, transactions, and order history.. 

- **Postman** : Tool for testing APIs during development. 

- **Visual Studio Code** : Preferred code editor with built-in Git and terminal support. 

- **WebSocket:** Enables real-time communication for live stock price updates and market data streaming. 

- **Git & GitHub** : For version control and collaborative development. 

## **2. Hardware Requirements** 

Describes the minimum and recommended specifications needed to support the development and usage of the application. 

- **Processor** : Intel Core i5 (8th Gen or above) / AMD Ryzen 5 or better — Ensures fast compilation and multitasking during development. 

- **RAM** : Minimum 8 GB (16 GB recommended) — For handling development servers, IDEs, and browser testing simultaneously. 

- **Storage** : At least 1 GB free space — Required for package installations, MongoDB setup, and local project files. 

- **Display** : 1366x768 or higher — Recommended for optimal coding experience and application layout visualization. 

## **PROJECT ARCHITECTURE :** 

## **TECHNICAL ARCHITECTURE:** 

In this architecture diagram: 

- The **Frontend** is represented by the "Frontend" section, including user 

interface components such as User Authentication, Dashboard, Stock Listings, Watchlist, Portfolio Management, Trading Interface, Market Analysis Charts, User Profile, and Admin Dashboard. 

- The **Backend** is represented by the "Backend" section, consisting of RESTful API endpoints for Users, Stocks, Portfolios, Orders, Transactions, Watchlists, Authentication, and Real-Time Market Data. It also includes Admin Authentication and Admin Management functionalities. 

- The **Database** section represents **MongoDB** , which stores collections for Users, Stocks, Portfolios, Orders, Transactions, Watchlists, and Admin data. 

## **ER DIAGRAM:** 

- The Database section represents the MongoDB database that stores collections for Users, Admin, Stocks, Portfolios, Watchlists, Orders, and Transactions. These collections work together to manage user accounts, stock information, trading activities, investment portfolios, and real-time transaction records within the platform. 

The **Stock Trader ER Diagram** represents the entities and relationships involved in an online stock trading system. It illustrates how users, stocks, portfolios, watchlists, orders, transactions, and administrators are interconnected. 

Here is a breakdown of the entities and their relationships: 

**USER:** Represents the individuals who are registered on the platform. Users can create accounts, manage portfolios, place buy/sell orders, and maintain watchlists. 

**ADMIN:** Represents the administrators responsible for managing stocks, users, market information, and overall platform operations. 

**STOCKS:** Represents a collection of all stocks available for trading on the platform. Each stock contains information such as stock symbol, company name, current price, market capitalization, volume, and sector. 

**PORTFOLIO:** This collection stores all stocks purchased by users. It maintains details such as stock holdings, quantity, average purchase price, and total investment. Portfolio records are associated with specific users through the User ID. 

**WATCHLIST:** This collection stores stocks that users wish to monitor for future investment decisions. The stocks in the watchlist are differentiated by the User ID. 

**ORDERS:** This collection stores all buy and sell orders placed by users. It contains details such as stock information, order type, quantity, price, date, and order status. 

**TRANSACTIONS:** This collection stores all completed trading transactions generated from successful buy and sell orders. It maintains transaction records, trade amounts, stock details, and transaction timestamps. 

The Database section represents the database that stores collections for Users, Admin, Stocks, Portfolios, Watchlists, Orders, and Transactions **.** 

## **1. Comprehensive Stock Market Dashboard** 

Stock Trader provides a comprehensive stock market dashboard that enables users to monitor live stock prices, market trends, top gainers, top losers, and trading volumes. Users can easily explore available stocks and make informed investment decisions using real-time market data. 

## **2. Buy & Sell Stock Functionality** 

Each stock listing includes convenient Buy and Sell options. When users identify a stock that matches their investment goals, they can instantly place buy or sell orders through the trading interface. 

## **3. Detailed Stock Analysis Page** 

Upon selecting a stock, users are directed to a detailed stock information page. This page provides company details, current market price, historical performance charts, trading volume, market capitalization, and other important financial indicators to assist in investment analysis. 

## **4. Secure and Efficient Trading Process** 

Stock Trader ensures a secure and reliable trading experience. User authentication, transaction processing, and portfolio management are protected using modern security mechanisms. The platform is designed to provide fast and efficient trade execution **.** 

## **5. Order Confirmation and Trade History** 

After successfully placing a buy or sell order, users receive instant confirmation. They can review transaction details, order status, executed trades, and investment history through their account dashboard. 

## **6. Portfolio Management** 

The platform provides a dedicated portfolio management system where users can track their investments, monitor profit and loss, analyze portfolio performance, and view asset allocation in real time **.** 

## **7. Personalized Watchlist** 

Users can create and manage personalized watchlists by adding stocks they wish to monitor. This feature helps investors track potential investment opportunities and market movements efficiently. 

## **8. Real-Time Market Updates** 

The platform delivers real-time stock market updates using WebSocket technology, ensuring  users  receive  the  latest  stock  prices,  market  movements,  and  trading information without refreshing the page. 

## **9. User Profile and Account Management** 

Users can manage their profiles, update personal information, review trading activity, and maintain account settings through a dedicated profile section. 

## **10. Administrative Dashboard** 

In addition to investor-focused features, Stock Trader provides a powerful administrative dashboard. Administrators can manage users, monitor transactions, oversee stock information, view platform statistics, and maintain system operations efficiently. 

Stock Trader is designed to simplify stock market investing by providing a secure, userfriendly, and feature-rich trading environment. With real-time market updates, advanced stock  analysis,  portfolio  management  tools,  and  a  comprehensive  administrative dashboard, the platform delivers a seamless trading experience for both investors and administrators. 

## **ROLES AND RESPONSIBILITIES :** 

**USER:** Represents the individuals who are registered on the platform. Users can create accounts, view stock market data, add stocks to their watchlists, buy and sell stocks, manage portfolios, and track their transaction history. 

**ADMIN:** Represents the administrators responsible for managing platform operations. Admins can manage users, monitor transactions, update stock information, maintain market data, and oversee the overall functioning of the trading platform. 

**STOCKS** : Represents a collection of all stocks available for trading on the platform. It contains information such as stock symbol, company name, current price, market capitalization, trading volume, and sector details. 

**PORTFOLIO:** This  collection  stores  all  stocks  purchased  by  users.  It  maintains information about stock holdings, quantity, average purchase price, current value, and overall investment performance. Portfolio records are associated with specific users through the User ID. 

**WATCHLIST:** This collection stores stocks that users wish to monitor. The stocks in the  watchlist  are  differentiated  by  the  User  ID  and  help  users  track  potential investment opportunities. 

**ORDERS:** This collection stores all buy and sell orders placed by users. It includes information such as stock details, order type, quantity, price, order date, and order status. 

**TRANSACTIONS** : This collection stores all completed trading activities generated from successful buy and sell orders. It maintains records of transaction amounts, stock details, timestamps, and trade history. 

## **User Flow** 

- Users start by registering for an account. 

- After registration, they can log in with their credentials. 

- Once logged in, they can browse available stocks and view live market data. 

- Users can add stocks to their watchlists for future tracking. 

- They can buy or sell stocks directly through the trading interface. 

- Purchased stocks are automatically added to their portfolio. 

- Users can monitor their portfolio performance, profit/loss, and transaction history. 

- Administrators can manage users, stocks, and trading activities through the Admin Dashboard. 

## **MVC Pattern** 

The **Stock Trader backend application** follows the **Model-View-Controller (MVC)** architectural pattern, a software design approach that separates an application into three interconnected layers. This separation improves maintainability, scalability, and code organization while making the system easier to develop and manage. 

## **Model Layer (Data Layer)** 

The **Model Layer** is responsible for handling all data-related operations. It defines the database schemas and performs CRUD (Create, Read, Update, Delete) operations using MongoDB through Mongoose. 

The models in this project include: 

- User Model 

- Admin Model 

- Stock Model 

- Portfolio Model 

- Watchlist Model 

- Order Model 

- Transaction Model 

These models are used to store and retrieve data related to users, stock information, portfolios, trading orders, and transactions. 

## **Controller Layer** 

The **Controller Layer** acts as an intermediary between the routes and the models. It receives incoming requests from users, validates and processes the data, interacts with the appropriate models, and returns responses to the client. 

The controllers handle functionalities such as: 

- User Registration and Login 

- Authentication and Authorization 

- Stock Management 

- Portfolio Management 

- Watchlist Operations 

- Buy/Sell Order Processing 

- Transaction Management 

- Admin Operations 

## **View Layer (Routing Layer)** 

In the context of a backend REST API, the **View Layer** is implemented through Express.js routes. These routes define how the application responds to various HTTP requests such as GET, POST, PUT, and DELETE. 

The routing layer is responsible for: 

- User Routes 

- Authentication Routes 

- Stock Routes 

- Portfolio Routes 

- Watchlist Routes 

- Order Routes 

- Transaction Routes 

- Admin Routes 

Each route invokes the appropriate controller function to process the request and return the required response. 

. 

## **Advantages of Using MVC in This Project** 

- **Separation of Concerns:** Each layer has a specific responsibility, improving code readability and maintainability. 

- **Scalability:** New modules such as advanced analytics, mutual funds, or IPO management can be added easily without affecting existing functionality. 

- **Reusability:** Business logic written in controllers and models can be reused throughout the application. 

- **Testing:** Models, controllers, and routes can be tested independently, improving software quality. 

- **Security:** Authentication and authorization logic can be centralized and managed efficiently. 

- **Collaboration-Friendly:** Multiple developers can work on frontend, backend, and database components simultaneously without conflicts. 

- **Maintainability:** Changes in one layer have minimal impact on other layers, making future updates easier. 

## **PROJECT SETUP AND CONFIGURATION** 

- **●Creating project folder** 

1. Create a new folder with your project name ( **Stock Trader** ). 

2. Inside that folder, create two new folders. 

3. Name one folder **Client** . 

4. Name the other folder **Server** . 

5. Open the project folder in **Visual Studio Code** . 

. 

## **●Client setup (installing react app)** 

- ○Open the Client folder in the terminal of VScode. ■npm create vite@latest . -- --template react 

- ○Select React framework from the given options. 

■Select a framework: 

■ React 

○Select JavaScript variant from the given options. ■Select a variant: ■ JavaScript 

- ○Now lets navigate to the client folder by giving the following command. ■cd client 

- ○To install all the packages run the following command. ■npm install 

- ○To start the React server type the following command. ■npm run dev 

## **●Server setup (npm init)** 

- Open Server folder in terminal of VScode. ■npm init -y 

- ○Create files: 

■server.js 

○Create folders: ■Models ■controllers ■routes ■middleware ■config ■services 

## **BACKEND DEVELOPMENT:** 

## **1. Setup Express Server:** 

The first step in backend development is setting up the Express.js server. Create an index.js or server.js file as the main entry point of the application. Initialize an Express server and configure it to run on the desired port number. The server is responsible for handling incoming requests from the frontend and providing appropriate responses through API endpoints. Define the required APIs that will be used for authentication, stock management, portfolio management, watchlists, orders, transactions, and administrative operations. 

## **2. Database Configuration** 

Set up a MongoDB database either locally using MongoDB Compass or through a cloudbased service such as MongoDB Atlas. Create a database for the Stock Trader application and define the necessary collections for Users, Admins, Stocks, Portfolios, Watchlists, Orders, and Transactions. These collections store all the data required for managing user accounts, stock information, trading activities, and investment portfolios. 

## **3. Create Express.js Server** 

Configure the Express.js server to handle HTTP requests and serve RESTful API endpoints. Install and configure middleware such as body-parser or Express's built-in JSON parser for processing request bodies and cors middleware for enabling secure communication between the frontend and backend. Additional middleware can also be configured for authentication, logging, and error handling. 

## **4. Define API Routes** 

Create separate route files for different application functionalities such as authentication, users, stocks, portfolios, watchlists, orders, transactions, and administration. Define the required routes for user registration, login, stock listing, portfolio management, watchlist operations, stock buying and selling, and transaction history. Implement route handlers using Express.js to process requests, interact with the database, and return appropriate responses to the client **.** 

## **5. Implement Data Models** 

Define Mongoose schemas for various data entities used in the application, including Users, Admins, Stocks, Portfolios, Watchlists, Orders, and Transactions. Create corresponding Mongoose models to interact with the MongoDB database efficiently. Implement CRUD (Create, Read, Update, Delete) operations for each model to perform database-related activities such as adding stocks, updating portfolios, managing watchlists, and recording transactions. 

## **6. User Authentication** 

Implement secure user authentication using JWT (JSON Web Token). Create routes and middleware for user registration, login, and logout functionalities. Authentication middleware should be configured to protect sensitive routes that require authorized access. This ensures that only authenticated users can access trading features, portfolio data, and personal account information. 

## **7. Handle Stocks, Portfolio, and Orders** 

Create routes and controllers to handle stock-related operations, including fetching stock information, displaying market data, and managing watchlists. Implement buy and sell functionalities by creating routes and controllers that process order requests, validate user input, update portfolio holdings, and record transaction details. These operations ensure accurate tracking of investments and trading activities. 

## **8. Admin Functionality** 

Implement routes and controllers dedicated to administrative operations. These functionalities include managing users, monitoring transactions, updating stock information, and overseeing platform activities. Authentication and authorization checks should be added to ensure that only authorized administrators can access these routes and perform administrative tasks. 

## **9. Error Handling** 

Implement centralized error-handling middleware to catch and manage errors occurring during API requests. The system should return meaningful error messages along with appropriate HTTP status codes to help users and developers identify issues effectively. 

Proper error handling improves application reliability, debugging, and overall user experience. 

## **DATABASE DEVELOPMENT :** 

## **Schema use-case:** 

## **1. User Schema** 

- Schema: userSchema 

- Model: User 

- The User schema represents the user data and includes fields such as username, email, password, mobile number, account type, and profile information. 

- It is used to store user information for registration, authentication, portfolio management, and trading activities. 

- The email field is marked as unique to ensure that each user has a unique email address. 

## **2. Stock Schema** 

- Schema: stockSchema 

- Model: Stock 

- The Stock schema represents the data of all stocks available on the platform. 

- It is used to store information such as stock symbol, company name, current price, market capitalization, trading volume, sector, and stock performance details. 

- This information is used for displaying market data, stock analysis, and trading operations **.** 

## **3. Order Schema** 

- Schema: orderSchema 

- Model: Order 

- The Order schema represents buy and sell orders placed by users. 

- It includes fields such as userId, stockId, stock symbol, order type (Buy/Sell), quantity, price, order date, and order status. 

- It is used to store information about all trading orders made by users. 

- The userId field acts as a reference to the user who placed the order. 

## **4. Portfolio Schema** 

- Schema: portfolioSchema 

- Model: Portfolio 

- The Portfolio schema stores information about stocks owned by users. 

- It includes fields such as userId, stockId, stock symbol, quantity, average purchase price, total investment value, and current portfolio value. 

- It is used to track user investments and portfolio performance. 

- The userId field acts as a reference to the portfolio owner. 

## **5. Watchlist Schema** 

- Schema: watchlistSchema 

- Model: Watchlist 

- The Watchlist schema stores stocks that users wish to monitor for future investment opportunities. 

- It includes fields such as userId, stockId, stock symbol, company name, and date added. 

- The watchlist allows users to track selected stocks without purchasing them. 

- The userId field acts as a reference to the user who owns the watchlist. 

## **6. Transaction Schema** 

- Schema: transactionSchema 

- Model: Transaction 

- The Transaction schema stores records of completed trading activities. 

- It includes fields such as transactionId, userId, stockId, orderId, quantity, transaction amount, transaction type, and transaction date. 

- It is used to maintain the trading history and financial records of users. 

- The userId field references the user who performed the transaction. 

## **7. Admin Schema** 

- Schema: adminSchema 

- Model: Admin 

- The Admin schema stores administrator information and platform management details. 

- It includes fields such as username, email, password, role, permissions, and system management settings. 

- The Admin model is used to manage users, monitor transactions, update stock 

## information, and control platform operations. 

. 

## **Code Explanation:** 

## **Schemas:** 

Now let us define the required schemas 

## **FRONT-END DEVELOPMENT :** 

## **1. Setup React Application** 

- Create a React application in the Client folder using Vite. 

- Install required libraries such as React Router, Axios, Redux Toolkit, Chart.js, and Tailwind CSS. 

- Create pages like Login, Register, Dashboard, Stocks, Portfolio, Watchlist, and Admin Dashboard. 

- Configure routing for navigation between pages. 

## **2. Design UI Components** 

- Create reusable React components. 

- Implement responsive layouts and styling using Tailwind CSS. 

- Design components such as Navbar, Sidebar, Stock Cards, Portfolio Cards, and Charts. 

- Add navigation for smooth user experience. 

## **3. Implement Frontend Logic** 

- Integrate frontend with backend API endpoints using Axios. 

- Implement data binding to display dynamic data. 

- Manage application state using Redux Toolkit. 

- Display real-time stock prices and portfolio information. 

- Handle user authentication and session management. 

## **PROJECT EXECUTION** 

## **Steps for Project Execution: Step 1: Set Up the Frontend (React App):** 

- **a)** Open a terminal and navigate into the client folder: 

cd client 

- **b)** Once installation is done, start the React development server: 

- npm run dev 

- **c)** The app should now be running on: 

htp://localhost:5173 

## **Step 2: Set Up the Backend (Express Server)** 

- **a)** Open a new terminal tab/window or split the terminal. 

- **b)** Navigate into the server folder: 

cd ../server 

## **Step 3: Configure Environment Variables** 

- a) **Inside the** server f **older, create a new file named** **`.`** env **(no file extension).** 

## b) **In that** .env **file, add your MongoDB connection string:** 

MONGO_URI=mongodb://localhost:27017/stock_trader 

JWT_SECRET=your_secret_key PORT=5000 

## **Step 4: Start the Backend Server:** 

- Inside the same server folder, run the backend server using **:** 

nodemon index.js 

- ●The server should start on: 

htp://localhost:8210 

## **OUTPUT SCREENSHOTS :** 

**User Dashboard:** This is the User Dashboard page. It provides an overview of the user's wallet 

balance, investment details, watchlist stocks, and AI-powered financial assistance. 

**Market Page:** This is the Market Page where users can search, view, and analyze available stocks. Users can view stock information and purchase shares directly from this page. 

**Portfolio Page :** This is the Portfolio Page where users can monitor their investments, portfolio performance, profit/loss details, and sell owned stocks. 

**Stock Analysis Page:** This is the Stock Analysis Page. It provides historical stock performance charts, company details, current price information, and stock purchasing functionality.. 

**Admin Dashboard:** This is the Admin Dashboard where administrators can manage users, monitor transactions, and oversee platform activities. 

· **Watchlist View:** This dashboard displays the user's watchlist and investment 

summary, allowing users to track selected stocks and access stock charts quickly.. 

**Admin User Dashboard:** This page displays the dashboard view for an 

administrator account and provides access to both trading and administrative functionalities. 

**User Dashboard with Active Portfolio:** This dashboard shows a user account with active investments, displaying updated portfolio values, profit/loss information, and watchlist details. 

## **Demo Video:** 

- https://drive.google.com/fle/d/10Kzi5L1Qc4QxzoMtZ0L 7m69g4wpmeiV/view? usp=sharing-video link 

**Code :** code - Google Drive 

