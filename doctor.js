const express=require("express");
const jwt = require('jsonwebtoken');
var trycatch = require("trycatch");
const crypto=require("crypto");
var async = require("async");
const fileUpload = require('express-fileupload');
var tokenVerify = require('../shared/tokenVerify');
const Router=express.Router();
var cors = require('cors')
const dbcontext = require("../doctor/DB");
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
let connection = mysql.createConnection(config);
const debug = require('debug')('myapp:server');
Router.use(fileUpload());
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
        return res.send({"filename":pics});
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
  Router.post('/doctorLoginold', async function (req, res) {
    debugger;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.contentType("application/json");
   
 var mobileno=req.body.mobile_number;
 console.log(mobileno);


 let sql = "CALL doctor_login_new(@p_mobileno:="+mobileno+",@p_master_type:='doctor')";
 console.log(sql);
 try {
 
   connection.query(sql, async (err, results, fields) => {
     if (err) throw err;
     console.log('venkat1')
     
     
    
     if(results[0].length>0){

      var random=crypto.randomBytes(Math.ceil(4/2)).toString('hex');
      random=parseInt(random, 16); 
      random= Math.floor( (random) * 9000).toString().substring(0, 4);
      console.log("random",random);
      var otp_data =random;  
      req.body.msg = "<#> Your Doctor Login OTP is " + otp_data +" v3bMO93ZPZ4";
      console.log(req.body.msg);
      req.body.mobileNumber = req.body.mobile_number;   
      req.body.otp = otp_data;   
      req.body.requestTime= dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
      console.log('venkat3')
          if(results[0].otp_avail=1)
          {
            
              var send_otp1 =  send_otp(req.body); 
                if (send_otp1) { 
                    
                var insert_data =  await Insert_otp(req.body); 
                console.log('venkat4')
                connection.end();
                if (insert_data) { 
                  res.send({ status: 1, msg: 'Success', data: [] })
                }  
                else
                { 
                    res.send({ status: 1, msg: 'Failed', data: [] }) 
                }                            
                }    
          }
          else {  
           var send_otp2 =  send_otp(req.body)

           if (send_otp2) {
           var update_data =  Update_otp(req.body);
           if (update_data) {
               res.send({ status: 1, msg: 'Success', data: [] })
           }
           }
          }

     }
     else{
      res.send({status:0,msg:"Enter registered mobile number ",data:[]});
    }  
   });
   

} catch (err) {
 console.error(err);
}





    
  })



  Router.post('/doctorLogin',(req,res) => { 
             
 

    var mobileno=req.body.mobile_number;
    console.log(mobileno);
    trycatch(function(){
   
    res.contentType("application/json");
    var resultlist = dbcontext.doctorlogin(mobileno,'doctor');
    console.log(resultlist)
    if(resultlist.length>0){   
     var random=crypto.randomBytes(Math.ceil(4/2)).toString('hex');
     random=parseInt(random, 16); 
     random= Math.floor( (random) * 9000).toString().substring(0, 4);
     console.log("random",random);
     var otp_data =random;  
     req.body.msg = "<#> Your Doctor Login OTP is " + otp_data +" v3bMO93ZPZ4";
     console.log(req.body.msg);
     req.body.mobileNumber = req.body.mobile_number;   
     req.body.requestTime=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
     req.body.otp = otp_data;   
     
                             var otp_tab =  list_otp(req.body); 
                              if (otp_tab) {                            
      
                                  var send_otp1 =  send_otp(req.body); 
                                  if (send_otp1) { 
                                      
                                  var insert_data =  Insert_otp(req.body);                            
                                  if (insert_data) { 
                                      res.send({ status: 1, msg: 'Success', data: [] })
                                  }  
                                  else
                                  { 
                                      res.send({ status: 1, msg: 'Failed', data: [] }) 
                                  }                            
                                  }    
                                 
                              }
                              else {  
                               var send_otp2 =  send_otp(req.body)
   
                               if (send_otp2) {
                               var update_data =  Update_otp(req.body);
                               if (update_data) {
                                   res.send({ status: 1, msg: 'Success', data: [] })
                               }
                               }
                              }
   
    }
    else{
     res.send({status:0,msg:"Enter registered mobile number ",data:[]});
   }  
   
   
   
    },
    function(error){
     console.log('doctor login->' + error);
     
     res.status(500).send(error);
   });
   
  })

  function list_otp(data) {
    return new Promise(resolve => {  
      

      trycatch(function(){
        var resultlist= dbcontext.list_otp(data.mobile_number,'doctor');
        console.log(resultlist + "list_otp");
        if(resultlist.length==0)
        {
          resolve(true);
          return 
        }
        else {
          resolve(false);
          }
        },
        function(error){
         console.log('List otp->' + error);
         resolve(false);
        ;
       });
    

    })
  }
 
   function send_otp(data) {
    return new Promise(resolve => {
      console.log(data)
      SNSLibrary.sendSMS(data, function (error, response) {
        if (error) {
          console.log(error.message);
        } else {
          resolve(true);
        }
      })
    })
  } 



   async function Insert_otp_New(data)  {
    
      try{
      let sql = "CALL insert_otp(@p_otp_countrycode:="+data.countryCode+" "
      +",@p_otp_mobileno:="+data.mobile_number+",@p_otp:="+data.otp+",@p_otp_arrivedtime:="+data.requestTime+",@p_master_type:='doctor')";
   
        pool.query(sql, async (err, results, fields) => {
          if (err) throw err;
    
          return results[0];
        });
    }catch(err){
      console.log(err);
      return err;
    }

    

  }

  function Insert_otp(data) {
    return new Promise(resolve => {
      trycatch(function(){
       dbcontext.insert_otp(data.countryCode,data.mobile_number,data.otp,data.requestTime,'doctor');
      console.log('insert otp success')
      resolve(true);
      },
      function(error){
        
       console.log('Insert otp->' + error);
       resolve(false);
      
     });


    })

  }


  


    async function Update_otp_New(data)  {
    
      try{
      let sql = "CALL update_otp(@p_otp_mobileno:="+data.mobile_number+",@p_otp:="+data.otp+",@p_otp_arrivedtime:="+data.requestTime+",@p_master_type:='doctor')";
    
      if (value) {
        return value[0];
      } else {
        pool.query(sql, async (err, results, fields) => {
          if (err) throw err;
    
          return results[0];
        });
      }
    }catch(err){
      console.log(err);
      return err;
    }

    

  }


    function Update_otp(data) {
      return new Promise(resolve => { 
        trycatch(function(){
          res.contentType("application/json");
           dbcontext.update_otp(data.mobile_number,data.otp,data.requestTime,'doctor');
          console.log('update otp success')
          resolve(true);
          },
          function(error){
           console.log('Insert otp->' + error);
           res.send(errorCode.errorCodeResponse(error));
           res.status(500).send(error);
         });

   

      })
    }


    Router.post("/verifyDoctorOTP", async function (req, res) {

      const mediapath = Globallinks.mediapath
      var reqParam=req.body; 
     
      try {
      
        var response =dbcontext.verify_doctor_otp(req.body.mobile_number,req.body.otp,'doctor');

       
          console.log(response)
          if(response.length>0)
          {

            var otp_arraived_time=response[0].otp_arraived_time;
            var timeDifference=   ((  req.body.requestTime-otp_arraived_time)/1000)/60;
            console.log(parseInt(timeDifference));
              var resultlist =dbcontext.Get_User_Master(req.body.mobile_number,mediapath);
              if (resultlist.length > 0) { 
                res.send({ status:1,msg:"success",data:resultlist });
                return;                     

              }
              else
              {
                res.send({ status:1,msg:"Invalid mobile number",data:[] });
                return;
              }
          }
else
{
          res.send({ status: 0, msg: 'Failed', data: response }); 
}

    } catch (err) {
      console.log(err);
    }






      })

      Router.post("/getDoctorDetails", async function(req, res) {

        var doctorId=req.body.doctorId;    
        var path = filePath;   

        trycatch(function(){
          res.contentType("application/json");
          console.log('venkat',doctorId,req.body.doctorId);
          var response =dbcontext.getvendordetails(doctorId,path);
          if (response.length>0)
          {
            console.log("response",response) ;   
            response.forEach( async(item,i)=>{      
              response[i].speciality=await getdoctorSpeciality(doctorId) ;   
         
              response[i].clinic= await getdoctorClinics(doctorId) ;            
              if(i==response.length-1) 
              {   
                 res.send({status:1,msg:"success",data:response});
              }      
         
            });  

          }
          else
          {               
                res.send({status:1,msg:"success",data:response});
          }       
      
        },             
        function(error){
         console.log('Get User Master-->' + error);
         res.send(error);
         res.status(500).send(error);
       });
      });
      function getdoctorSpeciality(doctor_id)
      {    
        return new Promise((resolve)=>{  

          trycatch(function(){
            var response =dbcontext.getdoctorspeciality(doctor_id);
            resolve(response);
          },function(error){
            resolve([]); 
            console.log('Get Doctor Sepeciality-->' + error);
         
          });

        
            
        }  ) 
      } 
       
      function getdoctorClinics(doctor_id)
      {  
        return new Promise((resolve)=>{
          trycatch(function(){
            var response =dbcontext.getdoctorclinics(doctor_id);
            resolve(response);
          },function(error){
            resolve([]); 
            console.log('Get Doctor Clinics-->' + error);
          
          });


          }  )   
      }                  
      

      Router.put("/editDoctorDetails", async function(req, res) {
        var query="",doctorId;     
        var reqParams=req.body;   

      
       var docspecialityId=(reqParams.specialityId);
        var docclinicId=(reqParams.clinicId);  
        doctorId=reqParams.doctorId;            
        var deleteClinicId =(reqParams.deleteClinicId);  
        var deleteSpecId =(reqParams.deleteSpecId);    
       

      var deleteClinicInfo= callDeleteDocClinics(deleteClinicId,doctorId);
    
       var deleteSpeciInfo= callDeleteDocSpecial(deleteSpecId,doctorId);
    
      var insertDocClinicsInfo= callInsertDocClinics(docclinicId,doctorId);
   
      var insertDocDocSpeciality= callInsertDocSpeciality(docspecialityId,doctorId);
    
    console.log('Edit details');
      trycatch(function(){
         var response =dbcontext.EditDoctordetails(reqParams.dob,reqParams.selfDescription
          ,reqParams.website,reqParams.nationalityId,reqParams.qualification
          ,reqParams.practiceSince,reqParams.mobile,reqParams.email,reqParams.address
          ,reqParams.file_name ,reqParams.file_path,doctorId);

         res.send({status:1,msg:"Profile saved successfully",data:response});

       },function(error){
         
         console.log('Edit Doctor Details-->' + error);
      
       });



      }) ;        
  


  function callDeleteDocClinics(deleteClinicId,doctorId)
 {
   return new Promise((resolve)=>{ 
     var exeQuery="";  
     console.log("deleteClinicId",deleteClinicId);
     if(deleteClinicId.length>0){   
       var d_clinics_id=[]
       d_clinics_id=deleteClinicId.split(',');

       for (index=0;index<=d_clinics_id.length-1;index++)  {

   
       var output= deleteDocClinics(d_clinics_id[index],doctorId);   
              
       console.log("deleteDocClinics",output);     
           if(index == d_clinics_id.length-1)
           {  
           resolve({status:"1",msg:"Success"});   
           }
       }                   
     }
     else{
       resolve([]);   
     }          
   } )   ;
 } 
 



 function deleteDocClinics(clinicId,doctor_id)
 { 
  return new Promise( resolve =>{  


     trycatch(function(){
           var response =dbcontext.DeleteDoctorClicnics(clinicId,doctor_id);
           
           if(response.length>0)  
           { 
             resolve({ status: 1, msg: true });  
             console.log({ status: 1, msg: true });      
           }
           else
           {    
             resolve({ status: 1, msg: false });   
            
           }  
     

         },function(error){
           resolve({ status: 0, msg:false}); 
           console.log('Delete Doctor Clinics-->' + error);
          
         });


   }
  );  
 } 
 function callDeleteDocSpecial(deleteSpecId,doctorId)
{
  return new Promise((resolve)=>{ 
    var exeQuery="";  
    if(deleteSpecId.length>0)
    {    
          
        var d_spl_id=[]
      d_spl_id=deleteSpecId.split(',');

      for (index=0;index<=d_spl_id.length-1;index++)  {   
  
      var output= deleteDocSpecial(d_spl_id[index],doctorId);    
             
          if(index == d_spl_id.length-1)
          {  
          resolve({status:"1",msg:"Success"});   
          }
      }                  
    }
    else{
      resolve([]);   
    }          
  } )   ;
} 

function deleteDocSpecial(deleteSpecId,doctor_id)
{  
 return new Promise( resolve =>{  
    
  trycatch(function(){
    
     var response =dbcontext.DeleteDoctorSpeciality(deleteSpecId,doctor_id);
     
     if(response.length>0)  
     { 
       resolve({ status: 1, msg: true });  
       console.log({ status: 1, msg: true });      
     }
     else
     {    
       resolve({ status: 1, msg: false });   
      
     }  


   },function(error){
     resolve({ status: 0, msg:false}); 
     console.log('Delete Doctor Speciality-->' + error);
   });



  }
 );  
}

 function callInsertDocClinics(docclinicId,doctorId)
{      
  return new Promise((resolve)=>{ 
    var exeQuery="";   
    if(docclinicId.length>0){       
      
      var c_id=[]
      c_id=docclinicId.split(',');
      
      console.log("venkat clinicid",c_id)
      for (index=0;index<=c_id.length-1;index++)  {
     
      var output= insertDocClinics(c_id[index],doctorId);                 
          if(index == docclinicId.length-1)
          {  
          resolve({status:"1",msg:"Success"});   
          }         
                  
      
      } 
      
    }
    else{
      resolve([]);   
    }          
  } )   ; 
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
function insertDocClinics(docclinicId,doctor_id)
{    
 return new Promise( resolve =>{   

  trycatch(function(){

     var response =dbcontext.InserDoctorClinic(docclinicId,doctor_id);
     
     if(response.length>0) 
     {   
       resolve({ status: 1, msg: true });     
       console.log({ status: 1, msg: true });      
     }
     else
     {    
       resolve({ status: 1, msg: false });   
       
     }  


   },function(error){
    resolve({ status: 0, msg:false});   
   console.log('Insert Doctor clinics-->' + error);
   });



  }
 );   
} 

 
function checkDuplication(docclinicId,doctorId)
{
  return new Promise((resolve)=>{ 
   
    trycatch(function(){
       var result =dbcontext.CheckDuplicaton(docclinicId,doctorId);
       
       if(result.length>0)
       { 
         resolve({status:false,msg:"Duplication record"});
       } 
       else
       {  
         resolve({status:true,msg:"Success"});
       }  
  
     },function(error){
     resolve({status:false,msg:error});
     console.log('check Duplicatioin-->' + error);
     });

   
  }) 
   
}
 function callInsertDocSpeciality(docspecialityId,doctorId)
{  
  return new Promise(async (resolve)=>{ 
    var exeQuery="";  
    
    if(docspecialityId.length>0){       
      
       var spl_id=[]
      spl_id=docspecialityId.split(',');

      console.log("venkat Speciality",spl_id)
      for (index=0;index<=spl_id.length-1;index++)  {

        var output= insertDocSpeciality(spl_id[index],doctorId);                 
          if(output.msg)
          {
        resolve({status:"1",msg:"Success"});   
        } 
        else{
          resolve([]);   
        } 
      }
    }



          
  } )   ; 
} 



function insertDocSpeciality(docSpecialityId,doctor_id)
{      
 return new Promise( async(resolve) =>{  


  trycatch(function(){
     var response =dbcontext.InsertUpdateDoctorSpeciality(docSpecialityId,doctor_id);
     if(response.length>0)
     {  
       resolve({ status: 1, msg: true });  
       console.log({ status: 1, msg: true });      
     }
     else
     {    
       resolve({ status: 0, msg: false });   
     }  

   },function(error){
    resolve({ status: 0, msg:false});  
   console.log('Insert & Update Doctor speciality-->' + error);
   });

    
  

  }
 );  
}  


 
 function  SingleImageUpload (data,id,tableName,columnName,columnFor,iconUploadPath) 
{         
      
  var modifiedFN;         
  var result
  return new Promise( (resolve)=>{       
    if(data.length>0)
    {          
       async.forEachOf( 
        data,  
        function (obj, index, callback) {

          console.log("id",id);     
          imageName = id + "-" + new Date().getTime() + "-" + ((obj.name).replace(/\s/g, '_'));
          obj.name = imageName;   
          obj.uploadDirectory = iconUploadPath;  
          console.log("iconUploadPath",iconUploadPath);   
          console.log(obj);
          S3Library.UploadFile(obj, function (error, success) {
            console.log(obj);
            if (error) {
              console.log("err", error);    
            } else { 
              console.log(obj);

              trycatch(function(){
        console.log('tableName',tableName);
        console.log('columnName',columnName);
        console.log('imageName',imageName);
        console.log('columnFor',columnFor);
        console.log('id',id);

                result =dbcontext.update_tablename(tableName,columnName,imageName,columnFor,id);
                console.log("imageUpload mas_vendor update Success:",result);
               
              },function(error){
                resolve([]); 
                console.log("imageUpload mas_vendor update error:",error);
               
              });


        resolve({ status: true, response: result });

            }   
             callback();
          });
        },
        function (error) {
          if (error) {
            console.log(error.message);
            resolve({ status: false, response: error.message });
          } else {
            resolve({ status: true, response: true });
          }
        }
      );
      }

 } );
}



Router.post('/getdoctorspecialitywise',async (req,res)=>{
  var reqParams = req.body;   
  var path =  Globallinks.VendorProfile ; 

  try{
  
  trycatch(function(){
    res.contentType("application/json");
    var response =dbcontext.getdoctorspecialityByid(path,reqParams.specialityId);
     res.send({ status: 1, msg: 'Success', data: response }); 
    
  },function(error){
  
  console.log('Get Doctor speeciality-->' + error);
  res.send({ status: 0, msg: 'Failed', data: error }); 
  });

}
catch(err){
  console.log('Get Doctor speeciality-->cache erro' + err);
}

});

Router.get('/getNationality',async (req,res)=>{
try{
 
  trycatch(function(){
     res.contentType("application/json");
     var response =dbcontext.GetNationality();
     console.log(response);
     if(response.length>0)
     { 
      res.send({ status: 1, msg: 'Success', data: response }); 
     } 
     else
     {  
      res.send({status:true,msg:"Success"});
     }  

   },function(error){
   
   console.log('Get Nationality-->' + error);
   res.send({ status: 0, msg: 'Failed', data: error }); 
   });
  }
catch(err){
  console.log('Get Nationality-->cache erro' + err);
}
  });
   
  Router.get('/getClinicList',async (req,res)=>{
  try{
  
  trycatch(function(){
    
   

    res.contentType("application/json");
    var response =dbcontext.GetClinicList();
    
    if(response.length>0)
    { 
     res.send({ status: 1, msg: 'Success', data: response }); 
    } 
    else
    {  
      res.send({status:true,msg:"Success"});
    }  
 
  },function(error){
  
  console.log('Get Clinic List-->' + error);
  res.send({ status: 0, msg: 'Failed', data: error }); 
  });


}
  catch(err){
    console.log('Get Clinic List-->cache erro' + err);
  }
  });     
      

  Router.delete('/deleteDeals',(req,res)=>{
    var reqParams = req.body; 
    if(reqParams.id)
{
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.DeleteDeals(reqParams.id);
      
      if(response.length>0)
      { 
       res.send({ status: 1, msg: 'Success', data: response }); 
      } 
      else
      {  
        res.send({status:true,msg:"Success"});
      }  
  
    },function(error){
    
    console.log('Delete Deals-->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
}
     else
     { 
      console.log("id",reqParams.id);    
       res.send({ status: 0, msg: 'Failed', data: ["Deals id can not be null or undefined"]}); 
     } 
    });     
      
  Router.get('/getDoctorSpeciality',async (req,res)=>{

try
{
 

    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.GetDoctorSpeciality(doctorMediaPath);
       if(response.length>0)
      { 
       res.send({ status: 1, msg: 'Success', data: response }); 
      } 
      else
      {  
        res.send({status:true,msg:"Success"});
      }  
  
    },function(error){
    
    console.log('Get Doctor speeciality-->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
  }
  catch(err){
    console.log('Get Nationality-->cache erro' + err);
  }
   });   
   
   Router.get('/getlabList',async (req,res)=>{
  try
  {
    

    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.get_laplist();
       if(response.length>0)
      { 
        
       res.send({ status: 1, msg: 'Success', data: response }); 
      } 
      else
      { 
        res.send({ status: 1, msg: 'Success', data: response }); 
      }  
  
    },function(error){
    
    console.log('Get Lap List-->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  }
catch(err){
  console.log('cache error' + err);
}
  });
  
  Router.post('/getlabTestList',async (req,res)=>{
    var reqparam= req.body;   
    try
    {
      
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.get_laptestlist(reqparam.labId);
       if(response.length>0)
      { 
       res.send({ status: 1, msg: 'Success', data: response }); 
      } 
      else
      {  
        res.send({ status: 1, msg: 'Success', data: response }); 
      }  
    
    },function(error){
    
    console.log('Get Laptest List-->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
       
      }
    catch(err){
      console.log('cache error' + err);
     }
  });  
  
  Router.post("/getDoctorClinics",async function(req, res) {
    try
    {
     

    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.getdoctorclinicsbyid(req.body.doctorId);
       if(response.length>0)
      { 
       res.send({ status: 1, msg: 'Success', data: response }); 
      } 
      else
      {  
        res.send({ status: 1, msg: 'Success', data: response }); 
      }  
  
    },function(error){
    
    console.log('Get Laptest List-->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
  }

catch(err){
  console.log('cache error' + err);
 }
  }) 

  Router.post("/getsingleDeals", async function (req, res) {
try{
 
    console.log("singledeal",req.body,typeof req.body.limit)
      var reqParams= req.body;   
       var pageno=reqParams.pageno; 
    
      if(reqParams.limit==undefined || reqParams.limit=="0" ||reqParams.limit=="" )
      {  
        res.send({ status: 0, msg: "Enter Valid Limit", data: [] }); 
      }
      console.log(reqParams.pageno);  
      if(reqParams.pageno==undefined )     
      {      
      res.send({ status: 0, msg: "Enter Valid Page Number", data: [] });    
      }     
      var offset=(pageno-1)*reqParams.limit; 
      var Nextoffset=(pageno)*reqParams.limit ;    
      var getServiceName=await getServiceNames(req.body.doctorid); 
      var total_count;
      
        trycatch(function(){
          res.contentType("application/json");
          var resultlist =dbcontext.getdoctormasdealcount(req.body.doctorid);
          total_count=resultlist[0].total_count;   
            
        },function(error){
        
        console.log('Get doctordeals count -->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
        });
      
    
    
        trycatch(function(){
          res.contentType("application/json");
          
           var response =dbcontext.getdoctorsingledeails(req.body.doctorid,reqParams.limit,offset,Nextoffset);
           var responsenextcount =dbcontext.getdoctorsingledeailsnextcount(req.body.doctorid,reqParams.limit,offset,Nextoffset);
          var details = response;    
         if(details.length>0 && getServiceName.length>0) 
         {  
    
          details.forEach((value,index)=>
          {        
            var deal_service_type=getServiceName.filter((val)=> val.id== details[index].deal_service_type_id);
            if(deal_service_type.length>0)
            {
              details[index].deal_service_type=deal_service_type[0].service_type;
              console.log("deal_service_type[0].service_type",deal_service_type[0].service_type); 
            } 
            else
            {  
              details[index].deal_service_type="";
            }  
            console.log("details[index]",details[index]); 
            console.log("details[index].deal_service_type_id",details[index].deal_service_type_id)
    
          })
         }  
         console.log(responsenextcount);
          var nextCount = responsenextcount[0].NextRowCount; 
          res.send({ status: 1, msg: "Success", data: [{details:response,nextCount:nextCount,totalCount:total_count}]});  
                
        },function(error){
        
        console.log('Get doctor single deals -->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
        });
    
}catch(err){
  console.log('cache error' + err);
 }
    
    })   

    

async function getServiceNames(doctor_id)
{  
  return new Promise((resolve)=>{

    trycatch(function(){
      
      var response =dbcontext.getservicenames(doctor_id);
      resolve(response);
    },function(error){
    
    console.log('Get doctordeals count -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });


  })
} 


Router.post("/insertDeals", async function (req, res) {
 
  
    var dealtitle=req.body.dealtitle;

    
    trycatch(function(){
      var dealvalidfrom=req.body.dealvalidfrom;
      var dealvalidto=req.body.dealvalidto;
      var dealoptions=req.body.dealoptions;
      var dealamount=req.body.dealamount;
      var dealactive=req.body.dealactive;
      var dealservicetypeId=req.body.dealservicetypeId;
      var dealvendorId=req.body.dealvendorId;
      var userId=req.body.userId;
      var activeflag=req.body.activeflag;
      var createdby=req.body.createdby;
      var createdon=req.body.createdon;
      var modifiedby=req.body.modifiedby;
      var modifiedon=req.body.modifiedon;
      var ipaddress=req.body.ipaddress;

      var response =dbcontext.InserDeails(dealtitle,dealvalidfrom,dealvalidto
        ,dealoptions,dealamount,dealactive,dealservicetypeId,dealvendorId
        ,userId,activeflag,createdby,createdon,modifiedby,modifiedon,ipaddress);

       
      res.send({ status: 1, msg: "Success", response  });
      

    },function(error){
    
    console.log('Insert Deals-->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
  
})  

Router.put("/editDeals",async function (req, res) {
  var reqParams=req.body;
  var exeQuery="";
  
var dealvalidfrom=formatDate(req.body.dealvalidfrom);
var dealvalidto=formatDate(req.body.dealvalidto);
  trycatch(function(){
      console.log(req.body);
    var response =dbcontext.EditDeals(req.body.dealtitle,dealvalidfrom,dealvalidto,req.body.dealoptions
      ,req.body.dealamount,req.body.dealactive,req.body.dealservicetypeId,req.body.dealvendorId
      ,req.body.userId,req.body.activeflag,req.body.createdby,req.body.createdon,req.body.modifiedby
      ,req.body.modifiedon,req.body.ipaddress,req.body.id);
      
    res.send({ status: 1, msg: "Updated", data: response });
  },function(error){
  
  console.log('Edit Deals -->' + error);
  res.send({ status: 0, msg: "Invalid Deal", data: [] });
  });
  

 
  
})


Router.post("/mediauploaddetails", async function  (req, res) {

  var reqParams= req.body;  
  var pageno=reqParams.pageno;  
  try {
   

 if(reqParams.limit==undefined || reqParams.limit=="0" ||reqParams.limit=="" )
 {  
   res.send({ status: 0, msg: "Enter Valid Limit", data: [] }); 
 }
 console.log(reqParams.pageno);  
 if(reqParams.pageno==undefined )    
 {      
 res.send({ status: 0, msg: "Enter Valid Page Number", data: [] });    
 }
 var offset=(pageno-1)*reqParams.limit; 
 var Nextoffset=(pageno)*reqParams.limit;        
 var path =filePath;   
 
 console.log(offset,Nextoffset,'venkat')
 var nextCount
 trycatch(function(){
   res.contentType("application/json");
   var resultlist =dbcontext.mediauploaddetailscount(req.body.doctorid,reqParams.limit,offset);
   nextCount=resultlist[0].NextRowCount;   
     
 },function(error){
 
 console.log('Get Media upload count -->' + error);
 res.send({ status: 0, msg: 'Failed', data: error }); 
 });

 trycatch(function(){
   res.contentType("application/json");
   var response =dbcontext.mediauploaddetails(req.body.doctorid,reqParams.limit,reqParams.pageno,path);
   var details = response;     
   
   console.log({details:details,nextCount:nextCount}); 
   
   res.send({ status: 1, msg: "Success", data: [{details:details,nextCount:nextCount}]});   
 },function(error){
 
 console.log('Get Media Uplaod details -->' + error);
 res.send({ status: 0, msg: 'Failed', data: error }); 
 });
  }catch(err){
    console.log('cache error' + err);
   }

})


Router.post('/insertMediaUpload',async (req,res)=>{
  console.log(req.body);
  var reqParams = req.body;  
    var mediatitle=reqParams.mediatitle;
    var mediatype=reqParams.mediatype;
    var mediadescription=reqParams.mediadescription;
    var mediavendorId=reqParams.mediavendorId;
    var isactive=reqParams.isactive;
    var activeflag=reqParams.activeflag;
    var createdby=reqParams.createdby;
    var ipaddress=reqParams.ipaddress;
    var sortorder=reqParams.mediasortorder;
    var file_name=reqParams.file_name;
    var file_path=reqParams.file_path;
    var file_thumbnail_path=reqParams.file_thumbnail_path;
    console.log(reqParams.mediavendorId)
  trycatch(async function(){
    
  
    var response =dbcontext.MediaUploadsInserDeails(mediatitle,mediatype,sortorder,mediadescription
      ,mediavendorId,isactive,activeflag,createdby,ipaddress,file_name,file_path,file_thumbnail_path);
      var mediaId = response[0].p_return_value; 
      
     res.send({ status: 1, msg: "Post Uploaded Successfully", data: []  });
    
    
  
  },function(error){
  
  console.log('Insert Media Upload Deals-->' + error);
  res.send({ status: 0, msg: 'Failed', data: error }); 
  });
  
  
  }); 
  
  Router.put("/editMediaUpload", function (req, res) {
    var reqParams = req.body; 
    console.log(req.body);

    var mediatitle=req.body.mediatitle;
    var mediatype=req.body.mediatype;
    var mediadescription=req.body.mediadescription;
    var mediavendorId=req.body.mediavendorId;
    var isactive=req.body.isactive;
    var activeflag=req.body.activeflag;
    var modifiedby=req.body.modifiedby;
    var ipaddress=req.body.ipaddress;
    var id=req.body.id;
    var mediasortorder=req.body.mediasortorder
    var file_name=req.body.file_name;
    var file_path=req.body.file_path;
    var file_thumbnail_path=req.body.file_thumbnail_path;
     
  trycatch(function(){
    
   var response =dbcontext.MediaUploadsUpdateDeails(mediatitle,mediatype,mediasortorder,mediadescription
      ,mediavendorId,isactive,activeflag,modifiedby,ipaddress,file_name,file_path,id,file_thumbnail_path);

      var mediaId = req.body.id;

       res.send({ status: 1, msg: "Post Updated Successfully", data: response  });
      
  },function(error){
  
  console.log('Insert Media Upload Deals-->' + error);
  res.send({ status: 0, msg: 'Failed', data: error }); 
  });
})

Router.delete('/deleteMediaUpload',(req,res)=>{
  var reqParams = req.body; 
  console.log("req.body",req.body);  

  
  if(reqParams.id==null || reqParams.id==undefined )
  {
    res.send({ status: 0, msg: "Invalid id value id:"+ reqParams.id , testFormat:req.body }); 
    return;
  }  
  
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.MediauploadDelete(reqParams.id);
      res.send({ status: 1, msg: 'Media Deleted Successfully', data: response,testFormat:req.body }); 
        
    },function(error){
    
    console.log('Delete Media upload -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error,testFormat:req.body }); 
    });
  
  });


  Router.post("/getAdBooking", async  function (req, res) {
try
{
  
    var reqParams= req.body;   
    var pageno=reqParams.pageno; 
      
  
  if(reqParams.limit==undefined || reqParams.limit=="0" ||reqParams.limit=="" )
  {  
    res.send({ status: 0, msg: "Enter Valid Limit", data: [] }); 
  }
  console.log(reqParams.pageno);  
  if(reqParams.pageno==undefined )    
  {      
  res.send({ status: 0, msg: "Enter Valid Page Number", data: [] });    
  }         
  console.log("query here");     
  var offset=(pageno-1)*reqParams.limit;   
  var Nextoffset=(pageno)*reqParams.limit ;     
    var path =filePath;
    var total_count;
    
  
    trycatch(function(){
      res.contentType("application/json");
      var resultlist =dbcontext.getAddbookingcount(req.body.doctorid);
      total_count=resultlist[0].total_count;   
        
    },function(error){
    
    console.log('Get doctordeals count -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
  
  
       
    trycatch(function(){
      res.contentType("application/json");
      
       var response =dbcontext.getAdBooking(req.body.doctorid,reqParams.limit,offset,Nextoffset);
          
         
       var details,object_length,nextCount
          if (response.length>0)
          {
            var details = response;
            var placementLocation =dbcontext.getMas_placementlocation();
            console.log('venkat',details,response);

           details = response;  
           object_length=Object.keys(details).length;
  
                console.log(object_length.length);
                
                for (i=0;i<=object_length.length-1;i++)
                {
                  console.log(details[i].ad_location_id);
                var ad_location=placementLocation.filter((val)=>val.id==details[i].ad_location_id)
                console.log(ad_location);
                if(ad_location.length>0)
                {
                details[i].ad_location=ad_location[0].ad_location;
                }
                else
                {
                  details[i].ad_location=""; 
                }      
                }
                      
           
            nextCount = response[0].NextRowCount;
          }  
          else
          {
            details=[]
            nextCount=0
          }
         
          res.send({ status: 1, msg: "Success", data: [{details:details,nextCount:nextCount,total_count:total_count}]});          
  
  
    },function(error){
      
      console.log('Get Ad Booking -->' + error);
      res.send({ status: 0, msg: 'Failed', data: error }); 
      });
  
  
  }catch(err){
    console.log('cache error' + err);
   }

  })      
  
  Router.get('/get_mas_placement_location',async (req,res)=>{
try {
  
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.getMas_placementlocation();
      res.send({ status: 1, msg: 'Success', data: response }); 
        
    },function(error){
    
    console.log('Get Placement Master -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  }catch(err){
    console.log('cache error' + err);
   }
  }); 
  
  Router.get('/get_mas_size_master',async (req,res)=>{
try {
 
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.get_SizeMaster();
      res.send({ status: 1, msg: 'Success', data: response }); 
        
    },function(error){
    
    console.log('Get Size Master -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  } catch(err){
    console.log('cache error' + err);
   }
  }); 

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

  Router.post('/get_ad_rate_vendor',async (req,res)=>{

    var reqParam=req.body;  
    try{
     
    if(reqParam.vendor_type_id == null|| reqParam.vendor_type_id==undefined || reqParam.vendor_type_id==""||reqParam.placement_location_id == null|| reqParam.placement_location_id==undefined || reqParam.placement_location_id==""||reqParam.size_id == null|| reqParam.size_id==undefined || reqParam.size_id=="" )
    {
      res.send({ status: 0, msg: 'Invalid Values. Check vendor_type_id or placement_location_id or size_id  ', data: [] });  
    }    
          
       
  
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.Get_ad_rate_vendor(reqParam.vendor_type_id,reqParam.placement_location_id,reqParam.size_id);
      if(response.length>0) 
      {
      res.send({ status: 1, msg: 'Success', data: response });  
      }
      else  
      {
      res.send({ status: 1, msg: 'Success', data: [{rate:0}] }); 
      }  
        
    },function(error){
    
    console.log('Get Ad Vendor Rate -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
 // }

} catch(err){
  console.log('cache error' + err);
 }
   }); 
  

   Router.post('/insertAdBooking',(req,res)=>{
    console.log(req.body); 
    var reqParams = req.body; 
  
  
    trycatch(function(){
      res.contentType("application/json");
      var response =dbcontext.InsertAdBooking(reqParams.adtitle,reqParams.startdate,reqParams.endDate,reqParams.adsize
        ,reqParams.adtotaldays,reqParams.adlocationId,reqParams.adfeeperday,reqParams.adtotalcost,reqParams.advendorId,reqParams.activeflag
        ,reqParams.createdby,reqParams.modifiedby,reqParams.ipaddress,reqParams.file_name,reqParams.file_path);
        var adId = response[0].p_return_value; 
  
        res.send({ status: 1, msg: "Advertisment added successfully", data: response  });    
        
    },function(error){
    
    console.log('Insert Ad Booking -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
    });  
  

    Router.post('/editAdBooking',async (req,res)=>{

      console.log(req.body);    
      var reqParams = req.body;       
      var ad_id=req.body.ad_id;      
   
      console.log(ad_id);
      var ad_date= await getAdvertisementDate(ad_id);
      console.log(ad_date,'venkat');
      console.log("ad_date.data",ad_date.data);
      console.log("ad_date",ad_date);      
    
     
      console.log(ad_date.data);
      var enddate;
      if (ad_date.data.length>0)
      {enddate=new Date(ad_date.data[0].ad_end_date);  
      }
      else{enddate=new Date();}
  
      var todaydate=new Date();     
      console.log("enddate",enddate);  
      console.log("todaydate",todaydate); 
      var diffDays = parseInt((todaydate - enddate) / (1000 * 60 * 60 * 24), 10); 
      console.log("diffDays",diffDays); 
           
      if(diffDays>0)
      {  
        res.send({ status: 0, msg: "Advertisement expired", data: []  });     
      } 
      else{          
  
  
      trycatch(function(){
        res.contentType("application/json");
        var response =dbcontext.UpdateAdBooking(reqParams.adtitle,reqParams.startdate,reqParams.endDate,reqParams.adsize
          ,reqParams.adtotaldays,reqParams.adlocationId,reqParams.adfeeperday,reqParams.adtotalcost,reqParams.advendorId,reqParams.activeflag
          ,reqParams.createdby,reqParams.modifiedby,reqParams.ipaddress,reqParams.file_name
          ,reqParams.file_path,reqParams.id);
  
      
          res.send({ status: 1, msg: "Advertisement updated successfully", data: response  });        
          
      },function(error){
      
      console.log('Update Ad Booking -->' + error);
      res.send({ status: 0, msg: 'Failed', data: error }); 
      });
  
  
  
  
      } 
      });  
  
  
   var getAdvertisementDate=(id)=>
  {
   return new Promise((resolve)=>{
  
  
    trycatch(function(){
      var response =dbcontext.GetAdvertDate(id);
            resolve({status:0,msg:"Success",data:response});
        
    },function(error){
    
    console.log('Get Advert Date-->' + error);
    });
  

  
   })
  
  }
  
  

  
  Router.delete('/deleteAdBooking',(req,res)=>{
    var reqParams = req.body; 
  
  
    trycatch(function(){
        
      var response =dbcontext.deleteadbooking(reqParams.id);
      var details = response;     
      console.log("Deleted Rows:",response.affectedRows);  
      if(response.affectedRows==0)
      { 
       res.send({ status: 0, msg: 'Deletion failed ', data: details,format:reqParams});  
      }  
      else 
      { 
      res.send({ status: 1, msg: 'Ad deleted sucessfully', data: details});  
      } 
    },function(error){
    
    console.log('Delete Master ad booking -->' + error);
    res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
  
    });          
  
    Router.get('/get_mas_appointment_type', async (req,res)=>{
try {
 
      trycatch(function(){
          
        var response =dbcontext.get_masappointment_type();
            res.send({ status: 1, msg: 'Success', data: response }); 
      },function(error){
      
      console.log('Get Master Appointment Type -->' + error);
      res.send({ status: 0, msg: 'Failed', data: error }); 
      });
}  catch(err){
  console.log('cache error' + err);
 }
    
     }); 
    


 
Router.post("/getdocAppointmentSettings", async function (req, res) {
  var reqParams= req.body; 
  var pageno=reqParams.pageno;  
  try  
{

      if(reqParams.limit==undefined || reqParams.limit=="0" ||reqParams.limit=="" )
      {  
        res.send({ status: 0, msg: "Enter Valid Limit", data: [] }); 
      }
      console.log(reqParams.pageno);  
      if(reqParams.pageno==undefined )    
      {      
      res.send({ status: 0, msg: "Enter Valid Page Number", data: [] });    
      }  
        
      var offset=(pageno-1)*reqParams.limit; 
      var Nextoffset=(pageno)*reqParams.limit ;     
            

      trycatch(function(){
        res.contentType("application/json");
        var response =dbcontext.getdoctorappointemntsettings(req.body.doctorId,req.body.clinicId,reqParams.limit,offset,Nextoffset);
        var total_count=response[0].total_count; 

          var details = response;  
            var nextCount = response[0].NextRowCount;   
            console.log("Length",details.length); 
            if(details.length>0)
            {  
            details.forEach(async(value,index)=>{
                var day_id = await getdays(details[index].id); 
                console.log({day_id:day_id})  ;
                console.log("details[index]",details[index].id);
                details[index].day = day_id
                
              console.log({details:details});                                 
            
            if(index == details.length - 1){ 
              res.send({ status: 1, msg: "Success", data: [{details:details,nextCount:nextCount,totalCount:total_count}]});    
            }
              })  
            }
            else 
            { 
              res.send({ status: 1, msg: "Success", data: [{details:details,nextCount:nextCount}]});    
            } 
        

      },function(error){

      console.log('Get Nationality-->' + error);
      res.send({ status: 0, msg: 'Failed', data: error }); 
      })
}catch(err){
  console.log('cache error' + err);
 }

})

async function getdays(appointment_id){
  console.log({dayappointment_id:appointment_id});       
  return new Promise (resolve =>{   
    

    trycatch(function(){
          
      var response =dbcontext.GetAppointmentdays(appointment_id);
     var  data=response;
      if(response.length>0){
        if(data[0].day_id != null){
 
          resolve(data[0].day_id.split(',')); 
        }else{
          resolve([])
        }
      }else{
        resolve([])
      }

    },function(error){
      resolve([]); 
    console.log('Get Master Appointment Days -->' + error);
    });

  }); 
 
 }
 



 Router.post('/insertdocAppointmentSettings', async (req,res)=>{
  console.log(req.body);
  var days=req.body.days;         


  var dayslist=days
  days2=days
  trycatch(function(){
    console.log(dayslist);
   
    var validationResult= dbcontext.getvalidation(req.body.doctorId,req.body.fromtime,req.body.totime,dayslist)
   
  console.log(validationResult);
  if(validationResult.length>0) 
  {
    res.send({ status: 0, msg: 'Appointment time already scheduled', data: [] });     
    return;
  } 
  else
  {
    trycatch(function(){
    console.log(dayslist);
    var response=dbcontext.Insertdocappointments(req.body.clinicId
      ,req.body.doctorId,req.body.fromtime
      ,req.body.totime,req.body.slotduration
      ,req.body.NoOfslots,req.body.appointmentType
      ,req.body.createdby,req.body.ipaddress,dayslist)
    console.log(response);
    var appointment_id=response[0].p_return_value;
   console.log(appointment_id);
  
   
   
   console.log('day array',dayslist)
  
         
      trycatch(function(){

        var response2= dbcontext.InsertMasAppointmentDays(dayslist,appointment_id)
        res.send({ status: 1, msg: 'Appointment added successfully', data: response2 });
        
       
      },function(error){
        
        console.log('Insert Appointment Days -->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
        });

      

      },function(error){
        
        console.log('Insert Appointment -->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
        });
  }
},function(error){
    
  console.log('Get Appointment Id -->' + error);
  res.send({ status: 0, msg: 'Failed', data: error }); 
  });
  

});    


Router.put('/editdocAppointmentSettings',async (req,res)=>{

  try
  {
  var reqParams = req.body;  
  var query ="";       
  let doctorId,clinicId,fromTime,toTime;
  var days=reqParams.days;    
  var dayslist=days.replace('[','');
  dayslist=dayslist.replace(']','');

  trycatch(function(){
    console.log(dayslist);
    var response=dbcontext.Editdocappointments(reqParams.id
     ,req.body.slotduration
      ,req.body.NoOfslots,req.body.appointmentType
      ,req.body.modifiedby,req.body.ipaddress,dayslist
      ,req.body.fromtime,req.body.totime
      )
      res.send({ status: 1, msg: 'Appointment modified successfully', data: response }); 
 },function(error){
        
        console.log('Edit Appointment  -->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
  });



  }
  catch(ex)
  {
    res.send({ status: 0, msg: 'Failed', data: ex }); 
  }
  });       


  Router.delete('/deletedocAppointmentSettings',async (req,res)=>{

    try
    {
      var reqParams = req.body; 
 
  
    trycatch(function(){
     
      var response=dbcontext.Deletedocappointments(reqParams.id)
        res.send({ status: 1, msg: 'Appointment Deleted successfully', data: response }); 
   },function(error){
          
          console.log('Edit Appointment  -->' + error);
          res.send({ status: 0, msg: 'Failed', data: error }); 
    });
  
  
  
    }
    catch(ex)
    {
      res.send({ status: 0, msg: 'Failed', data: ex }); 
    }
    });       
  


Router.post("/addLabReferral",  async function(req, res) {
  
  var reqParam=req.body;  
  var test_id=reqParam.test_id; 
  var lab_id=reqParam.lab_id; 


  trycatch(async function(){
     var response =dbcontext.InsertLabReferal(reqParam.patient_id,reqParam.lab_id
      ,reqParam.remarks,reqParam.created_by,reqParam.doctor_id
      ,reqParam.file_name,reqParam.file_path );
     console.log(response);
     var  refId=response[0].p_return_value;  
     
         var output=  insertDocRefTest(refId,test_id,lab_id);   
          console.log("output:",output);  
         console.log("refId VENKAT",refId);    

       res.send({status:1,msg:"Referred Successfully",data:[]});  

   },function(error){
     
     console.log('Insert Referal Details-->' + error);
  
   });


})      

function insertDocRefTest(refId,test_id,lab_id)
{   
  return new Promise((resolve)=>   
  {
    console.log("test_id:",test_id);

    var exeQuery="";  
    console.log('testid',test_id)
if (test_id!='undefined'){
  
    var test_id_ar=test_id.split(',');
    for (index=0;index<=test_id_ar.length-1;index++)  {
   
     if(index == test_id_ar.length-1)
     { 
      trycatch(function(){
         var response =dbcontext.InsertRefTest(test_id_ar[index],lab_id,refId);
         
         console.log("insertDocRefTest success",response); 
         resolve({status:1,msg:"success"}); 

       },function(error){
         
         console.log('Edit Doctor Details-->' + error);
         resolve({status:1,msg:failed});  
       });
     
    }
    
    }


  }
          
 
  }  );
   
}


Router.post("/addDoctorReferral", async function(req, res) {
  var reqParam=req.body;
  var doctorId =reqParam.doctor_id;  


  trycatch(async function(){
    
    var response =dbcontext.InsertDocortReferal(reqParam.patient_id,reqParam.speciality_id
      ,reqParam.ref_doctor_id,reqParam.remarks,reqParam.created_by,doctorId
     ,reqParam.file_name,reqParam.file_path);
     var  refId=response[0].p_return_value;
     console.log(refId);

 res.send({status:1,msg:"Referred Sucessfully",data:response});  
      
 },function(error){
        
        console.log('Add Doctor referal  -->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
  });



})  




Router.post('/get_mas_doctor_service_type', async (req,res)=>{
  var reqParam=req.body; 
  
  try {
  
    var response =dbcontext.getdoctorservicetype(reqParam.doctor_id);
    res.send({ status: 1, msg: 'Success', data: response }); 
} catch (err) {
  console.error(err);
}
  
  

 
  });  
  

  Router.post('/getDoctorService',async (req,res)=>{
    var reqParam=req.body; 
    res.contentType("application/json");
   
    
    try {
    
      var response =dbcontext.getDoctorService(reqParam.doctor_id);
      res.send({ status: 1, msg: 'Success', data: response }); 
     
  } catch (err) {
    console.error(err);
  }

  

    }); 
  
    Router.delete('/delete_mas_doctor_service_type',async (req,res)=>{
      var reqParams = req.body;  
      
      
      trycatch(function(){
        res.contentType("application/json");
        var response =dbcontext.Deletedoctorservicetype(reqParams.id);
        res.send({ status: 1, msg: 'Service Deleted Successfully', data: response }); 
      },function(error){
        
        console.log('Delete Doctor server type-->' + error);
        res.send({ status: 0, msg: 'Failed', data: error }); 
       
      });
      
      
      });  
      

      Router.put('/edit_mas_doctor_service_type',(req,res)=>{
        var reqParams = req.body; 
        console.log(req.body);
        
        trycatch(function(){
                      
          var response =dbcontext.EditMasdoctorServiceType(reqParams.slot,reqParams.service_type,reqParams.total,reqParams.doctor_id
            ,reqParams.active_flag,reqParams.created_by,reqParams.created_on,reqParams.modified_by,reqParams.modified_on,reqParams.id);
            res.send({ status: 1, msg: 'Success', data: response }); 
        },function(error){
         
          res.send({ status: 0, msg: 'Failed', data: error }); 
         
        });
      
          
        });  
        



        Router.post('/insert_mas_doctor_service_type',async (req,res)=>{
          var reqParams = req.body;
          
          trycatch(function(){
                        
            var response =dbcontext.InsertMasdoctorServiceType(reqParams.slot,reqParams.service_type,reqParams.total,reqParams.doctor_id
              ,reqParams.active_flag,reqParams.created_by,reqParams.created_on,reqParams.modified_by,reqParams.modified_on);
              res.send({ status: 1, msg: 'Service Added Successfully', data: response }); 
          },function(error){
           
            res.send({ status: 0, msg: 'Failed', data: error }); 
           
          });
          
          
          }); 
        
          
          Router.post('/insert_doctor_token',async (req,res)=>{
            var reqParams = req.body;
            
            trycatch(function(){
                          
              var response =dbcontext.Insert_Doctor_Token(reqParams.doctor_id,reqParams.token);
                res.send({ status: 1, msg: 'Success', data: response }); 
            },function(error){
             
              res.send({ status: 0, msg: 'Failed', data: error }); 
             
            });
            
            
            }); 
            Router.post('/update_doctor_token',async (req,res)=>{
              var reqParams = req.body;
              
              trycatch(function(){
                            
                var response =dbcontext.Update_Doctor_Token(reqParams.doctor_id,reqParams.token,reqParams.id);
                  res.send({ status: 1, msg: 'Success', data: response }); 
              },function(error){
               
                res.send({ status: 0, msg: 'Failed', data: error }); 
               
              });
              
              
              }); 


    Router.post("/getPatientList", async function(req, res) {
      var reqParams = req.body;    
     


 try{
   
    var query="";
    const patientMediaPath = Globallinks.patientMediaPath; 

   
            trycatch(function(){
                  
              var response =dbcontext.GetPatientList(patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.book_date);
              
                res.send({ status: 1, msg: 'Success', data: response }); 
            },function(error){
            
              res.send({ status: 0, msg: 'Failed', data: error }); 
            
            });
    
         
        }  catch(err){
          console.log('cache error' + err);
         }                  
  });    
     

Router.post("/getQueueList", async function(req, res) {  
  var reqParams = req.body;          
  const patientMediaPath = "http://65.1.90.247:8000/uploads/";
  
try{
  
 trycatch(function(){
  
    var response =dbcontext.GetQueueList(patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.book_date);
        console.log(response); 
        var result= response;
        var countInfo,checkIn;             
        countInfo={},checkIn={};      
      
       var vip= result.filter((val)=> val.appointment_type_id=='3' ).length;
        countInfo.vip=vip; 
       var walkin=result.filter((val)=>val.appointment_type_id=='0').length;                  
       countInfo.walkin=walkin; 
      
       var  app= result.filter((val)=>val.appointment_type_id=='1').length ;
       countInfo.member=app;    
        var online= result.filter((val)=> val.appointment_type_id=='2' ).length;
        countInfo.online=online; 
         
       
        var referral=result.filter((val)=>val.is_referral=='1').length; 
        countInfo.referral=referral;     
        
        checkIn.vip=result.filter((val)=> val.appointment_type_id=='3' && val.check_in_status=='1' ).length;;
        checkIn.walkin=result.filter((val)=> val.appointment_type_id=='0'&& val.check_in_status=='1' ).length;
        checkIn.member =result.filter((val)=> val.appointment_type_id=='1'&& val.check_in_status=='1' ).length;
        console.log({countInfo:countInfo}); 
        res.send({ status: 1, msg: 'Success', data: [{result:result,countInfo:countInfo,checkIn:checkIn}] });   
        
  },function(error){
   
    res.send({ status: 0, msg: 'Failed', data: error }); 
   
  });  
}catch(err){
  console.log('cache error' + err);
 }
});


Router.post("/getPatientCancelledList",async function(req, res) {
  var reqParams = req.body;    
 
  
  try {
  
var query=""; 
const patientMediaPath = Globallinks.patientMediaPath; 
var period=reqParams.period;   
 switch(period.toUpperCase())   
 {         
  case "DAY":       
 

trycatch(function(){
            
 response =dbcontext.GetCancelledPatientList('DAY',patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.search_date,reqParams.search_date_to,'','','');
 
   res.send({ status: 1, msg: 'Success', data: response }); 
},function(error){

 res.send({ status: 0, msg: 'Failed', data: error }); 

});

 
     break;   
  case "WEEK":  
     var curDayId=new Date().getDay(); 
     var curDate=new Date(); 
    var startDate="";     
     
     var startDayId 
     trycatch(function(){
            
       startDayId =dbcontext.getmasconig();
         res.send({ status: 1, msg: 'Success', data: response }); 
     },function(error){
      
       res.send({ status: 0, msg: 'Failed', data: error }); 
      
     });


     startDayId=startDayId[0].day_id;    
     if(curDayId==startDayId)
    {
     startDate=dateFormat(new Date(),"yyyy-mm-dd");
     }      else  
     { 
     curDate=curDate.setDate(curDate.getDate()-6);
     console.log("test",curDate);   
     var CurrentWeekDate= await GenerateDate(curDate,new Date()); 
     console.log("CurrentWeekDate",CurrentWeekDate);         
     startDate=CurrentWeekDate.filter((val)=>val.day==startDayId)[0].date;  
     console.log("endDate",startDate);         
     }   

     trycatch(function(){
         
       response =dbcontext.GetCancelledPatientList('WEEK',patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.search_date,reqParams.search_date_to,startDate,'','');
         res.send({ status: 1, msg: 'Success', data: response }); 
     },function(error){
      
       res.send({ status: 0, msg: 'Failed', data: error }); 
      
     });
    
     break;       
  case "MONTH":  
   
        trycatch(function(){
            
          response =dbcontext.GetCancelledPatientList('MONTH',patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.search_date,reqParams.search_date_to,startDate,'','');
            res.send({ status: 1, msg: 'Success', data: response }); 
        },function(error){
         
          res.send({ status: 0, msg: 'Failed', data: error }); 
         
        });

        break;
  case "YEAR":     
  
           var financial_year
           trycatch(function(){
            
             financial_year =dbcontext.getmasconigfinyear();
               res.send({ status: 1, msg: 'Success', data: response }); 
           },function(error){
            
             res.send({ status: 0, msg: 'Failed', data: error }); 
            
           });

           trycatch(function(){
            
             response =dbcontext.GetCancelledPatientList('YEAR',patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.search_date,reqParams.search_date_to,startDate,financial_year[0].from_date,financial_year[0].to_date);
               res.send({ status: 1, msg: 'Success', data: response }); 
           },function(error){
            
             res.send({ status: 0, msg: 'Failed', data: error }); 
            
           });
        break;  
      }   

    
}catch(err){
  console.log('cache error' + err);
 }
 }); 


Router.post("/getPatientParticularReport", async function(req, res) { 
try{

  var reqParams = req.body;  
  console.log(req.body)             
  const patientMediaPath = Globallinks.patientMediaPath; 
  var path = Globallinks.labMediaPath; 
  var patient_id=reqParams.patient_id;
  var query="";                              
   

  trycatch(function(){
            
    response =dbcontext.GetPatientReport(patientMediaPath,reqParams.patient_id,reqParams.clinic_id,reqParams.doctor_id,reqParams.book_date);
    var output= response;
    console.log(response); 

    trycatch(function(){
            
      var patient_history =dbcontext.get_patient_history(path,reqParams.patient_id);

        res.send({ status: 1, msg: 'Success', data:[{ patient_info: output,patient_report:patient_history }]});              

  
      
    },function(error){
     
      res.send({ status: 0, msg: 'Failed', data: error }); 
     
    });


  },function(error){
   
    res.send({ status: 0, msg: 'Failed', data: error }); 
   
  });

}  catch(err){
  console.log('cache error' + err);
 }   
});           




 Router.post("/insertPrescription",async function(req, res) { 
  try   
  {  
    console.log('venkat');
 var reqParams = req.body;              
 const s3Medidapath = Globallinks.patientMediaPath;  
 
 var query="";                               
 var is_walkin=0,medicine,file_upload,pharm_id=0,doctor_id;
 
 medicines=JSON.parse(reqParams.medicines);
 
 is_walkin=reqParams.is_walkin;    
 doctor_id=reqParams.doctor_id;            
 
 
 if(reqParams.is_send_to_pharam=='1')
 {   
 var result= await getPharmacy();    
 console.log("result_id",result);     
 if(result.length>0 )   
 {            
   pharm_id=result[0].id;  
   console.log("result_id",result[0].id);    
 } 
 }
 console.log('pharm_id',pharm_id);
 
   

 trycatch(async function (){
  res.contentType("application/json");
    var otptype="0";
    var response =dbcontext.InsertPatientDescription(reqParams.patient_id,doctor_id,reqParams.is_send_to_pharam
      ,pharm_id,reqParams.booking_id,reqParams.file_name,reqParams.file_path );
console.log('test here')
      var output= Array.isArray(response)?response:[response]; 
      console.log("output",output);           
      if(output.length>0) 
      {       
       var result= await insertMedicines(medicines,output[0].p_return_value,doctor_id) ;      
        
       console.log("output[0].insertId",output[0].p_return_value);  
       console.log("fileUploadPath",fileUploadPath);    
       
        res.send({ status: 1, msg: 'Success'});               
      
      }            
    else
    {   
      res.send({ status: 0, msg: 'Failed'});                            
    }   

},function(error){
        console.log('Insert Patinet Description -->' + error);
        res.send({ status: 0, msg: 'Failed', error: error,format:req.body });  
});

 
}   
catch(err)
{   
  
 res.send({ status: 0, msg: 'Failed', error: err,format:req.body });                            
}                                  
});               


 insertMedicines=(medicines,prescription_id,doctor_id)=>{  
return new Promise((resolve)=>{ 

 var exeQuery="";
 if(medicines.length>0)
 {
console.log('medicines',medicines)
 medicines.forEach(async(item,i)=>{ 
  var result =dbcontext.InsertMedicine(prescription_id,medicines[i].medicine_id,medicines[i].medicine,medicines[i].day,medicines[i].morning
    ,medicines[i].afternoon,medicines[i].night,medicines[i].instruction,doctor_id)
    console.log("result",result);
    resolve({status:1,msg:"Success",data:result});  
           
   })      

}
else
{
resolve({status:1,msg:"Success",data:[]});  
}   

})

} 
function getPharmacy(){ 

return new Promise((resolve)=>{

  trycatch(function(){

  var result =dbcontext.get_parmacy()
  console.log("result",result);
  resolve(result);  
  },function(error){
    console.log("err",error);
    reject(error); 
    console.log('Get Parmacy -->' + error);
    
});

})
}   




Router.post('/getPharmMedicines',async (req,res)=>{

  var reqParams=req.body;
  try
  {
   
  trycatch( function(){
    var response =dbcontext.GetPharmmedicines(reqParams.medicine_name)
    res.send({ status: 1, msg: 'Success', data: response });  
  },function(error){
    res.send({ status: 0, msg: 'Failed', data: error }); 
  });
  }catch(err){
    console.log('cache error' + err);
   }
 }); 

 Router.post("/getappointmentCalendar", async (req, res) => {
  console.log(req.body);
  try
  {
    
      trycatch(async function(){
        var response =dbcontext.Get_appointmentcalender(req.body.clinicId,req.body.doctorId,req.body.fromDate,req.body.toDate)
        
        if (response.length > 0) {
          
          res.send({ status: 1, msg: 'Success', data: response }); 
          
        } else {
          res.send({
            status: 0,
            msg: "No Data available please try again",
            data: [],
          });
        }
    
      },function(error){
        res.send({ status: 0, msg: 'Failed', data: error }); 
      });
    }
      catch(err){
        console.log('cache error' + err);
       }
}); 

function appointmentMonthDetailsHandler  (totalCountsOfSlots, data)  {
  return new Promise((resolve, reject) => {

    trycatch(async function(){
      var response =dbcontext.Get_appointmentMonthDetails(data.fromDate,data.toDate)

      if (response.length > 0) {
        console.log("appointmentMonthDetailsHandler -> totalCountsOfSlots", totalCountsOfSlots)


       await asyncForEach(response, async (item, i) => {

          var filteringBasedonDays = await totalCountsOfSlots.filter(
            (val) => val.day_id == response[i].currentDayId
          );
          
          console.log(
            "appointmentMonthDetailsHandler -> filteringBasedonDays",
            filteringBasedonDays
          );

          var blockSlotsCount = await blockedSlotsCountHandler(
            response[i].selected_date,
            data
          );
          console.log(blockSlotsCount)
          var totalNumberofSlots =
            filteringBasedonDays[0].totalNumberofSlots;
          console.log(totalNumberofSlots);
          response[i].totalnoofSlots = totalNumberofSlots;
          response[i].totalSlots = totalNumberofSlots - blockSlotsCount;
          var bookedSlotsCount = await bookedSlotsCountHandlerForDoctor(
            response[i].selected_date,
            data
          );

          var walkinBookedSlotsCount = await walkinBookedSlotsCountHandlerForDoctor(
            response[i].selected_date,
            data
          );
          response[i].availableSlots =
            (totalNumberofSlots - blockSlotsCount) - (bookedSlotsCount + walkinBookedSlotsCount);
          
        });

        resolve(response);
      } else {
        resolve([]);
      }


    },function(error){
      reject(error);
    });

   

  })
}
walkinBookedSlotsCountHandlerForDoctor = (selectedDate, data) => {
  return new Promise((resolve, reject) => {

    trycatch(function(){
      var response =dbcontext.Get_walkbookedslotsfordoctor( data.clinicId,data.doctorId,selectedDate)
      console.log("response", response);
      if (response.length > 0) {
        console.log(response);

            if(response[0].total_slots == null){
              resolve(0);
              return
            }else{

              resolve(response[0].total_slots);
            }

      } else {
        resolve(0);
      }
    },function(error){
      reject(error);
    });

  });
};



bookedSlotsCountHandlerForDoctor = (selectedDate, data) => {
  return new Promise((resolve, reject) => {

    trycatch(function(){
      var response =dbcontext.Get_bookedslotcounthandler( data.clinicId,data.doctorId,selectedDate)
      console.log("response", response);
      if (response.length > 0) {
        console.log(response);
       
            if(response[0].total_slots == null){
              resolve(0);
              return
            }else{

              resolve(response[0].total_slots);
            }
      
      } else {
        resolve(0);
      }


    },function(error){
      reject(error);
    });
  });
};

getHoursIntervalForDoctor = (fromTime, toTime, interval) => {
  console.log(fromTime, toTime, interval);
  return new Promise(async (resolve, reject) => {
    var arr = [];
    while (fromTime < toTime) {
      var nextTime = new Date(fromTime.toString());

      var AddedMinutes = await new Date(
        nextTime.setMinutes(nextTime.getMinutes() + interval)
      );

      var formattedFrmTime = dateFormat(fromTime, "HH:MM");
      var formattedToTime = dateFormat(AddedMinutes, "HH:MM");

      arr.push({
        fromTime: formattedFrmTime,
        toTime: formattedToTime,
        timeInterval: interval,
      });

      fromTime.setMinutes(fromTime.getMinutes() + interval);
    }
    resolve(arr);
  });
};

blockedSlotsCountHandler = (selectedDate, data) => {
  
  return new Promise((resolve, reject) => {

    trycatch(function(){
      var response =dbcontext.Get_blockedslotscounthandler( data.clinicId,data.doctorId,selectedDate)
      console.log("response", response);
      if (response.length > 0) {
        resolve(response[0].blockCount);
      } else {
        resolve(0);
      }
    },function(error){
      reject(error);
    });

  });
};


Router.post('/insertDoctorBlockSlots',async(req,res)=>{

  var reqParams = req.body; 
  var blocked_details=reqParams.blocked_details;
  var cancel_details=reqParams.cancel_details; 
  var query="";
  var result=await insert_blocs(reqParams.doctor_id,reqParams.created_by,reqParams.ipaddress,blocked_details);
  res.send({ status: 1, msg: 'Appointment cancelled successfully', data: result }); 
  
  await asyncForEach(cancel_details,(value,i)=>{

    trycatch(function(){
      var response = dbcontext.Update_doctor_block_slots( reqParams.doctor_id,blocked_details[i].from_time,blocked_details[i].to_time
        ,blocked_details[i].block_date,reqParams.created_by)
      res.send({ status: 1, msg: 'Success', data: response }); 
    },function(error){
     console.log(error);
    });


  });        
  


      
  });     

 function insert_blocs(doctor_id,created_by,ipaddress,blocked_details) {
  return new Promise((resolve, reject) =>{
   asyncForEach( blocked_details, async (value,i)=>{ 
    var response
    trycatch(async function(){

       response = await dbcontext.insert_doctor_block_slots( doctor_id,blocked_details[i].from_time,blocked_details[i].to_time
        ,blocked_details[i].block_date,created_by,ipaddress)
       
    },function(error){
      resolve(false)
      console.log(error);
    });
    resolve(response)
  });
});
}
  Router.post('/validateBlockCancelSlots',async(req,res)=>{

    var reqParams = req.body; 
    var blocked_details=reqParams.blocked_details;
    var cancel_details=reqParams.cancel_details; 
    var query=""; 
    var message=""; 
try{

    if(cancel_details.length>0)   
    {
      message=" Do you want to Unblock the selected slots? "; 
  
    }
    if(blocked_details.length>0)
    {
      message=" Do you want to block the slots? "; 
    }    
  
    await asyncForEach( blocked_details, async (value,i)=>{       
      
      trycatch(function(){
        var check_dateExistence =dbcontext.ValidateBlockedCancelslots( reqParams.doctor_id,blocked_details[i].from_time
          ,blocked_details[i].block_date,reqParams.created_by)
          if(check_dateExistence.length>0)
          { 
            message=" There are booking against the selected Slots, Do you want to cancel? "; 
            return;      
          }
      },function(error){
        reject(error);
      });

      
   
    });  
    if(message=="")
    {
      message=" Do you want to block the slots? "; 
    }   
    res.send({ status: 1, msg: message, data: [] }); 
} catch(err){
  console.log('cache error' + err);
 }

    });     

    Router.post('/getDoctorBlockCancelSlots',async (req,res)=>{
      var reqParams = req.body; 

   

    try{

    var startDate = new Date(reqParams.from_date); 
    var endDate = new Date(reqParams.to_date);   
    var dateList= await GenerateDate(startDate,endDate);
 
    var clinic_id,doctor_id;
    clinic_id=reqParams.clinic_id; 
    doctor_id=reqParams.doctor_id;    
 

    trycatch(async function(){
      var result =dbcontext.Get_Doctor_blockedCancelSlots( reqParams.doctor_id,reqParams.clinic_id)
            
       var output=[];
        var objOutput=[];
        var blockedSlots= await getBlockedDates(doctor_id); 
        if (dateList.length>0){
       dateList.forEach(async(item,i)=>    
       {   
        console.log('Venkat 2') 
           if(dateList[i].day==0)
           {  
           dateList[i].day=7; 
 
           } 
          objTime=[]; 
          var time_result;
          var timing=result.filter((callback)=>callback.day_id==dateList[i].day) ;
          var timing_details=[];
          await timing.forEach(async(item,index)=>{
          var   split_time=await   GenerateTime(timing[index].from_time,timing[index].to_time,timing[index].slot_duration, dateList[i].day,dateList[i].date ,blockedSlots);
          timing_details.push(split_time);
                
         
          }   
           );       
                                        
          output.push( {          
          date:dateList[i].date     ,
          clinic_id:clinic_id,  
          doctor_id:doctor_id   ,            
          date_slots:    timing_details });    
          
          if(i==dateList.length-1)  
          
          {  
           
            output.map((val)=>{
              val.date_slots = val.date_slots.flat();
            })
            res.send({ status: 1, msg: 'Success', data: output }); 
          }    
              
          
       }
       
       );  
      }
      else
      {
        res.send({ status: 0, msg: 'DateList Empty', data: [] }); 
      }
    },function(error){
      res.send({ status: 0, msg: 'Failed', data: error }); 
    });


  } catch(err){
    console.log('cache error' + err);
   }

     }); 
 
GenerateTime=(fromTime,toTime,interval,dayId,date,blockedSlots)=>{
  return new Promise((resolve)=>{ 
      var timeArray=[];
      var is_blocked=0;
      fromTime=new Date(`0000 ${fromTime}`);
      toTime=new Date(`0000 ${toTime}`);    
      while (fromTime < toTime) { 
          var nextTime = new Date(fromTime.toString());
          is_blocked=0;  
          var AddedMinutes = new Date(
            nextTime.setMinutes(nextTime.getMinutes() + interval)
          ); 
  
          var formattedFrmTime = dateFormat(fromTime, "HH:MM:00");
          var formattedToTime = dateFormat(AddedMinutes, "HH:MM:00"); 
          
             
         var blockedArray=blockedSlots.filter((val)=>{ 
          var test_date=date;
          return (val.from_time==formattedFrmTime && val.to_time ==formattedToTime &&val.block_date==test_date)});     
         if(blockedArray.length>0)  
         {   
          is_blocked=1; 
         }   
          timeArray.push({             
            date:date, 
            from_time: formattedFrmTime,
            to_time: formattedToTime,
            day:dayId,
            is_blocked:is_blocked
          });    
  
          fromTime.setMinutes(fromTime.getMinutes() + interval);
        }  

        resolve(timeArray); 

}) 
} 


GenerateDate=(startDate,endDate)=>
{   
  console.log('testtt')
 return new Promise((resolve)=>{
  var dateList=[];
  
  dateFrom=new Date(startDate);
  console.log('venky',dateFrom,endDate)
  while(dateFrom<=endDate)
  {          
      
       dateList.push(
           {
              date:dateFormat(new Date(dateFrom),"yyyy-mm-dd"),             
               day:new Date(dateFrom).getDay()   
           }
           );    
      dateFrom.setDate(dateFrom.getDate()+1); 
  }    
  resolve( dateList); 
 });          
}       

function getBlockedDates(doctor_id) {
  return new Promise((resolve, reject) => {


    trycatch(async function(){
      var response =dbcontext.Get_BlockedDates(doctor_id)
      if(response.length > 0){
        resolve(response) 
      }else{
        resolve([])
      }
 },function(error){
  console.log(error);
  reject(err); 
    });

  })

} 

function Get_Finyear()
{
  var response=  dbcontext.Get_Finyear()
  return response;
}
Router.post("/getRevenueDetails",async  function(req, res) { 
try{


  var reqParams = req.body;     
  var period= reqParams.period;   
  var doctor_id,clinic_id; 
  doctor_id=reqParams.doctor_id;
  clinic_id=reqParams.clinic_id;
  var query=""; 
  var exeQuery="";                                  
     

       var output={};                                                     
       var slots={}; 
       var financial_year
       trycatch(async function(){

        financial_year = await dbcontext.Get_Finyear()
         
       

       
        
      
      switch(period.toUpperCase().trim())
      { 
         case "DAY":                    
                var day_id=new Date().getDay()  ; 
                day_id= day_id==0?7:day_id; 
                var slot=[];     
                
                trycatch(async function(){

                  slot = await dbcontext.Get_Revenue_Slot(reqParams.clinic_id,reqParams.doctor_id,day_id)


                   console.log('slot',slot.length);

                   if(slot.length==0) 
                   {    
                    slot.push({"total_slots":0});
                   } 
                   else{
                    slot.push({"total_slots":slot[0].total_slots}); 
                    slots.total_slots=slot[0].total_slots;
                   } 

                  
                   
                    slot=[];    
                    console.log('slot 2')    ;                
                   slot = await dbcontext.Get_Revenue_Slot_2(reqParams.clinic_id,reqParams.doctor_id)
                   console.log("slottest",slot);     
                   slot= slot.length>0?slot:slot.push({"booked_slots":0});                  
                   slots.booked_slots=slot[0].booked_slots;                                
                        
                  slots.available_slots=slots.total_slots - slots.booked_slots;      
                     
                    slot=[];                         
                    slot = await dbcontext.Get_Revenue_Slot_3(reqParams.clinic_id,reqParams.doctor_id)
                    console.log("slot_length",slot.length);   
                    if(slot.length==0) 
                    {    
                      slot.push({"income":0});  
                    }        
                                    
                    console.log("slot",slot);    
                    console.log("slot[0].income",slot[0].income);   
                    slots.income=slot[0].income;                        
                
                  },function(error){
                  res.send({ status: 0, msg: 'Failed', data: error }); 
                });

               


               
                                                    
               break;     
        case "WEEK":       
               var curDayId=new Date().getDay(); 
               var curDate=new Date();
               var startDate="";
               var startDayId = await dbcontext.Get_Revenue_StartDay()
               startDayId=startDayId[0].day_id;      
               if(curDayId==startDayId) 
                 {
               startDate=dateFormat(new Date(),"yyyy-mm-dd"); 
             }
               else  
               {        
                   curDate=curDate.setDate(curDate.getDate()-6);
                   
                   var CurrentWeekDate= await GenerateDate(curDate,new Date()); 
                   console.log("CurrentWeekDate",CurrentWeekDate);  
                  startDate=CurrentWeekDate[0].date
                             
                }    
                console.log('start date',startDate)   ;
                var endDate=new Date(startDate);  
                endDate=endDate.setDate(endDate.getDate()+6);                   
                console.log("end Date",endDate);                     
                var CurrentWeekDates=await GenerateDate(startDate,endDate); 
                console.log("CurrentWeekDates Amount",CurrentWeekDates);   

                var income_details=await dbcontext.Get_Revenue_TrnPayment(reqParams.clinic_id,reqParams.doctor_id,startDate)

                 
                   await asyncForEach(CurrentWeekDates, async (value, i) => {
                   CurrentWeekDates[i].day=(CurrentWeekDates[i].day==0)?7:CurrentWeekDates[i].day;
                 var amount=  income_details.filter((val)=>val.day==CurrentWeekDates[i].day).length>0? income_details.filter((val)=>val.day==CurrentWeekDates[i].day)[0].amount :0;
                 CurrentWeekDates[i].amount =amount;     
                 console.log("day",CurrentWeekDates[i].day                    );
                 
                 var dayName= await  getDayName(CurrentWeekDates[i].day);
                 console.log(dayName);
                 CurrentWeekDates[i].day_name=dayName;                  
                                                                          
               })
               output.financial_year=financial_year[0].from_year +"-"+ financial_year[0].to_year; 
               output.income_details= CurrentWeekDates;       




var CurrentWeekDates=await GenerateDate(startDate,endDate); 
endDate=dateFormat(endDate,'yyyy-mm-dd')    ;
console.log("CurrentWeekDates Commision",CurrentWeekDates);   

var commission_details=await dbcontext.Get_Revenue_Commission(reqParams.clinic_id,reqParams.doctor_id,startDate)

   await asyncForEach(CurrentWeekDates, async (value, i) => {
   CurrentWeekDates[i].day=(CurrentWeekDates[i].day==0)?7:CurrentWeekDates[i].day;
 var amount=  commission_details.filter((val)=>val.day==CurrentWeekDates[i].day).length>0? commission_details.filter((val)=>val.day==CurrentWeekDates[i].day)[0].commision :0;
 var doctor_commision=  commission_details.filter((val)=>val.day==CurrentWeekDates[i].day).length>0? commission_details.filter((val)=>val.day==CurrentWeekDates[i].day)[0].doctor_commision :0;
 CurrentWeekDates[i].commision =amount;     
 CurrentWeekDates[i].doctor_commision =doctor_commision;     
 
 
 var dayName= await  getDayName(CurrentWeekDates[i].day);
 console.log(dayName);
 CurrentWeekDates[i].day_name=dayName;                  
                                                          
})
        output.financial_year=financial_year[0].from_year +"-"+ financial_year[0].to_year; 
        output.commission_details= CurrentWeekDates;       


                slot = await dbcontext.Get_Revenue_Slot_4(reqParams.clinic_id,reqParams.doctor_id)
                slot= slot.length>0?slot:slot.push({"total_slots":0}); 
                slots.total_slots=slot[0].total_slots; 
                 slot=[];                         

                slot = await dbcontext.Get_Revenue_Slot_5(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate)
                console.log("slottest",slot);     
                slot= slot.length>0?slot:slot.push({"booked_slots":0});                  
                slots.booked_slots=slot[0].booked_slots;                                
                     
                  slots.available_slots=slots.total_slots - slots.booked_slots;      
                  
                 slot=[];  
                 slot = await dbcontext.Get_Revenue_Slot_6(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate)                       
                 console.log("slot_length",slot.length);   
                 if(slot.length==0) 
                 {    
                   slot.push({"income":0});  
                 }                                   
                 console.log("slot",slot);    
                 console.log("slot[0].income",slot[0].income);   
                 slots.income=slot[0].income;    
                       

                   var doctor_points =await dbcontext.Get_Revenue_DoctorPoints(reqParams.doctor_id,startDate,endDate)                       
                   console.log('venkypoints',doctor_points)
                   var creditPoints=JSON.parse(JSON.stringify( CurrentWeekDates));     
                   console.log("doctor_points",creditPoints);     
                   await asyncForEach(creditPoints,async(value,i)=>{ 
                     var total_referrals=  doctor_points.filter((val)=>val.day==creditPoints[i].day).length>0? doctor_points.filter((val)=>val.day==creditPoints[i].day)[0].total_referrals :0;
                     var points_earned=  doctor_points.filter((val)=>val.day==creditPoints[i].day).length>0? doctor_points.filter((val)=>val.day==creditPoints[i].day)[0].points_earned :0; 
                     creditPoints[i].total=total_referrals;    
                     creditPoints[i].points=points_earned;    
                      delete value.amount;    
                   });    
                    output.slots=[slots];    
                    output.credit_points= creditPoints;                          
                 
              break;   
        case "MONTH":  
             
               var week,fromDate,toDate,monthInfo,i=1,incomeDetails=[],creditPoints=[],doctor_points=[],currentWeekDates,amount,commision,slot=[],commisiondetails=[];
               var total_referrals,points_earned;
               exeQuery="";    
              
                 var date=new Date();
                 startDate=new Date(date.getFullYear(),date.getMonth(),1); 

                 endDate=new Date(date.getFullYear(),date.getMonth()+1,0); 
                 console.log('start,end 1',startDate,endDate);
                 week = Math.ceil((endDate.getDate()-startDate.getDate())/7);
                 fromDate=new Date(startDate); 
                 console.log(fromDate); 
                 toDate=new Date();
                 console.log(toDate); 
                 toDate=toDate.setDate(fromDate.getDate()+6);
                 startDate=formatDate(startDate);
                 
                 endDate=formatDate(endDate);
                while(i<=week){              
                  startDate=formatDate(startDate);
                  endDate=formatDate(endDate);
                  console.log('start,end 2',startDate,endDate);
                  toDate=  new Date(toDate);   
                  var Sdate=dateFormat(fromDate,'yyyy-mm-dd');    
                  var Edate=dateFormat(toDate,'yyyy-mm-dd');    
                var income_details=await dbcontext.Get_Revenue_IncomeDetails(reqParams.clinic_id,reqParams.doctor_id,Sdate,Edate)                       

                               
                currentWeekDates=await GenerateDate(fromDate,toDate);   
                endDate=dateFormat(endDate,'yyyy-mm-dd');    
              



               var commision_details=await dbcontext.Get_Revenue_Commision_Month(reqParams.clinic_id,reqParams.doctor_id,Sdate,Edate)                       
                 doctor_points =await dbcontext.Get_Revenue_DoctorPoints(reqParams.doctor_id,Sdate,Edate)                       
                 total_referrals=  doctor_points.length>0? ((doctor_points[0].total_referrals==null)?0:doctor_points[0].total_referrals) :0; 
                 points_earned=  doctor_points.length>0? ((doctor_points[0].points_earned==null)?0:doctor_points[0].points_earned) :0;  
                    
                amount = income_details.length>0?( (income_details[0].amount==null)?0:income_details[0].amount) :0; 
                commision=commision_details.length>0?( (commision_details[0].doctor_commision==null)?0:commision_details[0].commision) :0; 
                doctor_commision=commision_details.length>0?( (commision_details[0].commision==null)?0:commision_details[0].doctor_commision) :0; 
                incomeDetails.push({week:i,amount:amount,date_from:dateFormat(fromDate,"yyyy-mm-dd"),date_to:dateFormat(toDate,"yyyy-mm-dd"),date_range:dateFormat(fromDate,"dd")+"-"+dateFormat(toDate,"dd") }); 
                commisiondetails.push({week:i,commision:commision,doctor_commision:doctor_commision,date_from:dateFormat(fromDate,"yyyy-mm-dd"),date_to:dateFormat(toDate,"yyyy-mm-dd"),date_range:dateFormat(fromDate,"dd")+"-"+dateFormat(toDate,"dd") }); 
                creditPoints.push({week:i,date_from:dateFormat(fromDate,"yyyy-mm-dd"),date_to:dateFormat(toDate,"yyyy-mm-dd"),period: dateFormat(fromDate,"dd")+" "+dateFormat(fromDate,"ddd")+" "+"-"+" "+ dateFormat(toDate,"dd")+" "+ dateFormat(toDate,"ddd"),total_referrals:total_referrals,points_earned:points_earned });
                 i++;                 
                 toDate=new Date(toDate);  
                 endDate=new Date(endDate); 
                 
                 fromDate=toDate.setDate(toDate.getDate()+1);
                 toDate= i== week ? toDate.setDate(endDate.getDate()) :toDate.setDate(toDate.getDate()+6);                                  
                 console.log("toDate",toDate);                
                   

                }  

                 console.log("startDate,endDate",startDate,",",endDate);    
                 startDate=dateFormat(startDate,"yyyy-mm-dd"); 
                 endDate=dateFormat(endDate,"yyyy-mm-dd");  
                 slot =await dbcontext.Get_Revenue_Slot_7(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate)  
                            
                 slot= slot.length>0?slot:slot.push({"total_slots":0}); 
                 slots.total_slots=slot[0].total_slots; 
                 slot=[];                                   
                 slot =await dbcontext.Get_Revenue_Slot_8(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate) 
                   console.log("slottest",slot);        
                   slot= slot.length>0?slot:slot.push({"booked_slots":0});                  
                   slots.booked_slots=slot[0].booked_slots;                      
                   slots.available_slots=slots.total_slots - slots.booked_slots;  
                  
                 slot=[];                             
                 slot =await dbcontext.Get_Revenue_Slot_9(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate) 
                 console.log("slot_length",slot.length);   
                 if(slot.length==0) 
                 {    
                   slot.push({"income":0});  
                 }                                   
                 console.log("slot",slot);    
                 console.log("slot[0].income",slot[0].income);   
                 slots.income=slot[0].income;     
                   
                   
               }

               output.financial_year=financial_year[0].from_year +"-"+ financial_year[0].to_year; 
               output.income_details=incomeDetails;
               output.commision_details=commisiondetails;
               output.slots=[slots];  
               output.credit_points=creditPoints;    

              break;   
       case "YEAR";
            
               console.log('venky year',financial_year[0].first_month);
             

          console.log('year',financial_year[0]);
              first_month=financial_year[0].first_month ;   
              financialFromDate=     financial_year[0].from_date;
              financialToDate=     financial_year[0].to_date;   
              fromYear=    financial_year[0].from_year;
              toYear= financial_year[0].to_year;
             output.financial_year=financial_year[0].from_year +"-"+ financial_year[0].to_year; 
          
             output.first_month=first_month;
             startdate=financial_year[0].from_date;
             endDate=financial_year[0].to_date;
             startDate=formatDate(financial_year[0].from_date);
             endDate=formatDate(financial_year[0].to_date);
             var income_details=await dbcontext.Get_Revenue_IncomeDetails_Year(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate);                       
             
             income_details= await formatIncomeMonthWise(income_details,first_month);     
             income_details=income_details.filter((val)=>val.month>=first_month).concat(income_details.filter((val)=>val.month<first_month))       ;
             output.income_details= income_details;  
             console.log(income_details);  
             
             var commision_details=await dbcontext.Get_Revenue_CommisionDetails_Year(reqParams.clinic_id,reqParams.doctor_id,startDate,endDate);                       
console.log('commision_details 1',commision_details)
             commision_details= await formatCommisionMonthWise(commision_details,first_month); 
             console.log('commision_details 2',commision_details)
             commision_details=commision_details.filter((val)=>val.month>=first_month).concat(commision_details.filter((val)=>val.month<first_month))       ;
             output.commision_details= commision_details; 

            
              var slot=[];       
              financialFromDate=formatDate(financialFromDate);
              financialToDate=formatDate(financialToDate);
              slot= await dbcontext.Get_Revenue_Slot_10(reqParams.clinic_id,reqParams.doctor_id,financialFromDate,financialToDate)                       
          
              
               slot= slot.length>0?slot:slot.push({"total_slots":0}); 
               slots.total_slots=slot[0].total_slots; 
               slot=[];  
               var f_date=formatDate(financial_year[0].from_date);
               var t_date=formatDate(financial_year[0].to_date);                             
                slot= await dbcontext.Get_Revenue_Slot_11(reqParams.clinic_id,reqParams.doctor_id,f_date,t_date)                       
                console.log("slottest",slot);        
                slot= slot.length>0?slot:slot.push({"booked_slots":0});                  
                slots.booked_slots=slot[0].booked_slots;                         

                slots.available_slots=slots.total_slots - slots.booked_slots;      
                 slot=[];              
                 console.log("slot123",slot);     
                 slot= await dbcontext.Get_Revenue_Slot_12(reqParams.clinic_id,reqParams.doctor_id,f_date,t_date)                       
                 console.log("slot_length",slot.length);   
                 if(slot.length==0)  
                 {         
                   slot.push({"income":0});  
                 }         
                                  
                 console.log("slot",slot);    
                 console.log("slot[0].income",slot[0].income);   
                 slots.income=slot[0].income;   
               var doctor_points= await dbcontext.Get_Revenue_DoctorPoints_Year(reqParams.doctor_id,financialFromDate,financialToDate)                       

               var credit_points= await format_creditpoints(doctor_points);         
                credit_points=credit_points.filter((val)=>val.month>=first_month).concat(credit_points.filter((val)=>val.month<first_month));
                credit_points.forEach((value,i)=>{if(credit_points[i].month>=first_month){credit_points[i].year= fromYear}else {credit_points[i].year= toYear} })
               output.credit_points= credit_points;       
               output.slots=[slots];   
               console.log('venkyoutput',output)  
                
               
             

              break;     
            
            
      } 
       res.send({ status: 1, msg: 'Success', data: output });        
        
  
      
    },function(error){
      res.send({ status: 0, msg: 'Failed', data: error }); 
    });
      
   // }

    }catch(err){
      console.log('cache error' + err);
     }
});
 async function GetYear()
{
  return new Promise((resolve)=>{  

    trycatch(function(){
      var response =dbcontext.Get_Finyear()
      resolve(response);
    },function(error){
      resolve([]); 
      console.log('Get Doctor Sepeciality-->' + error);
     
    });
  })
  
}
function format_creditpoints(doctor_points)
  {    
    return new Promise( async (resolve)=>{
    var month_array=[];   
    var total_referrals,points_earned;
    for( i=1;i<=12;i++)
    {        
      total_referrals=points_earned=0; 
         var filter_values= doctor_points.filter((val)=>{ 
          return (val.month == i)
       })     
       console.log("filter_values",filter_values);
       console.log("filter_values[0]",filter_values[0]);                 
       total_referrals= (filter_values.length>0)?(filter_values[0].total_referrals):0;
       points_earned=(filter_values.length>0)?(filter_values[0].points_earned):0
       console.log("total_referrals",total_referrals);  
        var monthName=await getMonthName(i)    ;
        month_array.push({   
            month:i,    
            total_referrals:total_referrals ,
            points_earned:  points_earned  ,
            month_name:  monthName              
        });    
        if(i==12)
        {  
           resolve(month_array); 
        } 
    }    
       
    }) 
  } 

  function formatCommisionMonthWise(income_details,start_month)
  { 
    return new Promise( async (resolve)=>{
    var month_array=[],commision,doctor_commision;
    for( i=1;i<=12;i++)
    {    
      commision=0;
      doctor_commision=0;  
         
        
         var filter_values= await income_details.filter((val)=>{ 
          return (val.month == i)
       })
       var monthName=await getMonthName(i)    ;

       console.log("filter_values",filter_values);
       console.log("filter_values[0]",filter_values[0]);  
      commision= (filter_values.length>0)?(filter_values[0].commision):0
      doctor_commision=(filter_values.length>0)?(filter_values[0].doctor_commision):0
       console.log("commision",commision);  
       month_array.push({
            month:i,
            commision:commision,
            doctor_commision:doctor_commision,
            month_name: monthName                                     
        }); 
        if(i==12)
        {
          resolve(month_array);
        }
    } 
      
       
    })
  }

function formatIncomeMonthWise(income_details,start_month)
  { 
    return new Promise( async (resolve)=>{
    var month_array=[],amount;
    for( i=1;i<=12;i++)
    {    
        amount=0;
        
         
        
         var filter_values= await income_details.filter((val)=>{ 
          return (val.month == i)
       })
       var monthName=await getMonthName(i)    ;

       console.log("filter_values",filter_values);
       console.log("filter_values[0]",filter_values[0]);  
       amount= (filter_values.length>0)?(filter_values[0].amount):0
       console.log("amount",amount);  
       month_array.push({
            month:i,
            amount:amount,
            month_name: monthName                                     
        }); 
        if(i==12)
        {
          resolve(month_array);
        }
    } 
      
       
    })
  }
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

Router.post("/getReferral", async function(req, res) {
  try{
 
  var reqParam=req.body,exeQuery="";    

  var pageno=reqParam.pageno; 
      

  if(reqParam.limit==undefined || reqParam.limit=="0" ||reqParam.limit=="" )
  {   
    res.send({ status: 0, msg: "Enter Valid Limit", data: [] }); 
  }
  console.log(reqParam.pageno);   
  if(reqParam.pageno==undefined )    
  {       
  res.send({ status: 0, msg: "Enter Valid Page Number", data: [] });    
  }         
  var offset=(pageno-1)*reqParam.limit;   
  var Nextoffset=(pageno)*reqParam.limit ;     

  trycatch(async function(){
    var response=dbcontext.Get_Referal(reqParam.doctor_id,reqParam.refer_date,reqParam.limit,offset) 
    if(response.length>0)
    {  
      response.forEach(async (value,index)=>
      {     
        var refid=response[index].ref_id;
        console.log("refid",refid);
        var id=response[index].id;
        var response2
        switch(response[index].type.toUpperCase())
        { 
          case "LAB":
             response2=dbcontext.Get_Referal_List('LAB',refid,id) 
          break;
          case "DOCTOR": 
            var response2=dbcontext.Get_Referal_List('DOCTOR',refid,id) 
          break;    
          case "PHARMACY":
          var response2=dbcontext.Get_Referal_List('PHARMACY',refid,id) 
          break; 
        }          
        response[index].type_info=response2 ;   
        if(response.length-1==index) 
        { 

          trycatch(async function(){
            var nextcount= await dbcontext.Get_Referal_Count(reqParam.doctor_id,reqParam.refer_date,reqParam.limit,Nextoffset) 
            console.log("nextcount",nextcount);
            nextcount = nextcount[0].NextRowCount; 
            res.send({status:1,msg:"success",data: [{details:response,nextCount:nextcount}]  }); 

       },function(error){
            res.send({ status: 0, msg: 'Failed', data: error }); 
          });

         
        
    
        }

      }); 

    } 
    else
    {
      res.send({status:1,msg:"success",data:[{details:response,nextCount:0}]}); 
    }


},function(error){
    res.send({ status: 0, msg: 'Failed', data: error }); 
  });

  

} catch(err){
  console.log('cache error' + err);
 }

})

Router.put("/mediaSortOrder", function (req, res) {
  
  var query="",reqParams=req.body;
  var vendorId=reqParams.vendor_id;
  var sorting=reqParams.sorting;
  if(sorting.length>0) 
  {
  for(i in sorting)
  {
    trycatch(async function(){
      var response =dbcontext.Update_MediaSortOrder(sorting[i].sort_order,sorting[i].media_id,vendorId)
      res.send({ status: 0, msg: "Failed", data: response });
 },function(error){
      res.send({ status: 0, msg: 'Failed', data: error }); 
    });

  }
}
else 
{    

  res.status(401).send({status:0,msg:"Atleast one row must be selected to rearrange"});
}

})  

 

Router.post("/getAppointmentList", async function(req, res) {
try{
  
  var reqParams = req.body;           
  var patientType=reqParams.patient_type;
  var period=reqParams.period; 
 const patientMediaPath = "http://65.1.90.247:8000/uploads/";
  var query="";     
  
  

  switch(period.toUpperCase())   
  {               
     case "DAY":                    
    

        trycatch(async function(){
          var response =dbcontext.Get_AppintmentList(patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.search_date,reqParams.search_date_to)
         console.log(response); 
            
       var result= response;   
        
       console.log('venkat1',result.length)
       
       if (result.length>0){
       switch(patientType.toUpperCase())
       { 
       case "0":     
      
           result=result.filter((val)=>val.appointment_type_id=='0');
           break; 
        case "1":    
           result=result.filter((val)=>val.appointment_type_id=='1');
           break;  
        case "2":     
           result=result.filter((val)=>val.appointment_type_id=='2');
           break;       
        case "3":    
           result=result.filter((val)=>val.appointment_type_id=='3');
           break; 
      
       
       }   
      }          
       
       res.status(200).send({ status: 1, msg: 'Success', data: [{result:result}] });   
          
     },function(error){
      res.send({ status: 0, msg: "Failed", data: response });
        });


        break;      
       
  } 
                
} catch(err){
  console.log('cache error' + err);
 } 
});        



Router.post("/getClinicAppointmentList", async function(req, res) {
  try{
   
    var reqParams = req.body;           
    var patientType=reqParams.patient_type;
    var period=reqParams.period; 
    const patientMediaPath = Globallinks.patientMediaPath;  
    var query="";     
    
    
   
    switch(period.toUpperCase())   
    {               
       case "DAY":                    
      
  
          trycatch(async function(){
            var response =dbcontext.Get_ClinicAppintmentList(patientMediaPath,reqParams.clinic_id,reqParams.doctor_id,reqParams.search_date,reqParams.search_date_to)
           console.log(response); 
              
         var result= response;   
         
         console.log('venkat1',result.length)
         
         if (result.length>0){
         switch(patientType.toUpperCase())
         { 
         case "0":     
        
             result=result.filter((val)=>val.appointment_type_id=='0');
             break; 
          case "1":     
             result=result.filter((val)=>val.appointment_type_id=='1');
             break;  
          case "2":     
             result=result.filter((val)=>val.appointment_type_id=='2');
             break;       
          case "3":     
             result=result.filter((val)=>val.appointment_type_id=='3');
             break; 
        
         
         }   
        }          
         
         res.status(200).send({ status: 1, msg: 'Success', data: [{result:result}] });   
            
       },function(error){
        res.send({ status: 0, msg: "Failed", data: response });
          });
  
  
          break;      
         
    } 
                  
  } catch(err){
    console.log('cache error' + err);
   } 
  }); 
Router.get('/get_mas_doctor_speciality',async (req,res)=>{
try{
  
  trycatch(async function(){
    var response =dbcontext.Get_Mas_doctor_Speciality(doctorMediaPath);
    res.send({ status: 1, msg: 'Success', data: response }); 
  },function(error){
    res.send({ status: 0, msg: "Failed", data: error });
      });
}    catch(err){
  console.log('cache error' + err);
 }
 }); 


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

  Router.post('/loorder', function (req, res) 
  {
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


    Router.post('/labCalendarSlots',async(req,res)=>{
      var reqParam=req.body;  

      try
      {
      var response =dbcontext.Get_Calandarslots(reqParam.lab_id,reqParam.from_date,reqParam.to_date); 
      var getDate=response;     
      var start_date=new Date(reqParam.from_date);
      var end_date=new Date(reqParam.to_date); 
      var output=await GenerateDate(start_date,end_date); 
      console.log(getDate);  
     
      var len;
      console.log(output);
       output.forEach((value,i)=>{
        var getTotal=getDate.filter((val)=>val.date==output[i].date);
        output[i].total=getTotal.length>0?getTotal[0].total:0;
        
  
      })
  
      res.send({ status: 1, msg: 'Success', data: output }); 
      }
      catch(error)
      {
        res.send({ status: 0, msg: 'Failed', data: err }); 
      }
            
      });          
    



module.exports=Router;
