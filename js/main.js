let menuBtn = document.querySelector(".menu__button");
let nav = document.querySelector("nav");
let body = document.querySelector("body");

menuBtn.addEventListener("click", () => {
    console.log("!");
    nav.classList.toggle("open");
    menuBtn.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    console.log(e.target);
    if (
        nav.classList.contains("open") &&
        !e.target.classList.contains("nav__list") &&
        !e.target.parentNode.classList.contains("menu__button") &&
        !e.target.classList.contains("menu__button")
    ) {
        console.log("2");
        nav.classList.remove("open");
        menuBtn.classList.remove("open");
    }
});
