import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import HintBox from '../components/HintBox.jsx';
import databaseImg from './image/database.png';
import edgarCoddImg from './image/Edgar_F_Codd.jpg';
import nosqlImg from './image/nosql.jpeg';
import api from '../services/api';

function Enigma2({ onComplete }) {
  const [clues, setClues] = useState([]);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const hints = [
    "il faut analyser la base de donnée",
    "remarquer une ligne différente des autres"
  ];

  useEffect(() => {
    const fetchClues = async () => {
      try {
        // ✅ UTILISE LE SERVICE API
        const data = await api.getClues();
        setClues(data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Erreur fetchClues:', err);
        setError('Erreur de chargement des données');
        setLoading(false);
      }
    };

    fetchClues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ UTILISE LE SERVICE API
      const result = await api.validateEnigma(2, code);
      
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
      flexSectionReverse: {
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row-reverse',
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
        minHeight: isMobile ? 'auto' : isTablet ? '250px' : '310px',
        flex: 1
      },
      boxReverse: {
        background: '#997953',
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        padding: isMobile ? '15px' : isTablet ? '20px' : '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: isMobile ? 'auto' : isTablet ? '300px' : '334px',
        flex: 1
      },
      text: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : isTablet ? '16px' : '20px',
        lineHeight: isMobile ? '1.4' : '1.15',
        textAlign: 'left',
        width: '100%'
      },
      textRight: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : isTablet ? '16px' : '20px',
        lineHeight: isMobile ? '1.4' : '1.15',
        textAlign: 'left',
        width: '100%'
      },
      bold: {
        fontWeight: '700'
      },
      image: {
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : isTablet ? '300px' : '458px',
        minHeight: isMobile ? '200px' : isTablet ? '300px' : 'auto'
      },
      imageSmall: {
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        display: 'block',
        width: isMobile ? '100%' : isTablet ? '250px' : '300px'
      },
      enigmaSection: {
        background: '#997953',
        borderRadius: isMobile ? '25px' : isTablet ? '35px' : '50px',
        padding: isMobile ? '20px' : isTablet ? '30px' : '40px',
        marginTop: isMobile ? '20px' : isTablet ? '30px' : '40px',
        width: '100%',
        boxSizing: 'border-box'
      },
      enigmaTitle: {
        color: '#ffffff',
        fontSize: isMobile ? '20px' : isTablet ? '26px' : '32px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: isMobile ? '15px' : '20px',
        width: '100%'
      },
      enigmaDescription: {
        color: '#ffffff',
        fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px',
        textAlign: 'center',
        marginBottom: isMobile ? '20px' : '30px',
        width: '100%'
      },
      cluesScroll: {
        maxHeight: '400px',
        overflowY: 'auto',
        overflowX: 'auto',
        borderRadius: '15px',
        background: '#ffffff',
        marginBottom: '20px',
        width: '100%',
        boxSizing: 'border-box'
      },
      cluesTable: {
        width: '100%',
        minWidth: isMobile ? '700px' : '900px',
        borderCollapse: 'collapse'
      },
      tableTh: {
        background: '#0f1e3f',
        color: '#ffffff',
        padding: isMobile ? '10px' : '15px',
        textAlign: 'left',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        fontSize: isMobile ? '12px' : '14px',
        fontWeight: '600'
      },
      tableTd: {
        padding: isMobile ? '8px 10px' : '12px 15px',
        borderBottom: '1px solid #ddd',
        color: '#333',
        fontSize: isMobile ? '12px' : '14px'
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
      loadingMessage: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: isMobile ? '14px' : '16px',
        width: '100%'
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

        .clues-scroll::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .clues-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .clues-scroll::-webkit-scrollbar-thumb {
          background: #0f1e3f;
          border-radius: 10px;
        }

        .clues-scroll::-webkit-scrollbar-thumb:hover {
          background: #1a3d6b;
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

        tr:hover {
          background: #f5f5f5;
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.headerRect}>
          <div style={styles.title}>
            <h1 style={styles.h1}>Des registres papier aux bases de données modernes</h1>
          </div>
        </div>

        <div style={styles.mainRect}>
          {/* Section 1 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.box}>
                <div style={styles.text}>
                  <span style={styles.bold}>Les tables et les fiches : les origines de la gestion de l'information</span><br/><br/>
                  Bien avant l'ère du numérique, la gestion des informations se faisait dans des registres papier, des classeurs ou des cahiers. Les entreprises y notaient leurs ventes, leurs clients, leurs stocks – des opérations fastidieuses, chronophages et vulnérables aux erreurs humaines.<br/>
                  Avec l'arrivée des ordinateurs, cette organisation s'est transposée dans le monde virtuel : les fiches sont devenues des tables, les cases des champs, et les classeurs, des bases de données.<br/>
                  C'est ainsi qu'est née une nouvelle façon de structurer et de explorer l'information : plus rapide, plus sûre, et surtout, automatisée.
                </div>
              </div>
              <img style={styles.image} src={databaseImg} alt="Illustration registres papier" />
            </div>
          </div>

          {/* Section 2 */}
          <div style={styles.section}>
            <div style={styles.flexSectionReverse}>
              <div style={styles.boxReverse}>
                <div style={styles.textRight}>
                  <span style={styles.bold}>Les premiers pas : le règne du relationnel</span><br/><br/>
                  Dans les années 1970, un chercheur d'IBM, Edgar F. Codd, formalise un concept majeur : le modèle relationnel.<br/>
                  Son idée est simple mais révolutionnaire : représenter les données sous forme de tables reliées entre elles par des relations logiques.<br/>
                  Ainsi, une table "Clients" peut être liée à une table "Commandes" — permettant de retrouver, en un instant, toutes les commandes d'un client donné.<br/>
                  C'est le début du langage SQL (Structured Query Language), qui deviendra la langue universelle pour interroger, ajouter ou modifier des données. Des systèmes comme Oracle, MySQL ou PostgreSQL s'imposent alors comme les piliers de l'ère des bases de données relationnelles.
                </div>
              </div>
              <img style={styles.imageSmall} src={edgarCoddImg} alt="Illustration bases relationnelles" />
            </div>
          </div>

          {/* Section 3 */}
          <div style={styles.section}>
            <div style={styles.flexSection}>
              <div style={styles.box}>
                <div style={styles.text}>
                  <span style={styles.bold}>L'évolution vers de nouveaux modèles : quand la donnée explose</span><br/><br/>
                  Avec l'avènement d'Internet, des smartphones et des objets connectés, la quantité de données produites s'est mise à croître de façon exponentielle.<br/>
                  Les anciens modèles, centrés sur la rigidité des tables, ont commencé à montrer leurs limites.<br/>
                  C'est alors que sont apparues les bases de données NoSQL, capables de stocker des informations moins structurées, allant de simples documents à des graphes complexes.<br/>
                  Des noms comme MongoDB, Cassandra ou Redis symbolisent cette nouvelle génération de systèmes, conçus pour la vitesse, la flexibilité et la scalabilité.
                </div>
              </div>
              <img style={styles.imageSmall} src={nosqlImg} alt="Illustration NoSQL" />
            </div>
          </div>

          {/* Section 4 */}
          <div style={styles.section}>
            <div style={styles.box}>
              <div style={styles.text}>
                <span style={styles.bold}>Du stockage à la connaissance : la donnée comme moteur</span><br/><br/>
                Aujourd'hui, les bases de données ne servent plus seulement à stocker des informations, mais à les comprendre.<br/>
                Elles alimentent les moteurs de recherche, les systèmes de recommandation, les analyses prédictives ou les modèles d'intelligence artificielle.<br/>
                Grâce aux technologies de Big Data et au cloud, les données sont traitées à des vitesses et à des volumes autrefois impossibles.<br/>
                De simples outils de gestion, les bases de données sont devenues le cœur battant du monde numérique, assurant le bon fonctionnement de tout ce qui nous entoure : transactions bancaires, réseaux sociaux, transports, santé et même nos domiciles connectés.
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div style={styles.section}>
            <div style={styles.box}>
              <div style={styles.text}>
                <span style={styles.bold}>En conclusion : la mémoire du monde connecté</span><br/><br/>
                Si l'on devait comparer l'informatique à un organisme vivant, les bases de données en seraient la mémoire.<br/>
                Elles enregistrent, organisent et restituent les traces de notre activité numérique.<br/>
                Sans elles, les applications, les sites web et les services modernes seraient des coquilles vides, incapables de se souvenir de nous ou d'évoluer à nos côtés.<br/>
                Ainsi, des tables imaginées par Codd dans les laboratoires d'IBM aux gigantesques entrepôts de données d'aujourd'hui, l'histoire des bases de données raconte celle de notre soif d'ordre dans le chaos de l'information.
              </div>
            </div>
          </div>

          {/* Enigma Section */}
          <div style={styles.enigmaSection}>
            <h2 style={styles.enigmaTitle}>💾 Énigme 2 : Exploration de Base de Données</h2>
            
            <p style={styles.enigmaDescription}>
              Les bases de données sont au cœur de toutes les applications modernes. 
              MongoDB stocke les données sous forme de documents. Explorez cette base 
              de données pour trouver le code secret...
            </p>

            {loading ? (
              <p style={styles.loadingMessage}>Chargement des données...</p>
            ) : (
              <div style={styles.cluesScroll} className="clues-scroll">
                <table style={styles.cluesTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableTh}>User</th>
                      <th style={styles.tableTh}>Nom</th>
                      <th style={styles.tableTh}>Numero</th>
                      <th style={styles.tableTh}>Mot de passe</th>
                      <th style={styles.tableTh}>autorisation</th>
                      <th style={styles.tableTh}>dernier Log</th>
                      <th style={styles.tableTh}>temps de Co</th>
                      <th style={styles.tableTh}>achetés</th>
                      <th style={styles.tableTh}>adresse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clues.map((clue) => (
                      <tr key={clue._id}>
                        <td style={styles.tableTd}>{clue.clueKey}</td>
                        <td style={styles.tableTd}>{clue.clueValue}</td>
                        <td style={styles.tableTd}>{clue.number}</td>
                        <td style={styles.tableTd}>{clue.password}</td>
                        <td style={styles.tableTd}>{clue.autorization}</td>
                        <td style={styles.tableTd}>{clue.lastLog}</td>
                        <td style={styles.tableTd}>{clue.firstLog}</td>
                        <td style={styles.tableTd}>{clue.numPurchase}</td>
                        <td style={styles.tableTd}>{clue.shipAdress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                style={styles.input}
                placeholder="Entrez le code trouvé dans la base"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
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

export default Enigma2;