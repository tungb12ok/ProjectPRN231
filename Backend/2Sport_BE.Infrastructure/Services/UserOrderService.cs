using _2Sport_BE.Repository.Interfaces;
using _2Sport_BE.Repository.Models;
using _2Sport_BE.Service.Dtos;
using Microsoft.Extensions.Configuration;
using System.Security.Principal;
using _2Sport_BE.Service;
using System.Security.Claims;
namespace _2Sport_BE.Service.Services
{

    public interface IUserOrderService
    {
        public List<UserOrderDto> GetUserOrders(int userId);
    }

    public class UserOrderService : IUserOrderService
    {
        private readonly TwoSportDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public UserOrderService(TwoSportDBContext context, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _context = context;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
        }

        public List<UserOrderDto> GetUserOrders(int userId)
        {

            var orders = _context.Orders
               .Where(o => o.UserId == userId)
               .Select(o => new UserOrderDto
               {
                   OrderId = o.Id,
                   TotalPrice = o.TotalPrice,
                   Products = o.OrderDetails.Select(od => new ProductInOrderDto
                   {
                       ProductId = od.ProductId ?? 0,
                       ProductName = od.Product.ProductName,
                       Quantity = od.Quantity ?? 0,
                       Price = od.Price ?? 0M,
                       Size = od.Product.Size,
                       Description = od.Product.Description,
                       Color = od.Product.Color,
                       Offers = od.Product.Offers,
                       MainImageName = od.Product.MainImageName,
                       MainImagePath = od.Product.MainImagePath
                   }).ToList()
               })
               .ToList();
            return orders;
        }
    }
}
