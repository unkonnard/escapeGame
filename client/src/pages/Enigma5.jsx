import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HintBox from '../components/HintBox.jsx';
import hoverImage from './image/hover.png';
import api from '../services/api';

function Enigma5({ onComplete }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  const hints = [
    "un hover est implémenté de base dans une image, il affiche affiche une url.",
    "le code est dans cette url."
  ];
  
  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ UTILISE LE SERVICE API
      const result = await api.validateEnigma(5, code);
      
      console.log('✅ Énigme validée:', result);
      alert('🎉 Félicitations ! Vous avez terminé tous les défis !');
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
      innerContent: {
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
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        width: isMobile ? '100%' : isTablet ? '300px' : '500px'
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

        .hover-image:hover {
          transform: scale(1.05);
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
            <h1 style={styles.h1}>Comprendre le CSS et l'effet hover</h1>
          </div>
        </div>

        <div style={styles.mainRect}>
          {/* Section 1 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Qu'est-ce que le hover ?</span>
                  <br/><br/>
                  <span>
                    Le terme hover signifie « survol » en anglais.<br />
                    En CSS, il s'agit d'un pseudo-classe qui correspond à l'état d'un élément lorsqu'un utilisateur place le curseur de sa souris dessus.<br />
                    C'est un moyen simple et efficace d'ajouter de l'interactivité sans recourir à JavaScript.
                    <br/><br/>
                    La syntaxe est la suivante :<br/><br/>
                    element:hover {'{'}
                    <br />
                    &nbsp;&nbsp;/* Styles appliqués au survol */<br />
                    {'}'}
                  </span>
                </div>
              </div>
              
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Par exemple :</span>
                  <br/><br/>
                  <span>
                    button {'{'}<br />
                    &nbsp;&nbsp;background-color: #3498db;<br />
                    &nbsp;&nbsp;color: white;<br />
                    &nbsp;&nbsp;border: none;<br />
                    &nbsp;&nbsp;padding: 10px 20px;<br />
                    &nbsp;&nbsp;transition: background-color 0.3s;<br />
                    {'}'}<br /><br />
                    button:hover {'{'}<br />
                    &nbsp;&nbsp;background-color: #2980b9;<br />
                    {'}'}<br /><br />
                    Dans cet exemple, la couleur du bouton change lorsqu'on le survole, offrant un retour visuel agréable à l'utilisateur.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Pourquoi utiliser hover ?</span>
                  <br/><br/>
                  <span>L'effet hover est largement utilisé pour :</span>
                  <ul style={styles.ul}>
                    <li style={styles.li}>Améliorer l'expérience utilisateur : il indique qu'un élément est interactif.</li>
                    <li style={styles.li}>Rendre l'interface plus dynamique : un simple changement de couleur, d'ombre ou de taille rend la page plus vivante.</li>
                    <li style={styles.li}>Renforcer la hiérarchie visuelle : les éléments interactifs (liens, boutons, images) se distinguent mieux.</li>
                  </ul>
                </div>
              </div>
              
              <a href="/image-LeCodeEst-OBVIOUS.png">
                <img 
                  className="hover-image"
                  style={styles.image}
                  src={hoverImage} 
                  alt="Effet hover" 
                />
              </a>
            </div>
          </div>

          {/* Section 3 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Quelques utilisations avancées</span>
                  <br/><br/>
                  <span>Le hover ne se limite pas à changer une couleur. On peut l'utiliser pour :</span>
                  <ul style={styles.ul}>
                    <li style={styles.li}>Afficher du contenu caché : par exemple, faire apparaître un menu déroulant.</li>
                    <li style={styles.li}>Appliquer des transformations : rotation, zoom ou déplacement d'un élément.</li>
                    <li style={styles.li}>Créer des effets d'animation : couplé avec la propriété transition, il permet des effets fluides et élégants.</li>
                  </ul>
                </div>
              </div>
              
              <div style={styles.innerContent}>
                <div style={styles.text}>
                  <span style={styles.bold}>Exemple :</span>
                  <br/><br/>
                  <span>
                    img:hover {'{'}<br />
                    &nbsp;&nbsp;transform: scale(1.1);<br />
                    &nbsp;&nbsp;transition: transform 0.4s ease;<br />
                    {'}'}<br/><br/>
                    Ici, l'image s'agrandit légèrement au survol, attirant le regard de l'utilisateur sans perturber la navigation.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div style={styles.section}>
            <div style={styles.innerContent}>
              <div style={styles.text}>
                <span style={styles.bold}>Limites et bonnes pratiques</span>
                <br/><br/>
                <ul style={styles.ul}>
                  <li style={styles.li}>L'effet hover ne fonctionne pas sur les appareils tactiles où il n'y a pas de curseur. Il faut donc prévoir des alternatives pour les interactions mobiles.</li>
                  <li style={styles.li}>Éviter les effets trop brusques ou distrayants : la subtilité est la clé.</li>
                  <li style={styles.li}>Toujours assurer un bon contraste entre les états normal et survolé pour respecter l'accessibilité.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div style={styles.section}>
            <div style={styles.innerContent}>
              <div style={styles.text}>
                <span style={styles.bold}>Conclusion</span>
                <br/><br/>
                <span>
                  Le hover en CSS illustre parfaitement la puissance et la simplicité des feuilles de style. Avec quelques lignes de code, on peut transformer une interface statique en une expérience interactive et engageante. Bien utilisé, cet effet améliore non seulement l'esthétique d'un site, mais aussi sa convivialité.
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

export default Enigma5;