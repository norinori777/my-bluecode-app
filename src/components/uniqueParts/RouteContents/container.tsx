import { useSelector } from "react-redux"
import { Contents } from "./presenter"
import { contentItems } from "../../../Reducks/contents"
import { componentMap } from "../../../contents/contents"

export const ContentsContainer = () =>{
    const contents = useSelector(contentItems)

    return (
        <>
            <Contents contents={contents} componentMap={componentMap} />
        </>
    )
}