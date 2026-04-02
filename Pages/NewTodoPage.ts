import { Page } from '@playwright/test';
export default class NewTodoPage {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private get TodoInput() {
        return '[data-testid="new-todo"]';
    }
    private get newtodosubmitButton() {
        return '[data-testid="submit-newTask"]';
    }
    async load() {
        await this.page.goto('/todo/new');
    }
    async addNewTask(todo: string) {
        await this.page.type(this.TodoInput, todo);
        await this.page.click(this.newtodosubmitButton);
    }
    
   



}
