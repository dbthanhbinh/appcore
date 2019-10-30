using AppCore.Business;
using AppCore.Models;
using AppCore.Models.Repository;
using AppCore.Models.UnitOfWork;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace AppCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            // Add framework services.
            services.AddDbContext<AppsContext>(options =>
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped(typeof(IRepository<AppsContext>), typeof(Repository<AppsContext>));
            services.AddScoped<IUnitOfWork, UnitOfWork<AppsContext>>();
            services.AddScoped<IPostLogic, PostLogic>();
            services.AddScoped<ICategoryLogic, CategoryLogic>();
            services.AddScoped<IMediaLogic, MediaLogic>();
            services.AddScoped<IObjectMediaLogic, ObjectMediaLogic>();
            services.AddScoped<ISeoLogic, SeoLogic>();

            services.AddLogging(config =>
            {
                // clear out default configuration
                config.ClearProviders();
                config.AddConfiguration(Configuration.GetSection("Logging"));
                config.AddDebug();
                config.AddEventSourceLogger();

                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == EnvironmentName.Development)
                {
                    config.AddConsole();
                }
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "admin/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "admin";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
