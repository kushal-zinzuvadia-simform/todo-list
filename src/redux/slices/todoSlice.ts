import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadTodosFromStorage } from '@/utils/fetchTodos';
import type { FilterType } from '@/types/FilterType';
import type { TodoSliceState } from '@/types/TodoSliceState';
import type { Todo } from '@/types/TodoItem';

const initialState: TodoSliceState = {
  todoData: loadTodosFromStorage(),
  filterCategory: 'All',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todoData.push(action.payload);
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
      const todo = state.todoData.find((todo) => todo.id === action.payload.id);

      if (todo) {
        todo.text = action.payload.text;
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
