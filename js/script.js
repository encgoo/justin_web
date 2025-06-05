// query all the elements
const leftBtn = document.querySelector(".slide-left");
const rightBtn = document.querySelector(".slide-right");
const slides = document.querySelectorAll(".slide");
const dotbtns = document.querySelectorAll(".dot-btn");

let cur = 0;
leftBtn.disabled = true;

function deactiveDotBtns() {
    dotbtns.forEach((btn) => {
        btn.classList.remove("active");
    });
}

function updateSlice() {
    slides.forEach((slide, idx) => {
        const delta = idx - cur;
        const percentage = String(delta) + "00%";
        slide.style.transform = `translateX(${percentage})`;
    });
}


function dotBtnOnClick(e) {
    leftBtn.disabled = false;
    rightBtn.disabled = false;
    cur = Number(e.target.id.slice(-1))-1;

    if (cur == 0) {
        leftBtn.disabled = true;
    } else if (cur == 6) {
        rightBtn.disabled = true;
    }
    deactiveDotBtns();
    e.target.classList.add("active");
    updateSlice();
}
dotbtns.forEach((btn) => {
    btn.addEventListener("click", dotBtnOnClick);
});

leftBtn.addEventListener("click", function (e) {
    cur--;
    rightBtn.disabled = false;
    deactiveDotBtns();
    dotbtns[cur].classList.add("active");

    if (cur == 0) {
        leftBtn.disabled = true;
    }
    updateSlice();
});

rightBtn.addEventListener("click", function (_) {
    cur++;
    leftBtn.disabled = false;
    if (cur == 6) {
        rightBtn.disabled = true;
    }
    deactiveDotBtns();
    dotbtns[cur].classList.add("active");
    updateSlice();
});
