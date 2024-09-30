import { headerMenuItems,  } from "../../contents/contents";
import { HeaderMenuState } from "./types";

export const initialMenuState: HeaderMenuState = {
    headerMenuItems: headerMenuItems,
    selectedMeneItem: headerMenuItems[0]
}