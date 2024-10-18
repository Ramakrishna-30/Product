const productsContainer = document.querySelector('.products-container');
const loading = document.querySelector('.loading');
const error = document.querySelector('.error');

// Fetch Products
async function fetchProducts() {
  loading.style.display = 'block';
  try {
    const response = await fetch('https://www.course-api.com/javascript-store-products');
    const products = await response.json();
    return products;
  } catch (err) {
    error.textContent = 'An error occurred while fetching the products';
    return [];
  } finally {
    loading.style.display = 'none';
  }
}

// Display Products
function displayProducts(products) {
  const productsDOM = products.map(product => {
    const { id, fields: { name, price, image } } = product;
    return `
      <a href="product.html?id=${id}" class="single-product">
        <img src="${image[0].url}" alt="${name}" class="single-product-img img">
        <footer>
          <h5 class="name">${name}</h5>
          <span class="price">$${price / 100}</span>
        </footer>
      </a>
    `;
  }).join('');
  productsContainer.innerHTML = productsDOM;
}

// Start the app
async function start() {
  const products = await fetchProducts();
  displayProducts(products);
}

start();
