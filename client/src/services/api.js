// src/services/api.js

/**
 * Détection automatique de l'URL de base pour les appels API
 * 
 * Scénarios pris en charge :
 * - Dev (React sur localhost:3000) → API sur http://localhost:5000
 * - Réseau local (React sur 192.168.x.x:3000) → API sur http://192.168.x.x:5000
 * - Production (frontend servi par Express sur le même port 5000) → requêtes relatives ""
 */
const getApiUrl = () => {
  const { protocol, hostname, port } = window.location;

  // Mode développement : front sur 3000, back sur 5000
  if (port === '3000') {
    return 'http://localhost:5000';
  }

  // Mode production : le front est déjà servi par Express
  // donc on utilise des URLs relatives pour éviter les conflits d’origines
  if (port === '5000' || port === '' || !port) {
    return '';
  }

  // Cas spécifique : réseau local (IP 192.168.x.x)
  return `${protocol}//${hostname}:5000`;
};

const API_BASE_URL = getApiUrl();

/**
 * Construit les en‑têtes par défaut de chaque requête.
 * Ajoute le token JWT s’il est présent dans localStorage.
 */
const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

/**
 * Requête POST générique.
 */
const postJson = async (url, bodyObj) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(bodyObj),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Erreur HTTP ${response.status}`);
  }

  return data;
};

/**
 * Requête GET générique.
 */
const getJson = async (url) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Erreur HTTP ${response.status}`);
  }

  return data;
};

// ---------- Fonctions API concrètes ----------

/**
 * Validation d'une énigme
 */
export const validateEnigma = async (enigmaNumber, answer) => {
  try {
    return await postJson('/api/enigma/validate', {
      enigmaNumber,
      code: answer,
    });
  } catch (error) {
    console.error('Erreur validateEnigma:', error);
    throw error;
  }
};

/**
 * Récupération de la progression du joueur
 */
export const getProgress = async () => {
  try {
    return await getJson('/api/enigma/progress');
  } catch (error) {
    console.error('Erreur getProgress:', error);
    throw error;
  }
};

/**
 * Récupération des indices (énigme 2)
 */
export const getClues = async () => {
  try {
    return await getJson('/api/enigma/clues');
  } catch (error) {
    console.error('Erreur getClues:', error);
    throw error;
  }
};

/**
 * Réinitialisation de la progression du joueur
 */
export const resetProgress = async () => {
  try {
    return await postJson('/api/enigma/reset', {});
  } catch (error) {
    console.error('Erreur resetProgress:', error);
    throw error;
  }
};

// ---------- Export global ----------

const apiService = {
  validateEnigma,
  getProgress,
  getClues,
  resetProgress,
  API_BASE_URL,
};

export default apiService;