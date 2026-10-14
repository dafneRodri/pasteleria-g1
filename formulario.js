// Base de datos de productos con información e imágenes locales
const PRODUCTOS_DETALLE = {
    p1: {
        titulo: "Pastel Nupcial Elegancia",
        precio: "$1,200 MXN",
        categoria: "BODAS & XV AÑOS",
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

document.addEventListener('DOMContentLoaded', () => {

    /* 1. NAVEGACIÓN MÓVIL TOGGLE */
    const botonMenuMovil = document.getElementById('boton-menu-movil');
    const menuMovil = document.getElementById('menu-movil');
    const iconoMenu = document.getElementById('icono-menu');
    const enlacesMovil = document.querySelectorAll('.enlace-movil');

    if (botonMenuMovil) {
        botonMenuMovil.addEventListener('click', () => {
            menuMovil.classList.toggle('hidden');
            if (menuMovil.classList.contains('hidden')) {
                iconoMenu.className = 'fa-solid fa-bars';
            } else {
                iconoMenu.className = 'fa-solid fa-xmark';
            }
        });

        enlacesMovil.forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuMovil.classList.add('hidden');
                iconoMenu.className = 'fa-solid fa-bars';
            });
        });
    }

    /* 2. FILTRADO DE PRODUCTOS */
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
                if (filtro === 'todos' || tarjeta.dataset.categoria === filtro) {
                    tarjeta.style.display = 'block';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    });

    /* 3. ABRIR VENTANA DE INFORMACIÓN DEL POSTRE */
    let productoActualModal = "";

    tarjetasProductos.forEach(tarjeta => {
        tarjeta.addEventListener('click', (e) => {
            if (e.target.closest('.btn-cotizar-tarjeta')) return;
            
            const idProducto = tarjeta.dataset.id;
            const datos = PRODUCTOS_DETALLE[idProducto];
            if (datos) {
                abrirVentanaProducto(datos);
            }
        });
    });

    document.querySelectorAll('.btn-cotizar-tarjeta').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nombre = btn.dataset.nombre;
            seleccionarProductoYScroll(nombre);
        });
    });

    const botonCotizarModal = document.getElementById('botonCotizarModal');
    if (botonCotizarModal) {
        botonCotizarModal.addEventListener('click', () => {
            cerrarVentanaProducto();
            if (productoActualModal) {
                seleccionarProductoYScroll(productoActualModal);
            }
        });
    }

    const btnCerrarModalProducto = document.getElementById('btnCerrarModalProducto');
    if (btnCerrarModalProducto) {
        btnCerrarModalProducto.addEventListener('click', cerrarVentanaProducto);
    }

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
    if (btnCerrarModalExito) {
        btnCerrarModalExito.addEventListener('click', cerrarVentanaExito);
    }

    /* 4. FORMULARIO Y COTIZADOR */
    const formularioPedido = document.getElementById('formularioPedido');
    const radiosEntrega = document.querySelectorAll('input[name="tipoEntrega"]');
    const contenedorDireccion = document.getElementById('contenedorDireccion');
    const tipoPastelSelect = document.getElementById('tipoPastel');
    const tamanoPastelSelect = document.getElementById('tamanoPastel');
    const precioEstimadoTotal = document.getElementById('precioEstimadoTotal');

    radiosEntrega.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'domicilio') {
                contenedorDireccion.classList.remove('hidden');
            } else {
                contenedorDireccion.classList.add('hidden');
            }
            calcularPrecio();
        });
    });

    function calcularPrecio() {
        let precioBase = 350;
        const pastelSeleccionado = tipoPastelSelect.value;
        const multiplicadorTamano = parseInt(tamanoPastelSelect.value) || 10;
        const esDomicilio = document.querySelector('input[name="tipoEntrega"]:checked').value === 'domicilio';

        if (pastelSeleccionado.includes('Nupcial')) precioBase = 800;
        else if (pastelSeleccionado.includes('Cumpleaños') || pastelSeleccionado.includes('Choco-Art')) precioBase = 500;
        else if (pastelSeleccionado.includes('Red Velvet')) precioBase = 420;
        else if (pastelSeleccionado.includes('Galletas')) precioBase = 320;
        else if (pastelSeleccionado.includes('Macarrones')) precioBase = 350;

        let total = precioBase + (multiplicadorTamano * 15);
        if (esDomicilio) total += 80;

        precioEstimadoTotal.innerText = `$${total.toFixed(2)} MXN`;
    }

    if (tipoPastelSelect && tamanoPastelSelect) {
        tipoPastelSelect.addEventListener('change', calcularPrecio);
        tamanoPastelSelect.addEventListener('change', calcularPrecio);
    }

    if (formularioPedido) {
        formularioPedido.addEventListener('submit', (e) => {
            e.preventDefault();
            let esValido = true;

            document.querySelectorAll('.mensaje-error').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('input, select').forEach(el => el.classList.remove('campo-error'));

            const nombre = document.getElementById('nombreCliente');
            if (!nombre.value.trim()) { mostrarError(nombre); esValido = false; }

            const telefono = document.getElementById('telefonoCliente');
            if (!telefono.value.trim() || telefono.value.replace(/\D/g, '').length < 8) { mostrarError(telefono); esValido = false; }

            const correo = document.getElementById('correoCliente');
            const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formatoCorreo.test(correo.value.trim())) { mostrarError(correo); esValido = false; }

            if (!tipoPastelSelect.value) { mostrarError(tipoPastelSelect); esValido = false; }

            const fecha = document.getElementById('fechaEvento');
            if (!fecha.value) { mostrarError(fecha); esValido = false; }

            const esDomicilio = document.querySelector('input[name="tipoEntrega"]:checked').value === 'domicilio';
            let calleVal = "", coloniaVal = "", cpVal = "", refVal = "";

            if (esDomicilio) {
                const calle = document.getElementById('calleNumero');
                const colonia = document.getElementById('coloniaMunicipio');
                const cp = document.getElementById('codigoPostal');
                const ref = document.getElementById('referenciasUbicacion');

                if (!calle.value.trim()) { mostrarError(calle); esValido = false; } else calleVal = calle.value.trim();
                if (!colonia.value.trim()) { mostrarError(colonia); esValido = false; } else coloniaVal = colonia.value.trim();
                if (!cp.value.trim() || cp.value.trim().length < 4) { mostrarError(cp); esValido = false; } else cpVal = cp.value.trim();
                if (ref) refVal = ref.value.trim();
            }

            if (esValido) {
                const numPasteleria = "525512345678";
                let textoMensaje = `¡Hola *Dulce Arte Pâtisserie*! 🍰✨%0AMe gustaría solicitar el siguiente pedido:%0A%0A` +
                    `👤 *Cliente:* ${encodeURIComponent(nombre.value.trim())}%0A` +
                    `📞 *Teléfono:* ${encodeURIComponent(telefono.value.trim())}%0A` +
                    `📧 *Correo:* ${encodeURIComponent(correo.value.trim())}%0A` +
                    `🎂 *Producto:* ${encodeURIComponent(tipoPastelSelect.value)}%0A` +
                    `👥 *Tamaño:* ${encodeURIComponent(tamanoPastelSelect.options[tamanoPastelSelect.selectedIndex].text)}%0A` +
                    `📅 *Fecha:* ${encodeURIComponent(fecha.value)}%0A` +
                    `🚚 *Entrega:* ${esDomicilio ? 'Envío a Domicilio' : 'Recoger en Sucursal'}%0A`;

                if (esDomicilio) {
                    textoMensaje += `📍 *Dirección:* ${encodeURIComponent(calleVal)}, ${encodeURIComponent(coloniaVal)}, C.P. ${encodeURIComponent(cpVal)}%0A`;
                    if (refVal) textoMensaje += `🏠 *Referencias:* ${encodeURIComponent(refVal)}%0A`;
                }

                const notasVal = document.getElementById('notasPastel').value.trim();
                if (notasVal) textoMensaje += `📝 *Notas:* ${encodeURIComponent(notasVal)}%0A`;
                textoMensaje += `%0A💰 *Estimado:* ${encodeURIComponent(precioEstimadoTotal.innerText)}`;

                window.open(`https://wa.me/${numPasteleria}?text=${textoMensaje}`, '_blank');
                abrirVentanaExito();
            }
        });
    }

    function mostrarError(elementoCampo) {
        elementoCampo.classList.add('campo-error');
        const spanError = elementoCampo.parentElement.querySelector('.mensaje-error');
        if (spanError) spanError.classList.remove('hidden');
    }

    /* 5. FUNCIONES PARA MOSTRAR/OCULTAR MODAL */
    function abrirVentanaProducto(datos) {
        productoActualModal = datos.titulo;
        const ventana = document.getElementById('ventanaProducto');
        
        document.getElementById('imagenModalProducto').src = datos.imagen;
        document.getElementById('tituloModalProducto').innerText = datos.titulo;
        document.getElementById('precioModalProducto').innerText = datos.precio;
        document.getElementById('categoriaModalProducto').innerText = datos.categoria;
        document.getElementById('descripcionModalProducto').innerText = datos.descripcion;
        document.getElementById('ingredientesModalProducto').innerText = datos.ingredientes;
        document.getElementById('porcionesModalProducto').innerText = datos.porciones;
        document.getElementById('tiempoModalProducto').innerText = datos.tiempoPreparacion;

        ventana.classList.remove('hidden');
        setTimeout(() => {
            ventana.classList.add('activo');
        }, 10);
    }

    function cerrarVentanaProducto() {
        const ventana = document.getElementById('ventanaProducto');
        if (ventana) {
            ventana.classList.remove('activo');
            setTimeout(() => {
                ventana.classList.add('hidden');
            }, 300);
        }
    }

    function seleccionarProductoYScroll(nombreProducto) {
        const comboPastel = document.getElementById('tipoPastel');
        if (comboPastel) {
            for (let i = 0; i < comboPastel.options.length; i++) {
                if (comboPastel.options[i].value.includes(nombreProducto) || nombreProducto.includes(comboPastel.options[i].value)) {
                    comboPastel.selectedIndex = i;
                    break;
                }
            }
            calcularPrecio();
        }
        const seccionContacto = document.getElementById('contacto');
        if (seccionContacto) {
            seccionContacto.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function abrirVentanaExito() {
        const ventana = document.getElementById('ventanaExito');
        if (ventana) {
            ventana.classList.remove('hidden');
            setTimeout(() => {
                ventana.classList.add('activo');
            }, 10);
        }
    }

    function cerrarVentanaExito() {
        const ventana = document.getElementById('ventanaExito');
        if (ventana) {
            ventana.classList.remove('activo');
            setTimeout(() => {
                ventana.classList.add('hidden');
            }, 300);
        }
    }

    /* 6. CONFIGURACIÓN DEL MAPA LEAFLET */
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