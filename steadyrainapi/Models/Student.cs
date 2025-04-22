namespace steadyrainapi.Models
{
    public class Student
    {
        public int Id { get; set; }
        public int SchoolId { get; set; }
        public string Major { get; set; } = string.Empty;
        public DateTime DateModified { get; set; } = DateTime.Now;
        public bool IsActive { get; set; }
        public string SchoolName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{LastName},{FirstName}";
    }
}
