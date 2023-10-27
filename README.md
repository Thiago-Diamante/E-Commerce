# ***Documentacion de E-commerce*** 

## ***Inicio***
Al iniciar el proyecto podemos visualizar un titulo con su logo y a continuacion un listado de productos el cual es traido desde un archivo ***JSON*** local mediante la funcion ***FETCH*** de manera asincrona utilizando ***AJAX*** simulando el pedido a un servidor externo, a continuacion se muestra la funcion:
```javascript
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
```
Dentro de la misma funcion se utiliza un ***EVENTO*** de click en el cual al presionar el icono de (**Agregar**) nos redirecciona a otra ventana en donde podemos ver mas detalles del producto especifico pasados mediante parametros de URL:
```javascript
mostrarImg.addEventListener('click', () => {
                    window.location.href = `ampliacion.html?id=${producto.id}&nombre=${producto.nombre}&descripcion=${producto.descripcion}&categoria=${producto.categoria}&imagen=${producto.imagen}&precio=${producto.precio}`;
                });
```
Por ultimo al final de la pagina se encuentra un boton (**Ver el carrito**) el cual nos redirecciona a la ventana del carrito donde veremos los productos agregados alli.

---

## ***Detalles del producto***

En la ventana donde se muestran los datalles del producto especifico al cual hemos hecho referencia se capturan los parametros de URL recibidos desde la ventana de inicio y se muestran todos los detalles del producto:
```javascript
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
```
Luego de mostrar los datalles se muestra un boton de (**Agregar al carrito**) en el cual al presionar agrega los datalles de dicho producto al ***localStorage*** y por consiguiente muestra una alerta realizada con ***SweetAlert*** informando el agregado con exito:
```javascript
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
```
---

## ***Carrito***

Como se explico anteriormente, al final de la ventana de inicio se encuentra un boton para redireccionar y visualizar el carrito, en el se realiza una iteracion del ***localStorage*** para mostrar los productos agregados con sus respectivos precios y la suma total de los mismos para realizar la compra:
```javascript
async function manejocarrito(){
for(let i = 0; i < localStorage.length; i++){
    let clave = localStorage.key(i);
    let valor = localStorage.getItem(clave);

    var objeto = JSON.parse(valor);
    
    const listaItem = document.createElement('li');
    listaItem.innerHTML = `<p><i>Nombre:</i> ${objeto.nombre}</p>
                           <p><i>Precio:</i> $${objeto.precio}</p>
                           <img src="./multimedia/eliminar.png" class="eliminar">`

    lista.appendChild(listaItem);

    const eliminarImg = listaItem.querySelector('.eliminar');
    eliminarImg.addEventListener('click', async ()=> {
    localStorage.removeItem(clave);
    location.reload();
    })

    let total = sumaPrecios += Math.round(parseFloat(objeto.precio));
    precioTotal.textContent = `Compra total: $${total}`;
}};
```
Dentro de la misma funcion tambien se encuentra un ***EVENTO*** de click sobre el boton (**Eliminar**) el cual quita dicho producto del carrito.

Al final, se encuentra el boton de (**Comprar**), el cual primero cuenta los elementos dentro del ***localStorage***, en el caso de que no haya productos agregados no dejara realizar la compra, de lo contario saldra la alerta de compra exitosa:
```javascript
function comprarProductos(){
    if(localStorage.length === 0){
        lista.innerHTML = '<li class="carritoVacio">El carrito esta vacio...</li>'
    } else {
        comprar.addEventListener('click', () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada',
                showConfirmButton: false,
                timer: 2500
              })
            setTimeout(() => {
                localStorage.clear();
                location.reload();
            }, 3000);
        })
    }
}
```
---

## Espero que les guste
* Alumno: Thiago Diamante
* Email: thiagodiamante5@gmail.com# PROYECTO-FINAL-FRONT
