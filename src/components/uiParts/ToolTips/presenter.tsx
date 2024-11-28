import React from 'react';

interface ToolTipsProps {
    text: string;
    show: boolean;
    position: 'top' | 'right' | 'bottom' | 'left';
}

export const ToolTips = (props: ToolTipsProps) => {
    let positionClasses = '';

    switch (props.position) {
        case 'top':
            positionClasses = 'bottom-full left-2 transform -translate-x-1/2 mb-5';
            break;
        case 'right':
            positionClasses = 'left-full transform -translate-y-1/2 ml-8';
            break;
        case 'bottom':
            positionClasses = 'top-full left-2 transform -translate-x-1/2 mt-7';
            break;
        case 'left':
            positionClasses = 'right-full top-1/2 transform -translate-y-1/2 mr-5';
            break;
        default:
            break;
    }

    const formatText = (text: string) => {
        return text.split('<br>').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ))
      }

    return (
        <div className="relative inline-block">
            {props.show && (
                <div className={`absolute ${positionClasses} w-40 bg-white text-black text-center text-sm rounded py-2 px-3 opacity-90`}>
                    {formatText(props.text)}
                    <div className={`absolute ${props.position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2' : ''} 
                                    ${props.position === 'right' ? 'right-full top-1/2 transform -translate-y-1/2' : ''} 
                                    ${props.position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2' : ''} 
                                    ${props.position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2' : ''} 
                                    w-0 h-0 border-8 ${props.position === 'top' ? 'border-t-white border-x-transparent border-b-transparent' : ''} 
                                    ${props.position === 'bottom' ? 'border-b-white border-x-transparent border-t-transparent' : ''} 
                                    ${props.position === 'right' ? 'border-r-white border-y-transparent border-l-transparent' : ''} 
                                    ${props.position === 'left' ? 'border-l-white border-y-transparent border-r-transparent' : ''}`}>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToolTips;