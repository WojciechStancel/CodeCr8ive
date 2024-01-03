const allSections = document.querySelectorAll(".section");
const menuItems = document.querySelectorAll(".nav__link-item");

// SCROLLSPY



document.addEventListener("DOMContentLoaded", function () {
	const currentUrl = window.location.href;

	if (currentUrl.includes("#")) {
		const fragment = currentUrl.split("#")[1];
		const targetElement = document.getElementById(fragment);


		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	}
});