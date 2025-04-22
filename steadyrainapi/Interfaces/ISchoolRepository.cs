using steadyrainapi.Models;

namespace steadyrainapi.Interfaces
{
    public interface ISchoolRepository
    {
        void Add(School school);
        void Delete(int id);
        IEnumerable<School> GetAll();
        School GetOne(int id);
        void Update(School school);
    }
}
