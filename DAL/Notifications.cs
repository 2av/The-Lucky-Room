using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Notifications:Base
    {
        public int ID { get; set; }

        public int? UserId { get; set; }

        public string Descriptions { get; set; }

        public int? NotificationTypes { get; set; }

        public bool? IsViews { get; set; }

    }
    public class vmNotification
    {
        public string Descriptions { get; set; }
        public string CreatedDate { get; set; }
        public string NotificationType { get; set; }
        public bool IsViews { get; set; }
    }
}
