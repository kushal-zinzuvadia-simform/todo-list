import { useState } from 'react';

import { Filter } from './components/Filter/Filter';
import { InputForm } from './components/InputForm/InputForm';
import { TodoList } from './components/TodoList/TodoList';
import { filterTodos } from './utils/filterTodos';
import { useTodoData } from './hooks/useTodoData';

import type { FilterType } from './types/FilterType';

function App() {
  const { todoData, addItem, toggleTodo, deleteTodo } = useTodoData();

  const [filter, setFilter] = useState<FilterType>('All');
  const filteredTodos = filterTodos({ todos: todoData, filter });

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-4">
      <h1 className="text-2xl font-semibold">My To-Do List</h1>
      <InputForm onAdd={addItem} />
      <Filter filter={filter} onFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        filter={filter}
      />
    </div>
  );
}

export default App;
