using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopBusiness.Dtos
{
    public class UserOrderDto
    {
        public int OrderId { get; set; }
        public List<ProductInOrderDto> Products { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public String Status { get; set; }
        
        
    }
}
