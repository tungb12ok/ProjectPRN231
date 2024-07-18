using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2Sport_BE.Service.Dtos
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public DateTime? Date { get; set; }
        public string CustomerName { get; set; }
        public int? Status { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
