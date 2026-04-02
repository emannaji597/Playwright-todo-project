import { Page, APIRequestContext, BrowserContext } from "@playwright/test";
import TodoApi from "../apis/todoApi";
import User from "../models/User";

export default class TodoPage {
    private page:Page;
    private request?: APIRequestContext ;
   
    constructor(page:Page, request?: APIRequestContext) {
        this.page = page;
        this.request = request;
       
    }   
    private get WelcomeMessage() {
        return '[data-testid="welcome"]';
    }
    private get deleteIcon() {
        return '[data-testid="delete"]';
    }
    private get NoTodosMessage() {
        return '[data-testid="no-todos"]';
    
    }
    private get TodoItems() {
        return '[data-testid="todo-item"]';

    }
    async getNewTodoTextByIndex(index: number) {
        return this.page.locator(this.TodoItems).nth(index).innerText();
          
    }
    async addTodoUsingAPI(user: User) {
            await new TodoApi(this.request!).createTodo(user);
        
    }
    async WelcomeMessageText() {
        return this.page.locator(this.WelcomeMessage);
    }
    async NoTodosMessageText() {
        return this.page.locator(this.NoTodosMessage);
    }
    async load() {
        await this.page.goto('/todo');  
    }
    async clickDeleteIconByIndex(index: number) {
         await this.page.locator(this.deleteIcon).nth(index).click();
    }



}

