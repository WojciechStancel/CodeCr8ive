const allSections = document.querySelectorAll(".section");
const menuItems = document.querySelectorAll(".nav__link-item");

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
					menuItems[0].classList.add("nav-active");
				}
			}
		});
	}
};

window.addEventListener("scroll", handleScrollSpy);