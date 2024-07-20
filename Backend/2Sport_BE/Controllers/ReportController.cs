
using AutoMapper;
using HightSportShopBusiness.Enums;
using HightSportShopBusiness.Services;
using HightSportShopWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HightSportShopWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUserService _userService;
        private readonly IOrderDetailService _orderDetailService;
        private readonly IMapper _mapper;

        public ReportController(IOrderService orderService, IUserService userService, IOrderDetailService orderDetailService, IMapper mapper)
        {
            _orderService = orderService;
            _userService = userService;
            _orderDetailService = orderDetailService;
            _mapper = mapper;
        }

        [HttpGet("export-orders")]
        public async Task<IActionResult> ExportOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            var orderList = orders.ToList();
            var orderDetailsList = new List<OrderDetailDTO>();

            foreach (var order in orderList)
            {
                var details = await _orderDetailService.GetOrderDetailByOrderIdAsync(order.Id);
                foreach (var detail in details)
                {
                    orderDetailsList.Add(new OrderDetailDTO
                    {
                        Id = detail.Id,
                        OrderCode = detail.Order.OrderCode,
                        ProductId = detail.ProductId,
                        ProductName = detail.Product.ProductName,
                        Quantity = detail.Quantity,
                        Price = detail.Price
                    });
                }
            }

            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets.Add("Đơn Hàng");
                worksheet.Cells["A1"].Value = "Mã Đơn Hàng";
                worksheet.Cells["B1"].Value = "Tên Khách Hàng";
                worksheet.Cells["C1"].Value = "Địa Chỉ";
                worksheet.Cells["D1"].Value = "Số Điện Thoại";
                worksheet.Cells["E1"].Value = "Ngày Tạo";
                worksheet.Cells["F1"].Value = "Tổng Tiền";
                worksheet.Cells["G1"].Value = "Trạng Thái";

                for (int i = 0; i < orderList.Count; i++)
                {
                    var user = await _userService.FindAsync((int)orderList[i].UserId);
                    worksheet.Cells[i + 2, 1].Value = orderList[i].OrderCode;
                    worksheet.Cells[i + 2, 2].Value = user?.FullName;
                    worksheet.Cells[i + 2, 3].Value = user?.Address;
                    worksheet.Cells[i + 2, 4].Value = user?.Phone;
                    worksheet.Cells[i + 2, 5].Value = orderList[i].ReceivedDate.HasValue ? orderList[i].ReceivedDate.Value.ToString("dd/MM/yyyy") : null;
                    worksheet.Cells[i + 2, 6].Value = orderList[i].IntoMoney.ToString();
                    worksheet.Cells[i + 2, 7].Value = Enum.GetName(typeof(OrderStatus), orderList[i].Status)?.Replace('_', ' ');
                }

                var detailSheet = package.Workbook.Worksheets.Add("Chi Tiết Đơn Hàng");
                detailSheet.Cells["A1"].Value = "Mã Đơn Hàng";
                detailSheet.Cells["B1"].Value = "Mã Sản Phẩm";
                detailSheet.Cells["C1"].Value = "Tên Sản Phẩm";
                detailSheet.Cells["D1"].Value = "Số Lượng";
                detailSheet.Cells["E1"].Value = "Giá";

                for (int i = 0; i < orderDetailsList.Count; i++)
                {
                    detailSheet.Cells[i + 2, 1].Value = orderDetailsList[i].OrderCode;
                    detailSheet.Cells[i + 2, 2].Value = orderDetailsList[i].ProductId;
                    detailSheet.Cells[i + 2, 3].Value = orderDetailsList[i].ProductName;
                    detailSheet.Cells[i + 2, 4].Value = orderDetailsList[i].Quantity;
                    detailSheet.Cells[i + 2, 5].Value = orderDetailsList[i].Price;
                }

                // Set the width of the columns to 20
                for (int col = 1; col <= 7; col++)
                {
                    worksheet.Column(col).Width = 20;
                }
                for (int col = 1; col <= 5; col++)
                {
                    detailSheet.Column(col).Width = 20;
                }

                package.Save();
            }

            stream.Position = 0;
            var fileName = $"DonHang_{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }
}
