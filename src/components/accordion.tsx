import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

type AccordionProps = {
    heading: string;
    subheading?: string;
    children: React.ReactNode;
    open?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ heading, subheading, children, open = false }) => {

    const [show, setShow] = useState<boolean>(open);

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex flex-row border-b border-gray-300 dark:border-gray-700 justify-between items-center cursor-pointer" onClick={() => setShow(!show)}>
                <div className="pb-4 w-full ">
                    <h2 className="text-lg font-roboto font-semibold">{heading}</h2>
                    {subheading && <p className="text-sm text-gray-500 dark:text-gray-400">{subheading}</p>}
                </div>

                {show && <FaChevronDown />}
                {!show && <FaChevronRight />}
            </div>

            {show && (
                <div className="flex flex-col gap-4">
                    {children}
                </div>
            )}
        </div>

    )
};
