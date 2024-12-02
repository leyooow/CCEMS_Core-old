
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing Page/LandingPage';
import SideBar from '../layouts/SideBar';
import UserManagementDashboard from '../pages/User Management/Dashboard/Dashboard';
import CreateUserAccess from '../pages/User Management/Create User Access/CreateUserAcces';
import ManageRoles from '../pages/User Management/Manage Roles/ManageRoles';
import EmployeeMaintenance from '../pages/User Management/Employee Maintenance/EmployeeMaintenance';
import GroupManagementDashboard from '../pages/Group Management/Dashboard/Dashboard';
import CreateGroup from '../pages/Group Management/Create Group/CreateGroup';
import AuditLogs from '../pages/Generate Report/Audit Logs/AuditLogs';
import UserList from '../pages/Generate Report/User List/UserList';
import GroupList from '../pages/Generate Report/Group List/GroupList';
import ExceptionManagementDashboard from '../pages/Exception Management/Dashboard/Dashboard';
import ForApprovalException from '../pages/Exception Management/For Approval (Exception)/ForApprovalException';
import ForApprovalSubException from '../pages/Exception Management/For Approval (Sub-Exception)/ForApprovalSubException';
import ReportManagementDashboard from '../pages/Reports Management/Dashboard/Dashboard';
import GenerateRegularReports from '../pages/Reports Management/Generate Regular Reports/GenerateRegularReports';

const AppRoutes = () => (
  <BrowserRouter>
    <SideBar>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* User Management Routes */}
        <Route path="/UserManagement" element={<UserManagementDashboard />} />
        <Route path="/UserManagement/Dashboard" element={<UserManagementDashboard />} />
        <Route path="/UserManagement/CreateUserAccess" element={<CreateUserAccess />} />
        <Route path="/UserManagement/ManageRoles" element={<ManageRoles />} />
        <Route path="/UserManagement/EmployeeMaintenance" element={<EmployeeMaintenance />} />

        {/* User Management Routes */}
        <Route path="/GroupManagement" element={<GroupManagementDashboard />} />
        <Route path="/GroupManagement/Dashboard" element={<GroupManagementDashboard />} />
        <Route path="/GroupManagement/CreateGroup" element={<CreateGroup />} />

        {/* Generate Report Routes */}
        <Route path="/GenerateReport" element={<AuditLogs />} />
        <Route path="/GenerateReport/AuditLogs" element={<AuditLogs />} />
        <Route path="/GenerateReport/UserList" element={<UserList />} />
        <Route path="/GenerateReport/GroupList" element={<GroupList />} />


        {/* Exceptions Management Routes */}
        <Route path="/ExceptionsManagement/" element={<ExceptionManagementDashboard />} />
        <Route path="/ExceptionsManagement/Dashboard" element={<ExceptionManagementDashboard />} />
        <Route path="/ExceptionsManagement/ForApprovalExceptions" element={<ForApprovalException />} />
        <Route path="/ExceptionsManagement/ForApprovalSubExceptions" element={<ForApprovalSubException />} />

        {/* Reports Management Routes */}
        <Route path="/ReportsManagement" element={<ReportManagementDashboard />} />
        <Route path="/ReportsManagement/Dashboard" element={<ReportManagementDashboard />} />
        <Route path="/ReportsManagement/GenerateRegularReports" element={<GenerateRegularReports />} />
 
      </Routes>
    </SideBar>
  </BrowserRouter>
);

export default AppRoutes;