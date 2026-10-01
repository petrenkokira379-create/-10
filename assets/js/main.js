const products = [
  {
    id: 1,
    title: "Ноутбук Apple MacBook Pro 16",
    price: 99999,
    category: "laptops",
    image: "./assets/images/macbook.jpg.jpg",
  },
  {
    id: 2,
    title: "Смартфон Samsung Galaxy S24",
    price: 39999,
    category: "smartphones",
    image: "./assets/images/samsung.jpg.jpg",
  },
  {
    id: 3,
    title: "Ноутбук Lenovo IdeaPad 5",
    price: 27999,
    category: "laptops",
    image: "./assets/images/lenovo.jpg.jpg",
  },
  {
    id: 4,
    title: "Смартфон Apple iPhone 15",
    price: 34999,
    category: "smartphones",
    image: "./assets/images/iphone.jpg.webp",
  },
  {
    id: 5,
    title: "Навушники Sony WH-1000XM5",
    price: 12999,
    category: "headphones",
    image: "./assets/images/headphones.jpg.jpg",
  },
  {
    id: 6,

    title: "Монітор LG UltraGear 27",
    price: 10999,
    category: "monitors",
    image: "./assets/images/monitor.jpg.jpg",
  },
];
const container = document.querySelector(".products-grid");

const htmlString = products
  .map((product) => {
    return `
      <article class="product-card">
      <img src="${product.image}" alt="${product.title}" width="300" height="200">
        <h3>${product.title}</h3>
        <p class="price">${product.price} грн</p>
        <button class="btn btn-buy" data-id="${product.id}">
          Купити
        </button>
      </article>
    `;
  })
  .join("");

container.innerHTML = htmlString;
// Массив товаров в корзине.
let cart = [];

// Один обработчик кликов для всего каталога.
container.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-buy");

  if (!button || !container.contains(button)) {
    return;
  }

  const productId = Number(button.dataset.id);
  const selectedProduct = products.find(
    (product) => product.id === productId
  );

  if (selectedProduct) {
    addToCart(selectedProduct);
  }
});

// Добавление товара или увеличение его количества.
function addToCart(product) {
  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateUI();
}

// Общая стоимость с учётом количества.
function calculateTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

// Обновление счётчика и суммы на странице.
function updateUI() {
  const cartCounter = document.querySelector(".cart-counter");
  const cartTotal = document.querySelector(".cart-total");

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cartCounter) {
    cartCounter.textContent = totalItems;
  }

  if (cartTotal) {
    cartTotal.textContent = calculateTotal();
  }

  console.log("Поточний кошик:", cart);
  console.log("Загальна сума:", calculateTotal(), "грн");
}

updateUI();