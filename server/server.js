const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ← ADD THIS LINE
const WebSocketHandler = require('./utils/websocketHandler');

const app = express();
// ← CHANGE THESE 2 LINES
const httpServer = http.createServer(app);
const wsHandler = new WebSocketHandler(httpServer);

// Middleware - CORS configuration
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map(url => url.trim());

console.log('🔓 CORS Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`📍 Database: ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/products', adminProductRoutes);

// ← ADD THIS BLOCK
// Make WebSocket handler available to routes
app.use((req, res, next) => {
  req.wsHandler = wsHandler;
  next();
});

// WebSocket stats endpoint
app.get('/api/ws-stats', (req, res) => {
  res.json(wsHandler.getConnectionStats());
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'VitalMEDS API is running!', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    websocket: 'Connected'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5000;
// ← CHANGE THIS LINE from app.listen to httpServer.listen
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 WebSocket available at ws://localhost:${PORT}`);
  console.log(`📱 Frontend URL(s): ${process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📚 Available Routes:`);
  console.log(`   ✓ POST   /api/auth/register`);
  console.log(`   ✓ POST   /api/auth/login`);
  console.log(`   ✓ GET    /api/auth/profile`);
  console.log(`   ✓ GET    /api/auth/verify`);
  console.log(`   ✓ GET    /api/products`);
  console.log(`   ✓ GET    /api/products/:id`);
  console.log(`   ✓ GET    /api/products/filters/metadata`);
  console.log(`   ✓ POST   /api/products (admin)`);
  console.log(`   ✓ PUT    /api/products/:id (admin)`);
  console.log(`   ✓ DELETE /api/products/:id (admin)`);
  console.log(`\n✅ Setup complete! You're ready to go.\n`);
});

module.exports = httpServer;
