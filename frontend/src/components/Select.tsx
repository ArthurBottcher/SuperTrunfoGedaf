// components/Select.tsx
export interface Option {
  text: string;
  id: string | number;
  value: string | number;
  users: Array<{ username: string; socket_id: string }>;
}

interface SelectProps {
  options: Option[]
  placeholder: string
  label?: string
  id: string
  onChange: (event) => void
}

export function Select({
  options,
  label,
  placeholder,
  id,
  onChange,
}: SelectProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        defaultValue={-1}
        id={id}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={-1}>{placeholder}</option>
        {options.map((option) => (
          <option
            className="flex justify-between"
            key={option.id}
            value={option.value}
            disabled={option.users.length >= 2}
          >
            {option.text}
            {option.users.length} / 2
          </option>
        ))}
      </select>
    </>
  )
}
