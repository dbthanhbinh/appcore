﻿// <auto-generated />
using System;
using AppCore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AppCore.Migrations
{
    [DbContext(typeof(AppsContext))]
    partial class AppsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("AppCore.Models.DBModel.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<Guid?>("ParentId");

                    b.Property<string>("Slug");

                    b.HasKey("Id");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Media", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Path");

                    b.Property<long>("Size");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.ObjectMedia", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<Guid>("MediaId");

                    b.Property<DateTime>("Modified");

                    b.Property<Guid>("ObjectId");

                    b.Property<string>("ObjectType");

                    b.HasKey("Id");

                    b.ToTable("ObjectMedia");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CategoryId");

                    b.Property<string>("Content");

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Seo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<Guid>("ObjectId");

                    b.Property<string>("ObjectType");

                    b.Property<string>("SeoDescription");

                    b.Property<string>("SeoKeys");

                    b.Property<string>("SeoTitle");

                    b.Property<string>("Slug");

                    b.HasKey("Id");

                    b.ToTable("Seo");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.SimCard", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name");

                    b.Property<int>("Price");

                    b.Property<string>("Supplier");

                    b.HasKey("Id");

                    b.ToTable("SimCard");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<string>("FullName");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Password");

                    b.Property<string>("Phone");

                    b.Property<string>("Token");

                    b.HasKey("Id");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}
