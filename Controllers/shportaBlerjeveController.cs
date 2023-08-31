using FooderApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;


namespace FooderApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class shportaBlerjeveController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public shportaBlerjeveController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT produktiID, sasia, perdoruesiID FROM shportaBlerjeve";
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
        public JsonResult Post(shportaBlerjeve shportaBlerjeve)
        {
            string query = @"INSERT INTO shportaBlerjeve (sasia, perdoruesiID) 
                     VALUES (@sasia, @perdoruesiID)";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@sasia", shportaBlerjeve.sasia);
                    myCommand.Parameters.AddWithValue("@perdoruesiID", shportaBlerjeve.perdoruesiID);
                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Added Successfully!");
        }

    [HttpPut]
        public JsonResult put(shportaBlerjeve shportaBlerjeve)
        {
            string query = @"UPDATE shportaBlerjeve
                             SET sasia = @sasia
                             WHERE perdoruesiID = @perdoruesiID";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                  //myCommand.Parameters.AddWithValue("@produktiID", shportaBlerjeve.produktiID);
                    myCommand.Parameters.AddWithValue("@sasia", shportaBlerjeve.sasia);
                    myCommand.Parameters.AddWithValue("@perdoruesiID", shportaBlerjeve.perdoruesiID);
                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Data updated successfully!");
        }

        [HttpDelete("{ID}")]
        public JsonResult delete(int ID)
        {
            string query = @"DELETE FROM shportaBlerjeve WHERE perdoruesiID = @perdoruesiID";

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
            return new JsonResult("Data deleted successfully!");
        }

    }
}

