// Menu data - daftar menu yang tersedia
const menuItems = [
    {
        id: 1,
        name: 'Mie Ayam Biasa',
        category: 'mieayam',
        description: 'Mie dengan topping ayam berbumbu manis gurih, disajikan dengan sawi dan kuah kaldu yang hangat.',
        price: 12000,
        image: 'Image/mieayambiasa.jpg'
    },
    {
        id: 2,
        name: 'Mie Ayam Bakso',
        category: 'mieayam',
        description: 'Perpaduan mie ayam klasik dengan tambahan bakso kenyal yang menambah cita rasa dan kelezatan.',
        price: 14000,
        image: 'Image/mieayambakso.jpg.png'
    },
    {
        id: 3,
        name: 'Mie Yamin',
        category: 'mieayam',
        description: 'Mie manis khas dengan bumbu kecap, dilengkapi ayam cincang dan pelengkap seperti sawi serta kuah terpisah.',
        price: 13000,
        image: 'Image/mieyamin.jpg.png'
    },
    {
        id: 4,
        name: 'Mie Ayam Komplit',
        category: 'mieayam',
        description: 'Satu mangkuk lengkap berisi mie ayam, bakso, dan pangsit, menyajikan rasa yang kaya dan memuaskan.',
        price:15000,
        image: 'Image/mieayamkomplit.jpg.png'
    },
    {
        id: 5,
        name: 'Bakso Biasa',
        category: 'bakso',
        description: 'Bakso sapi kenyal disajikan dengan kuah kaldu gurih, mi atau bihun, dan taburan seledri serta bawang goreng.',
        price:17000,
        image: 'Image/baksobiasa.png'
    },
    {
        id: 6,
        name: 'Bakso Komplit',
        category: 'bakso',
        description: 'Sajian lengkap berisi bakso, tahu, mie, bihun, pangsit, dan sayuran dalam satu mangkuk kuah yang menggoda.',
        price:21000,
        image: 'Image/baksokomplit.png'
    },
    {
        id: 7,
        name: 'Bakso Telur',
        category: 'bakso',
        description: 'Bakso berukuran besar dengan isian telur rebus di dalamnya, menawarkan rasa dan tekstur yang unik.',
        price:19000,
        image: 'Image/baksotelur.png'
    },
    {
        id: 8,
        name: 'Bakso Beranak',
        category: 'bakso',
        description: 'Bakso jumbo yang di dalamnya tersembunyi beberapa bakso kecil, menciptakan kejutan lezat di setiap suapan.',
        price:20000,
        image: 'Image/baksoberanak.png'
    },
    {
        id: 9,
        name: 'Es Teh',
        category: 'minuman',
        description: 'Minuman segar dari teh manis yang disajikan dingin, cocok untuk melepas dahaga kapan saja.',
        price:5000,
        image: 'Image/esteh.png'
    },
    {
        id: 10,
        name: 'Es Jeruk',
        category: 'minuman',
        description: 'Perasan jeruk segar dengan rasa manis dan asam yang menyegarkan, disajikan dengan es batu.',
        price:6000,
        image: 'Image/esjeruk.png'
    },
    {
        id: 11,
        name: 'Jus Mangga',
        category: 'minuman',
        description: 'Minuman kental dan manis dari buah mangga matang, nikmat disantap dingin.',
        price:8000,
        image: 'Image/jusmangga.png'
    },
    {
        id: 8,
        name: 'Es Buah',
        category: 'minuman',
        description: 'Campuran aneka buah segar dengan sirup manis dan es serut, menawarkan sensasi segar dan berwarna.',
        price:10000,
        image: 'Image/esbuah.png'
    }
    // Tambahkan menu item lainnya di sini
];

function displayMenuItems(category = 'all') {
    const menuContainer = document.getElementById('menuItems');
    const items = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    menuContainer.innerHTML = items.map(item => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="menu-item">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="menu-item-badge">
                        ${getCategoryLabel(item.category)}
                    </div>
                </div>
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-footer">
                        <div class="menu-item-price">
                            Rp ${item.price.toLocaleString()}
                        </div>
                        <div class="menu-item-actions">
                            <input type="number" 
                                   class="quantity-input" 
                                   id="quantity-${item.id}" 
                                   value="1" 
                                   min="1" 
                                   max="10">
                            <button class="add-to-cart-btn" 
                                    onclick="addToCart(${item.id})">
                                <i class="fas fa-cart-plus me-2"></i>
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    switch(category) {
        case 'mieayam':
            return 'Mie Ayam';
        case 'bakso':
            return 'Bakso';
        case 'minuman':
            return 'Minuman';
        default:
            return 'Menu';
    }
}

// Fungsi untuk mengatur jumlah item
function incrementQuantity(inputId) {
    const input = document.getElementById(inputId);
    const currentValue = parseInt(input.value);
    if (currentValue < 10) {
        input.value = currentValue + 1;
    }
}

function decrementQuantity(inputId) {
    const input = document.getElementById(inputId);
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// Initialize menu when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
    
    // Add category filter functionality
    document.querySelectorAll('#menuTabs .nav-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            document.querySelector('#menuTabs .active').classList.remove('active');
            e.target.classList.add('active');
            displayMenuItems(category);
        });
    });
});