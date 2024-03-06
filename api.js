
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    query,
    where,
    doc,
    getDocs,
    getDoc
} from "firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh1HeGkxAcEh1rzbc-kYQmoLtCyO3UaNw",
  authDomain: "vanlife-4e935.firebaseapp.com",
  projectId: "vanlife-4e935",
  storageBucket: "vanlife-4e935.appspot.com",
  messagingSenderId: "447486585189",
  appId: "1:447486585189:web:5d41ed1cf13b65a338598c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')

export async function getVans() { 
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}