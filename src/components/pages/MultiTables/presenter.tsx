import { TestActionTableContainer } from "../../uiParts/ActionTable/TestActionTableContainer"
import { AccordionPanel } from "../../uiParts/AcordionPanel"
import { user } from "../../../Reducks/member/types"


interface MultiTablesProps<T> {
    items: { [key: string]: T[] }
    tableHeaderTitles: string[]
}

export const MultiTables = <T extends user>(props: MultiTablesProps<T>) => {
    return (
        <>
            {Object.entries(props.items).map(([key, item]) => (
                <div key={key}>
                    <AccordionPanel title={key}>
                        <TestActionTableContainer titleHeader={props.tableHeaderTitles} items={item} />
                    </AccordionPanel>
                </div>
            ))}
        </>
            
    )
}