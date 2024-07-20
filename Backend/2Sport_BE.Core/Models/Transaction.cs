using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HightSportShopDataAccess.Models
{
    public class Transaction
    {
        public string accountNo { get; set; }
        public string deviceIdCommon { get; set; }
        public string fromDate { get; set; }
        public string historyNumber { get; set; }
        public string historyType { get; set; }
        public string refNo { get; set; }
        public string sessionId { get; set; }
        public string toDate { get; set; }
        public string type { get; set; }
    }
}
