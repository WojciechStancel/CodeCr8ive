const burgerBtn = document.querySelector(".burger-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavItems = document.querySelectorAll(".items");
const hiddenElements = document.querySelectorAll(".hidden");
const buttonBars = document.querySelector(".burger-btn__bars");
const allSections = document.querySelectorAll(".section");

// Email variables
const email = document.getElementById("email");
const name = document.getElementById("name");
const message = document.getElementById("msg");
const agreement = document.getElementById("agreement");
const sendBtn = document.querySelector(".submit-btn");
const popup = document.querySelector(".hidden-popup");
const closeBtn = document.querySelector(".close");
// Email Send
const sendMail = () => {
	const params = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		msg: document.getElementById("msg").value,
	};
	const serviceId = "service_rxqgqje";
	const templateId = "template_9t6ajir";

	emailjs
		.send(serviceId, templateId, params)
		.then((res) => {
			document.getElementById("name").value = "";
			document.getElementById("email").value = "";
			document.getElementById("msg").value = "";
		})
		.catch((err) => console.log(err));
};

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

	if (!agreement.checked) {
		agreement.parentElement.classList.add("error");
	} else {
		agreement.parentElement.classList.remove("error");
	}
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
			console.log(errorCount);
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
		sendMail();
	}
};

// Uruchamianie Animacji

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove("hidden");
			entry.target.classList.add("show");
		}
	});
});

hiddenElements.forEach((el) => observer.observe(el));

const sectionObserver = () => {
	const currentSection = window.scrollY;
	allSections.forEach((sect) => {
		if (
			sect.classList.contains("black-btn") &&
			sect.offsetTop <= currentSection + 60
		) {
			buttonBars.classList.add("black-bars-color");
		} else if (
			!sect.classList.contains("black-btn") &&
			sect.offsetTop <= currentSection + 60
		) {
			buttonBars.classList.remove("black-bars-color");
		}
	});
};

// Listenery

window.addEventListener("scroll", sectionObserver);

document.addEventListener("DOMContentLoaded", () => {
	const nav = document.querySelector(".nav");

	const addShadow = () => {
		if (window.scrollY >= 400) {
			nav.classList.add("add-background");
		} else {
			nav.classList.remove("add-background");
		}
	};

	window.addEventListener("scroll", addShadow);
});

mobileNavItems.forEach((item) =>
	item.addEventListener("click", () =>
		mobileNav.classList.remove("mobile-nav-active")
	)
);

burgerBtn.addEventListener("click", () => {
	mobileNav.classList.toggle("mobile-nav-active");
});

sendBtn.addEventListener("click", (e) => {
	e.preventDefault();

	checkForm();
	checkEmail(email);
	countErrors();
});

closeBtn.addEventListener("click", () => {
	popup.classList.remove("show-popup");
});
