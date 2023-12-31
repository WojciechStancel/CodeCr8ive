const burgerBtn = document.querySelector(".burger-btn");
const nav = document.querySelector(".nav");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavItems = document.querySelectorAll(".items");
const hiddenElements = document.querySelectorAll(".hidden");
const buttonBars = document.querySelector(".burger-btn__bars");
const allSections = document.querySelectorAll(".section");
const accordion = document.querySelector(".accordion");
const accordionBtns = document.querySelectorAll(".accordion-btn");

mobileNavItems.forEach((item) =>
	item.addEventListener("click", () =>
		mobileNav.classList.remove("mobile-nav-active")
	)
);

burgerBtn.addEventListener("click", () => {
	mobileNav.classList.toggle("mobile-nav-active");
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

const navLink = document.querySelectorAll(".nav__link-item");
navLink.forEach((link) => {
	link.addEventListener("click", () => {
		document.querySelector(".nav-active").classList.remove("nav-active");
		link.classList.add("nav-active");
	});
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

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove("hidden");
			entry.target.classList.add("show");
		}
	});
});

hiddenElements.forEach((el) => observer.observe(el));

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
		e.target.classList.contains("accordion-btn") ||
		e.target.classList.contains("accordion-info") ||
		e.target.classList.contains("accordion-info-text")
	) {
		return;
	}
	closeAccordion();
};

accordionBtns.forEach((btn) => btn.addEventListener("click", openAccordion));
window.addEventListener("click", closeAccordionAfterClickOutside);
