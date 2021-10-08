import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, collection, getDocs, addDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyArTXhMGZqzRJOvaKQM3FhN84jjnKAClmA",
    authDomain: "responsecollect-1e335.firebaseapp.com",
    projectId: "responsecollect-1e335",
    storageBucket: "responsecollect-1e335.appspot.com",
    messagingSenderId: "788788810798",
    appId: "1:788788810798:web:931cc92bb69cb8c6357bbf"
};

const firebaseApp = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);

// onAuthStateChanged(auth, user => {
//     if(user!=null){
//         console.log('logged in')
//     }
//     else{
//         console.log('No user logged in');
//     }
// })

// Taking username and date of birth as input parameter
let usernameField = document.querySelector('#username');
let dateOfBirthField = document.querySelector('#dateOfBirth');
let submitCredentialsButton = document.querySelector('#submitCredential');

let userCredentials = {
    username: "",
    dob: ""
}

submitCredentialsButton.addEventListener('click', (ev) => {
    if (usernameField != "" && dateOfBirthField != "") {
        userCredentials.username = usernameField.value.split(" ").join("");
        userCredentials.dob = dateOfBirthField.value;
    }
    // console.log(userCredentials.username + userCredentials.dob);
})


async function countDocs(collection) {
    let querySnapshot = await getDocs(collection);
    let docCount = 0;

    querySnapshot.forEach((doc, i) => {
        docCount += 1;
    })

    return docCount;

}



const db = getFirestore(firebaseApp);
// connectFirestoreEmulator(db, 'localhost', 8080);

async function createDoc(data) {
    const usersCollection = await collection(db, 'users');
    var dataOBJ = data;

    // try {
    //     let querySnapshot = await getDocs(usersCollection);
    //     let docCount = 0;
    //     querySnapshot.forEach((doc) => {
    //         docCount += 1;
    //     })
    //     const docRef = await setDoc(doc(usersCollection, `user${docCount + 1}`), {
    //         correctResponse: data.correctResponse,
    //         response: data.response
    //     });

    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
    // ========================================================================
    const docRef = (db, 'users', userCredentials.username + userCredentials.dob);
    const docSnap = await getDocs(usersCollection, docRef);

    if (docSnap.exists) {
        // check if the experience collection is there
        // const experienceCollection = await collection(docRef, 'experience1');
        // console.log(experienceCollection);
        const newdocRef = await addDoc(collection(db, 'users', userCredentials.username + userCredentials.dob, 'Experience1'), {
            userResponse: "Existing User"
        })
        console.log('Doc ID', newdocRef.id);
    }
    else {
        // creation of a new doc with user name and password
        const userDoc = await setDoc(doc(usersCollection, userCredentials.username + userCredentials.dob), {
            username: userCredentials.username,
            dob: userCredentials.dob
        });
        // const experienceCollection = await collection(docRef, 'experience1');
        // console.log(experienceCollection);
        const expCollection = await collection(db, 'users', userCredentials.username + userCredentials.dob, 'Experience1');
        let docNumber = await countDocs(expCollection);
        const newdocRef = await setDoc(doc(expCollection, `respondID: ${docNumber}`), {
            correctResponse: dataOBJ.correctResponse,
            userResponse: dataOBJ.response
        })
        console.log('Response ID', `respondID: ${docNumber}`);

    }
}

async function generateData() {
    try {
        const usersCollection = collection(db, 'users');
        let querySnapshot = await getDocs(usersCollection);

        querySnapshot.forEach(doc => {
            console.log(doc.id, "==>", doc.data())
        });
    }
    catch (e) {

    }
}
// generateData();
// await countDocs(collection(db, 'users'));

export { createDoc, generateData }
