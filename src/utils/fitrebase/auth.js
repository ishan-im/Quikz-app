import auth from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import { showToast } from '../Toast/toast';

export const signUp = async (email, password) => {
  try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
       console.log('User account created & signed in!');
       
    return result;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showToast('error','That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      showToast('error','That email address is invalid!');
    }

    showToast('error',error);
  }
};

export const signIn = async (email, password) => {
  
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!');
      return userCredential;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case 'auth/wrong-password':
          showToast('error','incorrect password for email');
          break;
        case 'auth/user-not-found':
          showToast('error','no user associated with this email');
          break;
        default:
          showToast('error',error);
      }
    }
  
};

export const onGoogleSignIn = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    showToast('error',error);
  }
};

export const onAuthStateChangedListener = callback =>
auth().onAuthStateChanged(callback);


