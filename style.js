// Variable Global untuk Menyimpan Listener Realtime Firebase
let currentOrderRef = null;

// Fungsi Format Angka ke Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(number);
}

// Data Menu Kantin dengan Kategori Makanan/Minuman
const menuData = [
    // Kantin Bawah
    { id: "k1_1", nama: "Risol", harga: 2000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Risol.jpg" },
    { id: "k1_2", nama: "Taso", harga: 2000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Taso.jpg" },
    { id: "k1_3", nama: "Menjes", harga: 2000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Menjes.jpg" },
    { id: "k1_4", nama: "Usus", harga: 1000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Sate Usus.jpg" },
    { id: "k1_5", nama: "Cimol", harga: 1000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "cimol.jpg" },
    { id: "k1_6", nama: "Mie Goreng", harga: 4000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Mie Goreng.jpg" },
    { id: "k1_7", nama: "Cihu", harga: 3000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "cihu.jpg" },
    { id: "k1_8", nama: "Donat Salju", harga: 2000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Donat salju.jpg" },
    { id: "k1_9", nama: "Kerupuk Pedas", harga: 1000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Kerupuk Pedas.jpg" },
    { id: "k1_10", nama: "Basreng", harga: 500, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Basreng.jpg" },
    { id: "k1_11", nama: "Coco Crunch", harga: 1000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Coco Crunch.jpg" },
    { id: "k1_12", nama: "Es Teh", harga: 1000, kantin: "Kantin Bawah", kategori: "minuman", gambar: "Es Teh.jpg" },
    { id: "k1_13", nama: "Es Jeruk", harga: 1000, kantin: "Kantin Bawah", kategori: "minuman", gambar: "Es jeruk.jpg" },
    { id: "k1_14", nama: "Ayam Geprek", harga: 8000, kantin: "Kantin Bawah", kategori: "makanan", gambar: "Ayam Geprek - Copy.jpg" },
    
    // Kantin Atas
    { id: "k2_1", nama: "Sushi", harga: 3000, kantin: "Kantin Atas", kategori: "makanan", gambar: "sushi.jpg" },
    { id: "k2_2", nama: "Macaroni Marsha", harga: 2500, kantin: "Kantin Atas", kategori: "makanan", gambar: "Macaroni Marsha.jpg" },
    { id: "k2_3", nama: "Terang Bulan", harga: 3000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Terang Bulan Mini.jpg" },
    { id: "k2_4", nama: "Tahu Kres", harga: 3000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Tahu Kres.jpg" },
    { id: "k2_5", nama: "Ayam Goreng Kecil-Kecil", harga: 3000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Tempura.jpg" },
    { id: "k2_6", nama: "Donat Rasa-rasa", harga: 3000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Donat Rasa-rasa.jpg" },
    { id: "k2_7", nama: "Snack Stik", harga: 2000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Snack stik.jpg" },
    { id: "k2_8", nama: "Pop Mie", harga: 6000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Pop Mie.jpg" },
    { id: "k2_9", nama: "Ayam Geprek", harga: 7000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Ayam Geprek - Copy.jpg" },
    { id: "k2_10", nama: "Rice Bowl", harga: 8000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Rice Bowl.jpg" },
    { id: "k2_11", nama: "Nasi Goreng", harga: 7000, kantin: "Kantin Atas", kategori: "makanan", gambar: "Nasi Goreng.jpg" },
    { id: "k2_12", nama: "Oky jelly Drink", harga: 2000, kantin: "Kantin Atas", kategori: "minuman", gambar: "Oky Jelly Drink.jpg" },
    { id: "k2_13", nama: "Cimory", harga: 7000, kantin: "Kantin Atas", kategori: "minuman", gambar: "Cimory.jpg" },
    { id: "k2_14", nama: "Golda", harga: 4000, kantin: "Kantin Atas", kategori: "minuman", gambar: "Golda.jpg" },
    { id: "k2_15", nama: "Milku", harga: 4000, kantin: "Kantin Atas", kategori: "minuman", gambar: "Milku.jpg" },
    { id: "k2_16", nama: "Ote", harga: 1000, kantin: "Kantin Atas", kategori: "minuman", gambar: "Ote.jpg" },
    { id: "k2_17", nama: "Teh Hijau", harga: 1000, kantin: "Kantin Atas", kategori: "minuman", gambar: "Teh Hijau.jpg" }
];

let cart = [];
let currentKantinFilter = 'all';
let currentCategoryFilter = 'all';
let currentFilter = 'all';

// Handle Submit Form Landing Page
document.getElementById('form-pemesan').addEventListener('submit', function(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const kelas = document.getElementById('kelas').value.trim();
    const absen = document.getElementById('absen').value.trim();

    document.getElementById('buyerName').value = nama;
    document.getElementById('buyerClass').value = `${kelas} Absen ${absen}`;

    document.getElementById('sapaan-user').innerText = `Halo, ${nama}!`;

    if (document.getElementById('summaryName')) {
        document.getElementById('summaryName').innerText = nama;
    }
    if (document.getElementById('summaryClass')) {
        document.getElementById('summaryClass').innerText = `${kelas} Absen ${absen}`;
    }

    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';

    renderMenu(menuData);
});

function getItemIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('es') || n.includes('teh') || n.includes('jeruk') || n.includes('golda') || n.includes('milku') || n.includes('oky') || n.includes('cimory')) return 'fa-glass-water';
    if (n.includes('nasi') || n.includes('bowl') || n.includes('geprek')) return 'fa-bowl-rice';
    if (n.includes('mie') || n.includes('sushi') || n.includes('macaroni')) return 'fa-utensils';
    if (n.includes('donat') || n.includes('terang bulan')) return 'fa-cookie';
    return 'fa-cookie-bite';
}

function renderMenu(items) {
    const container = document.getElementById('menuGrid');
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Menu tidak ditemukan.</p>';
        return;
    }

    items.forEach(item => {
        const badgeClass = item.kantin === 'Kantin Bawah' ? 'badge-k1' : 'badge-k2';
        const card = document.createElement('div');
        card.className = 'menu-card';
        
        const mediaDisplay = item.gambar 
            ? `<img src="${item.gambar}" alt="${item.nama}" class="menu-img" onerror="this.onerror=null; this.outerHTML='<div class=\\'item-icon\\'><i class=\\'fa-solid ${getItemIcon(item.nama)}\\'></i></div>';">`
            : `<div class="item-icon"><i class="fa-solid ${getItemIcon(item.nama)}"></i></div>`;

        card.innerHTML = `
            <div>
                <div class="card-header">
                    <span class="badge-kantin ${badgeClass}">${item.kantin}</span>
                </div>
                ${mediaDisplay}
                <h3 class="item-title">${item.nama}</h3>
                <div class="item-price">${formatRupiah(item.harga)}</div>
            </div>
            <button class="add-btn" onclick="addToCart('${item.id}')">
                <i class="fa-solid fa-plus"></i> Tambah
            </button>
        `;
        container.appendChild(card);
    });
}

function setFilter(kantin, kategori, element) {
    currentKantinFilter = kantin;
    currentCategoryFilter = kategori;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    applyFilters();
}

// Fungsi Filter Kantin (Grup Kiri)
function filterKantin(kantin, element) {
    currentKantinFilter = kantin;
    document.querySelectorAll('#kantinFilterGroup .tab-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    applyFilters();
}

// Fungsi Filter Kategori (Grup Kanan)
function filterKategori(kategori, element) {
    currentCategoryFilter = kategori;
    document.querySelectorAll('#categoryFilterGroup .tab-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    applyFilters();
}

function searchMenu() {
    applyFilters();
}

function applyFilters() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();

    const filtered = menuData.filter(item => {
        const matchesKantin = currentKantinFilter === 'all' || item.kantin === currentKantinFilter;
        const matchesCategory = currentCategoryFilter === 'all' || item.kategori === currentCategoryFilter;
        const matchesSearch = item.nama.toLowerCase().includes(searchVal);

        return matchesKantin && matchesCategory && matchesSearch;
    });

    renderMenu(filtered);
}


function addToCart(itemId) {
    const item = menuData.find(m => m.id === itemId);
    const existing = cart.find(c => c.id === itemId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCart();
}

function updateQty(itemId, change) {
    const itemIndex = cart.findIndex(c => c.id === itemId);
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

    cartBadge.innerText = totalItems;
    cartTotal.innerText = formatRupiah(totalPrice);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; margin-bottom: 12px; color: #CCC;"></i>
                <p>Keranjang masih kosong</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.nama}</h4>
                <span>${item.kantin} - ${formatRupiah(item.harga)}</span>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function handleCheckout() {
    const nama = document.getElementById('buyerName').value.trim();
    const kelas = document.getElementById('buyerClass').value.trim();
    const catatan = document.getElementById('buyerNote').value.trim();
    
    if (!nama || !kelas) {
        alert('Mohon isi Nama Lengkap dan Kelas terlebih dahulu!');
        return;
    }

    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }

    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const totalPrice = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

    if (paymentMethod === 'qris' && !document.getElementById('qrisModal')?.classList.contains('confirmed')) {
        document.getElementById('qrisTotalAmount').innerText = formatRupiah(totalPrice);
        document.getElementById('qrisModal').classList.add('active');
        return;
    }

    const orderData = {
        nama: nama,
        kelas: kelas,
        pengambilan: deliveryMethod,
        pembayaran: paymentMethod === 'qris' ? 'QRIS' : 'Tunai',
        catatan: catatan,
        total: totalPrice,
        items: cart,
        status: 'Pending',
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref('pesanan/').push(orderData)
        .then((ref) => {
            alert('Pesanan Anda berhasil dikirim!');
            
            listenOrderStatus(ref.key);

            cart = [];
            updateCart();

            if (document.getElementById('qrisModal')) {
                document.getElementById('qrisModal').classList.remove('active', 'confirmed');
            }
        })
        .catch((error) => {
            alert('Gagal mengirim pesanan: ' + error.message);
        });
}

function listenOrderStatus(orderId) {
    const statusCard = document.getElementById('orderStatusCard');
    const badgeDisplay = document.getElementById('statusBadgeDisplay');
    const timeDisplay = document.getElementById('statusTimeDisplay');

    if (!statusCard) return;

    if (currentOrderRef) {
        currentOrderRef.off();
    }

    currentOrderRef = database.ref('pesanan/' + orderId);
    currentOrderRef.on('value', (snapshot) => {
        const order = snapshot.val();
        if (order) {
            statusCard.style.display = 'block';

            if (order.status === 'Selesai') {
                badgeDisplay.innerText = 'Pesanan Selesai';
                badgeDisplay.className = 'status-badge-inline status-selesai';
                timeDisplay.innerText = `Pesanan selesai diproses pada jam ${order.waktu}`;
            } else {
                badgeDisplay.innerText = 'Pending (Menunggu)';
                badgeDisplay.className = 'status-badge-inline status-pending';
                timeDisplay.innerText = `Pesanan dikirim jam ${order.waktu}`;
            }
        }
    });
}

function closeQrisModal() {
    document.getElementById('qrisModal').classList.remove('active');
}

function confirmQrisPayment() {
    const qrisModal = document.getElementById('qrisModal');
    if (qrisModal) {
        qrisModal.classList.add('confirmed');
        qrisModal.classList.remove('active');
    }
    handleCheckout();
}

function highlightNote() {
    const noteInput = document.getElementById('buyerNote');
    if (noteInput) {
        noteInput.focus();
        noteInput.placeholder = "Wajib isi lokasi pengantaran (Contoh: Kelas 9B / Gazebo Utama)";
    }
}

function processWhatsAppCheckout(metodeBayar) {
    const nama = document.getElementById('buyerName').value.trim();
    const kelas = document.getElementById('buyerClass').value.trim();
    const catatan = document.getElementById('buyerNote').value.trim();
    
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;

    let message = "*PESANAN KANTIN ONLINE*\n";
    message += `-----------------------------------\n`;
    message += `*DATA PEMESAN:*\n`;
    message += `• Nama: ${nama}\n`;
    message += `• Kelas / Absen: ${kelas}\n`;
    message += `• Pengambilan: *${deliveryMethod}*\n`;
    message += `• Pembayaran: *${metodeBayar}*\n`;
    if (catatan) {
        message += `• Catatan/Lokasi: ${catatan}\n`;
    }
    message += `-----------------------------------\n\n`;
    message += `*RINCIAN PESANAN:*\n`;

    let grandTotal = 0;
    cart.forEach((item, index) => {
        const subtotal = item.harga * item.qty;
        grandTotal += subtotal;
        message += `${index + 1}. *${item.nama}* (${item.kantin})\n   ${item.qty}x @ ${formatRupiah(item.harga)} = ${formatRupiah(subtotal)}\n`;
    });

    message += `\n*Total Pembayaran: ${formatRupiah(grandTotal)}*\n\n`;
    
    if (metodeBayar.includes('QRIS')) {
        message += `_Saya telah melakukan pembayaran via QRIS. Berikut saya lampirkan bukti transfernya:_`;
    } else {
        message += `Mohon konfirmasi pesanan saya. Terima kasih!`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phone = "6282335772461";
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

function updateDeliveryNote() {
    const noteInput = document.getElementById('buyerNote');
    if (!noteInput) return;

    const nama = document.getElementById('buyerName')?.value.trim() || '';
    const kelasAbsen = document.getElementById('buyerClass')?.value.trim() || '';

    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;

    if (deliveryMethod === 'Ambil Sendiri') {
        noteInput.value = "Harap segera ambil di kantin";
    } else if (deliveryMethod === 'Diantarkan') {
        if (nama || kelasAbsen) {
            noteInput.value = `Diantarkan untuk ${nama} (${kelasAbsen})`;
        } else {
            noteInput.value = "Diantarkan sesuai data lokasi / kelas pemesan";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('buyerName');
    const classInput = document.getElementById('buyerClass');

    if (nameInput) nameInput.addEventListener('input', updateDeliveryNote);
    if (classInput) classInput.addEventListener('input', updateDeliveryNote);

    updateDeliveryNote();
});

const bgImages = [
    'bg mtsn 1.jpeg',
    'bg mtsn 2.jpeg'
];

let currentBgIndex = 0;
let activeLayer = 1;

function changeBackground() {
    const layer1 = document.getElementById('bg-overlay-1');
    const layer2 = document.getElementById('bg-overlay-2');
    
    if (!layer1 || !layer2) return;

    const overlayGradient = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))';
    const imageUrl = encodeURI(bgImages[currentBgIndex]);

    const imgPreload = new Image();
    imgPreload.src = imageUrl;

    imgPreload.onload = () => {
        if (activeLayer === 1) {
            layer2.style.backgroundImage = `${overlayGradient}, url("${imageUrl}")`;
            layer2.style.opacity = '1';
            layer1.style.opacity = '0';
            activeLayer = 2;
        } else {
            layer1.style.backgroundImage = `${overlayGradient}, url("${imageUrl}")`;
            layer1.style.opacity = '1';
            layer2.style.opacity = '0';
            activeLayer = 1;
        }
    };

    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
}

changeBackground();
setInterval(changeBackground, 6000);

