import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import { getFirebaseServices } from "@/lib/firebase/client";

const provider = new GoogleAuthProvider();

export function observeAuthState(callback: (user: User | null) => void) {
  const { auth } = getFirebaseServices();

  if (!auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  const { auth } = getFirebaseServices();

  if (!auth) {
    throw new Error("Firebase is not configured yet. Add your environment variables to enable sign-in.");
  }

  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  const { auth } = getFirebaseServices();

  if (!auth) {
    return;
  }

  await signOut(auth);
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  const allowedEmails =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean) ?? [];

  if (allowedEmails.length === 0) {
    return true;
  }

  return allowedEmails.includes(email.toLowerCase());
}
