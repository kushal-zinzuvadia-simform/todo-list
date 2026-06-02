import InputForm from './components/InputForm/InputForm';
import { useTodoData } from './hooks/useTodoData';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodo } from './components/FilterTodo/FilterTodo';
import type { FilterType } from './types/FilterTodo';
import { useState } from 'react';
import { useFilter } from './hooks/useFilter';

function App() {
  const { todoData, addItem, toggleTodo, deleteTodo } = useTodoData();

  const [filter, setFilter] = useState<FilterType>('All');
  const filteredTodos = useFilter(todoData, filter);

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-4">
      <h2 className="text-2xl font-semibold">My To-Do List</h2>
      <InputForm onAdd={addItem} />
      <FilterTodo onFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
