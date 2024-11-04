import DisplayPDF from "../../uiParts/DisplayPDF/presenter"
import { FileDropZone } from "../../uiParts/FileDropZone"
import { TextMessage } from "../../uiParts/TextMessage"

interface FileUploadProps {
    file: File | null;
    onDrop: (files: File[]) => void;
    loading: boolean;
    error: string | null;
}

export const FileUpload = (props: FileUploadProps) => {
    const pdfFile = props.file ? URL.createObjectURL(props.file) : '';

    return(
        <div className="p-6">
            <TextMessage text="File upload Page" size="2xl" theme="primary" underline={true} /> 
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            <div className="p-2">
                <div className="flex flex-row p-2 gap-1">
                    <FileDropZone notInDragText="複数のファイルをドロップするか、クリックしてファイルを選択してください。" InDragText="ファイルをドロップしてください。" onDrop={props.onDrop} />
                </div>
                {props.loading ? <div>Loading...</div> : 
                <div>
                    {props.file && (
                        <div>
                            <DisplayPDF pdfData={pdfFile} />
                        </div>
                    )}
                </div>}
            </div>
        </div>
    )
}