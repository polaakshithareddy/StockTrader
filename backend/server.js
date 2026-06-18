const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Stock = require('./models/Stock');

dotenv.config();

connectDB();

const app = express();

// Create HTTP server instead of using app.listen directly
const server = http.createServer(app);

// Initialize Socket.io
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_2, // optional second frontend URL
].filter(Boolean);

// CORS origin checker: allows exact matches + any *.vercel.app preview URLs
const corsOriginCheck = (origin, callback) => {
  // Allow requests with no origin (mobile apps, Postman, server-to-server)
  if (!origin) return callback(null, true);
  
  const isAllowed =
    allowedOrigins.includes(origin) ||
    /https:\/\/[a-z0-9-]+-[a-z0-9-]+\.vercel\.app$/.test(origin) ||
    /https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin);
  
  if (isAllowed) {
    callback(null, true);
  } else {
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`CORS policy: origin ${origin} not allowed`));
  }
};

const io = new Server(server, {
  cors: {
    origin: corsOriginCheck,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: corsOriginCheck,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/trade', require('./routes/tradeRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

// --- WebSocket Simulation Logic ---
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Broadcast simulated live prices every 3 seconds
setInterval(async () => {
  // Only broadcast if there are connected clients
  if (io.engine.clientsCount > 0) {
    try {
      const stocks = await Stock.find({});
      
      // Map over stocks and apply a tiny random wiggle (-0.1% to +0.1%)
      const updatedPrices = stocks.map(stock => {
        // Generate random multiplier between 0.999 and 1.001
        const wiggle = 1 + (Math.random() * 0.002 - 0.001);
        const newPrice = stock.currentPrice * wiggle;
        return {
          _id: stock._id.toString(),
          symbol: stock.symbol,
          currentPrice: Number(newPrice.toFixed(2)) // Keep it to 2 decimals
        };
      });

      // Emit the batched updates to all connected frontends
      io.emit('priceUpdate', updatedPrices);
    } catch (err) {
      console.error('Error broadcasting prices:', err);
    }
  }
}, 3000); // 3 seconds

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
