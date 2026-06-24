import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/slices/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

store.subscribe(() => {
  const today = new Date().toLocaleDateString('en-GB');

  const rawTodos = store.getState();

  const prunedTodos = rawTodos.todos.todoData.filter(
    (todo) => todo.createdAtDate === today
  );

  localStorage.setItem('todoData', JSON.stringify(prunedTodos));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
