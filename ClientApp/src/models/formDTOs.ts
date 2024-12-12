 interface FormField {
    value: string;
    error: boolean;
    helperText: string;
  }
  
  export interface FormData {
    [key: string]: FormField;
  }