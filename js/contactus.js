function showMessage(input, type) {
	// change the color of the textbox
	if(!type){
		
	}

	// update the class for the input
	
	return type;
}

function showError(input) {
	input.style.border = "2px solid red";
	return false;
}

function showSuccess(input) {
	//can add something when success if needed
	return true;
}

function hasValue(input) {
	if (input.value.trim() === "") {
		return showError(input);
	}
	return showSuccess(input);
}

function validateEmail(input) {
	// check if the value is not empty
	if (!hasValue(input)) {
		return showError(input);
	}

	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input);
	}
	return true;
}

function validatePhone(input) {
	// check if the value is not empty
	if (!hasValue(input)) {
		return showError(input);
	}
	// validate phone format
	const phoneRegex =
		/^[0-9]+$/;

	const phone = input.value.trim();
	if (!phoneRegex.test(phone)) {
		return showError(input);
	}
	return true;
}

function resetColor(name){
	//this function will reset the color of the textbox
	console.log(name);
	const textbox = document.querySelector("#"+name);
	textbox.style.border = "1px solid black";
}




const form = document.querySelector("#contactusform");


form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
	let nameValid = hasValue(form.elements["firstname"]);
	let emailValid = validateEmail(form.elements["email"]);
	let phoneValid = validatePhone(form.elements["phone"]);
	// if valid, submit the form.
	if (nameValid && emailValid && phoneValid) {

		//this will save the data into a file locally
		//form.elements["completeformmessage"].innerText = "form submitted"
		const msg = form.querySelector("small");
		msg.innerText = "Form submitted"
	}
});




/*
credit:
https://www.javascripttutorial.net/javascript-dom/javascript-form/ 
https://www.encodedna.com/javascript/how-to-save-form-data-in-a-text-file-using-javascript.html
*/