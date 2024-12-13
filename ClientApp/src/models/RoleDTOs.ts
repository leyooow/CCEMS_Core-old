export interface RoleDTO {
    id: number;
    roleName?: string;
    description?: string;
    rolePermissions: RolePermissionDTO[];
    users: UserDTO[];
}

// "success": true,
//     "message": "Roles retrieved successfully",
//     "statusCode": 200,
//     "data": [
//         {
//             "id": 2,
//             "roleName": "BOO",
//             "description": "Branch Users",
//             "rolePermissions": [],
//             "users": []
//         },

export interface GenericResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: RoleDTO[];
}

export interface RolePermissionDTO {
    // Define properties relevant to RolePermission here
    // Example:
    id: number;
    permissionName?: string;
}

export interface UserDTO {
    // Define properties relevant to User here
    // Example:
    id: number;
    username?: string;
}
