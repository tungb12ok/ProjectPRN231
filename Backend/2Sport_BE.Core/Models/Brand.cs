﻿using System;
using System.Collections.Generic;

namespace HightSportShopBusiness.Models
{
    public partial class Brand
    {
        public Brand()
        {
            BrandCategories = new HashSet<BrandCategory>();
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string? BrandName { get; set; }
        public string? Logo { get; set; }
        public int? Quantity { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<BrandCategory> BrandCategories { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
