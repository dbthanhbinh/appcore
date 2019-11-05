using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IUserLogic
    {
        Task<User> CreateUserAsync(User user);
        IEnumerable<User> GetAll();
        User Authenticate(string phone);
    }
}
