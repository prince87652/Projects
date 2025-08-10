import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";

export const signupUser = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });
  await user.reload();
  const updatedUser = auth.currentUser

  const userRef = doc(db, "users", updatedUser.uid);

  await setDoc(userRef, {
    uid: updatedUser.uid,

    name:updatedUser.displayName,
    email:updatedUser.email,
    createdAt: new Date().toISOString(),
  });

  return {
    uid: updatedUser.uid,
    displayName: updatedUser.displayName,
    email: updatedUser.email
  };
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logoutUser = async ()=>{
    await signOut(auth);
}