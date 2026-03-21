import { expect, type Locator, type Page } from '@playwright/test';


export class CheckOutCompraPage {
    readonly page: Page;
    readonly txtnombre: Locator;
    readonly txtapellido: Locator;
    readonly txtcodigo: Locator;
    readonly iracheckout: Locator;

    readonly continuecheck: Locator;
    readonly finishcheck: Locator;
    readonly mensajeExito: Locator;
    readonly mensajeError: Locator;

    constructor(page:Page){
        this.page = page;
        this.txtnombre = page.locator('[data-test="firstName"]');
        this.txtapellido = page.locator('[data-test="lastName"]');
        this.txtcodigo = page.locator('[data-test="postalCode"]');
        this.iracheckout = page.locator('[data-test="checkout"]');
        this.continuecheck = page.locator('[data-test="continue"]');
        this.finishcheck = page.locator('[data-test="finish"]');
        this.mensajeExito = page.locator('[data-test="complete-header"]');
        this.mensajeError = page.locator('[data-test="error"]');

    }

      async obtenerMensajeError(){
        return this.mensajeError.textContent();
    }

    async ingresarNombre(){
        await this.txtnombre.fill('Luis Carlos');
    }

    async ingresarApellido(){
        await this.txtapellido.fill('Rios Chumbiauca');
    }

    async ingresarCodigo(){
        await this.txtcodigo.fill('15066');
    }

    async faltaapellido(nombre: string){
        await this.txtnombre.fill(nombre);


    }

    async faltacodigo(nombre: string, apellido: string){

        await this.txtnombre.fill(nombre);
        await this.txtapellido.fill(apellido);
    }

    async irCheckout(){
        await this.iracheckout.click();
    }

    async continuarCheckout(){
        await this.continuecheck.click();
    }

    async finalizarCheckout(){
        await this.finishcheck.click();
    }   

    async obtenerMensajeExito(){
        return this.mensajeExito.textContent();
      
    }

  
        
}