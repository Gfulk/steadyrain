using steadyrainapi.Models;

namespace steadyrainapi.Interfaces
{
    public interface IStudentsRepository
    {
        void Add(Student student);
        void Delete(int id);
        IEnumerable<Student> GetAll();
        Student GetOne(int id);
        void Update(Student student);
    }
}