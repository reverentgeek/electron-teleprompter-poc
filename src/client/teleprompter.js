// console.log( "from the renderer" );

let currentSection = 0;

function jumpToSection() {
	// console.log( currentSection, location.href );
	const url = location.href;
	location.href = "#" + currentSection;
	history.replaceState( null, null, url );
}

function handleKey( e ) {
	if ( e.key === "ArrowRight" ) {
		const sections = document.getElementsByName( currentSection + 1 );
		console.log( sections );
		if ( sections.length > 0 ) {
			currentSection++;
		}
		jumpToSection();
	}
	if ( e.key === "ArrowLeft" ) {
		if ( currentSection > 0 ) {
			currentSection--;
		}
		jumpToSection();
	}
}

document.addEventListener( "keydown", handleKey );

