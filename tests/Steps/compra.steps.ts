import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { LoginCompraPage } from '../Pages/LoginCompraPage';
import { CheckOutCompraPage } from '../Pages/CheckOutCompraPage';
import { ProductoCompraPage } from '../Pages/ProductoCompraPage';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let loginPage: LoginCompraPage;
let productoPage: ProductoCompraPage;
let checkoutPage: CheckOutCompraPage;

Before(async () => {
    browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext();
    page = await context.newPage();
    
    
    loginPage = new LoginCompraPage(page);
    productoPage = new ProductoCompraPage(page);
    checkoutPage = new CheckOutCompraPage(page);
});

After(async () => {
    await browser.close();
});



Given('que el usuario navega a la pagina de Sauce Demo', async () => {
    await page.goto('https://www.saucedemo.com/');
});

Given('el usuario inicia sesion con credenciales validas', async () => {
    await loginPage.ingresarUsuario();
    await loginPage.ingresarPassword();
    await loginPage.ingresarLogin();
});



When('el usuario elige un producto', async () => {
    await productoPage.elegirProducto();
});

When('el usuario elige multiples productos', async () => {
    await productoPage.elegirVariosProductos();
});

When('va al carrito de compras', async () => {
    await productoPage.irCarrito();
});



When('realiza el checkout con sus datos validos', async () => {
    await checkoutPage.irCheckout();
    await checkoutPage.ingresarNombre();
    await checkoutPage.ingresarApellido();
    await checkoutPage.ingresarCodigo();
    await checkoutPage.continuarCheckout();
    await checkoutPage.finalizarCheckout();
});

When('el usuario inicia el checkout', async () => {
    await checkoutPage.irCheckout();
});

When('llena la informacion con nombre {string}, apellido {string} y codigo {string}', async (nombre: string, apellido: string, codigo: string) => {
    
    if(nombre !== "") await checkoutPage.txtnombre.fill(nombre);
    if(apellido !== "") await checkoutPage.txtapellido.fill(apellido);
    if(codigo !== "") await checkoutPage.txtcodigo.fill(codigo);
});

When('continua con el checkout', async () => {
    await checkoutPage.continuarCheckout();
});



Then('el sistema muestra el mensaje de exito {string}', async (mensajeEsperado: string) => {
    const mensaje = await checkoutPage.obtenerMensajeExito();
    expect(mensaje).toBe(mensajeEsperado);
});

Then('el sistema muestra el mensaje de error {string}', async (mensajeErrorEsperado: string) => {
    const mensaje = await checkoutPage.obtenerMensajeError();
    expect(mensaje).toBe(mensajeErrorEsperado);
});