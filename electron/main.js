const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let serverProcess = null;
let mongoProcess = null;
let mainWindow = null;

// Lancer MongoDB portable
async function startMongoDB() {
  return new Promise((resolve) => {
    const mongoPath = path.join(process.resourcesPath, 'mongodb');
    const dbPath = path.join(app.getPath('userData'), 'database');
    
    // Créer le dossier de données
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }

    // Lancer MongoDB (version portable Windows)
    const mongod = path.join(mongoPath, 'mongod.exe');
    
    mongoProcess = spawn(mongod, [
      '--dbpath', dbPath,
      '--port', '27017',
      '--noauth'
    ]);

    mongoProcess.stdout.on('data', (data) => {
      console.log(`MongoDB: ${data}`);
      if (data.toString().includes('waiting for connections')) {
        resolve();
      }
    });

    // Si MongoDB portable n'existe pas, utiliser MongoDB Memory Server
    mongoProcess.on('error', () => {
      console.log('Utilisation de MongoDB en mémoire');
      resolve();
    });

    setTimeout(resolve, 3000); // Timeout de sécurité
  });
}

// Lancer le serveur backend
function startBackend() {
  return new Promise((resolve) => {
    const serverPath = path.join(__dirname, '../server/index.js');
    
    serverProcess = spawn('node', [serverPath], {
      env: {
        ...process.env,
        MONGODB_URI: 'mongodb+srv://anaispicaut_db_user:4nP1c4ut@cluster0.z2g4wta.mongodb.net/',
        PORT: '5000'
      }
    });

    serverProcess.stdout.on('data', (data) => {
      console.log(`Backend: ${data}`);
      if (data.toString().includes('Server running')) {
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`Backend Error: ${data}`);
    });

    setTimeout(resolve, 2000);
  });
}

// Créer la fenêtre
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Escape Game',
    icon: path.join(__dirname, '../client/public/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true, // Masquer la barre de menu
  });

  // Charger le frontend
  mainWindow.loadFile(path.join(__dirname, '../client/build/index.html'));

  // Ouvrir DevTools en développement (à retirer en prod)
  // mainWindow.webContents.openDevTools();
}

// Initialisation de l'app
app.whenReady().then(async () => {
  console.log('Démarrage de l\'Escape Game...');
  
  await startMongoDB();
  console.log('✅ MongoDB démarré');
  
  await startBackend();
  console.log('✅ Backend démarré');
  
  createWindow();
  console.log('✅ Interface chargée');
});

// Fermeture propre
app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  if (mongoProcess) {
    mongoProcess.kill();
  }
  app.quit();
});

app.on('before-quit', () => {
  if (serverProcess) serverProcess.kill();
  if (mongoProcess) mongoProcess.kill();
});