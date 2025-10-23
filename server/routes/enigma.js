const express = require('express');
const jwt = require('jsonwebtoken');
const Progress = require('../models/Progress');
const DatabaseClue = require('../models/DatabaseClue');

const router = express.Router();

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    console.log('❌ Aucun header authorization fourni');
    return res.status(401).json({ error: 'Non authentifié' });
  }

  // ✅ CORRECTION : Extraire correctement le token
  let token;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7); // Enlève "Bearer " (7 caractères)
  } else {
    token = authHeader; // Utilise le header tel quel si pas de "Bearer"
  }
  
  if (!token) {
    console.log('❌ Aucun token trouvé');
    return res.status(401).json({ error: 'Non authentifié' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('❌ Token invalide:', err.message);
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.userId = decoded.userId;
    console.log('✅ Utilisateur authentifié:', req.userId);
    next();
  });
};

// Récupérer la progression
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.userId });
    
    // Si aucune progression n'existe, en créer une nouvelle
    if (!progress) {
      progress = await Progress.create({
        userId: req.userId,
        currentEnigma: 1,
        completedEnigmas: []
      });
      console.log('🆕 Nouvelle progression créée pour:', req.userId);
    }
    
    console.log('📊 Progression récupérée:', progress);
    res.json(progress);
  } catch (error) {
    console.error('❌ Erreur récupération progression:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Valider un code et passer à l'énigme suivante
router.post('/validate', authenticateToken, async (req, res) => {
  try {
    const { enigmaNumber, code } = req.body;

    console.log(`🔍 Tentative de validation - Énigme ${enigmaNumber}:`, code);

    // Codes corrects pour chaque énigme
    const correctCodes = {
      1: 'PIGPEN',      // Code Pigpen (ajustez selon votre énigme)
      2: 'MONGOOSE',   // Code base de données
      3: 'HIDDEN',     // Code caché dans le CSS
      4: 'EASTEREGG',  // Code dans le titre de la page
      5: 'OBVIOUS'     // Code dans l'image hover
    };

    // Validation du numéro d'énigme
    if (!correctCodes[enigmaNumber]) {
      console.log('❌ Numéro d\'énigme invalide:', enigmaNumber);
      return res.status(400).json({ error: 'Énigme invalide' });
    }

    // Vérification du code
    if (code.toUpperCase() !== correctCodes[enigmaNumber]) {
      console.log(`❌ Code incorrect pour l'énigme ${enigmaNumber}:`, code);
      return res.status(400).json({ error: 'Code incorrect, réessayez !' });
    }

    console.log(`✅ Code correct pour l'énigma ${enigmaNumber}`);

    // Trouver ou créer la progression
    let progress = await Progress.findOne({ userId: req.userId });
    
    if (!progress) {
      progress = await Progress.create({
        userId: req.userId,
        currentEnigma: 1,
        completedEnigmas: []
      });
      console.log('🆕 Nouvelle progression créée');
    }
    
    // Mettre à jour la progression
    if (!progress.completedEnigmas.includes(enigmaNumber)) {
      progress.completedEnigmas.push(enigmaNumber);
      console.log(`📝 Énigme ${enigmaNumber} ajoutée aux complétées`);
    }
    
    progress.currentEnigma = enigmaNumber + 1;
    progress.updatedAt = Date.now();
    
    await progress.save();

    console.log('💾 Progression sauvegardée:', {
      userId: progress.userId,
      currentEnigma: progress.currentEnigma,
      completedEnigmas: progress.completedEnigmas
    });

    res.json({
      success: true,
      message: 'Bravo ! Code correct !',
      nextEnigma: enigmaNumber + 1,
      totalCompleted: progress.completedEnigmas.length,
      progress: progress
    });
  } catch (error) {
    console.error('❌ Erreur validation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer les indices de la base de données (énigme 2)
router.get('/clues', authenticateToken, async (req, res) => {
  try {
    const clues = await DatabaseClue.find({});
    console.log(`📋 ${clues.length} indices récupérés`);
    
    if (clues.length === 0) {
      console.log('⚠️ Aucun indice trouvé dans la base de données');
      // Retourner des données d'exemple si la collection est vide
      return res.json([
        {
          _id: '1',
          clueKey: 'admin',
          clueValue: 'Admin User',
          number: '001',
          password: 'MONGOOSE',
          autorization: 'superadmin',
          lastLog: '2024-01-20',
          firstLog: '2024-01-01',
          numPurchase: 42,
          shipAdress: '123 Database Street'
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