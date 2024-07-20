

using HightSportShopWebAPI.Repository.Implements;
using HightSportShopBusiness.Interfaces;
using HightSportShopBusiness.Models;
using HightSportShopBusiness.Services;
using HightSportShopWebAPI.Services;
using Microsoft.EntityFrameworkCore;
using HightSportShopBusiness.Service.Services;

namespace HightSportShopWebAPI.Extensions
{
    public static class ServiceCollection
    {
        public static void Register (this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<TwoSportDBContext>(options => options
            .UseSqlServer(GetConnectionStrings()));
            services.AddScoped<IUserService, UserService>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<IBrandService, BrandService>();
            services.AddScoped<IRefreshTokenService, RefreshTokenService>();
            services.AddTransient<ISendMailService, MailService>();
            services.AddScoped<ISportService, SportService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<ICartItemService, CartItemService>();
            services.AddScoped<IShipmentDetailService, ShipmentDetailService>();
            services.AddScoped<IPaymentMethodService, PaymentMethodService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderDetailService, OrderDetailService>();
            services.AddScoped<IPaymentService, PaymentService>();
			services.AddScoped<ILikeService, LikeService>();
			services.AddScoped<IReviewService, ReviewService>();
			services.AddScoped<ISupplierService, SupplierService>();
			services.AddScoped<IImportHistoryService, ImportHistoryService>();
			services.AddScoped<IWarehouseService, WarehouseService>();
			services.AddScoped<IDashboardService, DashboardService>();
			services.AddScoped<IUserOrderService, UserOrderService>();
        }

        private static string GetConnectionStrings()
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            var strConn = config["ConnectionStrings:DefaultConnection"];
            return strConn; 
        }
    }
}
