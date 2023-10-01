document.addEventListener('DOMContentLoaded', function () {
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
  
    // Llamar al contenedor de botones
    const botonesContainer = document.querySelector('.text-container');
  
    const createButton = (id, text) => {
      const button = document.createElement('button');
      button.id = id;
      button.textContent = text;
      return button;
    };
  
    const botonCategoria1 = createButton('categoria1', 'Aceites');
    const botonCategoria2 = createButton('categoria2', 'Jabones');
    const botonCategoria3 = createButton('categoria3', 'Fragancias');
  
    // Agregar los botones al contenedor
    botonesContainer.appendChild(botonCategoria1);
    botonesContainer.appendChild(botonCategoria2);
    botonesContainer.appendChild(botonCategoria3);
  
    // Obtener el contenedor de productos
    const productosContainer = document.getElementById('productos-container');
    productosContainer.style.display = 'flex';
    productosContainer.style.flexWrap = 'wrap';
    productosContainer.style.justifyContent = 'center';
  
    // Función para cargar y procesar los datos JSON
    function cargarDatosJSON() {
      fetch('./json.json')
        .then(respuesta => respuesta.json())
        .then((datos) => {
          localStorage.setItem("json", JSON.stringify(datos));
  
        })
        .catch(error => {
          console.error('Error al cargar los datos JSON:', error);
        });
    }
  
    // Función para mostrar productos en la página
    function mostrarProductos(productos) {
      // Limpiar el contenedor de productos
      productosContainer.innerHTML = '';
  
      // Crear tarjetas de productos para cada producto en la categoría
      productos.forEach(function (producto) {
        // Crear el elemento "product-card" para el producto
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.classList.add('dark-mode');
        productCard.style.width = '300px';
        productCard.style.display = 'flex';
        productCard.style.flexDirection = 'column';
        productCard.style.alignItems = 'center';
        productCard.style.justifyContent = 'center';
        productCard.style.border = '2px solid black ';
        productCard.style.boxShadow = ' 0 4px 8px 0 rgba(0, 0, 0, 0.2)';
        productCard.style.margin = '10px';
  
        // Construir el contenido del "product-card"
        productCard.innerHTML = `
          <h2 class="product-name">${producto.nombre}</h2>
          <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
          <p class="product-rating">${producto.puntuacion}</p>
          <a href="tarjeta.html?id=${producto.id}" class="ver-mas-button" style="text-decoration: none;">Ver más</a>
        `;
  
        // Agregar el "product-card" al contenedor de productos
        productosContainer.appendChild(productCard);
  
        // Agregar evento para el botón "Ver más"
        const verMasButton = productCard.querySelector('.ver-mas-button');
        verMasButton.addEventListener('click', function () {
          mostrarDetallesProductos(producto);
        });
      });
    }
  
    const categoria1Button = document.getElementById('categoria1');
    const categoria2Button = document.getElementById('categoria2');
    const categoria3Button = document.getElementById('categoria3');
  
    categoria1Button.addEventListener('click', function () {
      const json = JSON.parse(localStorage.getItem("json"));
  
      mostrarProductos(json.aceites);
    });
  
    categoria2Button.addEventListener('click', function () {
      const json = JSON.parse(localStorage.getItem("json"));
      mostrarProductos(json.jabones);
    });
  
    categoria3Button.addEventListener('click', function () {
      const json = JSON.parse(localStorage.getItem("json"));
      mostrarProductos(json.fragancias);
    });
  
    // Función para mostrar detalles de productos en "tarjeta.html" redirecciona a otra pag
   
    function mostrarDetallesProductos(producto) {
      
      window.location.href = `tarjeta.html?id=${producto.id}`;
     
    }
  
    // Llamar a la función para cargar y procesar los datos JSON
    cargarDatosJSON();
  
    const buscarButton = document.getElementById('buscar-producto');
    const nombreProductoInput = document.getElementById('nombre-producto');
  
    buscarButton.addEventListener('click', function () {
      // Obtener el texto ingresado por el usuario
      const nombreProducto = nombreProductoInput.value.toLowerCase().trim();
  
      // Obtener los productos del almacenamiento local
      const json = JSON.parse(localStorage.getItem("json"));
  
      // Filtrar los productos por nombre
      for (const key of Object.keys(json)) {
        // Obtener el array actual 

         array = json[key];
    
        // Buscar en el array actual
        if (Array.isArray(array)) {
          const productoEncontrado = array.find((producto) => producto.nombre.toLowerCase().includes(nombreProducto));
          console.log("no");
          
          
          mostrarDetallesProductos(productoEncontrado);
        } else {
          console.log(`El valor correspondiente a la clave '${key}' no es un array`);
        }
      }
    });
    
  });
  