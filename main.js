import './style.css';


//!PRIMER EJERCICIO 
/* Ejercicio 1: Obtener un chiste aleatorio

API: Utiliza la API gratuita de chistes de https://icanhazdadjoke.com/
Tarea:
Realiza una petición GET a la API.
Extrae el texto del chiste de la respuesta JSON.
Muestra el chiste en un elemento HTML (por ejemplo, un <div> con el id "chiste"). */


async function peticionGet1() {
 
    const urlChiste = 'https://icanhazdadjoke.com/'
    try {
        const optionChiste = {
        headers: {'Accept': 'application/json'
        }}

         const respuesta = await fetch(urlChiste, optionChiste)

         if(!respuesta.ok){
            throw new Error('algo no salio bien', respuesta.status)
         }

         const dataChiste = await respuesta.json()
         const parrafoChiste = document.createElement('p')
        parrafoChiste.innerText = dataChiste.joke
        document.body.appendChild(parrafoChiste)
        
    } catch (error) {
        console.error ('[peticionGet1]', error )
        
    }
    
}
peticionGet1()


//!EJERCICIO 2

/* Ejercicio 2: Listar publicaciones de un blog

API: Utiliza la API JSONPlaceholder (https://jsonplaceholder.typicode.com/posts)
Tarea:
Realiza una petición GET a la API para obtener una lista de publicaciones.
Opcional: Muestra el título y un extracto de cada publicación en una lista HTML.
Opcional: Agrega un enlace a cada publicación que lleve a una página con los detalles completos (puedes usar un id ficticio para la URL).
 */

async function peticionGet2() {

    const urlPosts = 'https://jsonplaceholder.typicode.com/posts/'
    try {

        const respuestaPosts = await fetch (urlPosts)

        if(!respuestaPosts){
            throw new Error ('no se pudo completar la peticion', respuestaPosts.status)
        }
        
        const dataLista = await respuestaPosts.json()
        console.log(dataLista)

       dataLista.forEach(lista => {
        const ulPosts = document.createElement('ul')
        const liPosts = document.createElement('li')
        const h2Posts = document.createElement('h2')
        const ParrafoPosts = document.createElement('p')
        const enlacePosts = document.createElement ('a')
        liPosts.appendChild(h2Posts)
        liPosts.appendChild(ParrafoPosts)
        liPosts.appendChild(enlacePosts)
        ulPosts.appendChild(liPosts)

        


        h2Posts.innerText = lista.title;
        ParrafoPosts.innerText = lista.body;
        enlacePosts.innerText = 'lerr mas detalles '
        enlacePosts.href= `https://jsonplaceholder.typicode.com/posts/${lista.id}`

        document.body.appendChild(ulPosts)
        
       });

    
    } catch (error) {   console.error ('[peticionGet2]', error )
        
    }
    
}

peticionGet2()

//!EJERCICIO 3

/* 
Ejercicio 3: Buscador de películas

API: OMDb API (http://www.omdbapi.com/) (necesitarás una clave API gratuita)
Tarea:
Crea un formulario con un campo de búsqueda para que el usuario ingrese el título de una película.
Al enviar el formulario, realiza una petición a la API OMDb con el título ingresado.
Opcional: Muestra los resultados (título, póster, año, etc.) en una lista o cuadrícula. */


    const formularioPelicula = document.querySelector('#formularioBusqueda')
    //console.log(formularioPelicula)

    formularioPelicula.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const buscarPelicula = document.querySelector('#buscarPelicula').value;
    
       
    // console.log('me hicieron click')
         await peticionGet3(buscarPelicula)
    
    })
//https://www.omdbapi.com/?i=tt3896198&apikey=b4693abe


 async function  peticionGet3 (buscarPelicula) {

    try {    

        const urlPelicula = 'http://www.omdbapi.com/'
        const UrlPeticionPelicula = `${urlPelicula}?t=${encodeURIComponent(buscarPelicula)}&apikey=${import.meta.env.VITE_API_KEY}`;
        console.log(UrlPeticionPelicula)

    const respuesta = await fetch (UrlPeticionPelicula)
    if(!respuesta.ok){
     throw new Error ('algo salio mal', respuesta.status)
    }
        
   const dataPelicula = await respuesta.json()
   console.log(dataPelicula)

   const divPelicula = document.createElement('div')
   const ulPelicula = document.createElement('ul')
   const liPelicula = document.createElement('li')
   const imgPelicula = document.createElement('img')
   const h2Pelicula = document.createElement('h2')
   const p1Pelicula = document.createElement('p')
   const p2Pelicula = document.createElement('p')
   const p3Pelicula = document.createElement('p')
   const p4Pelicula = document.createElement('p')

   divPelicula.appendChild(ulPelicula)
   ulPelicula.appendChild(liPelicula)
   liPelicula.appendChild(h2Pelicula)
   liPelicula.appendChild(p1Pelicula)
   liPelicula.appendChild(p2Pelicula)
   liPelicula.appendChild(p3Pelicula)
   liPelicula.appendChild(p4Pelicula)
   liPelicula.appendChild(imgPelicula)

   h2Pelicula.innerText = dataPelicula.Title
   p1Pelicula.innerText = dataPelicula.Year
   p2Pelicula.innerText = dataPelicula.Released
   p3Pelicula.innerText = dataPelicula.Genre
   p4Pelicula.innerText = dataPelicula.Language

   imgPelicula.src =  dataPelicula.Poster

document.body.appendChild(divPelicula)
   
   
   
   console.log(divPelicula)




    } catch (error) {
        console.error('[peticionGet3]', error)
        
    }
   
} 


//! Ejercicio 4: Buscador de imágenes aleatorias

/* 
API: Unsplash API (https://unsplash.com/developers) (necesitarás una clave API gratuita)
Tarea:
Crea un formulario con un campo de búsqueda para que el usuario ingrese la palabra a buscar.
Al enviar el formulario, realiza una petición a la unsplash con el título ingresado.
Opcional: Mostrar en formato galeria las imagenes recibidas por la API. */




const formularioBuscarFoto = document.querySelector('#formularioBusquedaFotos');
formularioBuscarFoto.addEventListener('submit', async (eventoFoto) => {
    eventoFoto.preventDefault();

    const inputFoto = document.querySelector('#buscarFoto').value;
    console.log(inputFoto);

    await peticionGet4(inputFoto);
});

// https://api.unsplash.com/search/photos/?query=YOUR_QUERY&client_id=YOUR_ACCESS_KEY

async function peticionGet4(inputFoto) {
    try {
        const urlUnsplash = 'https://api.unsplash.com/search/photos/';
        const urlFoto = `${urlUnsplash}?query=${encodeURIComponent(inputFoto)}&client_id=${import.meta.env.VITE_API_KEY}`;
        console.log(urlFoto);
        
        const respuesta = await fetch(urlFoto);
        if (!respuesta.ok) {
            throw new Error('Algo salió mal: ' + respuesta.status);
        }

        const dataFoto = await respuesta.json();
        console.log(dataFoto);

        mostrarGaleria(dataFoto.results);
    } catch (error) {
        console.error('Hubo un error al buscar la foto', error);
    }
}

function mostrarGaleria(fotos) {
    const galeria = document.querySelector('#galeria');
    galeria.innerHTML = '';
    fotos.forEach(foto => {
        const divFoto = document.createElement('div');
        divFoto.classList.add('foto'); 

        const imgFoto = document.createElement('img');
        imgFoto.src = foto.urls.thumb;
        imgFoto.alt = foto.alt_description;

        divFoto.appendChild(imgFoto);
        galeria.appendChild(divFoto);
    });
}



