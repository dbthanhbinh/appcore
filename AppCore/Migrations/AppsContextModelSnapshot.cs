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
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
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

                    b.Property<string>("Slug")
                        .IsRequired();

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

                    b.Property<string>("ResizeType");

                    b.Property<long>("Size");

                    b.Property<string>("SubName");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Menu", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("CustomUrl");

                    b.Property<string>("GroupMenu");

                    b.Property<string>("IconClass");

                    b.Property<string>("IconPath");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("ObjectType");

                    b.Property<Guid?>("ParentId");

                    b.Property<string>("Slug");

                    b.Property<string>("StandardUrl");

                    b.Property<string>("SubName");

                    b.Property<string>("Target");

                    b.HasKey("Id");

                    b.ToTable("Menu");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.ObjectMedia", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<Guid>("MediaId");

                    b.Property<string>("MediaType");

                    b.Property<DateTime>("Modified");

                    b.Property<Guid>("ObjectId");

                    b.Property<string>("ObjectType");

                    b.HasKey("Id");

                    b.ToTable("ObjectMedia");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.ObjectTag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<Guid>("ObjectId");

                    b.Property<string>("ObjectType");

                    b.Property<Guid>("TagId");

                    b.HasKey("Id");

                    b.ToTable("ObjectTag");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Page", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Page");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CategoryId");

                    b.Property<string>("Content");

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("PostType");

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId")
                        .IsUnique();

                    b.ToTable("Post");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Slug");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Seo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CategoryId");

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<Guid>("ObjectId");

                    b.Property<string>("ObjectType");

                    b.Property<Guid?>("PostId");

                    b.Property<string>("SeoDescription");

                    b.Property<string>("SeoKeys");

                    b.Property<string>("SeoTitle");

                    b.Property<string>("Slug");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId")
                        .IsUnique();

                    b.HasIndex("PostId")
                        .IsUnique();

                    b.ToTable("Seo");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Setting", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AutoLoad");

                    b.Property<DateTime>("Created");

                    b.Property<string>("CustomValue");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name");

                    b.Property<string>("Type");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("Setting");
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

            modelBuilder.Entity("AppCore.Models.DBModel.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Name");

                    b.Property<string>("Slug");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FullName")
                        .IsRequired();

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Phone")
                        .IsRequired();

                    b.Property<string>("Token");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Post", b =>
                {
                    b.HasOne("AppCore.Models.DBModel.Category", "Category")
                        .WithOne()
                        .HasForeignKey("AppCore.Models.DBModel.Post", "CategoryId")
                        .HasConstraintName("FK_Post_Category");
                });

            modelBuilder.Entity("AppCore.Models.DBModel.Seo", b =>
                {
                    b.HasOne("AppCore.Models.DBModel.Category")
                        .WithOne("Seo")
                        .HasForeignKey("AppCore.Models.DBModel.Seo", "CategoryId")
                        .HasConstraintName("FK_Category_Seo");

                    b.HasOne("AppCore.Models.DBModel.Post")
                        .WithOne("Seo")
                        .HasForeignKey("AppCore.Models.DBModel.Seo", "PostId")
                        .HasConstraintName("FK_Post_Seo");
                });
#pragma warning restore 612, 618
        }
    }
}
