const puppeteer = require('puppeteer');
var exportDoithu = require('../lib/ExcelForNode');
function CheckGiaTMDTShopeeMall(req,res){
    res.writeHeader(200 , {"Content-Type" : "text/html; charset=utf-8"});
    var file = req.file.originalname;
    res.write('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">');
    res.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">');
    res.write('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">');
    res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');
    res.write('<link rel="stylesheet" href="public/css/style.css">');
    res.write('<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>');
    res.write('<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>')
    res.write('<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>')
    res.write('<div class="fuild-container"><div class=""><div class="table-wrapper" style="margin-left:auto;margin-right:auto;display:block;width:100%;"><div class="table-title">');
    res.write('<div class="row">');
    res.write('<div class="col-sm-5">');
    res.write('<h2><b>Checking</b></h2>');
    res.write('</div>');
    res.write('</div>');
    res.write('</div>');
    res.write('<table class="table table-striped table-hover">');
    res.write('<thead style="text-align:center;">');
    res.write('<tr>');
    res.write('<th>STT</th>');
    res.write('<th>Tên</th>');
    res.write('<th>G1</th>');
    res.write('<th>G2</th>');
    res.write('<th>G3</th>');
    res.write('<th>G4</th>');
    res.write('<th>G5</th>');
    res.write('<th>G6</th>');
    res.write('<th>G7</th>');
    res.write('<th>G8</th>');
    res.write('<th>G9</th>');
    res.write('<th>G10</th>');
    res.write('<th>Tình Trạng</th>');
    res.write('</tr>');
    res.write('</thead>');
    res.write('<tbody style="text-align:center;">');
    (async () => { 
    const browser = await puppeteer.launch({
                      'args' : [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                      ]
                    });
    const page = await browser.newPage()
    const urls = exportDoithu.getLink(file);
    console.log(urls);
    let arrInfo = [];
    for (var doithu of urls) {
        try {
            await page.goto("https://shopee.vn/mall/search?keyword="+doithu.Name+"&order=asc&page=0&sortBy=price", {waitUntil: 'networkidle2', timeout: 100000});
            const info = await page.evaluate(() => {
                let checkweb = document.querySelector("div.shopee-search-item-result__item");
                if (checkweb !== null) {
                    const checkname = document.querySelector(".shopee-search-result-header__text-highlight");
                    const name = document.querySelector(checkname !== null ? ".shopee-search-result-header__text-highlight" : ".khongcoclass")

                    let data = {
                        Name: name ? name.innerText : "Không!",
                    }

                   function CheckGianHang(){
                    const checkname = document.querySelector("span.shopee-search-result-header__text-highlight").innerText.toLowerCase();
                    const done = [];
                    // lấy tất cả gian hàng theo keyword
                    const laygianhang = document.querySelectorAll("div.shopee-search-item-result__item");
                    for(var i = 0; i < laygianhang.length; i++){
                        //lấy tên sản phẩm theo từng gian hàng
                        const data = laygianhang[i].querySelector("div.O6wiAW div").innerText.toLowerCase();
                        //so sánh tên sản phẩm của từng gian hàng với keyword
                            if(data.includes(checkname) == true && data.includes("bếp") || data.includes("bếp gas")
                            || data.includes("bếp ga") || data.includes("nồi chiên")
                            || data.includes("nồi chảo") || data.includes("bếp từ")
                            || data.includes("nồi cơm") || data.includes("máy giăt")
                            || data.includes("máy sấy") || data.includes("sấy tóc") || data.includes("máy xay")
                            || data.includes("máy ép") || data.includes("hút bụi") || data.includes("tivi")
                            || data.includes("nồi hấp") || data.includes("bàn ủi") || data.includes("tv")
                            || data.includes("lò vi sóng") || data.includes("lò nướng") || data.includes("bàn ủi hơi nước")
                            || data.includes("máy hút mùi") || data.includes("hút mùi") || data.includes("máy nước nóng") || data.includes("máy nước nóng trực tiếp")
                            || data.includes("lò nướng âm") || data.includes("nồi cơm điện") || data.includes("cà phê") || data.includes("bình đun")
                            || data.includes("máy hút khói") || data.includes("bếp từ") || data.includes("bếp điện từ")
                            || data.includes("máy hút bụi") || data.includes("máy rửa chén") || data.includes("rửa chén")
                            || data.includes("máy rửa bát") || data.includes("rửa bát") || data.includes("bàn ủi hơi nước")
                            || data.includes("bàn ủi khô") || data.includes("bàn ủi đứng")){
                            const gia = laygianhang[i].querySelector("span._341bF0").innerText;
                            done.push(gia);                          
                            }else{
                                done.push("Error!");
                            }
                        }return done;
                   }

                    const laygian = CheckGianHang();
                    const g1 = laygian[0];
                    const g2 = laygian[1];
                    const g3 = laygian[2];
                    const g4 = laygian[3];
                    const g5 = laygian[4];
                    const g6 = laygian[5];
                    const g7 = laygian[6];
                    const g8 = laygian[7];
                    const g9 = laygian[8];
                    const g10 = laygian[9];

                    return {
                        ...data,
                        G1: g1 ? g1 : "0",
                        G2: g2 ? g2 : "0",
                        G3: g3 ? g3 : "0",
                        G4: g4 ? g4 : "0",
                        G5: g5 ? g5 : "0",
                        G6: g6 ? g6 : "0",
                        G7: g7 ? g7 : "0",
                        G8: g8 ? g8 : "0",
                        G9: g9 ? g9 : "0",
                        G10: g10 ? g10 : "0",
                    }
                }

                return {
                    Name: "Không Có",
                    G1: "Không Có",
                    G2: "Không Có",
                    G3: "Không Có",
                    G4: "Không Có",
                    G5: "Không Có",
                    G6: "Không Có",
                    G7: "Không Có",
                    G8: "Không Có",
                    G9: "Không Có",
                    G10: "Không Có",
                };

            })
            if (info) {
                arrInfo.push(info)
                res.write("<tr>")
                res.write("<td>" + doithu.STT + "</td>");
                res.write("<td>" + info.Name + "</td>");
                res.write("<td>" + info.G1 + "</td>");
                res.write("<td>" + info.G2 + "</td>");
                res.write("<td>" + info.G3 + "</td>");
                res.write("<td>" + info.G4 + "</td>");
                res.write("<td>" + info.G5 + "</td>");
                res.write("<td>" + info.G6 + "</td>");
                res.write("<td>" + info.G7 + "</td>");
                res.write("<td>" + info.G8 + "</td>");
                res.write("<td>" + info.G9 + "</td>");
                res.write("<td>" + info.G10 + "</td>");
                res.write('<td><span class="status text-success">&bull;</span>' + "Xong!" + "</td>");
                res.write("</tr>")
            }
        } catch (err) {
            console.log(err)
            res.write("<tr>")
            res.write("<tr>")
            res.write("<td style='border: 1px solid black;text-align: center;'>" + doithu.STT +"</td>")
            res.write("<td colspan='11' style='border: 1px solid black;text-align: center;'>" + err +"</td>")
            res.write("<td style='border: 1px solid black;text-align: center;'><span class='status text-danger'>&bull;</span>" + "Lỗi!" +"</td>")
            res.write("</tr>")
        }
    }
    var tenlink = exportDoithu.exportToExcelTMDT(arrInfo)
    res.write("<tr>")
    res.write("<td style='border: 1px solid black;text-align: center;'><a href='/'>Trang Chủ</a></td>")
    res.write("<td colspan='12' style='border: 1px solid black;text-align: center;'><a href='" +tenlink+"'>Tải File</a></td>")
    res.write("</tr>")
    res.write("</table></div>")
    })();
}
module.exports = {
  CheckGiaTMDTShopeeMall : CheckGiaTMDTShopeeMall
}