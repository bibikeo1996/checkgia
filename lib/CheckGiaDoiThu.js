var puppeteer = require('puppeteer');
var exportDoithu = require('../lib/ExcelForNode');
function CheckGiaDoiThu(req,res){
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
    res.write('<th>Hình Ảnh</th>');
    res.write('<th>Tên</th>');
    res.write('<th>Giá Bán</th>');
    res.write('<th>Giá KM</th>');
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
    await page.setRequestInterception(true);
            page.on('request', (req) => {
                if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() ==
                 'script'){
                    req.abort();
                }
                else {
                    req.continue();
                }
            });
    let arrInfo = [];
    for (var doithu of urls) {
        try {
            await page.goto(doithu.Link +"?cheap=ac#changeTab", {waitUntil: 'load', timeout: 100000});
            const info = await page.evaluate(() => {
                let checkweb1 = document.querySelector("#main-container") // kiểm tra web là dmx
                let checkweb2 = document.querySelector(".NkPdp_productInfo") // kiểm tra web là nguyễn kim
                let checkweb3 = document.querySelector("#pdb-ajax") // kiểm tra web là mediamart
                if (!checkweb1 || !checkweb2 || !checkweb3) {
                    const checknamedmx = document.querySelector("h1");
                    const checknamenk = document.querySelector("h1.product_info_name")
                    const checknamemediamart = document.querySelector("div.pdtr-name h1")
                    const checktonggiatri = document.querySelector(".area_promotion strong b")
                    const checktonggiatri1 = document.querySelector(".boxshockheader")
                    const checkimg = document.querySelector(".img-full-width, .item img")
                    function checkGia()
                    {
                        const check = document.querySelectorAll(".area_price, .displayp strong, .kmgiagach, span.five-7ngay, .nosell, .no-sell strong, .area_order b, .box-info strong, .price_shock_online_exp, .nk-price-final, .pdrrp-price, .war-title");
                        const done = [];
                        for (var i = 0; i < check.length; i++) {
                            const data = check[i].innerText.toLowerCase();
                          if (data.includes(".000₫") || data.includes(".000đ") || data.includes("mới ra mắt") 
                            || data.includes("tạm hết hàng") || data.includes("ngừng kinh doanh") 
                            || data.includes("hàng sắp về"))
                          {
                            if(data.includes(".000₫") || data.includes(".000đ"))
                            {
                                const gia = /[0-9]/g;
                                var first = data.search(gia);
                                var last = data.search("₫");
                                done.push(data.slice(first,last));
                                break;
                            }else if(data.includes("mới ra mắt") || data.includes("tạm hết hàng") || data.includes("ngừng kinh doanh")
                                || data.includes("hàng sắp về")){ 
                                done.push(data)
                                break;
                            }
                            else
                            {
                                done.push(data)
                                break;
                            }
                           // 
                          }
                        }return done; // trả về mảng dữ liệu
                    }
                    function checkGiaKM(){
                        const checkppricesectionnk = document.querySelector(".productInfo_col-2")
                        const checkppricesectiondmx = document.querySelector(".boxshock")
                        const checkppricesectionmediamart = document.querySelector(".pd-evh-price b")
                        if(!checkppricesectionnk || !checkppricesectiondmx || !checkppricesectionmediamart){
                            const check = document.querySelectorAll(".productInfo_col-2 .nk-shock-price, .boxshock .shockbuttonbox b, .pd-evh-price b");
                            const done = [];
                            for (var i = 0; i < check.length; i++) {
                                const data = check[i].innerText.toLowerCase();
                              if (data.includes(".000đ") || data.includes(".000₫"))
                              {
                                    const gia = /[0-9]/g;
                                    var first = data.search(gia);
                                    var last = data.search("đ");
                                    done.push(data.slice(first,last));
                                    break;
                              }
                            }return done; // trả về mảng dữ liệu
                        }
                    }
                    const price = checkGia();
                    const proprice = checkGiaKM();
                    const name = document.querySelector(checknamedmx !== null ? "h1" : checknamenk ? "h1.product_info_name" : checknamemediamart ? "div.pdtr-name h1" : ".khongcoclass")
                    const img = checkimg !== null ? checkimg.getAttribute('src') : "https://pccctoantienphat.vn/wp-content/themes/toan-tien-phat/assets/images/noimagefound.jpg"
                    const model = document.querySelector(".productSpecification_table tbody tr:first-child .value")

                    let data = {
                        Name: name ? name.innerText : "Không!",
                        Price: price ? price : "Không!",
                        Price2: proprice ? proprice : "Không!",
                        Images : img ? img : "Không!",
                    }

                  function checkQua() {
                      const done = [];
                      const checkqua = document.querySelectorAll("span.promo, div.product_info_gifts_attached>div, ul.pdrr-so-info-full li");
                      for (var i = 0; i < checkqua.length; i++) {
                        let data = ''
                        if (checkqua[i].innerHTML.includes("<br>")) {
                          const text = checkqua[i].innerHTML
                          data = text.split('<br>')[0].toLowerCase().replace(/\s/g, '');
                        } else {
                          data = checkqua[i].innerText.toLowerCase().replace(/\s/g, '');
                        }
                        done.push(data);

                      }
                      return done;
                    }
                    const laygift = checkQua();
                    const gift = laygift[0];
                    const gift2 = laygift[1];
                    const gift3 = laygift[2];
                    const gift4 = laygift[3];
                    const gift5 = laygift[4];
                    const gift6 = laygift[5];
                    const gift7 = laygift[6];
                    const gift8 = laygift[7];
                    const gift9 = laygift[8];
                    const gift10 = laygift[9]; 
                    //const tonggiatri = document.querySelector(checktonggiatri !== null && checktonggiatri1 === null ? ".area_promotion strong b" : checktonggiatri === null && checktonggiatri1 !== null ? ".khongcoclass" : ".khongcoclass")

                    return {
                        ...data,
                         Gift: gift ? gift : "0",
                        Gift2: gift2 ? gift2: "0",
                        Gift3: gift3 ? gift3 : "0",
                        Gift4: gift4 ? gift4 : "0",
                        Gift5: gift5 ? gift5 : "0",
                        Gift6: gift6 ? gift6 : "0",
                        Gift7: gift7 ? gift7 : "0",
                        Gift8: gift8 ? gift8 : "0",
                        Gift9: gift9 ? gift9 : "0",
                        Gift10: gift10 ? gift10 : "0",
                    }
                }

                return {
                    Name: "Không Link!",
                    Price: "Không Link!",
                    Price2: "Không Link!",
                    Gift: "Không Link!",
                    Gift2: "Không Link!",
                    Gift3: "Không Link!",
                    Gift4: "Không Link!",
                    Gift5: "Không Link!",
                    Gift6: "Không Link!",
                    Gift7: "Không Link!",
                    Gift8: "Không Link!",
                    Gift9: "Không Link!",
                    Gift10: "Không Link!",
                };

            })
            if (info) {
                arrInfo.push(info)
                res.write("<tr>")
                res.write("<td>" + doithu.STT + "</td>");
                res.write("<td><img src='" + info.Images + "'style='width:100%;'></td>");
                res.write("<td>" + info.Name + "</td>");
                res.write("<td>" + info.Price +"đ" + "</td>");
                res.write("<td>" + info.Price2 +"đ" + "</td>");
                res.write('<td><span class="status text-success">&bull;</span>' + "Xong!" + "</td>");
                res.write("</tr>")
            }
        } catch (err) {
            console.log(err)
            res.write("<tr>")
            res.write("<td style='border: 1px solid black;text-align: center;'>" + doithu.STT +"</td>")
            res.write('<td colspan="4">' + err +"</td>")
            res.write('<td><span class="status text-danger">&bull;</span>' + "Lỗi!" +"</td>")
            res.write("</tr>")
        }
    }
    var tenlink = exportDoithu.exportToExcelDoiThu(arrInfo)
    res.write("<tr>")
    res.write("<td style='border: 1px solid black;text-align: center;'><a href='/'>Trang Chủ</a></td>")
    res.write("<td colspan='5' style='border: 1px solid black;text-align: center;'><a href='" +tenlink+"'>Tải File</a></td>")
    res.write("</tr>")
    res.write("</tbody>");
    res.write("</table></div></div></div>");
    })();
}
module.exports = {
  CheckGiaDoiThu : CheckGiaDoiThu
}