var admin = require("firebase-admin");

var serviceAccount = require("./mikesmovies-c3799-firebase-adminsdk-kb2a8-d73f04cf77.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mikesmovies-c3799.firebaseio.com"
});
