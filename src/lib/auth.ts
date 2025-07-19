import { auth } from './firebase/client';
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // The signed-in user info.
    const user = result.user;
    // You can also get the Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // Here you would typically check if the user exists in your Firestore database.
    // If not, you would redirect them to the onboarding page.
    // For now, we'll just return the user object.
    
    console.log('User signed in:', user);
    return user;
  } catch (error: any) {
    // Handle Errors here.
    console.error("Google Sign-In Error:", error);
    return null;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error("Sign Out Error:", error);
  }
}
