import { useDispatch, useSelector } from "react-redux";
import { fileItems } from "../../../Reducks/fileupload/selectors";
import { FileUpload } from "./presenter";
import { updateFile } from "../../../Reducks/fileupload/slicers";

export const FileUploadContainer = () => {
    const file = useSelector(fileItems)
    const dispatch = useDispatch()

    const handleDrop = (files: File[]) => {
        dispatch(updateFile(files[0]))
    }
    return (
        <>
            <FileUpload file={file} onDrop={handleDrop} />
        </>

    )
}