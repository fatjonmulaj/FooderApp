using FooderApp.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Reflection.Metadata.Ecma335;


namespace FooderApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class produktiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public produktiController(IConfiguration configuration, IWebHostEnvironment env)
        { 
                _configuration = configuration;
                _env = env;
            }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT produktiID, emri, pershkrimi, cmimi, sasia, fotopath, lloji FROM produkti";
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
        public JsonResult Post(produkti produkti)
        {
            string query = @"INSERT INTO produkti ( emri, pershkrimi, cmimi, sasia, fotopath, lloji) 
                             VALUES (@emri, @pershkrimi, @cmimi, @sasia, @fotopath, @lloji)";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@produktiID", produkti.produktiID);
                    myCommand.Parameters.AddWithValue("@emri", produkti.emri);
                    myCommand.Parameters.AddWithValue("@pershkrimi", produkti.pershkrimi);
                    myCommand.Parameters.AddWithValue("@cmimi", produkti.cmimi);
                    myCommand.Parameters.AddWithValue("@sasia", produkti.sasia);
                    myCommand.Parameters.AddWithValue("@fotopath", produkti.fotopath);
                    myCommand.Parameters.AddWithValue("@lloji", produkti.lloji);
                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(produkti produkti)
        {
            string query = @"UPDATE produkti
                             SET emri = @emri,
                                 pershkrimi = @pershkrimi,
                                 cmimi = @cmimi,
                                 sasia = @sasia,
                                 fotopath = @fotopath,
                                 lloji = @lloji
                             WHERE produktiID = @produktiID";

            string sqlDataSource = _configuration.GetConnectionString("FooderAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                  myCommand.Parameters.AddWithValue("@produktiID", produkti.produktiID);
                    myCommand.Parameters.AddWithValue("@emri", produkti.emri);
                    myCommand.Parameters.AddWithValue("@pershkrimi", produkti.pershkrimi);
                    myCommand.Parameters.AddWithValue("@cmimi", produkti.cmimi);
                    myCommand.Parameters.AddWithValue("@sasia", produkti.sasia);
                    myCommand.Parameters.AddWithValue("@fotopath", produkti.fotopath);
                    myCommand.Parameters.AddWithValue("@lloji", produkti.lloji);
                    myCommand.ExecuteNonQuery();
                }
            }
            return new JsonResult("Data updated successfully!");
        }

        [HttpDelete("{ID}")]
        public JsonResult Delete(int ID)
        {
            string query = @"DELETE FROM produkti WHERE produktiID = @produktiID";

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

        [Route("savefile")]
        [HttpPost]
        public JsonResult savefile()
        {
            try
            {
                var httprequest = Request.Form;
                var postedfile = httprequest.Files[0];
                string filename = postedfile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedfile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("Error");
            }
        }


    }
}








