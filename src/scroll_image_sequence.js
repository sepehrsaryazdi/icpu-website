
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


const imageSequenceControl = new ImageSequenceControl(imageSequences)

console.log(imageSequenceControl.imageSequences)


// var _img = document.getElementById('fixed');
var _img = document.getElementById("scrollingImage")

var _sticky = document.getElementById("test")
_sticky.isScrolling = true;


var newImg = new Image;
newImg.src = dogSequenceImages[0];


newImg.onload = function() {
    _img.src = this.src;
}

// console.log(newImg)





window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    // console.log(scroll)
    
    
    if(_img.style.top <= this.scrollY & this.scrollY <= _img.style.top + 10*137){
        _img.style.opacity = 1;
        newImg.src = dogSequenceImages[parseInt(this.scrollY/10)];
        _sticky.classList.add("sticky");
        _sticky.classList.remove("relative");
        _sticky.style.top = 0 + "px";
       
        _sticky.isScrolling = true;
        
        
    } else {
        // setInterval(function () {_img.style.opacity -= 0.1*(_img.style.opacity)}, 1000);
        _img.style.opacity = 0;
        _sticky.classList.remove("sticky");
        _sticky.classList.add("relative");
        if(_sticky.isScrolling) {
            
            console.log(window.innerWidth)
        _sticky.style.top = -0.1*window.innerWidth+ this.scrollY + "px";
        }
        _sticky.isScrolling = false;
    }


    console.log(_img.style.top)

    // _img.style.opacity = 1/(1+this.scrollY);
    // _img.style.top = this.scrollY + "px";
    // _img.style.left = this.scrollX + "px";
});
