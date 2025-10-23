import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function Auth({ onLogin }) {
// Media queries
const isMobile = useMediaQuery({ maxWidth: 767 });
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

// Définition de l'URL de base en fonction de l'environnement
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);


const endpoint = isLogin ? '/login' : '/signup';

try {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.error || 'Erreur inconnue');
    setLoading(false);
    return;
  }

  // ✅ Sauvegarder le token ET le refresh token
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.userId);
  
  // ✅ NOUVEAU : Sauvegarder le refresh token s'il existe
  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  // Appeler le callback de connexion
  onLogin(data.token);
} catch (err) {
  setError('Erreur de connexion au serveur');
  setLoading(false);
  console.error('Erreur:', err);
}

};

// Styles responsives
const containerStyle = {
padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
minHeight: '100vh',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

const cardStyle = {
width: '100%',
maxWidth: isMobile ? '100%' : isTablet ? '450px' : '500px',
padding: isMobile ? '25px 20px' : isTablet ? '35px 30px' : '45px 40px',
margin: isMobile ? '0' : '100px auto 0',
background: '#ffffff',
borderRadius: '15px',
boxShadow: isMobile
? '0 4px 15px rgba(0,0,0,0.1)'
: '0 10px 30px rgba(0,0,0,0.15)'
};

const titleStyle = {
fontSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
marginBottom: isMobile ? '20px' : '25px',
  Align: 'center',
lineHeight: isMobile ? '1.3' : '1.4',
color: '#333'
};

const inputStyle = {
width: '100%',
padding: isMobile ? '12px 15px' : '14px 18px',
fontSize: isMobile ? '16px' : '18px',
marginBottom: isMobile ? '12px' : '15px',
border: '1px solid #ddd',
borderRadius: '8px',
boxSizing: 'border-box',
transition: 'border-color 0.3s ease',
backgroundColor: '#f9f9f9'
};

const buttonStyle = {
width: '100%',
padding: isMobile ? '12px' : isTablet ? '14px' : '16px',
fontSize: isMobile ? '16px' : '18px',
fontWeight: 'bold',
borderRadius: '8px',
border: 'none',
cursor: loading ? 'not-allowed' : 'pointer',
opacity: loading ? 0.6 : 1,
transition: 'all 0.3s ease',
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
color: '#ffffff'
};

const toggleContainerStyle = {
marginTop: isMobile ? '20px' : '25px',
  Align: 'center',
fontSize: isMobile ? '14px' : '16px',
color: '#666'
};

const toggleButtonStyle = {
marginLeft: '10px',
background: 'transparent',
color: '#667eea',
  Decoration: 'underline',
border: 'none',
cursor: 'pointer',
fontSize: isMobile ? '14px' : '16px',
padding: '0'
};

const errorStyle = {
padding: isMobile ? '10px' : '12px',
marginBottom: isMobile ? '15px' : '20px',
fontSize: isMobile ? '13px' : '14px',
borderRadius: '6px',
  Align: 'center',
background: '#fee',
color: '#c33',
border: '1px solid #fcc'
};

return (
<div style={containerStyle}>
<div style={cardStyle}>
<h1 style={titleStyle}>
🔐 Escape Game - Authentification
</h1>

    {error && (
      <div style={errorStyle}>
        {error}
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
        onFocus={(e) => e.target.style.borderColor = '#667eea'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
      
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        style={inputStyle}
        onFocus={(e) => e.target.style.borderColor = '#667eea'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
      
      <button 
        type="submit" 
        disabled={loading}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!loading && !isMobile) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
      </button>
    </form>
    
    <div style={{...toggleContainerStyle, overflow: 'hidden', minHeight: '24px'}}>
      <p style={{
        margin: 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isLogin ? 1 : 0,
        transform: isLogin ? 'translateY(0)' : 'translateY(-10px)',
        pointerEvents: isLogin ? 'auto' : 'none'
      }}>
        Pas encore de compte ?
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setEmail('');
            setPassword('');
          }}
          disabled={loading}
          style={toggleButtonStyle}
        >
          S'inscrire
        </button>
      </p>
      
      <p style={{
        margin: 0,
        position: 'absolute',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isLogin ? 0 : 1,
        transform: isLogin ? 'translateY(10px)' : 'translateY(0)',
        pointerEvents: isLogin ? 'none' : 'auto'
      }}>
        Déjà un compte ?
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setEmail('');
            setPassword('');
          }}
          disabled={loading}
          style={toggleButtonStyle}
        >
          Se connecter
        </button>
      </p>
    </div>
  </div>

  <style>{`
    /* Éviter le zoom automatique sur iOS */
    @media screen and (max-width: 767px) {
      input[type="email"],
      input[type="password"] {
        font-size: 16px !important;
      }
    }

    /* Focus accessible */
    input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    /* Adaptation pour très petits écrans */
    @media screen and (max-width: 360px) {
      input {
        font-size: 14px !important;
        padding: 10px 12px !important;
      }
    }
  `}</style>
</div>

);
}

export default Auth;