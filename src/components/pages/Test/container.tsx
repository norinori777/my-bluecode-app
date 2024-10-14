import { useDispatch, useSelector } from "react-redux"
import { testState } from "../../../Reducks/test/selectors"
import { AppDispatch } from "../../../Reducks/store"
import { fetchTestAsync } from "../../../Reducks/test/slices"
import { useEffect } from "react"
import { Test } from "./presenter"
import { Dropdown } from "../../uiParts/Dropdown/presenter"


export const TestContainer = () => {
    const test = useSelector(testState)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTestAsync())
    },[dispatch])

    return (
        <>
            <Test test={test} />
        </>
    )
}