import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import HintBox from '../components/HintBox.jsx';
import titresImage from './image/titres.png';
import htmlImage from './image/html.png';
import api from '../services/api';

function Enigma4({ onComplete }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const hints = [
    "verifiez ce qui est affiché sur toute la page web",
    "lisez bien les explications en debut d'article."
  ];

  useEffect(() => {
    document.title = 'Énigme 4 - Le Code Est : EASTEREGG';
    
    return () => {
      document.title = 'Escape Game';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ UTILISE LE SERVICE API
      const result = await api.validateEnigma(4, code);
      
      console.log('✅ Énigme validée:', result);
      onComplete();
    } catch (err) {
      console.error('❌ Erreur validation:', err);
      setError(err.message || 'Erreur de connexion au serveur');
    }
  };

  const getStyles = () => {
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
        borderRadius: isMobile ? '30px 30px 0 0' : '90px 90px 0 0',
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
        fontSize: isMobile ? '10px' : isTablet ? '20px' : '20px',
        fontWeight: '400',
        padding: isMobile ? '0 10px' : '0 40px',
        lineHeight: '1.2',
        margin: 0
      },
      h1: {
        color: 'white',
        margin: 0,
        padding: 0,
      },
      section: {
        background: 'transparent',
        marginTop: isMobile ? '15px' : isTablet ? '20px' : '30px',
        width: '100%',
        boxSizing: 'border-box'
      },
      flexSection: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '12px' : isTablet ? '15px' : '20px',
        justifyContent: 'space-around',
        alignItems: isMobile ? 'stretch' : 'center',
        width: '100%',
        boxSizing: 'border-box'
      },
      innerContent: {
        background: '#997953',
        borderRadius: isMobile ? '20px' : isTablet ? '25px' : '35px',
        padding: isMobile ? '12px' : isTablet ? '15px' : '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      text: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
        lineHeight: isMobile ? '1.4' : '1.15',
        width: '100%'
      },
      bold: {
        fontWeight: '700'
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
        borderRadius: isMobile ? '25px' : isTablet ? '25px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : 'auto'
      },
      imageLarge: {
        borderRadius: isMobile ? '25px' : isTablet ? '25px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : isTablet ? '300px' : '700px'
      },
      imageSmall: {
        borderRadius: isMobile ? '25px' : isTablet ? '25px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : isTablet ? '200px' : '300px'
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
            <h1 style={styles.h1}>
              Introduction au HTML : Les Balises de Base
            </h1>
          </div>
        </div>

        <div style={styles.mainRect}>
          {/* Section 1 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>
                    1. La structure d'un document HTML
                  </span>
                  <br/><br/>
                  <span>
                    Chaque page HTML suit une structure de base composée de plusieurs balises essentielles :
                    <br/>
                    &lt;!DOCTYPE html&gt;
                    <br/>
                    &lt;html&gt;
                    <br/>
                    &nbsp;&nbsp;&lt;head&gt;
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;meta charset=&quot;UTF-8&quot;&gt;
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Ma première page HTML&lt;/title&gt;
                    <br/>
                    &nbsp;&nbsp;&lt;/head&gt;
                    <br/>
                    &nbsp;&nbsp;&lt;body&gt;
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Bienvenue dans le monde du HTML&lt;/h1&gt;
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Ceci est mon tout premier paragraphe en HTML.&lt;/p&gt;
                    <br/>
                    &nbsp;&nbsp;&lt;/body&gt;
                    <br/>
                    &lt;/html&gt;
                  </span>
                </div>
              </div>
              
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Explications :</span>
                  <br/><br/>
                  <ul style={styles.ul}>
                    <li style={styles.li}>&lt;!DOCTYPE html&gt; indique au navigateur qu'il s'agit d'un document HTML5.</li>
                    <li style={styles.li}>&lt;html&gt; englobe tout le contenu de la page.</li>
                    <li style={styles.li}>&lt;head&gt; contient les métadonnées (informations non affichées directement sur la page).</li>
                    <li style={styles.li}>&lt;title&gt; définit le titre qui s'affiche dans l'onglet du navigateur.</li>
                    <li style={styles.li}>&lt;body&gt; regroupe tout le contenu visible.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>2. Les balises de contenu les plus utilisées</span>
                  <br/><br/>
                  <span style={styles.bold}>Les titres</span>
                  <br/>
                  HTML propose six niveaux de titres :
                  <br/><br/>
                  &lt;h1&gt;Titre principal&lt;/h1&gt;
                  <br/>
                  &lt;h2&gt;Sous-titre&lt;/h2&gt;
                  <br/>
                  &lt;h3&gt;Titre de section&lt;/h3&gt;
                  <br/><br/>
                  &lt;h1&gt; est le plus important, &lt;h6&gt; le moins important.
                  <br/><br/>
                  <span style={styles.bold}>Les paragraphes</span>
                  <br/>
                  Pour écrire du texte :
                  <br/><br/>
                  &lt;p&gt;Ceci est un paragraphe.&lt;/p&gt;
                  <br/><br/>
                  <span style={styles.bold}>Les liens</span>
                  <br/>
                  Pour insérer un lien hypertexte :
                  <br/><br/>
                  &lt;a href=&quot;https://www.exemple.com&quot;&gt;Visitez ce site&lt;/a&gt;
                </div>
              </div>
              
              <img 
                style={styles.imageLarge}
                src={titresImage} 
                alt="Exemples de titres HTML" 
              />
            </div>
          </div>

          {/* Section 3 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <img 
                style={styles.imageSmall}
                src={htmlImage} 
                alt="Structure HTML" 
              />
              
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Les images</span>
                  <br/>
                  Pour afficher une image :
                  <br/><br/>
                  &lt;img src=&quot;image.jpg&quot; alt=&quot;Description de l'image&quot;&gt;
                  <br/><br/>
                  <span style={styles.bold}>Les listes</span>
                  <br/>
                  Deux types existent :
                  <br/><br/>
                  <span style={styles.bold}>Liste non ordonnée :</span>
                  <br/>
                  &lt;ul&gt;
                  <ul style={styles.ul}>
                    <li style={styles.li}>&lt;li&gt;Élément 1&lt;/li&gt;</li>
                    <li style={styles.li}>&lt;li&gt;Élément 2&lt;/li&gt;</li>
                  </ul>
                  &lt;/ul&gt;
                  <br/><br/>
                  <span style={styles.bold}>Liste ordonnée :</span>
                  <br/>
                  &lt;ol&gt;
                  <ul style={styles.ul}>
                    <li style={styles.li}>&lt;li&gt;Étape 1&lt;/li&gt;</li>
                    <li style={styles.li}>&lt;li&gt;Étape 2&lt;/li&gt;</li>
                  </ul>
                  &lt;/ol&gt;
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div style={styles.section}>
            <div style={styles.innerContent}>
              <div style={styles.text}>
                <span style={styles.bold}>3. Conclusion</span>
                <br/><br/>
                <span>
                  Le HTML constitue la structure fondamentale de toute page web. Maîtriser ces balises de base est indispensable avant de passer au CSS (feuilles de style) et au JavaScript, qui permettent respectivement de styliser et de dynamiser vos pages.
                </span>
              </div>
            </div>
          </div>

          {/* Formulaire de validation */}
          <div style={styles.formContainer}>
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

export default Enigma4;