using HightSportShopBusiness.Interfaces;
using HightSportShopBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopBusiness.Services
{
    public interface IOrderDetailService
    {
        Task<List<OrderDetail>> GetOrderDetailByOrderIdAsync(int orderId);
    }
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        public OrderDetailService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<OrderDetail>> GetOrderDetailByOrderIdAsync(int orderId)
        {
            var result = await _unitOfWork.OrderDetailRepository.GetAsync(_ => _.OrderId == orderId, "Product");
            return result.ToList();
        }
    }
}
