const socketIO = require('socket.io');

class WebSocketHandler {
  constructor(httpServer) {
    this.io = socketIO(httpServer, {
      cors: {
        origin: [
          'http://localhost:5173', // Client
          'http://localhost:5174'  // Admin
        ],
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.adminConnections = new Map();
    this.clientConnections = new Map();
    this.pendingOrders = [];
    this.setupListeners();
  }

  setupListeners() {
    this.io.on('connection', (socket) => {
      console.log(`✅ New connection: ${socket.id}`);

      // ========== CLIENT EVENTS ==========
      socket.on('client:connect', (userId) => {
        this.clientConnections.set(userId, socket.id);
        socket.join('client-room');
        console.log(`📱 Client connected: ${userId} - Socket: ${socket.id}`);
      });

      socket.on('client:place-order', (orderData) => {
        console.log(`🛒 Order placed by client:`, orderData);
        
        this.pendingOrders.push({
          ...orderData,
          receivedAt: new Date(),
          status: 'pending'
        });

        this.io.to('admin-room').emit('admin:new-order', {
          ...orderData,
          receivedAt: new Date(),
          status: 'pending'
        });

        socket.emit('client:order-confirmed', {
          message: 'Order received by admin',
          timestamp: new Date()
        });
      });

      socket.on('client:request-product', (data) => {
        console.log(`📦 Product request from client:`, data);

        this.io.to('admin-room').emit('admin:product-request', {
          clientId: data.clientId,
          productId: data.productId,
          quantity: data.quantity,
          timestamp: new Date(),
          status: 'new_request'
        });
      });

      // ========== ADMIN EVENTS ==========
      socket.on('admin:connect', (adminId) => {
        this.adminConnections.set(adminId, socket.id);
        socket.join('admin-room');
        console.log(`👨‍💼 Admin connected: ${adminId} - Socket: ${socket.id}`);

        // Send pending orders to admin when they connect
        socket.emit('admin:pending-orders', {
          orders: this.pendingOrders,
          message: 'Syncing pending orders...'
        });
      });

      socket.on('admin:update-product', (productData) => {
        console.log(`✏️ Product updated by admin:`, productData);

        this.io.to('client-room').emit('client:product-updated', {
          ...productData,
          updatedAt: new Date()
        });
      });

      socket.on('admin:update-order-status', (orderData) => {
        console.log(`📊 Order status updated:`, orderData);

        // Notify specific client
        const clientSocket = Array.from(this.clientConnections.values()).find(
          socketId => this.io.sockets.sockets.get(socketId)?.userId === orderData.clientId
        );

        if (clientSocket) {
          this.io.to(clientSocket).emit('client:order-status-updated', {
            ...orderData,
            updatedAt: new Date()
          });
        }

        // Notify all admins
        this.io.to('admin-room').emit('admin:order-updated', orderData);

        // Remove from pending
        this.pendingOrders = this.pendingOrders.filter(o => o._id !== orderData._id);
      });

      socket.on('admin:acknowledge-order', (orderId) => {
        console.log(`✅ Order acknowledged by admin:`, orderId);
        
        this.pendingOrders = this.pendingOrders.filter(o => o._id !== orderId);
        
        this.io.to('admin-room').emit('admin:order-acknowledged', {
          orderId,
          timestamp: new Date()
        });
      });

      // ========== DISCONNECT ==========
      socket.on('disconnect', () => {
        console.log(`❌ Disconnected: ${socket.id}`);
        
        for (let [key, value] of this.clientConnections) {
          if (value === socket.id) {
            this.clientConnections.delete(key);
            console.log(`📱 Client removed: ${key}`);
          }
        }
        
        for (let [key, value] of this.adminConnections) {
          if (value === socket.id) {
            this.adminConnections.delete(key);
            console.log(`👨‍💼 Admin removed: ${key}`);
          }
        }
      });

      // ========== ERROR HANDLING ==========
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    });
  }

  broadcastToAdmins(event, data) {
    this.io.to('admin-room').emit(event, data);
  }

  broadcastToClients(event, data) {
    this.io.to('client-room').emit(event, data);
  }

  notifyUser(userId, event, data) {
    const socketId = this.clientConnections.get(userId) || this.adminConnections.get(userId);
    if (socketId) {
      this.io.to(socketId).emit(event, data);
    }
  }

  getPendingOrders() {
    return this.pendingOrders;
  }

  getConnectionStats() {
    return {
      adminsConnected: this.adminConnections.size,
      clientsConnected: this.clientConnections.size,
      pendingOrders: this.pendingOrders.length
    };
  }
}

module.exports = WebSocketHandler;
