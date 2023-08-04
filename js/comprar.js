




//   LIBRERIA PARA TARJETA DE CREDITO





new Cleave('#inputNumeroDeTarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        console.log('Credit card type changed: ', type);
    }
})






// FUNCION PARA MOSTRAR LOS PRODUCTOS QUE SE VAN A COMPRAR






const contenedor = document.querySelector("#contenedor");
const titulo = document.querySelector("#titulo");
const boton = document.querySelector("#boton");


boton.addEventListener(("click"), () => {
    window.location.href = "http://192.168.0.17:8080"
})


function mostrarProductoComprado() {
    const carrito = JSON.parse(sessionStorage.getItem("Carrito")) || [];
    titulo.innerHTML = `<h2>Tus Productos:<h2>`
    let html = "";
    total = 0
    html += `<ul>`;
    for (producto of carrito) {
        html += `
        <li>${producto.nombre} $${producto.precio} X${producto.cantidad} </li>`;
    }
    html += `</ul>`;
    for(producto of carrito){
        total += producto.precio * producto.cantidad
    }
    html += `<p>Tu precio total es de: $${total}</p>`
    contenedor.innerHTML = html;
}
    
mostrarProductoComprado()


function vaciarElCarritoAlTerminarLaCompra(){
    sessionStorage.clear("Carrito")
}






//FUNCION PARA TERMINAR EL PROCESO DE COMPRA







const inputNombre = document.querySelector ("#inputNombre"),
inputCorreoElectronico = document.querySelector ("#inputCorreoElectronico"),
inputNumeroTelefonico = document.querySelector ("#inputNumeroTelefonico"),
inputNumeroDeTarjeta = document.querySelector ("#inputNumeroDeTarjeta"),
inputFechaDeVencimiento = document.querySelector ("#inputFechaDeVencimiento"),
formulario = document.querySelector (".formulario")


function terminarProcesoDeCompra(){
    document.querySelector("#botonParaFinalizarCompra").addEventListener("click", (e) => {
        e.preventDefault()
        
        if(inputNombre.value == "" || inputCorreoElectronico.value == "" || inputNumeroTelefonico.value == "" || inputNumeroDeTarjeta.value == "" || inputFechaDeVencimiento.value == ""){
            Toastify({
                text: "Por favor rellena los campos",
                duration: 1500,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "center", 
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right,#b06700, #a58e28 )",
                },
                onClick: function (){} 
              }).showToast();
        }
        else{
            Swal.fire(
                `¡Listo ${ inputNombre.value}!`,
                "Gracias por tu compra! ¡Esperamos que la disfrutes!",
                "success"
            )
            sessionStorage.removeItem("Carrito")
        
            setTimeout(() => {
                window.open("http://192.168.0.17:8080")
            }, 4000)
        }
        
        
        
    })
}

terminarProcesoDeCompra()
vaciarElCarritoAlTerminarLaCompra()