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
});

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
              ${product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </article>
      </li>
    `;
  });

  productsList.innerHTML = productListItems.join("");
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

  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    const newProduct = { id: productId, quantity: 1 };
    productsCart = [...productsCart, newProduct];
  }
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
    "<button class='decrement-cart btn btn-icon border border-1'><img src='assets/images/icon-decrement-quantity.svg' alt='' /></button><span id='add-to-cart-count'>1</span><button class='increment-cart btn btn-icon border border-1'><img src='assets/images/icon-increment-quantity.svg' alt='' /></button>";

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
}
