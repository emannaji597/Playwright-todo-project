import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import User from '../models/User';
import UserApi from '../apis/UserApi';
import TodoApi from '../apis/todoApi';
import RegisterPage from '../Pages/RegisterPage.ts';
import { Page } from '@playwright/test';
import NewTodoPage from '../Pages/NewTodoPage.ts';
import TodoPage from '../Pages/TodoPage.ts';





test('User should be able to add a new todo item', async ({ page, request, context }) => {
    // Create a new user
    const user = new User();

    const registerPage = new RegisterPage(page, request, context);
    await registerPage.RegisterUsingAPI(user);

    //UI Steps
    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addNewTask('Task1');


    const todoPage = new TodoPage(page);
    const todoText = await todoPage.getNewTodoTextByIndex(0);
    // Assertion
    await expect(todoText).toBe('Task1');
});

test('User should be able to delete a todo item', async ({ page, request, context }) => {
    // Register a new user using API
    const user = new User();

    const registrationPage = new RegisterPage(page, request, context);
    await registrationPage.RegisterUsingAPI(user);
    
    const todoPage = new TodoPage(page, request);
    await todoPage.addTodoUsingAPI(user);

    // Delete the todo item
    await todoPage.load();

    await expect(page.locator('[data-testid="todo-item"]')).toBeVisible();
    await todoPage.clickDeleteIconByIndex(0);
    const noTodosMessage = await todoPage.NoTodosMessageText();
    await expect(noTodosMessage).toBeVisible();


});
