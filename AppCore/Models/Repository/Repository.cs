using AppCore.Models.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
namespace AppCore.Models.Repository
{
    public class Repository<T> : BaseRepository<T>, IRepository<T> where T : class
    {
        public Repository(AppsContext context) : base(context)
        {}
                
        public List<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public IEnumerable<T> GetAll(Func<IQueryable<T>, IQueryable<T>> includeMembers)
        {
            IQueryable<T> result = includeMembers(_dbSet);

            return result.AsEnumerable();
        }

        public Int32 CountTotalAll()
        {
            return _dbSet.ToList().Count();
        }

        public Int32 CountTotalByFilter(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).ToList().Count();
        }

        // ==================For Get ===================================
        public List<T> GetByFilter(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).ToList();
        }

        public List<T> GetByFilterPaging(Expression<Func<T, bool>> predicate, int page, int pageSize)
        {
            int skipRows = (page - 1) * pageSize;
            return _dbSet.Where(predicate).Skip(skipRows).Take(pageSize).ToList();
        }

        public T Get(object id)
        {
            return _dbSet.Find(id);
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate).AsEnumerable();
        }

        public virtual IEnumerable<T> GetWithRelated(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = _dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        // For Add
        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Add(params T[] entities)
        {
            _dbSet.AddRange(entities);
        }


        public void Add(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public async Task<bool> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return true;
        }

        public void AddAsync(params T[] entities)
        {
            _dbSet.AddRange(entities);
        }


        public void AddAsync(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        // For Delete
        public void Delete(T entity)
        {
            var existing = _dbSet.Find(entity);
            if (existing != null) _dbSet.Remove(existing);
        }
        
        public void Delete(object id)
        {
            var typeInfo = typeof(T).GetTypeInfo();
            var key = _dbContext.Model.FindEntityType(typeInfo).FindPrimaryKey().Properties.FirstOrDefault();
            var property = typeInfo.GetProperty(key?.Name);
            if (property != null)
            {
                var entity = Activator.CreateInstance<T>();
                property.SetValue(entity, id);
                _dbContext.Entry(entity).State = EntityState.Deleted;
            }
            else
            {
                var entity = _dbSet.Find(id);
                if (entity != null) Delete(entity);
            }
        }

        public void Delete(params T[] entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public void Delete(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public void DeleteRange(params T[] entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public void DeleteAsync(T entity)
        {
            var existing = _dbSet.Find(entity);
            if (existing != null) _dbSet.Remove(existing);
        }

        // For Update
        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Update(params T[] entities)
        {
            _dbSet.UpdateRange(entities);
        }
        
        public void Update(IEnumerable<T> entities)
        {
            _dbSet.UpdateRange(entities);
        }

        public void Dispose()
        {
            _dbContext?.Dispose();
        }        
    }
}
