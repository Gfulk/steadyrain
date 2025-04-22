using Microsoft.AspNetCore.Mvc;
using steadyrainapi.Interfaces;
using steadyrainapi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace steadyrainapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepository;

        public SchoolController(ISchoolRepository schoolRepository) => _schoolRepository = schoolRepository;
        

        // GET: api/<SchoolController>
        [HttpGet]
        public IEnumerable<School> Get() => _schoolRepository.GetAll();
        

        // GET api/<SchoolController>/5
        [HttpGet("{id}")]
        public School Get(int id) => _schoolRepository.GetOne(id);

        // POST api/<SchoolController>
        [HttpPost]
        public void Post([FromBody] School value) => _schoolRepository.Add(value);

        // PUT api/<SchoolController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] School value) => _schoolRepository.Update(value);

        // DELETE api/<SchoolController>/5
        [HttpDelete("{id}")]
        public void Delete(int id) => _schoolRepository.Delete(id);
    }
}
