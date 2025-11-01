const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Progress = require("../models/Progress");

const router = express.Router();

/**
 * Middleware d'authentification intégré directement dans le fichier
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Accès non autorisé" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.error("❌ Erreur validation token:", err);
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
// Middleware de diagnostic
app.use((req, res, next) => {
  if (req.path.includes("/auth")) {
    console.log("====== REQUEST IN ======");
    console.log("Method:", req.method);
    console.log("Origin:", req.headers.origin);
    console.log("Body:", req.body);
  }
  next();
});

/**
 * Génère un token JWT pour l'utilisateur donné
 */
function generateToken(userId) {
  if (!process.env.JWT_SECRET) {
    console.error("❌ ERREUR CRITIQUE: JWT_SECRET non défini dans .env");
    throw new Error("Configuration serveur invalide");
  }

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Durée de 1 jour
  );
}

/**
 * ============================
 *   📘 ROUTE D'INSCRIPTION
 * ============================
 */
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation robuste
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires" });
    }

    // Validation du format d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Format d'email invalide" });
    }

    // Validation de la force du mot de passe
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Le mot de passe doit contenir au moins 8 caractères" });
    }

    // Vérifie si l'utilisateur existe déjà
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email déjà utilisé" }); // 409 Conflict
    }

    // Hash sécurisé du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Création du nouvel utilisateur
    const user = await User.create({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Création d'une progression de jeu par défaut
    await Progress.create({
      userId: user._id,
      currentEnigma: 1,
      completedEnigmas: [],
      lastUpdated: new Date(),
    });

    // Génération du token JWT
    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Inscription réussie",
      token,
      userId: user._id,
    });
  } catch (err) {
    console.error("❌ Erreur signup:", err);
    res
      .status(500)
      .json({ error: "Erreur serveur, veuillez réessayer plus tard" });
  }
});

/**
 * ============================
 *      🔐 ROUTE DE LOGIN
 * ============================
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation robuste
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    // Récupère utilisateur avec le mot de passe
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" }); // 401 Unauthorized
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    // Génère un nouveau JWT
    const token = generateToken(user._id);

    // Réponse avec les tokens
    res.json({
      message: "Connexion réussie",
      token,
      userId: user._id,
    });
  } catch (err) {
    console.error("❌ Erreur login:", err);
    res
      .status(500)
      .json({ error: "Erreur serveur, veuillez réessayer plus tard" });
  }
});

/**
 * =============================
 *      🔍 VALIDATION DE TOKEN
 * =============================
 */
router.post("/validate", authMiddleware, async (req, res) => {
  try {
    // Si le middleware authMiddleware est passé, le token est valide
    const userId = req.user.userId;

    // On pourrait faire une vérification supplémentaire si nécessaire
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res
        .status(401)
        .json({ valid: false, error: "Utilisateur introuvable" });
    }

    res.json({ valid: true, userId });
  } catch (err) {
    console.error("❌ Erreur validation token:", err);
    res.status(500).json({ valid: false, error: "Erreur serveur" });
  }
});

module.exports = router;
