// 2C = Two of Clubs     (Tréboles) 
// 2D = Two of Diamonds  (Diamantes)
// 2H = Two of Heard     (Corazones)
// 2S = Two of Spades    (Espadas)



let deck         = [];
const tipos      = [ 'C', 'D', 'H', 'S' ];
const especiales = [ 'A', 'J', 'K', 'Q' ];

let puntosJugador     = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divJugadorCartas     = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');
const PuntosJugadoresHTML  = document.querySelectorAll('small');


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

// Turno de la computadora
const turnoComputadora = ( puntosMinimos ) =>{

    do {
        //Pedimos una carta, la sumamos y mostramos el valor en el  HTML de la computadora
        const carta       = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        PuntosJugadoresHTML[1].innerText = puntosComputadora;
    
        //Creamos el HTML de la carta, agregamos el "src" y la "clase" y mostramos la imagen
        const imgCarta     = document.createElement('img');
        imgCarta.src       = `assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divComputadoraCartas.append(imgCarta);

        if ( puntosMinimos > 21 ) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

    // Definir el ganador y mostrar mensaje
    setTimeout(() => {
        if ( ( puntosMinimos <= 21 ) && ( puntosComputadora > 21 ) ){
            alert('Genial ¡Ganaste!');
        }else if( (puntosComputadora <=21) && ( puntosMinimos > 21 ) ){
            alert('Gano la computadora');
        }else if( puntosMinimos === puntosComputadora ) {
            alert('Empatados');
        }else{
            alert('Ganó la computadora');
        }
    }, 500 );
}


//Eventos
btnPedir.addEventListener('click', () => {
    //Pedimos una carta, la sumamos y mostramos el valor en el  HTML del jugador
    const carta   = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    PuntosJugadoresHTML[0].innerText = puntosJugador;

    //Creamos el HTML de la carta, agregamos el "src" y la "clase" y mostramos la imagen
    const imgCarta     = document.createElement('img');
    imgCarta.src       = `assets/cartas/${carta}.png`;
    imgCarta.className = 'carta';
    divJugadorCartas.append(imgCarta);

    // Comprobamos si el jugador ganó o perdio
    if( puntosJugador > 21 ){
        // console.warn('¡Ya perdiste!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);  

    }else if( puntosJugador === 21 ){
        // console.info('21, Genial ¡lo lograste!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener( 'click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener( 'click', ()=>{

    console.clear();
    deck = [];
    deck = crearDeck();
    
    puntosJugador     = 0;
    puntosComputadora = 0;

    PuntosJugadoresHTML[0].innerHTML = 0;
    PuntosJugadoresHTML[1].innerText = 0;

    divJugadorCartas.innerHTML     = '';
    divComputadoraCartas.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
});