const email = document.getElementById("email");
const name = document.getElementById("name");
const message = document.getElementById("msg");
const sendBtn = document.querySelector(".submit-btn");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close");

sendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    checkForm();
    checkEmail(email);
    countErrors();
});

closeBtn.addEventListener("click", () => {
    popup.classList.remove("show-popup");
});

// Email validation
const showError = (input, info) => {
	const formBox = input.parentElement;
	const errorText = formBox.querySelector(".error-text");
	formBox.classList.add("error");
	errorText.textContent = info;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkForm = () => {
	[name, email, message].forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "E-mail jest niepoprawny");
	}
};

const countErrors = () => {
	const allBoxes = document.querySelectorAll(".contact-box");
	let errorCount = 0;

	allBoxes.forEach((el) => {
		if (el.classList.contains("error")) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};