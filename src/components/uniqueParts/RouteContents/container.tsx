import React from 'react'
import { Contents } from "./presenter"
import { contentItems, componentMap } from "../../../contents/contents"

export const ContentsContainer = () =>{

    return (
        <>
            <Contents contents={contentItems} componentMap={componentMap} />
        </>
    )
}