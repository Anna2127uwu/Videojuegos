let todosLosVideojuegos=[];

function obtenerJson(){
    fetch('data/videojuegos.json')
    //creando promesa
    .then(responde=>responde.json())
    .then(videojuegos=>{
        todosLosVideojuegos=videojuegos;
        mostrarVideojuegos(videojuegos, 'catalogoPrincipal');
    })
    .catch(error=> console.error('Error cargando el JSON de videojuegos', error))
}

function mostrarVideojuegos(videojuegos, contenedorId){
    const contenedor=document.getElementById(contenedorId);
    videojuegos.forEach( videojuegos=> {
        //Mezclamos videojuegos
        //const mezcladas = videojuegos.sort(()=> 0.5 - Math.random());
        const tarjetaVideojuego = crearTarjetaCatalogo(videojuegos);
        contenedor.appendChild(tarjetaVideojuego);
        
    });
}

function crearTarjetaCatalogo(videojuegos){
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card-catalogo');
    const cont = document.createElement('div');
    cont.classList.add('contenedor');
    tarjeta.appendChild(cont);
    const cont_img = document.createElement('div');
    cont_img.classList.add('cont-image');
    cont_img.innerHTML=`
        <img src="${videojuegos.img}" alt=" ${videojuegos.alt}"/>
    `;
    cont.appendChild(cont_img);
    const cont_info= document.createElement('div');
    cont_info.classList.add('cont-info');
    cont_info.innerHTML=` 
        <p> ${videojuegos.nombre}</p>
        <p> ${videojuegos.categoria}</p>
        <p> ${videojuegos.descuento}</p>
        <p> ${videojuegos.precio}</p>
    `;
    cont.appendChild(cont_info);
    const con_etiq= document.createElement('div');
    con_etiq.classList.add('cont-etiquetas');
}

