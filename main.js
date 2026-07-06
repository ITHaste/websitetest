// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJahKgep2Zb1upxRaKMSRq8sL-7IL4F_E",
  authDomain: "websitetest-3866f.firebaseapp.com",
  databaseURL: "https://websitetest-3866f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "websitetest-3866f",
  storageBucket: "websitetest-3866f.firebasestorage.app",
  messagingSenderId: "548790880498",
  appId: "1:548790880498:web:166c57b3b3fd5b1e4ce86b",
  measurementId: "G-RY16MW9ZHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

onValue(ref(db, 'SavedText'), function(snapshot) {
  const DisplayInput = document.getElementById('DisplayInput');
  const SavedText = snapshot.val();
  
  if (SavedText && DisplayInput) {
    DisplayInput.textContent = SavedText;
  }
});  



function MoveText() {
const Input = document.getElementById('UserInput');
const DisplayInput = document.getElementById('DisplayInput');
    
DisplayInput.textContent = Input.value;

set(ref(db, 'SavedText'), Input.value);


Input.value = '';
  }
  
window.MoveText = MoveText;