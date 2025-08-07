//Variables globales
const sectionSeleccionarMokepon = document.getElementById('seleccionar-mokepon')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const espSegmenter = new Intl.Segmenter('es', { granularity: 'grapheme' });
const sectionReiniciar = document.getElementById('reiniciar')
const botonMokeponJugador = document.getElementById('boton-mokepon')
const botonMokeponMapa = document.getElementById('boton-mokepon-mapa')
const botonReiniciar = document.createElement('button')
const notificacionResultado = document.getElementById('notificacion-resultado')
const notificacionCombate = document.getElementById('notificacion-combate')

const spanMokeponJugador = document.getElementById('mokepon-jugador')
const spanMokeponRival = document.getElementById('mokepon-rival')
const spanReferee = document.getElementById('referee')

const spanVictoriasJugador = document.getElementById('victorias-jugador')
const spanVictoriasRival = document.getElementById('victorias-rival')
const contenedorTarjetasgrupoa = document.getElementById('contenedor-tarjetas-grupoa')
const contenedorTarjetasgrupob = document.getElementById('contenedor-tarjetas-grupob')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const controls = document.querySelectorAll('.button-control')
const btnArriba = document.getElementById('ArrowUp')
const btnDerecha = document.getElementById("ArrowRight")
const btnAbajo = document.getElementById("ArrowDown")
const btnIzquierda = document.getElementById("ArrowLeft")


let jugadorId = null
let rivalId = null
let mokepones = []
let mokeponesRivales = []
let poderes = ['AGUA', 'TIERRA', 'FUEGO']
let tipos = ['AGUA', 'TIERRA', 'FUEGO','AGUAFUEGO','TIERRAAGUA','FUEGOTIERRA']
let idbotones = ['boton-agua', 'boton-tierra', 'boton-fuego'] 
let mokeponElegido 
let ataqueJugador = []
let ataqueRival = []
let ataquesMokepon
let ataquesMokeponRival = []
let tipoMokeponRival
let copyataquesMokeponRival = []
let ataqueDisponible
let tipoElegido
let tipoGanador
let ataqueElegido = []
let ataqueAleatorio = []
let valorAtaqueAleatorio = []
let indexAtaqueJugador
let indexAtaqueRival
let ataqueRivalRecibido
let opcionDeMokeponesgrupoa
let opcionDeMokeponesgrupob
let inputMokeponElegido
let botonFuego
let botonAgua
let botonTierra
let botones = []
let restaTipo = 0
let restaAtaques = 0
let victoriasJugador = 0
let victoriasRival = 0
let vidasJugador = 3
let vidasRival = 3
let jugar = 1
let lienzo = mapa.getContext('2d') //Creamos un lienzo 2d para dibujar dentro del canvas
let intervalo
let intervaloRivales
let intervaloAtaques
let botonElegido = []
let teclaPresionada = []
let rivalMapa
let atributoMokeponElegido
let ataqueAgua = [{nombre: '💧'}, {id: idbotones[0]}, {titulo: poderes [0]}]
let ataqueTierra = [{nombre: '🪨'}, {id: idbotones[1]}, {titulo: poderes [1]}]
let ataqueFuego = [{nombre: '🔥'}, {id: idbotones[2]}, {titulo: poderes [2]}]
let scaleSize = 3/4 //Relacion 600 px de alto y 800 px de ancho del mapa
let nuevaAlturamapa
let nuevoAnchomapa = sectionVerMapa.getBoundingClientRect().width - 20 //Ancho del mapa, se resta 20px para que no se salga del canvas, si hay un Flex box sectionVerMapa.getBoundingClientRect().width - 20  o window.innerwidth
const anchoMaximomapa = 350
let altoMaximomapa = anchoMaximomapa * scaleSize


if (nuevoAnchomapa > anchoMaximomapa) {
  nuevoAnchomapa = anchoMaximomapa - 20
  nuevaAlturamapa = altoMaximomapa - 20 //Para evitar que el height termine creciendo a niveles desproporcionados
}
nuevaAlturamapa = nuevoAnchomapa*scaleSize

mapa.width = nuevoAnchomapa
mapa.height = nuevaAlturamapa


let mapaBackground = new Image()
mapaBackground.src = 'https://i.postimg.cc/CKYgYyMb/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.png'

class Mokepon {
constructor(nombre,foto,vida,id = null,tipo,fotoMapa, colorBorde, jugadorid, value, titulo) { 
this.nombre = nombre
this.foto = foto
this.vida = vida
this.ataques = []
this.value = value //Asigna el valor del indice del mokepon dentro del arreglo mokepones 
this.id = id
this.jugadorid = jugadorid
this.tipo = tipo //Asigna el tipo de mokepon, agua,fuego o tierra
this.titulo = titulo //Asigna el nombre del ataque, agua, fuego o tierra
this.borde = {color: colorBorde, width: 2} //Color y Ancho del borde del mokepon
this.ancho = 50*(nuevoAnchomapa/anchoMaximomapa) //ancho del personaje
this.alto = 50*(nuevaAlturamapa/altoMaximomapa) //alto del personaje
this.x = aleatorio(0, mapa.width - this.ancho)  //posicion inicial en eje x es x, x es un parametro y el valor por defecto sera 10, se vuelve aleatoria asi x = aleatorio(0, mapa.width - this.ancho) para que el personaje no se salga del mapa, nota: quitarle el valor de x,y que ya traiga cada mokepon
this.y = aleatorio(0, mapa.height - this.alto) //posicion inicial en eje y es y, y es un parametro y el valor por defecto sera 85, se vuelve aleatoria asi y = aleatorio(0,mapa.height - this.alto) para que el personaje no se salga del mapa, quitarle el valor de x,y que ya traiga cada mokepon
this.mapaFoto = new Image()//seria el equivalente a let imagenDeCapipepo = new Image()
this.mapaFoto.src = fotoMapa //imagenDeCapipepo.src = capipepo.foto
this.velocidadX = 0
this.velocidadY = 0
}
pintarMokepon() {
  
  lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.ancho,
      this.alto,
    )
  lienzo.strokeStyle = this.borde.color;
  lienzo.lineWidth = this.borde.width;
  lienzo.strokeRect(this.x, this.y, this.ancho, this.alto);
  
  }
  }


let hipodoge = new Mokepon('Hipodoge', 'https://i.postimg.cc/ZK10T5WG/hipodoge-76597a8f-782f-4beb-b9ab-53191d217f12-removebg.png', 5, 'Hipodoge', tipos [0],'https://i.postimg.cc/ZK10T5WG/hipodoge-76597a8f-782f-4beb-b9ab-53191d217f12-removebg.png','blue') 
/* VScode menciona que esta variable espera ciertos valores como nombre,foto,vida,id*/
let capipepo = new Mokepon('Capipepo', 'https://i.postimg.cc/bNGsctw0/capipepo-26b57f58-e390-416a-b126-0bcf8c8ef477-removebg.png', 5, 'Capipepo', tipos [1], 'https://i.postimg.cc/bNGsctw0/capipepo-26b57f58-e390-416a-b126-0bcf8c8ef477-removebg.png','blue' )
let ratigueya = new Mokepon('Ratigueya', 'https://i.postimg.cc/3wZwCjth/ratigueya-37a7cdfe-6921-467c-92f6-44bb7ae506e7-removebg.png', 5, 'Ratigueya',tipos [2], 'https://i.postimg.cc/3wZwCjth/ratigueya-37a7cdfe-6921-467c-92f6-44bb7ae506e7-removebg.png','blue')          
let langostelvis = new Mokepon('Langostelvis', 'https://i.postimg.cc/0yDjr1mb/langostelvis-73e35035-de30-4f9c-9802-e31a26110bd0-removebg.png', 5, 'Langostelvis', tipos [3], 'https://i.postimg.cc/0yDjr1mb/langostelvis-73e35035-de30-4f9c-9802-e31a26110bd0-removebg.png','blue')
let tucapalma = new Mokepon('Tucapalma', 'https://i.postimg.cc/fLTRH3P9/tucapalma-3263a05e-b205-49a0-943d-19590a3949e1-removebg.png', 5, 'Tucapalma', tipos [4],'https://i.postimg.cc/fLTRH3P9/tucapalma-3263a05e-b205-49a0-943d-19590a3949e1-removebg.png','blue')
let pydos = new Mokepon('Pydos', 'https://i.postimg.cc/mr4DHpNV/pydos-6e458237-73df-40fb-be7c-2d4b477be360-removebg.png', 5, 'Pydos', tipos [5], 'https://i.postimg.cc/mr4DHpNV/pydos-6e458237-73df-40fb-be7c-2d4b477be360-removebg.png','blue')
let referee = new Mokepon('Referee', 'https://i.postimg.cc/Pq2Zsdfp/zebraanimadareferee-removebg.png', 5, 'Referee', tipos [0], 'https://i.postimg.cc/Pq2Zsdfp/zebraanimadareferee-removebg.png', 'transparent')

const ataquesHipodoge = [
     {nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]} ] /*hipodoge es tipo agua por lo que tiene 3 ataques de agua, 1 de fuego y 1 de tierra */

const ataquesCapipepo = [ 
     {nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]} ]

const ataquesRatigueya = [
     {nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]} ]

const ataquesLangostelvis = [ 
     {nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]} ]

const ataquesTucapalma = [ 
     {nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]} ]

const ataquesPydos = [ 
     {nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
    ,{nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
    ,{nombre: '💧', id: idbotones[0], titulo: poderes [0]} ]

hipodoge.ataques.push(...ataquesHipodoge) //... permite que ataquesHipodoge no se comporte como una lista sino los valores de los diferentes atauqes como el json que es

capipepo.ataques.push(...ataquesCapipepo)

ratigueya.ataques.push(...ataquesRatigueya)

langostelvis.ataques.push(...ataquesLangostelvis)

tucapalma.ataques.push(...ataquesTucapalma)

pydos.ataques.push(...ataquesPydos)

/*hipodogeRival.ataques.push(...ataquesHipodoge)

capipepoRival.ataques.push(...ataquesCapipepo)

ratigueyaRival.ataques.push(...ataquesRatigueya)

langostelvisRival.ataques.push(...ataquesLangostelvis)

tucapalmaRival.ataques.push(...ataquesTucapalma)

pydosRival.ataques.push(...ataquesPydos)*/

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)


//Funcion de inicio del juego                                     


function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none'

  sectionVerMapa.style.display = 'none'
  
  mokepones.forEach((mokepon,index) => {
    mokepon.value = index //index se puede reemplazar por: mokepones.indexOf(mokepon)    
  })

    mokepones.slice(0,3).forEach((mokepon) => {
  opcionDeMokeponesgrupoa = `
  <input type="radio" name="mokepon" id=${mokepon.id} value =${mokepon.value} />                
                <label class="tarjeta-de-mokepon" for=${mokepon.id} >
                <p>${mokepon.nombre}&nbsp;&nbsp;&nbsp;</p>
                    <img src = ${mokepon.foto} alt="${mokepon.nombre}">
                </label>
   `
  contenedorTarjetasgrupoa.innerHTML += opcionDeMokeponesgrupoa
  })

  mokepones.slice(3,6).forEach((mokepon) => {
  opcionDeMokeponesgrupob = `
  <input type="radio" name="mokepon" id=${mokepon.id} value =${mokepon.value} />                
                <label class="tarjeta-de-mokepon" for=${mokepon.id} >
                <p>${mokepon.nombre}&nbsp;&nbsp;&nbsp;</p>
                    <img src = ${mokepon.foto} alt="${mokepon.nombre}">
                </label>
   `
  contenedorTarjetasgrupob.innerHTML += opcionDeMokeponesgrupob
  })

  inputMokeponElegido=[document.getElementById('Hipodoge'),document.getElementById('Capipepo'),document.getElementById('Ratigueya'),document.getElementById('Langostelvis'),document.getElementById('Tucapalma'),document.getElementById('Pydos')];

  //El metodo slice() permite dividir la mitad de mokepones en un grupo y la mitad en otro para que se vean en columnas ya que estan distribuidos dentro del contenedorTarjetasgrupoa y ontenedorTarjetasgrupob 

  sectionReiniciar.style.display = 'none'
 
  botonMokeponJugador.addEventListener('click',function(event) {
  botonElegido[event.key] = true;
  rivalMapa = false;
  seleccionarMokeponJugador();
  console.log(rivalMapa)
  sectionSeleccionarAtaque.style.display = 'flex';
})
  botonMokeponMapa.addEventListener('click', function(event) {
  botonElegido[event.key] = false;
  rivalMapa = true;
  seleccionarMokeponJugador();
  sectionVerMapa.style.display = 'flex';
  iniciarMapa()
})

  unirseAlJuego()
}

//Invoca el servidor creado en Node.js para unirse a la sala del juego y cada jugador reciba su ID
function unirseAlJuego() {
//Peticion hacia el servidor.
fetch("http://192.168.20.29:8080/unirse") 
  .then(function(res) { 
    if (res.ok) { //Si todo salio bien, traer el texto.
      res.text() //Si trajeramos datos no seria .text porque no es texto, seria .json
      .then(function(respuesta) {
        console.log(respuesta)//Felicitaciones aqui hay comunicacion del frontend con backend por medio de API
        jugadorId = respuesta //El jugador se ha unido a una partida y Se guarda el id del jugador en una variable global
      })
    } else {
      console.error("Error al unirse al juego")
    }
  })

} 

//Funcion de Seleccionar Mokepon
function seleccionarMokeponJugador () {
  sectionSeleccionarMokepon.style.display = 'none';
  
  //Declaracion de variables locales
  
  // querySelectorAll genera un arreglo con todos los elementos similares. 
  // querySelector para elegir el primer elemento que cumpla la condicion
  
  let mokeponElegido=inputMokeponElegido.find(elemento=>elemento.checked);
  
  if (!mokeponElegido) {
    console.log("No se ha seleccionado mokepon");  
    alert("Debes seleccionar un mokepon");
    jugar = 0;
    
    sectionSeleccionarMokepon.style.display = 'flex';
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';
  } //Solo se continua eligiendo mokepon del rival si el jugador lo ha hecho previamente, es decir no mokeponElegido no es igual a ningun falsy value como undefined, null, etc...
  else {
    jugar = 1;
    spanMokeponJugador.innerHTML = 'Tu ' + mokepones[mokeponElegido.value].nombre + `<img src = ${mokepones[mokeponElegido.value].foto} alt="${mokepones[mokeponElegido.value].nombre}">`;
    spanReferee.innerHTML = `<img src = ${referee.foto} alt="${referee.nombre}">`;
    console.log("Se selecciono:" + mokeponElegido.id);
  }
  envioMokeponSeleccionado(mokeponElegido);
  //Se envia el mokepon elegido al servidor para que pueda luchar contra los jugadores rivales que tambien se conecten.
  extraerAtaques(mokeponElegido);
}

function envioMokeponSeleccionado(mokeponElegido) {
  fetch(`http://192.168.20.29:8080/mokepon/${jugadorId}`, { //Tambien puede ser "http://192.168.20.29:8080/mokepon/" + jugadorId   192.168.20.29 reemplazaria a localhost para mantener el multijugador
        method: 'post', //Metodo de envio de datos
        headers: { //los headers o cabeceras son metadatos, son tipos de datos que se envia al servidor para interpretar datos reales
        'Content-Type': 'application/json' //El tipo de contenido que se envia es un json. Debido al - se escribe "Content-Type" para que javascript lo respete como algo valido"
        },
        body: JSON.stringify({ //El body para el estandar de fetch es una cadena de texto, entonces convertimos el JSON en una cadena de texto.
        mokepon: mokepones[mokeponElegido.value].nombre //Se envia el nombre del mokepon elegido por el jugador  mokepones[mokeponElegido.value].nombre
        }) 
    })
  }

function extraerAtaques(mokeponElegido) //Se marca que esta recibiendo el parametro del mokepon elegido
{
  mokeponElegido = inputMokeponElegido.find(elemento => elemento.checked);
  for (let i = 0; i < mokepones.length; i++) {
    if (mokepones[i].nombre === mokepones[mokeponElegido.value].nombre) {
      ataqueDisponible = mokepones[i].ataques
      tipoElegido = mokepones[i].tipo  //Es importante guardar despues de una comparación.
      seleccionarMokeponRival (ataqueDisponible,rivalMapa)
      return mokepones[i]
    }
  }
  console.log(tipoElegido)
}


function mostrarAtaques (ataqueDisponible,tipoGanador,tipoElegido,tipoMokeponRival) {
  /*Aqui inyectamos los ataques en html, esto implica crear una estructura literaria donde se crea el boton y varia el id y el nombre por cada ataque, con un contador de cuantos ataques de cada tipo y cuando ese contador llegue a cero, se deshabiliten los botones.`*/
  
  ataqueDisponible.forEach((ataque) => {
    
    ataquesMokepon =`<button  id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
    contenedorAtaques.innerHTML += ataquesMokepon
  })


  let espSegments = espSegmenter.segment(tipoElegido)
  let tipoElegidoSeg = Array.from(espSegments)
  console.log(tipoElegidoSeg.length)
  console.log(tipoElegido)
    //Se agrega un ataque extra al tipo de mokepon mas fuerte. Agua>Fuego Agua<Tierra Fuego>Tierra Fuego<Agua Tierra>Agua Tierra<Fuego && AguaFuego > TierraAgua  FuegoTierra > AguaFuego  TierraAgua > FuegoTierra
    
    restaTipo = ((tipos.indexOf(tipoElegido)+1) - (tipos.indexOf(tipoMokeponRival)+1))
    console.log(tipos.indexOf(tipoElegido),tipos.indexOf(tipoMokeponRival))
    console.log(restaTipo)
    if (restaTipo == 0) {
      crearMensajeVentaja('Tienes el mismo mokepon que tu rival, juega bien tus ataques')  
    } else if ((restaTipo == 4) || (restaTipo == -3) || (restaTipo ==-5) || ((restaTipo == 2) && (tipoElegidoSeg.length > 7)) || ((restaTipo == -2) && (tipoElegido === tipos[0])) || ((restaTipo == -1) && (tipoElegidoSeg.length > 7) && tipoElegido.includes(tipos[1]))  
      || ((restaTipo == 1) && (tipoElegidoSeg.length > 7) && (!tipoElegido.includes(tipos[1])) ) || ((restaTipo == 1) && (tipoElegidoSeg.length < 7) && (tipoElegido !== tipos[0]))  )
      /*En lugar de chequear si tipoElegido tiene mas de 7 caracteres, podria chequearse por una logica mas fuerte, ej: detallar cual combinacion de tipos de mokepones aplica, 
      AguaFuego, escribir (tipoElegido.includes(tipos[0]) && tipoElegido.includes(tipos[2]))
      TierraAgua, escribir (tipoElegido.includes(tipos[1]) && tipoElegido.includes(tipos[0])) 
      FuegoTierra, escribir (tipoElegido.includes(tipos[2]) && tipoElegido.includes(tipos[1]))*/
      {
      tipoGanador = tipoElegido; 
      
      crearMensajeVentaja('Recibiste una ventaja de ataque')
          if (tipoGanador.includes(tipos[0]) && tipoGanador.includes(tipos[1])) {
          ataquesMokepon =`<button  id=${idbotones[0]} class="boton-de-ataque BAtaque">💧</button>` + `<button  id=${idbotones[1]} class="boton-de-ataque BAtaque">🪨</button>` 
          contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
          } else if (tipoGanador.includes(tipos[1]) && tipoGanador.includes(tipos[2])) {
          ataquesMokepon =`<button  id=${idbotones[0]} class="boton-de-ataque BAtaque">🪨</button>` + `<button  id=${idbotones[2]} class="boton-de-ataque BAtaque">🔥</button>`
          contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
          } else if (tipoGanador.includes(tipos[2]) && tipoGanador.includes(tipos[0])) {
          ataquesMokepon =`<button  id=${idbotones[2]} class="boton-de-ataque BAtaque">🔥</button>` + `<button  id=${idbotones[0]} class="boton-de-ataque BAtaque">💧</button>`
          contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML 
          } else if (tipoGanador.includes(tipos[0])) {
          ataquesMokepon =`<button  id=${idbotones[0]} class="boton-de-ataque BAtaque">💧</button>`
          contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
          } else if (tipoGanador.includes(tipos[1])) {
          ataquesMokepon =`<button  id=${idbotones[0]} class="boton-de-ataque BAtaque">🪨</button>`
          contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
          } else if (tipoGanador.includes(tipos[2])) {
          ataquesMokepon =`<button  id=${idbotones[2]} class="boton-de-ataque BAtaque">🔥</button>`
          contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
          }
      } else { 
      tipoGanador = tipoMokeponRival;
      crearMensajeVentaja('Tu rival tiene una ventaja de ataque')
      if (tipoGanador.includes(tipos[0]) && tipoGanador.includes(tipos[1])) {
          ataquesMokeponRival.push({nombre: '💧', id: idbotones[0], titulo: poderes [0]}, {nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
          )} else if (tipoGanador.includes(tipos[1]) && tipoGanador.includes(tipos[2])) {
          ataquesMokeponRival.push({nombre: '🪨', id: idbotones[1], titulo: poderes [1]}, {nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
          )} else if (tipoGanador.includes(tipos[2]) && tipoGanador.includes(tipos[0])) {
          ataquesMokeponRival.push({nombre: '💧', id: idbotones[0], titulo: poderes [0]}, {nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
          )} else if (tipoGanador.includes(tipos[0])) {
          ataquesMokeponRival.push({nombre: '💧', id: idbotones[0], titulo: poderes [0]}
          )} else if (tipoGanador.includes(tipos[1])) {
          ataquesMokeponRival.push({nombre: '🪨', id: idbotones[1], titulo: poderes [1]}
          )} else if (tipoGanador.includes(tipos[2])) {
          ataquesMokeponRival.push({nombre: '🔥', id: idbotones[2], titulo: poderes [2]}
          )}

    }

    console.log(tipoMokeponRival)

  
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
    // querySelectorAll devuelve un arreglo con todos los elementos aunque en la clase haya un "" separando la palabra BAtaque

    console.log(botones)

    secuenciaAtaque()
    
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
      boton.addEventListener('click', (e) => {
        if (e.target.textContent === '💧') {
          ataqueJugador.push(poderes [0])
          ataqueElegido.push((poderes.indexOf('AGUA') + 1))
          console.log(ataqueJugador)
          console.log(ataqueElegido)
          boton.style.background = '#112f58'
          boton.disabled = true
        } else if (e.target.textContent === '🪨') {
          ataqueJugador.push(poderes [1])
          ataqueElegido.push((poderes.indexOf('TIERRA') + 1))
          console.log(ataqueJugador)
          console.log(ataqueElegido)
          boton.style.background = '#112f58'
          boton.disabled = true
        } else {
          ataqueJugador.push(poderes [2])
          ataqueElegido.push((poderes.indexOf('FUEGO') + 1))
          console.log(ataqueJugador)
          console.log(ataqueElegido)
          boton.style.background = '#112f58'
          boton.disabled = true
        }
      iniciarPelea()
      })
    })
  }

  /*let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangostelvis = document.getElementById('langostelvis')
    let inputTucapalma = document.getElementById('tucapalma')
    let inputPydos = document.getElementById('pydos')
    let spanMokeponJugador = document.getElementById('mokepon-jugador')
   
  

//Comprueba Seleccion y Cambia el DOM con la mokepon seleccionada
    if (inputHipodoge.checked == true){
        spanMokeponJugador.innerHTML = nombresMokepons[inputHipodoge.value]
    }
    else if (inputCapipepo.checked == true){
        spanMokeponJugador.innerHTML = nombresMokepons[inputCapipepo.value]
    }
    else if (inputRatigueya.checked == true){
        spanMokeponJugador.innerHTML = nombresMokepons[inputRatigueya.value]
    }
    else if (inputLangostelvis.checked == true){
        spanMokeponJugador.innerHTML = nombresMokepons[inputLangostelvis.value]
    }
    else if (inputTucapalma.checked == true){
        spanMokeponJugador.innerHTML = nombresMokepons[inputTucapalma.value]
    }
    else if (inputPydos.checked == true){
        spanMokeponJugador.innerHTML = nombresMokepones[inputPydos.value]
    } //Solo se continua eligiendo mokepon del rival si el jugador lo ha hecho previamente
    else {
        alert("Debes seleccionar una mokepon");
        jugar = 0;
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
         sectionSeleccionarAtaque.style.display = "none";
     
    let sectionSeleccionarMokepon = document.getElementById('seleccionar-mokepon')
         sectionSeleccionarMokepon.style.display = "block";

    }
    
    seleccionarMokeponRival();
}*/


//Funcion seleccion de mokepon del rival
function seleccionarMokeponRival (ataqueDisponible,rivalMapa) {
  
  let mokeponRival 
  if (rivalMapa !== false && rivalMapa !== true) {
  mokeponRival = mokepones.findIndex(m => m.nombre === rivalMapa.nombre) //Si rivalMapa ha sido escogido, se busca su nombre dentro de nombres de los objetos en el arreglo mokepones;
  } else if (rivalMapa == false){
  mokeponRival = aleatorio(0, mokepones.length - 1) //Si es false se elige uno al azar
  } else if (rivalMapa == true) {
  return
    //Si rivalMapa es true quiere decir que si se hizo click en elegir por el mapa, pero aun no se ha escogido un mokepon
  } 
  
  console.log(mokeponRival)
  spanMokeponRival.innerHTML = mokepones[mokeponRival].nombre + ' Rival' + `<img src = ${mokepones[mokeponRival].foto} alt="${mokepones[mokeponRival].nombre}">`;
  console.log(mokepones[mokeponRival].nombre);
  ataquesMokeponRival = mokepones[mokeponRival].ataques;
  tipoMokeponRival = mokepones[mokeponRival].tipo;

  console.log(mokepones[mokeponRival].ataques, mokepones[mokeponRival].tipo, ataqueDisponible); 
  mostrarAtaques (ataqueDisponible,tipoGanador,tipoElegido,tipoMokeponRival)
}



/*function seleccionarMokeponRival() {
  let mokeponAleatoria = aleatorio(1, 6);
  let spanMokeponRival = document.getElementById('mokepon-rival');
  if (mokeponAleatoria == 1) {
    spanmokeponRival.innerHTML = 'Hipodoge';
  } else if (mokeponAleatorio == 2) {
    spanmokeponRival.innerHTML = 'Capipepo';
  } else if (mokeponAleatorio == 3) {
    spanmokeponRival.innerHTML = 'Ratigueya';
  } else if (mokeponAleatorio == 4) {
    spanmokeponRival.innerHTML = 'Langostelvis';
  } else if (mokeponAleatorio == 5) {
    spanmokeponRival.innerHTML = 'Tucapalma';
  } else {
    spanmokeponRival.innerHTML = 'Pydos';
  }
}*/

/*//Funcion ataque del Jugador
function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueElegido = 1
    ataqueAleatorioRival()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueElegido = 2
    ataqueAleatorioRival()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueElegido = 3
    ataqueAleatorioRival()
}*/

function iniciarPelea() {
  if (ataqueJugador.length === 5){
        //Solo cuando la cantidad de botones de ataque cliqueados sea 5 el rival escogera ataque. Usar document.querySelectorAll('.BAtaque').length para que sea igual a la cantidad de botones creados
        console.log("Aqui rivalMapa: " + rivalMapa );
        if (rivalMapa !== false && rivalMapa !== true) {
            enviarAtaque()
        } else if (rivalMapa == false){
            ataqueAleatorioRival()
        } else if (rivalMapa == true) {
          return
        //Si rivalMapa es true quiere decir que si se hizo click en elegir por el mapa, pero aun no se ha escogido un mokepon
        } 
    }
  }

function enviarAtaque(){
    fetch(`http://192.168.20.29:8080/mokepon/${jugadorId}/ataques`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervaloAtaques = setInterval(obtenerAtaques,800) // Se ejecuta la funcion de obtenerAtaques a una velocidad mayor que la de recibirRivales hasta que por fin hayan sido seleccionados los 5 atauqes del jugador
}

function obtenerAtaques() {
      fetch(`http://192.168.20.29:8080/mokepon/${rivalId}/ataques`) //Se utiliza metodo get que ya viene predefinido, ya que la peticion recibida del servidor es tipo get no se necesita headers, body o Content-type
        .then(function(res){
        if (res.ok){
            res.json()
            .then(function ({ ataques }){
              if (ataques.length === 5) {
                ataqueRivalRecibido = ataques
                  ataqueAleatorioRival(ataqueRivalRecibido,rivalMapa) //Porque aqui si viene undefined pero si fuera ataqueRival no seria asi
              }
            })
        
      }
    })
}

//Funcion ataque del Rival
function ataqueAleatorioRival() {
  
  if (rivalMapa !== false && rivalMapa !== true) {
    console.log("Aqui la lista de ataques recibidos: " + ataqueRivalRecibido, "Aqui rivalMapa: " + rivalMapa );
    ataqueRivalRecibido.forEach((ataqueal)=> {
       ataqueRival.push(ataqueal)
       if (ataqueal == poderes [0]) {
         valorAtaqueAleatorio.push((poderes.indexOf('AGUA') + 1)) //Se le suma 1 ya que los indexes comienzan desde 0
       } else if (ataqueal == poderes [1]) {
         valorAtaqueAleatorio.push((poderes.indexOf('TIERRA') + 1))
       } else if (ataqueal == poderes [2]) {
         valorAtaqueAleatorio.push((poderes.indexOf('FUEGO') + 1))
       }
       })

  } else if (rivalMapa == false) {
    let copyataquesMokeponRival = ataquesMokeponRival.slice() //Crea una copia del arreglo ataquesMokeponRival para no modificarlo al hacer el shuffleArray
    let ataqueAleatorio = shuffleArray(copyataquesMokeponRival) 

/*Si quisiera solo ordenar un par de indices a la vez seria: let ataqueAleatorio = ataquesMokeponRival.sort((a,b)=>{ a = Math.random(); b = 0.5;
         return (a - b)}*/

       ataqueAleatorio.forEach((ataqueal)=> {
       ataqueRival.push(ataqueal.titulo)
       if (ataqueal.titulo == poderes [0]) {
         valorAtaqueAleatorio.push((poderes.indexOf('AGUA') + 1)) //Se le suma 1 ya que los indexes comienzan desde 0
       } else if (ataqueal.titulo == poderes [1]) {
         valorAtaqueAleatorio.push((poderes.indexOf('TIERRA') + 1))
       } else if (ataqueal.titulo == poderes [2]) {
         valorAtaqueAleatorio.push((poderes.indexOf('FUEGO') + 1))
       }
       
      })
      
  } else if (rivalMapa == true) {
          return
  }    
    console.log(ataqueAleatorio)
    console.log(ataqueRival)
    console.log(valorAtaqueAleatorio)

      combate()
}
      


function indexOponentes(jugador,rival) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueRival = ataqueRival[rival]
}

//Funcion combate Jugador y Rival
function combate() {
  //Lógica combate interno: Agua>Fuego Agua<Tierra Fuego>Tierra Fuego<Agua Tierra>Agua Tierra<Fuego Los valores que producen la resta son Agua=1 Tierra=2 Fuego=3
    clearInterval(intervaloAtaques) //Para que deje de ejecutarse la funcion de obtenerAtauqes ya que el jugador ya selecciono los 5 ataques
    for (let index = 0; index < ataqueJugador.length; index++) {
     restaAtaques = ataqueElegido[index] - valorAtaqueAleatorio[index]
      if (restaAtaques == 0) { 
        /*Se utiliza resta porque es una variable global, 
    si se se deja en terminos de ((ataqueElegido)-(ataqueAleatorio) == 0) no corre porque ataqueAleatorio tiene que ser variable local*/
         indexOponentes(index,index) //Empate
         crearMensaje("EMPATASTE el combate #" + (index + 1))
      }
      else if(((restaAtaques) == 1) || ((restaAtaques) == -2)) {
          indexOponentes(index,index)
          crearMensaje("GANASTE el combate #" + (index + 1))
        victoriasJugador++ //Forma corta de escribir victoriasJugador = victoriasJugador + 1
        spanVictoriasJugador.innerHTML = victoriasJugador
      } 
        else {
          indexOponentes(index,index)
          crearMensaje("PERDISTE el combate #" + (index + 1))
        victoriasRival++ //Forma corta de escribir victoriasRival = victoriasRival + 1
        spanVictoriasRival.innerHTML = victoriasRival 
              }
      }
    revisarVictorias()              
    }



function revisarVictorias(){ 
    if (victoriasJugador === victoriasRival) {
        crearMensajeFinal("El juego ha terminado en empate, no hay mokepones en pie 😐")
        crearBotonReiniciar()
    }  else if (victoriasJugador > victoriasRival) {
        crearMensajeFinal("Felicitaciones, has Ganado el juego!!! Tu mokepon venció a su rival 🥳")
        crearBotonReiniciar()        
    }  else if (victoriasRival > victoriasJugador) {
        crearMensajeFinal("Perdiste, El Mokepon de tu rival aún sigue en pie 😔")
        crearBotonReiniciar()
      }
  }

  //Funcion mensaje despues de elegir mokepon
  function crearMensajeVentaja(anuncioVentaja) {

    notificacionCombate.innerHTML = anuncioVentaja

  }
  //Funcion mensaje despues de atacar
function crearMensaje(resultado) {
  let ataquesJugador = document.getElementById('ataques-del-jugador')
  let ataquesRival = document.getElementById('ataques-del-rival')
  

  let nuevoAtaqueJugador = document.createElement('p')
  let nuevoAtaqueRival = document.createElement('p')
  let nuevaNotificacionResultado = document.createElement('p')


    nuevaNotificacionResultado.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueRival.innerHTML = indexAtaqueRival

    notificacionResultado.appendChild(nuevaNotificacionResultado)
    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesRival.appendChild(nuevoAtaqueRival)

    
} 
  //Funcion mensaje final del juego
function crearMensajeFinal(resultadoFinal) {
  let tituloDelResultadoFinal = document.getElementById('resultado-final')
  tituloDelResultadoFinal.innerHTML= resultadoFinal
  
  notificacionCombate.innerHTML = ""
  notificacionCombate.style.marginTop = '100px';
  

  sectionReiniciar.style.display = 'block'

}

function crearBotonReiniciar () {
  
  
  botonReiniciar.setAttribute('id','boton-reiniciar')
  botonReiniciar.innerHTML= 'Reinicio del juego'
  
  sectionReiniciar.appendChild(botonReiniciar)
  botonReiniciar.addEventListener('click',reiniciarJuego)
}
       
  function reiniciarJuego() {
      location.reload()  //Syntax: location.reload(forceGet) Parameter Values: forceGet Boolean Optional. Specifies the type of reloading:  false - Default. Reloads the current page from the cache. true - The current page must be reloaded from the server
      }


//Funcion numero aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
  // Loop through the array from the last element down to the second element
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index 'j' between 0 and 'i' (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices 'i' and 'j'
    // This uses array destructuring for a concise swap
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // Return the shuffled array
  // The array is now shuffled in-place
}

function pintarCanvas() {
    atributoMokeponElegido.x = atributoMokeponElegido.x + atributoMokeponElegido.velocidadX //Actualiza la posición del mokepon de acuerdo a su velocidad
    atributoMokeponElegido.y = atributoMokeponElegido.y + atributoMokeponElegido.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height) //Antes de ejecutar la funcion para pintar se limpia todo el mapa.
    lienzo.drawImage(
      mapaBackground,
      0,
      0,
      mapa.width,
      mapa.height,
    )
    
    atributoMokeponElegido.pintarMokepon()
    envioPosicionMokepon(atributoMokeponElegido.x,atributoMokeponElegido.y)
    
    mokeponesRivales.forEach((rival) => {  // o tambien forEach(function(rival) { }
      rival.pintarMokepon() //Si el mokepon tiene nombre, se usa, sino se usa el mokepon Y PINTE TODOS Y CADA UNO, AQUI ES DONDE SOLO SE DEBE PINTAR EL RIVAL QUE EN ESTE MOMENTO SEA RIVAL MAPA? EL RIVAL QUE TENGA UNA PROPIEDAD DE ONLINE. If rival.online === true { rival.pintarMokepon() } , pero ese filtro ya debe venir desde el servidor
      clearInterval(intervaloRivales)    
    })

    if (atributoMokeponElegido.velocidadX !== 0 || atributoMokeponElegido.velocidadY !== 0 ) {
        revisarColision(rivalMapa) //Se revisa la colision con el mokepon rival
        }
    
  }

function envioPosicionMokepon(x,y) {
  fetch(`http://192.168.20.29:8080/mokepon/${jugadorId}/posicion`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' //El tipo de contenido que se envia es un json. Debido al - se escribe "Content-Type" para que javascript lo respete como algo valido"
        },
        body: JSON.stringify({ //El body para el estandar de fetch es una cadena de texto, entonces convertimos el JSON en una cadena de texto.
        x: x,
        y: y,
        }) 
    })
  /*.then(function (res) {
    if (res.ok) { //Si todo salio bien, traer el texto.
      res.json() //Ya que rivales viene en formato JSON
         .then(function({rivales}) { //respuesta y luego abajo respuesta.
        console.log(rivales)
        mokeponesRivales = rivales.map(function (rival) {  //en lugar de solo iterar por cada elemento de rivales .map() adicionalmemte retorna un nuevo array con el mismo numero de elementos y el resultado de haber llamado la funcion callback en cada elemento del array traido.
          if (rival.mokepon !== undefined) {
            rivalMapaNombre = rival.mokepon.nombre || "";
            rivalId = rival.id || "";
            switch(rivalMapaNombre){
              case 'Hipodoge':
                rivalMapa = new Mokepon('Hipodoge', 'https://i.postimg.cc/ZK10T5WG/hipodoge-76597a8f-782f-4beb-b9ab-53191d217f12-removebg.png', 5, 'Hipodoge', tipos [0],'https://i.postimg.cc/ZK10T5WG/hipodoge-76597a8f-782f-4beb-b9ab-53191d217f12-removebg.png','red', rivalId) 
              break;
              case 'Capipepo':
                rivalMapa = new Mokepon('Capipepo', 'https://i.postimg.cc/bNGsctw0/capipepo-26b57f58-e390-416a-b126-0bcf8c8ef477-removebg.png', 5, 'Capipepo', tipos [1], 'https://i.postimg.cc/bNGsctw0/capipepo-26b57f58-e390-416a-b126-0bcf8c8ef477-removebg.png','red', rivalId)
              break;
              case 'Ratigueya':
                rivalMapa = new Mokepon('Ratigueya', 'https://i.postimg.cc/3wZwCjth/ratigueya-37a7cdfe-6921-467c-92f6-44bb7ae506e7-removebg.png', 5, 'Ratigueya',tipos [2], 'https://i.postimg.cc/3wZwCjth/ratigueya-37a7cdfe-6921-467c-92f6-44bb7ae506e7-removebg.png','red', rivalId)          
              break;
              case 'Langostelvis':
                rivalMapa = new Mokepon('Langostelvis', 'https://i.postimg.cc/0yDjr1mb/langostelvis-73e35035-de30-4f9c-9802-e31a26110bd0-removebg.png', 5, 'Langostelvis', tipos [3], 'https://i.postimg.cc/0yDjr1mb/langostelvis-73e35035-de30-4f9c-9802-e31a26110bd0-removebg.png','red', rivalId)       
                break;
              case 'Tucapalma':
                rivalMapa = new Mokepon('Tucapalma', 'https://i.postimg.cc/fLTRH3P9/tucapalma-3263a05e-b205-49a0-943d-19590a3949e1-removebg.png', 5, 'Tucapalma', tipos [4],'https://i.postimg.cc/fLTRH3P9/tucapalma-3263a05e-b205-49a0-943d-19590a3949e1-removebg.png','red', rivalId)
                break;
                case 'Pydos':
                rivalMapa = new Mokepon('Pydos', 'https://i.postimg.cc/mr4DHpNV/pydos-6e458237-73df-40fb-be7c-2d4b477be360-removebg.png', 5, 'Pydos', tipos [5], 'https://i.postimg.cc/mr4DHpNV/pydos-6e458237-73df-40fb-be7c-2d4b477be360-removebg.png','red', rivalId)
                break;
                default:
              break;
            }

            rivalMapa.x = rival.x
            rivalMapa.y = rival.y
            
            return rivalMapa
          }
        })
        
      })
    }}
     )*/
  intervaloRivales = setInterval(recibiendoRivales,250)//Se ejecutoa recibiendoRivales a una velocidad 5 veces mayor a la que se ejecuta pintarCanvas
  
}

function recibiendoRivales() {
  fetch(`http://192.168.20.29:8080/mokepon/${jugadorId}/posicion`)
  .then( function(res) {   
  if (res.ok) { //Si todo salio bien, traer el texto.
      res.json() //Ya que rivales viene en formato JSON
         .then(function({rivales}) { //respuesta y luego abajo respuesta.
        console.log(rivales)
        mokeponesRivales = rivales.map(function (rival) {  //en lugar de solo iterar por cada elemento de rivales .map() adicionalmemte retorna un nuevo array con el mismo numero de elementos y el resultado de haber llamado la funcion callback en cada elemento del array traido.
          if (rival.mokepon !== undefined) {
            rivalMapaNombre = rival.mokepon.nombre || "";
            rivalId = rival.id || "";
            switch(rivalMapaNombre){
              case 'Hipodoge':
                rivalMapa = new Mokepon('Hipodoge', 'https://i.postimg.cc/ZK10T5WG/hipodoge-76597a8f-782f-4beb-b9ab-53191d217f12-removebg.png', 5, 'Hipodoge', tipos [0],'https://i.postimg.cc/ZK10T5WG/hipodoge-76597a8f-782f-4beb-b9ab-53191d217f12-removebg.png','red', rivalId) 
              break;
              case 'Capipepo':
                rivalMapa = new Mokepon('Capipepo', 'https://i.postimg.cc/bNGsctw0/capipepo-26b57f58-e390-416a-b126-0bcf8c8ef477-removebg.png', 5, 'Capipepo', tipos [1], 'https://i.postimg.cc/bNGsctw0/capipepo-26b57f58-e390-416a-b126-0bcf8c8ef477-removebg.png','red', rivalId)
              break;
              case 'Ratigueya':
                rivalMapa = new Mokepon('Ratigueya', 'https://i.postimg.cc/3wZwCjth/ratigueya-37a7cdfe-6921-467c-92f6-44bb7ae506e7-removebg.png', 5, 'Ratigueya',tipos [2], 'https://i.postimg.cc/3wZwCjth/ratigueya-37a7cdfe-6921-467c-92f6-44bb7ae506e7-removebg.png','red', rivalId)          
              break;
              case 'Langostelvis':
                rivalMapa = new Mokepon('Langostelvis', 'https://i.postimg.cc/0yDjr1mb/langostelvis-73e35035-de30-4f9c-9802-e31a26110bd0-removebg.png', 5, 'Langostelvis', tipos [3], 'https://i.postimg.cc/0yDjr1mb/langostelvis-73e35035-de30-4f9c-9802-e31a26110bd0-removebg.png','red', rivalId)       
                break;
              case 'Tucapalma':
                rivalMapa = new Mokepon('Tucapalma', 'https://i.postimg.cc/fLTRH3P9/tucapalma-3263a05e-b205-49a0-943d-19590a3949e1-removebg.png', 5, 'Tucapalma', tipos [4],'https://i.postimg.cc/fLTRH3P9/tucapalma-3263a05e-b205-49a0-943d-19590a3949e1-removebg.png','red', rivalId)
                break;
                case 'Pydos':
                rivalMapa = new Mokepon('Pydos', 'https://i.postimg.cc/mr4DHpNV/pydos-6e458237-73df-40fb-be7c-2d4b477be360-removebg.png', 5, 'Pydos', tipos [5], 'https://i.postimg.cc/mr4DHpNV/pydos-6e458237-73df-40fb-be7c-2d4b477be360-removebg.png','red', rivalId)
                break;
                default:
              break;
            }

            rivalMapa.x = rival.x
            rivalMapa.y = rival.y
            
            return rivalMapa
          }
        })
        
      })
    }})
    }


    //Funcion para detectar los eventos de las flechas del mapa
function iniciarMapa(mokeponElegido) {
   
  atributoMokeponElegido = extraerAtaques(mokeponElegido)
  console.log(atributoMokeponElegido,mokeponElegido)

  controls.forEach((control)=>{
  control.addEventListener('mousedown', ()=>moverMokepon(control.id))
  control.addEventListener('mouseup', detenerMovimiento )
  control.addEventListener('touchstart', ()=>moverMokepon(control.id))
  control.addEventListener('touchend', detenerMovimiento )
//touchstart y touchend permite medir el evento de que comienza y termina el click en un smartphone
  })
  intervalo = setInterval(pintarCanvas,50) //setInterval es una funcion que va llamando a otra constantemenete esperando un intervalo de tiempo en milisegundos
  }

  //Función para actualizar la posición del personaje en el mapa
 
function moverMokepon(event) {   //en lugar de event puede ser solo e
    console.log(event)
    let key = (typeof event === 'string' ? event : event.key); // key varia segun si event es un string o no, caso de que si se escribe, sino se hace el
    let velocidadMokepon = nuevoAnchomapa*(5/anchoMaximomapa) //5 puede cambiarse por 15 y asi hacer algo diferente.
    switch(key){
    case 'ArrowUp':
    case 'w':
    atributoMokeponElegido.velocidadY = -velocidadMokepon
    btnArriba.style.backgroundColor = 'aliceblue'
    break;
    case 'ArrowDown': 
    case 's':
    atributoMokeponElegido.velocidadY = velocidadMokepon
    btnAbajo.style.backgroundColor = 'aliceblue'
    break;
    case 'ArrowRight':
    case 'd':
    atributoMokeponElegido.velocidadX = velocidadMokepon //Se mueve de a 5 pixeles al mismo tiempo
    //Nos evita usar atributoMokeponElegido.x = atributoMokeponElegido.x +5 o atributoMokeponElegido.x += 5 pues queremos mover al mokepon de a 5 pixeles manteniendo el click. 
    btnDerecha.style.backgroundColor = 'aliceblue'
    break;
    case 'ArrowLeft':
    case 'a':
    atributoMokeponElegido.velocidadX = -velocidadMokepon
    btnIzquierda.style.backgroundColor = 'aliceblue'
    break;
    default:
    btnDerecha.style.backgroundColor = '#dea73e'
    break;
    }
    if ((teclaPresionada['ArrowLeft'] && key == 'ArrowDown') || (teclaPresionada['a'] && key == 's')){
    atributoMokeponElegido.velocidadX = -0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadY = 0.1*velocidadMokepon;
    } else if ((teclaPresionada['ArrowDown'] && key == 'ArrowLeft') || (teclaPresionada['s'] && key == 'a')){
    atributoMokeponElegido.velocidadY = 0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadX = -0.1*velocidadMokepon;
    } else if ((teclaPresionada['ArrowLeft'] && key == 'ArrowUp') || (teclaPresionada['a'] && key == 'w')){
    atributoMokeponElegido.velocidadX = -0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadY = -0.1*velocidadMokepon;
    } else if ((teclaPresionada['ArrowUp'] && key == 'ArrowLeft') || (teclaPresionada['w']  && key == 'a')) {
    atributoMokeponElegido.velocidadY = -0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadX = -0.1*velocidadMokepon;
    } else if ((teclaPresionada['ArrowUp'] && key == 'ArrowRight') || (teclaPresionada['w'] && key == 'd')) {
    atributoMokeponElegido.velocidadY = -0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadX = 0.1*velocidadMokepon;
    } else if ((teclaPresionada['ArrowRight'] && key == 'ArrowUp') || (teclaPresionada['d'] && key == 'w')){
    atributoMokeponElegido.velocidadX = 0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadY = -0.5;
    } else if ((teclaPresionada['ArrowDown'] && key == 'ArrowRight') || (teclaPresionada['s'] && key == 'd')){
    atributoMokeponElegido.velocidadY = 0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadX = 0.1*velocidadMokepon;
    } else if ((teclaPresionada['ArrowRight'] && key == 'ArrowDown') || (teclaPresionada['d'] && key == 's')){
    atributoMokeponElegido.velocidadX = 0.1*velocidadMokepon;
    atributoMokeponElegido.velocidadY = 0.1*velocidadMokepon;
    }
    //en el caso de que se presionen 2 teclas al mismo tiempo, se reduce la velocidad y el orden importa  
     // console.log({event}) El evento entre llaves {} nos muesra las propiedades, tambien funciona con e.code o antiguamente e.keyCode
}

function revisarColision(rivalMapa){
  const arribaRival = rivalMapa.y //el enemigo se comienza a pintar de arriba hacia abajo 
  const abajoRival = rivalMapa.y + rivalMapa.alto
  const derechaRival = rivalMapa.x + rivalMapa.ancho 
  const izquierdaRival = rivalMapa.x //el enemigo se comienza a pintar de izquierda a derecha

  const arribaMokepon = 
  atributoMokeponElegido.y //el enemigo se comienza a pintar de arriba hacia abajo 
  const abajoMokepon = 
  atributoMokeponElegido.y + atributoMokeponElegido.alto
  const derechaMokepon = 
  atributoMokeponElegido.x + atributoMokeponElegido.ancho 
  const izquierdaMokepon = 
  atributoMokeponElegido.x //el enemigo se comienza a pintar de izquierda a derecha
  //profundizar en cursos de plazi de colisiones dentro de videojuegos para cuando la imagen tenga bordes que no sean cuadrados.
  
  if(
    abajoMokepon < arribaRival  ||
    arribaMokepon > abajoRival  ||
    derechaMokepon < izquierdaRival ||
    izquierdaMokepon > derechaRival ) {
    return //No hubo colision del mokepon del jugador con un mokepon rival.
    }
  
  detenerMovimiento()
  clearInterval(intervalo)

  /*clearTimeout(timerId); // Prevents the function from executing*/
  console.log('Se detecto una colision con ' + rivalMapa.nombre);
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none'
  seleccionarMokeponRival(ataqueDisponible,rivalMapa)
}

  function detenerMovimiento() {
    atributoMokeponElegido.velocidadX = 0
    atributoMokeponElegido.velocidadY = 0
    lienzo.clearRect(0,0,mapa.width, mapa.height) //Antes de ejecutar la funcion para pintar se limpia todo el mapa.

    btnArriba.style.backgroundColor = '#dea73e'
    btnAbajo.style.backgroundColor = '#dea73e'
    btnIzquierda.style.backgroundColor = '#dea73e'
    btnDerecha.style.backgroundColor = '#dea73e'
    
  }

//Funcion de escucha del evento load del documento y evento click del boton
window.addEventListener('load', iniciarJuego)

window.addEventListener('keydown', function(event) {
  teclaPresionada[event.key] = true;
  moverMokepon(event);
});
window.addEventListener('keyup', function(event) {
  teclaPresionada[event.key] = false;
  detenerMovimiento();
});
