import firebase from "firebase/compat/app";

const userApi = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;
        resolve({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }, 1000);
    });
  },
};

export default userApi;
