const express=require("express");
const jwt = require('jsonwebtoken');
var tokenVerify = require('../shared/tokenVerify');
const Router=express.Router();
var cors = require('cors')
const dbcontext = require("../user/DB");
Router.use(cors());
var folder_number="1234"; 
var bodyParser=require("body-parser");
const { CallSP } = require("../service/DBCommon");
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json());




Router.get ("/",(req,res)=>{
    res.json({message:'Hello this is my first api'});
})

const debug = require('debug')('myapp:server');
const multer = require('multer');
const serveIndex = require('serve-index');
Router.use(express.static(__dirname+'/public'));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {

    
     
     mobile_number=req.headers.mobile_number.slice(1, -1);
     var path = './public/shops/'+mobile_number+"/";
     console.log(path);
     var fs = require('fs');
     if (!fs.existsSync(path)){
       console.log('nopath')
    fs.mkdirSync(path);
  }
  cb(null,path )


   
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname+".jpg")
      
  }
  
});

const upload = multer({ storage: storage });

Router.use(express.json());
Router.use(express.urlencoded({ extended: false }));
Router.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));

Router.post('/uploadImage', upload.single('file'), function(req,res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    debug(req.file);
    console.log(req.file.path); 


    return res.send(req.file);
})


Router.get ("/",(req,res)=>{
    res.json({message:'Hello this is my first api'});
})



Router.get('/allmenu', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        
    res.contentType("application/json");
    res.send(dbcontext.allmenu());
  })

  Router.get('/shopType', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        
    res.contentType("application/json");

    var resultlist =dbcontext.shoptype();
    return res.status(200).send({ status: 200, results: resultlist })

    
  })
  Router.get('/listCategories', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        
    res.contentType("application/json");

    var resultlist =dbcontext.CategoryList();
    return res.status(200).send({ status: 200, results: resultlist })

    
  })

  Router.post('/login', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.contentType("application/json");
    var userName=req.body.userName;
    var password=req.body.password;
    

    var resultlist =dbcontext.checklogin(userName,password);
    console.log(resultlist);
    console.log(resultlist[0].p_return_msg);
    if (resultlist[0].p_return_msg=="False")
    {
      return res.status(400).send({ status: 400, message: 'Login failure !' });
    }
    else
    {
   
    return res.status(200).send({ status: 200, results:resultlist , message: 'Login success !' })
    }
  })

  Router.post('/buyers_reply_to_seller_via_email', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   res.contentType("application/json");
   
    var resultlist = dbcontext.buyers_reply_to_seller_via_email(
      
			req.body.option,
      req.body.company_code,
      req.body.buyers_emailid,
      req.body.sellers_emailid,
      req.body.category_code,
      req.body.sub_category_code,
      req.body.subject,
      req.body.buyers_enquiry_message
    );
    res.send(resultlist);
  })
  Router.post('/createUser',  function (req, res) {
    debugger;

   res.contentType("application/json");
   try
   {

   if (req.body.userType=="Logistics operator")
   {
    var userid=req.body.userid;
    var roleId = '501';
    var displayName=req.body.displayName;
    var userName=req.body.userName;
    var userMobile=req.body.userMobile;
    var userType=req.body.userType;
    var userEmail=req.body.userEmail;
    var password =req.body.password ;
    var pincode=req.body.pincode;
    var companyName=req.body.companyName;
    var companyAddress=req.body.companyAddress;
    var companyPhoneNumber=req.body.companyPhoneNumber;
    var companyEmailAddress=req.body.companyEmailAddress;
    var companyPincode=req.body.companyPincode;
    var companyGst=req.body.companyGst;
    var proprietorName=req.body.proprietorName;
    var proprietorPhoneNumber=req.body.proprietorPhoneNumber;
    var proprietorEmailAddress=req.body.proprietorEmailAddress;
    var proprietorAddress=req.body.proprietorAddress;
    var pic=req.body.pic;
    var district=req.body.district;
    var deleted=req.body.deleted;
    var companyId=req.body.companyId;
    var createdBy="";

   }
   else{
    var userid=req.body.userid;
    var roleId = '501';
    var displayName=req.body.displayName;
    var userName=req.body.userName;
    var userMobile=req.body.userMobile;
    var userType=req.body.userType;
    var userEmail=req.body.userEmail;
    var password =req.body.password ;
    var pincode=req.body.pincode;
    var companyName="";
    var companyAddress="";
    var companyPhoneNumber="";
    var companyEmailAddress="";
    var companyPincode="";
    var companyGst="";
    var proprietorName="";
    var proprietorPhoneNumber="";
    var proprietorEmailAddress="";
    var proprietorAddress="";
    var deleted=false;
    var pic=req.body.pic;
    var companyId=req.body.companyId;
    var createdBy="";
    var district=req.body.district;
   }
    
console.log(req.body);

    var resultlist = dbcontext.CreateUserDetail(
      userid, userName,password,roleId,companyId,displayName,userEmail,userMobile,userType,
      pincode,companyName,companyAddress,companyEmailAddress,companyGst,companyPhoneNumber,
      companyPincode,proprietorAddress,proprietorEmailAddress,proprietorName,proprietorPhoneNumber
      ,pic,district
       );
       console.log(resultlist);
     
       return res.status(200).send({ status: 200, results:resultlist ,message: "User creation Success!" });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })

  Router.delete('/removeUser/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.userdelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.delete('/deleteShop/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.shopdelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.post('/productlist', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    var product_id=req.body.product_id;
    var product_name=req.body.product_name;
    var page=req.body.skipCount;
    var rp=req.body.limitCount;

    res.contentType("application/json");
   var resultlist= dbcontext.productlist(product_id,product_name,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })


  Router.post('/usermaplocation', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    var userid=req.body.userid;
    var lattitude=req.body.lattitude;
    var longtitude=req.body.longtitude;
    

    res.contentType("application/json");
   var resultlist= dbcontext.Usermaplocation(userid,lattitude,longtitude);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/usersList', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var userName=req.body.userName;
    var mobileno=req.body.mobileno;
    var searchValue=req.body.searchValue;
    var createdBy=req.body.createdBy;
    var userType=req.body.userType;
    var page=req.body.skipCount;
    var rp=req.body.limitCount;

    console.log(req.body);
    res.contentType("application/json");
    var resultlist =dbcontext.userlist(userName,mobileno,searchValue,createdBy,userType,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/shoplist', function (req, res) {
    Router.use(express.static('public'));

    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var userName=req.body.userName;
    var searchValue=req.body.searchValue;
    var createdBy=req.body.createdBy;
    var status=req.body.status;
    var name=req.body.name;
    var mobileno=req.body.mobileno;
    var page=req.body.skipCount;
    var rp=req.body.limitCount;

    console.log(req.body);
    res.contentType("application/json");
    var resultlist =dbcontext.shoplist(userName,searchValue,createdBy,status,name,mobileno,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })
  Router.get('/rolist', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        
    res.contentType("application/json");
    return res.status(200).send({ status: 200, results:dbcontext.rolist()  });
    
  })
  Router.get('/lolist', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        
    res.contentType("application/json");

    return res.status(200).send({ status: 200, results:dbcontext.lolist()  });
  })
 

  Router.get('/productall', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        
    res.contentType("application/json");

    return res.status(200).send({ status: 200, results:dbcontext.productall()  });
  })

  Router.post('/updateuserlist',upload.single('file'),function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, get, GET, DELETE, OPTIONS');
    
    res.contentType("application/json");
    
    debug(req.file);
    console.log(req.file); 
    try
    { 
      var str = req.file.destination+"/" + req.file.filename;
      str = str.substring(1);
      var resultlist =dbcontext.updateuserlist(
        req.body.user_id ,
        str ,
        req.body.userMobile);
      return res.status(200).send({ status: 200, results: resultlist })
        
  }
  catch (error) {
   console.log('error', error);
   if (error.code == 11000) {
       return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
   }
   return res.status(400).send({ status: 400, error: error, message: "User list update Failure!" });
}
  });

  
  Router.post('/createShop',  upload.array('file', 3), function(req, res, next) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
 
   res.contentType("application/json");
        data=JSON.parse(req.body.data);

    
        var fileinfo = req.files;
        var pics="";
        var object_length=Object.keys(fileinfo).length;
     
      for(i=0; i<object_length;i++){
        pics = pics + '"'+fileinfo[i].destination.substring(8)+fileinfo[i].filename+'"'
        if(i<object_length-1){
          pics = pics +','
        }
        
      } 

    pics = "["+pics+"]";  
    try
      {
        
       var shopid=0;
       var name=data.name;
       var shopOwner=data.shopOwner;
       var ownerNumber=data.ownerNumber;
       var pincode=data.pincode;
       var area=data.area;
       var shopType =data.shopType ;
       var street=data.street;
       var landMark=data.landMark;
       var district=data.district;
       var state=data.state;
       
       var lattitude=data.lattitude;
       var longtitude=data.longitude;
       var location="["+data.lattitude+","+data.longitude+"]";
       var companyId="";
       var walletamt=0;
       
       var c_user=data.createdBy;
       var roid="";
   
   
        var resultlist = dbcontext.CreateShopdetail(
         shopid, name,shopOwner,ownerNumber,pincode,area,shopType,street,landMark,pics,
         district,state,lattitude,longtitude,companyId,walletamt,location,roid,
         c_user      
          );
          console.log(resultlist);
          if(resultlist[0].p_return_value>0)  {
            return res.status(200).send({ status: 200,message: "Created success!" });
          }
          else{
           return res.status(400).send({ status: 400,message: "Shop Detail already Exist" });
          }
        }
        catch (error) {
          console.log('error', error);
          if (error.code == 11000) {
           return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` }); 
          } 
          return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
          
   }  
   
  });
  Router.post('/newProduct',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
var product_sys_id=req.body.prod_sys_id
    var productId=req.body.productId;
    var productName=req.body.productName;
    var category=req.body.category;
    var type=req.body.type;
    var weightType=req.body.weightType;
    var units=req.body.units;
    var basicPrice =req.body.basicPrice ;
    var loMargin=req.body.loMargin;
    var loSelling=req.body.loSelling;
    var productGst=req.body.productGst;
    var mrpPrice=req.body.mrpPrice;
    var lobasicPrice=req.body.lobasicPrice;
    var loGst=req.body.loGst;
    var loMrpPrice=req.body.loMrpPrice;
    var pcsperunit=req.body.pcsperunit;
   
    var c_user=req.body.createdBy;


    var resultlist = dbcontext.CreateProduct(
     product_sys_id, productId, productName,category,type,weightType,units,basicPrice,loMargin,loSelling,
      productGst,mrpPrice,lobasicPrice,loGst,loMrpPrice,c_user,pcsperunit      
       );
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: "User creation Success!" });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })
  Router.delete('/deleteProduct/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.ProductDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })
  Router.post('/listOrder', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var orderno=req.body.order_no;
    var locode=req.body.lo_code;
     var page=req.body.skipCount;
    var rp=req.body.limitCount;

    console.log(req.body);
    res.contentType("application/json");
  
    var resultlist =dbcontext.orderlist(orderno,locode,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/newShopType',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
      var type=req.body.type
    
    var resultlist = dbcontext.CreateShopType(type);
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: "Shop Type creation Success!" });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })


  Router.post('/newCategories',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
      var category=req.body.type
    
    var resultlist = dbcontext.CreateCategory(category);
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: "Shop Type creation Success!" });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })


  Router.delete('/deleteShopType/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.ShoptypeDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.delete('/deleteCategory/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.CategoryDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })




  Router.post('/neworderhead',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
var orderid=req.body.orderid
    var orderno=req.body.orderno;
    var orderdate=req.body.orderdate;
    var locode=req.body.locode;
    var remarks=req.body.remarks;
    var ordervalue=req.body.ordervalue;
    var companyId=req.body.companyId;
    var c_user=req.body.createdBy;


    var resultlist = dbcontext.CreateOrderHead(
      orderid, orderno, orderdate,locode,remarks,ordervalue,companyId,c_user      
       );
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: "Order creation Success!" });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })

  Router.post('/neworderdetail',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
var orderdetid=req.body.orderdetid
    var orderno=req.body.orderno;
    var productId=req.body.productId;
    var noofunit=req.body.noofunit;
    var lobasicprice=req.body.lobasicprice;
    var totalvalue=req.body.totalvalue;
    var gstper=req.body.gstper;
    var gstamt=req.body.gstamt;
    var netvalue=req.body.netvalue;
    var companyId=req.body.companyId;
    var c_user=req.body.createdBy;
console.log('venkat');

    var resultlist = dbcontext.CreateOrderDetail(
      orderdetid, orderno, productId,noofunit,lobasicprice,totalvalue,gstper,gstamt,netvalue,companyId,c_user      
       );
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: "Order creation Success!" });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })

  Router.post('/productbyid', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    var product_id=req.body.productid;
    
    res.contentType("application/json");
   var resultlist= dbcontext.productbyid(product_id);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/getdocno', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    console.log(req.body)
    var companycode=req.body.companycode;
    var doc_type=req.body.doc_type;
    
    res.contentType("application/json");
   var resultlist= dbcontext.getdocno(companycode,doc_type);
    return res.status(200).send({ status: 200, results: resultlist })
  })


  Router.post('/listOrderdetail', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var orderno=req.body.orderno;
    var page=req.body.skipCount;
    var rp=req.body.limitCount;

    console.log(req.body);
    res.contentType("application/json");
  
    var resultlist =dbcontext.orderdetlist(orderno,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.delete('/deleteorderdetail/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.OrderdetDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.delete('/deleteorderhead/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id,req.params.orderno);
    res.contentType("application/json");
    var resultlist =dbcontext.OrderheadDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.post('/loorder', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var locode=req.body.locode;
    

    console.log(req.body);
    res.contentType("application/json");
    var resultlist =dbcontext.Loorderno(locode);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/lopendingorder', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var locode=req.body.locode;
    var orderno=req.body.orderno;
    

    console.log(req.body);
    res.contentType("application/json");
    var resultlist =dbcontext.LoPendingOrder(locode,orderno);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/newinvoicehead',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
    var invid=req.body.invid
    var invno=req.body.invno;
    var orderno=req.body.orderno;
    var invdate=req.body.invdate;
    var locode=req.body.locode;
    var remarks=req.body.remarks;
    var invvalue=req.body.invvalue;
    var companyId=req.body.companyId;
    var c_user=req.body.createdBy;


    var resultlist = dbcontext.CreateInvHead(invid,
      invno, orderno, invdate,locode,remarks,invvalue,companyId,c_user      
       );
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: resultlist[0].p_return_msg });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })

  Router.post('/listinvoice', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var invno=req.body.invno;
    var locode=req.body.locode;
     var page=req.body.skipCount;
    var rp=req.body.limitCount;

    console.log(req.body);
    res.contentType("application/json");
  
    var resultlist =dbcontext.InvliceList(invno,locode,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })


  Router.post('/newinvoicedetail',  function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    console.log(req.body);
   res.contentType("application/json");

   try
   {
var invdetid=req.body.invdetid
var invno=req.body.invno;
    var orderno=req.body.orderno;
    var productId=req.body.productId;
    var noofunit=req.body.noofunit;
    var lobasicprice=req.body.lobasicprice;
    var totalvalue=req.body.totalvalue;
    var gstper=req.body.gstper;
    var gstamt=req.body.gstamt;
    var netvalue=req.body.netvalue;
    var companyId=req.body.companyId;
    var c_user=req.body.createdBy;
console.log('venkat');

    var resultlist = dbcontext.CreateInvDetail(
      invdetid,invno, orderno, productId,noofunit,lobasicprice,totalvalue,gstper,gstamt,netvalue,companyId,c_user      
       );
       console.log(resultlist);
       return res.status(200).send({ status: 200, results:resultlist ,message: resultlist[0].p_return_msg });
    

   }
   catch (error) {
    console.log('error', error);
    if (error.code == 11000) {
        return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
    }
    return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
}
   
  })
  Router.post('/listinvoicedetail', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var invno=req.body.invno;
    var page=req.body.skipCount;
    var rp=req.body.limitCount;

    console.log(req.body);
    res.contentType("application/json");
  
    var resultlist =dbcontext.invoicedetlist(invno,page,rp);
    return res.status(200).send({ status: 200, results: resultlist })
  })
  Router.delete('/deleteinvoicehd/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id,req.params.invno);
    res.contentType("application/json");
    var resultlist =dbcontext.InvoiceHeadDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.delete('/deleteinvoicedetail/:id', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
console.log(req.params.id);
    res.contentType("application/json");
    var resultlist =dbcontext.InvoicedetDelete(req.params.id);
    return res.status(200).send({ status: 200, results: resultlist })
    
  })

  Router.post('/shopStatus', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var compnayid=req.body.compnayid;
    var usercode=req.body.usercode;
    var usertype=req.body.usertype;
    

    console.log(req.body);
    res.contentType("application/json");
    var resultlist =dbcontext.shopstatus(compnayid,usercode,usertype);
    return res.status(200).send({ status: 200, results: resultlist })
  })

  Router.post('/userStatus', function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    var compnayid=req.body.compnayid;
    var usercode=req.body.usercode;
    var usertype=req.body.usertype;
    

    console.log(req.body);
    res.contentType("application/json");
    var resultlist =dbcontext.userstatus(compnayid,usercode,usertype);
    return res.status(200).send({ status: 200, results: resultlist })
  });

    Router.post('/upload', upload.single('blogimage'), function(req, res, next) {
      var fileinfo = req.body.file;
      var title = req.body.title;
      console.log(title);
      res.send(fileinfo);
    })
    
    Router.post('/shopadd', upload.array('file', 5), function(req, res, next) {
      
      var fileinfo = req.files;
      var pics="";
      var object_length=Object.keys(fileinfo).length;
    
      for(i=0; i<object_length;i++){
        pics = pics + '"'+fileinfo[i].destination.substring(1)+fileinfo[i].filename+'"'
        if(i<object_length-1){
          pics = pics +','
        }
        
      }

      console.log(pics) 

      
      try
      {
             
       var resultlist = dbcontext.CreateShopdetail(
         req.body.shopid, 
         req.body.name,
         req.body.shopOwner,
         req.body.ownerNumber,
         req.body.pincode,
         req.body.area,
         req.body.shopType,
         req.body.street,
         req.body.landMark,
          pics,
         req.body.district,
         req.body.state,
         req.body.lattitude,
         req.body.longtitude,
         req.body.companyId,
         req.body.location,
         req.body.roid,
         req.body.c_user      
          );
          console.log(resultlist);
          return res.status(200).send({ status: 200, results:resultlist ,message: "User creation Success!" });
       
   
      }
      catch (error) {
       console.log('error', error);
       if (error.code == 11000) {
           return res.status(400).send({ status: 400, error: error.keyValue, message: `Value ${Object.values(error.keyValue)} already exist!` });
       }
       return res.status(400).send({ status: 400, error: error, message: "User creation Failure!" });
   }
      
          

      res.send(fileinfo);
    })






module.exports=Router;
