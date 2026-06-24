import toast from 'react-hot-toast';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodoState } from '@/types/TodoProviderType';
import { loadTodosFromStorage } from '@/utils/fetchTodos';
import type { FilterType } from '@/types/FilterType';
import { validateTodos } from '@/utils/validateTodos';
import { showErrorToast } from '@/utils/showErrorToast';

const initialState: TodoState = {
  todoData: loadTodosFromStorage(),
  filterCategory: 'All',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const result = validateTodos(action.payload);

      if (!result.isValid) {
        showErrorToast(result.message);
        return;
      }

      const now = new Date();

      state.todoData.push({
        id: crypto.randomUUID(),
        text: result.text,
        completed: false,
        createdAtDate: now.toLocaleDateString('en-GB'),
        createdAtTime: now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });

      toast.success(`Added "${result.text}"`, { duration: 3000 });
    },

    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.todoData.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.todoData = state.todoData.filter(
        (todo) => todo.id !== action.payload
      );
    },

    editTodo(
      state,
      action: PayloadAction<{
        id: string;
        text: string;
      }>
    ) {
      const result = validateTodos(action.payload.text);

      if (!result.isValid) {
        showErrorToast(result.message);
        return;
      }

      const todo = state.todoData.find((todo) => todo.id === action.payload.id);

      if (todo) {
        todo.text = action.payload.text;
        toast.success('Todo updated successfully');
      }
    },

    setFilter(state, action: PayloadAction<FilterType>) {
      state.filterCategory = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
