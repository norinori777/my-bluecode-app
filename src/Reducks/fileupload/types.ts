
type FileUploadState = {
    file: File | null;
    loading: boolean;
    error: string | null;
}

type AddFileType = {
    file: File;
}