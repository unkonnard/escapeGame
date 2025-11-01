// src/services/api.js
const getApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "https://escapegame-b9f9.onrender.com";
  }
  return "https://escapegame-b9f9.onrender.com"; // Chemin relatif en production
};

const API_BASE_URL = getApiUrl();

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.error || "Erreur de serveur");
    error.status = response.status;
    throw error;
  }
  return response.json();
};

const request = async (method, url, data = null) => {
  const config = {
    method,
    headers: getHeaders(),
    credentials: "include",
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    return handleResponse(response);
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Impossible de contacter le serveur. Vérifiez votre connexion."
      );
    }
    throw error;
  }
};

// Services API
export default {
  validateEnigma(enigmaNumber, code) {
    return request("POST", "/api/enigma/validate", { enigmaNumber, code });
  },

  getProgress() {
    return request("GET", "/api/enigma/progress");
  },

  getClues() {
    return request("GET", "/api/enigma/clues");
  },

  resetProgress() {
    return request("POST", "/api/enigma/reset");
  },

  testConnection() {
    return request("GET", "/api/health");
  },

  getTimer(userId, enigmaId) {
    return request("GET", `/api/timer/${userId}/${enigmaId}`);
  },

  syncTimer(timerData) {
    return request("POST", "/api/timer/sync", timerData);
  },

  // Nouveau endpoint utile
  checkToken() {
    return request("GET", "/api/auth/validate");
  },

  API_BASE_URL,
};
