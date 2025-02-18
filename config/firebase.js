const firebase = require("firebase-admin");

var serviceAccount = require("../keys/onyx-virtue-380815-firebase-adminsdk-1v7oa-b88bf2dd62.json");
var riderServiceAccount = require("../keys/wasili-rider-380809-firebase-adminsdk-8bc77-b23b8daeb3.json");
const { cachedDataVersionTag } = require("v8");

const wasiliDriver = firebase.initializeApp({
          credential: firebase.credential.cert(serviceAccount)
}, 'wasili-driver');
const wasiliRider = firebase.initializeApp({
          credential: firebase.credential.cert(riderServiceAccount)
}, 'wasili-rider');

module.exports = {
          wasiliDriver,
          wasiliRider
}