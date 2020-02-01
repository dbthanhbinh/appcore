using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class UserRequests
    {
    }

    public static class UserValidMessages
    {
        public static string FULL_NAME_NOT_NULL { get { return "Full name must be required"; } }
        public static string PHONE_NOT_NULL { get { return "Phone must be required"; } }
        public static string EMAIL_NOT_NULL { get { return "Email must be required"; } }
        public static string EMAIL_NOT_VALID_FORMAT { get { return "Email is not valid"; } }
        public static string PASSWORD_NOT_NULL { get { return "Password must be required"; } }
        public static string REPASSWORD_NOT_NULL { get { return "Re-Password must be required"; } }
        public static string PASSWORD_DOES_NOT_MATCH { get { return "Confirm password does not match"; } }
        public static string USER_ID_NOT_NULL { get { return "User id must be required"; } }
    }

    public class CreateUserReq
    {
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
    }

    public class RegisterMemberReq
    {
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
    }

    public class GetProfileMemberReq
    {
        public Guid UserId { get; set; }
    }

    public class UserMemberValid
    {
        public bool IsValid { get; set; }
        public List<string> Messages { get; set; }
    }

    public class GetUsersReq
    {
        public virtual int CurrentPage { get; set; } = 1;
        public virtual int PageSize { get; set; } = 10;
    }

    public class LoginReq
    {
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
