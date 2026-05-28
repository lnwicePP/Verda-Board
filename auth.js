// Firebase Authentication Functions

function translateError(errorCode) {
  const errors = {
    'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น',
    'auth/weak-password': 'รหัสผ่านอ่อนแอเกินไป ต้องมีอย่างน้อย 8 ตัวอักษร',
    'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
    'auth/user-not-found': 'ไม่พบบัญชีผู้ใช้ สมัครสมาชิกใหม่ได้ที่หน้า สมัครสมาชิก',
    'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
    'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่',
    'auth/invalid-login-credentials': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่',
    'auth/too-many-requests': 'ลองใหม่มากเกินไป กรุณารอสักครู่แล้วลองอีกครั้ง',
    'auth/operation-not-allowed': 'การลงชื่อเข้าระบบประเภทนี้ถูกปิดใช้งาน'
  };

  return errors[errorCode] || 'เกิดข้อผิดพลาด: ' + errorCode;
}

async function signUp(email, password, displayName) {
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
        level: 0,
        profilePictureURL: null,
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
    console.error('✗ Signup error:', error.code, error.message);
    const friendlyError = translateError(error.code);
    return { success: false, error: friendlyError };
  }
}

async function login(email, password) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('✓ Login successful:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('✗ Login error:', error.code, error.message);
    const friendlyError = translateError(error.code);
    return { success: false, error: friendlyError };
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
        profilePictureURL: user.photoURL,
        level: 0,
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
    console.error('✗ Google sign-in error:', error.code, error.message);
    console.error('Full error:', error);
    const friendlyError = translateError(error.code);
    return { success: false, error: friendlyError };
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
