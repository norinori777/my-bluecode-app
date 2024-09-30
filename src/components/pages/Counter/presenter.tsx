import { BasicButton } from "../../uiParts/BasicButton";
import { TextMessage } from "../../uiParts/TextMessage"

interface CounterProps {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const Counter = (props: CounterProps) => {
    const onClickIncrement = () => {
        props.increment();
    }

    const onClickDecrement = () => {
        props.decrement();
    }

    const onClickReset = () => {
        props.reset();
    }

    return (
        <div className="p-6">
            <TextMessage text="Counter Page" size="2xl" theme="primary" underline={true} /> 
            <div className="p-2">
                <TextMessage text="This is a simple counter page." size="base" theme="normal" />
                <div className="p-2">
                    <TextMessage text={`Current count: ${props.count}`} size="base" theme="normal" />
                </div>
                <div className="flex flex-row p-2 gap-1">
                    <BasicButton label="Increment" theme="primary" action={onClickIncrement} type="button" />
                    <BasicButton label="Decrement" theme="danger" action={onClickDecrement} type="button" />
                    <BasicButton label="Reset" theme="normal" action={onClickReset} type="button" />
                </div>
            </div>
        </div>
    );
}