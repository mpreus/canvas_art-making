document.addEventListener("DOMContentLoaded", init);

function init() {
	
	const canvas = document.querySelector("#draw"); // obszar do rysowania
// kontekst:
	const ctx = canvas.getContext("2d"); // rysujemy na dwuwymiarowym elemencie, jak na płótnie
// rozmiary obszaru roboczego:
	canvas.width = window.innerWidth;
	canvas.heigth = window.innerHeight;

/* ustawienia robocze: */
	// podstawowy kolor rysowania:
	ctx.strokeStyle = "#bada55";
	// rodzaj łączenia linii:
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	// wstępna grubość linii:
	ctx.lineWidth = 20;
	/* jesli dodamy poniższą linię - kolejne kolory dodawane będą od spodu
	ctx.globalCompositeOperation = "destination-over"; */ 

/* rysowanie dowolnych kształtów myszką */
	let isDrawing = false; // pozwala rysować tylko gdy myszka przyduszona
	/* przyduszenie przycisku myszki zmienia to 'false' na 'true' */

	let lastX = 0;
	let lastY = 0;
// dodatkowe ustawienia kolorów:
	let hue = 0;

	function draw(e) {

		if (!isDrawing) return; // jeśli nie rysuje - zatrzymuje działanie funkcji
						
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; /* kolejno: color, gradient i pattern definiują linię */
		// jeśli dodatkowo wpiszemy...
		ctx.lineWidth = hue / 2; 
		// ...to grubość linii będzie narastać tak, jak kolor narasta
		// początek ścieżki:
		ctx.beginPath();
		// zacznij rysować od lokalizacji:
		ctx.moveTo(lastX, lastY);
		// skończ rysować w lokalizacji:
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke(); // wywołuje właściwe rysowanie
		// dodajemy aktualizację położenia kursora myszki:
		lastX = e.offsetX;
		lastY = e.offsetY;
		
		hue++; // dolicz kolejne wartości i zmień kolor rysowanej linii...
		if (hue >= 360) { // ...w pętli
			hue = 0; 
		} // w połączeniu grubości rysowanej linii z kolorem, taki reset koloru, resetuje też grubośc linii
	}

	/* żeby pierwsza rysowana linia nie musiała zaczynać się w lokalizacji 0,0, czyli w lewym górnym rogu ekranu*/ 
	// modyfikujemy linię kodu z 'mousedown':
	canvas.addEventListener('mousedown', (e) => { // na event...
		isDrawing = true;				// ...zacznij rysować
		[lastX, lastY] = [e.offsetX, e.offsetY]; // aktualizacja współrzędnych 
	});
		// kolejne rysowane odcinki nie mogą zaczynać się od poprzedniej lokalizacji
	canvas.addEventListener('mousemove', draw);
	canvas.addEventListener('mousedown', () => isDrawing = true);
	canvas.addEventListener('mouseup', () => isDrawing = false);
	canvas.addEventListener('mouseout', () => isDrawing = false);
	// wskutek tego, ruchy myszki rejestrowane są kolorowymi liniami tylko, gdy przycisk jest wduszony

}