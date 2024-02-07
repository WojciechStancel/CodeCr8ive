const burgerBtn = document.querySelector(".burger-btn");
const nav = document.querySelector(".nav");
const menuItems = document.querySelectorAll(".nav__link-item");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavItems = document.querySelectorAll(".items");
const hiddenElements = document.querySelectorAll(".hidden");
const buttonBars = document.querySelector(".burger-btn__bars");
const allSections = document.querySelectorAll(".section");
const accordion = document.querySelector(".accordion");
const accordionBtns = document.querySelectorAll(".accordion-btn");
const footerYear = document.querySelector(".footer-year");
const animation = document.querySelectorAll(".slideIn");
const showAnimation = document.querySelectorAll(".showElement");
const gallery = document.querySelectorAll(".image-container img");
const galleryPopup = document.querySelector(".popup-image");
const galleryPopupImg = document.querySelector(".popupPhoto");
const closePopup = document.querySelector(".popupPhotoClose");
const email = document.getElementById("email");
const nameUser = document.getElementById("name");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const msg = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const popup = document.querySelector(".form-popup");
const popupBtn = document.querySelector(".popup-btn");

// ACTIVE MOBILE NAV
mobileNavItems.forEach((item) =>
	item.addEventListener("click", () =>
		mobileNav.classList.remove("mobile-nav-active")
	)
);

burgerBtn.addEventListener("click", () => {
	mobileNav.classList.toggle("mobile-nav-active");
});

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

// ADD BACKGROUND TO NAV
document.addEventListener("DOMContentLoaded", () => {
	const addShadow = () => {
		if (window.scrollY >= 50) {
			nav.classList.add("add-background");
		} else {
			nav.classList.remove("add-background");
		}
	};

	window.addEventListener("scroll", addShadow);
});

// ACCORDION
function openAccordion() {
	const accordionInfo = this.nextElementSibling;

	if (accordionInfo.classList.contains("active-accordion")) {
		accordionInfo.classList.remove("active-accordion");
		rotateIcon(this, 0);
	} else {
		closeAccordion();
		accordionInfo.classList.add("active-accordion");
		rotateIcon(this, 180);
	}
}
function rotateIcon(button, angle) {
	const icon = button.querySelector(".accordion-btn-icon");
	if (icon) {
		icon.style.transform = `rotate(${angle}deg)`;
	}
}
const closeAccordion = () => {
	const allActiveItems = document.querySelectorAll(".accordion-info");
	allActiveItems.forEach((item) => {
		item.classList.remove("active-accordion");
		rotateIcon(item.previousElementSibling, 0);
	});
};
const closeAccordionAfterClickOutside = (e) => {
	if (
		e.target.classList.contains("accordion-btn-drop") ||
		e.target.classList.contains("accordion-info") ||
		e.target.classList.contains("accordion-info-text")
	) {
		return;
	}
	closeAccordion();
};

// EMAIL VALIDATION
if (submitBtn) {
	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		validateInputs();
		countErrors();
	});

	popupBtn.addEventListener("click", () => {
		popup.classList.remove("show-popup");
	});
}

const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
	const userNameValue = nameUser.value.trim();
	const emailValue = email.value.trim();
	const phoneValue = phone.value.trim();
	const msgValue = msg.value.trim();

	if (userNameValue === "") {
		setError(nameUser, "Podaj Imię!");
	} else {
		setSuccess(nameUser);
	}

	if (emailValue === "") {
		setError(email, "Podaj Email!");
	} else if (!isValidEmail(emailValue)) {
		setError(email, "Email jest nieprawidłowy!");
	} else {
		setSuccess(email);
	}

	if (subject.value === "" || subject.value === "Wybierz temat:") {
		setError(subject, "Wybierz temat wiadomości!");
	} else {
		setSuccess(subject);
	}

	if (msgValue === "") {
		setError(msg, "Wpisz wiadomość!");
	} else {
		setSuccess(msg);
	}

	if (phoneValue === "") {
		setSuccess(phone);
	} else {
		setSuccess(phone);
	}
};

const countErrors = () => {
	const allErrors = document.querySelectorAll(".error");
	let errorCount = 0;

	allErrors.forEach((el) => {
		if (el.innerText !== "") {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

// FOOTER YEAR
const currentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};
currentYear();

// REMOVE ORPHANS
Array.prototype.forEach.call(
	document.querySelectorAll("[data-remove-orphans]"),
	function (el, i) {
		let string = el.innerHTML;
		el.innerHTML = string.replace(/(\s)([\S]{1,2})[\s]+/g, "$1$2&nbsp;");
	}
);

// SCROLLSPY
const handleScrollSpy = () => {
	if (document.body.classList.contains("main-page")) {
		const sections = [];

		allSections.forEach((section) => {
			let top = window.scrollY;
			let offset = section.offsetTop - 100;
			let height = section.offsetHeight;
			if (top >= offset && top < offset + height) {
				sections.push(section);
				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				);

				if (activeSection) {
					menuItems.forEach((item) => item.classList.remove("nav-active"));
					activeSection.classList.add("nav-active");
				} else {
					menuItems.forEach((item) => item.classList.remove("nav-active"));
					// menuItems[0].classList.add("nav-active");
				}
			}
		});
	}
};

// ANIMATION

window.onscroll = () => {
	animation.forEach((anim) => {
		let top = window.scrollY;
		let offset;

		if (window.innerWidth < 1300) {
			offset = anim.offsetTop - 500;
		} else if (window.innerWidth >= 1300) {
			offset = anim.offsetTop - 600;
		}

		let height = anim.offsetHeight;

		if (top >= offset && top < offset + height) {
			anim.classList.add("slide");
		}
	});

	showAnimation.forEach((anim) => {
		let top = window.scrollY;
		let offset;

		if (window.innerWidth < 1300) {
			offset = anim.offsetTop - 500;
		} else if (window.innerWidth >= 1300) {
			offset = anim.offsetTop - 600;
		}

		let height = anim.offsetHeight;

		if (top >= offset && top < offset + height) {
			anim.classList.add("show");
		}
	});
};

// GALLERY

const closeGalleryPopup = (e) => {
	if (!e.target.classList.contains("show-popup-gallery")) {
		return;
	} else {
		galleryPopup.classList.remove("show-popup-gallery");
	}
};

gallery.forEach((image) => {
	image.addEventListener("click", () => {
		galleryPopup.classList.add("show-popup-gallery");
		galleryPopupImg.src = image.getAttribute("src");
	});
});

if (closePopup) {
	closePopup.addEventListener("click", () => {
		galleryPopup.classList.remove("show-popup-gallery");
	});
}

document.addEventListener("DOMContentLoaded", function () {
	const isIndexPage = window.location.pathname === "/index.html" || "/";

	if (isIndexPage) {
		const links = document.querySelectorAll(".smooth-scroll a");

		links.forEach((link) => {
			link.addEventListener("click", function (e) {
				const href = this.getAttribute("href");

				if (href.includes("#")) {
					const targetId = href.split("#")[1];
					const targetElement = document.getElementById(targetId);
					if (targetElement) {
						e.preventDefault();

						history.pushState(null, null, `#${targetId}`);
						const scrollMarginTop = targetId === "aboutme" ? 100 : 85;
						window.scrollTo({
							top: targetElement.offsetTop - scrollMarginTop,
							behavior: "smooth",
						});
					}
				}
			});
		});
	}
});

window.addEventListener("click", closeGalleryPopup);
window.addEventListener("scroll", handleScrollSpy);
window.addEventListener("scroll", sectionObserver);
window.addEventListener("click", closeAccordionAfterClickOutside);
accordionBtns.forEach((btn) => btn.addEventListener("click", openAccordion));
