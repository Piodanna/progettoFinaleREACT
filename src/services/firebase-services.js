import {
  getDoc,
  collection,
  updateDoc,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, auth } from "../Config/firebase";
import Cookies from "js-cookie";

export function selectCollection(collectionName) {
  return collection(db, collectionName);
}

export async function registerUser(userData) {
  const ud = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    role: [],
  };
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  await addUser(ud);
  const user = userCredentials.user;
  console.log("Utente registrato con successo:", user);
  return user;
}

export async function loginUser(formData) {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  );
  const user = userCredentials.user;
  console.log("Utente loggato con successo:" + user);
  Cookies.set("token", user.accessToken, { expires: 7 });
  const userData = await getUser(user.email);
  return userData;
}

export async function deleteUser(id) {
  const userRef = doc(db, "users", id);
  await deleteDoc(userRef);
  const user = auth.currentUser;
  await user.delete();
}

export async function addUser(ud) {
  const userCollectionRef = collection(db, "users");
  await addDoc(userCollectionRef, ud);
}

export async function getUser(email){
    //Recupero i dati dalla collezione users
    const data = await getDocs(selectCollection("users"));

    //Dopo aver ottenuto i documenti dalla collezione "users", viene utilizzato map per trasformare ciascun documento in un oggetto con due proprietà: id, che rappresenta l'ID del documento, e le altre proprietà ottenute utilizzando doc.data(). Questo crea un array di oggetti users.
    const users = data.docs.map( (doc) => ({id:doc.id, ...doc.data()}));

    //Viene utilizzata la funzione filter sull'array users per filtrare gli utenti in base all'email specificata. Infine, [0] viene utilizzato per ottenere solo il primo elemento dell'array risultante dalla filter. Questo è dovuto al fatto che si assume che ci sia solo un utente con un'email univoca nel database (poiché le email dovrebbero essere uniche per ogni utente). Se non viene trovato nessun utente con quell'email, il risultato sarà undefined. 
    return users.filter( element => element.email === email)[0];
}

export async function getCorsi(){
    const response = await getDocs(selectCollection("corsi"));

    //array
    const data = response.docs.map((doc) => ({id: doc.id, ...doc.data() }));
    return data;
}