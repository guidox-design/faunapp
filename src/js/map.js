const map_container = document.getElementById('map-container');
const maximize_btn = document.getElementById('maximize-btn');
const maximize_icon = document.getElementById('maximize-icon');
const map_img = document.getElementById('map');
const select_zone = document.getElementById('select-zone');

maximize_btn.onclick = () => {
	map_container.classList.toggle('fullscreen');
    
	if (map_container.classList.contains('fullscreen')) {
		maximize_icon.src = './icons/minimize.svg';
	} else {
		maximize_icon.src = './icons/maximize.svg';
	}
};

<!-- essendo questo un prototipo le mappe sono solo semplici immagini, nell'app reale andrebbero prese da un'API!!! -->
const maps = {
    "1": "./imgs/map1.jpg",
    "2": "./imgs/map2.jpg",
};
select_zone.onchange = (e) => map.src = maps[e.target.value];

