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
    public class porosiaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public porosiaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT produktiID, sasia, perdoruesiID, dataOra FROM porosia";
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
        public JsonResult Post(porosia porosia)
        {
            string query = @"INSERT INTO porosia ( sasia, perdoruesiID, dataOra) 
                             VALUES ( @sasia, @perdoruesiID, @dataOra)";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    //myCommand.Parameters.AddWithValue("@produktiID", porosia.produktiID);
                    myCommand.Parameters.AddWithValue("@sasia", porosia.sasia);
                    myCommand.Parameters.AddWithValue("@perdoruesiID", porosia.perdoruesiID);
                    myCommand.Parameters.AddWithValue("@dataOra", DateTime.UtcNow);
                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(porosia porosia)
        {
            string query = @"UPDATE porosia
                             SET produktiID = @produktiID,
                                 sasia = @sasia,
                                 perdoruesiID = @perdoruesiID,
                                 dataOra = @dataOra
                             WHERE produktiID = @produktiID";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@produktiID", porosia.produktiID);
                    myCommand.Parameters.AddWithValue("@sasia", porosia.sasia);
                    myCommand.Parameters.AddWithValue("@perdoruesiID", porosia.perdoruesiID);
                    myCommand.Parameters.AddWithValue("@dataOra", porosia.dataOra);
                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Data updated successfully!");
        }

        [HttpDelete("{ID}")]
        public JsonResult Delete(int ID)
        {
            string query = @"DELETE FROM porosia WHERE produktiID = @produktiID";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@produktiID", ID);

                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Data deleted successfully!");
        }

    }
}
