// query all the elements
const leftBtn = document.querySelector('.slide-left');
const rightBtn = document.querySelector('.slide-right');
const slides = document.querySelectorAll('.slide');


const positions = ["-200%", "-100%", "0%", "100%", "200%"];
let curFirstPos = 2;


leftBtn.addEventListener('click', function(e) {
    if (curFirstPos > 0) {
        curFirstPos --;
    }
    slides.forEach((slide,idx) => {
        if (slide.id == "slide-1") {
            slide.style.transform = 'translateX(-200%)';
        } else if (slide.id == "slide-2") {
            slide.style.transform = 'translateX(-100%)';
        } else {
            slide.style.transform = 'translateX(0%)';
        }
    });
});

rightBtn.addEventListener('click', function(_) {
    if (curFirstPos < 2) {
        curFirstPos ++;
    }
    slides.forEach(slide => {
        if (slide.id == "slide-1") {
            slide.style.transform = 'translateX(-100%)';
        } else if (slide.id == "slide-2") {
            slide.style.transform = 'translateX(0%)';
        } else {
            slide.style.transform = 'translateX(100%)';
        }
    });
})