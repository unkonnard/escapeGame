import React, { useState, useEffect } from "react";
import api from "../services/api";

const Timer = ({
  isActive,
  startTime,
  formatTime,
  userId,
  enigmaId,
  accumulatedTime,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Synchronisation initiale avec le backend (OPTIONNELLE)
  useEffect(() => {
    if (userId && enigmaId) {
      api
        .getTimer(userId, enigmaId)
        .then((timer) => {
          if (timer.isRunning) {
            setElapsedTime(
              timer.accumulatedTime +
                (Date.now() - new Date(timer.startTime).getTime())
            );
          } else {
            setElapsedTime(timer.accumulatedTime || 0);
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération du timer:", error)
        );
    }
  }, [userId, enigmaId]);

  useEffect(() => {
    let interval = null;

    if (isActive && startTime) {
      interval = setInterval(() => {
        const currentTime = Date.now() - startTime + accumulatedTime;
        setElapsedTime(currentTime);

        // Synchronisation toutes les 5 secondes
        if (
          userId &&
          enigmaId &&
          Math.floor(currentTime / 5000) !==
            Math.floor((currentTime - 100) / 5000)
        ) {
          api
            .syncTimer({
              userId,
              enigmaId,
              startTime: new Date(startTime),
              accumulatedTime: currentTime,
              isRunning: true,
            })
            .catch((error) =>
              console.error("Erreur de synchronisation:", error)
            );
        }
      }, 100);
    } else {
      setElapsedTime(accumulatedTime);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, startTime, accumulatedTime, userId, enigmaId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: "600",
          textAlign: "center",
          color: "white",
        }}
      >
        ⏱️ Temps écoulé
      </h3>
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          fontFamily: "monospace",
          color: "#4ade80",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};

export default Timer;
