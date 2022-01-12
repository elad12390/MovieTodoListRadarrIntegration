using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieTodo.Entities.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MovieTodos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RadarrId = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 250, nullable: false),
                    OverView = table.Column<string>(type: "TEXT", nullable: false),
                    MovieSpan = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    IsWatched = table.Column<bool>(type: "INTEGER", nullable: false),
                    ImageSrc = table.Column<string>(type: "TEXT", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieTodos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieTodos");
        }
    }
}
