﻿using HightSportShopBusiness.Interfaces;
using HightSportShopBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopBusiness.Services
{
    public interface IProductService
    {
        Task<IQueryable<Product>> GetAllProducts();
        Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null);

        Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null,
                                                    string includeProperties = "",
                                                    int? pageIndex = null, int? pageSize = null);

        Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null,
                                  Func<IQueryable<Product>, IOrderedQueryable<Product>> orderBy = null,
                                  string includeProperties = "",
                                  int? pageIndex = null,
                                  int? pageSize = null);

        Task<Product> GetProductById(int id);
        Task AddProducts(IEnumerable<Product> products);
        Task DeleteProductById(int id);
        Task UpateStatusProduct(int id, bool status);
        Task UpdateProduct(Product newProduct);
        Task AddProduct(Product addedProducts);
    }
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddProducts(IEnumerable<Product> products)
        {
            await _unitOfWork.ProductRepository.InsertRangeAsync(products);
        }

        public async Task DeleteProductById(int id)
        {
            await _unitOfWork.ProductRepository.DeleteAsync(id);
        }

        public async Task UpateStatusProduct(int id, bool status)
        {
            var productUpdate = await GetProductById(id);
            productUpdate.Status = status;
            await _unitOfWork.SaveChanges();
        }

        public async Task<IQueryable<Product>> GetAllProducts()
        {
            var query = await _unitOfWork.ProductRepository.GetAllAsync();
            return query.AsQueryable();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _unitOfWork.ProductRepository.FindAsync(id);
        }

        public async Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null)
        {
            var query = await _unitOfWork.ProductRepository.GetAsync(filter);
            return query.AsQueryable();
        }

        public async Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null,
                                                            int? pageIndex = null,
                                                            int? pageSize = null)
        {
            var query = await _unitOfWork.ProductRepository.GetAsync(filter, null, null, pageIndex, pageSize);
            return query.AsQueryable();
        }

        public async Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null,
                                                    Func<IQueryable<Product>,
                                                    IOrderedQueryable<Product>> orderBy = null, string includeProperties = "",
                                                    int? pageIndex = null, int? pageSize = null)
        {
            var query = await _unitOfWork.ProductRepository.GetAsync(filter, orderBy, includeProperties, pageIndex, pageSize);
            return query.AsQueryable();
        }

        public async Task<IQueryable<Product>> GetProducts(Expression<Func<Product, bool>> filter = null,
                                                    string includeProperties = "",
                                                    int? pageIndex = null, int? pageSize = null)
        {
            var query = await _unitOfWork.ProductRepository.GetAsync(filter, includeProperties, pageIndex, pageSize);
            return query.AsQueryable();
        }

        public async Task UpdateProduct(Product newProduct)
        {
            await _unitOfWork.ProductRepository.UpdateAsync(newProduct);
        }

        public async Task AddProduct(Product addedProducts)
        {
            await _unitOfWork.ProductRepository.InsertAsync(addedProducts);
        }
    }
}
