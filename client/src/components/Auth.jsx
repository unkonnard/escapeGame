import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

function Auth({ onLogin }) {
  // Déclaration de TOUS les hooks et états
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const onLoginRef = useRef(onLogin);

  useEffect(() => {
    onLoginRef.current = onLogin;
  }, [onLogin]);

  // 🔍 Fonction pour parser les réponses JSON de manière sécurisée
  const safeFetchJson = async (response) => {
    const textResponse = await response.text();
    try {
      return JSON.parse(textResponse);
    } catch (error) {
      console.error("Échec du parsing JSON:", {
        status: response.status,
        headers: [...response.headers.entries()],
        response: textResponse,
      });
      return {
        error: true,
        message: `Réponse serveur inattendue (${response.status})`,
        raw: textResponse,
      };
    }
  };

  // 🔍 Validation du token
  const validateToken = async (token, userId) => {
    if (!token || !userId) return false;

    try {
      const baseUrl =
        process.env.REACT_APP_API_BASE_URL ||
        "https://escapegame-b9f9.onrender.com";
      const url = new URL("/api/auth/validate", baseUrl).toString();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await safeFetchJson(response);

      if (data.error) {
        console.error("❌ Erreur validation token:", data.message);
        return false;
      }

      return data.valid;
    } catch (err) {
      console.error("❌ Erreur validation token:", err);
      return false;
    }
  };

  // 🔍 Vérification de session au montage
  useEffect(() => {
    let isActive = true;

    const checkExistingSession = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) return;

      try {
        const isValid = await validateToken(token, userId);
        if (!isActive) return;

        if (isValid) {
          console.log("✅ Session existante valide");
          onLoginRef.current(token, userId);
        } else {
          console.warn("⚠️ Session invalide, nettoyage...");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      } catch (err) {
        console.error("❌ Erreur lors de la vérification de session:", err);
      }
    };

    checkExistingSession();

    return () => {
      isActive = false;
    };
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "login" : "signup";
    const baseUrl =
      process.env.REACT_APP_API_BASE_URL ||
      "https://escapegame-b9f9.onrender.com";
    const url = new URL(`/api/auth/${endpoint}`, baseUrl).toString();

    try {
      console.log("🚀 Envoi requête à:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Diagnostic
      console.groupCollapsed("🔍 Diagnostic réponse serveur");
      console.log("URL appelée:", url);
      const textResponse = await response.clone().text();
      console.log("Status:", response.status);
      console.log("Body:", textResponse);
      console.groupEnd();

      const data = await safeFetchJson(response);

      if (!response.ok) {
        throw new Error(
          data.message || `Erreur ${response.status}: ${response.statusText}`
        );
      }

      if (!data.token || !data.userId) {
        throw new Error("Réponse serveur incomplète");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      onLoginRef.current(data.token, data.userId);
    } catch (err) {
      console.error("❌ Erreur authentification:", err);

      let errorMessage = err.message || "Erreur inconnue";

      // Gestion spéciale des erreurs CORS
      if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
        errorMessage =
          "Erreur de connexion au serveur. Vérifiez votre réseau et CORS.";
      }

      // Échappement XSS
      const safeMessage = errorMessage
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      setError(safeMessage);
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle = {
    padding: isMobile ? "20px" : isTablet ? "30px" : "40px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: isMobile ? "100%" : isTablet ? "450px" : "500px",
    padding: isMobile ? "25px 20px" : isTablet ? "35px 30px" : "45px 40px",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: isMobile
      ? "0 4px 15px rgba(0,0,0,0.1)"
      : "0 10px 25px rgba(0,0,0,0.15)",
  };

  const titleStyle = {
    fontSize: isMobile ? "20px" : isTablet ? "24px" : "28px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
  };

  const inputStyle = {
    width: "100%",
    padding: isMobile ? "12px 15px" : "14px 18px",
    fontSize: "16px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: isMobile ? "12px" : "14px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1,
    transition: "all 0.3s ease",
    background: loading
      ? "#999"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
  };

  const toggleContainerStyle = {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
  };

  const toggleButtonStyle = {
    marginLeft: "8px",
    background: "transparent",
    color: "#667eea",
    textDecoration: "underline",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  };

  const errorStyle = {
    padding: "12px",
    marginBottom: "15px",
    fontSize: "14px",
    borderRadius: "8px",
    textAlign: "center",
    background: "#fee2e2",
    color: "#dc2626",
    border: "1px solid #fca5a5",
    fontWeight: "500",
    overflowWrap: "break-word",
    maxWidth: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🔐 Escape Game - Authentification</h1>

        {error && (
          <div style={errorStyle} role="alert" aria-live="assertive">
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
              ⚠️ Erreur
            </div>
            <div>{error}</div>
            <div
              style={{ marginTop: "10px", fontSize: "12px", color: "#9d0208" }}
            >
              Consultez la console pour plus de détails
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            disabled={loading}
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Mot de passe (min. 6 caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
            disabled={loading}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading
              ? "⏳ Chargement..."
              : isLogin
              ? "🔓 Se connecter"
              : "✨ S'inscrire"}
          </button>
        </form>

        <div style={toggleContainerStyle}>
          {isLogin ? (
            <p>
              Pas encore de compte?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setEmail("");
                  setPassword("");
                }}
                style={toggleButtonStyle}
                disabled={loading}
              >
                S'inscrire
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setEmail("");
                  setPassword("");
                }}
                style={toggleButtonStyle}
                disabled={loading}
              >
                Se connecter
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media screen and (max-width: 767px) {
          input[type="email"],
          input[type="password"] {
            font-size: 16px !important;
          }
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
          border-color: #667eea;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Auth;
