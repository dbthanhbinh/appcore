using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AppCore.Models.Repository
{
    public abstract class BaseRepository<T> where T : class
    {
        protected readonly AppsContext _dbContext;
        protected DbSet<T> _dbSet {get; }

        public BaseRepository(AppsContext context)
        {
            _dbContext = context ?? throw new ArgumentException(nameof(context));
            _dbSet = _dbContext.Set<T>();
        }
    }
}
