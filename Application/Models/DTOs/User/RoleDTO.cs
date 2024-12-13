using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.DTOs.User
{
    public class RoleDTO
    {
        public int Id { get; set; }

        public string? RoleName { get; set; }

        public string? Description { get; set; }

        public List<RolePermissionDTO> RolePermissions { get; set; } = new List<RolePermissionDTO>();

        public List<UserDTO> Users { get; set; } = new List<UserDTO>();
    }


}
