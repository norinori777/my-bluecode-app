import { useState, useCallback } from 'react';

type AsyncCallback = () => Promise<void>;

const usePreventDoubleClick = (callback: AsyncCallback) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = useCallback(async () => {
        if (isDisabled) return;

        setIsDisabled(true);
        try {
            await callback();
        } finally {
            setIsDisabled(false);
        }
    }, [isDisabled, callback]);

    return { handleClick, isDisabled };
};

export default usePreventDoubleClick;