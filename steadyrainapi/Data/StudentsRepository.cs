using Dapper;
using Npgsql;
using steadyrainapi.Interfaces;
using steadyrainapi.Models;

namespace steadyrainapi.Data
{
    public class StudentsRepository : IStudentsRepository
    {
        private string _getOneByIdSql = "select 1 from students where Id = {0}";
        private string _getAllSql = "select * from students";
        private string _deleteSql = "delete from students where Id = {0}";
        private string _updateSql = "update students set FirstName = \'{0}\', LastName = \'{1}\',Major = \'{2}\',SchoolId = \'{3}\',SchoolName = \'{4}\', IsActive = \'{5}\', DateModified = \'{6}\' where Id = {8}";
        private string _addSql = "insert into students ( FirstName , LastName , Major , SchoolId , SchoolName , IsActive , DateModified ) values ( \'{0}\' , \'{1}\' , \'{2}\', {3} , \'{4}\' , {5} ,\'{6} \')";

        private NpgsqlConnection _connection;

        public StudentsRepository(IConfiguration config)
        {
            _connection = new NpgsqlConnection(config["Database:ConnectionString"]);
        }

        public Student GetOne(int id)
        {
            var sql = string.Format(_getOneByIdSql, id);
            return _connection.QuerySingle<Student>(sql);
        }
        public IEnumerable<Student> GetAll() => _connection.Query<Student>(_getAllSql);
        
        public void Add(Student student)
        {
            try
            {
                var sql = string.Format(_addSql, student.FirstName, student.LastName, student.Major, student.SchoolId, student.SchoolName, student.IsActive, student.DateModified.ToShortDateString());
                _connection.Query(sql);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Update(Student student) =>
            _connection.QuerySingle(
                string.Format(
                    _updateSql, 
                    student.FirstName, 
                    student.LastName,
                    student.Major,
                    student.SchoolId,
                    student.SchoolName,
                    student.IsActive,
                    student.DateModified.ToShortDateString())
                );
        

        public void Delete(int id)
        {
            var sql = string.Format(_deleteSql, id);
            _connection.Query(sql);
        }
    }
}
