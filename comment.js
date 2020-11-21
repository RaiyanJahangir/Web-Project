

//<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBTSSIFdfCffxhdbmRT5rqik2ROLww3snk",
    authDomain: "webproject2-1442a.firebaseapp.com",
    databaseURL: "https://webproject2-1442a.firebaseio.com",
    projectId: "webproject2-1442a",
    storageBucket: "webproject2-1442a.appspot.com",
    messagingSenderId: "349985994666",
    appId: "1:349985994666:web:1724510d75fd469ca5ddd3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//</script>



  // Step 3. Create a Reference to a collection you want to read from or write to 
var messagesRef = firebase.database().ref('messages');

// Step 4. Now, "Listen" for specific event to be done by the user, so that you can call your js function
document.getElementById('contactForm').addEventListener('submit', submitForm);
//document.getElementById('contactForm').addEventListener('submit',submitForm);

// Step 5. Once the user does the event (here, pressing the "submit" button), call the js function where you store/retrive data from your database
function submitForm(e){
  e.preventDefault();

  // Step 5.1 Accesss the HTML fields/elements and get the specific values inside js vars. 
  var name = document.getElementById('name').value; 
  var company = getInputVal('company'); //or you could write a js function instead of calling getElementByID directly (optional)
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');
  //console.log(name);

  // Step 5.2 Call a js function, padd the vars to it. This func will save the values to the cloud database. 
  saveMessage(name, company, email, phone, message);

  // Step 5.3 Give users appropriate message regarding the action (here, "your message has been sent")
  document.querySelector('.alert').style.display = 'block';

  // Step 5.4 After showing the message, redirect/or you other actions as needed. (Here, clear form, hide alert after 3 seconds and redirect to homepage)
  //hiding the alert after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clearing form
  document.getElementById('contactForm').reset();

  //redirecting to home page
  
  setTimeout(function(){
    document.location.href="HomePage.html";
  },3050);
  
  
}

// Function to get form values (optional)
function getInputVal(id){
  return document.getElementById(id).value;
}

// Step 6. Save the values to firebase (the cloud database)
function saveMessage(name, company, email, phone, message){
  //create a new reference in "push" mode for writitng to DB
  var newMessageRef = messagesRef.push();
  //use the set function to write values to firebase DB
  newMessageRef.set({
    //notice the brackets 
    //and the data format "field name (in firebase): variable name"
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}

function showpastcomments(){
  var showat=document.getElementById('pastcomments');
  var commentsRef=firebase.database().ref('messages/');
  commentsRef.once('value',function(snapshot){
    snapshot.forEach(function (itemSnapshot){
      //Get the object for one snapshot
      var itemData=itemSnapshot.val();
      var comment=itemData.message;
      var name=itemData.name;
   if(name==""){
     name="anonymous";
   }
      //var when=new Date(itemData.when).toLocaleDateString("en-us");
      showat.innerHTML+="<li><u>"+name+"</u><br>"+"<span>--"+comment+"</span></li><br>";
    })
  })
  //alert('hello');
}

showpastcomments();

//step 7. Remember to go to Firebase console->your project's page-> realtime database-> rules-> and set both read and write to true (then publish) to allow applications to read from and write to your database. 