const menuItems = document.querySelectorAll(".nav__link-item");
const scrollSpySections = document.querySelectorAll(".section");
const navItem = document.querySelector(".nav");

const handleScrollSpy = () => {
	if (document.body.classList.contains("main-page")) {
		const sections = [];

		scrollSpySections.forEach((section) => {
			if (window.scrollY <= section.offsetTop + (navItem?.offsetHeight || 0)) {
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
