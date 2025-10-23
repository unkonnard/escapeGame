require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configuration CORS
app.use(cors({
  origin: [
    'http://localhost:3000', // Votre URL locale
    'https://*.ngrok.io'     // Autoriser toutes les URLs Ngrok
  ],
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB avec gestion d'erreurs (sans options dépréciées)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
    process.exit(1);
  });

// Importer les routes
const authRoutes = require('./routes/auth');
const enigmaRoutes = require('./routes/enigma'); // ✅ Ajoutez cette ligne

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/enigma', enigmaRoutes); // ✅ Ajoutez cette ligne

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Serveur Escape Game actif',
    timestamp: new Date(),
    routes: ['/api/auth', '/api/enigma']
  });
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.path 
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 Accessible sur http://localhost:${PORT}`);
  console.log(`🌐 Accessible sur le réseau local`);
});