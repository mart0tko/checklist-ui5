import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const getAllDocs = async (sCollection) => {
    return getDocs(collection(db, sCollection), orderBy("timestamp", "asc")).then((snapshot) => {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
}

const addSingleDoc = async (sCollection, oNewDoc) => await addDoc(collection(db, sCollection), { timestamp: Date.now(), ...oNewDoc });
const deleteSingleDoc = async (sCollection, sId) => await deleteDoc(doc(db, sCollection, sId));
const updateSingleDoc = async (sCollection, oNewDoc, sId) => await updateDoc(doc(db, sCollection, sId), { ...oNewDoc });

export { getAllDocs, addSingleDoc, deleteSingleDoc, updateSingleDoc }
export default db;