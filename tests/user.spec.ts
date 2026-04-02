import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../Pages/TodoPage';


test ('User should be able to Register to the todo website ', async ({ page }) =>{

    
    const user = new User();
    const registerPage = new RegisterPage(page);
    await registerPage.load();
    await registerPage.fillRegistrationForm(user);
    const todoPage = new TodoPage(page);
    const successMessage = await  todoPage.WelcomeMessageText();

    // Assertion
    await expect(successMessage).toBeVisible();
  
});


    