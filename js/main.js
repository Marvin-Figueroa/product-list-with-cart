const products = [
  {
    id: 1,
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    id: 2,
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    id: 3,
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    id: 4,
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    id: 5,
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    id: 6,
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    id: 7,
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    id: 8,
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    id: 9,
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

let productsCart = [];

document.addEventListener("DOMContentLoaded", () => {
  renderProductList();
  addEventListenersToAddToCartButtons();
  renderCartContent();
});

function renderCartContent() {
  const cartContent = document.getElementById("cart-content");

  if (productsCart.length === 0)
    cartContent.innerHTML = `<img
          class="d-block mx-auto my-5"
          src="assets/images/illustration-empty-cart.svg"
          alt=""
        />
        <p class="text-center fw-semibold text-rose-light-500 m-0">
          Your added items will appear here
        </p> `;
  else {
    cartContent.innerHTML = `<ul id="cart-list" class="p-0 list-unstyled"></ul><div class="d-flex justify-content-between align-items-center my-3">
          <p style="font-size: 0.9rem" class="m-0 fw-light text-rose-light-900">
            Order Total
          </p>
          <span id="cart-order-total" class="fs-5 fw-bold text-rose-light-900"
            >${formatCurrency(
              productsCart.reduce(
                (acc, curr) => acc + curr.quantity * curr.price,
                0
              )
            )}</span
          >
        </div>
        <div
          class="bg-rose-light-100 d-flex justify-content-center align-items-center gap-2 p-3 rounded-3"
        >
          <img src="assets/images/icon-carbon-neutral.svg" alt="" />
          <p style="font-size: 0.9rem" class="m-0 text-center">
            This is a
            <span class="fw-semibold">carbon-neutral</span> delivery
          </p>
        </div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#order-modal"
          id="btn-confirm-order"
          class="btn rounded-5 btn-sunset-red w-100 mt-4 text-rose-light-100 fs-6 fw-lighter py-3 text-nowrap"
        >
          Confirm Order
        </button>`;
    renderCartItemsList();
  }
}

function renderProductList() {
  const productsList = document.getElementById("product-list");

  const productListItems = products.map((product) => {
    return `
      <li class="col-12 col-sm-6 col-lg-4" id=${product.id}>
        <article>
          <picture>
            <source srcset="${
              product.image.desktop
            }" media="(min-width: 1200px)" />
            <source srcset="${
              product.image.tablet
            }" media="(min-width: 768px)" />
            <img src="${product.image.mobile}" alt="${
      product.name
    }" class="img-fluid d-block rounded-3" />
          </picture>
          <div class="d-flex flex-column gap-1">
            <button
              type="button"
              class="btn-add-to-cart btn border border-rose-light-300 bg-rose-light-50 rounded-5 px-4 py-2 text-nowrap w-75 d-block mx-auto translate-middle-y fw-semibold btn--product"
            >
              <img src="assets/images/icon-add-to-cart.svg" alt="" class="me-1" />
              Add to Cart
            </button>
            <span class="text-rose-light-400">${product.category}</span>
            <p class="fw-semibold text-rose-light-900 mb-0 text-nowrap">
              ${product.name}
            </p>
            <span class="fw-semibold text-sunset-red">
              ${formatCurrency(product.price)}
            </span>
          </div>
        </article>
      </li>
    `;
  });

  productsList.innerHTML = productListItems.join("");
}

function renderCartItemsList() {
  const cartItemsList = document.getElementById("cart-list");

  const cartItems = productsCart.map((product) => {
    return `
      <li
            class="d-flex align-items-center justify-content-between border-bottom py-2"
          >
            <div class="d-flex flex-column gap-1">
              <p class="fw-semibold m-0">${product.name}</p>
              <div class="d-flex gap-2">
                <span class="text-sunset-red fw-semibold">${
                  product.quantity
                }x</span>
                <span class="fw-light text-rose-light-500">@ ${formatCurrency(
                  product.price
                )}</span>
                <span class="fw-semibold text-rose-light-500">${formatCurrency(
                  product.quantity * product.price
                )}</span>
              </div>
            </div>
            <button
              class="btn-icon btn-icon--cart rounded-circle d-flex justify-content-center align-items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </button>
          </li>
    `;
  });

  cartItemsList.innerHTML = cartItems.join("");
}

function formatCurrency(currency) {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function addEventListenersToAddToCartButtons() {
  const buttonsAddToCart = document.querySelectorAll(".btn-add-to-cart");
  buttonsAddToCart.forEach((button) =>
    button.addEventListener("click", handleAddToCart)
  );
}

function handleAddToCart(e) {
  const addToCartButton = e.target;
  const productListItemId = parseInt(
    addToCartButton.closest("li").getAttribute("id")
  );
  const addToCartButtonContainer = addToCartButton.parentElement;

  updateCart(productListItemId);

  const cartItemCountUpdater = createCartItemCountUpdater(
    productListItemId,
    addToCartButton,
    addToCartButtonContainer
  );

  addToCartButton.remove();
  addToCartButtonContainer.prepend(cartItemCountUpdater);
}

function updateCart(productId) {
  const productInCart = productsCart.find(
    (product) => product.id === productId
  );

  const product = products.find((p) => p.id === productId);

  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    const newProduct = {
      id: productId,
      name: product.name,
      quantity: 1,
      price: product.price,
    };
    productsCart = [...productsCart, newProduct];
  }

  document.getElementById("cart-items-count").textContent = productsCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  renderCartContent();
}

function createCartItemCountUpdater(
  productId,
  addToCartButton,
  addToCartButtonContainer
) {
  const cartItemCountUpdater = document.createElement("div");
  cartItemCountUpdater.setAttribute(
    "class",
    "border border-sunset-red bg-sunset-red rounded-5 p-2 text-nowrap d-flex justify-content-between align-items-center w-75 mx-auto translate-middle-y fw-semibold text-white"
  );

  cartItemCountUpdater.innerHTML =
    "<button class='decrement-cart btn-icon btn-icon--product'><svg xmlns='http://www.w3.org/2000/svg' width='10' height='2' fill='none' viewBox='0 0 10 2'><path d='M0 .375h10v1.25H0V.375Z'/></svg></button><span id='add-to-cart-count'>1</span><button class='increment-cart btn-icon btn-icon--product'><svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none' viewBox='0 0 10 10'><path d='M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z'/></svg></button>";

  addEventListenersToUpdateCartButtons(
    cartItemCountUpdater,
    productId,
    addToCartButton,
    addToCartButtonContainer
  );

  return cartItemCountUpdater;
}

function addEventListenersToUpdateCartButtons(
  cartItemCountUpdater,
  productId,
  addToCartButton,
  addToCartButtonContainer
) {
  cartItemCountUpdater
    .querySelector(".decrement-cart")
    .addEventListener("click", () => {
      handleDecrementCart(
        productId,
        addToCartButton,
        addToCartButtonContainer,
        cartItemCountUpdater
      );
    });

  cartItemCountUpdater
    .querySelector(".increment-cart")
    .addEventListener("click", () => {
      handleIncrementCart(productId, cartItemCountUpdater);
    });
}

function handleDecrementCart(
  productId,
  addToCartButton,
  addToCartButtonContainer,
  cartItemCountUpdater
) {
  productsCart = productsCart
    .map((product) => {
      if (product.id == productId) {
        const updatedQuantity = product.quantity - 1;
        cartItemCountUpdater.querySelector("#add-to-cart-count").textContent =
          updatedQuantity;
        return { ...product, quantity: updatedQuantity };
      } else return product;
    })
    .filter((product) => product.quantity > 0);

  if (!productsCart.some((product) => product.id === productId)) {
    addToCartButtonContainer.prepend(addToCartButton);
    cartItemCountUpdater.remove();
  }

  document.getElementById("cart-items-count").textContent = productsCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  renderCartContent();
}

function handleIncrementCart(productId, cartItemCountUpdater) {
  productsCart = productsCart.map((product) => {
    if (product.id == productId) {
      const updatedQuantity = product.quantity + 1;
      cartItemCountUpdater.querySelector("#add-to-cart-count").textContent =
        updatedQuantity;
      return { ...product, quantity: updatedQuantity };
    } else return product;
  });

  document.getElementById("cart-items-count").textContent = productsCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  renderCartContent();
}
