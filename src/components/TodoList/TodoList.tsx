import { useContext } from 'react';
import { Trash2 } from 'lucide-react';

import { TodoContext } from '@/context/todo-context';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getEmptyMessage } from '../../utils/getEmptyMessage';

export const TodoList = () => {
  const { filteredTodos, toggleTodo, deleteTodo, filter } =
    useContext(TodoContext);

  return (
    <div className="flex h-full flex-col rounded-lg border">
      <div className="overflow-y-auto">
        <Table>
          <TableHeader className="bg-background sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>Task</TableHead>
              <TableHead>Added At</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTodos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground py-8 text-center"
                >
                  {getEmptyMessage(filter)}
                </TableCell>
              </TableRow>
            ) : (
              filteredTodos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      aria-label={`Toggle ${todo.text}`}
                    />
                  </TableCell>

                  <TableCell
                    className={
                      todo.completed ? 'text-muted-foreground line-through' : ''
                    }
                  >
                    {todo.text}
                  </TableCell>

                  <TableCell className="text-muted-foreground text-sm">
                    {todo.createdAtTime}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete ${todo.text}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
