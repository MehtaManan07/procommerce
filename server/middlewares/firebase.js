
const admin = require("firebase-admin");

const serviceAccount = require('../config/firebaseKeys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pro-commerce-5f6db.firebaseio.com"
});

module.exports = admin;