using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using steadyrainapi.Interfaces;
using steadyrainapi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace steadyrainapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private IStudentsRepository _studentsRepository;
        public StudentsController(IStudentsRepository studentsRepository )=> _studentsRepository = studentsRepository;
        
        // GET: api/<StudentsController>
        [HttpGet]
        public IEnumerable<Student> Get() => _studentsRepository.GetAll();

        // GET api/<StudentsController>/5
        [HttpGet("{id}")]
        public Student Get(int id) => _studentsRepository.GetOne(id);

        // POST api/<StudentsController>
        [HttpPost]
        public void Post([FromBody] Student student) => _studentsRepository.Add(student!);
        

        // PUT api/<StudentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Student value) =>  _studentsRepository.Update(value!);
        

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id) => _studentsRepository.Delete(id);
        
    }
}
