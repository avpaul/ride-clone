import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../../env";

class FirebaseService {
  constructor() {
    this.initializeApp();
    this.database = firebase.firestore();
  }

  initializeApp() {
    try {
      firebase.initializeApp(firebaseConfig.staging);
    } catch (e) {
      console.log(e);
    }
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          return resolve(user);
        }
        return reject(false);
      });
    });
  }

  async signOut() {
    try {
      return Promise.resolve(firebase.auth().signOut());
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async addDocument(document, collection) {
    try {
      const result = await this.database.collection(collection).add(document);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteDocument(collection, key) {
    try {
      await this.database
        .collection(collection)
        .doc(key)
        .delete();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getCollection(collection, { field, sign, value } = {}, page = 1000) {
    let snapshot;

    try {
      if (field && sign && value) {
        snapshot = await this.database
          .collection(collection)
          .where(field, sign, value)
          .limit(page)
          .get();
      } else {
        snapshot = await db
          .collection(collection)
          .limit(page)
          .get();
      }

      const result = [];
      snapshot.forEach(doc => result.push({ ...doc.data(), key: doc.id }));

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default firebaseService = new FirebaseService();
