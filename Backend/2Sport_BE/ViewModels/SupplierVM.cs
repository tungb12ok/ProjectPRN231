﻿
namespace HightSportShopWebAPI.ViewModels
{
    public class SupplierDTO
    {
        public string SupplierName { get; set; }
        public string Location { get; set; }
    }
    public class SupplierVM : SupplierDTO
    {
        public int Id { get; set; }
    }

	public class SupplierCM : SupplierDTO
    {
    }

    public class SupplierUM : SupplierDTO
    {
    }

}
