async function traerYmandarProductos() {
    await fetch('productos.json')
        .then(response => response.json()) 
        .then(data => {
            const listaProductos = document.getElementById('lista-productos');
            data.forEach(producto => {
                const li = document.createElement('li');
                li.innerHTML = `<P>${producto.nombre}</p><p>$${producto.precio}</p><img src="./multimedia/agregar.png" class="mostrar">`;
                const mostrarImg = li.querySelector('.mostrar');
                mostrarImg.addEventListener('click', () => {
                    window.location.href = `ampliacion.html?id=${producto.id}&nombre=${producto.nombre}&descripcion=${producto.descripcion}&categoria=${producto.categoria}&imagen=${producto.imagen}&precio=${producto.precio}`;
                });
        
                listaProductos.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar los productos: ', error));
};

traerYmandarProductos();