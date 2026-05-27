// Firebase Authentication Functions

async function signUp(email, password, displayName, role) {
  try {
    console.log('Step 1: Creating auth user...');
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('Step 2: Auth user created:', user.email);

    console.log('Step 3: Saving to Firestore...');
    console.log('User UID:', user.uid);
    try {
      await firebase.firestore().collection("users").doc(user.uid).set({
        email: email,
        displayName: displayName,
        role: role,
        createdAt: new Date().toISOString()
      });
      console.log('Step 4: Firestore saved successfully');
    } catch (firestoreError) {
      console.error('Step 4: Firestore save FAILED:', firestoreError.message);
      throw firestoreError;
    }

    console.log('✓ Signup successful:', user.email);
    return { success: true, user };
  } catch (error) {
    console.error('✗ Signup error:', error.message);
    return { success: false, error: error.message };
  }
}

async function login(email, password) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('✓ Login successful:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('✗ Login error:', error.message);
    return { success: false, error: error.message };
  }
}

function onUserStateChange(callback) {
  return firebase.auth().onAuthStateChanged(callback);
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}

async function googleSignIn() {
  try {
    console.log('Step 1: Starting Google sign-in...');
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await firebase.auth().signInWithPopup(provider);
    const user = userCredential.user;
    console.log('Step 2: Auth success:', user.email);

    console.log('Step 3: Saving to Firestore...');
    console.log('User UID:', user.uid);
    console.log('Firebase object:', firebase);
    console.log('Firestore:', firebase.firestore());

    try {
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString()
      };
      console.log('Data to save:', userData);

      await firebase.firestore().collection("users").doc(user.uid).set(userData);
      console.log('Step 4: Firestore saved successfully');
    } catch (firestoreError) {
      console.error('Step 4: Firestore save failed:', firestoreError.message);
      console.error('Full error:', firestoreError);
      throw firestoreError;
    }

    console.log('✓ Google sign-in successful:', user.email);
    return { success: true, user };
  } catch (error) {
    console.error('✗ Google sign-in error:', error.message);
    console.error('Full error:', error);
    return { success: false, error: error.message };
  }
}

async function signOut() {
  try {
    await firebase.auth().signOut();
    console.log('✓ Signout successful');
    return { success: true };
  } catch (error) {
    console.error('✗ Signout error:', error.message);
    return { success: false, error: error.message };
  }
}
