export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export type Tasks = Task[];