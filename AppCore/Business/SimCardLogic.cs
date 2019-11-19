﻿using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class SimCardLogic : ISimCardLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<SimCardLogic> _logger { get; }

        public static readonly IDictionary<string, string> MapCellSupplierDictionary = new Dictionary<string, string>
        {
            {"086", "Viettel" },
            {"096", "Viettel" },
            {"097", "Viettel" },
            {"098", "Viettel" },
            {"032", "Viettel" },
            {"033", "Viettel" },
            {"034", "Viettel" },
            {"037", "Viettel" },
            {"038", "Viettel" },
            {"039", "Viettel" },
            {"089", "MobiFone" },
            {"090", "MobiFone" },
            {"093", "MobiFone" },
            {"070", "MobiFone" },
            {"079", "MobiFone" },
            {"077", "MobiFone" },
            {"076", "MobiFone" },
            {"078", "MobiFone" },
            {"088", "Vinaphone" },
            {"091", "Vinaphone" },
            {"094", "Vinaphone" },
            {"083", "Vinaphone" },
            {"084", "Vinaphone" },
            {"085", "Vinaphone" },
            {"081", "Vinaphone" },
            {"082", "Vinaphone" },
            {"092", "Vietnamobile" },
            {"056", "Vietnamobile" },
            {"058", "Vietnamobile" },
            {"059", "Gmobile" },
            {"099", "Gmobile" }
        };

        public SimCardLogic(IUnitOfWork uow, ILogger<SimCardLogic> logger) {
            _uow = uow;
            _logger = logger;
        }

        public string GetSupplier(string supplierKey)
        {
            string Supplier = "";
            foreach (KeyValuePair<string, string> supplier in MapCellSupplierDictionary)
            {
                if (supplier.Key.Equals(supplierKey))
                {
                    Supplier = supplier.Value.ToString();
                    break;
                }
            }
            return Supplier;
        }

        public int GetCellNumber(string cellNumber)
        {
            string _cellNumber = "";
            _cellNumber = string.Join("", cellNumber.ToCharArray().Where(Char.IsDigit));
            return int.Parse(_cellNumber);
        }

        public string GetSimCardNumber(string simCardNumber)
        {
            string _simCardNumber = "";
            _simCardNumber = string.Join("", simCardNumber.ToCharArray().Where(Char.IsDigit));
            return _simCardNumber.Substring(0,3);
        }

        public void ReadExcelFile()
        {
            try
            {
                string strDoc = @"C:\Users\Public\Downloads\Book1.xlsx";
                //Lets open the existing excel file and read through its content . Open the excel using openxml sdk
                using (SpreadsheetDocument doc = SpreadsheetDocument.Open(strDoc, false))
                {
                    //create the object for workbook part  
                    WorkbookPart workbookPart = doc.WorkbookPart;
                    Sheets thesheetcollection = workbookPart.Workbook.GetFirstChild<Sheets>();
                    List<SimCard> simCards = new List<SimCard>();
                    int sheetLevel = 1;
                    int Started = 1;
                    int RowLimit = 1000;
                    bool IsAdded = false;

                    //using for each loop to get the sheet from the sheetcollection
                    if(sheetLevel == 1)
                    {
                        foreach (Sheet thesheet in thesheetcollection)
                        {
                            //statement to get the worksheet object by using the sheet id  
                            Worksheet theWorksheet = ((WorksheetPart)workbookPart.GetPartById(thesheet.Id)).Worksheet;

                            SheetData thesheetdata = (SheetData)theWorksheet.GetFirstChild<SheetData>();
                            int RowStarted = 1;
                            foreach (Row thecurrentrow in thesheetdata)
                            {
                                SimCard simCardItem = new SimCard();
                                foreach (Cell thecurrentcell in thecurrentrow)
                                {
                                    var holdData = "";
                                    //statement to take the integer value  
                                    string currentcellvalue = string.Empty;
                                    if (thecurrentcell.DataType != null)
                                    {
                                        if (thecurrentcell.DataType == CellValues.SharedString)
                                        {
                                            int id;
                                            if (Int32.TryParse(thecurrentcell.InnerText, out id))
                                            {
                                                SharedStringItem item = workbookPart.SharedStringTablePart.SharedStringTable.Elements<SharedStringItem>().ElementAt(id);
                                                if (item.InnerText != null)
                                                {
                                                    currentcellvalue = item.InnerText;
                                                }
                                            }
                                        }

                                        holdData = currentcellvalue;
                                    }
                                    else
                                    {
                                        holdData = thecurrentcell.InnerText ?? Convert.ToInt16(thecurrentcell.InnerText) + " ";
                                    }
                                    int tamp = GetCellNumber(thecurrentcell.CellReference.Value.ToString());
                                    if (tamp > Started && holdData != null)
                                    {
                                        IsAdded = true;
                                        string firstChar = thecurrentcell.CellReference.Value[0].ToString();
                                        if (firstChar == "B")
                                        {
                                            simCardItem.Name = holdData.ToString();
                                            /////
                                            simCardItem.Supplier = GetSupplier(GetSimCardNumber(holdData.ToString()));
                                        }
                                        else if (firstChar == "C")
                                        {
                                            simCardItem.Price = holdData;
                                        }
                                    } else
                                    {
                                        IsAdded = false;
                                    }
                                }
                                if (IsAdded)
                                {
                                    simCards.Add(simCardItem);
                                }

                                //RowStarted++;
                                //_logger.LogTrace("insert ..." + RowStarted);
                                //if (RowStarted >= RowLimit)
                                //{
                                //    _uow.GetRepository<SimCard>().Add(simCards);
                                //    _uow.SaveChanges();
                                //    RowStarted = 1;
                                //    simCards = new List<SimCard>();
                                //}
                            }
                            _uow.GetRepository<SimCard>().Add(simCards);
                            _uow.SaveChanges();
                        }
                    }
                    sheetLevel++;
                }
            }
            catch (Exception ex)
            {
                
            }
        }

        public List<SimCard> GetAll()
        {
            return _uow.GetRepository<SimCard>().GetAll();
        }
    }
}