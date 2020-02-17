using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
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
        void AddRange(IEnumerable<T> entities);
        Task<bool> AddAsync(T entity);
        void AddAsync(params T[] entities);
        void AddAsync(IEnumerable<T> entities);

        void Delete(T entity);
        void Delete(object id);
        void Delete(params T[] entities);
        void Delete(IEnumerable<T> entities);
        void DeleteAsync(T entity);
        void DeleteRange(params T[] entities);

        void DeleteRange(IEnumerable<T> entities);


        void Update(T entity);
        void Update(params T[] entities);
        void Update(IEnumerable<T> entities);

        T Get(object id);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate);
        List<T> GetAll();
        IEnumerable<T> GetAll(Func<IQueryable<T>, IQueryable<T>> includeMembers);
        List<T> GetByFilter(Expression<Func<T, bool>> predicate);
        List<T> GetByFilterPaging(Expression<Func<T, bool>> predicate, int page, int pageSize);
        IEnumerable<T> GetWithRelated(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");

        Int32 CountTotalByFilter(Expression<Func<T, bool>> predicate);
        Int32 CountTotalAll();
    }
}
