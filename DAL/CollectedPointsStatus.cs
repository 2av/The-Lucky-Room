using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CollectedPointsStatus:Base
    {
        public int CPId { get; set; }

        public int? UserId { get; set; }

        public int? RedeemPoints { get; set; }

        public double? AmoutAddInWallete { get; set; }

        public string Comments { get; set; }

    }
}
