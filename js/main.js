let menuBtn = document.querySelector(".menu__button");
let nav = document.querySelector("nav");
let body = document.querySelector("body");
let sectionNumbers = document.querySelector(".numbers");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (
        nav.classList.contains("open") &&
        !e.target.classList.contains("nav__list") &&
        !e.target.parentNode.classList.contains("menu__button") &&
        !e.target.classList.contains("menu__button")
    ) {
        nav.classList.remove("open");
        menuBtn.classList.remove("open");
    }
});

function debounce(fn, delay) {
    return (args) => {
        clearTimeout(fn.id);

        fn.id = setTimeout(() => {
            fn.call(this, args);
        }, delay);
    };
}

const startCounter = (element) => {
    const duration = 1500;
    const start = 0;
    const end = parseInt(element.dataset.counter);

    let startTime = Date.now();

    const loop = () => {
        let passedTime = Date.now() - startTime;
        let currentNumber = parseInt(
            start + (passedTime / duration) * (end - start)
        );
        if (currentNumber > end) currentNumber = end;
        element.textContent = currentNumber.toLocaleString();
        if (currentNumber < end) requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
};

let handleScroll = () => {
    let viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
    let isVisible = sectionNumbers.getBoundingClientRect().top - viewHeight < 0;
    if (isVisible) {
        document.removeEventListener("scroll", handleScrollDebounced);
        Array.from(sectionNumbers.children).forEach((item) => {
            startCounter(item.querySelector("span"));
        });
    }
};

let handleScrollDebounced = debounce(handleScroll, 50);
document.addEventListener("scroll", handleScrollDebounced);
handleScroll();
