using System;

namespace Market.Models
{
    public class Search
    {
        public string otdel { get; set; }
        public string product { get; set; }
        public string employee { get; set; }
        public DateTime? start { get; set; }
        public DateTime? end { get; set; }
    }
}