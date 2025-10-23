import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

function Timer({ isActive, startTime, userId }) {
  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // ✅ AJOUT DE LOGS POUR DÉBOGUER
  console.log('🔍 Timer props:', { isActive, userId });

  const [time, setTime] = useState(() => {
    if (!userId) {
      console.log('⚠️ Pas de userId à l\'initialisation');
      return 0;
    }
    
    const savedTime = localStorage.getItem(`escapeGameTime_${userId}`);
    console.log('💾 Temps sauvegardé:', savedTime);
    
    if (savedTime) {
      return parseInt(savedTime, 10);
    }
    
    return 0;
  });

  // ✅ GÉRER LE COMPTAGE DU TEMPS
  useEffect(() => {
    console.log('⏱️ useEffect timer:', { isActive, userId }); // ✅ Retiré "time"
    
    let interval = null;

    if (isActive && userId) {
      console.log('✅ Démarrage du timer');
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          localStorage.setItem(`escapeGameTime_${userId}`, newTime.toString());
          console.log('⏰ Tick:', newTime);
          return newTime;
        });
      }, 1000);
    } else {
      console.log('❌ Timer non actif:', { isActive, userId });
      clearInterval(interval);
    }

    return () => {
      console.log('🧹 Nettoyage interval');
      clearInterval(interval);
    };
  }, [isActive, userId]); // ✅ Pas de "time" dans les dépendances

  // ✅ RÉINITIALISER LE TEMPS QUAND L'UTILISATEUR CHANGE
  useEffect(() => {
    if (userId) {
      const savedTime = localStorage.getItem(`escapeGameTime_${userId}`);
      console.log('🔄 Changement d\'utilisateur:', { userId, savedTime });
      
      if (savedTime) {
        setTime(parseInt(savedTime, 10));
      } else {
        setTime(0);
      }
    }
  }, [userId]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Styles responsives
  const containerStyle = {
    position: 'fixed',
    top: isMobile ? '20px' : isTablet ? '75px' : '100px',
    right: isMobile ? '10px' : isTablet ? '20px' : '30px',
    left: isMobile ? '10px' : 'auto',
    background: '#0f1e3f',
    color: '#ffffff',
    padding: isMobile ? '10px 15px' : isTablet ? '12px 20px' : '15px 30px',
    borderRadius: isMobile ? '10px' : '15px',
    fontSize: isMobile ? '16px' : isTablet ? '20px' : '24px',
    fontWeight: 'bold',
    fontFamily: 'Inter, sans-serif',
    boxShadow: isMobile
      ? '0 2px 8px rgba(0,0,0,0.2)'
      : '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : 'flex-start',
    gap: isMobile ? '8px' : '10px',
    maxWidth: isMobile ? 'none' : 'auto',
    animation: 'slideDown 0.5s ease-out'
  };

  const iconStyle = {
    fontSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
  };

  // ✅ Ne pas afficher le timer si pas d'userId
  if (!userId) {
    console.log('⚠️ Timer caché: pas de userId');
    return null;
  }

  return (
    <>
      <div style={containerStyle}>
        <span style={iconStyle}>⏱️</span>
        <span>{formatTime(time)}</span>
        {/* ✅ Indicateur visuel pour déboguer */}
        <span style={{ fontSize: '10px', marginLeft: '5px' }}>
          {isActive ? '🟢' : '🔴'}
        </span>
      </div>

      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media screen and (max-width: 767px) {
          body {
            padding-top: 60px;
          }
        }

        @media screen and (max-width: 360px) {
          .timer-container {
            font-size: 14px !important;
            padding: 8px 12px !important;
          }
        }

        @media screen and (max-width: 767px) and (orientation: landscape) {
          .timer-container {
            top: 5px !important;
            padding: 8px 12px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Timer;