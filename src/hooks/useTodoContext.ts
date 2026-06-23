import { useContext } from 'react';
import { TodoContext, type TodoContextValue } from '@/context/todo-context';

export const useTodoContext = (): TodoContextValue => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodoContext must be used inside TodoProvider');
  return ctx;
};
