const controlButtons = document.querySelectorAll(".control-btn")
const previousBtn = document.querySelector(".previous-btn")
const nextBtn = document.querySelector(".next-btn")
const closeLightBox = document.querySelector('.closeLightBox')

export function displayLightBox(src, title) {
    const lightBox = document.querySelector(".lightBox");
	lightBox.style.display = "block";

}

export function handleCloseLightBox() {
    const lightBox = document.querySelector(".lightBox");
    lightBox.style.display = "none";
}
