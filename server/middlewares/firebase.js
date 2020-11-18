
var admin = require("firebase-admin");

var serviceAccount = require('../config/firebaseKeys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pro-commerce-5f6db.firebaseio.com"
});
