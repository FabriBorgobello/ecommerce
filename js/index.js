console.log("Hello World");

async function getProducts() {
  const response = await fetch("http://localhost:3000/products");
  return await response.json();
}

async function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productInCart = cart.find((item) => item.id === product.id);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    productInCart = { ...product, quantity: 1 };
    cart.push(productInCart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

async function displayProductList() {
  const products = await getProducts();
  let list = document.getElementById("product-list");
  products.forEach((product) => {
    let item = document.createElement("div");
    item.innerHTML =
      /* HTML */
      `<div class="product-card">
        <h2 class="product-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h2>
        <p class="product-price">$ ${product.price}</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>`;
    list.appendChild(item);

    // Add to cart button
    let addToCartBtn = item.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
    });
  });
}

displayProductList();
