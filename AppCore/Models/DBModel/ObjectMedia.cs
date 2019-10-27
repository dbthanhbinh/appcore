namespace AppCore.Models.DBModel
{
    public class ObjectMedia : DbEntity
    {
        public long ObjectId { get; set; }
        public long MediaId { get; set; }
        public string ObjectType { get; set; }
    }
}
