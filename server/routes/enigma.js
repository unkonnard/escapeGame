// routes/enigma.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Progress = require('../models/Progress');
const DatabaseClue = require('../models/DatabaseClue');

const router = express.Router();

// Solution des énigmes (plus sécurisé)
const ENIGMA_SOLUTIONS = {
  1: 'PIGPEN',
  2: 'MONGOOSE',
  3: 'HIDDEN',
  4: 'EASTEREGG',
  5: 'OBVIOUS'
};

// Middleware d'authentification amélioré
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  
  // Support Bearer token + cookie (pour flexibilité)
  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    token = req.cookies?.token || '';
  }
  
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Validation d'énigme - Version corrigée
router.post('/validate', authenticateToken, async (req, res) => {
  try {
    const { enigmaNumber, code } = req.body;
    
    // Validation
    if (!enigmaNumber || !code) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }
    
    const solution = ENIGMA_SOLUTIONS[enigmaNumber];
    if (!solution) {
      return res.status(400).json({ error: 'Énigme invalide' });
    }
    
    // Validation insensible à la casse et aux espaces
    const userCode = code.trim().toUpperCase();
    
    if (userCode !== solution) {
      return res.status(400).json({ error: 'Code incorrect, réessayez !' });
    }

    // Mise à jour de la progression
    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId },
      {
        $addToSet: { completedEnigmas: enigmaNumber },
        $set: { currentEnigma: enigmaNumber + 1 },
        $currentDate: { lastUpdated: true }
      },
      { 
        upsert: true,
        new: true,
        returnDocument: 'after'
      }
    );

    res.json({
      success: true,
      message: 'Bravo ! Code validé !',
      nextEnigma: progress.currentEnigma,
      completedEnigmas: progress.completedEnigmas
    });
    
  } catch (error) {
    console.error('❌ Erreur validation énigme:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer les indices (énigme 2) - Version améliorée
router.get('/clues', authenticateToken, async (req, res) => {
  try {
    const clues = await DatabaseClue.find({});
    
    if (clues.length === 0) {
      // Backup en cas de base vide
      return res.json([
        {
          id: 'backup-1',
          title: 'Indice de sécurité',
          content: 'Le mot de passe est caché dans le schéma de la base'
        },
        {
          id: 'backup-2',
          title: 'Mongoose',
          content: 'Recherchez le mot-clé associé à la bibliothèque MongoDB'
        }
      ]);
    }
    
    res.json(clues);
    
  } catch (error) {
    console.error('❌ Erreur récupération indices:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour réinitialiser la progression (utile pour les tests)
router.post('/reset', authenticateToken, async (req, res) => {
  try {
    await Progress.updateOne(
      { userId: req.userId },
      { 
        currentEnigma: 1,
        completedEnigmas: [],
        updatedAt: Date.now()
      },
      { upsert: true }
    );
    
    console.log('🔄 Progression réinitialisée pour:', req.userId);
    res.json({ message: 'Progression réinitialisée' });
  } catch (error) {
    console.error('❌ Erreur réinitialisation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;