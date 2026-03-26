import { expect, type Locator, type Page } from '@playwright/test';

export class LoginCompraPage {
    readonly page: Page;
    readonly txtUsuario: Locator;
    readonly txtPassword: Locator;
    readonly ingresalogin: Locator
    readonly mensajeError: Locator;



    constructor(page: Page){

        this.page = page;
        this.txtUsuario = page.locator('[data-test="username"]');
        this.txtPassword = page.locator('[data-test="password"]');
        this.ingresalogin = page.locator('[data-test="login-button"]');
        this.mensajeError = page.locator('//h3[@data-test="error"]');
        

    }

   async ingresarUsuario(usuario: string) {
    // Playwright prefiere usar los localizadores directamente.
    // Asegúrate de que this.txtUsuario esté definido en tu constructor.
    await this.txtUsuario.fill(usuario);
}
    //usuario: string

    async ingresarPassword(password: string = 'secret_sauce'){
        await this.txtPassword.fill(password);
    }

    async ingresarLogin(){
        await this.ingresalogin.click();
    }

      async obtenerMensajeErrorLogin(){
        return this.mensajeError.textContent();
      
    }

}
