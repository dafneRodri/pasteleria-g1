document.addEventListener('DOMContentLoaded', () => {

    // 1. ESCRIBE AQUÍ TU NÚMERO REAL DE WHATSAPP (52 + 10 dígitos)
    // Ejemplo para CDMX/Edomex: 52 + 55 + 8 dígitos locales = 12 dígitos en total
    const NUMERO_WHATSAPP_TIENDA = "525512345678"; // Reemplaza con tu número real de WhatsApp

    /* Base de datos de productos */
    const PRODUCTOS_DETALLE = {
        p1: {
            titulo: "Pastel Nupcial Elegancia",
            precio: "$1,200 MXN",
            categoria: "BODAS y XV AÑOS",
            imagen: "pastelBoda.jpeg",
            descripcion: "Diseñado para bodas inolvidables. Cuatro niveles de suave pan de vainilla humedecido con jarabe de flor de azahar, relleno de crema artesanal y flores de azúcar hechas a mano.",
            ingredientes: "Vainilla natural, manteca de cacao, harina de trigo, crema de leche fresca y azúcar refinada.",
            porciones: "50 a 70 personas",
            tiempoPreparacion: "3 días"
        },
        p2: {
            titulo: "Cumpleaños Choco-Art",
            precio: "$1,250 MXN",
            categoria: "CUMPLEAÑOS",
            imagen: "pastelChocolate.jpg",
            descripcion: "Bizcocho húmedo de tres chocolates belgas decorado con trufas finas, macaron de frambuesa y baño de ganache brillante.",
            ingredientes: "Chocolate 70% cacao, avellanas tostadas, crema de leche fresca.",
            porciones: "15 a 20 personas",
            tiempoPreparacion: "24 horas"
        },
        p3: {
            titulo: "Pastel Red Velvet & Fresas",
            precio: "$480 MXN",
            categoria: "INDIVIDUALES",
            imagen: "pastelRedVelvet.jpg",
            descripcion: "Esponjoso pan terciopelo rojo intercalado con suaves capas de betún de queso crema artesanal, decorado con abundantes fresas frescas.",
            ingredientes: "Harina de trigo, cacao ligero, queso crema mascarpone, fresas de cultivo local.",
            porciones: "10 a 14 personas",
            tiempoPreparacion: "24 horas"
        },
        p4: {
            titulo: "Macarrones Surtidos París",
            precio: "$350 MXN",
            categoria: "POSTRES INDIVIDUALES",
            imagen: "Maccarrons.jpg",
            descripcion: "Selección de macarons franceses crocantes por fuera y suaves por dentro con rellenos de pistache, frambuesa, limón y chocolate.",
            ingredientes: "Harina de almendra fina, clara de huevo, azúcar glass y mermeladas de fruta.",
            porciones: "10 a 12 piezas",
            tiempoPreparacion: "24 horas"
        },
        p5: {
            titulo: "Caja de Galletas Gourmet",
            precio: "$320 MXN",
            categoria: "GALLETAS",
            imagen: "galletas1.jpg",
            descripcion: "Caja especial con galletas artesanales estilo New York con toppings de Nutella, Lotus Biscoff y galletas Oreo.",
            ingredientes: "Harina de trigo, mantequilla de leche, galletas Biscoff, Oreo y chocolate.",
            porciones: "Caja con 6 galletas gigantes",
            tiempoPreparacion: "24 horas"
        },
        p6: {
            titulo: "Pastel Nupcial Minimalista",
            precio: "$850 MXN",
            categoria: "BODAS",
            imagen: "pastelBoda2.jpg",
            descripcion: "Pastel de 2 niveles con terminado texturizado en betún de mantequilla blanca, arreglo de flores naturales y topper decorativo.",
            ingredientes: "Pan de vainilla o almendra, betún de mantequilla vegetal y flores frescas.",
            porciones: "25 a 35 personas",
            tiempoPreparacion: "2 días"
        }
    };

    /* Menú móvil */
    const botonMenuMovil = document.getElementById('boton-menu-movil');
    const menuMovil = document.getElementById('menu-movil');
    const iconoMenu = document.getElementById('icono-menu');
    const enlacesMovil = document.querySelectorAll('.enlace-movil');

    if (botonMenuMovil) {
        botonMenuMovil.addEventListener('click', () => {
            menuMovil.classList.toggle('hidden');
            iconoMenu.className = menuMovil.classList.contains('hidden') ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
        });

        enlacesMovil.forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuMovil.classList.add('hidden');
                iconoMenu.className = 'fa-solid fa-bars';
            });
        });
    }

    /* Filtros */
    const botonesFiltro = document.querySelectorAll('.boton-filtro');
    const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => {
                b.classList.remove('activo', 'bg-pink-600', 'text-white', 'shadow-md', 'shadow-pink-200');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });

            boton.classList.add('activo', 'bg-pink-600', 'text-white', 'shadow-md', 'shadow-pink-200');
            boton.classList.remove('bg-gray-100', 'text-gray-600');

            const filtro = boton.dataset.filtro;
            tarjetasProductos.forEach(tarjeta => {
                tarjeta.style.display = (filtro === 'todos' || tarjeta.dataset.categoria === filtro) ? 'block' : 'none';
            });
        });
    });

    /* Modal de Producto */
    let productoActualModal = "";

    tarjetasProductos.forEach(tarjeta => {
        tarjeta.addEventListener('click', (e) => {
            if (e.target.closest('.btn-cotizar-tarjeta')) return;
            const idProducto = tarjeta.dataset.id;
            const datos = PRODUCTOS_DETALLE[idProducto];
            if (datos) abrirVentanaProducto(datos);
        });
    });

    document.querySelectorAll('.btn-cotizar-tarjeta').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            seleccionarProductoYScroll(btn.dataset.nombre);
        });
    });

    const botonCotizarModal = document.getElementById('botonCotizarModal');
    if (botonCotizarModal) {
        botonCotizarModal.addEventListener('click', () => {
            cerrarVentanaProducto();
            if (productoActualModal) seleccionarProductoYScroll(productoActualModal);
        });
    }

    const btnCerrarModalProducto = document.getElementById('btnCerrarModalProducto');
    if (btnCerrarModalProducto) btnCerrarModalProducto.addEventListener('click', cerrarVentanaProducto);

    const ventanaProducto = document.getElementById('ventanaProducto');
    if (ventanaProducto) {
        ventanaProducto.addEventListener('click', (e) => {
            if (e.target === ventanaProducto) cerrarVentanaProducto();
        });
    }

    const ventanaExito = document.getElementById('ventanaExito');
    if (ventanaExito) {
        ventanaExito.addEventListener('click', (e) => {
            if (e.target === ventanaExito) cerrarVentanaExito();
        });
    }

    const btnCerrarModalExito = document.getElementById('btnCerrarModalExito');
    if (btnCerrarModalExito) btnCerrarModalExito.addEventListener('click', cerrarVentanaExito);

    /* Elementos del Formulario y Cotizador */
    const formularioPedido = document.getElementById('formularioPedido');
    const radiosEntrega = document.querySelectorAll('input[name="tipoEntrega"]');
    const contenedorDireccion = document.getElementById('contenedorDireccion');
    const tipoPastelSelect = document.getElementById('tipoPastel');
    const tamanoPastelSelect = document.getElementById('tamanoPastel');
    const precioEstimadoTotal = document.getElementById('precioEstimadoTotal');

    function calcularPrecio() {
        if (!tipoPastelSelect || !tamanoPastelSelect || !precioEstimadoTotal) return;

        let precioBase = 350;
        const pastelSeleccionado = tipoPastelSelect.value;
        const multiplicadorTamano = parseInt(tamanoPastelSelect.value) || 10;
        const radioChecked = document.querySelector('input[name="tipoEntrega"]:checked');
        const esDomicilio = radioChecked ? radioChecked.value === 'domicilio' : false;

        if (pastelSeleccionado.includes('Nupcial')) precioBase = 800;
        else if (pastelSeleccionado.includes('Cumpleaños') || pastelSeleccionado.includes('Choco-Art')) precioBase = 500;
        else if (pastelSeleccionado.includes('Red Velvet')) precioBase = 420;
        else if (pastelSeleccionado.includes('Galletas')) precioBase = 320;
        else if (pastelSeleccionado.includes('Macarrones')) precioBase = 350;

        let total = precioBase + (multiplicadorTamano * 15);
        if (esDomicilio) total += 80;

        precioEstimadoTotal.innerText = `$${total.toFixed(2)} MXN`;
    }

    radiosEntrega.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (contenedorDireccion) {
                contenedorDireccion.classList.toggle('hidden', e.target.value !== 'domicilio');
            }
            calcularPrecio();
        });
    });

    if (tipoPastelSelect && tamanoPastelSelect) {
        tipoPastelSelect.addEventListener('change', calcularPrecio);
        tamanoPastelSelect.addEventListener('change', calcularPrecio);
    }

    /* Envío a WhatsApp */
    if (formularioPedido) {
        formularioPedido.addEventListener('submit', (e) => {
            e.preventDefault();
            let esValido = true;

            document.querySelectorAll('.mensaje-error').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('input, select').forEach(el => el.classList.remove('campo-error'));

            const nombre = document.getElementById('nombreCliente');
            if (!nombre || !nombre.value.trim()) { if(nombre) mostrarError(nombre); esValido = false; }

            const telefono = document.getElementById('telefonoCliente');
            if (!telefono || !telefono.value.trim() || telefono.value.replace(/\D/g, '').length < 8) { if(telefono) mostrarError(telefono); esValido = false; }

            const correo = document.getElementById('correoCliente');
            const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!correo || !formatoCorreo.test(correo.value.trim())) { if(correo) mostrarError(correo); esValido = false; }

            if (!tipoPastelSelect || !tipoPastelSelect.value) { if(tipoPastelSelect) mostrarError(tipoPastelSelect); esValido = false; }

            const fecha = document.getElementById('fechaEvento');
            if (!fecha || !fecha.value) { if(fecha) mostrarError(fecha); esValido = false; }

            const radioChecked = document.querySelector('input[name="tipoEntrega"]:checked');
            const esDomicilio = radioChecked ? radioChecked.value === 'domicilio' : false;
            let calleVal = "", coloniaVal = "", cpVal = "", refVal = "";

            if (esDomicilio) {
                const calle = document.getElementById('calleNumero');
                const colonia = document.getElementById('coloniaMunicipio');
                const cp = document.getElementById('codigoPostal');
                const ref = document.getElementById('referenciasUbicacion');

                if (!calle || !calle.value.trim()) { if(calle) mostrarError(calle); esValido = false; } else calleVal = calle.value.trim();
                if (!colonia || !colonia.value.trim()) { if(colonia) mostrarError(colonia); esValido = false; } else coloniaVal = colonia.value.trim();
                if (!cp || !cp.value.trim() || cp.value.trim().length < 4) { if(cp) mostrarError(cp); esValido = false; } else cpVal = cp.value.trim();
                if (ref) refVal = ref.value.trim();
            }

            if (esValido) {
                const notasElem = document.getElementById('notasPastel');
                const notasVal = notasElem ? notasElem.value.trim() : "";

                let textoMensaje = `¡Hola *D&A Pasteles*! 🍰✨\nMe gustaría solicitar el siguiente pedido:\n\n` +
                    `👤 *Cliente:* ${nombre.value.trim()}\n` +
                    `📞 *Teléfono:* ${telefono.value.trim()}\n` +
                    `📧 *Correo:* ${correo.value.trim()}\n` +
                    `🎂 *Producto:* ${tipoPastelSelect.value}\n` +
                    `👥 *Tamaño:* ${tamanoPastelSelect.options[tamanoPastelSelect.selectedIndex].text}\n` +
                    `📅 *Fecha:* ${fecha.value}\n` +
                    `🚚 *Entrega:* ${esDomicilio ? 'Envío a Domicilio' : 'Recoger en Sucursal'}\n`;

                if (esDomicilio) {
                    textoMensaje += `📍 *Dirección:* ${calleVal}, ${coloniaVal}, C.P. ${cpVal}\n`;
                    if (refVal) textoMensaje += `🏠 *Referencias:* ${refVal}\n`;
                }

                if (notasVal) textoMensaje += `📝 *Notas:* ${notasVal}\n`;
                textoMensaje += `\n💰 *Estimado:* ${precioEstimadoTotal.innerText}`;

                const urlWhatsapp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP_TIENDA}&text=${encodeURIComponent(textoMensaje)}`;

                window.open(urlWhatsapp, '_blank');
                abrirVentanaExito();
            }
        });
    }

    function mostrarError(elementoCampo) {
        elementoCampo.classList.add('campo-error');
        const spanError = elementoCampo.parentElement.querySelector('.mensaje-error');
        if (spanError) spanError.classList.remove('hidden');
    }

    function abrirVentanaProducto(datos) {
        productoActualModal = datos.titulo;
        const ventana = document.getElementById('ventanaProducto');
        if (!ventana) return;
        
        document.getElementById('imagenModalProducto').src = datos.imagen;
        document.getElementById('tituloModalProducto').innerText = datos.titulo;
        document.getElementById('precioModalProducto').innerText = datos.precio;
        document.getElementById('categoriaModalProducto').innerText = datos.categoria;
        document.getElementById('descripcionModalProducto').innerText = datos.descripcion;
        document.getElementById('ingredientesModalProducto').innerText = datos.ingredientes;
        document.getElementById('porcionesModalProducto').innerText = datos.porciones;
        document.getElementById('tiempoModalProducto').innerText = datos.tiempoPreparacion;

        ventana.classList.remove('hidden');
        setTimeout(() => ventana.classList.add('activo'), 10);
    }

    function cerrarVentanaProducto() {
        const ventana = document.getElementById('ventanaProducto');
        if (ventana) {
            ventana.classList.remove('activo');
            setTimeout(() => ventana.classList.add('hidden'), 300);
        }
    }

    function seleccionarProductoYScroll(nombreProducto) {
        if (tipoPastelSelect) {
            for (let i = 0; i < tipoPastelSelect.options.length; i++) {
                if (tipoPastelSelect.options[i].value.includes(nombreProducto) || nombreProducto.includes(tipoPastelSelect.options[i].value)) {
                    tipoPastelSelect.selectedIndex = i;
                    break;
                }
            }
            calcularPrecio();
        }
        const seccionContacto = document.getElementById('contacto');
        if (seccionContacto) seccionContacto.scrollIntoView({ behavior: 'smooth' });
    }

    function abrirVentanaExito() {
        const ventana = document.getElementById('ventanaExito');
        if (ventana) {
            ventana.classList.remove('hidden');
            setTimeout(() => ventana.classList.add('activo'), 10);
        }
    }

    function cerrarVentanaExito() {
        const ventana = document.getElementById('ventanaExito');
        if (ventana) {
            ventana.classList.remove('activo');
            setTimeout(() => ventana.classList.add('hidden'), 300);
        }
    }

    /* Mapa Leaflet */
    if (document.getElementById('mapa')) {
        const lat = 19.4270;
        const lng = -99.1677;

        const mapa = L.map('mapa', { scrollWheelZoom: false }).setView([lat, lng], 14);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: 19
        }).addTo(mapa);

        const iconoPersonalizado = L.divIcon({
            className: 'custom-map-pin',
            html: `
                <div style="background-color: #E13B8A; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    <i class="fa-solid fa-cake-candles"></i>
                </div>
            `,
            iconSize: [42, 42],
            iconAnchor: [21, 42],
            popupAnchor: [0, -40]
        });

        L.marker([lat, lng], { icon: iconoPersonalizado })
            .addTo(mapa)
            .bindPopup(`
                <div style="text-align: center; font-family: 'Poppins', sans-serif; padding: 5px;">
                    <h4 style="font-family: 'Playfair Display', serif; font-weight: bold; font-size: 16px; margin-bottom: 4px; color: #355C7D;">Dulce Arte Pâtisserie</h4>
                    <p style="font-size: 12px; color: #666; margin: 0;">¡Te esperamos para endulzar tu día!</p>
                </div>
            `)
            .openPopup();

        L.circle([lat, lng], {
            color: '#E13B8A',
            fillColor: '#F8B195',
            fillOpacity: 0.15,
            radius: 3500
        }).addTo(mapa);
    }

});