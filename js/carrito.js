const lista = document.getElementById('carrito');
const precioTotal = document.getElementById('total');
const comprar = document.getElementById('comprar');
let sumaPrecios = 0;

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

manejocarrito();
comprarProductos();



