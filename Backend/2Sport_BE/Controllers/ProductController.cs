using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg.OpenPgp;
using HightSportShopBusiness.Services;
using HightSportShopBusiness.Interfaces;
using HightSportShopBusiness.Models;
using HightSportShopWebAPI.ViewModels;
using HightSportShopBusiness.Service.Services;
using HightSportShopWebAPI.Helpers;

namespace HightSportShopBusiness.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IBrandService _brandService;
        private readonly ICategoryService _categoryService;
        private readonly ISportService _sportService;
        private readonly ILikeService _likeService;
        private readonly IReviewService _reviewService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWarehouseService _warehouseService;

        public ProductController(IProductService productService,
            IBrandService brandService,
            ICategoryService categoryService,
            IUnitOfWork unitOfWork,
            ISportService sportService,
            ILikeService likeService,
            IReviewService reviewService,
            IMapper mapper)
        {
            _productService = productService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _brandService = brandService;
            _categoryService = categoryService;
            _sportService = sportService;
            _likeService = likeService;
            _reviewService = reviewService;
        }

        [HttpGet]
        [Route("get-product/{productId}")]
        public async Task<IActionResult> GetProductById(int productId)
        {
            try
            {
                var product = await _productService.GetProductById(productId);
                var productVM = _mapper.Map<ProductVM>(product);
                var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                productVM.Reviews = reviews.ToList();
                var numOfLikes = await _likeService.CountLikeOfProduct(productId);
                productVM.Likes = numOfLikes;
                return Ok(productVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("list-products")]
        public async Task<IActionResult> GetProducts([FromQuery] DefaultSearch defaultSearch)
        {
            try
            {
              
                var query = await _productService.GetProducts(_ =>
                        _.ProductName.ToLower().Contains("") &&
                        _.Status == true,
                    "",
                    defaultSearch.currentPage,
                    defaultSearch.perPage
                );

                var products = query.ToList();
                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;
                    //var warehouse = await _warehouseService.GetWarehouseByProductId(product.Id);
                    //product.WarehouseQuantity = warehouse.FirstOrDefault()?.Quantity ?? 0;
                }

                var result = query.Sort(defaultSearch.sortBy, defaultSearch.isAscending)
                    .Select(_ => _mapper.Map<Product, ProductVM>(_))
                    .ToList();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                return Ok(new { total = result.Count, data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("ListProductByAdmin")]
        public async Task<IActionResult> GetProductsByAdmin([FromQuery] DefaultSearch defaultSearch)
        {
            try
            {
                var query = await _productService.GetProducts(
                    null,
                    null,
                    "",
                    defaultSearch.currentPage,
                    defaultSearch.perPage
                );

                var products = query.ToList();

                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;
                }

                var result = products.Select(_ => _mapper.Map<Product, ProductVM>(_)).ToList();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                return Ok(new { total = products.Count(), data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        [Route("filter-sort-products")]
        public async Task<IActionResult> FilterSortProducts([FromQuery] DefaultSearch defaultSearch, string? size,
            decimal minPrice, decimal maxPrice,
            int sportId, int brandId, int categoryId, int classificationId)
        {
            try
            {
                var query = await _productService.GetProducts(_ => _.Status == true, "", defaultSearch.currentPage,
                    defaultSearch.perPage);
                if (sportId != 0)
                {
                    query = query.Where(_ => _.SportId == sportId);
                }

                if (brandId != 0)
                {
                    query = query.Where(_ => _.BrandId == brandId);
                }

                if (categoryId != 0)
                {
                    query = query.Where(_ => _.CategoryId == categoryId);
                }

                if (classificationId != 0)
                {
                    query = query.Where(_ => _.ClassificationId == classificationId);
                }

                if (!String.IsNullOrEmpty(size))
                {
                    query = query.Where(_ =>
                        _.Size.ToLower().Equals(size.ToLower()) || _.Size.ToLower().Equals("free"));
                }

                if (minPrice >= 0 && maxPrice > 0)
                {
                    if (minPrice < maxPrice)
                    {
                        query = query.Where(_ => _.Price >= minPrice && _.Price <= maxPrice);
                    }
                    else
                    {
                        return BadRequest("Invalid query!");
                    }
                }

                var products = query.ToList();
                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;
                }

                var result = query.Sort(defaultSearch.sortBy, defaultSearch.isAscending)
                    .Select(_ => _mapper.Map<Product, ProductVM>(_))
                    .ToList();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                return Ok(new { total = result.Count, data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("filter-sort-products-manager")]
        public async Task<IActionResult> FilterSortProductsManager([FromQuery] DefaultSearch defaultSearch,
            string? size, decimal minPrice, decimal maxPrice,
            int sportId, int brandId, int categoryId, int classificationId)
        {
            try
            {
                var query = await _productService.GetProducts(null, "", defaultSearch.currentPage,
                    defaultSearch.perPage);
                if (sportId != 0)
                {
                    query = query.Where(_ => _.SportId == sportId);
                }

                if (brandId != 0)
                {
                    query = query.Where(_ => _.BrandId == brandId);
                }

                if (categoryId != 0)
                {
                    query = query.Where(_ => _.CategoryId == categoryId);
                }

                if (classificationId != 0)
                {
                    query = query.Where(_ => _.ClassificationId == classificationId);
                }

                if (!String.IsNullOrEmpty(size))
                {
                    query = query.Where(_ =>
                        _.Size.ToLower().Equals(size.ToLower()) || _.Size.ToLower().Equals("free"));
                }

                if (minPrice >= 0 && maxPrice > 0)
                {
                    if (minPrice < maxPrice)
                    {
                        query = query.Where(_ => _.Price >= minPrice && _.Price <= maxPrice);
                    }
                    else
                    {
                        return BadRequest("Invalid query!");
                    }
                }

                var products = query.ToList();
                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;

                }

                var result = query.Sort(defaultSearch.sortBy, defaultSearch.isAscending)
                    .Select(_ => _mapper.Map<Product, ProductVM>(_))
                    .ToList();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                return Ok(new { total = result.Count, data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("sort-products-by-like")]
        public async Task<IActionResult> SortProductsByLike([FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
            try
            {
                var query = await _productService.GetProducts(_ => _.Status == true, "", pageIndex, pageSize);
                var products = query.ToList();
                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;

                }

                var result = query.Select(_ => _mapper.Map<Product, ProductVM>(_)).ToList().AsQueryable();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                var finalResult = result.Sort("likes", false).ToList();

                return Ok(new { total = finalResult.Count, data = finalResult });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        [Route("search-products")]
        public async Task<IActionResult> SearchProducts([FromQuery] string keywords,
            [FromQuery] DefaultSearch defaultSearch)
        {
            try
            {
                var query = await _productService.GetProducts(_ => _.Status == true &&
                                                                   (_.ProductName.ToLower()
                                                                        .Contains(keywords.ToLower()) ||
                                                                    _.ProductCode.ToLower()
                                                                        .Contains(keywords.ToLower()))
                    , "", defaultSearch.currentPage, defaultSearch.perPage);

                var products = query.ToList();
                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;
                }

                var result = query.Sort(defaultSearch.sortBy, defaultSearch.isAscending)
                    .Select(_ => _mapper.Map<Product, ProductVM>(_))
                    .ToList();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                return Ok(new { total = result.Count, data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        [Route("SearchProductsByAdmin")]
        public async Task<IActionResult> SearchProductsByAdmin([FromQuery] string? keywords,
            [FromQuery] DefaultSearch defaultSearch)
        {
            try
            {
                if (keywords == null)
                {
                    keywords = "";
                }
                var query = await _productService.GetProducts(_ =>
                        _.ProductName.ToLower().Contains(keywords.ToLower()) ||
                        _.ProductCode.ToLower().Contains(keywords.ToLower()),
                    "",
                    defaultSearch.currentPage,
                    defaultSearch.perPage
                );

                var products = query.ToList();
                foreach (var product in products)
                {
                    var brand = await _brandService.GetBrandById(product.BrandId);
                    product.Brand = brand.FirstOrDefault();
                    var category = await _categoryService.GetCategoryById(product.CategoryId);
                    product.Category = category;
                    var sport = await _sportService.GetSportById(product.SportId);
                    product.Sport = sport;
                    var classification = await _unitOfWork.ClassificationRepository.FindAsync(product.ClassificationId);
                    product.Classification = classification;
                    //var warehouse = await _warehouseService.GetWarehouseByProductId(product.Id);
                    //product.WarehouseQuantity = warehouse.FirstOrDefault()?.Quantity ?? 0;
                }

                var result = query.Sort(defaultSearch.sortBy, defaultSearch.isAscending)
                    .Select(_ => _mapper.Map<Product, ProductVM>(_))
                    .ToList();

                foreach (var product in result)
                {
                    var reviews = await _reviewService.GetReviewsOfProduct(product.Id);
                    product.Reviews = reviews.ToList();
                    var numOfLikes = await _likeService.CountLikeOfProduct(product.Id);
                    product.Likes = numOfLikes;
                }

                return Ok(new { total = result.Count, data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [Route("update-product/{productId}")]
        public async Task<IActionResult> UpdateProduct(int productId, ProductUM productUM)
        {
            try
            {
                var updatedProduct = await _productService.GetProductById(productId);
                if (updatedProduct != null)
                {
                    updatedProduct.ProductName = productUM.ProductName;
                    updatedProduct.ListedPrice = productUM.ListedPrice;
                    updatedProduct.Price = productUM.Price;
                    updatedProduct.Size = productUM.Size;
                    updatedProduct.Description = productUM.Description;
                    updatedProduct.Status = productUM.Status;
                    updatedProduct.Color = productUM.Color;
                    updatedProduct.Offers = productUM.Offers;
                    updatedProduct.MainImageName = productUM.MainImageName;
                    updatedProduct.MainImagePath = productUM.MainImagePath;
                    updatedProduct.CategoryId = productUM.CategoryId;
                    updatedProduct.BrandId = productUM.BrandId;
                    updatedProduct.SportId = productUM.SportId;
                    updatedProduct.ClassificationId = productUM.ClassificationId;
                    await _productService.UpdateProduct(updatedProduct);
                    return Ok(updatedProduct);
                }
                else
                {
                    return BadRequest("Update failed!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("add-product-list")]
        public async Task<IActionResult> AddProductList(ProductCM productList)
        {
            try
            {
                var addedProducts = _mapper.Map<Product>(productList);
                await _productService.AddProduct(addedProducts);
                return Ok("Add products successfully!");

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpPost]
        [Route("update-product-status")]
        public async Task<IActionResult> UpdateStatusProduct(int id, bool status)
        {
            try
            {
                await _productService.UpateStatusProduct(id, status);
                return Ok("InActive product successfully!");

            }
        
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
