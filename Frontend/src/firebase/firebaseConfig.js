// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAj5ghV-MTvFOCKfNIlo_Ox-IHPKyR7DlM",
  authDomain: "prn231-21066.firebaseapp.com",
  projectId: "prn231-21066",
  storageBucket: "prn231-21066.appspot.com",
  messagingSenderId: "900206824906",
  appId: "1:900206824906:web:fed8b8c7ccf28481719333",
  measurementId: "G-W4DH179SKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
