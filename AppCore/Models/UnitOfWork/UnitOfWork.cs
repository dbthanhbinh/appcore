using AppCore.Models.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.UnitOfWork
{
    public class UnitOfWork<AppsContext> : IUnitOfWork<AppsContext>, IUnitOfWork
        where AppsContext : DbContext, IDisposable
    {
        protected readonly AppCore.Models.AppsContext Context;
        private Dictionary<Type, object> _repositories;

        AppsContext IUnitOfWork<AppsContext>.Context => throw new NotImplementedException();

        public UnitOfWork(AppCore.Models.AppsContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new Repository<TEntity>(Context);
            return (IRepository<TEntity>)_repositories[type];
        }

        public void SaveChanges()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}
