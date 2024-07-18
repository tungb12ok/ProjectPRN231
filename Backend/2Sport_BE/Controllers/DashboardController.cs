using _2Sport_BE.Service.Services;
using Microsoft.AspNetCore.Components.RenderTree;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _2Sport_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }

        [HttpGet("TotalOrder")]
        public IActionResult GetOrder(DateTime startDate, DateTime endDate)
        {
            return Ok(dashboardService.GetTotalOrder(startDate, endDate));
        }

        [HttpGet("TotalRevenue")]
        public IActionResult GetRevenue(DateTime startDate, DateTime endDate)
        {
            return Ok(dashboardService.GetTotalRevenue(startDate, endDate));
        }

        [HttpGet("ListOrder")]
        public IActionResult GetListOrder(DateTime startDate, DateTime endDate)
        {
            return Ok(dashboardService.GetListOrder( startDate, endDate));
        }

    }
}
