import { Page, APIRequestContext, BrowserContext, expect } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";


export default class RegisterPage {
    
    //constructor
    //Elements
    //Methods or Steps
    private page:Page;
    private request?:APIRequestContext;
    private context?:BrowserContext;
    constructor(page:Page,request?:APIRequestContext,context?:BrowserContext) {
        this.page = page;
        this.request = request;
        this.context = context;
    }

    private get FirstNameInput() {
        return '[data-testid="first-name"]';
    }
    private get LastNameInput() {
        return '[data-testid="last-name"]';
    }
    private get EmailInput() {
        return '[data-testid="email"]';
    }
    private get PasswordInput() {
        return '[data-testid="password"]';
    }
    private get ConfirmPasswordInput() {
        return '[data-testid="confirm-password"]';
    }
    private get SubmitButton() {
        return '[data-testid="submit"]';
    }
    async load() {
        await this.page.goto('/signup');
    }
    async fillRegistrationForm(user: User) {
        await this.page.type(this.FirstNameInput, user.getFirstName());
        await this.page.type(this.LastNameInput, user.getLastName());
        await this.page.type(this.EmailInput, user.getEmail());
        await this.page.type(this.PasswordInput, user.getPassword());
        await this.page.type(this.ConfirmPasswordInput, user.getPassword());
        await this.page.click(this.SubmitButton);
    }
    async RegisterUsingAPI(user: User) {

     const response = await new UserApi(this.request!).Register(user);
     await expect(response.status()).toBe(201);
     const body = await response.json();
     const accessToken = body.access_token;
     const userId = body.userID;
     const firstName = body.firstName;
     console.log(accessToken);
     console.log(userId);
     console.log(firstName);

     // Save token in model so API helper can use it
     user.setAccessToken(accessToken);

    // Set cookies for authentication
    
    await this.context!.addCookies([
    { 
        name: 'access_token',
        value: accessToken, 
        url: 'http://todo.qacart.com',
        }
        ,
        { 
        name: 'userID',
        value: userId, 
        url: 'http://todo.qacart.com',
        },
        {
        name: 'firstName',
        value: firstName, 
        url: 'http://todo.qacart.com',
        }
   
    ]);  


    

    }
}