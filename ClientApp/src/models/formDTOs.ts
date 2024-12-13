export interface FormData {
    [key: string]: FormField;
}

interface FormField {
    value: string;
    error: boolean;
    helperText: string;
}

