import axios from 'axios';
import { Task, Tasks } from 'app/types/tasks';

const API_URL = 'https://my-json-server.typicode.com/WManzoli/appDB/tasks';

const apiService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const handleResponse = (response: any) => response.data;
const handleError = (error: any) => {
    if (error.response) {
        console.error('Erro de resposta do servidor:', error.response.data);
    } else if (error.request) {
        console.error('Erro de requisição:', error.request);
    } else {
        console.error('Erro ao processar requisição:', error.message);
    }
    throw error;
};
const tasksApiService = {
    getTasks: async (): Promise<Tasks> => {
        try {
            const response = await apiService.get('');
            return handleResponse(response) || [];
        } catch (error: any) {
            handleError(error);
            return [];
        }
    },

    createTask: async (newTask: { completed: boolean; title: string }): Promise<Task> => {
        try {
            const response = await apiService.post('', newTask);
            return handleResponse(response);
        } catch (error: any) {
            handleError(error);
            return {} as Task;
        }
    },

    updateTask: async (taskId: number, updatedTask: { completed: boolean }): Promise<Task> => {
        try {
            const response = await apiService.patch(`/${taskId}`, updatedTask);
            return handleResponse(response);
        } catch (error: any) {
            handleError(error);
            return {} as Task;
        }
    },

    deleteTask: async (taskId: number): Promise<void> => {
        try {
            await apiService.delete(`/${taskId}`);
            return;
        } catch (error: any) {
            handleError(error);
            return;
        }
    },
};
export default tasksApiService;
