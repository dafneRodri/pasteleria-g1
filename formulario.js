document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENÚ MÓVIL TOGGLE
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-bars';
            } else {
                menuIcon.className = 'fa-solid fa-xmark';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* ==========================================================================
       2. FILTRADO DE PRODUCTOS EN EL CATÁLOGO
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-rose-500', 'text-white', 'shadow-md', 'shadow-rose-200');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });

            btn.classList.add('active', 'bg-rose-500', 'text-white', 'shadow-md', 'shadow-rose-200');
            btn.classList.remove('bg-gray-100', 'text-gray-600');

            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       3. LÓGICA DEL FORMULARIO & VALIDACIÓN
       ========================================================================== */
    const orderForm = document.getElementById('orderForm');
    const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
    const addressContainer = document.getElementById('addressContainer');
    const cakeTypeSelect = document.getElementById('cakeType');
    const cakeSizeSelect = document.getElementById('cakeSize');
    const totalPriceEstimate = document.getElementById('totalPriceEstimate');

    // Muestra/Oculta la dirección si selecciona Envío a Domicilio
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'delivery') {
                addressContainer.classList.remove('hidden');
            } else {
                addressContainer.classList.add('hidden');
            }
            calculatePrice();
        });
    });

    // Calculador de Precio Estimado
    function calculatePrice() {
        let basePrice = 350;
        const selectedCake = cakeTypeSelect.value;
        const sizeMultiplier = parseInt(cakeSizeSelect.value) || 10;
        const isDelivery = document.querySelector('input[name="deliveryType"]:checked').value === 'delivery';

        if (selectedCake.includes('Boda')) basePrice = 800;
        else if (selectedCake.includes('Velvet')) basePrice = 450;
        else if (selectedCake.includes('Vegana')) basePrice = 400;
        else if (selectedCake.includes('Cupcakes')) basePrice = 280;
        else if (selectedCake.includes('Macarons')) basePrice = 600;

        let total = basePrice + (sizeMultiplier * 15);
        if (isDelivery) total += 80;

        totalPriceEstimate.innerText = `$${total.toFixed(2)} MXN`;
    }

    cakeTypeSelect.addEventListener('change', calculatePrice);
    cakeSizeSelect.addEventListener('change', calculatePrice);

    // Validación del Formulario al Enviar
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Limpiar errores previos
            document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('input, select').forEach(el => el.classList.remove('input-error'));

            // Validar Nombre
            const name = document.getElementById('clientName');
            if (!name.value.trim()) {
                showError(name);
                isValid = false;
            }

            // Validar Teléfono (10 dígitos mínimo)
            const phone = document.getElementById('clientPhone');
            if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 8) {
                showError(phone);
                isValid = false;
            }

            // Validar Email
            const email = document.getElementById('clientEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email);
                isValid = false;
            }

            // Validar Tipo de Pastel
            if (!cakeTypeSelect.value) {
                showError(cakeTypeSelect);
                isValid = false;
            }

            // Validar Fecha
            const date = document.getElementById('eventDate');
            if (!date.value) {
                showError(date);
                isValid = false;
            }

            // Validar Dirección si es delivery
            const isDelivery = document.querySelector('input[name="deliveryType"]:checked').value === 'delivery';
            const address = document.getElementById('deliveryAddress');
            if (isDelivery && !address.value.trim()) {
                showError(address);
                isValid = false;
            }

            if (isValid) {
                openModal();
            }
        });
    }

    function showError(inputElement) {
        inputElement.classList.add('input-error');
        const errorSpan = inputElement.parentElement.querySelector('.error-msg');
        if (errorSpan) errorSpan.classList.remove('hidden');
    }

    /* ==========================================================================
       4. INICIALIZACIÓN DEL MAPA CON LEAFLET.JS
       ========================================================================== */
    if (document.getElementById('map')) {
        // Coordenadas Paseo de la Reforma CDMX
        const lat = 19.4270;
        const lng = -99.1677;

        const map = L.map('map', {
            scrollWheelZoom: false
        }).setView([lat, lng], 14);

        // Tile layer elegante estilo claro
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 19
        }).addTo(map);

        // Marcador personalizado
        const customIcon = L.divIcon({
            className: 'custom-map-pin',
            html: `
                <div style="background-color: #F67280; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    <i class="fa-solid fa-cake-candles"></i>
                </div>
            `,
            iconSize: [42, 42],
            iconAnchor: [21, 42],
            popupAnchor: [0, -40]
        });

        // Marcador con popup
        L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; font-family: 'Poppins', sans-serif; padding: 5px;">
                    <h4 style="font-family: 'Playfair Display', serif; font-weight: bold; font-size: 16px; margin-bottom: 4px; color: #355C7D;">Dulce Arte Pâtisserie</h4>
                    <p style="font-size: 12px; color: #666; margin: 0;">¡Te esperamos para endulzar tu día!</p>
                </div>
            `)
            .openPopup();

        // Círculo de cobertura de envío (10km aprox)
        L.circle([lat, lng], {
            color: '#F67280',
            fillColor: '#F8B195',
            fillOpacity: 0.15,
            radius: 3500
        }).addTo(map);
    }

});

/* ==========================================================================
   5. FUNCIONES GLOBALES (Quick Order & Modal)
   ========================================================================== */
function quickOrder(productName) {
    const cakeSelect = document.getElementById('cakeType');
    if (cakeSelect) {
        for (let i = 0; i < cakeSelect.options.length; i++) {
            if (cakeSelect.options[i].value.includes(productName) || productName.includes(cakeSelect.options[i].value)) {
                cakeSelect.selectedIndex = i;
                break;
            }
        }
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}