
const dbcontext=require("../service/DBCommon");

module.exports = {
    testcall: function() {
        debugger;
        var params = new Object();
        params.tUserName = "epro";
        params.tPassword = "123";
        return dbcontext.CallSP(dbcontext, "category_select", params);
      },

      testsp: function() {
        return dbcontext.CallSPWithoutParam(dbcontext, "category_select");
      },

  usergroupselect: function() {
        var params = new Object();
        params=""
       

        return dbcontext.CallSPWithoutParam(dbcontext, "usergroup_select");
      },

      allmenu: function() {
        var params = new Object();
        params=""
     

        return dbcontext.CallSPWithoutParam(dbcontext, "all_menu");
      },
      
      rolist: function() {
        var params = new Object();
        params=""
     

        return dbcontext.CallSPWithoutParam(dbcontext, "ro_list");
      },
      lolist: function() {
        var params = new Object();
        params=""
     

        return dbcontext.CallSPWithoutParam(dbcontext, "lo_list");
      },
      shoptype: function() {
        var params = new Object();
        params=""
     

        return dbcontext.CallSPWithoutParam(dbcontext, "shoptype");
      },

      CategoryList: function() {
        var params = new Object();
        params=""
     

        return dbcontext.CallSPWithoutParam(dbcontext, "categorylist");
      },
      productall: function() {
        var params = new Object();
        params=""
     
        return dbcontext.CallSPWithoutParam(dbcontext, "productall");
      },

      userselectall: function(user_name,page,rp) {
        var params = new Object();
        params.p_user_name=user_name;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "user_select_all",params);
      },

      usermenu: function(user_code) {
        var params = new Object();
        params.p_user_code=user_code;
        return dbcontext.CallSP(dbcontext, "user_menu",params);
      },

      userlist: function(userName,mobileno,searchValue,createdBy,userType,page,rp) {
        var params = new Object();
        params.p_username=userName;
        params.p_mobileno=mobileno;
        params.p_searchValue=searchValue;
        params.p_createdBy=createdBy;
        params.p_usertype=userType;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "userlist",params);
      },

      shoplist: function(userName,searchValue,createdBy,status,name,mobileno,page,rp) {
        var params = new Object();
        params.p_username=userName;
        params.p_searchValue=searchValue;
        params.p_createdBy=createdBy;
        params.p_name=name;
        params.p_mobile=mobileno;
        params.p_status=status;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "shoplist",params);
      },

      orderlist: function(order_no,lo_code,page,rp) {
        var params = new Object();
        params.p_order_no=order_no;
        params.p_lo_code=lo_code;
         params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "orderlist",params);
      },
      orderdetlist: function(order_no,page,rp) {
        var params = new Object();
        params.p_order_no=order_no;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "orderdetail_list",params);
      },

      userdelete: function(userid) {
        var params = new Object();
        params.p_user_id=userid;
       
        return dbcontext.CallSP(dbcontext, "userlist_del",params);
      },
      shopdelete: function(userid) {
        var params = new Object();
        params.p_shopid=userid;
       
        return dbcontext.CallSP(dbcontext, "shoplist_del",params);
      },
      ProductDelete: function(userid) {
        var params = new Object();
        params.p_prodid=userid;
       
        return dbcontext.CallSP(dbcontext, "product_del",params);
      },
      OrderdetDelete: function(userid) {
        var params = new Object();
        params.orderdetid=userid;
       
        return dbcontext.CallSP(dbcontext, "orderdet_del",params);
      },
      OrderheadDelete: function(userid) {
        var params = new Object();
        params.order_id=userid;
        return dbcontext.CallSP(dbcontext, "orderhead_del",params);
      },



      productlist: function(product_id,product_name,page,rp) {
        var params = new Object();
        params.p_product_id=product_id;
        params.p_product_name=product_name;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "product_list",params);
      },

      
      Usermaplocation: function(userid,lattitude,longtitude) {
        var params = new Object();
        params.p_userid=userid;
        params.p_lattitude=lattitude;
        params.p_longtitude=longtitude;
        
        return dbcontext.CallSP(dbcontext, "user_map_ins",params);
      },
      GetUsermaplocation: function(userid,logdate) {
        var params = new Object();
        params.p_userid=userid;
        params.p_date=logdate;
        
        return dbcontext.CallSP(dbcontext, "get_user_map",params);
      },

      productbyid: function(product_id) {
        var params = new Object();
        params.p_productid=product_id;
         return dbcontext.CallSP(dbcontext, "productbyid",params);
      },
      getdocno: function(companycode,doc_type) {
        var params = new Object();
        params.p_company_code=companycode;
        params.p_control_name=doc_type;
         return dbcontext.CallSP(dbcontext, "GET_NEXT_APPCONTROL_NUMBER",params);
      },



      usersbyrole: function(role_id) {
        var params = new Object();
        params.p_role_id=role_id;
          
        return dbcontext.CallSP(dbcontext, "user_select_byroleid", params);
      },

      deleteuser: function(user_id) {
        var params = new Object();
        params.p_user_sys_id=user_id;
          
        return dbcontext.CallSP(dbcontext, "delete_user_byid", params);
      },

      checklogin: function(user_code,user_pwd) {
        var params = new Object();
        params.p_user_code=user_code;
        params.p_password=user_pwd;
      

        return dbcontext.CallSP(dbcontext, "check_login", params);
      },
      CreateUserDetail: function(
        userid,userName,password,roleId,companyId,displayName,userEmail,userMobile,userType,
      pincode,companyName,companyAddress,companyEmailAddress,companyGst,companyPhoneNumber,
      companyPincode,proprietorAddress,proprietorEmailAddress,proprietorName,proprietorPhoneNumber
      ,pic,district)
         {
        var params = new Object();
        params.p_user_id=0;
        params.p_userName=userName;
        params.p_password=password;
        params.p_roleId=roleId;
        params.p_companyId=companyId;
        params.p_displayName=displayName;
        params.p_userEmail=userEmail;
        params.p_userMobile=userMobile;
        params.p_userType=userType;
        params.p_pincode=pincode;
        params.p_pic=pic;
        params.p_district=district;
        params.p_companyName=companyName;
        params.p_companyAddress=companyAddress;
        params.p_companyEmailAddress=companyEmailAddress;
        params.p_companyGst=companyGst;
        params.p_companyPhoneNumber=companyPhoneNumber;
        params.p_companyPincode=companyPincode;
        params.p_proprietorAddress=proprietorAddress;
        params.p_proprietorEmailAddress=proprietorEmailAddress;
        params.p_proprietorName=proprietorName;
        params.p_proprietorPhoneNumber=proprietorPhoneNumber;
        params.p_proprietorUniqueNumber="";
        params.p_c_user="";
       

                
        return dbcontext.CallSP(dbcontext, "userlist_Ins_Upd_del", params);
      },

      CreateShopdetail: function(shopid, name,shopOwner,ownerNumber,pincode,area,shopType,street,landMark,pics,
      district,state,lattitude,longtitude,companyId,walletamt,location,roid,
      c_user)
         {
        var params = new Object();
        params.p_shopid=shopid;
        params.p_name=name;
        params.p_location=location;
        params.p_ownerNumber=ownerNumber;
        params.p_shopOwner=shopOwner;
        params.p_shopType=shopType;
        params.p_pincode=pincode;
        params.p_area=area;
        params.p_street=street;
        params.p_landMark=landMark;
        params.p_district=district;
        params.p_state=state;
        params.p_status="";
        params.p_pics=pics;
        params.p_new=1;
        params.p_terms=1;
        params.p_month=0;
        params.p_userName="";
        params.p_companyId=companyId;
        params.p_comments="";
        params.p_lattitude=lattitude;
        params.p_longtitude=longtitude;
        params.p_roid="";
        params.p_locode = ""
        params.p_walletamt = 0;
        params.p_c_user=c_user;
       

                
        return dbcontext.CallSP(dbcontext, "shoplist_Ins_Upd_del", params);
      },


      CreateProduct: function(
        product_sys_id, productId, productName,category,type,weightType,units,basicPrice,loMargin,loSelling,
      productGst,mrpPrice,lobasicPrice,loGst,loMrpPrice,c_user,pcsperunit    )
         {
        var params = new Object();
        params.p_prod_sys_id=product_sys_id;
        params.p_product_id=productId;
        params.p_product_name=productName;
        params.p_category_code=category;
        params.p_shop_type_code=type;
        params.p_weight_type=weightType;
        params.p_units=units;
        params.p_mrp_price=mrpPrice;
        params.p_productgst=productGst;
        params.p_basic_price=basicPrice;
        params.p_lo_margin=loMargin;
        params.p_selling_price=loSelling;
        params.p_lo_basic_price=lobasicPrice;
        params.p_lo_gst_per=loGst;
        params.p_lo_mrp_price=loMrpPrice;
        params.p_pcsperunit=pcsperunit;
        params.p_c_user=c_user;
                              
        return dbcontext.CallSP(dbcontext, "product_ins_upd", params);
      },

      
      CreateShopType: function(type)
         {
        var params = new Object();
        params.p_shoptypeid=0;
        params.p_shoptype=type;
      
                              
        return dbcontext.CallSP(dbcontext, "Shoptype_ins_upd", params);
      },

      CreateCategory: function(category)
         {
        var params = new Object();
        params.p_catsysid=0;
        params.p_category_name=category;
      
                              
        return dbcontext.CallSP(dbcontext, "Category_ins_upd", params);
      },
      ShoptypeDelete: function(userid) {
        var params = new Object();
        params.p_shoptypeid=userid;
       
        return dbcontext.CallSP(dbcontext, "Shoptype_del",params);
      },
      CategoryDelete: function(userid) {
        var params = new Object();
        params.p_catsysid=userid;
       
        return dbcontext.CallSP(dbcontext, "Category_del",params);
      },
      
      CreateOrderHead: function(
        orderid, orderno, orderdate,locode,remarks,ordervalue,companyId,c_user)
         {
        var params = new Object();
        params.p_order_id=orderid;
        params.p_order_no=orderno;
        params.p_order_date=orderdate;
        params.p_lo_code=locode;
        params.p_remarks=remarks;
        params.p_order_value=ordervalue;
        params.p_companyid=companyId;
        params.p_c_user=c_user;
                              
        return dbcontext.CallSP(dbcontext, "orderhead_ins_upd", params);
      },

      CreateOrderDetail: function(
        orderdetid, orderno, productId,noofunit,lobasicprice,totalvalue,gstper,gstamt,netvalue,companyId,c_user      )
         {
        var params = new Object();
        params.p_order_det_sysid=orderdetid;
        params.p_orderno=orderno;
        params.p_noofunit=noofunit;
        params.p_productid=productId;
        params.p_unitrate=lobasicprice;
        params.p_gstper=gstper;
        params.p_totalvalue=totalvalue;
        params.p_gstamt=gstamt;
        params.p_netamount=netvalue;
        params.p_companyid=companyId;
        params.p_c_user=c_user;
                              
        return dbcontext.CallSP(dbcontext, "orderdet_ins_upd", params);
      },

      
      Loorderno: function(Locode) {
        var params = new Object();
        params.p_userName=Locode;
         return dbcontext.CallSP(dbcontext, "lo_orderno_list",params);
      },

      LoPendingOrder: function(Locode,orderno) {
        var params = new Object();
        params.p_locode=Locode;
        params.p_orderno=orderno;
         return dbcontext.CallSP(dbcontext, "lo_pendingorder",params);
      },

      InvliceList: function(Invno,lo_code,page,rp) {
        var params = new Object();
        params.p_invno=Invno;
        params.p_locode=lo_code;
         params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "rom_bill_hd_list",params);
      },

      invoicedetlist: function(invno,page,rp) {
        var params = new Object();
        params.p_invno=invno;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "rom_bill_det_list",params);
      },


      CreateInvHead: function(
        invid,
      invno, orderno, invdate,locode,remarks,invvalue,companyId,c_user )
         {
        var params = new Object();
        params.p_rom_invhd_id=invid;
        params.p_invno=invno;
        params.p_invdate=invdate;
        params.p_locode=locode;
        params.p_orderno=orderno;
        params.p_remarks=remarks;
        params.p_invvalue=invvalue;
        params.p_companyid=companyId;
        params.p_c_user=c_user;
                              
        return dbcontext.CallSP(dbcontext, "rom_bill_hd_ins_Upd", params);
      },

      CreateInvDetail: function(
        invdetid,invno, orderno, productId,noofunit,lobasicprice,totalvalue,gstper,gstamt,netvalue,companyId,c_user      )
         {
        var params = new Object();
        params.p_rom_invdet_id=invdetid;
        params.p_invno=invno;
        params.p_orderno=orderno;
        params.p_noofunit=noofunit;
        params.p_productid=productId;
        params.p_unitrate=lobasicprice;
        params.p_gstper=gstper;
        params.p_totalvalue=totalvalue;
        params.p_gstamt=gstamt;
        params.p_netamount=netvalue;
        params.p_companyid=companyId;
        params.p_c_user=c_user;
                              
        return dbcontext.CallSP(dbcontext, "rombill_det_ins_upd", params);
      },

      InvoiceHeadDelete: function(userid) {
        var params = new Object();
        params.inv_id=userid;
        return dbcontext.CallSP(dbcontext, "rom_bill_hd_dl",params);
      },

      InvoicedetDelete: function(userid) {
        var params = new Object();
        params.p_invid=userid;
       
        return dbcontext.CallSP(dbcontext, "rom_bill_det_dl",params);
      },

      CreateGalleryDetail: function(
        sys_id,staff_code,file_name,file_type,file_path,
        file_url,galary_type_id,file_approved_by,active,c_user)
         {
        var params = new Object();
        params.p_sys_id=sys_id;
        params.p_user_code=staff_code;
        params.p_file_name=file_name;
        params.p_file_type=file_type;
        params.p_file_path=file_path;
        params.p_file_url=file_url;
        params.p_gallery_type_id=galary_type_id;
        params.p_file_approved_by=file_approved_by;
        params.p_active=active;
        params.p_cuser=c_user;

                
        return dbcontext.CallSP(dbcontext, "Insert_Update_Gallery", params);
      },

      shopstatus: function(compnayid,usercode,usertype) {
        var params = new Object();
        params.p_companyID=compnayid;
        params.p_usercode=usercode;
        params.p_usertype=usertype;

         return dbcontext.CallSP(dbcontext, "shop_status",params);
      },
      userstatus: function(compnayid,usercode,usertype) {
        var params = new Object();
        params.p_companyID=compnayid;
        params.p_usercode=usercode;
        params.p_usertype=usertype;

         return dbcontext.CallSP(dbcontext, "user_status",params);
      },
      CreateCalander: function(
        user_code,event_date,start_time,
        user_email,event_description,location,user_name,mobile_no,title,all_day
        ,c_user)
         {
        var params = new Object();
        params.p_option=1;
        params.p_calander_id=0;
        params.p_user_code=user_code;
        params.p_event_date=event_date;
        params.p_start_time=start_time;
        params.p_user_emailid=user_email;
        params.p_event_description=event_description;
        params.p_location=location;
        params.p_user_name=user_name;
        params.p_mobile_no=mobile_no;
        params.p_title=title;
        params.p_all_day=all_day;
        params.p_event_status=0;
        params.p_cuser=c_user;

                
        return dbcontext.CallSP(dbcontext, "calander_event_Ins_Upd_del", params);
      },
      UpdateCalander: function(calander_id,
        user_code,event_date,start_time,
        user_email,event_description,location,user_name,mobile_no,title,all_day
        ,event_status,c_user)
         {
        var params = new Object();
        params.p_option=2;
        params.p_calander_id=calander_id;
        params.p_user_code=user_code;
        params.p_event_date=event_date;
        params.p_start_time=start_time;
        params.p_user_emailid=user_email;
        params.p_event_description=event_description;
        params.p_location=location;
        params.p_user_name=user_name;
        params.p_mobile_no=mobile_no;
        params.p_title=title;
        params.p_all_day=all_day;
        params.p_event_status=event_status;
        params.p_cuser=c_user;

                
        return dbcontext.CallSP(dbcontext, "calander_event_Ins_Upd_del", params);
      },

      Createtask: function(
        user_code,task_date,
        user_email,task_description,title,c_user)
         {
        var params = new Object();
        params.p_option=1;
        params.p_task_id=0;
        params.p_user_code=user_code;
        params.p_task_date=task_date;
        params.p_user_emailid=user_email;
        params.p_title=title;
        params.p_task_description=task_description;
        params.p_task_complete=0;
        params.p_cuser=c_user;

                
        return dbcontext.CallSP(dbcontext, "user_task_Ins_Upd_del", params);
      },

      updatetask: function(user_code,task_id,task_date,user_email,task_description,task_status,title,c_user) {
        var params = new Object();
        params.p_option=2;
        params.p_task_id=task_id;
        params.p_user_code=user_code;
        params.p_task_date=task_date;
        params.p_user_emailid=user_email;
        params.p_title=title;
        params.p_task_description=task_description;
        params.p_task_complete=task_status;
        params.p_cuser=c_user;
        
     

        return dbcontext.CallSP(dbcontext, "user_task_Ins_Upd_del",params);
      },

      taskselect: function(user_code,event_date,page,rp) {
        var params = new Object();
        params.p_user_code=user_code;
        params.p_task_date=event_date;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "task_select",params);
      },
      chastuserlist: function(user_code) {
        var params = new Object();
        params.p_from_user=user_code;
       
        
        return dbcontext.CallSP(dbcontext, "chat_user_list",params);
      },

      advancesearch: function(user_code,srchtype,from_date,to_date,title,page,rp) {
        var params = new Object();
        params.p_user_code=user_code;
        params.p_type=srchtype;
        params.p_from_date=from_date;
        params.p_to_date=to_date;
        params.p_title=title;
        params.p_page=page;
        params.p_rp=rp;
        
     

        return dbcontext.CallSP(dbcontext, "event_task_select",params);
      },

      galleryselect: function(gallerty_type_id,staff_code,file_name,file_type) {
        var params = new Object();
        params.p_gallery_type_id=gallerty_type_id;
        params.p_staff_code=staff_code;
        params.p_file_name=file_name;
        params.p_file_type=file_type;

        return dbcontext.CallSP(dbcontext, "gallery_select", params);
      },

      
      categoryselect: function(comp_code,cat_code,short_name,long_name) {
        var params = new Object();
        params.p_company_code=comp_code;
        params.p_category_code=cat_code;
        params.p_category_short_name=short_name;
        params.p_category_long_name=long_name;

        return dbcontext.CallSP(dbcontext, "category_select", params);
      },
      subcategoryselect: function(comp_code,cat_code,subcat_code,short_name,long_name) {
        var params = new Object();
        params.p_company_code=comp_code;
        params.p_category_code=cat_code;
        params.p_sub_category_code=subcat_code;
        params.p_sub_category_short_name=short_name;
        params.p_sub_category_long_name=long_name;

        return dbcontext.CallSP(dbcontext, "sub_category_select", params);
      },
      CitycodeSelect: function(comp_code,countrycode,city_code) {
        var params = new Object();
        params.p_company_code=comp_code;
        params.p_country_code=countrycode;
        params.p_city_code=city_code;
       

        return dbcontext.CallSP(dbcontext, "country_vs_city", params);
      },
      sellerslist: function(comp_code,cat_code,subcat_code,city_code) {
        var params = new Object();
        params.p_company_code=comp_code;
        params.p_category_code=cat_code;
        params.p_sub_category_code=subcat_code;
        params.p_city_code=city_code;
        
        return dbcontext.CallSP(dbcontext, "sellers_services_select_new", params);
      },
      filterlist: function(comp_code,cat_code,subcat_code) {
        var params = new Object();
        params.p_company_code=comp_code;
        params.p_category_code=cat_code;
        params.p_sub_category_code=subcat_code;
        
        return dbcontext.CallSP(dbcontext, "category_vs_filters_select", params);
      },

      buyersdetail: function(comp_code,email_id) {
        var params = new Object();
        params.p_company_code=comp_code;
        params.p_buyers_emailid=email_id;
        
        return dbcontext.CallSP(dbcontext, "buyers_enquiry_select", params);
      },


      savebuyers: function(
        options,
        buyers_id,
        company_code,
        email_id,
        buyers_name,
        buyers_password,
        add1,
        add2,
        add3,
        country_code,
        zipcode,
        m_country_Code,
        mobileno,
        t_country_code,
        telephone_no,
        alter_emailid,
        active,c_user,
        m_user,
        m_date
        
        ) {
        var params = new Object();
        params.p_option=options;
        params.p_buyers_sys_id=buyers_id;
        params.p_company_code=company_code;
        params.p_buyers_emailid=email_id;
        params.p_buyers_name=buyers_name;
        params.p_buyers_password=buyers_password;
        params.p_buyers_address_line1=add1;
        params.p_buyers_address_line2=add2;
        params.p_buyers_address_line3=add3;
        params.p_buyers_country_code=country_code;
        params.p_buyers_zip_code=zipcode;
        params.p_buyers_mobile_country_code=m_country_Code;
        params.p_buyers_mobile_number=mobileno;
        params.p_buyers_telephone_country_code=t_country_code;
        params.p_buyers_telephone_number=telephone_no;
        params.p_buyers_alternate_email_id=alter_emailid;
        params.p_active=active;
        params.p_c_user=c_user;
        params.p_m_user=m_user;
        params.p_m_date=m_date;
        
        return dbcontext.CallSP(dbcontext, "buyers_Ins_Upd", params);
      },


      savesellers: function(
        option,
        sellers_sys_id,
        company_code,
        sellers_emailid,
        sellers_name,
        sellers_password,
        sellers_address_line1,
        sellers_address_line2,
        sellers_address_line3,
        sellers_country_code,
        sellers_zip_code,
        sellers_mobile_country_code,
        sellers_mobile_number,
        sellers_telephone_country_code,
        sellers_telephone_number,
        sellers_alternate_email_id,
        active,
        c_user,
        m_user,
        m_date
        ) {
        var params = new Object();

        params.p_option=option;
        params.p_sellers_sys_id=sellers_sys_id;
        params.p_company_code=company_code;
        params.p_sellers_emailid=sellers_emailid;
        params.p_sellers_name=sellers_name;
        params.p_sellers_password=sellers_password;
        params.p_sellers_address_line1=sellers_address_line1;
        params.p_sellers_address_line2=sellers_address_line2;
        params.p_sellers_address_line3=sellers_address_line3;
        params.p_sellers_country_code=sellers_country_code;
        params.p_sellers_zip_code=sellers_zip_code;
        params.p_sellers_mobile_country_code=sellers_mobile_country_code;
        params.p_sellers_mobile_number=sellers_mobile_number;
        params.p_sellers_telephone_country_code=sellers_telephone_country_code;
        params.p_sellers_telephone_number=sellers_telephone_number;
        params.p_sellers_alternate_email_id=sellers_alternate_email_id;
        params.p_active=active;
        params.p_c_user=c_user;
        params.p_m_user=m_user;
        params.p_m_date=m_date;
         return dbcontext.CallSP(dbcontext, "sellers_Ins_Upd_sel_del", params);
      },

      savewishlist: function(
        options,company_code,buyers_email_id,
        sellers_email_id,catcode,sub_catcode,sessionid,
        enqrymsg       
        ) {
        var params = new Object();
        params.p_option=options;
        params.p_company_code=company_code;
        params.p_buyers_emailid=buyers_email_id;
        params.p_sellers_emailid=sellers_email_id;
        params.p_category_code=catcode;
        params.p_sub_category_code=sub_catcode;
        params.p_buyers_enquiry_cart_session_id=sessionid;
        params.p_buyers_enquiry_message=enqrymsg;
                
        return dbcontext.CallSP(dbcontext, "buyers_enquiry_Ins_Upd_del", params);
      },


      savesellerservice: function(
        options,company_code,sellers_email_id,catcode,sub_catcode,active
        )
         {
        var params = new Object();
        params.p_option=options;
        params.p_company_code=company_code;
        params.p_sellers_emailid=sellers_email_id;
        params.p_category_code=catcode;
        params.p_sub_category_code=sub_catcode;
        params.p_active=active;
                
        return dbcontext.CallSP(dbcontext, "sellers_service_info_sel_ins_upd_del", params);
      },

      sellervsfilter: function(
        options,company_code,catcode,sub_catcode,sellers_email_id,
        fcode1,foption1,fcode2,foption2,fcode3,foption3,fcode4,foption4,fcode5,foption5,user,filter_code)
         {
        var params = new Object();
        params.p_option=options;
        params.p_company_code=company_code;
        params.p_category_code=catcode;
        params.p_sub_category_code=sub_catcode;
        params.p_sellers_emailid=sellers_email_id;
        params.p_filter_code1=fcode1;
        params.p_filter_option_code1=foption1;
        params.p_filter_code2=fcode2;
        params.p_filter_option_code2=foption2;
        params.p_filter_code3=fcode3;
        params.p_filter_option_code3=foption3;
        params.p_filter_code4=fcode4;
        params.p_filter_option_code4=foption4;
        params.p_filter_code5=fcode5;
        params.p_filter_option_code5=foption5;
        params.p_user=user;
        params.v_option_code=filter_code;
                
        return dbcontext.CallSP(dbcontext, "sellers_vs_filter_option_sel_ins_upd_del", params);
      },


      buyers_enquiry: function(company_code,buyers_emailid)
      {
        var params = new Object();
        params.p_company_code=company_code;
        params.p_buyers_emailid=buyers_emailid;
        return dbcontext.CallSP(dbcontext,"buyers_enquiry_select",params);
      },

      sellers_general: function(
        option,
        sellers_sys_id,
        company_code,
        sellers_emailid,
        sellers_name,
        sellers_password,
        sellers_address_line1,
        sellers_address_line2,
        sellers_address_line3,
        sellers_country_code,
        sellers_zip_code,
        sellers_mobile_country_code,
        sellers_mobile_number,
        sellers_telephone_country_code,
        sellers_telephone_number,
        sellers_facebook_link,
        sellers_twitter_link,
        sellers_instagram_link,
        sellers_youtube_link,
        sellers_website,
        sellers_business_establish_date,
        trade_business,
        type_of_business,
        uen_number,
        registration_date,
        willing_to_travel_in_km,
        sellers_alternate_email_id)
      {
        var params = new Object();
        params.p_option=option
        params.p_sellers_sys_id=sellers_sys_id
        params.p_company_code=company_code
        params.p_sellers_emailid=sellers_emailid
        params.p_sellers_name=sellers_name
        params.p_sellers_password=sellers_password
        params.p_sellers_address_line1=sellers_address_line1
        params.p_sellers_address_line2=sellers_address_line2
        params.p_sellers_address_line3=sellers_address_line3
        params.p_sellers_country_code=sellers_country_code
        params.p_sellers_zip_code=sellers_zip_code
        params.p_sellers_mobile_country_code=sellers_mobile_country_code
        params.p_sellers_mobile_number=sellers_mobile_number
        params.p_sellers_telephone_country_code=sellers_telephone_country_code
        params.p_sellers_telephone_number=sellers_telephone_number
        params.p_sellers_facebook_link=sellers_facebook_link
        params.p_sellers_twitter_link=sellers_twitter_link
        params.p_sellers_instagram_link= sellers_instagram_link
        params.p_sellers_youtube_link=sellers_youtube_link
        params.p_sellers_website=sellers_website
        params.p_sellers_business_establish_date =sellers_business_establish_date
        params.p_trade_business=trade_business
        params.p_type_of_business=type_of_business
        params.p_uen_number=uen_number
        params.p_registration_date=registration_date
        params.p_willing_to_travel_in_km =willing_to_travel_in_km
        params.p_sellers_alternate_email_id =sellers_alternate_email_id
      
        return dbcontext.CallSP(dbcontext,"sellers_general_sel_upd_del",params);
      },

      sellers_business: function(
        option,
        sellers_business_sys_id,
        company_code,
        sellers_emailid,
        sellers_about_me,
        sellers_business_description)
      {
        var params = new Object();
        params.p_option=option,
        params.p_sellers_business_sys_id=sellers_business_sys_id,
        params.p_company_code  =company_code,
        params.p_sellers_emailid =sellers_emailid,
        params.p_sellers_about_me =sellers_about_me,
        params.p_sellers_business_description=sellers_business_description
        return dbcontext.CallSP(dbcontext,"sellers_business_sel_upd_del",params);
      },

      buyers_reply_to_seller_via_email: function(
        option,
        company_code,
        buyers_emailid,
        sellers_emailid,
        category_code,
        sub_category_code,
        subject,
        buyers_enquiry_message)
      {
        var params = new Object();
        params.p_option=option,
        params.p_company_code=company_code,
        params.p_buyers_emailid=buyers_emailid,
        params.p_sellers_emailid=sellers_emailid,
        params.p_category_code=category_code,
        params.p_sub_category_code=sub_category_code,
        params.p_subject=subject,
        params.p_buyers_enquiry_message=buyers_enquiry_message
        return dbcontext.CallSP(dbcontext,"buyers_reply_to_seller_via_email",params);
      },



      sellers_image_Ins_Upd_sel_del: function(
        option,
        company_code,
        sellers_emailid,
        profile_link,
        sellers_image_directory_name)
        {

        var params = new Object();
        params.p_option=option,
        params.p_company_code=company_code,
        params.p_sellers_emailid=sellers_emailid,
        params.p_profile_link=profile_link,
        params.p_sellers_image_directory_name=sellers_image_directory_name
        return dbcontext.CallSP(dbcontext,"sellers_image_Ins_Upd_sel_del",params);
      },
      feedbacksave: function(
        option,
        company_code,
        buyers_email_id,
        sellers_email_id,
        feedback_msg)
        {

        var params = new Object(); 
        params.p_option=option,
        params.p_company_code=company_code,
        params.p_buyers_emailid=buyers_email_id,
        params.p_sellers_emailid=sellers_email_id,
        params.p_buyers_feedback_message=feedback_msg
        return dbcontext.CallSP(dbcontext,"feedback_sel_Ins_Upd_del",params);
      },


      updateuserlist: function(
        user_id ,
        pic_location ,
        userMobile )
        {
          var params = new Object();
          params.p_user_id=user_id,
          params.p_pic_location=pic_location,
          params.p_userMobile=userMobile

          return dbcontext.CallSP(dbcontext,"update_userlist",params);
        },

        doctorlogin:function(mobileno,mas_type)
        {
         var params = new Object();
         params.p_mobileno = mobileno;
         params.p_master_type = mas_type;
         return dbcontext.CallSP(dbcontext, "doctor_login",params);
        },
        list_otp:function(mobileno,mas_type)
        {
         var params = new Object();
         params.p_mobileno = mobileno;
         params.p_master_type = mas_type;
         return dbcontext.CallSP(dbcontext, "list_otp",params);
        },
     
        insert_otp:function(countryCode,mobileno,otp,requestTime,mas_type)
        {
         var params = new Object();
         params.p_otp_countrycode = countryCode;
         params.p_otp_mobileno = mobileno;
         params.p_otp = otp;
         params.p_otp_arrivedtime = requestTime;
         params.p_master_type = mas_type;
         return dbcontext.CallSP(dbcontext, "Insert_otp",params);
        },        
  update_otp:function(mobileno,otp,requestTime,mas_type)
   {
    var params = new Object();
    params.p_otp_mobileno = mobileno;
    params.p_otp = otp;
    params.p_otp_arrivedtime = requestTime;
    params.p_master_type = mas_type;
    return dbcontext.CallSP(dbcontext, "update_otp",params);
   },
   Get_User_Master:function(mobileno,mediapath)
   {
    var params = new Object();
    params.p_mobileno = mobileno;
    params.p_mediapath = mediapath;
    
    return dbcontext.CallSP(dbcontext, "get_user_master",params);
   },
   verify_doctor_otp:function(mobileno,otp,mas_type)
   {
    var params = new Object();
    params.p_otp = otp;
    params.p_otp_mobileno = mobileno;
    params.p_master_type = mas_type;
    return dbcontext.CallSP(dbcontext, "verify_doctor_otp",params);
   },
   getvendordetails:function(doctorId,path)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    params.p_path = path;
    return dbcontext.CallSP(dbcontext, "get_vendordetails",params);
   },
   getdoctorspeciality:function(doctorId)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_doctor_speciality",params);
   },

   CheckDuplicaton:function(clinicId,doctor_id)
   {
    var params = new Object();
    params.p_clinicid =clinicId;
    params.p_doctorid =doctor_id;
    
    return dbcontext.CallSP(dbcontext, "check_duplication",params);
   },
   update_tablename:function(table_name,column_name,imagename,columnfor,columnvalue)
   {
    var params = new Object();
    params.p_table_name = table_name;
    params.p_column_name = column_name;
    params.p_image_name = imagename;
    params.p_column_for = columnfor;
    params.p_column_value = columnvalue;
    
    return dbcontext.CallSP(dbcontext, "update_table_column",params);
   },
   GetNationality:function()
   {
    var params = new Object();
    params=""
 

    return dbcontext.CallSPWithoutParam(dbcontext, "get_nationality");
  

   },
   GetClinicList:function()
   {
    var params = new Object();
    params=""
    return dbcontext.CallSPWithoutParam(dbcontext, "get_ciliniclist");
   }, 
   GetDoctorSpeciality: function(media_path) {
    debugger;
    var params = new Object();
    params.p_doctor_media_path = media_path;
       return dbcontext.CallSP(dbcontext, "get_doctorspeciality_v1", params);
  },
  get_laplist:function()
  {
   var params = new Object();
   params=""
   return dbcontext.CallSPWithoutParam(dbcontext, "get_laplist");
  },
  get_laptestlist:function(laptestid)
  {
   var params = new Object();
   params.p_laptestid = laptestid;
return dbcontext.CallSP(dbcontext, "get_laptestlist", params);
  },
  getdoctorclinicsbyid:function(doctorId)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_doctor_clinicsbyid",params);
   },
   getdoctormasdealcount:function(doctorId)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_doctor_dealcount",params);
   },
   getdoctorsingledeails:function(doctorId,limit,offset,nextoffset)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    params.p_limit =limit;
    params.p_offset =offset;
    params.p_nextoffset =nextoffset;
    
    return dbcontext.CallSP(dbcontext, "get_single_deals",params);
   },
   InserDeails:function(dealtitle,dealvalidfrom,dealvalidto
    ,dealoptions,dealamount,dealactive,dealservicetypeId,dealvendorId
    ,userId,activeflag,createdby,createdon,modifiedby,modifiedon,ipaddress)
   {
    var params = new Object();
    params.p_title =dealtitle;
    params.p_dealvalidfrom =dealvalidfrom;
    params.p_dealvalidto =dealvalidto;
    params.p_dealoptions =dealoptions;
    params.p_dealamount =dealamount;
    params.p_dealactive =dealactive;
    params.p_dealservicetypeid =dealservicetypeId;
    params.p_dealvendorid =dealvendorId;
    params.p_userid =userId;
    params.p_activeflag =activeflag;
    params.p_createdby =createdby;
    params.p_createdon =createdon;
    params.p_modifiedby =modifiedby;
    params.p_modifiedon =modifiedon;
    params.p_ipaddress =ipaddress;
    
    return dbcontext.CallSP(dbcontext, "insert_deals",params);
   },
   getservicenames:function(doctorId)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_servicenames",params);
   },
   EditDeals:function(dealtitle,dealvalidfrom,dealvalidto,dealoptions
    ,dealamount,dealactive,dealservicetypeId,dealvendorId,userId,activeflag
    ,createdby,createdon,modifiedby,modifiedon,ipaddress,Id)
   {
    var params = new Object();
    params.p_title =dealtitle;
    params.p_dealvalidfrom =dealvalidfrom;
    params.p_dealvalidto =dealvalidto;
    params.p_dealoptions =dealoptions;
    params.p_dealamount =dealamount;
    params.p_dealactive =dealactive;
    params.p_dealservicetypeid =dealservicetypeId;
    params.p_dealvendorid =dealvendorId;
    params.p_userid =userId;
    params.p_activeflag =activeflag;
    params.p_createdby =createdby;
    params.p_createdon =createdon;
    params.p_modifiedby =modifiedby;
    params.p_modifiedon =modifiedon;
    params.p_ipaddress =ipaddress;
    params.p_id =Id;
    
    return dbcontext.CallSP(dbcontext, "edit_deals",params);
   },

   DeleteDeals:function(dealsid)
   {
    var params = new Object();
    params.p_dealsid =dealsid;
    
    return dbcontext.CallSP(dbcontext, "delete_deals",params);
   },
   mediauploaddetailscount:function(doctorId,limit,offset)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    params.p_limit =limit;
    params.p_offset =offset;
    
    return dbcontext.CallSP(dbcontext, "media_uploaddetails_count",params);
   },
   mediauploaddetails:function(doctorId,limit,offset,path)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    params.p_path =path;
    params.p_limit =limit;
    params.p_offset =offset;
    
    
    return dbcontext.CallSP(dbcontext, "media_uploaddetails",params);
   },
   MediaUploadsInserDeails:function(mediatitle,mediatype,sortorder,mediadescription
    ,mediavendorId,isactive,activeflag,createdby,ipaddress,file_name,file_path,thumbnail_path)
   {
    var params = new Object();
    params.p_media_title =mediatitle;
    params.p_media_type =mediatype;
    params.p_media_sortorder =sortorder;
    params.p_media_description =mediadescription;
    params.p_media_vendorid =mediavendorId;
    params.p_media_isactive =isactive;
    params.p_media_activeflag =activeflag;
    params.p_createdby =createdby;
    params.p_ipaddress =ipaddress;
    params.p_filename =file_name;
    params.p_filepath =file_path;
    params.p_thumbnail_path =thumbnail_path;
    
    
    return dbcontext.CallSP(dbcontext, "insert_media_uploads",params);
   },
   MediaUploadsUpdateDeails:function(mediatitle,mediatype,sortorder,mediadescription
    ,mediavendorId,isactive,activeflag,modifiedby,ipaddress,file_name,file_path,id
    ,thumbnail_path)
   {
    var params = new Object();
    params.p_media_title =mediatitle;
    params.p_media_type =mediatype;
    params.p_media_sortorder =sortorder;
    params.p_media_description =mediadescription;
    params.p_media_vendorid =mediavendorId;
    params.p_media_isactive =isactive;
    params.p_media_activeflag =activeflag;
    params.p_modifiedby =modifiedby;
    params.p_ipaddress =ipaddress;
    params.p_filename =file_name;
    params.p_filepath =file_path;
    params.p_id =id;
    params.p_thumbnail_path =thumbnail_path;
    
    
    return dbcontext.CallSP(dbcontext, "update_media_uploads",params);
   },
   
   MediauploadDelete:function(Id)
   {
    var params = new Object();
    params.p_id =Id;
    
    
    return dbcontext.CallSP(dbcontext, "delete_mediaupload",params);
   },
   getAddbookingcount:function(doctorId)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_adbookingcount",params);
   },
   getAdBooking:function(doctorId,limit,offset,nextoffset)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    params.p_limit =limit;
    params.p_offset =offset;
    params.p_nextoffset =nextoffset;
    
    return dbcontext.CallSP(dbcontext, "get_adbooking",params);
   },
   getMas_placementlocation: function() {
    return dbcontext.CallSPWithoutParam(dbcontext, "get_mas_placement_location");
  },
  get_SizeMaster: function() {
    return dbcontext.CallSPWithoutParam(dbcontext, "get_mas_size_master");
  },
  Get_ad_rate_vendor: function(vendor_type_id,placement_location_id,size_id) {
    var params = new Object();
    params.p_vendor_type_id = vendor_type_id;
    params.p_placementlocation_id = placement_location_id;
    params.p_size_id = size_id;
       return dbcontext.CallSP(dbcontext, "get_ad_rate_vendor", params);
  },
  InsertAdBooking:function(adtitle,startdate,endDate,adtotaldays,adsize,adlocationId,adfeeperday,adtotalcost
    ,advendorId,activeflag,createdby,modifiedby,ipaddress,file_name,file_path)
   {
    var params = new Object();
    params.p_adtitle =adtitle;
    params.p_startdate =startdate;
    params.p_endDate =endDate;
    params.p_adtotaldays =adtotaldays;
    params.p_adsize =adsize;
    params.p_adlocationId =adlocationId;
    params.p_adfeeperday =adfeeperday;
    params.p_adtotalcost =adtotalcost;
    params.p_advendorId =advendorId;
    params.p_activeflag =activeflag;
    params.p_createdby =createdby;
    params.p_modifiedby =modifiedby;
    params.p_ipaddress =ipaddress;
    params.p_filename =file_name;
    params.p_filepath =file_path;
    
    return dbcontext.CallSP(dbcontext, "insert_adbooking",params);
   },
   GetAdvertDate:function(Id)
   {
    var params = new Object();
    params.p_id =Id;
    
    
    return dbcontext.CallSP(dbcontext, "get_advert_date",params);
   },
   UpdateAdBooking:function(adtitle,startdate,endDate,adsize,adtotaldays,adlocationId,adfeeperday,adtotalcost
    ,advendorId,activeflag,createdby,modifiedby,ipaddress,file_name,file_path,ad_id)
   {
    var params = new Object();
    params.p_adtitle =adtitle;
    params.p_startdate =startdate;
    params.p_endDate =endDate;
    params.p_adtotaldays =adtotaldays;
    params.p_adsize =adsize;
    params.p_adlocationId =adlocationId;
    params.p_adfeeperday =adfeeperday;
    params.p_adtotalcost =adtotalcost;
    params.p_advendorId =advendorId;
    params.p_activeflag =activeflag;
    params.p_createdby =createdby;
    params.p_modifiedby =modifiedby;
    params.p_ipaddress =ipaddress;
    params.ad_filename =file_name;
    params.ad_path_name =file_path;
    params.p_ad_id =ad_id;
    
    return dbcontext.CallSP(dbcontext, "update_adbooking",params);
   },
   deleteadbooking:function(id)
   {
    var params = new Object();
    params.p_id =id;
    
    return dbcontext.CallSP(dbcontext, "delete_adbooking",params);
   },
   get_masappointment_type: function() {
    var params = new Object();
    params=""
    return dbcontext.CallSPWithoutParam(dbcontext, "get_mas_appointment_type");
  },
  getdoctorappointemntsettings:function(doctorId,clinicId,limit,offset,Nextoffset)
  {
   var params = new Object();
   params.p_doctor_id =doctorId;
   params.p_clinic_id =clinicId;
   params.p_limit =limit;
   params.p_offset =offset;
   params.p_nextoffset =Nextoffset;
   
   return dbcontext.CallSP(dbcontext, "get_doct_appointmentsettings",params);
  },
  GetAppointmentdays:function(id)
  {
   var params = new Object();
   params.p_id =id;
   
   return dbcontext.CallSP(dbcontext, "get_appointmentdays",params);
  },
  getvalidation:function(doctorId,fromtime,totime,dayslist)
   {
    var params = new Object();
    params.p_doctor_id =doctorId;
    params.p_from_time =fromtime;
    params.p_to_time =totime;
    params.p_dayslist =dayslist;
    
    
    return dbcontext.CallSP(dbcontext, "get_appointment_id",params);
   },
   Insertdocappointments:function(clinicId,doctorId,fromtime,totime,slotduration,NoOfslots
    ,p_appointmenttype,createdby,ipaddress,dayslist)
   {
    var params = new Object();
    params.p_doctor_id =doctorId;
    params.p_from_time =fromtime;
    params.p_to_time =totime;
    params.p_clinic_id =clinicId;
    params.p_slotduration =slotduration;
    params.p_noofslot =NoOfslots;
    params.p_createdby =createdby;
    params.p_ipaddress =ipaddress;
    params.p_appointmenttype =p_appointmenttype;
    
    return dbcontext.CallSP(dbcontext, "insert_doc_appointementsettings",params);
   },
   InsertMasAppointmentDays:function(days,appointment_id)
   {
    var params = new Object();
    params.p_day_id =days;
    params.p_appointment_id =appointment_id;
   
    return dbcontext.CallSP(dbcontext, "insert_mas_appointmentdays",params);
   },
   Editdocappointments:function(Id,slotduration,NoOfslots
    ,p_appointmenttype,Modifiedby,ipaddress,dayslist,fromtime,totome)
   {
    var params = new Object();
    params.p_id =Id;
    params.p_slotduration =slotduration;
    params.p_noofslot =NoOfslots;
    params.p_appointmenttype =p_appointmenttype;
    params.p_modfiedby =Modifiedby;
    params.p_ipaddress =ipaddress;
    params.p_dayslist =dayslist;
    params.p_fromtime =fromtime;
    params.p_totime =totome;
    
    return dbcontext.CallSP(dbcontext, "edit_docappointmentsettings",params);
   },

   Deletedocappointments:function(Id)
   {
    var params = new Object();
    params.p_id =Id;
  
    
    return dbcontext.CallSP(dbcontext, "delete_appointmentsettings",params);
   },
   InsertLabReferal:function(patient_id,lab_id,remarks,created_by,doctor_id,file_name,file_path)
   {
    var params = new Object();
    params.p_patient_id =patient_id;
    params.p_lab_id =lab_id;
    params.p_remarks =remarks;
    params.p_created_by =created_by;
    params.p_doctor_id =doctor_id;
    params.p_filename =file_name;
    params.p_filepath =file_path;
    
    return dbcontext.CallSP(dbcontext, "insert_lab_referal",params);
   },
   InsertRefTest:function(test_id,lab_id,refId)
   {
    var params = new Object();
    params.p_test_id =test_id;
    params.p_lab_id =lab_id;
    params.p_ref_id =refId;
   
    return dbcontext.CallSP(dbcontext, "insert_mas_reftest",params);
   },

   InsertDocortReferal:function(patient_id,speciality_id,ref_doctor_id,remarks
    ,created_by,doctor_id,file_name,file_path)
   {
    var params = new Object();
    params.p_patient_id =patient_id;
    params.p_speciality_id =speciality_id;
    params.p_ref_doctor_id =ref_doctor_id;
    params.p_remarks =remarks;
    params.p_created_by =created_by;
    params.p_filename =file_name;
    params.p_filepath =file_path;
    params.p_doctor_id =doctor_id;
    
    return dbcontext.CallSP(dbcontext, "insert_doctor_referal",params);
   },
   getdoctorservicetype:function(doctorId)
   {
    var params = new Object();
    params.p_doctor_id =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_mas_doctor_servicetype",params);
   },
   getDoctorService:function(doctorId)
   {
    var params = new Object();
    params.p_doctor_id =doctorId;
    
    return dbcontext.CallSP(dbcontext, "get_doctor_service",params);
   },
   Deletedoctorservicetype:function(id)
   {
    var params = new Object();
    params.p_id =id;
    
    return dbcontext.CallSP(dbcontext, "delete_doctor_servicetype",params);
   },
   EditMasdoctorServiceType:function(slot,service_type,total
    ,doctor_id,active_flag,created_by,created_on,modified_by,modified_on
    ,id)
   {
    var params = new Object();
    params.p_slot =slot;
    params.p_servicetype =service_type;
    params.p_total =total;
    params.p_doctor_id =doctor_id;
    params.p_active_flag =active_flag;
    params.p_createdby =created_by;
    params.p_createdon =created_on;
    params.p_modifiedby =modified_by;
    params.p_modifiedon =modified_on;
    params.p_id =id;
    
    return dbcontext.CallSP(dbcontext, "edit_masdoctor_servicetype",params);
   },
   InsertMasdoctorServiceType:function(slot,service_type,total
    ,doctor_id,active_flag,created_by,created_on,modified_by,modified_on
    )
   {
    var params = new Object();
    params.p_slot =slot;
    params.p_servicetype =service_type;
    params.p_total =total;
    params.p_doctor_id =doctor_id;
    params.p_active_flag =active_flag;
    params.p_createdby =created_by;
    params.p_createdon =created_on;
    params.p_modifiedby =modified_by;
    params.p_modifiedon =modified_on;
    
    
    return dbcontext.CallSP(dbcontext, "insert_masdoctor_servicetype",params);
   },

   Insert_Doctor_Token:function(doctor_id,token_desc
    )
   {
    var params = new Object();
    params.p_doctor_id =doctor_id;
    params.p_token =token_desc;
        
    return dbcontext.CallSP(dbcontext, "insert_doctor_token",params);
   },
   Update_Doctor_Token:function(doctor_id,token_desc,id
    )
   {
    var params = new Object();
    params.p_doctor_id =doctor_id;
    params.p_token =token_desc;
    params.p_id =id;
        
    return dbcontext.CallSP(dbcontext, "update_doctor_token",params);
   },
   GetPatientList:function(mediapath,clinic_id,doctor_id
    ,book_date
    )
   {
    var params = new Object();
    params.p_patient_path =mediapath;
    params.p_clinic_id =clinic_id;
    params.p_doctor_id =doctor_id;
    params.p_book_date =book_date;
    
    return dbcontext.CallSP(dbcontext, "get_patient_list",params);
   },
   GetQueueList:function(mediapath,clinic_id,doctor_id
    ,book_date
    )
   {
    var params = new Object();
    params.p_patient_path =mediapath;
    params.p_clinic_id =clinic_id;
    params.p_doctor_id =doctor_id;
    params.p_book_date =book_date;
    
    return dbcontext.CallSP(dbcontext, "get_queue_list",params);
   },
   GetCancelledPatientList:function(p_datetype,mediapath,clinic_id,doctor_id,searchdate,searchtodate
    ,startdate,fin_fdate,fin_tdate)
   {
    var params = new Object();
    params.p_daytype =p_datetype;
    params.p_patient_path =clinic_id;
    params.p_clinic_id =clinic_id;
    params.p_doctor_id =doctor_id;
    params.p_search_date =searchdate;
    params.p_search_date_to =searchtodate;
    params.p_startdate =startdate;
    params.p_finyear_fdate =fin_fdate;
    params.p_finyear_tdate =fin_tdate;
    
    return dbcontext.CallSP(dbcontext, "get_cancelledpatientlist",params);
   },
   GetPatientReport:function(patientMediaPath,patient_id,clinic_id,doctor_id,book_date)
   {
    var params = new Object();
    params.p_media_path =patientMediaPath;
    params.p_patient_id =patient_id;
    params.p_clinic_id =clinic_id;
    params.p_doctor_id =doctor_id;
    params.p_book_date =book_date;
    
    return dbcontext.CallSP(dbcontext, "get_patient_report",params);
   },
   get_patient_history:function(patientMediaPath,patient_id)
   {
    var params = new Object();
    params.p_path =patientMediaPath;
    params.p_patient_id =patient_id;
   
    
    return dbcontext.CallSP(dbcontext, "get_patient_history",params);
   },
   InserDoctorClinic:function(clinicId,doctor_id)
   {
    var params = new Object();
    params.p_clinicid =clinicId;
    params.p_doctorid =doctor_id;
    
    return dbcontext.CallSP(dbcontext, "insert_doctor_clinics",params);
   },
   DeleteDoctorClicnics:function(clinicId,doctor_id)
   {
    var params = new Object();
    params.p_cilinicid =clinicId;
    params.p_doctorid =doctor_id;
    
    return dbcontext.CallSP(dbcontext, "delete_doctor_clinics",params);
   },
   DeleteDoctorSpeciality:function(specialityId,doctor_id)
   {
    var params = new Object();
    params.p_specialid =specialityId;
    params.p_doctorid =doctor_id;
    
    return dbcontext.CallSP(dbcontext, "delete_doctor_speciality",params);
   },
   
   InsertUpdateDoctorSpeciality:function(docSpecialityId,doctor_id)
   {
    var params = new Object();
    params.p_doctorid =doctor_id;
    params.p_specialityid =docSpecialityId;
    
    return dbcontext.CallSP(dbcontext, "isert_update_doctor_specialty",params);
   },
   EditDoctordetails:function(dob,selfDescription,website,nationalityId,qualification,practiceSince
    ,mobile,email,address,file_name,file_path,doctorId)
   {
    var params = new Object();
    params.p_dob =dob;
    params.p_selfDescription =selfDescription;
    params.p_website =website;
    params.p_nationalityId =nationalityId;
    params.p_qualification =qualification;
    params.p_practiceSince =practiceSince;
    params.p_mobile =mobile;
    params.p_email =email;
    params.p_address =address;
    params.p_filename =file_name;
    params.p_filepath =file_path;
    params.p_doctorId =doctorId;
        
    return dbcontext.CallSP(dbcontext, "edit_doctordetails",params);
   },

   InsertPatientDescription:function(patient_id,doctor_id,is_send_to_pharam,pharm_id,booking_id,file_name,file_path)
   {
    var params = new Object();
    params.p_patient_id =patient_id;
    params.p_doctor_id =doctor_id;
    params.p_is_send_to_pharam =is_send_to_pharam;
    params.p_pharm_id =pharm_id;
    params.p_filename=file_name
    params.p_filepath=file_path
    params.p_booking_id =booking_id;
    
    return dbcontext.CallSP(dbcontext, "insert_patient_prescription",params);
   },

   InsertMedicine:function(prescription_id,medicine_id,medicine,day,morning
    ,afternoon,night,instruction,doctor_id)
   {
    var params = new Object();
    params.p_prescription_id =prescription_id;
    params.p_medicine_id =medicine_id;
    params.p_medicine =medicine;
    params.p_day =day;
    params.p_morning =morning;
    params.p_afternoon =afternoon;
    params.p_night =night;
    params.p_instruction =instruction;
    params.p_doctor_id =doctor_id;
    
    return dbcontext.CallSP(dbcontext, "insert_medcines",params);
   },
   get_parmacy: function() {
    var params = new Object();
    params=""
    return dbcontext.CallSPWithoutParam(dbcontext, "get_parmacy");
  },
    GetDoctorSpeciality: function(media_path) {
    debugger;
    var params = new Object();
    params.p_doctor_media_path = media_path;
       return dbcontext.CallSP(dbcontext, "get_doctorspeciality_v1", params);
  },
  getdoctorclinics:function(doctorId)
  {
   var params = new Object();
   params.p_doctorid =doctorId;
   
   return dbcontext.CallSP(dbcontext, "get_doctor_clinics",params);
  },
  GetPharmmedicines:function(medicine_name)
  {
   var params = new Object();
   params.p_medicinename =medicine_name;
   return dbcontext.CallSP(dbcontext, "get_pharmmedicines",params);
  },
  Get_appointmentcalender:function(clinic_id,doctor_id,from_date,to_date)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_fromdate =from_date;
   params.p_todate =to_date;
   return dbcontext.CallSP(dbcontext, "get_appointment_calendar_new",params);
  },
  Get_appointmentMonthDetails:function(from_date,to_date)
  {
   var params = new Object();
   params.p_from_date =from_date;
   params.p_to_date =to_date;
   return dbcontext.CallSP(dbcontext, "appointcalenderhandler",params);
  },
  Get_walkbookedslotsfordoctor:function(clinic_id,doctor_id,p_selcteddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_selecteddate =p_selcteddate;
   return dbcontext.CallSP(dbcontext, "walkbookedslotsfordoctor",params);
  },
  Get_bookedslotcounthandler:function(clinic_id,doctor_id,p_selcteddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_selecteddate =p_selcteddate;
   return dbcontext.CallSP(dbcontext, "bookedslotcounthandler",params);
  },
  getdoctorsingledeailsnextcount:function(doctorId,limit,offset,nextoffset)
   {
    var params = new Object();
    params.p_doctorid =doctorId;
    params.p_limit =limit;
    params.p_offset =offset;
    params.p_nextoffset =nextoffset;
    
    return dbcontext.CallSP(dbcontext, "get_single_deals_nextcount",params);
   },
  Get_blockedslotscounthandler:function(clinic_id,doctor_id,p_selcteddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_selecteddate =p_selcteddate;
   return dbcontext.CallSP(dbcontext, "blockedslotscounthandler",params);
  },

  insert_doctor_block_slots:function(doctor_id,from_time,to_time,block_date,created_by,ipaddress)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_fromtime =from_time;
   params.p_totime =to_time;
   params.p_blockdate =block_date;
   params.p_createdby =created_by;
   params.p_ipaddress =ipaddress;
   return dbcontext.CallSP(dbcontext, "insert_doctor_block_slots",params);
  },
  Update_doctor_block_slots:function(doctor_id,from_time,to_time,block_date,created_by)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_fromtime =from_time;
   params.p_totime =to_time;
   params.p_blockdate =block_date;
   params.p_createdby =created_by;
   
   return dbcontext.CallSP(dbcontext, "update_doctor_block_slots",params);
  },
  ValidateBlockedCancelslots:function(doctor_id,from_time,block_date,created_by)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_fromtime =from_time;
   params.p_blockdate =block_date;
   params.p_createdby =created_by;
   
   return dbcontext.CallSP(dbcontext, "validateblockcancelslots",params);
  },
  Get_Doctor_blockedCancelSlots:function(doctor_id,clinic_id)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_clinic_id =clinic_id;
   return dbcontext.CallSP(dbcontext, "get_doctor_blockcancelslots",params);
  },
  Get_BlockedDates:function(doctor_id)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
      return dbcontext.CallSP(dbcontext, "get_blocked_dates",params);
  },
  Get_Finyear: function() {
    var params = new Object();
    params=""
 
    return dbcontext.CallSPWithoutParam(dbcontext, "get_finyear");
  },
  Get_Revenue_Slot:function(clinic_id,doctor_id,day_id)
  {
   var params = new Object();
      params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_dayid =day_id;
   return dbcontext.CallSP(dbcontext, "get_revenue_slot",params);
  },
  
  Get_Revenue_Slot_2:function(clinic_id,doctor_id)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot_2",params);
  },
  Get_Revenue_Slot_3:function(clinic_id,doctor_id)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot_3",params);
  },
  Get_Revenue_StartDay: function() {
    var params = new Object();
    params=""
 

    return dbcontext.CallSPWithoutParam(dbcontext, "get_finyear");
  },
  Get_Revenue_TrnPayment:function(clinic_id,doctor_id,startDate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startDate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_tranpayment",params);
  },

  Get_Revenue_Commission:function(clinic_id,doctor_id,startDate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startDate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_commision_week",params);
  },
  Get_Revenue_Slot_4:function(clinic_id,doctor_id)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot4",params);
  },
  Get_Revenue_Slot_5:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startdate;
   params.p_enddate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot5",params);
  },
  Get_Revenue_Slot_6:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startdate;
   params.p_enddate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot6",params);
  },
  Get_Revenue_DoctorPoints:function(doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_startdate =startdate;
   params.p_enddate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_doctorpoints",params);
  },

  Get_Revenue_IncomeDetails:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_fromdate =startdate;
   params.p_todate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_incomedetails",params);
  },
  Get_Revenue_Commision_Month:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_fromdate =startdate;
   params.p_todate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_commision_month",params);
  },
  Get_Revenue_Slot_7:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startdate;
   params.p_enddate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot7",params);
  },
  Get_Revenue_Slot_8:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startdate;
   params.p_enddate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot8",params);
  },
  Get_Revenue_Slot_9:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_startdate =startdate;
   params.p_enddate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot9",params);
  },
  Get_Revenue_IncomeDetails_Year:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_fromdate =startdate;
   params.p_todate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_incomingdetails_year",params);
  },
  Get_Revenue_CommisionDetails_Year:function(clinic_id,doctor_id,startdate,enddate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_fromdate =startdate;
   params.p_todate =enddate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_commisiondetails_year",params);
  },

  Get_Revenue_Slot_10:function(clinic_id,doctor_id,fin_fromdate,fin_todate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   //params.p_startdate =startdate;
   //params.p_enddate =enddate;
   params.p_finfrom_date =fin_fromdate;
   params.p_finto_date =fin_todate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot10",params);
  },

  Get_Revenue_Slot_11:function(clinic_id,doctor_id,fin_fromdate,fin_todate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;

   params.p_finfrom_date =fin_fromdate;
   params.p_finto_date =fin_todate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot11",params);
  },
  Get_Revenue_Slot_12:function(clinic_id,doctor_id,fin_fromdate,fin_todate)
  {
   var params = new Object();
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;

   params.p_finfrom_date =fin_fromdate;
   params.p_finto_date =fin_todate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_slot12",params);
  },

  Get_Revenue_DoctorPoints_Year:function(doctor_id,fin_fromdate,fin_todate)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_fromdate =fin_fromdate;
   params.p_todate =fin_todate;
  
   return dbcontext.CallSP(dbcontext, "get_revenue_doctorpoints_year",params);
  },
  Get_Referal:function(doctor_id,referal_date,limit,offset)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_refer_date =referal_date;
   params.p_limit =limit;
   params.p_offset =offset;
  
   return dbcontext.CallSP(dbcontext, "get_referal",params);
  },
  getdoctorspecialityByid:function(path,doctorId)
  {
   var params = new Object();
   params.p_path =path;
   params.p_doctorspl_id =doctorId;
   
   return dbcontext.CallSP(dbcontext, "get_doctorspeciality_byid",params);
  },
  Get_Referal_List:function(ref_type,ref_id,p_id)
  {
   var params = new Object();
   params.p_ref_type =ref_type;
   params.p_ref_id =ref_id;
   params.p_id =p_id;
  
   return dbcontext.CallSP(dbcontext, "get_referal_list",params);
  },
  Get_Referal_Count:function(doctor_id,referal_date,limit,offset)
  {
   var params = new Object();
   params.p_doctor_id =doctor_id;
   params.p_refer_date =referal_date;
   params.p_limit =limit;
   params.p_offset =offset;
  
   return dbcontext.CallSP(dbcontext, "get_referal_count",params);
  },
  Update_MediaSortOrder:function(sort_order,media_id,vendor_id)
  {
   var params = new Object();
   params.p_sort_order =sort_order;
   params.p_media_id =media_id;
   params.p_vendor_id =vendor_id;
   return dbcontext.CallSP(dbcontext, "update_mediasortorder",params);
  },

  Get_AppintmentList:function(mediapth,clinic_id,doctor_id,search_date,search_date_to)
  {
   var params = new Object();
   params.p_media_path =mediapth;
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_searchdate =search_date;
   params.p_searchdate_to =search_date_to;
   return dbcontext.CallSP(dbcontext, "get_appointment_list",params);
  },

  Get_ClinicAppintmentList:function(mediapth,clinic_id,doctor_id,search_date,search_date_to)
  {
   var params = new Object();
   params.p_media_path =mediapth;
   params.p_clinic_id =clinic_id;
   params.p_doctor_id =doctor_id;
   params.p_searchdate =search_date;
   params.p_searchdate_to =search_date_to;
   return dbcontext.CallSP(dbcontext, "get_clinic_appointment_list",params);
  },
  Get_Mas_doctor_Speciality:function(mediapth)
  {
   var params = new Object();
   params.p_path =mediapth;
  
   return dbcontext.CallSP(dbcontext, "get_mas_doctor_speciality",params);
  },
  Get_Calandarslots:function(lapid,fromdate,todate)
  {
   var params = new Object();
   params.lapid =lapid;
   params.p_fromdate =fromdate;
   params.p_todate =todate;

   return dbcontext.CallSP(dbcontext, "get_lapcalandarslots",params);
  },
};