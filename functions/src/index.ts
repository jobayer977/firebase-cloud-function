import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
	credential: admin.credential.cert(require('./config/serviceAccountKey.json')),
});

export const getItems = functions.https.onRequest(async (req, res) => {
	const itemsRef = admin.firestore().collection('products');
	const snapshot = await itemsRef.get();
	const items = snapshot.docs.map((doc) => doc.data());
	res.json({ items });
});

export const addItem = functions.https.onRequest(async (req, res) => {
	const item = req.body;
	const itemRef = admin.firestore().collection('products').doc();
	await itemRef.set(item);
	res.json({ message: 'Item added successfully!', id: itemRef.id });
});
