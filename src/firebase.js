import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAsOntVMCdgIFFXKoaD4jucvVSXB-SkmPE",
    authDomain: "checklist-ui5.firebaseapp.com",
    databaseURL: "https://checklist-ui5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "checklist-ui5",
    storageBucket: "checklist-ui5.appspot.com",
    messagingSenderId: "259606768268",
    appId: "1:259606768268:web:86f5299324ecb72e3969a9"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };