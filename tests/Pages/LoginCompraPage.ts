import { expect, type Locator, type Page } from '@playwright/test';

export class LoginCompraPage {
    readonly page: Page;
    readonly txtUsuario: Locator;
    readonly txtPassword: Locator;
    readonly ingresalogin: Locator;
    
   


    constructor(page: Page){

        this.page = page;
        this.txtUsuario = page.locator('[data-test="username"]');
        this.txtPassword = page.locator('[data-test="password"]');
        this.ingresalogin = page.locator('[data-test="login-button"]');
        

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

}
