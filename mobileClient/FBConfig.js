<<<<<<< HEAD
import firebase from 'firebase'
import '@firebase/firestore';
const config = {
 apiKey: "AIzaSyDI4BwfJ0OXvYAeQ-Z8wEFW38e8FLCIQGY",
 authDomain: "cimb-final-project.firebaseapp.com",
 databaseURL: "https://cimb-final-project.firebaseio.com",
 projectId: "cimb-final-project",
 storageBucket: "cimb-final-project.appspot.com",
 messagingSenderId: "1042141046035",
 appId: "1:1042141046035:web:b489882285c41a84"
};
 firebase.initializeApp(config)
 const dbh = firebase.firestore();
 export default dbh
=======
import firebase from "firebase";
import "@firebase/firestore";
const config = {
  apiKey: "AIzaSyDI4BwfJ0OXvYAeQ-Z8wEFW38e8FLCIQGY",
  authDomain: "cimb-final-project.firebaseapp.com",
  databaseURL: "https://cimb-final-project.firebaseio.com",
  projectId: "cimb-final-project",
  storageBucket: "cimb-final-project.appspot.com",
  messagingSenderId: "1042141046035",
  appId: "1:1042141046035:web:b489882285c41a84"
};
firebase.initializeApp(config);
const dbh = firebase.firestore();
export default dbh;
>>>>>>> 7ccefeb9d09e598460aa2d19416ff7438f073322
