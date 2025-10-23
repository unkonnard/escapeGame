import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './EnigmaLayout.css';

function EnigmaLayout({
enigmaNumber,
title,
description,
children,
onSubmit,
hint,
showHint
}) {
// Media queries
const isMobile = useMediaQuery({ maxWidth: 767 });
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

// Styles inline responsives
const layoutStyle = {
padding: isMobile ? '15px' : isTablet ? '20px' : '30px',
maxWidth: isMobile ? '100%' : isTablet ? '90%' : '1200px',
margin: '0 auto',
minHeight: isMobile ? 'auto' : '100vh'
};

const headerStyle = {
 Align: 'center',
marginBottom: isMobile ? '20px' : isTablet ? '25px' : '30px',
padding: isMobile ? '15px' : isTablet ? '20px' : '25px'
};

const enigmaNumberStyle = {
fontSize: isMobile ? '24px' : isTablet ? '32px' : '36px',
marginBottom: isMobile ? '8px' : '10px',
fontWeight: 'bold'
};

const titleStyle = {
fontSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
color: '#cdaa80',
marginTop: isMobile ? '8px' : '10px'
};

const contentStyle = {
background: 'white',
borderRadius: isMobile ? '12px' : '15px',
padding: isMobile ? '20px 15px' : isTablet ? '25px 20px' : '30px',
boxShadow: isMobile
? '0 2px 10px rgba(0,0,0,0.1)'
: '0 4px 20px rgba(0,0,0,0.1)',
marginBottom: isMobile ? '80px' : isTablet ? '100px' : '20px'
};

const descriptionStyle = {
fontSize: isMobile ? '15px' : isTablet ? '16px' : '18px',
lineHeight: isMobile ? '1.5' : '1.6',
color: '#333',
marginBottom: isMobile ? '20px' : isTablet ? '25px' : '30px',
 Align: isMobile ? 'left' : 'center'
};

const interactiveStyle = {
margin: isMobile ? '20px 0' : isTablet ? '25px 0' : '30px 0',
padding: isMobile ? '15px' : isTablet ? '20px' : '25px',
background: '#f8f9fa',
borderRadius: isMobile ? '10px' : '12px'
};

const hintStyle = {
background: 'linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%)',
padding: isMobile ? '12px 15px' : isTablet ? '15px 18px' : '18px 20px',
borderRadius: isMobile ? '8px' : '10px',
marginTop: isMobile ? '15px' : isTablet ? '18px' : '20px',
fontSize: isMobile ? '13px' : isTablet ? '14px' : '15px',
border: '2px solid #cdaa80',
lineHeight: '1.5'
};

const footerStyle = {
position: isMobile ? 'fixed' : 'static',
bottom: isMobile ? '0' : 'auto',
left: isMobile ? '0' : 'auto',
right: isMobile ? '0' : 'auto',
background: isMobile ? 'white' : 'transparent',
padding: isMobile ? '15px' : isTablet ? '20px 0' : '25px 0',
 Align: 'center',
boxShadow: isMobile ? '0 -2px 10px rgba(0,0,0,0.1)' : 'none',
zIndex: 100,
borderTop: isMobile ? '1px solid #e0e0e0' : 'none'
};

const buttonStyle = {
padding: isMobile ? '14px 30px' : isTablet ? '16px 40px' : '18px 50px',
fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
fontWeight: 'bold',
color: 'white',
background: 'linear-gradient(135deg, #cdaa80 0%, #997953 100%)',
border: 'none',
borderRadius: isMobile ? '10px' : '12px',
cursor: 'pointer',
transition: 'all 0.3s ease',
boxShadow: '0 4px 15px rgba(205, 170, 128, 0.3)',
width: isMobile ? 'calc(100% - 30px)' : 'auto',
maxWidth: isMobile ? 'none' : '400px',
margin: isMobile ? '0 15px' : '0'
};

return (
<div className="enigma-layout" style={layoutStyle}>
<div className="enigma-header" style={headerStyle}>
<h1 style={enigmaNumberStyle}>Énigme {enigmaNumber}</h1>
<h2 style={titleStyle}>{title}</h2>
</div>


  <div className="enigma-content" style={contentStyle}>
    <p className="enigma-description" style={descriptionStyle}>
      {description}
    </p>
    
    <div className="enigma-interactive" style={interactiveStyle}>
      {children}
    </div>

    {showHint && hint && (
      <div className="enigma-hint" style={hintStyle}>
        <strong>💡 Indice :</strong> {hint}
      </div>
    )}
  </div>

  <div className="enigma-footer" style={footerStyle}>
    <button 
      onClick={onSubmit} 
      className="submit-button"
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 6px 20px rgba(205, 170, 128, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px rgba(205, 170, 128, 0.3)';
      }}
    >
      Valider la réponse
    </button>
  </div>

  <style>{`
    /* Reset de base */
    .enigma-layout * {
      box-sizing: border-box;
    }

    /* Animation d'apparition */
    .enigma-layout {
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Touch feedback sur mobile */
    @media screen and (max-width: 767px) {
      .submit-button:active {
        transform: scale(0.98);
        opacity: 0.9;
      }
    }

    /* Gestion du scroll sur mobile avec footer fixe */
    @media screen and (max-width: 767px) {
      body {
        padding-bottom: 80px;
      }
    }

    /* Mode paysage mobile */
    @media screen and (max-width: 767px) and (orientation: landscape) {
      .enigma-header {
        padding: 10px !important;
        margin-bottom: 15px !important;
      }
      
      .enigma-header h1 {
        font-size: 20px !important;
        margin-bottom: 5px !important;
      }
      
      .enigma-header h2 {
        font-size: 16px !important;
      }
      
      .enigma-content {
        padding: 15px !important;
        margin-bottom: 70px !important;
      }
      
      .enigma-footer {
        padding: 10px !important;
      }
      
      .submit-button {
        padding: 12px 25px !important;
        font-size: 14px !important;
      }
    }

    /* Animation du hint */
    .enigma-hint {
      animation: slideInFromBottom 0.4s ease-out;
    }

    @keyframes slideInFromBottom {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Amélioration du focus pour accessibilité */
    .submit-button:focus {
      outline: 3px solid #cdaa80;
      outline-offset: 3px;
    }

    /* Amélioration de la zone interactive sur mobile */
    @media screen and (max-width: 767px) {
      .enigma-interactive {
        touch-action: manipulation;
      }
    }

    /* Scrollbar personnalisée pour desktop */
    @media screen and (min-width: 1024px) {
      .enigma-layout::-webkit-scrollbar {
        width: 8px;
      }
      
      .enigma-layout::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      .enigma-layout::-webkit-scrollbar-thumb {
        background: #cdaa80;
        border-radius: 10px;
      }
      
      .enigma-layout::-webkit-scrollbar-thumb:hover {
        background: #997953;
      }
    }
  `}</style>
</div>

);
}

export default EnigmaLayout;