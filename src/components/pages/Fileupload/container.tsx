import { useDispatch, useSelector } from "react-redux";
import { fileItems } from "../../../Reducks/fileupload/selectors";
import { FileUpload } from "./presenter";
import { addFileAsync, updateFile } from "../../../Reducks/fileupload/slicers";
import { AppDispatch } from "../../../Reducks/store";


export const FileUploadContainer = () => {
    const file = useSelector(fileItems)
    const dispatch: AppDispatch = useDispatch()

    const handleDrop = (files: File[]) => {
        // dispatch(updateFile(files[0]))
        dispatch(addFileAsync({file:files[0]}))
    }
    return (
        <>
            <FileUpload file={file} onDrop={handleDrop} />
        </>

    )
}