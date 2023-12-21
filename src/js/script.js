let burgerBtn,
	nav,
	mobileNav,
	mobileNavItems,
	hiddenElements,
	buttonBars,
	allSections,
	email,
	name,
	message,
	sendBtn,
	agreement,
	popup,
	closeBtn,
	cookieBox,
	cookieBtn;

const prepareDomElements = () => {
	burgerBtn = document.querySelector(".burger-btn");
	nav = document.querySelector(".nav");
	mobileNav = document.querySelector(".mobile-nav");
	mobileNavItems = document.querySelectorAll(".items");
	hiddenElements = document.querySelectorAll(".hidden");
	buttonBars = document.querySelector(".burger-btn__bars");
	allSections = document.querySelectorAll(".section");
	email = document.getElementById("email");
	name = document.getElementById("name");
	message = document.getElementById("msg");
	agreement = document.getElementById("agreement");
	sendBtn = document.querySelector(".submit-btn");
	popup = document.querySelector(".hidden-popup");
	closeBtn = document.querySelector(".close");
	cookieBox = document.querySelector(".cookie-box");
	cookieBtn = document.querySelector(".cookie-btn");
};

const prepareDomEvents = () => {
	cookieBtn.addEventListener("click", cookiesAlert);

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

	window.addEventListener("scroll", sectionObserver);

	document.addEventListener("DOMContentLoaded", () => {
		const addShadow = () => {
			if (window.scrollY >= 400) {
				nav.classList.add("add-background");
			} else {
				nav.classList.remove("add-background");
			}
		};

		window.addEventListener("scroll", addShadow);
	});
};
const navLink = document.querySelectorAll(".nav__link");
navLink.forEach((link) => {
	link.addEventListener("click", () => {
		document.querySelector(".nav-active").classList.remove("nav-active");
		link.classList.add("nav-active");
	});
});

const cookiesAlert = () => {
	localStorage.setItem("cookie", "true");
	cookieBox.classList.add("cookies-sleep");
};

const showCookie = () => {
	const cookieExist = localStorage.getItem("cookie");
	if (cookieExist) {
		cookieBox.classList.add("cookies-sleep");
	}
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
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

function sectionObserver() {
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
}

prepareDomElements();
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove("hidden");
			entry.target.classList.add("show");
		}
	});
});

hiddenElements.forEach((el) => observer.observe(el));
prepareDomEvents();
showCookie();
