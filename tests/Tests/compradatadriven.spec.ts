import { test, expect } from '@playwright/test';
import { LoginCompraPage } from '../Pages/LoginCompraPage';
import { CheckOutCompraPage } from '../Pages/CheckOutCompraPage';
import { ProductoCompraPage } from '../Pages/ProductoCompraPage';

// 1. ARREGLO DE USUARIOS
const usuariospositivos = [
     'standard_user' ,
     'performance_glitch_user' ,
     'visual_user' 
];

const usuariosnegativos = [
    { usuarioActual: 'locked_out_user', errorEsperado: 'Epic sadface: Sorry, this user has been locked out.' },
];

// 2. ARREGLO DE ESCENARIOS DE CHECKOUT
const escenariosCheckout = [
    { caso: 'Falta Nombre', nombre: '', apellido: 'Rios', codigo: '15066', errorEsperado: 'Error: First Name is required' },
    { caso: 'Falta Apellido', nombre: 'Luis', apellido: '', codigo: '15066', errorEsperado: 'Error: Last Name is required' },
    { caso: 'Falta Código Postal', nombre: 'Luis', apellido: 'Rios', codigo: '', errorEsperado: 'Error: Postal Code is required' }
];

// 3. BUCLE MAESTRO: Escenarios Positivos y Errores de Checkout por cada usuario
usuariospositivos.forEach((usuarioActual) => {

    test.describe(`Flujos para usuario: ${usuarioActual}`, () => {

        const MENSAJE_EXITO = 'Thank you for your order!';

        test('Compra exitosa completa', async ({ page }) => {
            const logincomprapage = new LoginCompraPage(page);
            const productocomprapage = new ProductoCompraPage(page);
            const checkoutcomprapage = new CheckOutCompraPage(page);

            await test.step('Login', async () => {
                await page.goto('https://www.saucedemo.com/');
                await logincomprapage.ingresarUsuario(usuarioActual);
                await logincomprapage.ingresarPassword();
                await logincomprapage.ingresarLogin();
            });

            await test.step('Elegir producto e ir al carrito', async () => {
                await productocomprapage.elegirProducto();
                await productocomprapage.irCarrito();
            });

            await test.step('Hacer checkout positivo', async () => {
                await checkoutcomprapage.irCheckout();
                await checkoutcomprapage.ingresarNombre();
                await checkoutcomprapage.ingresarApellido();
                await checkoutcomprapage.ingresarCodigo();
                await checkoutcomprapage.continuarCheckout();
                await checkoutcomprapage.finalizarCheckout();
            });

            await test.step('Validar mensaje de éxito', async () => {
                // Se recomienda usar toHaveText para manejar el reintento automático
                const mensaje = await checkoutcomprapage.obtenerMensajeExito();
                expect(mensaje).toBe(MENSAJE_EXITO);
            });
        });

        // --- BUCLE SECUNDARIO: Validaciones de formulario de checkout ---
        escenariosCheckout.forEach((escenario) => {
            test(`Checkout Error: ${escenario.caso}`, async ({ page }) => {
                const logincomprapage = new LoginCompraPage(page);
                const productocomprapage = new ProductoCompraPage(page);
                const checkoutcomprapage = new CheckOutCompraPage(page);

                await test.step('Login y Navegación', async () => {
                    await page.goto('https://www.saucedemo.com/');
                    await logincomprapage.ingresarUsuario(usuarioActual);
                    await logincomprapage.ingresarPassword();
                    await logincomprapage.ingresarLogin();
                    await productocomprapage.elegirProducto();
                    await productocomprapage.irCarrito();
                });

                await test.step('Llenado dinámico de formulario', async () => {
                    await checkoutcomprapage.irCheckout();
                    // Acceso directo a los locatarios como tenías planeado
                    await checkoutcomprapage.txtnombre.fill(escenario.nombre);
                    await checkoutcomprapage.txtapellido.fill(escenario.apellido);
                    await checkoutcomprapage.txtcodigo.fill(escenario.codigo);
                    await checkoutcomprapage.continuarCheckout();
                });

                await test.step('Validar error esperado', async () => {
                    const error = await checkoutcomprapage.obtenerMensajeError();
                    expect(error).toBe(escenario.errorEsperado);
                });
            });
        });
    });
});

// --- 4. PRUEBAS NEGATIVAS DE LOGIN (Fuera del bucle de usuarios positivos) ---
usuariosnegativos.forEach(({ usuarioActual, errorEsperado }) => {
    test.describe(`Login Negativo: ${usuarioActual}`, () => {
        test('Validar bloqueo de usuario', async ({ page }) => {
            const logincomprapage = new LoginCompraPage(page);

            await test.step('Intento de login', async () => {
                await page.goto('https://www.saucedemo.com/');
                await logincomprapage.ingresarUsuario(usuarioActual);
                await logincomprapage.ingresarPassword();
                await logincomprapage.ingresarLogin();
            });

            await test.step('Validar mensaje de error', async () => {
                const error = await logincomprapage.obtenerMensajeErrorLogin();
                expect(error).toBe(errorEsperado);
            });
        });
    });
});