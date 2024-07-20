using HightSportShopBusiness.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace HightSportShopWebAPI.Controllers
{
    [ApiController]
    [Route("api/mbbank")]
    public class TransactionsController : ControllerBase
    {
        protected string username = "0972074620";
        protected string password = "Tungld123@123";
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly TwoSportDBContext _context; // Add database context here


        public TransactionsController(IHttpClientFactory httpClientFactory, TwoSportDBContext context)
        {
            _httpClientFactory = httpClientFactory;
            _context = context;
        }


        [HttpGet("checkAmountAndUpdateOrder/{orderId}")]
        public async Task<IActionResult> CheckAmountAndUpdateOrder(int orderId)
        {
            try
            {
                var accessToken = await LoginAsync(username, password);

                var json = await GetDataAsync(accessToken);

                if (json == null)
                {
                    return BadRequest("Failed to retrieve data from external API.");
                }

                var transactionResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<TransactionResponse>(json);

                if (transactionResponse == null || transactionResponse.transactionInfos == null)
                {
                    return BadRequest("Invalid data format from external API.");
                }

                var order = await _context.Orders.FindAsync(orderId);
                if (order == null)
                {
                    return NotFound($"Order with ID {orderId} not found.");
                }

                bool orderUpdated = false;

                foreach (var transaction in transactionResponse.transactionInfos)
                {
                    if (transaction.description.Contains(order.Description) && Convert.ToDecimal(transaction.amount) == order.TotalPrice)
                    {
                        order.Status = 1;
                        _context.Orders.Update(order);
                        orderUpdated = true;
                        break; 
                    }
                }

                if (!orderUpdated)
                {
                    return BadRequest("No matching transaction found for the order.");
                }

                await _context.SaveChangesAsync(); 

                return Ok(new {message="Order status updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error checking transactions: {ex.Message}");
            }
        }





        [HttpGet("checkTransactions")]
        public async Task<IActionResult> CheckTransactions()
        {
            try
            {
                // The rest of your code remains unchanged
                var accessToken = await LoginAsync(username, password);

                var json = await GetDataAsync(accessToken);
                return Ok(json);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error checking transactions: {ex.Message}");
            }
        }

        static async Task<string> LoginAsync(string username, string password)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    string loginEndpoint = "https://ebank.tpb.vn/gateway/api/auth/login";

                    var loginData = new
                    {
                        username = username,
                        password = password,
                        step_2FA = "VERIFY"
                    };

                    string jsonLoginData = Newtonsoft.Json.JsonConvert.SerializeObject(loginData);

                    StringContent content = new StringContent(jsonLoginData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(loginEndpoint, content);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();

                        // Extract the access token from the response
                        var tokenResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<TokenResponse>(responseData);
                        var accessToken = tokenResponse?.access_token;

                        return accessToken;
                    }
                    else
                    {
                        Console.WriteLine("Login failed. Status Code: " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred during login: " + ex.Message);
            }
            return null;
        }

        static async Task<string> GetDataAsync(string accessToken)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    string dataEndpoint = "https://ebank.tpb.vn/gateway/api/smart-search-presentation-service/v2/account-transactions/find";
                    // Get the current date and format it as "yyyyMMdd"
                    string currentDate = DateTime.Now.ToString("yyyyMMdd");
                    var dataAccept = new
                    {
                        accountNo = "84802082002",
                        currency = "VND",
                        fromDate = "20231106",
                        keyword = "",
                        maxAcentrysrno = "",
                        pageNumber = 1,
                        pageSize = 400,
                        toDate = currentDate
                    };

                    // Set authorization header
                    client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);

                    // Serialize request data to JSON
                    string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(dataAccept);

                    // Create StringContent with JSON data
                    StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                    // Send a POST request to the data endpoint
                    HttpResponseMessage response = await client.PostAsync(dataEndpoint, content);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();
                        return responseData;
                    }
                    else
                    {
                        Console.WriteLine("Data retrieval failed. Status Code: " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred during data retrieval: " + ex.Message);
            }
            return null;
        }
    }
}
public class TokenResponse
{
    public string access_token { get; set; }
}

public class TransactionResponse
{
    public string totalRows { get; set; }
    public string maxAcentrysmo { get; set; }
    public List<TransactionInfo> transactionInfos { get; set; }
}

public class TransactionInfo
{
    public string id { get; set; }
    public string description { get; set; }

    public string amount { get; set; }

}