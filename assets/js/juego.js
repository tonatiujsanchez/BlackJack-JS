// 2C = Two of Clubs     (Tréboles) 
// 2D = Two of Diamonds  (Diamantes)
// 2H = Two of Heard     (Corazones)
// 2S = Two of Spades    (Espadas)



let deck         = [];
const tipos      = [ 'C', 'D', 'H', 'S' ];
const especiales = [ 'A', 'J', 'K', 'Q' ];
let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');

const PuntosJugadoresHTML = document.querySelectorAll('small');
const divJugadorCartas = document.querySelector('#jugador-cartas');


// Esta funcion crea un nueva baraja
const crearDeck = () =>{
    for (let i = 2; i <= 10 ; i++) {
        for (let tipo of tipos) {
            deck.push( i + tipo );
        }
    }
    for (const especial of especiales) {
        for (const tipo of tipos) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    
    return deck;
}
crearDeck();


// Esta funcion es para tomar una carta
const pedirCarta = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en del deck';        
    }

    const carta = deck.pop();
    return carta;
}

//pedirCarta(); nos indica el valor que tiene la carta pedida
const valorCarta = ( carta ) =>{
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ?
            ( ( valor === 'A' ) ? 11 : 10 )
            : valor * 1;
}

//Eventos
btnPedir.addEventListener('click', () => {
    //Pedimos una carta, la sumamos y mostramos el valor en el  HTML del jugador
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    console.log( puntosJugador );
    PuntosJugadoresHTML[0].innerText = puntosJugador;

    //Creamos el HTML de la carta, agregamos el "src" y la "clase" y mostramos la imagen
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.className = 'carta';
    divJugadorCartas.append(imgCarta);

    // Comprobamos si el jugador ganó o perdio
    if( puntosJugador > 21 ){
        console.warn('¡Ya perdiste!');
        btnPedir.disabled = true;        
    }else if( puntosJugador === 21 ){
        console.info('21, Genial ¡lo lograste!');
        btnPedir.disabled = true;
    }

});


