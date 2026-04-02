import { faker } from "@faker-js/faker/locale/zu_ZA";

export default class User {

    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private accessToken ?: string;
    private userID?: string;

    constructor() {
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email();
        this.password = 'password123';
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
    }
    getEmail(): string {
        return this.email;
    }
    
    getPassword(): string {
        return this.password;
    } 
    setAccessToken(token: string): void {
        this.accessToken = token;
    } 
    getAccessToken()  {
        return this.accessToken;
    }
    
}      
