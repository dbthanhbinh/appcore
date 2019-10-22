using AppCore.Models.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        void SaveChanges();
    }

    public interface IUnitOfWork<AppsContext> : IUnitOfWork where AppsContext : DbContext
    {
        AppsContext Context { get; }
    }
}
