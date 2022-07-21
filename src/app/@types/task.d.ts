declare interface Task {
  title: string;
  description: string;
  id: string;
  status?: string;
  boardCategory?: string;
  index?: number;
  userId?: string;
}
