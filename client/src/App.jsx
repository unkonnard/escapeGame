import React, { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Auth from "./components/Auth";
import Timer from "./components/Timer";
import Enigme1 from "./pages/Enigma1";
import Enigme2 from "./pages/Enigma2";
import Enigme3 from "./pages/Enigma3";
import Enigme4 from "./pages/Enigma4";
import Enigme5 from "./pages/Enigma5";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentEnigma, setCurrentEnigma] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  const TOTAL_ENIGMES = 5;
  const saveTimerStateRef = useRef(() => {});

  const handleLogin = useCallback(
    (newToken, newUserId) => {
      console.log("🔐 Connexion:", { newToken, newUserId });
      setToken(newToken);
      setUserId(newUserId);

      const savedTimer = JSON.parse(localStorage.getItem(`timer_${newUserId}`));
      console.log("💾 Timer sauvegardé:", savedTimer);

      if (savedTimer && savedTimer.gameFinished) {
        setGameFinished(true);
        setTotalTime(savedTimer.accumulatedTime || 0);
        setCurrentEnigma(savedTimer.currentEnigma || TOTAL_ENIGMES);
        setIsTimerActive(false);
        setStartTime(null);
        setAccumulatedTime(savedTimer.accumulatedTime || 0);
      } else if (savedTimer) {
        const now = Date.now();
        setStartTime(now);
        setIsTimerActive(true);
        setCurrentEnigma(savedTimer.currentEnigma || 1);
        setAccumulatedTime(savedTimer.accumulatedTime || 0);
        setGameFinished(false);

        console.log(
          "⏰ Session reprise à l'énigme",
          savedTimer.currentEnigma,
          "avec temps accumulé:",
          savedTimer.accumulatedTime
        );
      } else {
        const now = Date.now();
        console.log(
          "🆕 Nouveau timer démarré à:",
          new Date(now).toLocaleTimeString()
        );
        setStartTime(now);
        setIsTimerActive(true);
        setCurrentEnigma(1);
        setAccumulatedTime(0);
        setGameFinished(false);
      }
    },
    [TOTAL_ENIGMES]
  );

  useEffect(() => {
    saveTimerStateRef.current = () => {
      if (userId) {
        let finalAccumulated = accumulatedTime;

        if (startTime && isTimerActive) {
          const currentSessionTime = Date.now() - startTime;
          finalAccumulated += currentSessionTime;
        }

        const dataToSave = {
          startTime: isTimerActive ? startTime : null,
          isTimerActive,
          currentEnigma,
          accumulatedTime: finalAccumulated,
          gameFinished,
        };

        console.log("💾 Sauvegarde:", dataToSave);
        localStorage.setItem(`timer_${userId}`, JSON.stringify(dataToSave));

        if (startTime && isTimerActive) {
          const enigmaKey = `timer_${userId}_${currentEnigma}`;
          const currentEnigmaTime = Date.now() - startTime;
          localStorage.setItem(
            enigmaKey,
            JSON.stringify({
              accumulatedTime: currentEnigmaTime,
            })
          );
        }
      }
    };
  }, [
    userId,
    startTime,
    isTimerActive,
    currentEnigma,
    accumulatedTime,
    gameFinished,
  ]);

  const handleLogout = () => {
    console.log("🚪 Déconnexion");
    saveTimerStateRef.current();

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      console.warn("Erreur lors de la déconnexion:", err);
    }

    setToken(null);
    setUserId(null);
    setIsTimerActive(false);
    setStartTime(null);
  };

  const goToNextEnigma = useCallback(() => {
    console.log("🎯 Énigme terminée:", currentEnigma);

    const enigmaTime = startTime ? Date.now() - startTime : 0;
    const newAccumulatedTime = accumulatedTime + enigmaTime;

    console.log("⏱️ Temps de l'énigme:", enigmaTime);
    console.log("⏱️ Temps total accumulé:", newAccumulatedTime);

    if (currentEnigma >= TOTAL_ENIGMES) {
      console.log("🎉 Jeu terminé !");
      setGameFinished(true);
      setIsTimerActive(false);
      setTotalTime(newAccumulatedTime);
      setAccumulatedTime(newAccumulatedTime);

      // 🎊 ANIMATION DE CONFETTIS 🎊
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      if (userId) {
        localStorage.setItem(
          `timer_${userId}`,
          JSON.stringify({
            startTime: null,
            isTimerActive: false,
            currentEnigma: TOTAL_ENIGMES,
            accumulatedTime: newAccumulatedTime,
            gameFinished: true,
          })
        );
      }
    } else {
      const nextEnigma = currentEnigma + 1;
      console.log("➡️ Passage à l'énigme", nextEnigma);

      setCurrentEnigma(nextEnigma);
      setAccumulatedTime(newAccumulatedTime);
      setStartTime(Date.now());

      if (userId) {
        localStorage.setItem(
          `timer_${userId}`,
          JSON.stringify({
            startTime: Date.now(),
            isTimerActive: true,
            currentEnigma: nextEnigma,
            accumulatedTime: newAccumulatedTime,
            gameFinished: false,
          })
        );
      }
    }
  }, [currentEnigma, startTime, accumulatedTime, userId, TOTAL_ENIGMES]);

  useEffect(() => {
    if (userId && isTimerActive) {
      const autoSaveInterval = setInterval(() => {
        saveTimerStateRef.current();
      }, 5000);

      return () => clearInterval(autoSaveInterval);
    }
  }, [userId, isTimerActive]);

  useEffect(() => {
    const beforeUnload = () => {
      console.log("💾 Sauvegarde avant fermeture");
      saveTimerStateRef.current();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  const formatTime = (ms) => {
    if (isNaN(ms) || ms < 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!token || !userId) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderEnigma = () => {
    switch (currentEnigma) {
      case 1:
        return <Enigme1 onComplete={goToNextEnigma} />;
      case 2:
        return <Enigme2 onComplete={goToNextEnigma} />;
      case 3:
        return <Enigme3 onComplete={goToNextEnigma} />;
      case 4:
        return <Enigme4 onComplete={goToNextEnigma} />;
      case 5:
        return <Enigme5 onComplete={goToNextEnigma} />;
      default:
        return <div>Énigme inconnue</div>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f5f5f5",
      }}
    >
      <aside
        style={{
          width: "320px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
      >
        <Timer
          isActive={isTimerActive}
          startTime={startTime}
          formatTime={formatTime}
          userId={userId}
          enigmaId={currentEnigma}
          accumulatedTime={accumulatedTime}
        />

        {!gameFinished ? (
          <>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "20px",
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
                🎮 Progression
              </h3>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Énigme {currentEnigma}/{TOTAL_ENIGMES}
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.2)",
                  height: "10px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    background: "#4ade80",
                    height: "100%",
                    width: `${Math.min(
                      (currentEnigma / TOTAL_ENIGMES) * 100,
                      100
                    )}%`,
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "20px",
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
                fontSize: "14px",
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>
                👤 Informations
              </h3>
              <p style={{ margin: "8px 0" }}>
                <strong>ID:</strong> {userId}
              </p>
              <p style={{ margin: "8px 0" }}>
                <strong>Session:</strong>
                <br />
                {startTime ? new Date(startTime).toLocaleTimeString() : "N/A"}
              </p>
              {accumulatedTime > 0 && (
                <p style={{ margin: "8px 0" }}>
                  <strong>Temps accumulé:</strong>
                  <br />
                  {formatTime(accumulatedTime)}
                </p>
              )}
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: "15px",
                fontSize: "16px",
                background: "rgba(239, 68, 68, 0.9)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                marginTop: "auto",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "rgba(220, 38, 38, 1)")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "rgba(239, 68, 68, 0.9)")
              }
            >
              🚪 Déconnexion
            </button>
          </>
        ) : (
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "30px 20px",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              textAlign: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
              🎉 Terminé !
            </h2>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                margin: "20px 0",
                color: "#4ade80",
              }}
            >
              {formatTime(totalTime)}
            </div>
            <p style={{ fontSize: "14px", marginBottom: "30px" }}>
              Temps total
            </p>
            <button
              onClick={handleLogout}
              style={{
                padding: "15px",
                fontSize: "16px",
                background: "rgba(239, 68, 68, 0.9)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "auto",
              }}
            >
              🚪 Déconnexion
            </button>
          </div>
        )}
      </aside>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {!gameFinished ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            {renderEnigma()}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              padding: "40px",
              background:
                "linear-gradient(135deg, #667eea22 0%, #764ba222 100%)",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "72px",
                  margin: "0 0 30px 0",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                🎉 Félicitations !
              </h1>
              <p
                style={{
                  fontSize: "24px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Vous avez terminé toutes les énigmes !
              </p>
              <p
                style={{
                  fontSize: "18px",
                  color: "#999",
                }}
              >
                Consultez votre temps total sur la gauche
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
