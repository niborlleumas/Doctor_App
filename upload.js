const express=require("express");
const jwt = require('jsonwebtoken');
var trycatch = require("trycatch");
const crypto=require("crypto");
var async = require("async");
const fileUpload = require('express-fileupload');
var tokenVerify = require('../shared/tokenVerify');
const Router=express.Router();
var cors = require('cors')
const dbcontext = require("./DB");
Router.use(cors());
var folder_number="1234"; 
var bodyParser=require("body-parser");
const { CallSP } = require("../service/DBCommon");
const  Pool  = require("../service/DBCommon");
const SNSLibrary = require('../src/library/snslibrary');
const S3Library = require("../src/library/s3library");
const Globallinks = require('../src/helpers/links')
var dateFormat = require("dateformat");
const mediaUploadPath = require('../src/helpers/uploadFolderPath');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
let mysql = require('mysql');
let config = require('../Config.js');
var url = require('url');
let connection = mysql.createConnection(config);
const debug = require('debug')('myapp:server');
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json());



const filePath=Globallinks.VendorProfile;    
const fileUploadPath =  mediaUploadPath.vendorUploadPath ;
const doctoruploadPath = mediaUploadPath.doctorUploadPath;
const doctorMediaPath = Globallinks.docrorMediaPath

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

getDayName=(dayId)=>
{   
   return new Promise((resolve)=>{
   var dayName="";  
    switch(dayId.toString())
    {
      case "1":  
      dayName="MON";
        break;
        case "2": 
        dayName="TUE"; 
          break;  
          case "3":
            dayName="WED";
            break;
            case "4":
              dayName="THU";
              break;
              case "5":
                dayName="FRI";
                break;
                case "6":
                  dayName="SAT"; 
                  break;
                  case "7":
                  dayName="SUN";
                  break; 
                 
     
       
    } 
    console.log("dayName",dayName);
    resolve( dayName);  
   
   });          
   
} 






getMonthName=(monthId)=>
{   
   return new Promise((resolve)=>{
   var monthName=""; 
    switch(monthId.toString())
    {
      case "1":  
        monthName="JAN";
        break;
        case "2": 
          monthName="FEB";
          break;
          case "3":
            monthName="MAR";
            break;
            case "4":
              monthName="APR";
              break;
              case "5":
                monthName="MAY";
                break;
                case "6":
                  monthName="JUN";
                  break;
                  case "7":
                    monthName="JUL";
                    break;
                    case "8":
                      monthName="AUG";
                      break;
                      case "9":
                        monthName="SEP";
                        break;
                        case "10":
                          monthName="OCT";
                          break;
                          case "11":
                            monthName="NOV";
                            break;
                            case "12":
                              monthName="DEC";
                              break;
     
       
    } 
    console.log("monthName",monthName);
    resolve( monthName); 
   
   });          
   
}          


Router.get ("/",(req,res)=>{
  res.render('form');
    res.json({message:'Hello this is my first api'});
})


const multer = require('multer');
const serveIndex = require('serve-index');
const { json } = require("body-parser");
Router.use(express.static(__dirname+'/public'));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {

    
   
     var path = './public/uploads/'; 
     
     console.log(path);
     var fs = require('fs');
     if (!fs.existsSync(path)){
       console.log('nopath')
    fs.mkdirSync(path);
  }
  cb(null,path )


   
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname)
      
  }
  
});

const upload = multer({ storage: storage });

Router.use(express.json());
Router.use(express.urlencoded({ extended: false }));
Router.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));




Router.get ("/",(req,res)=>{
    res.json({message:'Hello this is my first api'});
})

Router.post('/uploadImage', upload.single('file'), function(req,res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  console.log(req)
    debug(req.file);
    console.log(req.file); 


    return res.send(req.file);
})
  Router.post('/uploadImageSingle', upload.single('file'), function(req,res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
      debug(req.file);
      console.log(req.file.path); 
      var fileinfo = req.file;
        var pics="";
        pics = fileinfo.destination.substring(8)+fileinfo.filename;
        var url = req.headers.host + '/' + pics;
        console.log(url);
        url="http://"+url;
        return res.send({"filename":url});
  })

    Router.post('/uploadImageMultiple', upload.array('file', 5), function(req,res) {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
      var fileinfo = req.files;
      var pics="";
      var object_length=Object.keys(fileinfo).length;
      for(i=0; i<object_length;i++){
        
        pics = pics + '"'+fileinfo[i].destination.substring(8)+fileinfo[i].filename+'"'
        if(i<object_length-1){
          pics = pics +',' 
        }
        
      }

      console.log(pics) ;
      return res.send(pics);
    })






module.exports=Router;
