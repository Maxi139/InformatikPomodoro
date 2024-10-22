const container = document.getElementById("container");

const Icon = document.getElementById("icon")

function toggleVisibility(){
    if(container.style.visibility != "visible"){
        container.style.visibility = "visible";
    }else{
        container.style.visibility = "hidden";
    }
}

Icon.addEventListener('mouseenter', () => {
    Icon.style.color = 'gold';
    toggleVisibility();
});

container.addEventListener('mouseleave', () => {
    Icon.style.color = 'black';
    toggleVisibility();
});

for (const child of container.children) {
    child.addEventListener("click", () => {
        console.log(child.classList);
    });
}

toggleVisibility();