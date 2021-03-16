using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InterCityWebAPI.Migrations
{
    public partial class SqlDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    CityName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    BusStop = table.Column<string>(type: "nvarchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.CityName);
                });

            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    RouteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromCityName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ToCityName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    DepartureDate = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    DepartureTime = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ArrivalTime = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    StandardPrice = table.Column<float>(type: "real", nullable: false),
                    FlexiPrice = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routes", x => x.RouteId);
                    table.ForeignKey(
                        name: "FK_Routes_Cities_FromCityName",
                        column: x => x.FromCityName,
                        principalTable: "Cities",
                        principalColumn: "CityName",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Routes_Cities_ToCityName",
                        column: x => x.ToCityName,
                        principalTable: "Cities",
                        principalColumn: "CityName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    ReferenceNumber = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    EmailAddress = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    NoOfPassengers = table.Column<int>(type: "int", nullable: false),
                    FareType = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TotalCost = table.Column<float>(type: "real", nullable: false),
                    RouteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.ReferenceNumber);
                    table.ForeignKey(
                        name: "FK_Bookings_Routes_RouteId",
                        column: x => x.RouteId,
                        principalTable: "Routes",
                        principalColumn: "RouteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_RouteId",
                table: "Bookings",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_FromCityName",
                table: "Routes",
                column: "FromCityName");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_ToCityName",
                table: "Routes",
                column: "ToCityName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Routes");

            migrationBuilder.DropTable(
                name: "Cities");
        }
    }
}
