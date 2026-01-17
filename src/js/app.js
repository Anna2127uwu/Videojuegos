let todosLosVideojuegos = [];
let todasLasNoticias = [];

const menuHamburguesa = document.getElementById('menu-hamburguesa');
const menuLinks = document.getElementById('menu-links');

menuHamburguesa.addEventListener('click', () => {
    menuLinks.classList.toggle('show');
});

// Hero dinámico con autoplay y clic en cards
const hero = document.querySelector('.hero');
const title = document.getElementById('hero-title');
const desc = document.getElementById('hero-desc');
const cards = document.querySelectorAll('.card');

let index = 0;
const changeHero = (card) => {
    hero.style.backgroundImage = `url(${card.dataset.bg})`;
    title.textContent = card.dataset.title;
    desc.textContent = card.dataset.desc;
};

// Cambiar con clic
cards.forEach((card, i) => {
    card.addEventListener('click', () => {
        index = i;
        changeHero(card);
    });
});

// Autoplay cada 5s
setInterval(() => {
    index = (index + 1) % cards.length;
    changeHero(cards[index]);
}, 5000);

// Inicial
changeHero(cards[0]);

document.addEventListener('DOMContentLoaded', function () {
    obtenerJsonCategorias();
    obtenerJson();
    obtenerJsonNoticias();
});

function obtenerJson() {
    fetch('/data/videojuegos.json')
        .then((responde) => responde.json())
        .then((videojuegos) => {
            todosLosVideojuegos = videojuegos;
            mostrarVideojuegos(videojuegos, 'catalogoPrincipal');
            document.querySelectorAll('.btn-catalogo').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const categoria = btn.dataset.text;
                    console.log('clic boton');
                    filtrarVideojuegos(categoria);
                });
            });
        })
        .catch((error) =>
            console.error('Error cargando el JSON de videojuegos', error)
        );
}

function mostrarVideojuegos(videojuegos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = '';
    videojuegos.forEach((videojuego) => {
        const tarjetaVideojuego = crearTarjetaCatalogo(videojuego);
        contenedor.appendChild(tarjetaVideojuego);
    });
}

function filtrarVideojuegos(categoria) {
    const contenedor = document.getElementById('catalogoPrincipal');
    contenedor.innerHTML = '';
    let filtrados;
    if (categoria === 'Todos') {
        filtrados = todosLosVideojuegos;
    } else {
        filtrados = todosLosVideojuegos.filter(
            (v) => v.categoria === categoria
        );
    }
    mostrarVideojuegos(filtrados, 'catalogoPrincipal');
}

function crearModal(videojuegos, idmodal) {
    const contenedor_modal = document.getElementById(idmodal);
    const overlay = document.getElementById('modal-cont');
    contenedor_modal.innerHTML = '';

    const contenedor_cierre = document.createElement('span');
    contenedor_cierre.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
        </svg>
    `;

    contenedor_cierre.addEventListener('click', () => {
        overlay.style.display = 'none';
        contenedor_modal.innerHTML = '';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            contenedor_modal.innerHTML = '';
        }
    });

    const contenedor_info = document.createElement('div');
    contenedor_info.classList.add('cont-modal');
    contenedor_info.innerHTML = `
        <div class="info-fila">
        <div class="info-trailer">
            <iframe src="${videojuegos.trailer}" allow="autoplay; encrypted-media" allowfullscreen frameborder="0"></iframe>
        </div>
        <div class="info-videojuego">
            <h2>${videojuegos.nombre}</h2>
            <p>Desarrolladora: ${videojuegos.Desarrolladora}</p>
            <p>Categoría: ${videojuegos.categoria}</p>
            <p>Clasificación: ${videojuegos.clasificacion}</p>
        </div>
        </div>
        <div class="info-column">
        <div class="info-sinopsis">
            <p>${videojuegos.Sinopsis}</p>
        </div>
        </div>
    `;

    contenedor_modal.append(contenedor_cierre);
    contenedor_modal.append(contenedor_info);
}

function crearTarjetaCatalogo(videojuegos) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card-catalogo');

    const cont = document.createElement('div');
    cont.classList.add('contenedor');
    tarjeta.appendChild(cont);

    const cont_img = document.createElement('div');
    cont_img.classList.add('cont-image');
    cont_img.innerHTML = `
        <img src="${videojuegos.img}" alt="${videojuegos.alt}" />
        <img src="${videojuegos.img2}" />
    `;
    cont.appendChild(cont_img);

    const cont_info = document.createElement('div');
    cont_info.classList.add('cont-info');
    cont_info.innerHTML = `
        <p>${videojuegos.nombre}</p>
        <p>${videojuegos.categoria}</p>
        <p>- ${videojuegos.descuento}%</p>
        <p>$${videojuegos.Precio}</p>
    `;
    cont.appendChild(cont_info);

    cont_img.addEventListener('click', () => {
        const modal = document.getElementById('modal-cont');
        console.log('doy clicl');
        modal.style.display = 'flex';
        crearModal(videojuegos, 'modal');
    });

    const con_etiq = document.createElement('div');
    con_etiq.classList.add('cont-etiquetas');
    videojuegos.Plataformas.forEach((etq) => {
        const divEtiqueta = document.createElement('div');
        divEtiqueta.textContent = etq;
        con_etiq.appendChild(divEtiqueta);
    });

    tarjeta.appendChild(con_etiq);
    return tarjeta;
}

function obtenerJsonNoticias() {
    fetch('/data/noticias.json')
        .then((responde) => responde.json())
        .then((noticias) => {
            todasLasNoticias = noticias;
            noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            console.log('ordene las noticias');
            mostrarNoticiasPrincipales(
                noticias.slice(0, 2),
                'cont-noticias-prin'
            );
            mostrarNoticiasMini(noticias.slice(2), 'cont-noticias-mini');
        })
        .catch((error) =>
            console.error('Error cargando el JSON de noticias', error)
        );
}

function mostrarNoticiasPrincipales(noticias, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    noticias.forEach((noticia) => {
        const article = document.createElement('article');
        article.classList.add('noticia');
        article.innerHTML = `
        <div class="noticia-img">
            <img src="${noticia.img}" alt="${noticia.alt}" />
            <h4 class="noticia-titulo">${noticia.titulo}</h4>
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

function mostrarNoticiasMini(noticias, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    noticias.forEach((noticia) => {
        const divmini = document.createElement('div');
        divmini.classList.add('noticia-mini');
        divmini.innerHTML = `
        <div class="cont-img">
            <img src="${noticia.img}" alt="${noticia.alt}">
        </div>
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

function obtenerJsonCategorias() {
    fetch('/data/categoria.json')
        .then((res) => res.json())
        .then((categorias) => {
            mostrarCategorias(categorias);
        })
        .catch((error) =>
            console.error('Error cargando JSON de categorías', error)
        );
}

function mostrarCategorias(categorias) {
    const pantalla = document.querySelector('.cont-pantalla img');
    const contInfo = document.querySelector('.cont-info');

    let indice = 0;

    function actualizarCategoria() {
        const cat = categorias[indice];
        pantalla.src = cat.img;
        pantalla.alt = cat.alt;
        contInfo.innerHTML = `
        <h1>${cat.categoria}</h1>
        <h2>¿Qué son los videojuegos de ${cat.categoria}?</h2>
        <p>${cat.informacion}</p>
        <h2>¿Qué experimentarás?</h2>
        <p> ${cat.experiencia}</p>
        <h2>¿Sabías qué?</h2>
        <p> ${cat.curiosidad}</p>
        `;
    }

    // Inicial
    actualizarCategoria();

    // Botones
    const btns = document.querySelectorAll('.cont-btn button');
    btns[0].addEventListener('click', () => {
        indice = (indice - 1 + categorias.length) % categorias.length;
        actualizarCategoria();
    });
    btns[1].addEventListener('click', () => {
        indice = (indice + 1) % categorias.length;
        actualizarCategoria();
    });
}
