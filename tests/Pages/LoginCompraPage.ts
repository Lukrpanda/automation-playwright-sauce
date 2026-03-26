import { expect, type Locator, type Page } from '@playwright/test';

export class LoginCompraPage {
    readonly page: Page;
    readonly txtUsuario: Locator;
    readonly txtPassword: Locator;
    readonly ingresalogin: Locator;
<<<<<<< HEAD
=======
    readonly mensajeError: Locator;
>>>>>>> 427e242 (agregando escenarios data driven saucedemo)
    
   


    constructor(page: Page){

        this.page = page;
        this.txtUsuario = page.locator('[data-test="username"]');
        this.txtPassword = page.locator('[data-test="password"]');
        this.ingresalogin = page.locator('[data-test="login-button"]');
<<<<<<< HEAD
=======
        this.mensajeError = page.locator('//h3[@data-test="error"]');
>>>>>>> 427e242 (agregando escenarios data driven saucedemo)
        

    }

    async ingresarUsuario(usuario: string = 'standard_user'){
        await this.txtUsuario.fill(usuario);
    }

    //usuario: string

    async ingresarPassword(password: string = 'secret_sauce'){
        await this.txtPassword.fill(password);
    }

    async ingresarLogin(){
        await this.ingresalogin.click();
    }

<<<<<<< HEAD
=======
      async obtenerMensajeErrorLogin(){
        return this.mensajeError.textContent();
      
    }

>>>>>>> 427e242 (agregando escenarios data driven saucedemo)
}
