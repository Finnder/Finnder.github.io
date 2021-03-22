const firebaseConfig = {
    apiKey: "AIzaSyBoTggH61t9VpijhJqcfeLBFcvl5VjiwDs",
    authDomain: "websitedata-49907.firebaseapp.com",
    databaseURL: "https://websitedata-49907.firebaseio.com",
    projectId: "websitedata-49907",
    storageBucket: "websitedata-49907.appspot.com",
    messagingSenderId: "591836715571",
    appId: "1:591836715571:web:7ed85ab8bad3c1656be146",
    measurementId: "G-P681EBT0NK"
  };

  document.addEventListener("DOMContentLoaded", event => {
      const app = firebase.app();
  });

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Init Variables
  const auth = firebase.auth();
  const db = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();

  // Variables - For Firestore
  let userInfo;
  let unsubscribe;

  // -- INPUT WEB REFERENCES
  const txtcreateUserEmail = document.getElementById("signinInputemail");
  const txtcreateUserPass = document.getElementById("signinInputpassword");
  const txtuserEmail = document.getElementById("loginInputemail");
  const txtuserPass = document.getElementById("loginInputpassword");
  const userAgeInput = document.getElementById('ageInput');
  const userNicknameInput = document.getElementById('nicknameInput');
  const userBirthdayInput = document.getElementById('birthdayInput');
  const userFavAnimalInput = document.getElementById('favAnimalInput');

    // -- TEXT WEB REFERENCES --
  const welcomeUser = document.getElementById("userEmailID");
  const userID = document.getElementById("userUID");
  const errors_signup = document.getElementById("errors_signup");
  const errors_login = document.getElementById("errors_login");

  // -- BUTTON WEB REFERENCES --
  const confirmButton = document.getElementById('confirmButton');

  //When user hits confirm-signup button
  function createUser() {
    let userEmail = txtcreateUserEmail.value;
    let userPass  = txtcreateUserPass.value;

    auth.createUserWithEmailAndPassword(userEmail, userPass);
    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        window.location.replace("welcomepage.html");
      }
      else {
        errors_signup.innerHTML = "Issue With Creating User";
        console.log("Sign In FAILED");
      }
    });
  }

  // When User Log-In
  function loginUser(){
    let userEmailLOGIN = txtuserEmail.value;
    let userPassLOGIN  = txtuserPass.value;

    auth.signInWithEmailAndPassword(userEmailLOGIN, userPassLOGIN);
    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        window.location.replace("welcomepage.html");
      }
      else{
        console.log("Log In FAILED");
        errors_login.innerHTML = "Issue With Log-In";
      }
    });
  }

  // When user hits Sign In From Google
  function googleUserLogin(){
    auth.signInWithPopup(provider);
  }

  // When user hits sign out button
  function SignOutUser(){
    auth.signOut();
    console.log(auth.currentUser.email + " Signed Out...");
    window.location.replace("index.html");
  }

  // When User Log's In
  auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log("User Logged In");
      welcomeUser.innerHTML = `User Email: ${firebaseUser.email}`;
      userID.innerHTML = `User ID: ${firebaseUser.uid}`;

      //FIREBASE - Message to Admin
      userInfo = db.collection('UserInformation');
      confirmButton.onclick = () => {
        const { serverTimestamp } = firebase.firestore.FieldValue;

        if(userFavAnimalInput.value != ""){
          userInfo.add({
            UserID: firebaseUser.uid,
            CreatedAt: serverTimestamp(),
            Email: firebaseUser.email,
            Age: userAgeInput.value,
            Nickname: userNicknameInput.value,
            Birthday: userBirthdayInput.value,
            Favorite_Animal: userFavAnimalInput.value,
            Extra_Info_Entered: true
          })
        }

      userAgeInput.value = "";
      userBirthdayInput.value = "";
      userNicknameInput.value = "";
      userFavAnimalInput.value = "";
      document.getElementById('personlization-section').style.display = "none";
      }

      optoutButton.onclick = () => {document.getElementById('personlization-section').style.display = "none";}
    }
      else{
        console.log("Not Logged In");
      }
    });
