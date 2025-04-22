using Dapper;
using Npgsql;
using steadyrainapi.Interfaces;
using steadyrainapi.Models;

namespace steadyrainapi.Data
{
    public class SchoolRepository : ISchoolRepository
    {
        private string _getOneByIdSql = "select * from school where id = {0}";
        private string _getAllSql = "select * from school";
        private string _deleteSql = "delete from school where id = {0}";

        private string _updateSql = "update school set name = \"{0}\", address1 = \'{1}\',address2 = \'{2}\',city = \'{3}\',state = \'{4}\',zipcode = \'{5}\'";
        private string _addSql = "insert into school (name,address1,address2,city,state,zipcode) values ( \'{0}\',\'{1}\',\'{2}\',\'{3}\',\'{4}\',\'{5}\')";


        private NpgsqlConnection _connection;

        public SchoolRepository(IConfiguration config) => _connection = new NpgsqlConnection(config["Database:ConnectionString"]);
        
        public School GetOne(int id) => _connection.QuerySingle<School>(string.Format(_getOneByIdSql, id));
        
        public IEnumerable<School> GetAll() => _connection.Query<School>(_getAllSql);

        public void Add(School school) => _connection.Query(
            string.Format(
                _addSql,
                    school.Name,
                    school.Address1, 
                    school.Address2 == "" ? null : school.Address2, 
                    school.City,
                    school.State, 
                    school.ZipCode));
        

        public void Update(School school) =>
            _connection.QuerySingle(
                string.Format(
                    _updateSql, school.Name, school.Address1, school.Address2, school.City, school.State, school.ZipCode));


        public void Delete(int id) =>  _connection.Query(string.Format(_deleteSql, id));
        
    }
}
