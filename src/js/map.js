let map = document.getElementById("map");
let maximize_btn = document.getElementById("maximize-btn");
let maximize_icon = document.getElementById("maximize-icon");

maximize_btn.onclick = () => {
    map.classList.toggle("fullscreen");
    
    if (map.classList.contains("fullscreen")) {
        maximize_icon.src = "./icons/minimize.svg"
    } else {
        maximize_icon.src = "./icons/maximize.svg"
    }
}

