﻿
namespace HightSportShopWebAPI.ViewModels
{
    public class WarehouseDTO
    {
        public int? Quantity { get; set; }
    }
    public class WarehouseVM : WarehouseDTO
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
    }

    public class WarehouseCM : WarehouseDTO
    {
        public int? ProductId { get; set; }
    }

    public class WarehouseUM : WarehouseDTO
    {
        public int? ProductId { get; set; }

    }
}
