
// PRODUTOS
const products = [
  {
    id: "p1",
    title: "Moletom R7 VzN - Preto",
    price: 199.90,
    desc: "Moletom oversized com estampa frontal estilizada. Tecido grosso e acabamento premium.",
    img: "assets/img/moletom.png"
  },
  {
    id: "p2",
    title: "Camiseta R7 VzN",
    price: 99.90,
    desc: "Camiseta 100% algodão com logo serigrafado. Corte street e costura reforçada.",
    img: "assets/img/blusa 1.png"
  },
  {
    id: "p3",
    title: "Boné R7 VzN",
    price: 69.90,
    desc: "Boné ajustável com etiqueta bordada e aba reta.",
    img: "assets/img/boner.png"
  }
];


// ELEMENTOS DOM
const productsEl = document.getElementById("products"); /// aki onde ficam os produtos
const cartListEl = document.getElementById("cart-items"); /// aki lista itens do carrinho
const cartCountEl = document.getElementById("cart-count"); /// aki add número no ícone do carrinho
const cartTotalEl = document.getElementById("cart-total"); /// aki mostra o total em dinheiro

const cartButton = document.getElementById("cart-button"); /// botão que abre o carrinho
const cartPanel = document.getElementById("cart-panel"); /// painel lateral
const cartClose = document.getElementById("cart-close"); /// botão para fechar o carrinho
const overlay = document.getElementById("overlay"); /// fundo escurecido ao abrir o carrinho


// CARRINHO

let cart = JSON.parse(localStorage.getItem("r7_cart") || "[]");


// FUNÇÕES


// Salvar carrinho
function saveCart() {
  localStorage.setItem("r7_cart", JSON.stringify(cart));

  const textItems = cart.map(i => `• ${i.title} — R$${i.price} x${i.qty}`).join("\n");
  const total = cart.reduce((t, i) => t + (i.price * i.qty), 0);

  localStorage.setItem("cartItems", textItems);
  localStorage.setItem("cartTotal", total.toFixed(2));
}

// Atualizar contador e total
function updateCartSummary() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (cartCountEl) cartCountEl.textContent = totalQty;
  if (cartTotalEl) cartTotalEl.textContent = `R$ ${totalPrice.toFixed(2)}`;
}

// Renderizar produtos
function renderProducts() {
  if (!productsEl) return;
  productsEl.innerHTML = "";

  products.forEach(p => {
    const html = `
      <article class="card">
        <div class="card-media">
          <img src="${p.img}" alt="${p.title}">
        </div>
        <div class="card-body">
          <div class="card-title">${p.title}</div>
          <div class="card-desc">${p.desc}</div>
          <div class="card-bottom">
            <div class="price">R$ ${p.price.toFixed(2)}</div>
            <button class="add-btn" data-id="${p.id}">Adicionar</button>
          </div>
        </div>
      </article>
    `;
    productsEl.insertAdjacentHTML("beforeend", html);
  });
}

// Renderizar carrinho
function renderCart() {
  if (!cartListEl) return;

  cartListEl.innerHTML = "";

  // Filtra apenas itens válidos
  const validCart = cart.filter(i => i && i.id && i.title && i.price != null && i.qty != null);

  if (validCart.length === 0) {
    cartListEl.innerHTML = "<p class='empty'>Carrinho vazio</p>";
    return;
  }

  validCart.forEach(item => {
    const html = `
      <div class="cart-item">
        <img src="${item.img}" class="cart-img">
        <div class="cart-info">
          <div class="cart-title">${item.title}</div>
          <div class="cart-price">R$ ${item.price.toFixed(2)}</div>
          <div class="cart-qty">Qtd: ${item.qty}</div>
        </div>
        <button class="remove-btn" data-id="${item.id}" style="
          background:#ff4d4d;
          color:#fff;
          font-size:18px;
          font-weight:bold;
          border:none;
          border-radius:50%;
          width:36px;
          height:36px;
          cursor:pointer;
        ">&times;</button>
      </div>
    `;
    cartListEl.insertAdjacentHTML("beforeend", html);
  });

  // Evento remover
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      cart = cart.filter(i => i.id !== id);
      saveCart();
      renderCart();
      updateCartSummary();
    });
  });
}

// Adicionar ao carrinho
function addToCart(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ ...prod, qty: 1 });

  saveCart();
  renderCart();
  updateCartSummary();
}

// EVENTOS


// Adicionar produto
document.addEventListener("click", e => {
  if (e.target.matches(".add-btn")) {
    addToCart(e.target.dataset.id);
  }
});

// Abrir/fechar carrinho
if (cartButton && cartPanel && cartClose && overlay) {
  cartButton.addEventListener("click", () => {
    cartPanel.classList.add("open");
    overlay.classList.add("show");
  });

  cartClose.addEventListener("click", () => {
    cartPanel.classList.remove("open");
    overlay.classList.remove("show");
  });

  overlay.addEventListener("click", () => {
    cartPanel.classList.remove("open");
    overlay.classList.remove("show");
  });
}

// Checkout (preencher campos)
if (document.getElementById("checkout-itens")) {
  const itens = localStorage.getItem("cartItems") || "Nenhum item";
  const total = localStorage.getItem("cartTotal") || "0.00";

  document.getElementById("checkout-itens").value = itens;
  document.getElementById("checkout-total").value = total;
}


// INICIAR

renderProducts();
renderCart();
updateCartSummary();