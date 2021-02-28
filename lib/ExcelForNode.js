var excel = require('excel4node');
var path = require('path');
function exportToExcelDoiThu(data) {
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');

    const headings = ['Tên', 'Giá Thường',"Giá KM", 'Q1', 'Q2','Q3', 'Q4','Q5','Q6','Q7','Q8','Q9','Q10'];//, 'Gift6', 'Gift7'];;
    worksheet.row(1).freeze();
    // Writing from cell A1 to I1
    headings.forEach((heading, index) => {
        worksheet.cell(1, index + 1).string(heading);
    })

    // Writing from cell A2 to I2 , A3 to I3, .....
    data.forEach((item, index) => {
        worksheet.cell(index + 2, 1).string(item.Name);
        worksheet.cell(index + 2, 2).string(item.Price);
        worksheet.cell(index + 2, 3).string(item.Price2);
        worksheet.cell(index + 2, 4).string(item.Gift);
        worksheet.cell(index + 2, 5).string(item.Gift2);
        worksheet.cell(index + 2, 6).string(item.Gift3);
        worksheet.cell(index + 2, 7).string(item.Gift4);
        worksheet.cell(index + 2, 8).string(item.Gift5);
        worksheet.cell(index + 2, 9).string(item.Gift6);
        worksheet.cell(index + 2, 10).string(item.Gift7);
        worksheet.cell(index + 2, 11).string(item.Gift8);
        worksheet.cell(index + 2, 12).string(item.Gift9);
        worksheet.cell(index + 2, 13).string(item.Gift10);
        // worksheet.cell(index + 2, 8).string(item.Gift6);
        // worksheet.cell(index + 2, 9).string(item.Gift7);
    });
    var today1 = new Date();
    //var filename = __dirname + "/public/" + "GiaDMX-NK-MediaMart"  + '-' + today1.getDate() + '-' +(today1.getMonth()+1) + '-' + today1.getFullYear() + "-" + Date.now().toString() + '.xlsx'; //+ Date.now().toString()
    var filename ="./public/"+"GiaDMX-NK-MediaMart"  + '-' + today1.getDate() + '-' +(today1.getMonth()+1) + '-' + today1.getFullYear() + "-" + Date.now().toString() + '.xlsx'; //+ Date.now().toString()
    workbook.write(filename);
    return filename;
}
function exportToExcelTMDT(data) {
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');

    const headings = ['Tên', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'];
    worksheet.row(1).freeze();
    // Writing from cell A1 to I1
    headings.forEach((heading, index) => {
        worksheet.cell(1, index + 1).string(heading);
    })

    // Writing from cell A2 to I2 , A3 to I3, .....
    data.forEach((item, index) => {
        worksheet.cell(index + 2, 1).string(item.Name);
        worksheet.cell(index + 2, 2).string(item.G1);
        worksheet.cell(index + 2, 3).string(item.G2);
        worksheet.cell(index + 2, 4).string(item.G3);
        worksheet.cell(index + 2, 5).string(item.G4);
        worksheet.cell(index + 2, 6).string(item.G5);
        worksheet.cell(index + 2, 7).string(item.G6);
        worksheet.cell(index + 2, 8).string(item.G7);
        worksheet.cell(index + 2, 9).string(item.G8);
        worksheet.cell(index + 2, 10).string(item.G9);
        worksheet.cell(index + 2, 11).string(item.G10);
    });
    var todayShopee = new Date();
    var filenameShopee = "./public/"+"GiaTMDT"  + '-' + todayShopee.getDate() + '-' +(todayShopee.getMonth()+1) + '-' + todayShopee.getFullYear() + "-" + Date.now().toString() + '.xlsx'; //+ Date.now().toString()
    workbook.write(filenameShopee);
    return filenameShopee;
}

function getLink(file){
    const XLSX = require('xlsx');
    // var filedir = path.join('uploads', file);
    // var workbook = XLSX.readFile(filedir);
    var workbook = XLSX.readFile(file);
    var sheet_name_list = workbook.SheetNames;
    var urls = [];
    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); 
    return data;
};

module.exports = {
  exportToExcelDoiThu : exportToExcelDoiThu,
  exportToExcelTMDT : exportToExcelTMDT,
  getLink : getLink,
}