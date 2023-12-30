const cookieBox = document.querySelector(".cookie-box");
const cookieBtn = document.querySelector(".cookie-btn");

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