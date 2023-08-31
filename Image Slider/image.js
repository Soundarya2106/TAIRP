const pictures = document.querySelector(".pictures");
firstImage= pictures.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".image-wrap i");

let isDragStarted=false, isdrag=false, prevPageX,  prevScrollLeft, positiondifference;

const showhiddenIcons = () => {
    let scrollwidth = pictures.scrollWidth - pictures.clientWidth;
    arrowIcons[0].style.display = pictures.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = pictures.scrollLeft == scrollwidth ? "none" : "block";
} 

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImageWidth=firstImage.clientWidth + 14;
        if(icon.id=="left"){
            pictures.scrollLeft -= firstImageWidth;
        }else{
            pictures.scrollLeft += firstImageWidth;
        }
        setTimeout(() => showhiddenIcons(), 60);
    });
});

const autoslide = () => {
    if(pictures.scrollLeft == (pictures.scrollWidth-pictures.clientWidth)) return;
    positiondifference-Math.abs(positiondifference);
    let firstImageWidth = firstImage.clientWidth + 14;
    let valdiff = firstImageWidth - positiondifference;
    if(pictures.scrollLeft > prevScrollLeft){
        return pictures.scrollLeft += positiondifference > firstImageWidth /3 ? valdiff : -positiondifference;
    }
    pictures.scrollLeft -= positiondifference > firstImageWidth /3 ? valdiff : -positiondifference;
}

const dragstart = (e) => {
    isDragStarted = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = pictures.scrollLeft;
}

const drag = (e) => {
    if(!isDragStarted) return;
    e.preventDefault();
    isdrag=true;
    pictures.classList.add("drag");
    positiondifference = (e.pageX || e.touches[0].pageX) - prevPageX;
    pictures.scrollLeft = prevScrollLeft - positiondifference;
    showhiddenIcons();
}
const dragstop = () => {
    isDragStarted = false;
    pictures.classList.remove("drag");
    if(!isdrag) return;
    isdrag=false;
    autoslide();
}

pictures.addEventListener("mousedown", dragstart);
pictures.addEventListener("touchstart", dragstart);


pictures.addEventListener("mousemove", drag);
pictures.addEventListener("touchmove", drag);

pictures.addEventListener("mouseup", dragstop);
pictures.addEventListener("mouseleave", dragstop);
pictures.addEventListener("touchleave", dragstop);