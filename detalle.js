document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById('toggle');
  toggleSwitch.addEventListener('change', function () {
    const isChecked = toggleSwitch.checked;
    const body = document.body;
  
    if (isChecked) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  });
  



  const detalleProducto = document.getElementById("detalle-producto");

  // Obtenemos el ID de producto de la URL 
  const urlParams = new URLSearchParams(window.location.search);
  const idProducto = urlParams.get("id");
  const nombreProducto = urlParams.get("nombre");

  //  datos desde el localStorage
  const datosProductos = JSON.parse(localStorage.getItem("json"));
    
  // buscar el producto por ID
  const idBuscado = idProducto; 
  
  // Iterar sobre las claves del objeto JSON (que son los nombres de los arrays)
  
  for (const key of Object.keys(datosProductos)) {
    // Obtener el array actual
    const array = datosProductos[key];
    
    // Buscar el ID en el array actual
    const productoEncontrado = array.find((producto) => producto.id === idBuscado);
  
    if (productoEncontrado ) {
      productoSeleccionado = productoEncontrado;
      const contenedorDetalleProducto = document.createElement("div");

      contenedorDetalleProducto.classList.add("detalle-producto");
      contenedorDetalleProducto.innerHTML = `
          
          <h2>${productoSeleccionado.nombre}</h2>
          <p>Descripción: ${productoSeleccionado.descripcion}</p>
          <p>Precio: ${productoSeleccionado.precio}</p>
          <button class="agregar-carrito">Agregar al carrito</button>
      `;

      // Agregar al elemento con ID "detalles-producto"
    console.log(`ID ${idBuscado} encontrado en el array '${key}':`, productoEncontrado);
    } else {
      console.log(`ID ${idBuscado} no encontrado en el array '${key}'`);
    }
  }
  

  if (productoSeleccionado) {
      // elemento div para mostrar los detalles del producto y lo agregamos al DOM
      const contenedorDetalleProducto = document.createElement("div");
      contenedorDetalleProducto.classList.add("detalle-producto");
      contenedorDetalleProducto.innerHTML = `
            <img src="${productoSeleccionado.imagen}" alt="${productoSeleccionado.nombre}" class="producto-img">
            <h2>${productoSeleccionado.nombre}</h2>
            <p>Descripción: ${productoSeleccionado.descripcion}</p>
            <p>Precio: $ ${productoSeleccionado.precio}</p>
            <button class="agregar-carrito">Agregar al carrito</button>
          `;
      // Agregar al elemento con ID "detalles-producto" en la página
      detalleProducto.appendChild(contenedorDetalleProducto);
       
    } else {
        // mensaje de error si no se encuentra el producto
       const mensajeError = document.createElement("p");
      mensajeError.textContent = "Producto no encontrado";
      detalleProducto.appendChild(mensajeError);
    }
});




  