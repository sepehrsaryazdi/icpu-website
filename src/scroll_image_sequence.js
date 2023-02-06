
const dogSequenceImages = []

for (i= 1; i < 139 ; i++) {
    dogSequenceImages.push(`src/svg_sequence/dog/dog` + `${`${i}`}`.padStart(4, '0') + `.svg`)
}


const imageSequences = [dogSequenceImages, dogSequenceImages, dogSequenceImages]
const divs = document.getElementsByClassName("separateSection")
const imgs = document.getElementsByClassName("scrollingImage")


class ImageSequenceControl {
    constructor(imageSequences, divs, imgs) {
        this.imageSequences = imageSequences
        this.divs = divs
        this.imgs = imgs
      }

    updateState(scroll) {
        console.log(scroll)
        
    }


    
}


const imageSequenceControl = new ImageSequenceControl(imageSequences, divs, imgs);

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    imageSequenceControl.updateState(scroll)  
})