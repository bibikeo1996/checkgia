var express =   require("express");
var multer  =   require('multer');
var excel = require('excel4node');
var app     =   express();
app.use(express.static(__dirname));
var checkGiaDoiThu = require('./lib/CheckGiaDoiThu');
var checkGiaTMDT = require('./lib/CheckGiaTMDT');
var checkGiaShopeemall = require('./lib/CheckGiaTMDTShopeeMall');
var checkGiaTiki = require('./lib/CheckGiaTiki');


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    //callback(null,__dirname+"/uploads/");
    callback(null,__dirname);
  },
  filename: function (req, file, callback) {
    callback(null,file.originalname);
  }
});


var upload = multer({ storage : storage});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/views/index.html");
});
//================================================ Code Check Giá DMX/NK/Media Mart ================================================
app.post('/checkgiankdmx',upload.single('checkgiankdmx'),function(req,res){
	if(req === null){
		res.write("<p>Errors!!</p>")
	}else{
		checkGiaDoiThu.CheckGiaDoiThu(req,res);
	}
});
// ================================================ Code Check Giá Shopee Bằng Mã ================================================
app.post('/checkgiashopee',upload.single('checkgiashopee'),function(req,res){
	if(req === null){
		res.write("<p>Errors!!</p>")
	}else{
		checkGiaTMDT.CheckGiaTMDT(req,res);
	}
});
// ================================================ Code Check Giá Shopee Mall ================================================
app.post('/checkgiashopeemall',upload.single('checkgiashopeemall'),function(req,res){
	if(req === null){
		res.write("<p>Errors!!</p>")
	}else{
		checkGiaShopeemall.CheckGiaTMDTShopeeMall(req,res);
	}
});
// ================================================ Code Check Giá Tiki ================================================
app.post('/checkgiatiki',upload.single('checkgiatiki'),function(req,res){
	if(req === null){
		res.write("<p>Errors!!</p>")
	}else{
		checkGiaTiki.CheckGiaTiki(req,res);
	}
});
app.listen(process.env.PORT || 3000);