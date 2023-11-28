import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyDoTDkv9lHxsntMfYJBAowOdu70Vd8362o",
  authDomain: "fir-javascript-crud-58f99.firebaseapp.com",
  projectId: "fir-javascript-crud-58f99",
  storageBucket: "fir-javascript-crud-58f99.appspot.com",
  messagingSenderId: "89690293813",
  appId: "1:89690293813:web:47b5abcc1c16118ada537c"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const storage = getStorage(app);


export const uploadImage = (file, nameFile, range, image) => {
    const imagesRef = ref(storage, 'images/' + file.name);
    // uploadBytes(imagesRef, file).then((snapshot) => {
    //    console.log('Uploaded a blob of a title')
    //  })
    //}

    const uploadTask = uploadBytesResumable(imagesRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            range.value = Math.round(progress);
        },
        (error) => {

        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                nameFile.value = downloadURL;
                image.src = downloadURL;
            });
        }
    );
};
export const saveTask = (title, description, image) =>
    addDoc(collection(db, "tasks"), { title, description, image });

export const onGetTasks = (callback) =>
    onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
    updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));

//modules.export = getDownloadURL