class User{
  constructor(name){
    this.name=name
  }
}

const modal = document.getElementById("myModal");

const closeBtn = document.getElementsByClassName("close")[0];

const nameInput = document.getElementById("name-input");

const submitBtn = document.getElementById("name-submit");

const userName = document.getElementById("user-name");

const storedUser = localStorage.getItem("user");

if (storedUser) {
  const user = JSON.parse(storedUser);
  userName.textContent = user.name;
} else {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

submitBtn.onclick = function() {
  const name = nameInput.value;
  if (name !== "") {
    localStorage.setItem("user", JSON.stringify(new User(name)));
    userName.textContent = name;
    modal.style.display = "none";
  }
}

const botónAgregarAlCarritoCompras = document.querySelectorAll('.agregarAlCarrito');
botónAgregarAlCarritoCompras.forEach((botónAgregarAlCarrito) => {
  botónAgregarAlCarrito.addEventListener('click', clickAgregarAlCarrito);
});

const botónComprar = document.querySelector('.botónComprar');
botónComprar.addEventListener('click', clickBotónComprar);

const contenedorItemsCarritoCompras = document.querySelector(
  '.contenedorItemsCarritoCompras'
);

function clickAgregarAlCarrito(event) {
  const botón = event.target;
  const item = botón.closest('.item');

  const itemTítulo = item.querySelector('.item-título').textContent;
  const itemPrecio = item.querySelector('.item-precio').textContent;
  const itemImagen = item.querySelector('.item-imagen').src;

  agregarItemAlCarritoCompras(itemTítulo, itemPrecio, itemImagen);
}

function agregarItemAlCarritoCompras(itemTítulo, itemPrecio, itemImagen) {
  const elementosTítulo = contenedorItemsCarritoCompras.getElementsByClassName(
    'itemCarritoComprasTítulo'
  );
  for (let i = 0; i < elementosTítulo.length; i++) {
    if (elementosTítulo[i].innerText === itemTítulo) {
      let elementQuantity = elementosTítulo[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadItemsCarritoCompras'
      );
      elementQuantity.value++;
      Swal.fire(
        'Carrito actualizado',
        'Se agregó al carrito',
        'success'
      )
      actualizarTotalCarritoCompras();
      return;
    }
  }

  const colaCarritoCompras = document.createElement('div');
  const contenidoCarritoCompras = `
  <div class="row itemCarritoCompras">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImagen} class="imagen-carrito-compras">
                <h6 class="shopping-cart-item-título itemCarritoComprasTítulo text-truncate ml-3 mb-0">${itemTítulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-precio mb-0 itemPrecioCarritoCompras">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="input-carrito-compras cantidadItemsCarritoCompras" type="number"
                    value="1">
                <botón class="btn btn-danger botónQuitar" type="botón">X</botón>
            </div>
        </div>
    </div>`;
  colaCarritoCompras.innerHTML = contenidoCarritoCompras;
  contenedorItemsCarritoCompras.append(colaCarritoCompras);

  colaCarritoCompras
    .querySelector('.botónQuitar')
    .addEventListener('click', quitarItemCarritoCompras);

  colaCarritoCompras
    .querySelector('.cantidadItemsCarritoCompras')
    .addEventListener('cambiar', cambiarCantidad);

  actualizarTotalCarritoCompras();
}

function actualizarTotalCarritoCompras() {
  let total = 0;
  const totalCarritoCompras = document.querySelector('.totalCarritoCompras');

  const itemsCarritoCompras = document.querySelectorAll('.itemCarritoCompras');

  itemsCarritoCompras.forEach((itemCarritoCompras) => {
    const elementoItemPrecioCarritoCompras = itemCarritoCompras.querySelector(
      '.itemPrecioCarritoCompras'
    );
    const itemPrecioCarritoCompras = Number(
      elementoItemPrecioCarritoCompras.textContent.replace('$', '')
    );
    const elementoCantidadItemsCarritoCompras = itemCarritoCompras.querySelector(
      '.cantidadItemsCarritoCompras'
    );
    const cantidadItemsCarritoCompras = Number(
      elementoCantidadItemsCarritoCompras.value
    );
    total = total + itemPrecioCarritoCompras * cantidadItemsCarritoCompras;
  });
  totalCarritoCompras.innerHTML = `$${total.toFixed(2)}`;
}

function quitarItemCarritoCompras(event) {
  const botónClick = event.target;
  botónClick.closest('.itemCarritoCompras').remove();
  actualizarTotalCarritoCompras();
}

function cambiarCantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarTotalCarritoCompras();
}

function clickBotónComprar() {
  contenedorItemsCarritoCompras.innerHTML = '';
  actualizarTotalCarritoCompras();
}

fetch("http://pokeapi.co/api/v2/pokemon/?limit=3").then(res=>res.json()).then(data=>{
  
  console.log(data)
  const urls = data.results.map(poke=>fetch(poke.url))
  console.log(urls)
  return Promise.all(urls)
}).then(response=>{
  return Promise.all(response.map(poke=>poke.json()))
  console.log(response)
}).then(data=>{
  const pokemonContainer = document.getElementById("imageContainer")
  console.log(data)
  for(const result of data){
    const img = document.createElement("img")
    img.height=50
    img.width=50
    img.src=result.sprites.front_default
    pokemonContainer.append(img)
  }
})



