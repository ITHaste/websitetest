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

let chatList = [];

onValue(ref(db, 'SavedText'), function(snapshot) {
  const DisplayInput = document.getElementById('DisplayInput');
  const SavedText = snapshot.val();
  
  if (DisplayInput) {
    // Safeguard: ONLY accept SavedText if it is a real array. 
    // If it's a plain string or empty, default to a clean list []
    if (Array.isArray(SavedText)) {
      chatList = SavedText;
    } else {
      chatList = [];
    }
    
    // Now this is 100% safe from crashing!
    DisplayInput.innerHTML = chatList.join('<br>');
  }
});


function MoveText() {
const Input = document.getElementById('UserInput');
const DisplayInput = document.getElementById('DisplayInput');
    
//DisplayInput.textContent = Input.value;

chatList.push(Input.value);

if (chatList.length > 5) {
  chatList.shift();
}
  console.log(chatList);
  

set(ref(db, 'SavedText'), chatList);


Input.value = '';
  }
  
window.MoveText = MoveText;