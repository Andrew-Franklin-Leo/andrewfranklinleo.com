import * as admin from 'firebase-admin';

function getAdminApp() {
    if (admin.apps.length) return admin.apps[0]!;

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
        // In build/dev without credentials, use a minimal config
        return admin.initializeApp({
            projectId: projectId || 'demo-project',
        });
    }

    return admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
}

const app = getAdminApp();
const adminDb = admin.firestore(app);
const adminAuth = admin.auth(app);

export { adminDb, adminAuth };
