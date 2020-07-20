//preloader
function hideLoader() {
  document.querySelector(".loader").style.display="none";
};

function fade(callback) {
  document.querySelector(".loader").style.opacity="0";
  setTimeout(callback,1000);
}

window.onload=setTimeout(fade,3000,hideLoader);

//mobile menu and search-box
var menu=document.querySelector(".header__menu");
var body=document.getElementsByTagName("body")[0];
var headerTop=document.querySelector(".header__top");
var menuButton=document.querySelector(".menu__button");
var menuSearchButton=document.querySelector(".menu__search-button");
var searchBar=document.querySelector(".menu__search-bar");

menuSearchButton.addEventListener("click",function(){
  menuSearchButton.classList.toggle("open");
  searchBar.classList.toggle("search-bar-appear");
})

menuButton.addEventListener("click",function(){
  menuButton.classList.toggle("open");
  menu.classList.toggle("appear");
  body.classList.toggle("no-scroll");
})
//scroll down hide menu
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {scrollFunction()}; 

function scrollFunction() {
  if (window.pageYOffset > 105) {
    headerTop.classList.add("black-bg");
    headerTop.classList.add("shrink-top");
  } else {
    headerTop.classList.remove("black-bg")
    headerTop.classList.remove("shrink-top");
  }

  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos>prevScrollpos && prevScrollpos>300) {
    headerTop.style.top = "-105px";
  } else {
    headerTop.style.top = "0";
  }
  prevScrollpos = currentScrollPos;
  
  if(document.body.scrollTop>120 || document.documentElement.scrollTop>120) {
    this.scrollButton.style.display="block";
  }
  else this.scrollButton.style.display="none";
}

//click out of menu mobile, hide menu
window.addEventListener("click",function(event){
  if(!event.target.classList.contains("header__menu") && menu.classList.contains("appear") 
  && !event.target.classList.contains("menu__button") && !event.target.parentNode.classList.contains("menu__button")) {
    menu.classList.toggle("appear");
    menuButton.classList.toggle("open");
    body.classList.toggle("no-scroll");
  }
})

//slide
var slideNodeList=document.getElementsByClassName("categories__item");
var slide=document.querySelector(".categories__inner");

var index=0;
var left=0;
var biggestIndex=0;
var step=0;

var firstWindowWidth=window.innerWidth;
if(firstWindowWidth<=480) {
  biggestIndex=slideNodeList.length-1;
  step=100;
}
else if(firstWindowWidth<=768) {
  biggestIndex=slideNodeList.length-2;
  step=52;
}
else if(firstWindowWidth<=1200) {
  biggestIndex=slideNodeList.length-3;
  step=34;
}
else {
  biggestIndex=slideNodeList.length-5;
  step=20.3125;
}

window.addEventListener("resize",function(){
  var windowWidth=window.innerWidth;
  if(windowWidth<=480) {
    step=100;
    biggestIndex=slideNodeList.length-1;
  }
  else if(windowWidth<=768) {
    step=52;
    biggestIndex=slideNodeList.length-2;
  }
  else if(windowWidth<=1200) {
    step=34;
    biggestIndex=slideNodeList.length-3;
  }
  else {
    step=20.3125;
    biggestIndex=slideNodeList.length-5;
  }
  if(index>biggestIndex) {
    index=biggestIndex;
  }
  left=-index*step;
  let y=left+"%";
  slide.style.left=y;
})

function plusSlides(n){
  if(index+n<=biggestIndex && index+n>=0) {
    let x=left-step*n;
    let y=x+"%";
    slide.style.left=y;
    left-=step*n;
    index+=n;
  }
  else if(index+n>biggestIndex) {
    index=0;
    left=0;
    slide.style.left="0";
  }
  else {
    index=biggestIndex;
    left=biggestIndex*-step;
    let y=left+"%";
    slide.style.left=y;
  }
}

//swipe

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var gesuredZone = document.querySelector('.categories');

gesuredZone.addEventListener('touchstart', function(event) {
  touchstartX = event.changedTouches[0].clientX;
  touchstartY = event.changedTouches[0].clientY;
});

gesuredZone.addEventListener('touchend', function(event) {
  touchendX=event.changedTouches[0].clientX;
  touchendY=event.changedTouches[0].clientY;
  handleGesureForTouchScreen();
}); 

gesuredZone.addEventListener('mousedown', function(event) {
  touchstartX = event.clientX;
  touchstartY = event.clientY;
});

gesuredZone.addEventListener('mouseup', function(event) {
  touchendX = event.clientX;
  touchendY = event.clientY;
  handleGesureForBigScreen();
});

function handleGesureForBigScreen() {
  if(touchendX-touchstartX>40) plusSlides(-1);
  else if(touchstartX-touchendX>40) plusSlides(1);
  else return;
}

function handleGesureForTouchScreen() {
  if(touchendX-touchstartX>30 && Math.abs(touchstartY-touchendY)<=40) plusSlides(-1);
  else if(touchstartX-touchendX>30 && Math.abs(touchstartY-touchendY)<=40) plusSlides(1);
  else return;
}

//scroll to top
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var scrollButton = document.querySelector(".scroll-to-top");
scrollButton.addEventListener("click",scrollToTop);

