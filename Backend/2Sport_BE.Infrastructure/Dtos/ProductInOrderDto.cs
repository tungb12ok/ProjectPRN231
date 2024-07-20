using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopBusiness.Dtos
{
    public class ProductInOrderDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public string? Size { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }
        public string? Offers { get; set; }
        public string? MainImageName { get; set; }
        public string? MainImagePath { get; set; }
    }
}
