// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";

// Your web app's Firebase configuration
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

// --- FIREBASE REALTIME LISTENER ---
onValue(ref(db, 'SavedText'), function(snapshot) {
  const DisplayInput = document.getElementById('DisplayInput');
  const SavedText = snapshot.val();
  
  if (DisplayInput) {
    if (Array.isArray(SavedText)) {
      chatList = SavedText;
    } else {
      chatList = [];
    }
    
    // 1. Join your array items with line breaks like you did before
    let chatHtml = chatList.join('<br>');
    
    // 2. Fetch the logged-in user's name from localStorage
    const loggedInUser = localStorage.getItem('Username');
    
    // 3. Check if the name exists and if it shows up anywhere in the chat text
    if (loggedInUser && chatHtml.includes(loggedInUser)) {
      // We use .replaceAll() so it highlights every single mention, using backticks ``
      chatHtml = chatHtml.replaceAll(loggedInUser, `<span class="YourUser">${loggedInUser}</span>`);
    }
    
    // 4. Push the final formatted HTML string to your container
    DisplayInput.innerHTML = chatHtml;
  }
  
  const chatbox = document.getElementById('chatbox');
  chatbox.scrollTop = chatbox.scrollHeight;
});


// --- SEND MESSAGE FUNCTION ---
function MoveText() {
  const Input = document.getElementById('UserInput');
  const User = localStorage.getItem('Username');
  
  // Quick Fix: Stop the function entirely if the input is empty or just spaces
  if (Input.value.trim() === "") {
    return;
  }
  
  const UserChat = `${User}: ${Input.value}`;
  
  chatList.push(UserChat);
  
  if (chatList.length > 5) {
    chatList.shift();
  }
  
  console.log(chatList);
  set(ref(db, 'SavedText'), chatList);
  
  Input.value = '';
}

// --- SIGN OUT FUNCTION ---
function SignOut() {
  localStorage.removeItem('Username');
  location.reload();
  console.log("Username removed.");
}

// Global Window bindings so your HTML buttons can still find the functions
window.MoveText = MoveText;
window.SignOut = SignOut;