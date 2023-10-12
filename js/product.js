document.addEventListener("DOMContentLoaded", async () => {
  const productId = getProductIdFromQuery();
  if (productId) {
    try {
      const product = await fetchProductData(productId);
      updateProductDetails(product);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  } else {
    // Handle the case where no product ID is provided.
    console.error("No product ID found in the query parameter.");
  }

  // Add-to-Cart Button Click Event
  const addToCartButton = document.getElementById("add-to-cart-btn");
  addToCartButton.addEventListener("click", () => {
    // You can implement the logic to add the product to the cart here.
    alert("Added to cart");
  });
});

function getProductIdFromQuery() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("id");
}

async function fetchProductData(productId) {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    throw error;
  }
}

function updateProductDetails(product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `$ ${product.price}`;
  document.getElementById("product-description").textContent =
    product.description;
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
}
