import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HintBox from '../components/HintBox.jsx';
import cryptoImage from './image/crypto.jpg';
import S from './image/Spigpen.png';
import L from './image/Lpigpen.png';
import J from './image/Jpigpen.png';
import H from './image/Hpigpen.png';
import Q from './image/Qpigpen.png';
import api from '../services/api';

function Enigma1({ onComplete }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const hints = [
    "Décrypter le code se fait en 3 étapes",
    "Chaque chose à utiliser est marquée dans le texte.",
    "aidez vous en cherchant sur google !"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ UTILISE LE SERVICE API AU LIEU DE FETCH DIRECT
      const result = await api.validateEnigma(1, code);
      
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
        padding: isMobile ? '15px' : isTablet ? '25px' : '30px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: isMobile ? 'auto' : isTablet ? '250px' : '262px'
      },
      boxWrap: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: isMobile ? '100%' : 'auto'
      },
      boxSmall: {
        background: '#997953',
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        padding: isMobile ? '15px' : isTablet ? '20px' : '25px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: isMobile ? 'auto' : isTablet ? '250px' : '262px',
        minWidth: isMobile ? '100%' : isTablet ? '150px' : '186px'
      },
      text: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : isTablet ? '16px' : '19px',
        lineHeight: isMobile ? '1.4' : '1.15',
        textAlign: 'left',
        width: '100%'
      },
      bold: {
        fontWeight: '700'
      },
      regular: {
        fontWeight: '400'
      },
      cipherText: {
        color: '#ffffff',
        fontSize: isMobile ? '20px' : isTablet ? '24px' : '32px',
        lineHeight: '1.5',
        textAlign: 'left',
        width: '100%'
      },
      conclusionText: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : isTablet ? '15px' : '19px',
        lineHeight: isMobile ? '1.4' : '1.15',
        textAlign: 'center',
        width: '100%'
      },
      image: {
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        objectFit: 'cover',
        height: isMobile ? 'auto' : isTablet ? '250px' : '262px',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : isTablet ? '300px' : '350px',
        maxWidth: '100%',
        boxSizing: 'border-box'
      },
      inlineImage: {
        height: isMobile ? '16px' : '15px',
        width: 'auto',
        verticalAlign: 'middle',
        display: 'inline',
        margin: '0 2px'
      },
      inlineImageMedium: {
        height: isMobile ? '15px' : '18px',
        width: 'auto',
        verticalAlign: 'middle',
        display: 'inline',
        margin: '0 2px'
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
        width: '100%',
        boxSizing: 'border-box'
      },
      input: {
        padding: isMobile ? '12px' : isTablet ? '14px' : '15px',
        fontSize: isMobile ? '16px' : '18px',
        borderRadius: '10px',
        border: '2px solid #cdaa80',
        width: '100%',
        maxWidth: isMobile ? '100%' : '500px',
        boxSizing: 'border-box',
        background: '#ffffff'
      },
      codeText: {
        color: '#a18561',
        fontSize: isMobile ? '12px' : isTablet ? '14px' : '16px',
        wordBreak: 'break-all',
        textAlign: 'center',
        fontWeight: '600',
        width: '100%',
        padding: isMobile ? '0 10px' : '0',
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

        html {
          scroll-behavior: smooth;
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
            <h1 style={styles.h1}>De la Base64 à la cryptographie moderne</h1>
          </div>
        </div>

        <div style={styles.mainRect}>
          {/* Section 1 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={{...styles.box, ...styles.boxWrap}}>
                <div style={styles.text}>
                  <span style={styles.bold}>
                    Les premiers pas de la cryptographie : quand le secret passait par la simplicité<br/>
                  </span>
                  <span style={styles.regular}>
                    Bien avant <img style={styles.inlineImage} src={S} alt="S"/>les algorithmes complexes d'aujourd'hui, la cryptographie reposait sur des procédés à la fois ingénieux et rudimentaires. L'un des plus célèbres est le chiffre de César, attribué à Jules César lui-même.<br/>
                    Son principe est simple : chaque lettre du message est décalée d'un certain nombre dans l'alphabet — ici, de 3 lettres vers la droite.<br/>
                    Ainsi, l'alphabet transformé commencerait comme suit :
                  </span>
                </div>
              </div>
              
              <div style={styles.boxSmall}>
                <div style={styles.cipherText}>
                  A → D<br/>
                  B → E<br/>
                  C → F<br/>
                  D → G<br/>
                  E → H<br/>
                  F → I<img style={styles.inlineImage} src={L} alt="L"/>
                </div>
              </div>
              
              <div style={styles.boxSmall}>
                <div style={styles.conclusionText}>
                  Ce système, bien que facilement déchiffrable aujourd'hui, illustre la naissance de la pensée cryptographique : <img style={styles.inlineImage} src={J} alt="J"/>l'idée qu'une information puisse être cachée à ceux qui n'en connaissent pas la clé.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={{...styles.box, ...styles.boxWrap}}>
                <div style={styles.text}>
                  <span style={styles.bold}>
                    L'évolution vers des codes plus élaborés<br/>
                  </span>
                  <span style={styles.regular}>
                    Au fil du temps, les besoins en discrétion ont engendré des procédés plus complexes : carrés de Polybe, chiffre de Vigenère, rotor des machines Enigma, puis enfin la cryptographie moderne reposant sur des bases mathématiques solides. Avec l'avènement de l'informatique, les algorithmes de chiffrement asymétrique, comme RSA ou ECC, sont devenus essentiels à la sécurité des communications en ligne.<img style={styles.inlineImage} src={S} alt="S"/><br/>
                    C'est d'ailleurs cette même quête de confidentialité et de symbolisme que l'on retrouve dans le code des francs-maçons, souvent cité comme un exemple fascinant de cryptage symbolique et ésotérique.
                  </span>
                </div>
              </div>
              <img style={styles.image} src={cryptoImage} alt="Cryptographie"/>
            </div>
          </div>

          {/* Section 3 */}
          <div style={styles.section}>
            <div style={{...styles.box, ...styles.boxWrap}}>
              <div style={styles.text}>
                <span style={styles.bold}>
                  La cryptographie <img style={styles.inlineImage} src={H} alt="H"/>contemporaine<br/>
                </span>
                <span style={styles.regular}>
                  Aujourd'hui, la cryptographie dépasse largement le simple fait de cacher un message. Elle sert à assurer la confidentialité, l'intégrité et l'authenticité de toutes nos communications numériques. Chaque fois qu'on envoie un message, qu'on effectue un paiement en ligne ou qu'on signe un document, des protocoles cryptographiques garantissent que les données restent protégées.<br/><br/>
                  Deux grandes méthodes dominent : le chiffrement symétrique, rapide mais nécessitant une clé partagée, et le chiffrement asymétrique, basé sur une paire de clés publique et privée. Ce dernier, à l'origine d'algorithmes comme RSA ou ECC, a permis la sécurité du web moderne et l'émergence des signatures numériques.<br/><br/>
                  La cryptographie s'étend aussi à la blockchain, où elle assure la fiabilité des transactions sans autorité centrale. À l'avenir, les chercheurs préparent déjà la cryptographie post-quantique, capable de résister aux ordinateurs quantiques.<br/><br/>
                  En somme, la cryptographie contemporaine est devenue indispensable : un outil discret mais essentiel qui protège nos identités, nos échanges et la confiance au cœur du monde numérique.
                </span>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div style={styles.formContainer}>
            {error && <div style={styles.error}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Entrez le code déchiffré"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={styles.input}
              />
              <span style={styles.codeText}>ZnJhbmNzLW1h529ucw==</span>
              <button type="submit" style={styles.button}>Valider</button>
              <img style={styles.inlineImageMedium} src={Q} alt="Q"/>
            </form>
            <HintBox hints={hints} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enigma1;