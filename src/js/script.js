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
const socials = document.querySelector(".social-nav");
const cookieBox = document.querySelector(".cookie-box");
const cookieBtn = document.querySelector(".cookie-btn");
const footerYear = document.querySelector(".footer-year");

document.addEventListener("DOMContentLoaded", function () {
	const currentUrl = window.location.href;

	if (currentUrl.includes("#")) {
		const fragment = currentUrl.split("#")[1];
		const targetElement = document.getElementById(fragment);
		console.log(targetElement);

		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	}
});

window.addEventListener("scroll", sectionObserver);

// ACTIVE MOBILE NAV

mobileNavItems.forEach((item) =>
	item.addEventListener("click", () =>
		mobileNav.classList.remove("mobile-nav-active")
	)
);

burgerBtn.addEventListener("click", () => {
	mobileNav.classList.toggle("mobile-nav-active");
});

// menuItems.forEach((link) => {
// 	link.addEventListener("click", () => {
// 		document.querySelector(".nav-active").classList.remove("nav-active");
// 		link.classList.add("nav-active");
// 	});
// });

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
		if (window.scrollY >= 400) {
			nav.classList.add("add-background");
		} else {
			nav.classList.remove("add-background");
		}
	};

	window.addEventListener("scroll", addShadow);
});

// ANIMATION OBSERVER

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove("hidden");
			entry.target.classList.add("show");
		}
	});
});

hiddenElements.forEach((el) => observer.observe(el));

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

accordionBtns.forEach((btn) => btn.addEventListener("click", openAccordion));
window.addEventListener("click", closeAccordionAfterClickOutside);

// SCROLLSPY
// const handleScrollSpy = () => {
// 	if (document.body.classList.contains("main-page")) {
// 		const sections = [];

// 		allSections.forEach((section) => {
// 			let top = window.scrollY;
// 			let offset = section.offsetTop - 100;
// 			let height = section.offsetHeight;
// 			if (top >= offset && top < offset + height) {
// 				sections.push(section);
// 				const activeSection = document.querySelector(
// 					`[href*="${sections[0].id}"]`
// 				);

// 				if (activeSection) {
// 					menuItems.forEach((item) => item.classList.remove("nav-active"));
// 					activeSection.classList.add("nav-active");
// 				} else {
// 					menuItems.forEach((item) => item.classList.remove("nav-active"));
// 					menuItems[0].classList.add("nav-active");
// 				}
// 			}
// 		});
// 	}
// };

// window.addEventListener("scroll", handleScrollSpy);

// COOKIES

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

cookieBtn.addEventListener("click", cookiesAlert);
showCookie();

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
