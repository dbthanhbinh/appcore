using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IUserLogic
    {
        Task<User> CreateUserAsync(User user);
        Task<User> RegisterMemberAsync(RegisterMemberReq registerMemberReq);
        Task<UserDetailVM> GetUserById(Guid userId);
        Task<PagingResponse> GetUsersWithPagingAsync(GetUsersReq getUsersReq);
        User Authenticate(LoginReq loginReq);
        UserMemberValid CheckValidRegisterAttibutes(RegisterMemberReq registerMemberReq);
        UserMemberValid CheckValidProfileAttibutes(Guid UserId);
        void LogOutAsyn();
    }
}
