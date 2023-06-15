import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// import { useDispatch } from "react-redux";
// import { login } from "./actions/userActions";
console.log(process.env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,  
};


  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(res.user);
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const docs = await getDocs(q);
    if (docs.docs.length > 0) {
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   authProvider: "google",
      //   email: user.email,
      // });
      return({ firstName: user.displayName, email: user.email })

    }
    else{
      return({error:"User doesn't exists"})
    }
    
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      // If err is an instance of Error, handle the error
      // alert(err.message);
      return { error: err.message };
    } else {
      // Handle the case when err is of type unknown
      return { error: 'An unknown error occurred.' };
    }
  }
};

const registerWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
   
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
      // const dispatch = useDispatch()
      // dispatch(login({firstName:user.displayName,secondName:user.displayName,email:user.email}))
      return({ user })
    }
    else{
      return({ user })
    }
  } catch (err) {
    console.error(err);
    
    if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
      alert(err.message);
      return { error: err.message };
    } else {
      return { error: 'An unknown error occurred.' };
    }
  }
  
};

const logInWithEmailAndPassword = async (email) => {
  try {
    await signInWithEmailAndPassword(auth, email);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email);
    const user = res.user;
    

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  signOut(auth);
};

const storage = getStorage(app);


export {
  auth,
  db,
  app,
  signInWithGoogle,
  registerWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  storage
};