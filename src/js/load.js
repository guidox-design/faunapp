const img_input = document.getElementById('img-input');
const camera_input = document.getElementById('camera-input');

const onImageLoaded = (e) => {
	const file = e.target.files[0];
	if (!file) return;

	const reader = new FileReader();

	reader.readAsDataURL(file);

	reader.onload = () => {
		localStorage.setItem('img_data', reader.result);

		window.location.href = 'result.html';
	};
};

img_input.onchange = onImageLoaded;
camera_input.onchange = onImageLoaded;
