// Sepet Verilerini Yerel Depolamada Saklama
let cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartSection = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const notification = document.getElementById('notification');

// Sepeti Yükle
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = savedCart;
    updateCart();
}

// Sepeti Kaydet
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Sepete Ürün Ekle
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    saveCart();
    updateCart();
    showNotification(`${productName} sepetinize eklendi!`);
}

// Sepetten Ürün Sil
function removeFromCart(index) {
    const confirmDelete = confirm('Bu ürünü sepetinizden silmek istediğinizden emin misiniz?');
    if (confirmDelete) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
    }
}

// Sepeti Güncelle
function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price}₺`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '🗑️ Sil';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeFromCart(index);

        listItem.appendChild(removeBtn);
        cartItems.appendChild(listItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Toplam: ${totalPrice}₺`;
    cartBtn.textContent = `Sepet (${cart.length})`;
    cartSection.style.display = 'block';
}

// Sepeti Göster/Gizle
cartBtn.addEventListener('click', () => {
    cartSection.style.display = cartSection.style.display === 'none' || cartSection.style.display === '' ? 'block' : 'none';
});

// Ödeme Yap Butonuna Tıklama
checkoutBtn.addEventListener('click', () => {
    alert('Ödeme işlemi henüz uygulanmamaktadır.');
});

// Ürün Detaylarını Göster
function showProductDetail(productName, productPrice, productDescription, imageUrl) {
    productDetailSection.innerHTML = `
        <img src="${imageUrl}" alt="${productName}">
        <h2>${productName}</h2>
        <p>Fiyat: ${productPrice}₺</p>
        <p>${productDescription}</p>
        <button onclick="addToCart('${productName}', ${productPrice})">Sepete Ekle</button>
    `;
    productDetailSection.style.display = 'block';
}

// Bildirim Göster
function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = 1;
    setTimeout(() => {
        notification.style.opacity = 0;
    }, 3000);
}

// Sayfa Yüklenirken Sepeti Yükle
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

// Hakkında Sayfasını Aç
function openAboutPage() {
    window.open('about.html', '_blank'); // 'about.html' yerine kendi hakkında sayfanızın yolunu yazın
}
