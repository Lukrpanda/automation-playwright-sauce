import { test, Browser, Page, expect } from '@playwright/test';
import { LoginCompraPage } from '../Pages/LoginCompraPage';
import { CheckOutCompraPage } from '../Pages/CheckOutCompraPage';
import { ProductoCompraPage } from '../Pages/ProductoCompraPage';


(async () => {

    let browser: Browser;
    let page: Page;

    test.describe('Realizar la compra de un producto productos', () => {

  
            test(`Realizar la compra de un producto exitosa para el usuario:`, async ({ page }) => {

                await test.step('Cargando la pagina', async () => {
                    await page.goto('https://www.saucedemo.com/');
                })

                await test.step('Lleno texto en el campo usuario ,contraseña e ingresamos ', async () => {

                    const logincomprapage = new LoginCompraPage(page);
                    await logincomprapage.ingresarUsuario('standard_user');
                    await logincomprapage.ingresarPassword();
                    await logincomprapage.ingresarLogin();

                })

               
                await test.step('Elegir producto', async () => {
                    const productocomprapage = new ProductoCompraPage(page);
                    await productocomprapage.elegirProducto();
                    await productocomprapage.irCarrito();

                })

                await test.step('Hacemos el checkout', async () => {

                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await checkoutcomprapage.irCheckout();
                    await checkoutcomprapage.ingresarNombre();
                    await checkoutcomprapage.ingresarApellido();
                    await checkoutcomprapage.ingresarCodigo();
                    await checkoutcomprapage.continuarCheckout();
                    await checkoutcomprapage.finalizarCheckout();

                })

                await test.step('Validar mensaje de compra exitosa', async () => {
                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await expect(checkoutcomprapage.obtenerMensajeExito()).resolves.toBe('Thank you for your order!')
                })

            })
        


        test.describe('Realizar la compra de 2 o mas productos', () => {
            test('Realizar la compra de varios productos exitosa', async ({ page }) => {
                await test.step('Cargando la pagina', async () => {
                    await page.goto('https://www.saucedemo.com/');
                });

                await test.step('Login', async () => {
                    const logincomprapage = new LoginCompraPage(page);
                    await logincomprapage.ingresarUsuario('standard_user');
                    await logincomprapage.ingresarPassword();
                    await logincomprapage.ingresarLogin();

                });

                await test.step('Elegir múltiples productos', async () => {
                    const productocomprapage = new ProductoCompraPage(page);
                    await productocomprapage.elegirVariosProductos();
                    await productocomprapage.irCarrito();
                });

                await test.step('Hacemos el checkout', async () => {
                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await checkoutcomprapage.irCheckout();
                    await checkoutcomprapage.ingresarNombre();
                    await checkoutcomprapage.ingresarApellido();
                    await checkoutcomprapage.ingresarCodigo();
                    await checkoutcomprapage.continuarCheckout();
                    await checkoutcomprapage.finalizarCheckout();
                });

                await test.step('Validar mensaje de compra exitosa', async () => {
                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await expect(checkoutcomprapage.obtenerMensajeExito()).resolves.toBe('Thank you for your order!')
                });
            });
        })




        test.describe('Realizar checkout sin eleccion de productos', () => {

            test('Realizar la compra sin elegir productos', async ({ page }) => {
                await test.step('Cargando la pagina', async () => {
                    await page.goto('https://www.saucedemo.com/');
                })

                await test.step('Lleno texto en el campo usuario ,contraseña e ingresamos ', async () => {

                    const logincomprapage = new LoginCompraPage(page);
                    await logincomprapage.ingresarUsuario('standard_user');
                    await logincomprapage.ingresarPassword();
                    await logincomprapage.ingresarLogin();

                })

                await test.step('sin eleccion de producto', async () => {
                    const productocomprapage = new ProductoCompraPage(page);
                    await productocomprapage.irCarrito();

                })

                await test.step('Hacemos el checkout', async () => {

                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await checkoutcomprapage.irCheckout();
                    await checkoutcomprapage.ingresarNombre();
                    await checkoutcomprapage.ingresarApellido();
                    await checkoutcomprapage.ingresarCodigo();
                    await checkoutcomprapage.continuarCheckout();
                    await checkoutcomprapage.finalizarCheckout();

                })

                await test.step('Validar mensaje de compra exitosa', async () => {
                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await expect(checkoutcomprapage.obtenerMensajeExito()).resolves.toBe('Thank you for your order!')
                })
            



            })



        })

        test.describe('Realizar checkout con campos incompletos en la informacion (nombre)', () => {

            test('Realizar el checkout con campos incompletos', async ({ page }) => {
                await test.step('Cargando la pagina', async () => {
                    await page.goto('https://www.saucedemo.com/');
                })

                await test.step('Lleno texto en el campo usuario ,contraseña e ingresamos ', async () => {

                    const logincomprapage = new LoginCompraPage(page);
                    await logincomprapage.ingresarUsuario('standard_user');
                    await logincomprapage.ingresarPassword();
                    await logincomprapage.ingresarLogin();

                })

                await test.step('Elegir producto', async () => {
                    const productocomprapage = new ProductoCompraPage(page);
                    await productocomprapage.elegirProducto();
                    await productocomprapage.irCarrito();

                })

                await test.step('Hacemos el checkout con informacion incompleta', async () => {
                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await checkoutcomprapage.irCheckout();
                    await checkoutcomprapage.ingresarApellido();
                    await checkoutcomprapage.ingresarCodigo();
                    await checkoutcomprapage.continuarCheckout();


                })

                await test.step('Validar mensaje de error', async () => {
                    const checkoutcomprapage = new CheckOutCompraPage(page);
                    await expect(checkoutcomprapage.obtenerMensajeError()).resolves.toBe('Error: First Name is required')
                })

            })


            test.describe('Realizar checkout con campos incompletos en la informacion (apellido)', () => {


                test('Realizar el checkout con campos incompletos', async ({ page }) => {



                    await test.step('Cargando la pagina', async () => {
                        await page.goto('https://www.saucedemo.com/');
                    })

                    await test.step('Lleno texto en el campo usuario ,contraseña e ingresamos ', async () => {

                        const logincomprapage = new LoginCompraPage(page);
                       await logincomprapage.ingresarUsuario('standard_user');
                        await logincomprapage.ingresarPassword();
                        await logincomprapage.ingresarLogin();

                    })

                    await test.step('Elegir producto', async () => {
                        const productocomprapage = new ProductoCompraPage(page);
                        await productocomprapage.elegirProducto();
                        await productocomprapage.irCarrito();

                    })

                    await test.step('Hacemos el checkout con informacion incompleta', async () => {
                        const checkoutcomprapage = new CheckOutCompraPage(page);
                        await checkoutcomprapage.irCheckout();
                        await checkoutcomprapage.ingresarNombre();
                        await checkoutcomprapage.ingresarCodigo();
                        await checkoutcomprapage.continuarCheckout();


                    })

                    await test.step('Validar mensaje de error', async () => {
                        const checkoutcomprapage = new CheckOutCompraPage(page);
                        await expect(checkoutcomprapage.obtenerMensajeError()).resolves.toBe('Error: Last Name is required')
                    })
                })
            })

            test.describe('Realizar checkout con campos incompletos en la informacion (codigo)', () => {

                test('Realizar el checkout con campos incompletos', async ({ page }) => {

                    await test.step('Cargando la pagina', async () => {
                        await page.goto('https://www.saucedemo.com/');
                    })

                    await test.step('Lleno texto en el campo usuario ,contraseña e ingresamos ', async () => {

                        const logincomprapage = new LoginCompraPage(page);
                        await logincomprapage.ingresarUsuario('standard_user');
                        await logincomprapage.ingresarPassword();
                        await logincomprapage.ingresarLogin();

                    })

                    await test.step('Elegir producto', async () => {
                        const productocomprapage = new ProductoCompraPage(page);
                        await productocomprapage.elegirProducto();
                        await productocomprapage.irCarrito();

                    })

                    await test.step('Hacemos el checkout con informacion incompleta', async () => {

                        const checkoutcomprapage = new CheckOutCompraPage(page);
                        await checkoutcomprapage.irCheckout();
                        await checkoutcomprapage.ingresarNombre();
                        await checkoutcomprapage.ingresarApellido();
                        await checkoutcomprapage.continuarCheckout();
                        //await checkoutcomprapage.finalizarCheckout();


                    })

                    await test.step('Validar mensaje de error', async () => {
                        const checkoutcomprapage = new CheckOutCompraPage(page);
                        await expect(checkoutcomprapage.obtenerMensajeError()).resolves.toBe('Error: Postal Code is required')
                    })





                })






            })






        })
    })

})();