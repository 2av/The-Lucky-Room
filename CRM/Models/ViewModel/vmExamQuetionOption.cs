using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRM.Models.ViewModel
{
    public class vmExamQuetionOption
    {
        public string PaperId { get; set; }
        public string QuestionName { get; set; }
        public string OptionType { get; set; }
        public string NoOfOption { get; set; }
        public string PositiveMark { get; set; }
        public string NegativeMark { get; set; }
        public string Options { get; set; }
    }
    public class vmExamQuetionOptionList
    {
        public string Option { get; set; }
        public string IsCorrect { get; set; }
    }
}