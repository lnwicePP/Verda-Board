# Firebase Setup Guide

## ขั้นตอนการตั้งค่า Firebase

### 1. สร้าง Firebase Project
- ไปที่ [Firebase Console](https://console.firebase.google.com)
- คลิก "Create a new project"
- ตั้งชื่อ project เป็น "verda-board"
- เลือก region ที่เหมาะสม
- คลิก "Create project"

### 2. เพิ่ม Web App
- ใน Firebase Console ของ project
- คลิกไอคอน `</>` เพื่อเพิ่ม Web App
- ตั้งชื่อ app
- คลิก "Register app"

### 3. คัดลอก Firebase Config
Firebase จะแสดง config code ที่มีลักษณะดังนี้:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "verda-board.firebaseapp.com",
  projectId: "verda-board",
  storageBucket: "verda-board.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. อัปเดต firebase-config.js
แก้ไขไฟล์ `firebase-config.js` และแทนที่ค่า config ด้วยค่าที่คัดลอกมา:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // <- เปลี่ยนนี่
  authDomain: "YOUR_AUTH_DOMAIN",  // <- เปลี่ยนนี่
  projectId: "YOUR_PROJECT_ID",  // <- เปลี่ยนนี่
  storageBucket: "YOUR_STORAGE_BUCKET",  // <- เปลี่ยนนี่
  messagingSenderId: "YOUR_SENDER_ID",  // <- เปลี่ยนนี่
  appId: "YOUR_APP_ID"  // <- เปลี่ยนนี่
};
```

### 5. เปิด Authentication
- ใน Firebase Console > "Build" > "Authentication"
- คลิก "Get started"
- เลือก "Email/Password"
- คลิก "Enable"
- คลิก "Save"

### 6. สร้าง Firestore Database
- ใน Firebase Console > "Build" > "Firestore Database"
- คลิก "Create database"
- เลือก "Start in test mode" (สำหรับการทดสอบ)
- เลือก location
- คลิก "Create"

## ตรวจสอบการเชื่อมต่อ
1. เปิดไฟล์ `index.html` ในเบราว์เซอร์
2. ทดลองสมัครสมาชิกหรือเข้าสู่ระบบ
3. ตรวจสอบ Firebase Console ว่าข้อมูลผู้ใช้ถูกบันทึก

## หมายเหตุ
- ในการใช้งานจริง ให้เปลี่ยนจาก "Test mode" เป็น "Production" และตั้งค่า Security Rules
- เก็บ API key อย่างปลอดภัย
