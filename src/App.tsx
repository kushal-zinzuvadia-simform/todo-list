import { Toaster } from 'react-hot-toast';
import InputForm from './components/InputForm/InputForm';
import { useTodoData } from './hooks/useTodoData';
import { TodoList } from './components/TodoList/TodoList';

function App() {
  const { todoData, addItem, toggleTodo, deleteTodo } = useTodoData();

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-4">
      <Toaster />
      <h2 className="text-2xl font-semibold">My To-Do List</h2>
      <InputForm onAdd={addItem} />
      <TodoList todos={todoData} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
