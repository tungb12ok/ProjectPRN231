using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopBusiness.Dtos
{
    public class DashboardDto
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set;}
        public decimal? TotalRevenue {get; set;}
        public int? TotalOrder { get; set;}
        public int? TotalUser {  get; set;}
        public List<OrderDto> Orders { get; set; }
        public DashboardDto() { }
    }
   

}
