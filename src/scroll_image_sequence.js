
const dogSequenceImages = []

for (i= 1; i < 139 ; i++) {
    dogSequenceImages.push(`src/svg_sequence/dog/dog` + `${`${i}`}`.padStart(4, '0') + `.svg`)
}


const isTimeAnimated = []


function showImage(id) {
    console.log(id);
    document.getElementById(id)
    .style.opacity = 1;
}

function gotoDiv(location){

    const html = document.documentElement;
    html.classList.add("scrollSmooth");
    const targetDiv = document.getElementById(location);
    targetDiv.scrollIntoView();
    html.classList.remove("scrollSmooth");
  }
//   gotoDiv();

const divs = document.getElementsByClassName("separateSection")
const imgs = Array(...document.getElementsByClassName("scrollingImage"))

const imageSequences = []
for(i = 0 ; i < divs.length ; i ++){
    imageSequences.push(dogSequenceImages)
    isTimeAnimated.push(false)
}

isTimeAnimated[1] = true;




var imgSources = []


imgs.forEach(function(img, index, arr ){
    var newImg = new Image;
    newImg.onload = function() {
        img.src = newImg.src;
    }
    newImg.src = imageSequences[index][0]
    imgSources.push(newImg)
})



class ImageSequenceControl {
    constructor(imageSequences, divs, imgs, imageStates, isTimeAnimated) {
        this.imageSequences = imageSequences
        this.divs = divs
        this.imgs = imgs
        this.imageStates = imageStates;
        this.isTimeAnimated = isTimeAnimated;
        this.wasTimeAnimated = []
        this.animatingIntervals = []
        this.animatingEquivalentScrolls = []
        // this.initialiseSVGs()
        this.currentDiv = 0
        this.imageEquivalentScroll = 0;
        this.divs[this.currentDiv].classList.add("sticky");
        this.scrollDomain = [0,this.computeNextScrollDomain(divs[0],divs[1])]
        this.originalPositions = []
        for(i = 1 ; i < this.divs.length-1; i ++ ){
            this.scrollDomain.push(this.computeNextScrollDomain(divs[i],divs[i+1]))
        }
        for(i=0 ; i < this.divs.length ; i ++){
            this.originalPositions.push(this.computeDivTopAbsolutePosition(divs[i]))
            this.wasTimeAnimated.push(false)
        }

        

      }
    

    initialiseSVGs() {

        for(i = 0 ; i < this.imgs.length ; i ++ )
        {
            let newImg = new Image;

            // console.log(newImg.onload)
            newImg.onload = function() {
                this.imgs[i].src = this.src;
            }
            newImg.src = this.imageSequences[i][0]

            this.imageStates.push(newImg)
        }

    }

    computeNextScrollDomain(div1, div2) {
        return this.computeDivTopAbsolutePosition(div2)-this.computeDivBottomAbsolutePosition(div1) + this.computeDivTopAbsolutePosition(div1)
    }

    computeDivTopAbsolutePosition(div) {
        return div.getBoundingClientRect().top + window.pageYOffset
    }

    computeDivBottomAbsolutePosition(div) {
        return div.getBoundingClientRect().bottom + window.pageYOffset
    }

    computeDivAbsoluteDifference(div1,div2) {
        return this.computeDivTopAbsolutePosition(div2) - this.computeDivBottomAbsolutePosition(div1)
    }

    computeDivHeight(div) {
        return div.offsetHeight
    }

    onChangedDivBefore(scroll) {
        this.divs[this.currentDiv].classList.remove("sticky");
        this.divs[this.currentDiv].classList.add("relative");

        // this.divs[this.currentDiv].classList.add("relative");
        // this.divs[this.currentDiv].style.top = this.originalPositions[this.currentDiv] + "px";

        
        this.divs[this.currentDiv - 1].classList.add("sticky");
        this.divs[this.currentDiv-1].classList.remove("relative");

        this.divs[this.currentDiv-1].style.top = 0 + "px";
        this.currentDiv -= 1
    }

    onChangedDivAfter(scroll) {
        
        this.divs[this.currentDiv].classList.remove("sticky");
        this.divs[this.currentDiv].classList.add("relative");
        
        this.divs[this.currentDiv + 1].classList.add("sticky");
        this.divs[this.currentDiv+1].classList.remove("relative");
        
        // console.log(this.originalPositions[this.currentDiv])
        this.divs[this.currentDiv].style.top = this.originalPositions[this.currentDiv+1] - this.computeDivHeight(this.divs[this.currentDiv]) - this.originalPositions[this.currentDiv] + "px";
        this.currentDiv += 1
        }
    
    

    updateImageState(index, imageEquivalentScroll, domainLeft, domainRight) {
        this.imageStates[index].src = this.imageSequences[index][parseInt(this.imageSequences[index].length*(imageEquivalentScroll - domainLeft)/(domainRight - domainLeft))]
    }
    
    updateLiveAnimation(index, domainLeft, domainRight, intervalId) {
        
        if(this.animatingEquivalentScrolls[intervalId] >= domainRight) {
            clearTimeout(intervalId)
            return;
        }
        this.updateImageState(index, this.animatingEquivalentScrolls[intervalId], domainLeft, domainRight);
        this.animatingEquivalentScrolls[intervalId] += 1
        
        
    }
    

    updateState(scroll) {
        // console.log(scroll)
        let first_div = this.divs[0]
        




        let domainLeft = this.scrollDomain[this.currentDiv]
        let domainRight = this.scrollDomain[this.currentDiv+1]
         
        if(scroll <= domainRight & scroll >= domainLeft) {
            if(!this.isTimeAnimated[this.currentDiv]) {
            this.updateImageState(this.currentDiv, scroll, domainLeft, domainRight)
            } else {
                if(!this.wasTimeAnimated[this.currentDiv]) {
                    var imageEquivalentScroll = domainLeft;
                    this.animatingEquivalentScrolls.push(imageEquivalentScroll);
                    const currentDivIndex = this.currentDiv;
                    const currentIntervalId = this.animatingIntervals.length;
                    var function_val = () => this.updateLiveAnimation(currentDivIndex, domainLeft, domainLeft + this.imageSequences[currentDivIndex].length, currentIntervalId);
                    this.wasTimeAnimated[this.currentDiv] = true;
                    var newIntervalId = setInterval(function_val,35);
                    this.animatingIntervals.push(newIntervalId)
                    
                }
            }
            // console.log(this.imageStates[this.currentDiv])
        } else {
            if(scroll > domainRight){
                this.onChangedDivAfter(scroll)
            } else if (scroll < domainLeft) {
                this.onChangedDivBefore(scroll)
            }
        }

    
    }


        // console.log(this.computeDivAbsoluteDifference(this.divs[0], this.divs[1]))

    }


    


let initialWidth = window.innerWidth;

let instantiated = false;

let imageSequenceControl = null;


window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;

    if(initialWidth != window.innerWidth) {
        instantiated = false;
        location.reload();

    }

    if(!instantiated) {

        initialWidth = window.innerWidth;


    if(scroll != 0){
        window.scrollTo(0, 0);
    } else {
        instantiated = true;
        imageSequenceControl = new ImageSequenceControl(imageSequences, divs, imgs, imgSources, isTimeAnimated);
    }

    } else {
        
        imageSequenceControl.updateState(scroll)  

    }

})

