require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');
const DatabaseClue = require('./models/DatabaseClue');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connexion à MongoDB...');
    
    // Supprimer les données existantes
    await DatabaseClue.deleteMany({});
    
    // Ajouter les indices pour l'énigme 2
    const clues = [
      { clueKey: 'user_001', clueValue: 'Elise', number: '0761895014', password: 'CaCa.pRout', autorization: 'view', lastLog: '30/03/25', firstLog: '01:20:45', numPurchase: '110', shipAdress: 'France' },
      { clueKey: 'user_002', clueValue: 'Nicole', number: '0691683254', password: 'JeSaisPas!', autorization: 'post / view', lastLog: '20/08/25', firstLog: '00:38:25', numPurchase: '205', shipAdress: 'Espagne' },
      { clueKey: 'user_003', clueValue: 'Suzanne', number: '0747661762', password: 'MonChat', autorization: 'post / view', lastLog: '07/10/25', firstLog: '02:31:17', numPurchase: '53', shipAdress: 'Allemagne' },
      { clueKey: 'user_004', clueValue: 'Zoé', number: '0788135377', password: 'MotDePasse', autorization: 'view', lastLog: '01/06/25', firstLog: '00:05:02', numPurchase: '150', shipAdress: 'France' },
      { clueKey: 'user_005', clueValue: 'Emile', number: '0751576191', password: 'Secr3t', autorization: 'view', lastLog: '29/03/25', firstLog: '03:40:58', numPurchase: '20', shipAdress: 'France' },
      { clueKey: 'user_006', clueValue: 'Gustave', number: '0662819675', password: 'M4r13.', autorization: 'post / view', lastLog: '25/02/24', firstLog: '02:52:19', numPurchase: '73', shipAdress: 'Maroc' },
      { clueKey: 'user_007', clueValue: 'Charles', number: '0714114388', password: 'JeSuisCh4arles', autorization: 'post / view', lastLog: '12/07/25', firstLog: '00:54:26', numPurchase: '33', shipAdress: 'Allemagne' },
      { clueKey: 'user_008', clueValue: 'Loïs', number: '0623476870', password: 'Xam54..Xg', autorization: 'view', lastLog: '21/11/25', firstLog: '01:34:52', numPurchase: '221', shipAdress: 'Canada' },
      { clueKey: 'user_009', clueValue: 'Marie', number: '0652584525', password: 'Gu5t4v3.', autorization: 'post / view', lastLog: '07/10/25', firstLog: '02:15:42', numPurchase: '47', shipAdress: 'Etats-Unis' },
      { clueKey: 'user_010', clueValue: 'Frederic', number: '0662839060', password: 'C0uc0u.!', autorization: 'view', lastLog: '02/12/24', firstLog: '03:02:51', numPurchase: '10', shipAdress: 'Mexique' },
      { clueKey: 'user_011', clueValue: 'Margaux', number: '0650231011', password: 'A.!dams12', autorization: 'post / view', lastLog: '19/09/24', firstLog: '01:25:43', numPurchase: '06', shipAdress: 'France' },
      { clueKey: 'code_012', clueValue: 'Josette', number: '0707070707', password: 'MONGOOSE', autorization: '-', lastLog: '20/10/25', firstLog: '00:00:00', numPurchase: '00', shipAdress: 'Server' },
      { clueKey: 'user_013', clueValue: 'José', number: '0725815072', password: 'KiriLeChat', autorization: 'vpost / view', lastLog: '13/01/25', firstLog: '05:33:51', numPurchase: '179', shipAdress: 'Angleterre' },
      { clueKey: 'user_014', clueValue: 'Jean', number: '0690568818', password: 'ABRAC4D4BR4', autorization: 'post / view', lastLog: '03/05/25', firstLog: '01:39:18', numPurchase: '201', shipAdress: 'Angleterre' },
      { clueKey: 'user_015', clueValue: 'Therese', number: '0685232277', password: 'Ch1fr&L3tr', autorization: 'view', lastLog: '14/04/25', firstLog: '02:14:26', numPurchase: '64', shipAdress: 'Maroc' },
      { clueKey: 'user_016', clueValue: 'Benoit', number: '0676911781', password: 'K4l1L1nuX', autorization: 'view', lastLog: '21/10/24', firstLog: '01:59:24', numPurchase: '81', shipAdress: 'Mexique' },
      { clueKey: 'user_017', clueValue: 'Julees', number: '0797625262', password: 'YXgAdcm578.', autorization: 'view', lastLog: '04/12/23', firstLog: '01:36:45', numPurchase: '109', shipAdress: 'Mexique' },
      { clueKey: 'user_018', clueValue: 'Jeanne', number: '0711773590', password: 'MaFillePref', autorization: 'post / view', lastLog: '15/04/25', firstLog: '03:45:20', numPurchase: '57', shipAdress: 'Canada' },
      { clueKey: 'Admin_app', clueValue: 'Application', number: '-', password: 'Admin_25a', autorization: 'application all', lastLog: '-/-/-', firstLog: '-:-:-', numPurchase: '-', shipAdress: 'France' },
      { clueKey: 'Admin_site', clueValue: 'Site Web', number: '-', password: 'Admin_25s', autorization: 'website all', lastLog: '-/-/-', firstLog: '-:-:-', numPurchase: '-', shipAdress: 'France' },
      { clueKey: 'Admin_all', clueValue: 'Forest', number: '-', password: 'Admin_25', autorization: 'all', lastLog: '-/-/-', firstLog: '-:-:-', numPurchase: '-', shipAdress: 'France' },
    ];
    
    await DatabaseClue.insertMany(clues);
    
    console.log('✅ Base de données peuplée avec succès !');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erreur:', err);
    process.exit(1);
  });
