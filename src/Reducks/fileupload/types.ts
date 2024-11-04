
type FileUploadState = {
    file: File | null;
    file2: File | null;
    loading: boolean;
    error: string | null;
}

type AddFileType = {
    file: File;
}