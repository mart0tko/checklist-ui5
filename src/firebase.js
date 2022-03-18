import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';

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