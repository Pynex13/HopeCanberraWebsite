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

		// put message "Form submitted"
		const msg = form.querySelector("small");
		msg.innerText = "Form submitted";



		//reset the form
		let firstnamedata = form.elements["firstname"].value;
		let lastnamedata = form.elements["lastname"].value;
		let emaildata = form.elements["email"].value;
		let phonedata = form.elements["phone"].value;
		let messagedata = form.elements["message"].value;

		form.elements["firstname"].value = "";
		form.elements["lastname"].value = "";
		form.elements["email"].value = "";
		form.elements["phone"].value = "";
		form.elements["message"].value = "";

		//call the AWS api that saves into the dynamoDB

		async function postRequest() {

			const d = new Date();
			let randomID = Date.now() + Math.floor(Math.random()*1000);
			let contactID = randomID.toString();
			let dateID = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

			let url = "https://4ybr917jch.execute-api.ap-southeast-2.amazonaws.com/prod/contact/"
			let data = {
				'firstName': firstnamedata, 
				'lastName': lastnamedata,
				'emailAddress': emaildata,
				'phone': phonedata,
				'message': messagedata,
				'contactID' : contactID,
				'creationDate' : dateID
			};
			
			console.log(data);

			let res = await fetch(url, {
				mode : 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
	
			if (res.ok) {
				
				//response is blank, might add in the api
				return "successful"
	
			} else {
				return `HTTP error: ${res.status}`;
			}
		}
	
		postRequest().then(data => {
			console.log(data);
		});

	}
});




/*
credit:
https://www.javascripttutorial.net/javascript-dom/javascript-form/ 
https://www.encodedna.com/javascript/how-to-save-form-data-in-a-text-file-using-javascript.html
*/