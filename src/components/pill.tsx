type PillProps = {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const Pill: React.FC<PillProps> = ({ active, onClick, children }) => {

    return (
        <button className={`px-4 py-2 text-sm font-roboto font-medium transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${active ? 'bg-primary text-white' : 'hover:bg-muted-primary/10 text-black'}`}
            onClick={onClick}>
            {children}
        </button>
    )
}
