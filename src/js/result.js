// === CONFIGURAZIONE DEL MODELLO ===
const MODEL_URL = './js/model/model.json';
const LABELS = ['Cinghiale', 'Volpe', 'Martora'];

const results = document.getElementById('result');
let model;

const image_element = document.getElementById('animal-img');

// Carica l'immagine dal localstorage
const img_data = localStorage.getItem('img_data');
if (img_data) {
	image_element.src = img_data;
}

async function setup() {
	results.innerText = 'Caricamento...';
	try {
		model = await tf.loadLayersModel(MODEL_URL);
		predict(image_element);
	} catch (error) {
		results.innerHTML =
			'<span class="error">ERRORE:</span> Impossibile caricare il modello AI.';
		console.error('Errore di caricamento del modello:', error);
	}
}

async function predict(imgEl) {
	// Pulizia della memoria precedente
	tf.tidy(() => {
		const img = tf.browser
			.fromPixels(imgEl)
			// Ridimensiona all'input atteso dal modello
			.resizeNearestNeighbor([224, 224])
			.toFloat()
			.div(255.0) // Normalizzazione
			.expandDims(0); // Aggiunge la dimensione del batch

		// 2. Esegui la predizione
		const prediction = model.predict(img);

		// 3. Ottieni la classe predetta e la confidenza
		// Uso del metodo .data() per ottenere i valori (è asincrono, ma più pulito con tf.tidy)
		prediction.data().then((data) => {
			const values = Array.from(data);

			// Ottiene l'indice della massima confidenza
			const maxConfidence = Math.max(...values);
			const index = values.indexOf(maxConfidence);

			// 4. Aggiorna l'interfaccia utente
			results.innerHTML = `
                Questa foto contiene al <span class="highlight">${(maxConfidence * 100).toFixed(2)}%</span>
                ${index == 0 ? 'un' : 'una'} <span class="highlight">${LABELS[index]}</span>.
                `;
		});
	});
	// tf.tidy assicura che tutti i tensori intermedi creati all'interno siano liberati automaticamente.
}

window.onload = setup;
