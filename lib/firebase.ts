import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    ...(process.env.FIREBASE_STORAGE_BUCKET
      ? { storageBucket: process.env.FIREBASE_STORAGE_BUCKET }
      : {}),
  });
  getFirestore().settings({ ignoreUndefinedProperties: true });
}

export const db = getFirestore();
