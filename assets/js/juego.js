miModulo = (()=>{
    'use strict'

    let deck         = [];
    const tipos      = [ 'C', 'D', 'H', 'S' ],
          especiales = [ 'A', 'J', 'K', 'Q' ];

    // let puntosJugador     = 0,
    //     puntosComputadora = 0;
    
    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll( '.cartas' ),
          PuntosJugadoresHTML  = document.querySelectorAll('small');

    // Funcion que inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for( let i=0; i < numJugadores; i++ ){
            puntosJugadores.push(0);
            PuntosJugadoresHTML[i].innerText = 0;
            divCartasJugador[i].innerHTML = '';
        }
        
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
        
    }

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
        return _.shuffle(deck);
    }

    // Esta funcion es para tomar una carta
    const pedirCarta = () => {
        if( deck.length === 0 ){
            throw 'No hay cartas en del deck';        
        }
        return deck.pop();
    }

    //valorCarta(); nos indica el valor que tiene la carta pedida
    const valorCarta = ( carta ) =>{
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ?
                ( ( valor === 'A' ) ? 11 : 10 )
                : valor * 1;
    }
    
    // Acomular puntos; 0= primer jugador y el último sera la computadora
    const acomularPuntos = ( carta, turno ) =>{
        puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta( carta );
        PuntosJugadoresHTML[ turno ].innerText = puntosJugadores[ turno ];
        return puntosJugadores[ turno ];
    }

    //Creamos el HTML de la carta, agregamos el "src" y la "clase" y mostramos la imagen
    const crearCarta = ( carta, turno ) =>{
        const imgCarta     = document.createElement('img');
        imgCarta.src       = `assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divCartasJugador[ turno ].append(imgCarta);
    }
    // Determinar el ganador y mostrar mensaje
    const determinarGanador = ( puntosMinimos, puntosComputadora)=>{
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

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) =>{
        let puntosComputadora = 0;
        do {
            //Pedimos una carta, la sumamos y mostramos el valor en el  HTML de la computadora
            const carta       = pedirCarta();
            puntosComputadora = acomularPuntos( carta, puntosJugadores.length - 1 );
            //Creamos el HTML de la carta, agregamos el "src" y la "clase" y mostramos la imagen
            crearCarta( carta, divCartasJugador.length - 1 );
    
            if ( puntosMinimos > 21 ) {
                break;
            }
        } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

        // Definir el ganador y mostrar mensaje
        determinarGanador( puntosMinimos, puntosComputadora );
    }


    //Eventos
    let puntosJugador = 0;
    btnPedir.addEventListener('click', () => {
        //Pedimos una carta, la sumamos y mostramos el valor en el  HTML del jugador
        const carta   = pedirCarta();
        puntosJugador = acomularPuntos( carta, 0 );
     
        //Creamos el HTML de la carta, agregamos el "src" y la "clase" y mostramos la imagen
        crearCarta(carta, 0 );


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
        turnoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener( 'click', ()=>{
        inicializarJuego();
    });

    return {
        nuevoJuego : inicializarJuego
    };
})();