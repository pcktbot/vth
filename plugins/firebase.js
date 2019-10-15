import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyCA98aJtdW_R4j4wmyf2spxw1XlHiSwMvk",
        authDomain: "vhours-3c992.firebaseapp.com",
        databaseURL: "https://vhours-3c992.firebaseio.com",
        projectId: "vhours-3c992",
        storageBucket: "vhours-3c992.appspot.com",
        messagingSenderId: "937326836465",
        appId: "1:937326836465:web:4e28ce830e17a910578750"
    }
    firebase.initializeApp(config)
    firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
const GoolgeProvider = new firebase.auth.GoogleAuthProvider()
export {fireDb, GoolgeProvider}