import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HintBox from '../components/HintBox.jsx';
import inspectorImage from './image/inspector.png';
import errorImage from './image/error.jpg';
import api from '../services/api';

function Enigma3({ onComplete }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  const hints = [
    "il faut parcourir la page avec l'inspector",
    "le bouton en haut a gauche de l'inspector est le bouton a utiliser",
    "jouez avec les propriétés css!"
  ];

  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ UTILISE LE SERVICE API
      const result = await api.validateEnigma(3, code);
      
      console.log('✅ Énigme validée:', result);
      onComplete();
    } catch (err) {
      console.error('❌ Erreur validation:', err);
      setError(err.message || 'Erreur de connexion au serveur');
    }
  };

  const getStyles = () => {
    // Définition des valeurs responsive
    const titleFontSize = isMobile ? '10px' : isTablet ? '20px' : '20px';
    const textFontSize = isMobile ? '14px' : isTablet ? '16px' : '20px';
    const borderRadius = isMobile ? '25px' : '50px';
    const imageSize = isMobile ? '150px' : isTablet ? '180px' : '299px';

    return {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#1a2a3a',
        padding: isMobile ? '10px' : '20px'
      },
      container: {
        background: '#213a56',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '1440px',
        padding: isMobile ? '10px' : '20px',
        borderRadius: isMobile ? '20px' : '30px'
      },
      mainRect: {
        background: '#cdaa80',
        borderRadius: isMobile ? '0 0 40px 40px' : '0 0 90px 90px',
        border: 'solid #0f1e3f',
        borderWidth: isMobile ? '0 10px 10px 10px' : '0 20px 20px 20px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        padding: isMobile ? '15px' : '20px',
        boxSizing: 'border-box'
      },
      headerRect: {
        background: '#0f1e3f',
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        width: '100%',
        height: isMobile ? '100px' : isTablet ? '150px' : '187px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        color: '#ffffffff',
        textAlign: 'center',
        fontSize: titleFontSize,
        fontWeight: '400',
        padding: isMobile ? '0 10px' : '0 40px',
        lineHeight: '1.2'
      },
      h1: {
        color: 'white',
        margin: 0,
        padding: 0,
      },
      section: {
        background: 'transparent',
        marginTop: isMobile ? '20px' : isTablet ? '30px' : '40px',
        width: '100%',
        boxSizing: 'border-box'
      },
      flexSection: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '20px' : isTablet ? '25px' : '30px',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        width: '100%',
        boxSizing: 'border-box'
      },
      box: {
        background: '#997953',
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        padding: isMobile ? '15px' : isTablet ? '20px' : '30px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
      },
      text: {
        color: '#ffffff',
        fontSize: textFontSize,
        lineHeight: '1.5',
        textAlign: 'left',
        width: '100%'
      },
      bold: {
        fontWeight: '700',
        marginBottom: '10px',
        display: 'block'
      },
      ul: {
        listStyleType: 'disc',
        paddingLeft: '1.5em',
        margin: '10px 0'
      },
      li: {
        margin: '8px 0'
      },
      image: {
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : imageSize
      },
      imageSmall: {
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : isTablet ? '180px' : '299px'
      },
      formContainer: {
        background: '#997953',
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
        marginTop: isMobile ? '20px' : isTablet ? '30px' : '40px',
        width: '100%',
        boxSizing: 'border-box'
      },
      error: {
        background: '#ff4444',
        color: 'white',
        padding: isMobile ? '10px 15px' : '10px 20px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center',
        fontSize: isMobile ? '14px' : '16px',
        width: '100%',
        boxSizing: 'border-box'
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : '15px',
        alignItems: 'center',
        width: '100%'
      },
      input: {
        padding: isMobile ? '12px' : isTablet ? '14px' : '15px',
        fontSize: isMobile ? '16px' : '18px',
        borderRadius: '10px',
        border: 'none',
        background: '#ffffff',
        width: '100%',
        maxWidth: isMobile ? '100%' : '500px',
        boxSizing: 'border-box'
      },
      button: {
        padding: isMobile ? '12px 30px' : isTablet ? '14px 35px' : '15px 40px',
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '700',
        borderRadius: '10px',
        border: 'none',
        background: '#0f1e3f',
        color: 'white',
        cursor: 'pointer',
        transition: 'background 0.3s',
        width: isMobile ? '100%' : 'auto'
      },
      hint: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : '16px',
        textAlign: 'center',
        marginBottom: '15px',
        fontStyle: 'italic'
      },
      hiddenCode: {
        color: '#997953',
        fontSize: isMobile ? '12px' : '14px',
        margin: '15px 0',
        userSelect: 'text',
        lineHeight: '1.5'
      }
    };
  };

  const styles = getStyles();

  return (
    <div style={styles.wrapper}>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        button:hover {
          background: #1a2a3a !important;
        }

        @media screen and (max-width: 767px) {
          input[type="text"] {
            font-size: 16px !important;
          }

          button:active {
            transform: scale(0.98);
          }
        }

        @media screen and (min-width: 1024px) {
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #1a2a3a;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #cdaa80;
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #997953;
          }
        }

        button:focus-visible,
        input:focus-visible {
          outline: 3px solid #cdaa80;
          outline-offset: 2px;
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.headerRect}>
          <div style={styles.title}>
            <h1 style={styles.h1}>L'inspecteur des pages web : un outil indispensable pour comprendre et modifier un site</h1>
          </div>
        </div>

        <div style={styles.mainRect}>
          {/* Section 1 */}
          <div style={styles.section}>
            <div style={styles.box}>
              <div style={styles.text}>
                <span style={styles.bold}>Ouvrir l'inspecteur</span>
                <span>Sur la majorité des navigateurs (comme Google Chrome, Mozilla Firefox, Edge ou Safari), il existe plusieurs façons d'ouvrir l'inspecteur :</span>
                <ul style={styles.ul}>
                  <li style={styles.li}>En cliquant avec le bouton droit sur un élément de la page, puis en sélectionnant "Inspecter" (ou "Inspecter l'élément").</li>
                  <li style={styles.li}>Ou plus rapidement grâce au raccourci clavier Ctrl + Shift + C (sur Windows/Linux) ou Cmd + Option + C (sur macOS).</li>
                </ul>
                <span>Ce raccourci ouvre le panneau DevTools (outils de développement) et active le mode "sélection d'élément", permettant de cliquer directement sur un élément de la page pour visualiser son code HTML et les styles qui lui sont appliqués.</span>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.box}>
                <div style={styles.text}>
                  <span style={styles.bold}>Explorer et comprendre le HTML et le CSS</span>
                  <span>Une fois l'inspecteur ouvert, la fenêtre se divise généralement en deux parties :</span>
                  <ul style={styles.ul}>
                    <li style={styles.li}>À gauche : le code HTML de la page.</li>
                    <li style={styles.li}>À droite : les règles CSS associées, affichées de manière hiérarchique.</li>
                  </ul>
                  <span>Cette vue permet de voir en temps réel comment une page est construite et d'identifier les balises, classes et styles utilisés pour chaque composant visuel.</span>
                </div>
              </div>
              <img 
                style={styles.image}
                src={inspectorImage}
                alt="Exemple inspecteur HTML/CSS" 
              />
            </div>
          </div>

          {/* Section 3 */}
          <div style={styles.section}>
            <div style={styles.box}>
              <div style={styles.text}>
                <span style={styles.bold}>Modifier ou désactiver des propriétés CSS</span>
                <span>L'un des grands avantages de l'inspecteur est la possibilité d'expérimenter directement avec le code :</span>
                <ul style={styles.ul}>
                  <li style={styles.li}>Il suffit de cliquer sur une valeur CSS pour la modifier. Par exemple, changer la couleur d'un texte ou ajuster une marge.</li>
                  <li style={styles.li}>Chaque propriété CSS possède une case à cocher à côté d'elle. En la décochant, on désactive temporairement cette règle. C'est un excellent moyen de tester rapidement des changements sans toucher aux fichiers originaux du site.</li>
                </ul>
                <span>Ces modifications ne sont pas permanentes : elles n'affectent que ton affichage local. Si tu actualises la page, tout revient à la normale.</span>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.box}>
                <div style={styles.text}>
                  <span style={styles.bold}>Autres fonctionnalités utiles</span>
                  <span>L'inspecteur ne se limite pas au HTML et au CSS :</span>
                  <ul style={styles.ul}>
                    <li style={styles.li}>Il permet aussi d'analyser les performances du site, les requêtes réseau, le JavaScript exécuté ou encore le comportement responsive sur différents écrans.</li>
                    <li style={styles.li}>On peut également tester des changements en direct, repérer des erreurs dans le code, ou même déboguer pas à pas des scripts.</li>
                  </ul>
                </div>
              </div>
              <img 
                style={styles.imageSmall}
                src={errorImage}
                alt="Fonctionnalités DevTools" 
              />
            </div>
          </div>

          {/* Section 5 */}
          <div style={styles.section}>
            <div style={styles.box}>
              <div style={styles.text}>
                <span style={styles.bold}>Conclusion</span>
                <span>L'inspecteur des pages web est bien plus qu'un simple outil de débogage : c'est un espace d'expérimentation, d'apprentissage et d'optimisation. Grâce à un simple Ctrl + Shift + C, il ouvre une fenêtre directe sur les coulisses du web, permettant à chacun d'explorer, de comprendre et de maîtriser la structure d'un site.</span>
              </div>
              
              {/* Code secret caché */}
              <div style={styles.hiddenCode}>
                Le code secret est : HIDDEN
              </div>
            </div>
          </div>

          {/* Formulaire de validation */}
          <div style={styles.formContainer}>
            <p style={styles.hint}>💡 Indice : Utilisez F12 ou clic droit → "Inspecter" pour trouver le code caché</p>
            
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Entrez le code trouvé"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Valider</button>
            </form>
            <HintBox hints={hints} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enigma3;