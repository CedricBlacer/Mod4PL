function validateSigninForm(){
    let email= document.getElementById("emailAddress").value;
	let pwd= document.getElementById("password").value;	
	let letters = /^[A-Za-z]+$/;
	let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(email==''){
        alert('Please enter your Email');
    }

    else if (!filter.test(email)){
        alert('Invalid Email');
    }

    else if(pwd==''){
        alert('Please enter your Password');
    }

    else{	
        signIn();
    }
}


function validateSignupForm(){
    let email= document.getElementById("emailAddress").value;
	let username= document.getElementById("username").value;
	let pwd= document.getElementById("password").value;	
    let pwd_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
	let letters = /^[A-Za-z]+$/;
	let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    
    if(email==''){
        alert('Please enter your Email');
    }

    else if (!filter.test(email)){
        alert('Invalid Email');
    }

    else if(username==''){
        alert('Please enter your Username.');
    }

    else if(!letters.test(username)){
        alert('Username field required only alphabet characters');
    }
    
    else if(pwd==''){
        alert('Please enter your Password');
    }
    else if(document.getElementById("password").value.length < 6){
        alert ('Password minimum length is 6');
    }
    else if(document.getElementById("password").value.length > 10){
        alert ('Password max length is 12');
    }
    else{	
        signUp();
    }
}

// FOR SIGN AND SIGN UP USERS

let objUsers = JSON.parse(localStorage.getItem("Email")) || [
    {
        email: "asd@gmail.com", password: "123"
    },
    {
        email: "asd2@gmail.com", password: "124"
    },

] 


function signIn(){
    var email = document.getElementById('emailAddress').value
	var password = document.getElementById('password').value

    for(var i = 0; i < objUsers.length; i++) {
		// check is user input matches email and password of a current index of the objUsers array
		if(email == objUsers[i].email && password == objUsers[i].password) {
			alert(email + " is Signed in! Redirecting to Home Page ")
            window.location.href="/"
			// stop the function if this is found to be true
			return
		}
	}
    alert("Incorrect Email or Password Please Try Again.")
}


function signUp() {
	// store new users email
	var registerEmail = document.getElementById('emailAddress').value
	// store new users password
	var registerPassword = document.getElementById('password').value
	// store new user data in an object
	var newUser = {
		email: registerEmail,
		password: registerPassword
	}

	// loop throught people array to see if the email is taken
	for(var i = 0; i < objUsers.length; i++) {
		// check if new email is equal to any already created emails
		if(registerEmail == objUsers[i].email) {
			// alert user that the email is taken
			alert('That email is already taken, please choose another')
			// stop the statement if result is found true
			return
		// check if new password is 8 characters or more
		} 
	}
	// push new object to the objUsers array
	objUsers.push(newUser)
	// console the updated objUsers array
	console.log(objUsers)

    localStorage.setItem("Email", JSON.stringify(objUsers))

    window.location.href="/CreateAccount"

}
