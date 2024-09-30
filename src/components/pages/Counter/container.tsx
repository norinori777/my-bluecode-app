import { useDispatch, useSelector } from "react-redux"
import { Counter } from "./presenter"
import { count } from "../../../Reducks/counter"
import { decrement, increment, reset } from "../../../Reducks/counter/slices"

export const CounterContainer = () => {
    const nowCount = useSelector(count)
    const dispatch = useDispatch()
    const setIncrement = () => dispatch(increment())
    const setDecrement = () => dispatch(decrement())
    const setReset = () => dispatch(reset())

    return (
        <>
            <Counter count={nowCount} increment={setIncrement} decrement={setDecrement} reset={setReset}  />
        </>
    )
}