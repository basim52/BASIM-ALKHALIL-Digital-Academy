import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, FieldValue, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";
import fs from "fs";
import path from "path";

let adminApp: App | null = null;
let adminDbInstance: Firestore | null = null;
let adminAuthInstance: Auth | null = null;

export function getAdminApp(): App | null {
  if (adminApp) return adminApp;

  try {
    const existingApps = getApps();
    if (existingApps.length > 0 && existingApps[0]) {
      adminApp = existingApps[0];
      return adminApp;
    }

    let projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || "gen-lang-client-0689175056";
    try {
      const configPath = path.resolve(process.cwd(), "firebase-applet-config.json");
      if (fs.existsSync(configPath)) {
        const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        if (configData.projectId) {
          projectId = configData.projectId;
        }
      }
    } catch {
      // Ignore reading error
    }

    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        adminApp = initializeApp({
          credential: cert(serviceAccount),
          projectId
        });
      } catch (err) {
        console.warn("[Firebase Admin] Failed parsing FIREBASE_SERVICE_ACCOUNT:", err);
      }
    }

    if (!adminApp) {
      adminApp = initializeApp({
        projectId
      });
    }

    return adminApp;
  } catch (err) {
    console.error("[Firebase Admin] Failed to initialize admin app:", err);
    return null;
  }
}

export function getAdminDb(): Firestore | null {
  if (adminDbInstance) return adminDbInstance;
  const app = getAdminApp();
  if (!app) return null;

  try {
    let databaseId = "ai-studio-0623389a-4ed7-49ee-9ff7-03c4842030d0";
    try {
      const configPath = path.resolve(process.cwd(), "firebase-applet-config.json");
      if (fs.existsSync(configPath)) {
        const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        if (configData.firestoreDatabaseId) {
          databaseId = configData.firestoreDatabaseId;
        }
      }
    } catch {
      // Ignore
    }

    adminDbInstance = getFirestore(app, databaseId);
    return adminDbInstance;
  } catch (err) {
    console.error("[Firebase Admin] Failed to initialize admin Firestore:", err);
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  if (adminAuthInstance) return adminAuthInstance;
  const app = getAdminApp();
  if (!app) return null;
  try {
    adminAuthInstance = getAuth(app);
    return adminAuthInstance;
  } catch (err) {
    console.error("[Firebase Admin] Failed to get admin Auth:", err);
    return null;
  }
}

export { FieldValue };
