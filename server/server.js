// server.js

// --- Import des dépendances principales ---
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Initialisation d'Express ---
const app = express();

// --- Configuration CORS (API accessible depuis ton front) ---
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.1.64:3000'
  ],
  credentials: true
}));
// --- Middleware JSON ---
app.use(express.json());

// --- Connexion MongoDB ---
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => {
  console.error('❌ Erreur de connexion à MongoDB:', err.message);
  process.exit(1);
});

// --- Import des routes ---
const authRoutes = require('./routes/auth');
const enigmaRoutes = require('./routes/enigma');

// --- Utilisation des routes ---
app.use('/api/auth', authRoutes);
app.use('/api/enigma', enigmaRoutes);

// --- En production : servir les fichiers React ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Toute route non API renvoie le front
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
} else {
  // En dev : simple route de test
  app.get('/', (req, res) => {
    res.json({
      message: 'Serveur Escape Game actif (mode développement)',
      timestamp: new Date(),
      routes: ['/api/auth', '/api/enigma'],
    });
  });
}

// --- Gestion des routes non trouvées ---
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
  });
});

// --- Démarrage du serveur ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 Accessible via : http://localhost:${PORT}`);
  console.log(`📡 Accessible sur le réseau : http://192.168.1.64:${PORT}`);
});