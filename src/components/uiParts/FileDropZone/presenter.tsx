import { useCallback } from "react";
import { Upload } from "../../icons/upload";
import { useDropzone } from "react-dropzone";

interface FileDropZoneProps {
  onDrop: (files: File[]) => void
  notInDragText: string
  InDragText: string
}

export const FileDropZone = (props: FileDropZoneProps) => {
    const onDropCallback = useCallback((acceptedFiles: File[]) => {
        props.onDrop(acceptedFiles);
      }, [props.onDrop]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

    return (
        <div className="max-w-xl">
            <label {...getRootProps()}
                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <Upload theme="primary" />
                    <span className="font-medium text-gray-600">
                        {isDragActive ? (props.InDragText) : (props.notInDragText)}
                    </span>
                </span>
                <input {...getInputProps()} />
            </label>
        </div>
    )
}
