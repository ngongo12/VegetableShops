var firebase_admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const admin = firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount)
});

exports.admin = admin;