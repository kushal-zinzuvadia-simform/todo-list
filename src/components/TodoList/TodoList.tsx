import type { FilterType } from '../../types/FilterTodo';
import type { Todo } from '../../types/TodoItem';

import { getEmptyMessage } from '../../utils/getEmptyMessage';

type TodoListProps = {
  todos: Array<Todo>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter: FilterType;
};

export const TodoList = ({
  todos,
  onToggle,
  onDelete,
  filter,
}: TodoListProps) => {
  return (
    <div className="mx-auto w-full max-w-175 overflow-hidden border rounded-lg">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="w-[10%] px-4 py-2 text-left"></th>
            <th className="w-[50%] px-4 py-2 text-left">Task</th>
            <th className="w-[30%] px-4 py-2 text-left">Added on</th>
            <th className="w-[10%] px-4 py-2 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                {getEmptyMessage(filter)}
              </td>
            </tr>
          ) : (
            todos.map((todo, index) => (
              <tr
                key={`${todo.text}-${index}`}
                className="border-b last:border-b-0 even:bg-gray-100"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    name="CheckTodo"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
                  />
                </td>
                <td
                  className={`px-4 py-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </td>
                <td className="px-4 py-2 text-sm">
                  <span>
                    {todo.createdAtDate} at {todo.createdAtTime}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="cursor-pointer rounded p-1 hover:bg-red-100"
                    onClick={() => onDelete(todo.id)}
                  >
                    <img src="/delete.svg" alt="Delete" className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
