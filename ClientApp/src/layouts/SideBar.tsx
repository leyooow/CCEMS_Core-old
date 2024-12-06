// import React from 'react';
// import { Box, createTheme } from '@mui/material';
// import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { Outlet } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import CreateOutlined from '@mui/icons-material/CreateOutlined';
// import ManageAccounts from '@mui/icons-material/ManageAccounts';
// import ManageAccountsTwoTone from '@mui/icons-material/ManageAccountsTwoTone';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import CreateRounded from '@mui/icons-material/CreateRounded';
// import DocumentScannerSharp from '@mui/icons-material/DocumentScannerSharp';
// import DocumentScannerOutlined from '@mui/icons-material/DocumentScannerOutlined';
// import DocumentScanner from '@mui/icons-material/DocumentScanner';
// import DocumentScannerTwoTone from '@mui/icons-material/DocumentScannerTwoTone';
// import ApprovalSharp from '@mui/icons-material/ApprovalSharp';
// import ApprovalTwoTone from '@mui/icons-material/ApprovalTwoTone';

// // Define your navigation menu
// const NAVIGATION: Navigation = [
// 	{ kind: 'header', title: 'USERS' },
// 	{
// 		segment: 'UserManagement',
// 		title: 'User Management',
// 		icon: <ManageAccounts />,
// 		children: [
// 			{ segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
// 			{ segment: 'CreateUserAccess', title: 'Create User Access', icon: <CreateRounded /> },
// 			{ segment: 'ManageRoles', title: 'Manage Roles', icon: <ManageAccounts /> },
// 			{ segment: 'EmployeeMaintenance', title: 'Employee Maintenance', icon: <ManageAccountsTwoTone /> },
// 		],
// 	},
// 	{ kind: 'divider' },
// 	{ kind: 'header', title: 'GROUPS' },
// 	{
// 		segment: 'GroupManagement',
// 		title: 'Groups Management',
// 		icon: <BarChartIcon />,
// 		children: [
// 			{ segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
// 			{ segment: 'CreateGroup', title: 'Create Group', icon: <CreateRounded /> },
// 		],
// 	},
// 	{ kind: 'divider' },
// 	{ kind: 'header', title: 'OTHERS' },
// 	{
// 		segment: 'GenerateReport',
// 		title: 'Generate Report',
// 		icon: <DocumentScannerTwoTone />,
// 		children: [
// 			{ segment: 'AuditLogs', title: 'Audit Logs', icon: <DocumentScannerSharp /> },
// 			{ segment: 'UserList', title: 'User List', icon: <DocumentScannerOutlined /> },
// 			{ segment: 'GroupList', title: 'Group List', icon: <DocumentScanner /> },
// 		],
// 	},

// 	{ kind: 'divider' },
// 	{ kind: 'header', title: 'EXCEPTIONS' },
// 	{
// 		segment: 'ExceptionsManagement',
// 		title: 'Exceptions Management',
// 		icon: <ApprovalTwoTone />,
// 		children: [
// 			{ segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
// 			{ segment: 'ForApprovalExceptions', title: 'For Approval (Exceptions)', icon: <ApprovalSharp /> },
// 			{ segment: 'ForApprovalSubExceptions', title: 'For Approval (Sub-Exceptions)', icon: <ApprovalSharp /> },
// 		],
// 	},
// 	{ kind: 'divider' },
// 	{ kind: 'header', title: 'REPORTS' },
// 	{
// 		segment: 'ReportsManagement',
// 		title: 'Reports Management',
// 		icon: <DocumentScannerTwoTone />,
// 		children: [
// 			{ segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
// 			{ segment: 'GenerateRegularReports', title: 'Generate Regular Reports', icon: <DocumentScannerOutlined /> },
// 		],
// 	},
// ];

// // Define your theme
// const demoTheme = createTheme({
// 	cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
// 	colorSchemes: { light: true, dark: true },
// 	breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 } },
// 	typography: {
// 	  fontSize: 13, // You can adjust the base font size here
// 	},
// 	components: {
// 	  // Overriding the sidebar width to make it smaller
// 	  MuiDrawer: {
// 		styleOverrides: {
// 		  paper: {
// 			width: 150, // Adjust this to make the sidebar smaller (e.g., 180px)
// 		  },
// 		},
// 	  },
// 	},
//   });
  

  

// // Define the type for the props, including children
// interface SideBarProps {
// 	children: React.ReactNode;  // Explicitly typing children
// }

// const SideBar: React.FC<SideBarProps> = ({ children }) => (
// 	<AppProvider navigation={NAVIGATION} theme={demoTheme}>
// 		<DashboardLayout>
// 			{/* Reduce padding, font size, and other styles */}
// 			<Box
// 				sx={{
// 					py: 2,
// 					fontSize: '0.75rem',  // Smaller font size and padding 
// 					overflowY: 'auto',    // Make the box scrollable
// 					'&::-webkit-scrollbar': {
// 						width: '5px',  // Set width of the scrollbar
// 					},
// 					'&::-webkit-scrollbar-thumb': {
// 						backgroundColor: 'rgba(0, 0, 0, 0.3)', // Thumb color
// 						borderRadius: '10px',  // Rounded corners
// 					},
// 					'&::-webkit-scrollbar-track': {
// 						backgroundColor: 'transparent',  // Track color
// 					},
// 				}}
// 			>
// 				{children}
// 			</Box>
// 		</DashboardLayout>
// 	</AppProvider>
// );

// export default SideBar;
