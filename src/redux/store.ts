import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

let previousTodos = store.getState().todos.todoData;

store.subscribe(() => {
  const currentTodos = store.getState().todos.todoData;

  if (currentTodos === previousTodos) return;
  previousTodos = currentTodos;

  const today = new Date().toLocaleDateString('en-GB');

  const prunedTodos = currentTodos.filter(
    (todo) => todo.createdAtDate === today
  );

  localStorage.setItem('todoData', JSON.stringify(prunedTodos));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
