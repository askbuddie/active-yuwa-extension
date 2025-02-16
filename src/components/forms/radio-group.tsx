
type RadioOption = {
    id: string;
    label: string;
    value: string;
}

type RadioGroupProps = {
    options: RadioOption[];
    selected: string;
    onChange: (value: string) => void;
    label: string;
    hint?: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, selected, onChange, label, hint }) => {

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-roboto font-medium">{label}</label>
                {hint && (<p className="text-xs text-gray-500">{hint}</p>)}
            </div>

            <div className="flex flex-row gap-6">
                {options.map(option => {
                    return (
                        <div key={option.id} className="flex flex-row gap-4 items-center ">
                            <input type="radio" className="h-4 w-4 text-primary border-gray-300 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-700 dark:checked:border-primary dark:checked:bg-primary dark:focus:ring-offset-gray-800" name={label} id={option.id} checked={selected === option.value} onChange={() => onChange(option.value)} />
                            <label htmlFor={option.id}>{option.label}</label>
                        </div>
                    )
                })}
            </div>

        </div>
    )
};
