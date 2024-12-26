
import {JwtPayload } from 'jwt-decode';

// API Endpoints
export const API_BASE_URL = 'https://localhost:7192/api';
// export const API_BASE_URL = 'http://172.19.13.216:5555/api';

export const SECRET_KEY = "JOHNLYOROYANDLEOESPINO20253Z93rLbyZucty3";

// Application Settings
export const APP_NAME = 'CCEMS';
export const DEFAULT_LANGUAGE = 'en-US';

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  NETWORK_ERROR: 'Unable to connect to the server. Please try again later.',
};

// Miscellaneous
export const DATE_FORMAT = 'YYYY-MM-DD';


export interface CustomJwtPayload extends JwtPayload {
  EmployeeID: string;
  LoginDateTime: string;
  LoginName: string;
  Name: string;
  Role: string;
  aud: string;
  exp: number;
  iss: string;
}