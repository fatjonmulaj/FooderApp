using FooderApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;


namespace FooderApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class perdoruesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public perdoruesiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT perdoruesiID, emriMbiemri, email, fjalekalimi, adresa, roli FROM perdoruesi";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(perdoruesi perdoruesi)
        {
            string query = @"INSERT INTO perdoruesi (emriMbiemri, email, fjalekalimi, adresa, roli) 
                     VALUES (@emriMbiemri, @email, @fjalekalimi, @adresa, @roli);
                     SELECT SCOPE_IDENTITY();";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@emriMbiemri", perdoruesi.emriMbiemri);
                    myCommand.Parameters.AddWithValue("@email", perdoruesi.email);
                    myCommand.Parameters.AddWithValue("@fjalekalimi", perdoruesi.fjalekalimi);
                    myCommand.Parameters.AddWithValue("@adresa", perdoruesi.adresa);
                    myCommand.Parameters.AddWithValue("@roli", perdoruesi.roli);

                    int newId = Convert.ToInt32(myCommand.ExecuteScalar());

                    perdoruesi.perdoruesiID = newId;
                }
            }
            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(perdoruesi perdoruesi)
        {
            string query = @"UPDATE perdoruesi
                             SET emriMbiemri = @emriMbiemri,
                                 email = @email,
                                 fjalekalimi = @fjalekalimi,
                                 adresa = @adresa,
                                 roli = @roli
                             WHERE perdoruesiID = @perdoruesiID";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@emriMbiemri", perdoruesi.emriMbiemri);
                    myCommand.Parameters.AddWithValue("@email", perdoruesi.email);
                    myCommand.Parameters.AddWithValue("@fjalekalimi", perdoruesi.fjalekalimi);
                    myCommand.Parameters.AddWithValue("@adresa", perdoruesi.adresa);
                    myCommand.Parameters.AddWithValue("@roli", perdoruesi.roli);
                    myCommand.Parameters.AddWithValue("@perdoruesiID", perdoruesi.perdoruesiID);

                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Data updated successfully!");
        }

        [HttpDelete("{ID}")]
        public JsonResult Delete(int ID)
        {
            string query = @"DELETE FROM perdoruesi WHERE perdoruesiID = @perdoruesiID";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@perdoruesiID", ID);

                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult ("Data deleted successfully!");
        }

    }
}
