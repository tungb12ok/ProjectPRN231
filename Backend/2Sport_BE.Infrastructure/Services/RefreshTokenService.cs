using HightSportShopBusiness.Interfaces;
using HightSportShopBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopBusiness.Services
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken> GetTokenDetail(int userId);
        Task UpdateToken(RefreshToken refreshToken);
        Task RemoveToken(RefreshToken refreshToken);
    }
    public class RefreshTokenService : IRefreshTokenService
    {
        private IUnitOfWork _unitOfWork;
        public RefreshTokenService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<RefreshToken> GetTokenDetail(int userId)
        {
            var detail = await  _unitOfWork.RefreshTokenRepository.GetAsync(_ => _.UserId == userId && _.Used == false);

            return detail.FirstOrDefault();
        }

        public async Task RemoveToken(RefreshToken refreshToken)
        {
            await _unitOfWork.RefreshTokenRepository.DeleteAsync(refreshToken);
        }

        public async Task UpdateToken(RefreshToken refreshToken)
        {
          await  _unitOfWork.RefreshTokenRepository.UpdateAsync(refreshToken);
        }
    }
}
