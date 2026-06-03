import { useRef } from 'react';

import toast from 'react-hot-toast';

type InputFormProps = {
  onAdd: (todo: string) => boolean;
};

export const InputForm = ({ onAdd }: InputFormProps) => {
  const todoRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = todoRef.current;

    if (!input) return;

    const todo = input.value.trim();
    const added = onAdd(todo);

    input.focus();

    if (!added) {
      toast.error('Please enter a todo item to add');
      return;
    }

    e.currentTarget.reset();
    toast.success(`Added "${todo}"`, { duration: 3000 });
  };

  return (
    <div className="p-4">
      <form className="flex items-center gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Todo"
          title="Enter Todo"
          maxLength={35}
          ref={todoRef}
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-1"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          ADD TODO
        </button>
      </form>
    </div>
  );
};
