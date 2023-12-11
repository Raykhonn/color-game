const titlesContainer = document.querySelector(".titles");
const colors = ["purple", "pink", "crimson", "yellow", "dodgerblue", "orange", "green", "blue"];
const colorPicklist = [...colors, ...colors];
const titleCount = colorPicklist.length;

let revealedCount = 0;
let activeTitle = null;
let awaitingendofMove = false;

function buildTitle(color){
    const element = document.createElement("div");

    element.classList.add("title");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

     element.addEventListener("click", ()=>{
        const revealed = element.getAttribute("data-revealed");
        if(awaitingendofMove || revealed === "true" || element === activeTitle){
            return;
        }
        element.style.backgroundColor = color;

        if(!activeTitle){
            activeTitle = element;
            return;
        }

        const colortoMatch = activeTitle.getAttribute("data-color");

        if(colortoMatch === color){
            activeTitle.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");

            awaitingendofMove = false;
            activeTitle = null;
            revealedCount += 2;

            if(revealedCount === titleCount){
                alert ("U win! Refresh to play again...");
            }

            return;
        }

        awaitingendofMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTitle.style.backgroundColor = null;

            awaitingendofMove = false;
            activeTitle = null;
        }, 1000);
     });

    return element;
}

for(let i=0; i<titleCount; i++){
    const randomIndex = Math.floor(Math.random()*colorPicklist.length);
    const color = colorPicklist[randomIndex];
    const title = buildTitle(color);

    colorPicklist.splice(randomIndex, 1);
    titlesContainer.appendChild(title);
}