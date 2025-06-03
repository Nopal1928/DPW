// Add this to your existing cart.js
function proceedToCheckout() {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (currentCart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = calculateTotal(currentCart);
    const paymentMethod = prompt('Choose payment method (DANA/OVO/GOPAY/BANK TRANSFER):');
    
    if (paymentMethod) {
        // Add to payment history
        paymentHistory.addPayment({
            items: currentCart,
            total: total,
            paymentMethod: paymentMethod.toUpperCase()
        });

        // Clear cart
        localStorage.setItem('cart', '[]');
        updateCartDisplay();
        
        // Show success message
        showCheckoutSuccess();
    }
}

function showCheckoutSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success text-center';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle fa-3x mb-3"></i>
        <h4>Thank You!</h4>
        <p>Your order has been successfully placed.</p>
    `;
    
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('cartItems').appendChild(successDiv);
    
    setTimeout(() => {
        const cartSidebar = bootstrap.Offcanvas.getInstance(document.getElementById('cartSidebar'));
        cartSidebar.hide();
    }, 3000);
}

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}