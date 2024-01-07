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
						const scrollMarginTop = targetId === "aboutme" ? 100 : 30;
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
