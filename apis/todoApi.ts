import { APIRequestContext } from '@playwright/test';
import User from '../models/User';


export default class TodoApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createTodo(user: User) {
        return await this.request.post('/api/v1/tasks', {
            data: {
            isCompleted: false,
            item: 'Task1',
            },
            headers: {
                'Authorization': `Bearer ${user.getAccessToken()}`
            }
        });
    }
}