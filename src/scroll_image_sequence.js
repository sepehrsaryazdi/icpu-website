
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
        this.currentDiv = 0
        this.divs[this.currentDiv].classList.add("sticky");
        this.scrollDomain = [0,this.computeNextScrollDomain(divs[0],divs[1])]
        this.originalPositions = []
        for(i = 1 ; i < this.divs.length-1 ; i ++ ){
            this.scrollDomain.push(this.computeNextScrollDomain(divs[i],divs[i+1]))
        }
        for(i=0 ; i < this.divs.length ; i ++){
            this.originalPositions.push(this.computeDivTopAbsolutePosition(divs[i]))
        }

        console.log(this.originalPositions)

        

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
    
    
    

    updateState(scroll) {
        // console.log(scroll)
        let first_div = this.divs[0]
        // console.log(first_div.offsetHeight)
        // console.log(scroll)
        // console.log(this.computeDivTopAbsolutePosition(first_div) - this.computeDivBottomAbsolutePosition(first_div));
        // console.log(this.computeDivHeight(first_div))
        // console.log(this.scrollDomain)
        
        console.log(this.currentDiv)

        let domainLeft = this.scrollDomain[this.currentDiv]
        let domainRight = this.scrollDomain[this.currentDiv+1]

        if(scroll <= domainRight & scroll >= domainLeft) {

        } else {
            if(scroll > domainRight){
                this.onChangedDivAfter(scroll)
            } else if (scroll < domainLeft) {
                this.onChangedDivBefore(scroll)
            }
        }


        // console.log(this.computeDivAbsoluteDifference(this.divs[0], this.divs[1]))

    }


    
}


const imageSequenceControl = new ImageSequenceControl(imageSequences, divs, imgs);

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    imageSequenceControl.updateState(scroll)  
})

