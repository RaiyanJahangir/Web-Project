


///<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD32hA6NWuRx-cUE0tf-Pi0-o1eCq0kqLU",
    authDomain: "webproject-5db27.firebaseapp.com",
    databaseURL: "https://webproject-5db27.firebaseio.com",
    projectId: "webproject-5db27",
    storageBucket: "webproject-5db27.appspot.com",
    messagingSenderId: "506757495774",
    appId: "1:506757495774:web:cc12387003bfa020affb4f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//</script>
  const auth=firebase.auth();

  function signup(){
      var email=document.getElementById("email");
      var password=document.getElementById("password");
      const promise=auth.createUserWithEmailAndPassword(email.value,password.value);
      promise.catch(e=>alert(e.message));
      alert("Sign Up Successful");
      window.location.replace("index.html");
  }

  function signIn(){
    var email=document.getElementById("email");
    var password=document.getElementById("password");
    const promise=auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
    //alert("Signed In "+email.value);

    //Take user to a different page
}

function signOut(){
    auth.signOut();
    //alert("Signed Out");
}


const loggedInLinks=document.querySelectorAll('.login');
const loggedOutLinks=document.querySelectorAll('.logout');

const setupUI=(user)=>{
  if(user){
    //toggle UI elements
    //alert('hello');
    loggedInLinks.forEach(item=>item.style.display='block');
    loggedOutLinks.forEach(item=>item.style.display='none');
    //loggedInLinks.style.display='none';
    //loggedOutLinks.style.display='block';
  }
  else{
    //alert('hello2');
    loggedInLinks.forEach(item=>item.style.display='none');
    loggedOutLinks.forEach(item=>item.style.display='block');
    //loggedInLinks.style.display='block';
    //loggedOutLinks.style.display='none';
  }
}

auth.onAuthStateChanged(function(user){
  console.log(user);
    if(user){
        //is signed in
        var email=user.email;
        //alert(" Active User "+email);
        
        //setupUI(user);
        //window.location.replace("HomePage.html");
    }
    else{
       
        //alert("No Active User");
        //setupUI();
        //no user is signed in
    }
});
//</script>