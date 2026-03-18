import { Loging } from "./loging";


export class AddingUser {

    constructor(){
    this.loging = new Loging();
}

    addUser(name,email){
        
        cy.get('[data-testid="name-input"]').type(name);
        cy.get('[data-testid="email-input"]').type(email);
        cy.get('[data-testid="submit-btn"]').click();
    }

    logingAndGoToAddUserPage(username,password){
        this.loging.userLogging(username,password);
    }

}
