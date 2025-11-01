const router = require('express').Router();
const Timer = require('../models/timer.model');

// Sauvegarder l'état du timer
router.post('/sync', async (req, res) => {
  try {
    const { userId, startTime, accumulatedTime, isRunning, enigmaId } = req.body;
    
    const updatedTimer = await Timer.findOneAndUpdate(
      { userId, enigmaId },
      { 
        startTime: isRunning ? new Date() : null,
        accumulatedTime,
        isRunning
      },
      { upsert: true, new: true }
    );
    
    res.json(updatedTimer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer l'état du timer
router.get('/:userId/:enigmaId', async (req, res) => {
  try {
    const timer = await Timer.findOne({
      userId: req.params.userId,
      enigmaId: req.params.enigmaId
    });
    res.json(timer || { accumulatedTime: 0, isRunning: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});