import { firebase } from '@/utils/firebase';

let firstCheck = true;
let user = null;

const initialized = new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((newUser) => {
        user = newUser;
        if (firstCheck) {
            firstCheck = false;
            resolve(user);
        }
    });
});


export async function isAuth() {
    await initialized;
    return user;
}