using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Provider
{
    public class TokenProviderOptions
    {
        public string Path { get; set; } = "/token";
        public TimeSpan Expiration { get; set; } = TimeSpan.FromDays(+1);
        public SigningCredentials SigningCredentials { get; set; }
    }
}
