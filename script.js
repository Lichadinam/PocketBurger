let carrito = [];

function agregar(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  document.getElementById("carrito-panel").style.display = "block";
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-panel");

  lista.innerHTML = "";

  let suma = 0;

  carrito.forEach((item, index) => {
    suma += item.precio * item.cantidad;

lista.innerHTML += `
  <div class="item-carrito">
    ${item.nombre} x${item.cantidad}
    <button onclick="eliminar(${index})" class="btn-eliminar">✖</button>
  </div>
`;
  });

  total.innerText = "$" + suma;
}

function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function finalizarCompra() {
  let mensaje = "Hola! Quiero pedir:%0A";

  carrito.forEach(item => {
    mensaje += `- ${item.nombre} x${item.cantidad}%0A`;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  mensaje += `%0ATotal: $${total}%0A`;
  mensaje += `%0AGracias!`;

  window.open(`https://wa.me/5491126785227?text=${mensaje}`, "_blank");
}