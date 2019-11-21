document.addEventListener("DOMContentLoaded", init);
function init() {

	const canvas = document.querySelector("#draw"); // uchwycenie aktywnego elementy do rysowania
// kontekst:
	const ctx = canvas.getContext("2d"); // ryzujemy na dwuwymiarowym elemencie, jak na płótnie
// rozmiary obszaru roboczego:
	canvas.width = window.innerWidth;
	canvas.heigth = window.innerHeight;

// ustawienia robocze:

// rodzaj łączenia linii:
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
// grubość linii:
	ctx.lineWidth = 20;
// jesli dodamy poniższą linię - kolejne kolory dodawane będą od spodu
	// ctx.globalCompositeOperation = "destination-over"; 
	// na stronie 'globalCompositeOperation' (Mozilla Developer Network) można zobaczyć różne efekty

	let isDrawing = false; // pozwala rysować tylko gdy myszka przyduszona
// bo poniżej w kodzie przyduszenie przycisku myszki zmienia to 'false' na 'true'

	let lastX = 0;
	let lastY = 0;
// początkowe ustawienia kolorów:
	let hue = 0;
	
	function draw(e) {

		if(!isDrawing) return; // jesli nie rysuje - zatrzymuje działanie funkcji,
						// (gdy klawisz myszki nie jest przyduszony - nie rysuje!)
			console.log(e); // pokaże faktyczne ruchy kursora myszki
			ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; 
	// jeśli dodatkowo wpiszemy:
			ctx.lineWidth = hue; // to grubość linii będzie narastać tak, jak kolor narasta
			ctx.beginPath();
	// zacznij rysować od lokalizacji:
			ctx.moveTo(lastX, lastY);
	// skończ rysować w lokalizacji:
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke(); // wywołuje rysowanie
	// dodajemy aktualizację położenia kursora myszki:
			lastX = e.offsetX;
			lastY = e.offsetY;
			hue++; // co dolicza kolejne wartości i zmienia kolor rysowanej linii
			if (hue >= 360) {
				hue = 0;
			} // w połączeniu grubości rysowanej linii z kolorem, taki reset koloru, resetuje też grubośc linii
		}

// pierwsza linia nie może zaczynać się w lokalizacji 0,0, czyli w lewym górnym rogu ekranu
// modyfikujemy więc linię kodu z 'mousedown':
		canvas.addEventListener('mousedown', (e) => { // na event...
			isDrawing = true;				// ...zacznij rysować
			[lastX, lastY] = [e.offsetX, e.offsetY]; // aktualizacja współrzędnych 

		});
// kolejne rysowane odcinki nie mogą zaczynać się od poprzedniej lokalizacji
	canvas.addEventListener('mousemove', draw);
	canvas.addEventListener('mousedown', () => isDrawing = true);
	canvas.addEventListener('mouseup', () => isDrawing = false);
	canvas.addEventListener('mouseout', () => isDrawing = false);
// wskutek tego, ruchy myszki rejestrowane są tylko, gdy przycisk jest wduszony

}
