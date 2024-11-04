import { useDispatch, useSelector } from "react-redux";
import { fileItems, fileItems2, loading, error } from "../../../Reducks/fileupload/selectors";
import { FileUpload } from "./presenter";
import { addFileAsync, addFileAsync2, deleteFile, updateFile } from "../../../Reducks/fileupload/slicers";
import { AppDispatch } from "../../../Reducks/store";
import { useEffect } from "react";

export const FileUploadContainer = () => {
    const file = useSelector(fileItems)
    const file2 = useSelector(fileItems2)
    const loadingFlg = useSelector(loading)
    const errorText = useSelector(error)
    const dispatch: AppDispatch = useDispatch()

    const handleDrop = (files: File[]) => {
        // dispatch(updateFile(files[0]))
        dispatch(addFileAsync({file:files[0]}))
    }
    const handleDrop2 = (files: File[]) => {
        // dispatch(updateFile(files[0]))
        dispatch(addFileAsync2({file:files[0]}))
    }

    useEffect(() => {
        return () => {
            dispatch(deleteFile());
        };
    }, [dispatch]);

    return (
        <>
            <h1>ArrayBuffer</h1>
            <FileUpload file={file} onDrop={handleDrop} loading={loadingFlg} error={errorText} />
            <h1>Base64</h1>
            <FileUpload file={file2} onDrop={handleDrop2} loading={loadingFlg} error={errorText}/>
        </>

    )
}