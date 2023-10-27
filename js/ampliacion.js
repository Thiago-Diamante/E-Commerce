function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

const id = getURLParameter('id');
const nombre = getURLParameter('nombre');
const descripcion = getURLParameter('descripcion');
const categoria = getURLParameter('categoria');
const imagen = getURLParameter('imagen');
const precio = getURLParameter('precio');

if (id && nombre && descripcion && categoria && imagen && precio) {
    const detalleProducto = document.getElementById('detalle-producto');
    detalleProducto.innerHTML = `<li><img src="${imagen}"></li>
                                 <li><i>Nombre:</i> ${nombre}</li>
                                 <li><i>Descripcion:</i> ${descripcion}</li>
                                 <li><i>Categoria:</i> ${categoria}</li>
                                 <li><i>Precio:</i> $${precio}</li>`;
} else {
    detalleProducto.innerHTML = 'No se han proporcionado detalles del producto.';
};

const botonAgregar = document.getElementById('botonAgregar');

botonAgregar.addEventListener('click', () =>{
    let producto = { nombre, precio };
    let productoMod = JSON.stringify(producto);
    localStorage.setItem(`${nombre}`, productoMod);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 2500
      })
})

