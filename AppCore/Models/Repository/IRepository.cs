using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AppCore.Models.Repository
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Add(T entity);
        void Add(params T[] entities);
        void Add(IEnumerable<T> entities);


        void Delete(T entity);
        void Delete(object id);
        void Delete(params T[] entities);
        void Delete(IEnumerable<T> entities);
        void DeletePostAsync(T entity);


        void Update(T entity);
        void Update(params T[] entities);
        void Update(IEnumerable<T> entities);

        T Get(object id);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate);
        List<T> GetAll();

        Task<bool> AddAsync(T entity);
    }
}
