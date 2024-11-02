import React, { useState } from 'react';

interface AccordionPanelProps {
    title: string;
    children: React.ReactNode;
}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const togglePanel = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div>
            <div onClick={togglePanel} className="cursor-pointer bg-gray-200 p-2">
                {title}
            </div>
            {isOpen && (
                <div className="p-2 border border-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
}