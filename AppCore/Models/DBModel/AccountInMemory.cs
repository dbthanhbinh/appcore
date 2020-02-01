using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public static class AccountInMemory
    {
        public static IList<User> ArrayAccount = new List<User>();

        static AccountInMemory()
        {
            ArrayAccount.Add(new User
            {
                Id = Guid.NewGuid(),
                FullName = "Binh trinh",
                Phone = "0909874825",
                Email = "leotrinh86@gmail.com"
            });
        }
    }
}
