
type TextareaProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    id: string;
    hint?: string;
};

export const Textarea: React.FC<TextareaProps> = ({ label, hint, value, onChange, id }) => {

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-roboto font-medium">{label}</label>
            <textarea id={id} onChange={e => { onChange(e.target.value) }} value={value} className="transition-colors p-2 border border-gray-300 dark:border-gray-800 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2 dark:bg-gray-700 dark:text-white" >
                {value}
            </textarea>
            {hint && <p className="text-xs text-gray-500">{hint}</p>}
        </div >
    )
}
