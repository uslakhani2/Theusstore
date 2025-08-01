// Sample product base prices (could come from backend)
const productBasePrices = {
  1: 549,
  2: 870,
  3: 349,
};

document.addEventListener("DOMContentLoaded", () => {
  const cart = document.getElementById("cart-items");
  const subtotalDisplay = document.getElementById("subtotal-display");
  const totalDisplay = document.getElementById("total-display");
  const subtotalText = document.getElementById("subtotal-text");
  const itemCount = document.getElementById("item-count");
  const yearSpan = document.getElementById("year");

  // Set current year
  yearSpan.textContent = new Date().getFullYear();

  function formatPrice(amount) {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
  }

  function recalcCart() {
    let subtotal = 0;
    let totalItems = 0;

    cart.querySelectorAll(".item").forEach((item) => {
      const id = item.dataset.id;
      const qtyInput = item.querySelector("input[type=number]");
      let quantity = parseInt(qtyInput.value, 10);
      if (isNaN(quantity) || quantity < 1) quantity = 1;
      if (quantity > 100) quantity = 100;
      qtyInput.value = quantity;

      const basePrice = productBasePrices[id] || 0;
      const itemTotal = basePrice * quantity;
      subtotal += itemTotal;
      totalItems += quantity;

      const priceEl = item.querySelector(".total-price");
      priceEl.textContent = formatPrice(itemTotal);
    });

    subtotalDisplay.textContent = formatPrice(subtotal);
    totalDisplay.textContent = formatPrice(subtotal); // no shipping added
    subtotalText.textContent = `Subtotal: ${formatPrice(subtotal)}`;
    itemCount.textContent = `${totalItems} item${totalItems === 1 ? "" : "s"}`;
  }

  // Quantity button handlers
  cart.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".plus-btn") || target.matches(".plus-btn") || target.closest(".qty-btn.plus-btn")) {
      const container = target.closest(".item");
      const input = container.querySelector("input[type=number]");
      let val = parseInt(input.value, 10);
      if (isNaN(val)) val = 1;
      if (val < 100) val += 1;
      input.value = val;
      recalcCart();
    }

    if (target.closest(".minus-btn") || target.matches(".minus-btn") || target.closest(".qty-btn.minus-btn")) {
      const container = target.closest(".item");
      const input = container.querySelector("input[type=number]");
      let val = parseInt(input.value, 10);
      if (isNaN(val)) val = 1;
      if (val > 1) val -= 1;
      input.value = val;
      recalcCart();
    }

    // Delete
    if (target.closest(".delete-btn") || target.matches(".delete-btn")) {
      const item = target.closest(".item");
      if (item) {
        item.remove();
        recalcCart();
      }
    }

    // Like toggle
    if (target.closest(".like-btn") || target.matches(".like-btn")) {
      const btn = target.closest(".like-btn");
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", (!pressed).toString());
    }
  });

  // Direct input change
  cart.addEventListener("input", (e) => {
    const input = e.target;
    if (input.matches("input[type=number]")) {
      let val = parseInt(input.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 100) val = 100;
      input.value = val;
      recalcCart();
    }
  });

  document.getElementById("checkout").addEventListener("click", () => {
    alert("Proceeding to checkout. (Placeholder action)");
  });

  document.getElementById("continue-shopping").addEventListener("click", () => {
    window.history.back();
  });

  recalcCart();
});
