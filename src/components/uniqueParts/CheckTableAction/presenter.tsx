
interface CheckBoxTableActionProps {
    check: boolean
    handleCheck: () => void
}

export const CheckBoxTableAction = (props: CheckBoxTableActionProps) => {

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleCheck()
    }

    return (
        <div className="flex flex-row gap-2 cursor-pointer">
            <input
                className="form-checkbox h-5 w-5 text-blue-600"
                type="checkbox"
                checked={props.check}
                onChange={() => props.handleCheck()}
            />
        </div>
    )
}