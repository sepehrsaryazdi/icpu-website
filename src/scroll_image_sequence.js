
const dogSequenceImages = []

for (i= 1; i < 139 ; i++) {
    dogSequenceImages.push(`src/svg_sequence/dog/dog` + `${`${i}`}`.padStart(4, '0') + `.svg`)
}

// console.log(dogSequenceImages)

// console.log(dogSequenceImages)

const imageSequences = [dogSequenceImages]



class ImageSequenceControl {
    constructor(imageSequences) {
        this.imageSequences = imageSequences
      }
}


// var _img = document.getElementById('fixed');
var _img = document.getElementById("fixedDiv")


var newImg = new Image;
newImg.src = dogSequenceImages[0];


newImg.onload = function() {
    _img.src = this.src;
}

// console.log(newImg)





window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    // console.log(scroll)
    
    if(0 <= this.scrollY & this.scrollY <= 10*137){
        _img.style.opacity = 1;
        newImg.src = dogSequenceImages[parseInt(this.scrollY/10)];
    } else {
        setInterval(function () {_img.style.opacity -= 0.1*(_img.style.opacity)}, 1000);
        _img.style.opacity = 0;
    }
    

    // _img.style.opacity = 1/(1+this.scrollY);
    // _img.style.top = this.scrollY + "px";
    // _img.style.left = this.scrollX + "px";
});
