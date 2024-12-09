import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, createTheme } from '@mui/material';
import { AppProvider, type Session, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import ManageAccountsTwoTone from '@mui/icons-material/ManageAccountsTwoTone';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreateRounded from '@mui/icons-material/CreateRounded';
import DocumentScannerSharp from '@mui/icons-material/DocumentScannerSharp';
import DocumentScannerOutlined from '@mui/icons-material/DocumentScannerOutlined';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import DocumentScannerTwoTone from '@mui/icons-material/DocumentScannerTwoTone';
import ApprovalSharp from '@mui/icons-material/ApprovalSharp';
import ApprovalTwoTone from '@mui/icons-material/ApprovalTwoTone';
import reactLogo from '../assets/react.svg'
import { jwtDecode, JwtPayload } from "jwt-decode";
import './MainLayout.css'


// import logo from '../assets/re1act.svg'; // Importing logo

// Define your navigation menu
const NAVIGATION: Navigation = [
    { kind: 'header', title: 'USERS' },
    {
        segment: 'UserManagement',
        title: 'User Management',
        icon: <ManageAccounts />,
        children: [
            { segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
            { segment: 'CreateUserAccess', title: 'Create User Access', icon: <CreateRounded /> },
            { segment: 'ManageRoles', title: 'Manage Roles', icon: <ManageAccounts /> },
            { segment: 'EmployeeMaintenance', title: 'Employee Maintenance', icon: <ManageAccountsTwoTone /> },
        ],
    },
    { kind: 'divider' },
    { kind: 'header', title: 'GROUPS' },
    {
        segment: 'GroupManagement',
        title: 'Groups Management',
        icon: <BarChartIcon />,
        children: [
            { segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
            { segment: 'CreateGroup', title: 'Create Group', icon: <CreateRounded /> },
        ],
    },
    { kind: 'divider' },
    { kind: 'header', title: 'OTHERS' },
    {
        segment: 'GenerateReport',
        title: 'Generate Report',
        icon: <DocumentScannerTwoTone />,
        children: [
            { segment: 'AuditLogs', title: 'Audit Logs', icon: <DocumentScannerSharp /> },
            { segment: 'UserList', title: 'User List', icon: <DocumentScannerOutlined /> },
            { segment: 'GroupList', title: 'Group List', icon: <DocumentScanner /> },
        ],
    },
    { kind: 'divider' },
    { kind: 'header', title: 'EXCEPTIONS' },
    {
        segment: 'ExceptionsManagement',
        title: 'Exceptions Management',
        icon: <ApprovalTwoTone />,
        children: [
            { segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
            { segment: 'ForApprovalExceptions', title: 'For Approval (Exceptions)', icon: <ApprovalSharp /> },
            { segment: 'ForApprovalSubExceptions', title: 'For Approval (Sub-Exceptions)', icon: <ApprovalSharp /> },
        ],
    },
    { kind: 'divider' },
    { kind: 'header', title: 'REPORTS' },
    {
        segment: 'ReportsManagement',
        title: 'Reports Management',
        icon: <DocumentScannerTwoTone />,
        children: [
            { segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
            { segment: 'GenerateRegularReports', title: 'Generate Regular Reports', icon: <DocumentScannerOutlined /> },
        ],
    },
];

interface CustomJwtPayload extends JwtPayload {
    EmployeeID: string;
    LoginDateTime: string;
    LoginName: string;
    Name: string;
    Role: string;
    aud: string;
    exp: number;
    iss: string;
}

// Define your theme
const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
    colorSchemes: { light: true, dark: true },
    breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 } },
    typography: {
        fontSize: 11, // Adjusting base font size
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: 100, // Adjust sidebar width
                },
            },
        },
    },
});


// Main Layout component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        authentication.signIn();
        const token = localStorage.getItem('token'); // Retrieve your token
        if (token) {
            try {
                // Decode the JWT payload with your custom type
                const decoded = jwtDecode<CustomJwtPayload>(token);
                // console.log(decoded)

                localStorage.setItem('jwtLoginName' , decoded.LoginName)
                localStorage.setItem('jwtRole' , decoded.Role)
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }

        // console.log(decodedPayload.LoginName)
        // console.log(decodedPayload.Role)
    }, []);


    const authentication = React.useMemo(
        () => ({
            signIn: () => {
                setSession({
                    user: {
                        // name: localStorage.getItem('jwtLoginName'),
                        // email: localStorage.getItem('jwtRole'),

                        name: localStorage.getItem('jwtLoginName'),
                        email: localStorage.getItem('jwtRole'),
                    },
                });
            },
            signOut: () => {
                localStorage.clear()
                setSession(null)
                navigate('/')
            },
        }),
        []
    );

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={NAVIGATION}
            theme={demoTheme}
            branding={{ title: 'CCEMS NI LEO AT JOHNLY', logo: '' }}
        >
            <DashboardLayout>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        height: '100%',
                        padding: 2,
                        boxSizing: 'border-box',
                    }}
                >
                    <Card
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'stretch',
                            padding: 3,
                            boxShadow: 3,
                        }}
                    >
                        {children}
                    </Card>
                </Box>
            </DashboardLayout>
        </AppProvider>
    );
};

export default MainLayout;
