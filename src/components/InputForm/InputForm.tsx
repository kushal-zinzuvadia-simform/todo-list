import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodo } from '@/redux/slices/todoSlice';
import type { AppDispatch } from '@/redux/store';
import { validateTodos } from '@/utils/validateTodos';
import { showErrorToast } from '@/utils/showErrorToast';
import toast from 'react-hot-toast';

export const InputForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todoRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = todoRef.current;
    if (!input) return;

    const result = validateTodos(input.value);

    if (result.isValid === false) {
      showErrorToast(result.message);
      return;
    }

    const now = new Date();

    dispatch(
      addTodo({
        id: crypto.randomUUID(),
        text: result.text,
        completed: false,
        createdAtDate: now.toLocaleDateString('en-GB'),
        createdAtTime: now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      })
    );

    toast.success(`Added "${result.text}"`);

    input.focus();
    e.currentTarget.reset();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Input
          ref={todoRef}
          type="text"
          placeholder="Add a task"
          title="Enter Todo"
          maxLength={35}
          className="max-w-sm"
        />

        <Button type="submit" title="Add Todo">
          Add Todo
        </Button>
      </form>
    </div>
  );
};
