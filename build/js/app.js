let todosLosVideojuegos=[];

document.addEventListener('DOMContentLoaded', function(){
    console.log('hola');
    obtenerJson();
    console.log('hola');
})

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
        <p> - ${videojuegos.descuento}%</p>
        <p> $${videojuegos.Precio}</p>
    `;
    cont.appendChild(cont_info);
    const con_etiq= document.createElement('div');
    con_etiq.classList.add('cont-etiquetas');
    videojuegos.Plataformas.forEach(etq =>{
        const divEtiqueta= document.createElement('div');
        divEtiqueta.textContent=etq;
        con_etiq.appendChild(divEtiqueta);

    }
    );
    tarjeta.appendChild(con_etiq);
    return tarjeta;
}


let todasLasNoticias=[];

function obtenerJsonNoticias(){
    fetch('data/noticias.json')
    //creando promesa
    .then(responde=>responde.json())
    .then(noticias=>{
        todasLasNoticias=noticias;

        //Ordenamos las noticias por fecha (de más reciente a más antigua)
        noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    mostrarNoticiasPrincipales(noticias.slice(0, 2), 'noticias-grid'); // primeras 2 como principales
    mostrarNoticiasMini(noticias.slice(2), 'noticiasminis-grid');
    })
    .catch(error=> console.error('Error cargando el JSON de noticias', error))
}


function mostrarNoticiasPrincipales(noticias, contenedorId){
    const contenedor=document.getElementById(contenedorId);
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas noticias
    noticias.forEach( noticia=> {
        const article = document.createElement('article');
        article.classList.add('noticia');

        article.innerHTML=`
            <div class="noticia-img">
                <img src="${noticia.img}" alt=" ${noticia.alt}"/>
                <h4 class = "noticia-titulo">${noticia.titulo}</h4>
            </div>
            <div class="noticia-meta">
                <p class="noticia-fecha">${noticia.fecha}</p>
                <p class="noticia-autor">${noticia.autor}</p>
            </div>
            <p class="noticia-desc">${noticia.descripcion}</p>
            <a href="${noticia.link}" class="noticia-link">Más información</a>
        `;
        contenedor.appendChild(article);
    });

}

function mostrarNoticiasMini(noticias, contenedorId){   
const contenedor=document.getElementById(contenedorId);
noticias.forEach( noticia=> {
    const divmini = document.createElement('div');
    divmini.classList.add('noticia-mini');

    divmini.innerHTML=`
        <img src="${noticia.img}" alt="${noticia.alt}">
        <div class="noticia-mini-contenido">
            <h4 class="noticia-titulo">${noticia.titulo}</h4>
            <div class="noticia-meta">
                <p class="noticia-fecha">${noticia.fecha}</p>
                <p class="noticia-autor">${noticia.autor}</p>
            </div>
            <p class="noticia-desc">${noticia.descripcion}</p>
            <a href="${noticia.link}" class="noticia-link">Más información</a>
        </div>
    `;
    contenedor.appendChild(divmini);
});
}