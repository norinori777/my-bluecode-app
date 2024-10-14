import { Plus } from "../../icons/Plus"
import { TextMessage } from "../TextMessage"

interface ListWithIconsProps {
    theme: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'normal' | 'white' | 'black'
    text: string
    action: () => void
}

export const LinkWithIcon = (props: ListWithIconsProps) => {
    const handleClick = () => {
        props.action()
    }

    return (
          <div className="flex flex-row gap-1 cursor-pointer" onClick={handleClick}>
            <Plus theme={props.theme} />
            <TextMessage text={props.text} size="2xl" theme={props.theme} underline={true} />
          </div>
    )
}