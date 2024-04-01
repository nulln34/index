function toggleMenu() {
    var menu = document.getElementById("sideMenu");
    menu.classList.toggle("active");
}

let cartItems = []; // Sepetteki ürünleri tutacak dizi

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    updateCartCounter();
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Sepet öğelerini localStorage'a kaydet
}


// cart.js

// Sepet içeriğini listeleme fonksiyonu
function listCartItems() {
    // localStorage'dan sepet içeriğini al
    let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Sepet içeriğini gösterecek olan element
    const cartItemsContainer = document.querySelector('.cart-items');

    // Eğer sepet boşsa, kullanıcıya bilgi ver
    if (storedItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Sepetiniz boş.</p>';
        return;
    }

    // Sepet içeriğini HTML olarak oluştur
    const cartHTML = storedItems.map(item => `
        <div class="cart-item">
            <div class="product-image">
                <img src="product.png" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price} TL</p>
            </div>
        </div>
    `).join('');

    // Oluşturulan HTML'i sepet içeriği container'ına ekle
    cartItemsContainer.innerHTML = cartHTML;
}


function clearCart() {
    cartItems = []; // Sepet öğelerini boşalt
    updateCartCounter();
    localStorage.removeItem('cartItems'); // localStorage'daki sepet öğelerini temizle
    location.reload()
}


// Toplam fiyatı hesaplama fonksiyonu
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price;
    });
    return total;
}

// Sepet bilgilerini güncelleme fonksiyonu
function updateCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // Önceki ürünleri temizle
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="price">${item.price} TL</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = document.querySelector('.total-price');
    totalPrice.textContent = `${calculateTotal()} TL`;
}



// Sepet sayacını güncelleme fonksiyonu
function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    cartCounter.textContent = cartItems.length; // Sepetteki ürün sayısını göster
    localStorage.setItem('cartCounter', cartItems.length); // Sepet sayısını localStorage'a kaydet
}


// Sayfa yüklendiğinde localStorage'dan sepet sayısını alarak cart counter'ı güncelle
window.onload = function() {
    const storedCartCounter = localStorage.getItem('cartCounter');
    if (storedCartCounter) {
        const cartCounter = document.querySelector('.cart-counter');
        cartCounter.textContent = storedCartCounter;
    }
};


function toggleCart() {
    window.location.href = "cart.html";
}


window.onload = listCartItems;




function bannerHandler(banner) {
    // Arka plan resminin opacity'sini sıfırlayarak geçiş efektini tetikle
    const bannerImage = document.getElementById('bannerImage');
    bannerImage.classList.add('hide');
    
    // Arka plan resmini değiştir
    setTimeout(function() {
        bannerImage.src = 'banner' + banner + '.png';
        bannerImage.classList.remove('hide');
    }, 500); // 500ms sonra resmi yeniden göster
}


