
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp5DqEIZCPTeHNVy6rJV_YaGTVhRl6OFQ",
  authDomain: "test-ce488.firebaseapp.com",
  databaseURL: "https://test-ce488-default-rtdb.firebaseio.com",
  projectId: "test-ce488",
  storageBucket: "test-ce488.appspot.com",
  messagingSenderId: "385917514064",
  appId: "1:385917514064:web:f8f8838807fb4c29345e27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
