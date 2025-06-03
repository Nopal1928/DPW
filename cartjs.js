// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.selectedPayment = null;
        this.updateCartDisplay();
        this.updateCartCount();
    }

    addItem(item, quantity = 1) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            this.items.push({
                ...item,
                quantity: parseInt(quantity)
            });
        }

        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = parseInt(newQuantity);
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    calculateSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    calculateTax() {
        return this.calculateSubtotal() * 0.1;
    }

    calculateTotal() {
        return this.calculateSubtotal() + this.calculateTax();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    updateCartDisplay() {
        const cartContainer = document.getElementById('cartItemsContainer');
        const subtotalElement = document.getElementById('cartSubtotal');
        const taxElement = document.getElementById('cartTax');
        const totalElement = document.getElementById('cartTotal');

        // Update cart count badge
        this.updateCartCount();

        if (cartContainer) {
            if (this.items.length === 0) {
                cartContainer.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5>Your cart is empty</h5>
                        <a href="menu.html" class="btn btn-warning mt-3">Browse Menu</a>
                    </div>
                `;
            } else {
                cartContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item mb-4 p-3 bg-white rounded shadow-sm">
                        <div class="row align-items-center">
                            <div class="col-12 col-md-2">
                                <div class="cart-image-wrapper" style="width: 100px; height: 100px; overflow: hidden; border-radius: 8px;">
                                    <img src="${item.image}" alt="${item.name}" 
                                         class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mt-3 mt-md-0">
                                <h5 class="mb-1 fw-bold">${item.name}</h5>
                                <p class="text-muted mb-0">Rp ${item.price.toLocaleString()} / item</p>
                            </div>
                            <div class="col-12 col-md-3 mt-3 mt-md-0">
                                <div class="input-group input-group-sm" style="max-width: 150px;">
                                    <button class="btn btn-outline-warning" 
                                            onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input type="number" class="form-control text-center bg-light" 
                                           value="${item.quantity}" 
                                           onchange="cart.updateQuantity(${item.id}, this.value)"
                                           min="1" max="99">
                                    <button class="btn btn-outline-warning" 
                                            onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-md-2 mt-3 mt-md-0 text-end">
                                <span class="fw-bold">Rp ${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                            <div class="col-12 col-md-1 mt-3 mt-md-0 text-end">
                                <button class="btn btn-link text-danger p-0" 
                                        onclick="cart.removeItem(${item.id})"
                                        title="Remove item">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (subtotalElement) {
            subtotalElement.textContent = `Rp ${this.calculateSubtotal().toLocaleString()}`;
        }
        if (taxElement) {
            taxElement.textContent = `Rp ${this.calculateTax().toLocaleString()}`;
        }
        if (totalElement) {
            totalElement.textContent = `Rp ${this.calculateTotal().toLocaleString()}`;
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Function to find menu item by ID
function findMenuItem(itemId) {
    return menuItems.find(item => item.id === itemId);
}

// Function to add item to cart from menu
function addToCart(itemId) {
    const menuItem = findMenuItem(itemId);
    if (!menuItem) {
        console.error('Menu item not found');
        return;
    }

    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value);
    cart.addItem(menuItem, quantity);

    // Show success message
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Sukses</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${menuItem.name} telah ditambahkan ke keranjang
            </div>
        </div>
    `;
    document.body.appendChild(toastContainer);
    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastContainer.remove();
    });
}

// Checkout functions
function proceedToCheckout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

function selectPayment(method) {
    cart.selectedPayment = method;
    
    // Update UI for selected payment method
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Show payment instructions
    const instructionsDiv = document.querySelector('.payment-instructions');
    const instructionsContent = document.getElementById('paymentInstructions');
    
    let instructions = '';
    switch(method) {
        case 'dana':
            instructions = `
                <ol class="mb-0">
                    <li>Buka aplikasi DANA di HP Anda</li>
                    <li>Scan QR code yang akan muncul setelah konfirmasi pesanan</li>
                    <li>Masukkan PIN DANA Anda</li>
                    <li>Pembayaran selesai</li>
                </ol>
            `;
            break;
        case 'ovo':
            instructions = `
                <ol class="mb-0">
                    <li>Buka aplikasi OVO di HP Anda</li>
                    <li>Pilih menu "Scan QR"</li>
                    <li>Scan QR code yang akan muncul</li>
                    <li>Konfirmasi pembayaran di aplikasi OVO</li>
                </ol>
            `;
            break;
        case 'gopay':
            instructions = `
                <ol class="mb-0">
                    <li>Buka aplikasi Gojek di HP Anda</li>
                    <li>Pilih metode pembayaran GoPay</li>
                    <li>Scan QR code pembayaran</li>
                    <li>Konfirmasi pembayaran Anda</li>
                </ol>
            `;
            break;
        case 'bank':
            instructions = `
                <ol class="mb-0">
                    <li>Catat nomor rekening yang akan muncul</li>
                    <li>Transfer sesuai nominal pesanan</li>
                    <li>Simpan bukti transfer</li>
                    <li>Upload bukti transfer pada form yang akan muncul</li>
                </ol>
            `;
            break;
    }

    instructionsContent.innerHTML = instructions;
    instructionsDiv.style.display = 'block';
}

function confirmOrder() {
    if (!cart.selectedPayment) {
        alert('Please select a payment method!');
        return;
    }

    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Generate order ID
    const orderId = 'ORD' + Date.now();
    document.getElementById('orderId').textContent = orderId;

    // Save order to history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.unshift({
        orderId: orderId,
        items: cart.items,
        total: cart.calculateTotal(),
        paymentMethod: cart.selectedPayment,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Clear cart
    cart.items = [];
    cart.saveCart();

    // Hide checkout modal and show success modal
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}