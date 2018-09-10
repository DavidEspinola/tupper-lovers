export const firebase = window.firebase;
export const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});