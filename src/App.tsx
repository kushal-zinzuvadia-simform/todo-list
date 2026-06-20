import { Filter } from './components/Filter/Filter';
import { InputForm } from './components/InputForm/InputForm';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { TodoList } from './components/TodoList/TodoList';

export function App() {
  return (
    <main className="bg-background h-screen overflow-hidden">
      <div className="container mx-auto h-full flex flex-col max-w-3xl px-4 py-8">
        <div className="mb-8 flex justify-end">
          <ThemeToggle />
        </div>

        <div className="flex min-h-0 flex-1 flex-col space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">My To-Do List</h1>
          </div>

          <div className="flex justify-center">
            <InputForm />
          </div>

          <div className="flex justify-center">
            <Filter />
          </div>

          <div className="min-h-0 flex-1">
            <TodoList />
          </div>
        </div>
      </div>
    </main>
  );
}
