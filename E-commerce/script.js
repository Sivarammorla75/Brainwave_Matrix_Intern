// Mock product data
const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://placehold.co/400x300/a78bfa/333333?text=Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals alike.",
    category: "Electronics",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    price: 199.99,
    image: "https://placehold.co/400x300/60a5fa/333333?text=Smartwatch",
    description:
      "Advanced smartwatch with health tracking, GPS, and smart notifications. Stay connected and healthy on the go.",
    category: "Electronics",
    rating: 4.7,
    reviews: 85,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 249.0,
    image: "https://placehold.co/400x300/f87171/333333?text=Office+Chair",
    description:
      "Comfortable and supportive office chair designed for long hours of work. Improves posture and reduces back pain.",
    category: "Furniture",
    rating: 4.2,
    reviews: 50,
  },
  {
    id: 4,
    name: "4K UHD Smart TV",
    price: 799.0,
    image: "https://placehold.co/400x300/fbbf24/333333?text=Smart+TV",
    description:
      "Immersive 4K Ultra HD smart TV with vibrant colors and smart features. Enjoy your favorite movies and shows in stunning clarity.",
    category: "Electronics",
    rating: 4.8,
    reviews: 200,
  },
  {
    id: 5,
    name: "Coffee Maker Deluxe",
    price: 75.5,
    image: "https://placehold.co/400x300/34d399/333333?text=Coffee+Maker",
    description:
      "Programmable coffee maker with a built-in grinder. Brew fresh, delicious coffee every morning.",
    category: "Home Appliances",
    rating: 4.3,
    reviews: 90,
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    image: "https://placehold.co/400x300/818cf8/333333?text=Speaker",
    description:
      "Compact and powerful Bluetooth speaker with rich bass and clear highs. Perfect for outdoor adventures.",
    category: "Electronics",
    rating: 4.6,
    reviews: 150,
  },
  {
    id: 7,
    name: "Gaming Laptop",
    price: 1200.0,
    image: "https://placehold.co/400x300/f472b6/333333?text=Gaming+Laptop",
    description:
      "High-performance gaming laptop with dedicated GPU and fast processor for immersive gaming experience.",
    category: "Electronics",
    rating: 4.9,
    reviews: 180,
  },
  {
    id: 8,
    name: "Robot Vacuum Cleaner",
    price: 350.0,
    image: "https://placehold.co/400x300/9ca3af/333333?text=Robot+Vacuum",
    description:
      "Smart robot vacuum cleaner with mapping technology and strong suction power for effortless cleaning.",
    category: "Home Appliances",
    rating: 4.4,
    reviews: 70,
  },
  {
    id: 9,
    name: "Digital Camera",
    price: 550.0,
    image: "https://placehold.co/400x300/a78bfa/333333?text=Digital+Camera",
    description:
      "Professional digital camera with high-resolution sensor and multiple shooting modes for stunning photos.",
    category: "Electronics",
    rating: 4.6,
    reviews: 110,
  },
  {
    id: 10,
    name: "Air Fryer",
    price: 120.0,
    image: "https://placehold.co/400x300/60a5fa/333333?text=Air+Fryer",
    description:
      "Healthy air fryer for crispy and delicious meals with less oil. Easy to use and clean.",
    category: "Home Appliances",
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 11,
    name: "Stylish T-Shirt",
    price: 29.99,
    image: "https://placehold.co/400x300/9ca3af/ffffff?text=T-Shirt", // Purple-400
    description:
      "A comfortable and stylish t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    category: "cloths",
    rating: 4.6,
    reviews: 94,
  },
  {
    id: 12,
    name: "Classic Jeans",
    price: 59.99,
    image: "https://placehold.co/400x300/fbbf24/ffffff?text=Jeans", // Blue-400
    description:
      "Durable classic fit jeans that offer both comfort and style. A must-have for your wardrobe.",
    category: "cloths",
    rating: 4.8,
    reviews: 96,
  },
];

let cart = []; // Global array to store cart items
let filteredProducts = [...productsData]; // Products currently displayed

// Get DOM elements
const shopPage = document.getElementById("shop-page");
const aboutPage = document.getElementById("about-page");
const contactPage = document.getElementById("contact-page");

const homeLink = document.getElementById("home-link");
const shopLink = document.getElementById("shop-link");
const aboutLink = document.getElementById("about-link");
const contactLink = document.getElementById("contact-link");

const productListDiv = document.getElementById("product-list");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalSpan = document.getElementById("cart-total");
const cartItemCountSpan = document.getElementById("cart-item-count");
const cartButton = document.getElementById("cart-button");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartSidebarButton = document.getElementById("close-cart-sidebar");
const searchInput = document.getElementById("search-input");
const addedToCartMessage = document.getElementById("added-to-cart-message");

const productDetailModalOverlay = document.getElementById(
  "product-detail-modal-overlay"
);
const productDetailModalContent = document.getElementById(
  "product-detail-modal-content"
);
const closeProductModalButton = document.getElementById("close-product-modal");
const modalProductImage = document.getElementById("modal-product-image");
const modalProductName = document.getElementById("modal-product-name");
const modalProductPrice = document.getElementById("modal-product-price");
const modalProductDescription = document.getElementById(
  "modal-product-description"
);
const modalProductRating = document.getElementById("modal-product-rating");
const modalProductCategory = document.getElementById("modal-product-category");
const modalAddToCartButton = document.getElementById(
  "modal-add-to-cart-button"
);
const modalBackToShopButton = document.getElementById(
  "modal-back-to-shop-button"
);

const checkoutButton = document.getElementById("checkout-button");
const clearCartButton = document.getElementById("clear-cart-button");
const orderConfirmationMessage = document.getElementById(
  "order-confirmation-message"
);
const closeOrderConfirmationButton = document.getElementById(
  "close-order-confirmation"
);

const contactForm = document.getElementById("contact-form");
const contactFormMessage = document.getElementById("contact-form-message");

/**
 * Shows a specific page and hides others.
 * @param {HTMLElement} pageToShow - The DOM element of the page to display.
 */
function showPage(pageToShow) {
  // Hide all main content sections
  shopPage.classList.add("hidden");
  aboutPage.classList.add("hidden");
  contactPage.classList.add("hidden");

  // Show the requested page
  pageToShow.classList.remove("hidden");

  // Hide cart sidebar if open
  cartSidebar.classList.add("hidden");
  cartSidebar.classList.remove("visible");

  // Hide product detail modal if open
  hideProductDetailModal();

  // Hide order confirmation if open
  orderConfirmationMessage.classList.add("hidden");
}

/**
 * Renders all products to the product list container.
 * Clears existing products and re-renders based on `filteredProducts`.
 */
function renderProducts() {
  productListDiv.innerHTML = ""; // Clear existing products
  if (filteredProducts.length === 0) {
    productListDiv.innerHTML =
      '<p class="col-span-full text-center text-gray-600 text-xl mt-10">No products found matching your search.</p>';
    return;
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col";
    productCard.innerHTML = `
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="w-full h-48 object-cover cursor-pointer product-image"
                        data-product-id="${product.id}"
                        onerror="this.src='https://placehold.co/400x300/F0F0F0/333333?text=Image+Not+Found';"
                    />
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600 transition duration-300 product-name" data-product-id="${
                          product.id
                        }">
                            ${product.name}
                        </h3>
                        <p class="text-gray-700 text-lg font-bold mb-3">$${product.price.toFixed(
                          2
                        )}</p>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${
                          product.description
                        }</p>
                        <div class="flex items-center text-sm text-gray-500 mb-4">
                            <span class="flex items-center mr-2">
                                <svg class="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                                ${product.rating}
                            </span>
                            (${product.reviews} reviews)
                        </div>
                        <button
                            class="mt-auto bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow-md hover:shadow-lg add-to-cart-btn"
                            data-product-id="${product.id}"
                        >
                            Add to Cart
                        </button>
                    </div>
                `;
    productListDiv.appendChild(productCard);
  });

  // Attach event listeners to newly created buttons/elements
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.dataset.productId);
      const product = productsData.find((p) => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });

  document
    .querySelectorAll(".product-image, .product-name")
    .forEach((element) => {
      element.addEventListener("click", (event) => {
        const productId = parseInt(event.target.dataset.productId);
        const product = productsData.find((p) => p.id === productId);
        if (product) {
          showProductDetailModal(product);
        }
      });
    });
}

/**
 * Renders the cart items in the sidebar.
 * Updates total price and cart item count in the header.
 */
function renderCart() {
  cartItemsContainer.innerHTML = ""; // Clear existing cart items
  let total = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-gray-600 text-center text-lg mt-10">Your cart is empty.</p>';
    // Disable checkout and clear cart buttons if cart is empty
    checkoutButton.disabled = true;
    clearCartButton.disabled = true;
    checkoutButton.classList.add("opacity-50", "cursor-not-allowed");
    clearCartButton.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    cart.forEach((item) => {
      total += item.price * item.quantity;
      itemCount += item.quantity;

      const cartItemDiv = document.createElement("div");
      cartItemDiv.className =
        "flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0";
      cartItemDiv.innerHTML = `
                        <div class="flex items-center flex-grow">
                            <img
                                src="${item.image}"
                                alt="${item.name}"
                                class="w-20 h-20 object-cover rounded-md mr-4"
                                onerror="this.src='https://placehold.co/200x200/F0F0F0/333333?text=Image';"
                            />
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-gray-800">${
                                  item.name
                                }</h3>
                                <p class="text-blue-600 font-bold">$${item.price.toFixed(
                                  2
                                )}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 quantity-decrease-btn" data-product-id="${
                              item.id
                            }" ${item.quantity <= 1 ? "disabled" : ""}>
                                -
                            </button>
                            <span class="bg-gray-100 text-gray-800 px-4 py-1">${
                              item.quantity
                            }</span>
                            <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 quantity-increase-btn" data-product-id="${
                              item.id
                            }">
                                +
                            </button>
                            <button class="ml-4 text-red-500 hover:text-red-700 transition duration-300 remove-from-cart-btn" data-product-id="${
                              item.id
                            }">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    `;
      cartItemsContainer.appendChild(cartItemDiv);
    });
    // Enable checkout and clear cart buttons
    checkoutButton.disabled = false;
    clearCartButton.disabled = false;
    checkoutButton.classList.remove("opacity-50", "cursor-not-allowed");
    clearCartButton.classList.remove("opacity-50", "cursor-not-allowed");

    // Attach event listeners for quantity and remove buttons
    document.querySelectorAll(".quantity-decrease-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.dataset.productId);
        const item = cart.find((i) => i.id === productId);
        if (item) updateQuantity(productId, item.quantity - 1);
      });
    });
    document.querySelectorAll(".quantity-increase-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.dataset.productId);
        const item = cart.find((i) => i.id === productId);
        if (item) updateQuantity(productId, item.quantity + 1);
      });
    });
    document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.dataset.productId);
        removeFromCart(productId);
      });
    });
  }

  cartTotalSpan.textContent = `$${total.toFixed(2)}`;
  if (itemCount > 0) {
    cartItemCountSpan.textContent = itemCount;
    cartItemCountSpan.classList.remove("hidden");
  } else {
    cartItemCountSpan.classList.add("hidden");
  }
}

/**
 * Adds a product to the cart or increments its quantity if already present.
 * @param {object} productToAdd - The product object to add.
 */
function addToCart(productToAdd) {
  const existingItemIndex = cart.findIndex(
    (item) => item.id === productToAdd.id
  );
  if (existingItemIndex > -1) {
    // Item exists, increment quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // New item, add with quantity 1
    cart.push({ ...productToAdd, quantity: 1 });
  }
  renderCart(); // Re-render cart after update
  showAddedToCartMessage(); // Show confirmation message
}

/**
 * Displays a temporary "Product added to cart!" message.
 */
function showAddedToCartMessage() {
  addedToCartMessage.classList.remove("hidden");
  addedToCartMessage.style.animation = "none"; // Reset animation
  void addedToCartMessage.offsetWidth; // Trigger reflow
  addedToCartMessage.style.animation = null; // Re-enable animation
}

/**
 * Updates the quantity of a specific product in the cart.
 * If newQuantity is 0 or less, the item is removed.
 * @param {number} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity for the product.
 */
function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity = newQuantity;
    renderCart();
  }
}

/**
 * Removes a product from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

/**
 * Clears all items from the cart.
 */
function clearCart() {
  cart = [];
  renderCart();
}

/**
 * Toggles the visibility of the cart sidebar.
 */
function toggleCartSidebar() {
  cartSidebar.classList.toggle("hidden");
  cartSidebar.classList.toggle("visible");
  // Prevent body scrolling when cart is open
  if (cartSidebar.classList.contains("visible")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

/**
 * Displays the product detail modal with information about the given product.
 * @param {object} product - The product object to display in the modal.
 */
function showProductDetailModal(product) {
  modalProductImage.src = product.image;
  modalProductImage.alt = product.name;
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
  modalProductDescription.textContent = product.description;
  modalProductRating.innerHTML = `<svg class="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg> ${product.rating} (${product.reviews} reviews)`;
  modalProductCategory.textContent = `Category: ${product.category}`;

  // Set a data attribute on the button to know which product to add
  modalAddToCartButton.dataset.productId = product.id;

  productDetailModalOverlay.classList.remove("hidden");
  productDetailModalOverlay.classList.add("visible");
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

/**
 * Hides the product detail modal.
 */
function hideProductDetailModal() {
  productDetailModalOverlay.classList.remove("visible");
  productDetailModalOverlay.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
}

/**
 * Handles the search input, filtering products and re-rendering the list.
 * @param {string} searchTerm - The text to search for.
 */
function handleSearch(searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
  );
  renderProducts();
}

/**
 * Shows the order confirmation message.
 */
function showOrderConfirmation() {
  hideProductDetailModal(); // Close any open modal
  toggleCartSidebar(); // Close cart sidebar
  orderConfirmationMessage.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent scrolling
  clearCart(); // Clear cart after successful checkout
}

/**
 * Hides the order confirmation message.
 */
function hideOrderConfirmation() {
  orderConfirmationMessage.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
  showPage(shopPage); // Navigate back to shop page
}

/**
 * Handles contact form submission.
 * Performs basic validation and displays a message.
 */
function handleContactFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  contactFormMessage.classList.remove(
    "hidden",
    "bg-red-100",
    "text-red-700",
    "bg-green-100",
    "text-green-700"
  );
  contactFormMessage.textContent = "";

  if (!name || !email || !message) {
    contactFormMessage.classList.add("bg-red-100", "text-red-700");
    contactFormMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    contactFormMessage.classList.add("bg-red-100", "text-red-700");
    contactFormMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // Simulate sending message (in a real app, this would be an API call)
  setTimeout(() => {
    contactFormMessage.classList.add("bg-green-100", "text-green-700");
    contactFormMessage.textContent =
      "Your message has been sent! We will get back to you soon.";
    contactForm.reset(); // Clear the form
  }, 500);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  renderProducts(); // Initial render of products
  renderCart(); // Initial render of cart (will be empty)

  // Navigation links
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(shopPage);
  });
  shopLink.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(shopPage);
  });
  aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(aboutPage);
  });
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(contactPage);
  });

  // Cart functionality
  cartButton.addEventListener("click", toggleCartSidebar);
  closeCartSidebarButton.addEventListener("click", toggleCartSidebar);
  checkoutButton.addEventListener("click", showOrderConfirmation);
  clearCartButton.addEventListener("click", clearCart);

  // Search functionality
  searchInput.addEventListener("keyup", (event) => {
    handleSearch(event.target.value);
  });

  // Product detail modal
  closeProductModalButton.addEventListener("click", hideProductDetailModal);
  productDetailModalOverlay.addEventListener("click", (event) => {
    // Close modal if clicking on the overlay itself, not the content
    if (event.target === productDetailModalOverlay) {
      hideProductDetailModal();
    }
  });
  modalAddToCartButton.addEventListener("click", (event) => {
    const productId = parseInt(event.target.dataset.productId);
    const product = productsData.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      hideProductDetailModal(); // Close modal after adding to cart
    }
  });
  modalBackToShopButton.addEventListener("click", hideProductDetailModal); // Close modal and return to shop

  // Order confirmation
  closeOrderConfirmationButton.addEventListener("click", hideOrderConfirmation);

  // Contact form
  contactForm.addEventListener("submit", handleContactFormSubmit);
});
