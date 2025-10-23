import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function HintBox({ hints, style }) {
// Media queries
const isMobile = useMediaQuery({ maxWidth: 767 });
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

const [openHints, setOpenHints] = useState([]);
const [isCollapsed, setIsCollapsed] = useState(isMobile); // Collapsed par défaut sur mobile

const toggleHint = (index) => {
if (openHints.includes(index)) {
setOpenHints(openHints.filter(i => i !== index));
} else {
setOpenHints([...openHints, index]);
}
};

const defaultStyle = {
container: {
position: 'fixed',
bottom: isMobile ? '15px' : isTablet ? '20px' : '60px',
right: isMobile ? '15px' : isTablet ? '20px' : '30px',
left: isMobile ? '15px' : 'auto',
zIndex: 1000,
display: 'flex',
flexDirection: 'column',
gap: isMobile ? '8px' : '10px',
maxWidth: isMobile ? 'none' : isTablet ? '320px' : '350px',
...style?.container
},
hintButton: {
background: '#0f1e3f',
color: '#ffffff',
padding: isMobile ? '10px 15px' : isTablet ? '11px 18px' : '12px 20px',
borderRadius: isMobile ? '8px' : '10px',
border: 'none',
cursor: 'pointer',
fontSize: isMobile ? '14px' : '16px',
fontWeight: '600',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
transition: 'all 0.3s ease',
fontFamily: 'Inter, sans-serif',
boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
width: '100%'
},
hintContent: {
background: '#997953',
color: '#ffffff',
padding: isMobile ? '12px' : '15px',
borderRadius: isMobile ? '8px' : '10px',
fontSize: isMobile ? '13px' : '14px',
lineHeight: '1.5',
marginTop: '5px',
fontFamily: 'Inter, sans-serif',
boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
animation: 'slideIn 0.3s ease-out'
},
icon: {
fontSize: isMobile ? '16px' : '18px',
marginLeft: '10px',
transition: 'transform 0.3s ease'
},
toggleButton: {
background: '#cdaa80',
color: '#ffffff',
padding: isMobile ? '10px 15px' : '12px 20px',
borderRadius: isMobile ? '8px' : '10px',
border: 'none',
cursor: 'pointer',
fontSize: isMobile ? '14px' : '16px',
fontWeight: '600',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
gap: '8px',
transition: 'all 0.3s ease',
fontFamily: 'Inter, sans-serif',
boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
width: '100%'
},
badge: {
background: '#e53e3e',
color: 'white',
borderRadius: '50%',
width: isMobile ? '20px' : '24px',
height: isMobile ? '20px' : '24px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: isMobile ? '11px' : '12px',
fontWeight: 'bold'
}
};

return (
<>
<div style={defaultStyle.container}>
{/* Bouton pour afficher/masquer tous les indices (mobile) */}
{isMobile && (
<button
style={defaultStyle.toggleButton}
onClick={() => setIsCollapsed(!isCollapsed)}
>
<span>💡 Indices</span>
{hints.length > 0 && (
<span style={defaultStyle.badge}>{hints.length}</span>
)}
<span style={{
...defaultStyle.icon,
transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'
}}>
▼
</span>
</button>
)}

  

    {/* Liste des indices */}
    {(!isMobile || !isCollapsed) && hints.map((hint, index) => (
      <div key={index}>
        <button
          style={defaultStyle.hintButton}
          onMouseEnter={(e) => {
            e.target.style.background = '#1a3d6b';
            e.target.style.transform = 'translateX(-5px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#0f1e3f';
            e.target.style.transform = 'translateX(0)';
          }}
          onClick={() => toggleHint(index)}
        >
          <span>💡 Indice {index + 1}</span>
          <span style={{
            ...defaultStyle.icon,
            transform: openHints.includes(index) ? 'rotate(90deg)' : 'rotate(0deg)'
          }}>
            {openHints.includes(index) ? '▼' : '▶'}
          </span>
        </button>
        {openHints.includes(index) && (
          <div style={defaultStyle.hintContent}>
            {hint}
          </div>
        )}
      </div>
    ))}
  </div>

  <style>{`
    @keyframes slideIn {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Animation du badge */
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    /* Amélioration du touch sur mobile */
    @media screen and (max-width: 767px) {
      button {
        -webkit-tap-highlight-color: rgba(0,0,0,0.1);
      }
    }

    /* Mode paysage mobile - réduire l'espace */
    @media screen and (max-width: 767px) and (orientation: landscape) {
      .hint-container {
        bottom: 10px !important;
        max-height: 40vh;
        overflow-y: auto;
      }
    }

    /* Scrollbar personnalisée pour mobile landscape */
    @media screen and (max-width: 767px) and (orientation: landscape) {
      .hint-container::-webkit-scrollbar {
        width: 4px;
      }
      .hint-container::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
        border-radius: 10px;
      }
      .hint-container::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.3);
        border-radius: 10px;
      }
    }

    /* Éviter le défilement du body si HintBox est ouvert */
    @media screen and (max-width: 767px) {
      body.hints-open {
        overflow: hidden;
      }
    }
  `}</style>
</>

);
}

export default HintBox;