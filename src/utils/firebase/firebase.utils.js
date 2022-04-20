// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByzP5XxaDc5BPb8i70tr7N15e-K1rJE5w",
  authDomain: "crwn-clothing-db-74139.firebaseapp.com",
  projectId: "crwn-clothing-db-74139",
  storageBucket: "crwn-clothing-db-74139.appspot.com",
  messagingSenderId: "420412325229",
  appId: "1:420412325229:web:e771e34348cd7527de2e64",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//take the data from authentication service, store it in firestore
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  //if snapshot does not exist
  if (!userSnapshot.exists()) {   
    //set it inside database
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } 

  return userDocRef;

  //if user data does not exist
  //create / set the document with the data from userAuth in my collection

  //return userdocref
};
