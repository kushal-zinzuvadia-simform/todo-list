import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

import { useTodoContext } from '@/hooks/useTodoContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { showErrorToast } from '@/utils/showErrorToast';
import { getEmptyMessage } from '@/utils/getEmptyMessage';

export const TodoList = () => {
  const { filteredTodos, toggleTodo, deleteTodo, editTodo, filter } =
    useTodoContext();

  const [editState, setEditState] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const handleEditStart = (id: string, currentText: string) => {
    setEditState({ id, text: currentText });
  };

  const handleEditCancel = () => {
    setEditState(null);
  };

  const handleEditSave = (id: string) => {
    const result = editTodo(id, editState!.text);

    showErrorToast(result);

    setEditState(null);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border">
      <div className="overflow-y-auto">
        <Table>
          <TableHeader className="bg-background sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>Task</TableHead>
              <TableHead className="w-36">Added At</TableHead>
              <TableHead className="w-24" />
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
              filteredTodos.map((todo) => {
                const isEditing = editState?.id === todo.id;

                return (
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
                        todo.completed
                          ? 'text-muted-foreground line-through'
                          : ''
                      }
                    >
                      {isEditing ? (
                        <Input
                          autoFocus
                          value={editState?.text ?? ''}
                          onChange={(e) =>
                            setEditState({
                              id: editState!.id,
                              text: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEditSave(todo.id);
                            if (e.key === 'Escape') handleEditCancel();
                          }}
                          className="h-7 max-w-sm"
                          aria-label="Edit todo"
                          title="Edit todo"
                          placeholder="Edit todo"
                        />
                      ) : (
                        todo.text
                      )}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {todo.createdAtTime}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        {isEditing ? (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditSave(todo.id)}
                              aria-label="Save todo"
                              title="Save"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleEditCancel}
                              aria-label="Cancel edit"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleEditStart(todo.id, todo.text)
                              }
                              disabled={todo.completed}
                              aria-label={`Edit ${todo.text}`}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Delete"
                              onClick={() => deleteTodo(todo.id)}
                              aria-label={`Delete ${todo.text}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
