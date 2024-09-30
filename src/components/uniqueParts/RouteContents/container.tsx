import { useSelector } from "react-redux"
import { Contents } from "./presenter"
import { contentItems } from "../../../Reducks/contents"

export const ContentsContainer = () =>{
    const contents = useSelector(contentItems)

    return (
        <>
            <Contents contents={contents} />
        </>
    )
}