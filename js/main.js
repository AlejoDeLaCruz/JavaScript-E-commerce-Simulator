
//////////////////////////////////////           SIMULADOR DE VENTAS ONLINE           ////////////////////////////////////////








//BUSCADOR DE PRODUCTOS:






//FUNCION FETCH PARA LLAMAR PRODUCTOS:






let productos = []

async function llamarProductosPorFetch() {
    const respuesta = await fetch("./data/productos.json")
    return await respuesta.json()
}

llamarProductosPorFetch().then(data => {
    productos = data
})








//PRECIO MAXIMO Y MINIMO:










const precioMaximo = document.querySelector("#precioMaximo");
const precioMinimo = document.querySelector("#precioMinimo");
const inputMaxMin = document.querySelector("#inputMaxMin");


function filtrarPrecio() {
    return productos.filter(producto => {
        // Si no hay maximo, buscar que sean mayores al minimo
        if (precioMaximo.value == "") return producto.precio >= precioMinimo.value
        // Si no hay minimo, buscar que sean menores al maximo
        if (precioMinimo.value == "") return producto.precio <= precioMaximo.value
        // Si hay minimo y maximo...
        return producto.precio >= precioMinimo.value && producto.precio <= precioMaximo.value;
    })
}

inputMaxMin.addEventListener('change', () => {
    botonBuscar.focus()
})










//FUNCIONALIDAD DEL BOTON BUSCAR:







const inputProducto = document.querySelector("#inputGroupSelect04"),
botonBuscar = document.querySelector("#botonBuscar"),
card = document.querySelector(".card"),
subtitulo = document.querySelector("#subtitulo"),
contenedor = document.querySelector("#contenedor")



botonBuscar.addEventListener("click", ()=>{
    let productosBuscados = productos

        if (precioMinimo.value != '' || precioMaximo.value != '') productosBuscados = filtrarPrecio()

        if (inputProducto.value === "Placares"){
            subtitulo.innerText = `Elegiste ${inputProducto.value}, estos son los diferentes tipos:` 

            contenedor.innerHTML  = ""
            
            for (producto of productosBuscados) {

                if (producto.tipo === "Placard"){
                
                contenedor.innerHTML += `
                <div class="card">
                <img src="${producto.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button onclick="agregarAlCarrito('${producto.id}'), avisoDeProductoAgregado()" class="btn-btn-primary">Agregar al carrito</button>           
                </div>
                </div>
                `
            }   
        }
        
    }
    
        
        else if (inputProducto.value == "Cocinas"){
            subtitulo.innerText = `Elegiste ${inputProducto.value}, estos son los diferentes tipos:`
            
            contenedor.innerHTML  = ""

            for (producto of productosBuscados) {

                if (producto.tipo == "Cocina"){
                
                contenedor.innerHTML += `
                <div class="card">
                <img src="${producto.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button onclick="agregarAlCarrito('${producto.id}'), avisoDeProductoAgregado()" class="btn-btn-primary">Agregar al carrito</button>          
                </div>
                </div>`
            }   
        }
    }

        else if (inputProducto.value == "Decoraciones"){
            subtitulo.innerText = `Elegiste ${inputProducto.value}, estos son los diferentes tipos:` 
            
            contenedor.innerHTML  = ""
            
            for (producto of productosBuscados) {

                if (producto.tipo == "Decoracion"){
                
                contenedor.innerHTML += `
                <div class="card">
                <img src="${producto.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button onclick="agregarAlCarrito('${producto.id}'), avisoDeProductoAgregado()" class="btn-btn-primary">Agregar al carrito</button>           
                </div>
                </div>`
            }   
        }
        
    }
    
    filtrarPrecio()
})  







//EVENTO PARA LA TECLA ENTER EN EL BUSCADOR:







inputProducto.addEventListener('change', () => {
    botonBuscar.focus()
})










//ALERT DE QUE AGREGASTE AL STORAGE:






function avisoDeProductoAgregado(){
    Toastify({
        text: "Agregaste un producto al Carrito",
        duration: 1500,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,#b09300 ,#96c93d )",
        },
        onClick: function (){
        modal_container_carrito.classList.add('show'); 

        tituloCarrito.innerHTML = `<h1>Carrito</h1>`
        agregarAlModal()

        precioTotal.innerHTML = `El precio total es: $${calcularTotal()}`

        } 
      }).showToast();
}

function avisoDeProductoQuitado(){
    Toastify({
        text: "Quitaste un producto del carrito",
        duration: 1500,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #b00000, #c9653d)",
        },
        onClick: function(){
            modal_container_carrito.classList.add('show'); 

            tituloCarrito.innerHTML = `<h1>Carrito</h1>`
            agregarAlModal()
            precioTotal.innerHTML = `El precio total es: $${calcularTotal()}`
        } 
      }).showToast();
}










//BOTONES +INFO










const botonInfo = document.querySelector("#boton1"),
botonInfo2 = document.querySelector("#boton2"),
botonInfo3 = document.querySelector("#boton3"),
p = document.querySelector("#textoVentana"),
h1 = document.querySelector("#tituloVentana"),
modal_container = document.querySelector('#modal_container'),
cerrarVentana = document.querySelector('#closeVentana');






//FUNCIONES QUE ABREN Y CIERRAN LAS VENTANAS EMERGENTES DE LOS BOTONES +INFO:





function agregarVentanaEmergente (){
    botonInfo.addEventListener('click', (e) => {
        e.preventDefault()
        modal_container.classList.add('show'); 
        let html = `
        <h1>Placares</h1>
        <img src="./img/placard ropero.jpg">
        <p>Nuestro stock ofrece una gran variedad de placares con diferentes tamaños y tipos. Sus precios se basan en su calidad, esta podiendo ser alta, baja o intermedia. Aunque la adquisicion de estos productos siempre les sera beneficiosa.</p>
        `
        p.innerHTML = html;
    });
     
    botonInfo2.addEventListener('click', (e) => {
        e.preventDefault()
        modal_container.classList.add('show'); 
        let html = `
        <h1>Cocinas</h1>
        <img src="./img/cocina completa.jpg">
        <p>Nuestro stock ofrece una gran variedad de cocinas con diferentes tamaños y tipos. Sus precios se basan en su calidad, esta podiendo ser alta, baja o intermedia. Aunque la adquisicion de estos productos siempre les sera beneficiosa.</p>
        `
        p.innerHTML = html
    });
      
    botonInfo3.addEventListener('click', (e) => {
        e.preventDefault()
        modal_container.classList.add('show'); 
        let html = `
        <h1>Decoraciones</h1>
        <img src="./img/decoracion del hogar.jpg">
        <p>Nuestro stock ofrece una gran variedad de decoraciones con diferentes alcances, muchisima variedad y creatividad. Sus precios se basan en su calidad, esta podiendo ser alta, baja o intermedia. Aunque la adquisicion de estos productos siempre les sera beneficiosa.</p>
        `
        p.innerHTML = html
    });  
    
    
      
}

agregarVentanaEmergente()


function cerrarVentanaEmergente (){
    cerrarVentana.addEventListener('click', () => {
        modal_container.classList.remove('show');
    });
}

cerrarVentanaEmergente()












//CARRITO:












const carrito_navbar = document.querySelector("#carrito_navbar"),
modal_container_carrito = document.querySelector("#modal_container_carrito"),
modalCarrito = document.querySelector("#modalCarrito"),
tituloCarrito = document.querySelector("#tituloCarrito"),
textoCarrito = document.querySelector("#textoCarrito"),
closeCarrito = document.querySelector("#closeCarrito"),
precioTotal = document.querySelector("#precioTotal"),
botonAgregar = document.querySelector(".btn-btn-primary"),
botonQuitar = document.querySelector(".btn-btn-secondary"),
limpiarCarrito = document.querySelector("#limpiarCarrito")







//ESTO ABRE EL CARRITO SI LE DAS AL EMOJI DE CARRITO:








carrito_navbar.addEventListener('click', () => {
    modal_container_carrito.classList.add('show'); 

    tituloCarrito.innerHTML = `<h1>Carrito</h1>`
    
    agregarAlModal()
    
    
    precioTotal.innerHTML = `El precio total es: $${calcularTotal()}`
    
});






//BOTÓN LIMPIAR CARRITO:






limpiarCarrito.addEventListener('click', ()=>{
    if(carrito != ""){
        vaciarElCarrito()
    }
    else{
        Toastify({
            text: "Primero debes agregar un producto al carrito",
            duration: 1500,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #b06700, #a58e28)",
            },
            onClick: function (){} 
          }).showToast();
    }
})

function vaciarElCarrito(productoId){
    
    indiceProducto = carrito.findIndex(p => p.id == productoId)
        
    carrito.splice(0, carrito.length)

    refrescarCarrito()

    precioTotal.innerHTML = `El precio total es: $${calcularTotal()}`

    sessionStorage.setItem("Carrito", JSON.stringify(carrito)) 
}






//FUNCION QUE AGREGA LOS PRODUCTOS A LA VENTANA EMERGENTE DEL CARRITO:


function agregarAlModal(){
    for (const producto of carrito) {
        tituloCarrito.innerHTML += 
        `<p id="productoAgregadoAlCarrito">
        <img src="${producto.img}">
        ${producto.nombre}, $${producto.precio}   
        <button id="botonQuitar" onclick="quitarDelCarrito('${producto.id}'), avisoDeProductoQuitado(), refrescarCarrito()" class="btn-btn-secondary">-</button>
        <button id="botonAgregar" onclick="agregarAlCarrito('${producto.id}'), avisoDeProductoAgregado(), refrescarCarrito()" class="btn-btn-primary">+</button>
        X${producto.cantidad} 
        </p>
        `
    }  
}




//FUNCION PARA SUMAR LOS PRECIOS DE LOS PRODUCTOS EN EL CARRITO:


function calcularTotal() { 
    let total = 0
    for (producto of carrito) {
       total += producto.precio * producto.cantidad
    }
    if(total == 0){
        tituloCarrito.innerHTML = `<h1>Carrito</h1><p>¡El carrito esta vacío!</p>`
    }

    return total
        
}



//FUNCION PARA QUE SE ACTUALICE EL CARRITO CADA VEZ QUE LE DAMOS AL BOTON "QUITAR":


function refrescarCarrito(){
    modal_container_carrito.classList.add('show'); 

    tituloCarrito.innerHTML = 
    `<h1>Carrito</h1>`

    precioTotal.innerHTML = `El precio total es: $${calcularTotal()}`

    agregarAlModal()
    
}



//FUNCION PARA CERRAR EL CARRITO:


function cerrarCarrito (){
    closeCarrito.addEventListener('click', () => {
        modal_container_carrito.classList.remove('show');
    });
}

cerrarCarrito()






//FUNCIONES PARA AGREGAR AL STORAGE (CARRITO) 
//(ESTAS DOS FUNCIONES NO HACE FALTA QUE SEAN DECALRADAS, YA QUE SE EJECUTAN EN EL EVENTO ONCLICK DEL BOTON AGREGAR Y QUITAR.)

const carrito = []


function agregarAlCarrito(productoId) {

const productoAgregado = productos.find(p => p.id == productoId)

if (!carrito.includes(productoAgregado)) {
    carrito.push(productoAgregado)
    productoAgregado.cantidad = 1;
}
else {
    productoAgregado.cantidad++;
}

sessionStorage.setItem("Carrito", JSON.stringify(carrito))              

}


function quitarDelCarrito(productoId) {

    indiceProducto = carrito.find(p => p.id == productoId)
    
    if(indiceProducto.cantidad == 1){
        carrito.splice(indiceProducto, 1)
    }   
    else{
        indiceProducto.cantidad--;
    }

    sessionStorage.setItem("Carrito", JSON.stringify(carrito))
  
}









// ACCEDER A LA VENTANA DE COMPRA:







const botonComprar = document.querySelector("#botonComprar")

botonComprar.addEventListener(("click"), () => {
    if(carrito == 0){
        Toastify({
            text: "Primero debes agregar un producto al carrito",
            duration: 1500,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #b06700, #a58e28)",
            },
            onClick: function (){} 
          }).showToast();
    }
    else{
        window.location.href = "http://192.168.0.17:8080/pages/compra.html"
    }
}) 










//ENVIAR MAILS A LA PAGINA:


const botonMensajes = document.querySelector("#botonMensajes");

botonMensajes.addEventListener("click", () => {
    window.location.href = "./pages/email.html";
});





//OBJETO DATE EN EL COPYRIGHT:


const copyright = document.querySelector("#copyright")

let date = new Date("December 31, 2023")

copyright.innerHTML = `<p>©${date.getFullYear()}</p>`


