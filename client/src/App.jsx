import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useMediaQuery } from 'react-responsive';
import Auth from './components/Auth';
import Timer from './components/Timer';
import Enigma1 from './pages/Enigma1';
import Enigma2 from './pages/Enigma2';
import Enigma3 from './pages/Enigma3';
import Enigma4 from './pages/Enigma4';
import Enigma5 from './pages/Enigma5';
import api from './services/api';

function App() {
  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // États
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentEnigma, setCurrentEnigma] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ AJOUT

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Activer le timer si on est authentifié et sur une énigme (1-5)
    if (isAuthenticated && currentEnigma >= 1 && currentEnigma <= 5) {
      setIsTimerActive(true);
    } else if (!isAuthenticated || currentEnigma > 5) {
      setIsTimerActive(false);
    }
  }, [isAuthenticated, currentEnigma]);

  // Animation confettis quand on termine
  useEffect(() => {
    if (currentEnigma > 5) {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#cdaa80', '#0f1e3f', '#997953', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors
        });
      }, 500);
    }
  }, [currentEnigma]);

  // ✅ UTILISE LE SERVICE API ET RESTAURE LE TIMER
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId'); // ✅ RÉCUPÉRATION
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      console.log('📥 Chargement de la progression...');
      const data = await api.getProgress();
      
      console.log('✅ Progression chargée:', data);
      setIsAuthenticated(true);
      setCurrentEnigma(data.currentEnigma);
      setUserId(storedUserId); // ✅ DÉFINITION
      
      // ✅ RESTAURER LE TIMER
      const savedStartTime = localStorage.getItem('timerStartTime');
      if (savedStartTime) {
        console.log('⏱️ Timer restauré depuis:', new Date(parseInt(savedStartTime)));
        setStartTime(parseInt(savedStartTime));
      } else if (data.currentEnigma >= 1 && data.currentEnigma <= 5) {
        // ✅ Si pas de timer sauvegardé mais on est sur une énigme, créer un nouveau
        const newStartTime = Date.now();
        setStartTime(newStartTime);
        localStorage.setItem('timerStartTime', newStartTime.toString());
      }
    } catch (err) {
      console.error('❌ Erreur checkAuth:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }

    setLoading(false);
  };

  // ✅ CORRIGÉ - VÉRIFIER SI UN TIMER EXISTE DÉJÀ
  const handleLogin = async (token) => {
    setIsAuthenticated(true);
    
    const storedUserId = localStorage.getItem('userId'); // ✅ RÉCUPÉRATION
    setUserId(storedUserId); // ✅ DÉFINITION
    
    try {
      console.log('📥 Chargement de la progression après login...');
      const data = await api.getProgress();
      
      console.log('✅ Progression chargée après login:', data);
      setCurrentEnigma(data.currentEnigma);
      
      // ✅ VÉRIFIER SI UN TIMER EST DÉJÀ EN COURS
      const existingStartTime = localStorage.getItem('timerStartTime');
      if (existingStartTime) {
        console.log('⏱️ Timer restauré depuis:', new Date(parseInt(existingStartTime)));
        setStartTime(parseInt(existingStartTime));
      } else {
        // ✅ CRÉER UN NOUVEAU TIMER SEULEMENT S'IL N'EN EXISTE PAS
        const newStartTime = Date.now();
        setStartTime(newStartTime);
        localStorage.setItem('timerStartTime', newStartTime.toString());
        console.log('⏱️ Nouveau timer initialisé');
      }
    } catch (err) {
      console.error('❌ Erreur chargement progression:', err);
      setCurrentEnigma(1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // ✅ NE PAS SUPPRIMER timerStartTime - on le garde pour la reconnexion
    setIsAuthenticated(false);
    setCurrentEnigma(1);
    setIsTimerActive(false);
    setUserId(null); // ✅ RÉINITIALISATION
  };

  const handleEnigmaComplete = () => {
    const nextEnigma = currentEnigma + 1;
    setCurrentEnigma(nextEnigma);
    
    if (nextEnigma > 5) {
      setIsTimerActive(false);
      // ✅ RÉCUPÉRER LE TEMPS AVEC userId
      const savedTime = localStorage.getItem(`escapeGameTime_${userId}`);
      if (savedTime) {
        setFinalTime(parseInt(savedTime));
      }
      // ✅ SUPPRIMER LE TIMER QUAND TERMINÉ
      localStorage.removeItem('timerStartTime');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Styles responsives (inchangé...)
  const headerStyle = {
    background: 'rgba(0,0,0,0.2)',
    padding: isMobile ? '8px 15px' : isTablet ? '10px 20px' : '12px 25px',
    color: 'white',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: isMobile ? '10px' : '0'
  };

  const buttonStyle = {
    background: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: isMobile ? '8px 16px' : '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: isMobile ? '14px' : '16px',
    width: isMobile ? '100%' : 'auto'
  };

  const congratsCardStyle = {
    animation: 'fadeInScale 0.8s ease-out',
    padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
  };

  const timeDisplayStyle = {
    marginTop: isMobile ? '20px' : '30px',
    padding: isMobile ? '15px' : '20px',
    background: 'rgba(15, 30, 63, 0.1)',
    borderRadius: '15px',
    fontSize: isMobile ? '18px' : isTablet ? '20px' : '24px'
  };

  const finalTimeStyle = {
    fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
    fontWeight: 'bold',
    color: '#0f1e3f'
  };

  const loadingContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: isMobile ? '20px' : isTablet ? '30px' : '40px'
  };

  const loadingTextStyle = {
    fontSize: isMobile ? '24px' : '32px',
    color: '#ffffff',
    textAlign: 'center'
  };

  const congratsContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: isMobile ? '15px' : isTablet ? '20px' : '30px'
  };

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <h1 style={loadingTextStyle}>
          ⏳ Chargement...
        </h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* ✅ AJOUT DE userId ICI */}
      {currentEnigma <= 5 && (
        <Timer 
          isActive={isTimerActive} 
          startTime={startTime}
          userId={userId}
        />
      )}

      <div style={headerStyle}>
        <div style={{ fontSize: isMobile ? '14px' : '16px' }}>
          <strong>Énigme {currentEnigma} / 5</strong>
        </div>
        <button onClick={handleLogout} style={buttonStyle}>
          Déconnexion
        </button>
      </div>

      {currentEnigma === 1 && <Enigma1 onComplete={handleEnigmaComplete} />}
      {currentEnigma === 2 && <Enigma2 onComplete={handleEnigmaComplete} />}
      {currentEnigma === 3 && <Enigma3 onComplete={handleEnigmaComplete} />}
      {currentEnigma === 4 && <Enigma4 onComplete={handleEnigmaComplete} />}
      {currentEnigma === 5 && <Enigma5 onComplete={handleEnigmaComplete} />}
      
      {currentEnigma > 5 && (
        <div style={congratsContainerStyle}>
          <div style={congratsCardStyle}>
            <h1 style={{ 
              fontSize: isMobile ? '28px' : isTablet ? '36px' : '42px',
              marginBottom: isMobile ? '15px' : '20px',
              color: '#333'
            }}>
              🎉 Félicitations !
            </h1>
            <p style={{ 
              fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
              color: '#666'
            }}>
              Vous avez terminé tous les défis de l'escape game !
            </p>
            
            <div style={timeDisplayStyle}>
              <div style={{ 
                marginBottom: '10px', 
                color: '#666',
                fontSize: isMobile ? '14px' : '16px'
              }}>
                ⏱️ Temps total :
              </div>
              <div style={finalTimeStyle}>
                {formatTime(finalTime)}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default App;