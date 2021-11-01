
const form = document.getElementById('form')
const template = document.getElementById('template-cards').content
const items = document.getElementById('items');
let editar = 0;

const fragment = document.createDocumentFragment()

let img = document.getElementById('url')
let nombre = document.getElementById('nombre')
let description = document.getElementById('description')


const url = 'http://localhost:3004/Tarea'


document.addEventListener('DOMContentLoaded', getAxios())

form.addEventListener('submit', (e) => {
    e.preventDefault()
    capturas()
    Buscar()
})

function capturas() {
    let imagen = img.value
    let nom = nombre.value
    let des = description.value

    if (editar == 0) {
        crearTaks(imagen, nom, des)
    } else {
        Actualizar(editar, imagen, nom, des)
    }

}

function getAxios() {
    return axios.get(url)
        .then(({ data }) => {
            loadData(data)
        })
}


function crearTaks(img, nombre, description) {
    axios.post(url, { img, nombre, description })
        .then(data => console.log(data))
        .catch(console.warn)
}

function Buscar(id) {
    return axios.get(`${url}/${id}`)
        .then(({ data }) => {
            console.log(data);
            img.value = data.img
            nombre.value = data.nombre
            description.value = data.description
        })
}

function Actualizar(id, img, nombre, description) {
    axios.put(`${url}/${id}`, { img, nombre, description })
        .then(data => console.log(data))
        .catch(console.warn)
}


function eliminarPerfil(id) {
    axios.delete(`${url}/${id}`)
        .then(data => console.log(data))
        .catch(console.warn)
}


const loadData = data => {
    data.forEach(personaje => {
        const { id, nombre, img } = personaje;
        console.log(id)
        template.querySelector('span').textContent = nombre;
        template.querySelector('img').setAttribute('src', img);
        template.querySelector('.Edit').dataset.id = id;
        template.querySelector('.delete').dataset.id = id;
        template.querySelector('.material-icons').dataset.id = id;
        template.querySelector('.Delete').dataset.id = id;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);
}

items.addEventListener('click', (e) => {
    console.log(e.target.classList)
    if (e.target.classList.contains('edit')) {
        console.log(e.target.dataset.id)
        const id = e.target.dataset.id
        editar = id;
        Buscar(id)
    } else if (e.target.classList.contains('delete')) {
        console.log(e.target.dataset.id)
        const id = e.target.dataset.id
        eliminarPerfil(id)
    }
})