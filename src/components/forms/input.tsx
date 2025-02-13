
type InputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    id: string;

    type?: string;
    hint?: string;
};

export const Input: React.FC<InputProps> = ({ label, hint, value, onChange, id, type = 'text' }) => {

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-roboto font-medium">{label}</label>
            <input type={type} id={id} value={value} onChange={e => { onChange(e.target.value) }} className="transition-colors p-2 border border-gray-300 dark:border-gray-800 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2 dark:bg-gray-700 dark:text-white" />
            {hint && <p className="text-xs text-gray-500">{hint}</p>}
        </div>
    )
}
