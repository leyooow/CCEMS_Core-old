import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import userService from "../../../services/userService";
import { useEffect, useState } from "react";
import { GenericResponse, RoleDTO } from "../../../models/RoleDTOs";
import { globalStyle } from "../../../styles/theme";
import EditNoteTwoTone from "@mui/icons-material/EditNoteTwoTone";
import Table from "../../../components/Table/Table";


const RoleList: React.FC = () => {
  const [roleList, setRoleList] = useState<RoleDTO[]>([]);

  const fetchRoles = async () => {
    try {
      const result: GenericResponse = await userService.GetAllRoles();
      setRoleList(result.data); // Ensure result.data is RoleDTO[]]
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const columns = [
    { label: 'Role ID', accessor: 'id' },
    { label: 'Role Name', accessor: 'roleName' },
    { label: 'Description', accessor: 'description' },
    {
      label: 'Action',
      render: () => (
        <Box sx={globalStyle.buttonBox}>
          <Tooltip title="Manage Roles">
            <IconButton color='primary'>
              <EditNoteTwoTone />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];


  return (
    <>
      <Box sx={globalStyle.mainBox}>
        <Typography variant="h6" component="h6" gutterBottom>
          Roles
        </Typography>

      </Box>

      {/* Table wrapped inside a responsive container */}
      <Table columns={columns} data={roleList} />
    </>
  );
};

export default RoleList;