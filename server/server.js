// Désactiver l'avertissement de dépréciation
process.noDeprecation = true;

// --- Import des dépendances principales ---
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const os = require("os");

// --- Initialisation d'Express ---
const app = express();

// --- Configuration CORS (simplifiée) ---
app.use(
  cors({
    origin: true, // Accepte toutes les origines en développement
    credentials: true,
  })
);

// --- Middleware JSON ---
app.use(express.json());

// --- Connexion à MongoDB ---
if (!process.env.MONGODB_URI) {
  console.error("❌ Erreur: Variable d'environnement MONGODB_URI non définie");
  process.exit(1);
}

console.log("🔄 Tentative de connexion à MongoDB...");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 2000,
  })
  .then(() => {
    console.log("✅ Connecté à MongoDB");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB:", err.message);
    console.error(
      "URI utilisée:",
      process.env.MONGODB_URI.replace(
        /mongodb:\/\/([^:]+):([^@]+)@/,
        "mongodb://***:***@"
      )
    );
    process.exit(1);
  });

// --- Import des routes ---
const authRoutes = require("./routes/auth");
const enigmaRoutes = require("./routes/enigma");

// --- Déclaration des routes API ---
app.use("/api/auth", authRoutes);
app.use("/api/enigma", enigmaRoutes);

// --- Servir les fichiers React buildés ---
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));

// Toute route non-API renvoie le front React (TOUJOURS en dernier)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// --- Fonction pour obtenir l'IP locale ---
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "Non disponible";
}

// --- Démarrage du serveur (PORT 5000) ---
const PORT = process.env.PORT || 5000;

// Si Render définit un domaine public, tu peux le préciser ici pour la lisibilité
const PUBLIC_URL =
  process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

app.listen(PORT, "0.0.0.0", () => {
  console.log("\n==============================================");
  console.log("🚀 SERVEUR ESCAPE GAME DÉMARRÉ");
  console.log("==============================================");
  console.log(`📡 Serveur:         ${PUBLIC_URL}`);
  console.log(`📡 API:             ${PUBLIC_URL}/api`);
  console.log("==============================================\n");
});

// --- Gestion des erreurs non capturées ---
process.on("unhandledRejection", (err) => {
  console.error("💥 Erreur non gérée:", err);
});

process.on("uncaughtException", (err) => {
  console.error("💥 Exception non interceptée:", err);
});
