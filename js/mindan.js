function readyDisGuish(){
  	Wd.mingdanData_temp = getMingdanData();

    var distinData = [];
    for (var i =0; i<Wd.mingdanRowCount;i++){
        var row = {
            DOE:mingdanData_temp[i].DOE,
            DOI:mingdanData_temp[i].DOI,
            ID: mingdanData_temp[i].uid,
            IDCard: mingdanData_temp[i].IDCard,
            POB:mingdanData_temp[i].POB,
            POI:mingdanData_temp[i].POI,
            addTime:"",
            address: Wd.mingdan_distin_data.length>i?Wd.mingdan_distin_data[i].address:null,
            admID:320,
            backDate:"",
            birth: mingdanData_temp[i].birth,
            bySort:0,
            cnName: mingdanData_temp[i].cnName,
            cpyName:"",
            ctInfo: mingdanData_temp[i].ctInfo,
            ctName:"12g3s",
            enName1: mingdanData_temp[i].enName1,
            enName2: mingdanData_temp[i].enName2,
            file_type:Wd.mingdan_distin_data.length>i?Wd.mingdan_distin_data[i].type:2,
            fromcity_name:"",
            img: Wd.mingdan_distin_data.length>i?Wd.mingdan_distin_data[i].img:null,//"https://tcdn.op110.com.cn/files/1/file/20170608/1499479921355XAJAMOTSQ7.jpg",
            isLock:0,
            isOK:1,
            nation:"",
            ordID:110763,
            passport:mingdanData_temp[i].passport,
            perNum:2,
            perType: mingdanData_temp[i].perType,
            remark:null,
            room:null,
            saleName:"",
            sex: mingdanData_temp[i].sex,
            sort:2,
            top_erp_id:0,
            top_id:0,
            updateTime:""
        };

        distinData.push(row);
    }

    Wd.mingdan_edit_store = {
      isPlan:false,
      planID:0,
      ordID:0,
      distinData : distinData
    };
}
  
function showDisGuishWin(){
  readyDisGuish();
  
  /*
  护照 13
  身份证 2
  港澳通信证 22  卡式入台证  22
  入台证 11
  */
  Wd.win_edit_distin_guish = {
    eventID:null,
    timer:null,
    refresh:false,
    userList:[],
    userIDs:[],
    initUser:[],
    G_backDate:null,
    getStatus:null,
    lastStatus:null,
    doubleName:['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', 
                '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶', '太叔', '申屠', 
                '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '司徒', '鲜于', '司空', '闾丘', '子车', 
                '亓官', '司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', 
                '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', 
                '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', 
                '西门', '公祖', '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', 
                '子桑', '即墨', '达奚', '褚师', '吴铭'],
    area:{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江", 
          31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北", 
          43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏", 
          61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

    init:function(typeID,cardsinfos){
      function formaDate(t){
        if(t.length===8){
           return t.substr(0,4)+'-'+t.substr(4,2)+'-'+t.substr(6,2);
        }
      }

       var obj={},allName=null,timer=null;
       if(cardsinfos.length){
        var infoList = cardsinfos[0].items;
        for(var i=0;i<infoList.length;i++){
          switch(infoList[i].desc){
            case '性别':
              obj.sex = infoList[i].content;
              break;
            case "姓名":
            case '本国姓名':
            case '中文姓名':
              obj.cnName = infoList[i].content;
              break;
            case "英文姓":
              obj.enName1=infoList[i].content;
              break;
            case "英文名":
              obj.enName2=infoList[i].content;
              break;
            case "证件号码":
            case "护照号码":
            case "证件号码MRZ":
              obj.passport=infoList[i].content;
              break;
            case "出生地点":
              obj.POB=infoList[i].content;
              break;
            case '出生日期':
              obj.birth=infoList[i].content;
              break;
            case "签发地点":
              obj.POI=infoList[i].content;
              break;
            case "有效期限":
              obj.expDate = infoList[i].content;
              break;
            case "签发日期":
              obj.DOI=infoList[i].content;
              break;
            case "有效期至":
              obj.DOE=infoList[i].content;
              break;
            case "出生地点拼音":
              obj.POBPing=infoList[i].content;
              break;
            case "签发地点拼音":
              obj.POIPing=infoList[i].content;
              break;
            case "住址":
              obj.address=infoList[i].content;
              break;
            case "出生":
              obj.birth=infoList[i].content;
              break;
            case "民族":
              obj.nation=infoList[i].content;
              break;
            case "身份证号码":
            case "公民身份号码":
              obj.IDCard = infoList[i].content;
              break;
          }
        }
        if(obj.cnName && (!obj.enName1 || !obj.enName2)){
          allName=$('<input type="hidden" value="'+obj.cnName+'">').toSplicPinyin();
          obj.enName1=allName.firstName;  //英文性
          obj.enName2=allName.lastName;  //英文名 
        }
        if(obj.expDate && (!obj.DOI && !obj.DOE)){
          if(obj.expDate.indexOf('-')>=0){
            timer = obj.expDate.split('-');
            obj.DOI = formaDate(timer[0]);
            obj.DOE = formaDate(timer[1]);
          }
        }
      }
      return obj;
    },
    help:function(){
//       var w = mingdan_distin_guish_win.getWidth()-100,
//           h = mingdan_distin_guish_win.getHeight()-100;
//       if(w>920){
//         w=920;
//       }
//       if(h>720){
//         h=720;
//       }
      var w = 920, h = 500;
      layer.open({
        type: 1,
        title: false,
        shade:0.3,
        closeBtn:1,
        area: [w+'px', h+'px'],
        shadeClose:true,
        content: '<img src="http://cdnfile.op110.com.cn/files/1/file/20170511/01_1494495325938.jpg">'
      });
    },
    loadingIndex:0,
    loading:function(text){
      win_edit_distin_guish.loadingIndex = layer.load(2, {
        content:text,
        shade: [0.2,'#fff'],
        success: function(layero){
          layero.find('.layui-layer-content').css('padding-top', '36px').css('width','50px');
        }});
    },
    closeLoading:function(){
      layer.close(win_edit_distin_guish.loadingIndex);
    },
    qiniuToken:function(){
      $.post('service/attach/token/create',function(data){
          win_edit_distin_guish.qiniuUpload(data.values.token,data.values.dn);
      });
    },
    getDatetime:function(){
      function toNum(num){
        return num>9 ? num : ('0'+num);
      }
      var now = new Date();
      var Y = now.getFullYear(),
          m = now.getMonth(),
          d = now.getDate();
      return Y+toNum(m)+toNum(d);
    },
    getRandom:function(){
      var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var res = "";
      for(var i = 0; i < 10 ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
      }
      return res;
    },
    itemQiniuUpload:function(t,d,rows){
      var fileList={};
      for(var i=0;i<rows.length;i++){
        if(rows[i].isLock<1){
                    fileList['item_'+rows[i].ID] = Qiniu.uploader({
                    runtimes: 'html5,html4', 
                    browse_button: 'uploadfileitem_'+rows[i].ID, 
                    uptoken : t,
                    domain: d,
                    unique_names:false,
                    save_key:false,
                    get_item_id:rows[i].ID,
                    get_new_uptoken: false,
                    container: 'idCard_'+rows[i].ID, 
                    multi_selection: false,
                    max_file_size: '10mb',
                    max_retries: 0, 
                    dragdrop: false, 
                    drop_element: 'idCard_'+rows[i].ID,  
                    chunk_size: '4mb', 
                    auto_start: true, 
                    filters : {
                      max_file_size : '10mb',
                      prevent_duplicates: false
                    },
                    init: {
                      'FilesAdded': function(up, files) {
                           win_edit_distin_guish.loading('上传中...');
                      },
                      'UploadProgress': function(up, files) {        
                           // 每个文件上传时,处理相关的事情
                      },
                      'FileUploaded': function(up, file, info){   
                          // 获取七牛回传的图片路径
                          var domain = up.getOption('domain');
                          var res = JSON.parse(info),keysrc='';
                          if(res.hasOwnProperty('executeStatus')){
                             keysrc = res.values.key;
                          }else{
                             keysrc = res.key;
                          }
                          var sourceLink = domain +'/'+ keysrc;
                          win_edit_distin_guish.showImg(up.settings.get_item_id,sourceLink);
                          win_edit_distin_guish.closeLoading();
                      },
                      'Error': function(up, err, errTip) {
                          layer.msg('上传失败',{shift:6});
                      },
                      'Key': function(up, file) {
                          var now = new Date(),						    
                              indexOf = file.name.lastIndexOf('.'),
                              fileName = now.getTime()+win_edit_distin_guish.getRandom();
                          var key = "files/1/file/"+win_edit_distin_guish.getDatetime()+'/'+fileName+file.name.substring(indexOf);
                          return key;
                      }
                    }
                  });
        }
      }
    },
    uploadCheckImg:[],
    uploadsetItemImg:null,
    qiniuUpload:function(t,d){
      var upNum = 0;
      var uploader = Qiniu.uploader({
                    runtimes: 'html5,html4', 
                    browse_button: 'pickfiles_1', 
                    uptoken : t,
                    domain: d,
                    unique_names:false,
                    save_key:false,				  
                    get_new_uptoken: false,
                    container: 'container', 
                    multi_selection: true,
                    max_file_size: '10mb',
                    max_retries: 0, 
                    dragdrop: false, 
                    drop_element: 'container', 
                    chunk_size: '4mb', 
                    auto_start: true, 
                    filters : {
                      max_file_size : '10mb',
                      prevent_duplicates: false
                    },
                    init: {
                      'BeforeUpload':function(){
                          for(var i=0;i<win_edit_distin_guish.uploadCheckImg.length;i++){
                             if($('#idCard_'+win_edit_distin_guish.uploadCheckImg[i].ID).attr('data-isupload')==='false' && 
                                win_edit_distin_guish.uploadCheckImg[i].isLock<1){
                                win_edit_distin_guish.uploadsetItemImg = win_edit_distin_guish.uploadCheckImg[i];
                                break;
                             } 
                          }
                      }, 
                      'FilesAdded': function(up, files) {
                           win_edit_distin_guish.loading('上传中...');
                      },
                      'UploadProgress': function(up, files) {        
                           // 每个文件上传时,处理相关的事情
                      },
                      'FileUploaded': function(up, file, info){   
                          // 获取七牛回传的图片路径
                          var domain = up.getOption('domain');
                          var res = JSON.parse(info),keysrc='';
                          if(res.hasOwnProperty('executeStatus')){
                             keysrc = res.values.key;
                          }else{
                             keysrc = res.key;
                          }
                          var sourceLink = domain +'/'+ keysrc;
                          if(win_edit_distin_guish.uploadsetItemImg){
                             win_edit_distin_guish.showImg(win_edit_distin_guish.uploadsetItemImg.ID,sourceLink);
                          }

  //                         for(var i=0;i<win_edit_distin_guish.userList.length;i++){
  //                            if(i>=upNum && win_edit_distin_guish.userList[i].isLock<1){
  //                                upNum++;
  //                                win_edit_distin_guish.showImg(win_edit_distin_guish.userList[i].ID,sourceLink);
  //                                break;
  //                            }
  //                         }
                      },
                      'Error': function(up, err, errTip) {
                          layer.msg('上传失败',{shift:6});
                      },
                      'UploadComplete': function() {
                          //队列文件处理完毕后,处理相关的事情
                          win_edit_distin_guish.closeLoading();
                          layer.msg('全部上传完毕');
                          upNum = 0;
                          win_edit_distin_guish.uploadsetItemImg = null;
                      },
                      'Key': function(up, file) {
                          // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                          // 该配置必须要在 unique_names: false , save_key: false 时才生效
                          var now = new Date(),						    
                              indexOf = file.name.lastIndexOf('.'),
                              fileName = now.getTime()+win_edit_distin_guish.getRandom();
                          var key = "files/1/file/"+win_edit_distin_guish.getDatetime()+'/'+fileName+file.name.substring(indexOf);
                          return key;
                      }
                    }
                  });
    },
    showImg:function(id,img){
        $('#btn_distin_'+id).removeAttr('disabled').removeClass('btn-default').addClass('btn-onclick');
        $('#idCard_'+id).hide().attr({'data-isUpload':'true','data-url':escape(img)});
        var str='<div class="rotate rotate-left" onclick="win_edit_distin_guish.rotate(\'left\',this);"><span></span></div>'+
           '<div class="rotate rotate-right" onclick="win_edit_distin_guish.rotate(\'right\',this);"><span></span></div>'+
           '<div class="delCard" data-id="'+id+'" onclick="win_edit_distin_guish.deleteCard(event,this);"><span></span></div>'+
           '<img onmousedown="win_edit_distin_guish.mousedown(this,event);" data-rotate="0" onmousewheel="win_edit_distin_guish.mousewheel(this,event);" src="'+img+'" />';
        $('#showList_item_img_'+id).show().html(str);

    },
    mousewheel:function(that,e){
       var node = $(that);
       var w = parseInt(node.css('width'),10),
           h = parseInt(node.css('height'),10);
       var pt = 0,
           mw = 0,
           mh = 0,
           mt = 0,
           ml = 0;
       if(e.deltaY<0){ //向下
         pt = 0.05;  
         if((w+w*pt)<346*3){
           mw = (w+w*pt);
           mh = (h+h*pt);
           ml = (mw>346) ? -(mw-346)/2 : (346-mw)/2;
           mt = (mw>346) ? -(mh-226)/2 : (226-mh)/2;
           node.css(
           {
              width : mw,
              height : mh,
              left : ml,
              top : mt
           });
         }
       }else{ //向上 
           pt = -0.05;
         if((w+w*pt)>173){
           mw = (w+w*pt);
           mh = (h+h*pt);
           ml = (mw>346) ? -(mw-346)/2 : (346-mw)/2;
           mt = (mw>346) ? -(mh-226)/2 : (226-mh)/2;
           node.css(
           {
              width : mw,
              height : mh,
              left : ml,
              top : mt
           });
         }
       }
      e.preventDefault();
    },
    rotate:function(str,that){
      var node = $(that).siblings('img');
      var rotate = node.attr('data-rotate')*1;
      if(str==='left'){
           node.css('transform','rotate('+(rotate-90)+'deg)').attr('data-rotate',(rotate-90));
      }else{
           node.css('transform','rotate('+(rotate+90)+'deg)').attr('data-rotate',(rotate+90));
      }
    },
    mousedown:function(that,e){
      e.preventDefault();
      var ev = e || window.event;
      var disX = ev.clientX - that.offsetLeft;
      var disY = ev.clientY - that.offsetTop;
      document.onmousemove = function(e) {
        var ev = e || window.event;
        $(that).css({
          top:(ev.clientY - disY),
          left:(ev.clientX - disX)
        });
      };
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    },
    batchIndex:0,    //------------批量识别-------------------
    batchArray:[],                
    batchdist:function(){
          win_edit_distin_guish.batchArray.length=0;
          win_edit_distin_guish.batchIndex = 0;
          var res=[],
              obj=null,
              itemNode=null;
              for(var i=0;i<win_edit_distin_guish.userIDs.length;i++){
                  id = win_edit_distin_guish.userIDs[i];
                  itemNode = $('#user_item_'+id);
                  obj={};
                  obj.ordUserId = id;
                  obj.type = itemNode.attr('data-card-type');
                  obj.filePath = unescape($('#idCard_'+id).attr('data-url')) || '';
                  obj.ordId = itemNode.attr('data-ordid');
                  obj.cnName = $('#cnName_'+id).val();
                  obj.passport = $('#passport_'+id).val();
                  obj.IDCard = $('#IDCard_'+id).val();
                  obj.isLock = itemNode.attr('data-islock');
                  win_edit_distin_guish.batchArray.push(obj);
              }
           win_edit_distin_guish.batchIndex = 0;
           win_edit_distin_guish.batchdistFn(); 
    },
    batchCheck:function(obj){
      if(obj.filePath && obj.isLock*1===0 && !obj.cnName){
         return true;
      }
      return false;
    },
    batchdistFn:function(){
        win_edit_distin_guish.batchIndex++;
        if(!win_edit_distin_guish.batchArray.length){
          return;
        }
        if(win_edit_distin_guish.batchArray.length && win_edit_distin_guish.batchCheck(win_edit_distin_guish.batchArray[0])){
          Wb.request({
            url: 'service/util/ocrRecognize/singleRecognize',
            params:win_edit_distin_guish.batchArray[0],
            headers:{"access-token":""},
            success: function(r){
              var res = Wb.decode(r.responseText);
              var row = res.values;
              if(row.message.status>0){  //识别成功
                layer.msg('第'+win_edit_distin_guish.batchIndex+'位证件'+row.message.value);
                win_edit_distin_guish.setItemValue(win_edit_distin_guish.batchArray[0].ordUserId,win_edit_distin_guish.init(win_edit_distin_guish.batchArray[0].type,row.cardsinfo),win_edit_distin_guish.batchArray[0].type);
                win_edit_distin_guish.batchArray.shift();
                win_edit_distin_guish.batchdistFn(); 
              }else{  //识别失败
                layer.msg("识别失败,请选择正确清晰点的图片",{shift:6});
              }
            }
          });
       }else{
          win_edit_distin_guish.batchArray.shift();
          win_edit_distin_guish.batchdistFn(); 
       }
    },   //--------------批量识别-----------------                   
    zeroDate:{},
    getResult:function(upKey,userInfo){
//       	 showLoding();
         Wb.request({
          url: 'main?xwl=342MJZB7UO09',
          showMask:false, 
          params: {
            upKey: upKey
          },
          showMask:false,
          success: function(r){
//             hideLoding();
            var re = Wb.decode(r.responseText);
            if (re.executeStatus === 0) {
                var arr = Wb.decode(re.url);
                clearTimeout(win_edit_distin_guish.timer);
                win_edit_distin_guish.timer = setTimeout(function(){
                  win_edit_distin_guish.getResult(upKey,userInfo);
                }, 1000);


                 if(win_edit_distin_guish.getStatus!=re.url){
                   win_edit_distin_guish.getStatus=re.url;
                   var changeArr=[];
                   var arr1 = Wb.decode(win_edit_distin_guish.getStatus),
                       arr2 = win_edit_distin_guish.lastStatus ? Wb.decode(win_edit_distin_guish.lastStatus) : [];
                   if(arr2.length===arr1.length){
                     for(var m=0;m<arr1.length;m++){
                       if(arr1[m].img!==arr2[m].img){
                          changeArr.push(arr1[m]);
                       }   
                     }
                   }

                    $('#codeImg').html('<p style="text-align:center;color:#999;padding-top:60px;font-size:14px;">上传成功,还可以继续上传<br/><button>点击刷新</button></p><i class="close" onclick="win_edit_distin_guish.closeCode(event);">X</i>');
                    var imgLen =0;

                    for(var i=0;i<changeArr.length;i++){
                      var node = $('#idCard_'+changeArr[i].ID);

                      if(changeArr[i].img && changeArr[i].img.length>10){
                        imgLen++;
                        win_edit_distin_guish.showImg(changeArr[i].ID,changeArr[i].img);

  //                       $('#btn_computed_'+changeArr[i].ID).attr('disabled','disabled').addClass('disabled');
  //                          node.attr({'data-isUpload':'true',"for":'','data-url':escape(changeArr[i].img)});
  //                          node.find('.card').html('<div class="delCard" data-id="'+changeArr[i].ID+'" onclick="win_edit_distin_guish.deleteCard(event,this);">删除</div><img src="'+changeArr[i].img+'?imageView/2/w/350/h/230" />');  
  //                       $('#btn_distin_'+changeArr[i].ID).removeAttr('disabled').removeClass('btn-default').addClass('btn-onclick');


                        //需要做tab切换
                        if(changeArr[i].cardType*1!==node.attr('data-type')*1){
                          var rows = {
                             ID:changeArr[i].ID,
                             cnName:'',
                             enName1:'',
                             enName2:'',
                             sex:'男', 
                             birth:'',
                             POB:'',
                             passport:'',
                             img:changeArr[i].img,
                             DOI:'',
                             DOE:'',
                             POI:'',
                             IDCard:''
                          },userNode = null;
                          if(changeArr[i].cardType*1===13){ //护照
                            userNode = $('#user_item_'+changeArr[i].ID);
                            userNode.attr('data-card-type','13');
                            $('#idCard_'+changeArr[i].ID).attr('data-type','13');

                            $('#user_form_'+changeArr[i].ID).attr('data-type','13').html(win_edit_distin_guish.htmlpass(rows,''));
                            userNode.find('.tablist').find('span').eq(0).addClass('active').siblings().removeClass('active');
                          }else if(changeArr[i].cardType*1===2){  //身份证
                            userNode = $('#user_item_'+changeArr[i].ID);
                            userNode.attr('data-card-type','2');
                            $('#idCard_'+changeArr[i].ID).attr('data-type','2');

                            $('#user_form_'+changeArr[i].ID).attr('data-type','2').html(win_edit_distin_guish.htmlCard(rows,''));
                            userNode.find('.tablist').find('span').eq(1).addClass('active').siblings().removeClass('active');
                          }else if(changeArr[i].cardType*1===11){  //入台证
                            userNode = $('#user_item_'+changeArr[i].ID);
                            userNode.attr('data-card-type','11');
                            $('#idCard_'+changeArr[i].ID).attr('data-type','11');

                            $('#user_form_'+changeArr[i].ID).attr('data-type','11').html(win_edit_distin_guish.htmlTaiwan(rows,''));
                            userNode.find('.tablist').find('span').eq(2).addClass('active').siblings().removeClass('active');
                          }
                        }

                      }else{
                         win_edit_distin_guish.changeDeleteImg($('#showList_item_img_'+changeArr[i].ID),changeArr[i].ID);
                      }
                    }
                    win_edit_distin_guish.lastStatus=re.url;              
                }            
            }else{
              if (re.errorCode == 11004) {
                win_edit_distin_guish.refresh = false;
                $('#codeImg').html('<p style="text-align:center;color:#999;padding-top:60px;font-size:14px;">二维码已失效</p><i class="close" onclick="win_edit_distin_guish.closeCode(event);">X</i>');
              }else if(re.errorCode == 11003){
                $('#codeImg').html('<p style="text-align:center;color:#999;padding-top:60px;font-size:14px;">扫描成功,等待上传<button>点击刷新</button></p><i class="close" onclick="win_edit_distin_guish.closeCode(event);">X</i>');
                win_edit_distin_guish.timer = setTimeout(function(){
                  win_edit_distin_guish.getResult(upKey,userInfo);
                }, 1000);
              } else {
                clearTimeout(win_edit_distin_guish.timer);
                win_edit_distin_guish.timer = setTimeout(function(){
                  win_edit_distin_guish.getResult(upKey,userInfo);
                }, 1000);
              }
            }
          }
        });
    },
    getqrcorde:function(){
      $('#mask').show();
      var arr=[],
          img='',
          name='',
          node = '',
          node2 = '',
          left = 0,
          dataId = '';
        left = -25;
        arr = win_edit_distin_guish.userList;
        for(var i=0;i<arr.length;i++){
          (function(k){
            node = $('#user_item_'+arr[k].ID);
            arr[k].cardType = node.attr('data-card-type');
            arr[k].isLock = node.attr('data-isLock');
            arr[k].perType = arr[k].perType || ' ';
            node2 = $('#idCard_'+arr[k].ID);
            img = node2.attr('data-url');
            name = $('#cnName_'+arr[k].ID).val();
            if(img){
              arr[k].img = unescape(img);
            }else{
              arr[k].img = '';
            }
            if(name){
              arr[k].name = name;
            }else{
              arr[k].name = '';
            }
          })(i);
        }    
      $('#codeImg').show();
      if(!win_edit_distin_guish.refresh){
        win_edit_distin_guish.getStatus = null;
        win_edit_distin_guish.lastStatus=Wb.encode(arr);
        clearTimeout(win_edit_distin_guish.timer);
//         showLoding();
        Wb.request({
          url: 'main?xwl=342MGU1EHPA8',
          showMask:false,
          userInfo:arr,
          params: {
            biz_type:'PLAN',
            multi_select:0,
            state: Wb.encode(arr)
          },
          showMask:true,
          success: function(r){
//             hideLoding();
            var json = Wb.decode(r.responseText);
            if (json.executeStatus === 0) {
              win_edit_distin_guish.getResult(json.upKey,arr);
                $('#codeImg').html('<img data-id="" style="cursor:pointer;" src="'+json.url+'" />'+
                '<p>请手机扫描二维码</p><i class="close" onclick="win_edit_distin_guish.closeCode(event);">X</i>');
                win_edit_distin_guish.refresh = true;
            }else{
              Wb.msg(json.errorMsg);
            }
          }
        });
      }
    },
    checkDateRule:function(timer){
      var arr = timer.split('-');
      var checkArray=[
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [31,29,31,30,31,30,31,31,30,31,30,31]
      ];
      var indexOf = checkArray[0].indexOf(Number(arr[1]));
      if(indexOf>=0){
        if(checkArray[1][indexOf]>=Number(arr[2])){
          return true;
        }
        return false;
      }
      return false;
    },
    getMonthLater : function(a, b) {
      var c, d;
      a = new Date(a), c = a.getDate(), a.setDate(1), a.setMonth(a.getMonth() + b);
      d = new Date(a), d.setMonth(a.getMonth() + 1), d.setDate(0);
      a.setDate(Math.min(c, d.getDate()));
      return a;
    },
    checkTimePlanDate:function(type,timer){
      var arr = timer.split('-'),
          d = new Date(arr[0],arr[1]-1,arr[2]);
  //     if(type==='start'){
  //        if(Wb.dateDiff('d', win_edit_distin_guish.getMonthLater(G_backDate, 6), d) < 1){
  //          return false;
  //        } 
  //     }else 
      if(type==='end'){
         if(Wb.dateDiff('d', win_edit_distin_guish.getMonthLater(win_edit_distin_guish.G_backDate, 6), d) < 1){
           return false;
         }   
      }
      return true;
    },
    trim:function(str){
      var reg = /^\s+|\s+$/;
      return str ? str.replace(reg,'') : '';
    },
    saveUser:function(){
      var res=[],
          obj=null,
          pob=null,
          itemNode=null,
          id=0;
      var checkIndex = 0,
          timer = false,
          checkTimePlanDate_start = false,
          checkTimePlanDate_end = false,
          _IDCards = [],
          _PSPCards = [],
          checkCards = false,
          timeRag = /\d{4}-\d{2}-\d{2}/;
      for(var i=0;i<win_edit_distin_guish.userIDs.length;i++){
        id = win_edit_distin_guish.userIDs[i];
        itemNode = $('#user_item_'+id);
        obj={};
          obj.ID = id;
          obj.type = itemNode.attr('data-card-type');
          obj.cnName = win_edit_distin_guish.trim($('#cnName_'+id).val()) || '';
          obj.enName1 = win_edit_distin_guish.trim($('#enName1_'+id).val()) || '';
          obj.enName2 = win_edit_distin_guish.trim($('#enName2_'+id).val()) || '';
          obj.sex = $('#sex_'+id+' option:selected').val() || '';
          obj.birth = $('#birth_'+id).val() || '';
          obj.passport = $('#passport_'+id).val() || '';
          obj.IDCard = $('#IDCard_'+id).val() || '';
          obj.POB = $('#POB_'+id).val() || '';
          obj.POI = $('#POI_'+id).val() || '';
          obj.DOI = $('#DOI_'+id).val() || '';
          obj.DOE = $('#DOE_'+id).val() || '';
          obj.ctInfo = $('#ctInfo_'+id).val() || '';
          if(obj.IDCard){
            pob = win_edit_distin_guish.area[obj.IDCard.substring(0,2)];
            if(pob && (!obj.POB && !obj.POI)){
              obj.POB = pob;
              obj.POI = pob;
            }
          }      
          obj.img = unescape($('#idCard_'+id).attr('data-url')) || '';
          obj.ordID = itemNode.attr('data-ordid');
          obj.address = $('#address_'+id).val() || '';  //住址
          obj.nation = $('#nation_'+id).val() || '';  //名族

        if(obj.birth){
          if(!timeRag.test(obj.birth) || !win_edit_distin_guish.checkDateRule(obj.birth)){
            timer = true;
            checkIndex = i;
            break;
          }
        } 
        if(obj.DOI){
          if(!timeRag.test(obj.DOI) || !win_edit_distin_guish.checkDateRule(obj.DOI)){
            timer = true;
            checkIndex = i;
            break;
          }
  //         if(!win_edit_distin_guish.checkTimePlanDate('start',obj.DOI)){
  //           checkTimePlanDate_start = true;
  //           checkIndex = i;
  //           break;
  //         }
        } 
        if(obj.DOE){
          if(!timeRag.test(obj.DOE) || !win_edit_distin_guish.checkDateRule(obj.DOE)){
            timer = true;
            checkIndex = i;
            break;
          }
          if(!win_edit_distin_guish.checkTimePlanDate('end',obj.DOE)){
            checkTimePlanDate_end = true;
            checkIndex = i;
            break;
          }
        } 
        if(obj.IDCard){
          _IDCards.push(obj.IDCard);
        }
        if(obj.passport){
          _PSPCards.push(obj.passport);
        }
        res.push(obj);
      }
      if(timer){
        layer.msg('第'+(checkIndex+1)+'位客人日期识别有误，请修改后保存',{shift:6});
        return;
      }
      if(checkTimePlanDate_end){
      isTimeOut = false;
      layer.msg('请注意！<br />第'+(checkIndex+1)+'位客人证件有效期必须超过回团日期半年以上！<br />此团的回团日期为：' + Ext.Date.format(win_edit_distin_guish.G_backDate,'Y-m-d ') + '<br />证件有效期必须超过：' + Ext.Date.format(win_edit_distin_guish.getMonthLater(win_edit_distin_guish.G_backDate, 6),'Y-m-d '), {
        time: 3000
//         btn: ['知道了']
      }); 
//       return;
     }

      _IDCards.sort();
      _PSPCards.sort();
      if(_IDCards.length>=2){
        for(var m=0;m<_IDCards.length-1;m++){
          if(_IDCards[m]===_IDCards[m+1]){
             checkCards = true;
             break;
          }
        }
      }
      if(_PSPCards.length>=2){
        for(var n=0;n<_PSPCards.length-1;n++){
          if(_PSPCards[n]===_PSPCards[n+1]){
             checkCards = true;
             break;
          }
        }
      }
      if(checkCards){
        layer.msg('证件号码或身份证号有重复，请检查后再保存',{shift:6});
        return;
      }

      var url = '342SB916Z7Y1';
      if(mingdan_edit_store.postID){
         url = mingdan_edit_store.postID;
      }

      layer.close(distinGuishLayerIndex);

      Wd.mingdan_distin_data = res;

      Wd.mingdanData_temp_2 = [];
      for(var ii = 0; ii < res.length; ii++){
        row = {
           uid: res[ii].ID,
           IDType: res[ii].type,
           IDCard: res[ii].IDCard,
           cnName: res[ii].cnName,
           enName1: res[ii].enName1,
           enName2: res[ii].enName2,
           passport: res[ii].passport,
           ctInfo: res[ii].ctInfo,
           perType: Wd.mingdanData_temp[ii].perType,
           sex: res[ii].sex,
           birth: res[ii].birth,
           POB: res[ii].POB,
           POI: res[ii].POI,
           DOI: res[ii].DOI,
           DOE: res[ii].DOE,
           remark: Wd.mingdanData_temp[ii].remark
        };
        mingdanData_temp_2.push(row);
      }
      
      setMingdanData(mingdanData_temp_2);	

//       Wd.o_win_order_mingdan_source.localdata = mingdanData_temp_2;
//       $("#editorder_mingdan").jqxGrid('updatebounddata', 'cells');

  //     Wb.request({
  //       url: 'main?xwl='+url,
  //       params: {
  //         win_mingdan_grid:Wb.encode(res),
  //         planID:getSelectedPlanCode(1)
  //       },
  //       success: function(r){
  //         var j = Wb.decode(r.responseText);
  //         if(j.success){
  //           layer.msg('保存成功');
  //           Wb.reload(mingdan_edit_store.store);
  //           win.hide();
  //         }else{
  //           layer.msg(j.msg,{shift:6});
  //         }
  //       }
  //     });
    },
    changeName:function(that,id){
      var allName=$(that).val();
      if(allName){
        allName=$('<input type="hidden" value="'+allName+'">').toSplicPinyin(); 
        $('#enName1_'+id).val(allName.firstName);//英文性
        $('#enName2_'+id).val(allName.lastName);//英文名 
      }
    },
    setItemValue:function(preId,json,cardType){                                                
      if(json){
         for(var i in json){                                                   
            if(i==='sex'){
               if(json[i]==='男')
                 $('#'+i+'_'+preId).html('<option value="男" selected="selected">男</option><option value="女">女</option>');
               else
                 $('#'+i+'_'+preId).html('<option value="男">男</option><option selected="selected" value="女">女</option>');
               continue;
             }
             $('#'+i+'_'+preId).val(json[i]);
          }
      }
    },
    distinguish:function(e,that){
      var preId = $(that).attr('data-id');
      var preNode = $('#idCard_'+preId),
          itemNode = $('#user_item_'+preId),
          type=null,
          url = null;
      if(preNode.attr('data-isUpload')==='false'){
         layer.msg('证件识别前,请上传识别图片',{shift:6});
         return false;
      }
      type = itemNode.attr('data-card-type');
      url = unescape(preNode.attr('data-url'));
//       showLoding();
      Wb.request({
        url: 'service/util/ocrRecognize/singleRecognize',
        showMask:false,
        params: {
          filePath: url,
          type: type,
          ordUserId : preId,
          ordId: itemNode.attr('data-ordid')
        },
        headers:{"access-token":""},
        success: function(r){
//           hideLoding();
          var res = Wb.decode(r.responseText);
          var row = res.values;
          if(row.message.status>0){  //识别成功
            layer.msg(row.message.value);
            win_edit_distin_guish.setItemValue(preId,win_edit_distin_guish.init(type,row.cardsinfo),type);
          }else{  //识别失败
            if(row.message.status*1===-1 && row.message.value){
              layer.msg(row.message.value,{shift:6});
            }else{
              layer.msg("识别失败,请选择正确清晰点的图片",{shift:6});
            }
          }
        }
      });
    },
    refreshCode:function(){
      win_edit_distin_guish.refresh = false;
      win_edit_distin_guish.getqrcorde();
    },
    closeCode:function(e){
        $('#codeImg').hide();
        $('#mask').hide();
        e.stopPropagation();
    },
    deleteCard:function(event,that){
        var id=$(that).attr('data-id'),
            preNode = $(that).parent();
        win_edit_distin_guish.changeDeleteImg(preNode,id);
        event.stopPropagation();
    },
    onIdCardsEvent:function(that){
      if($(that).attr('data-isUpload')==='false'){
         $(that).attr('for','distin_guish_upload_input');
      }
      win_edit_distin_guish.eventID = $(that).attr('id');
    },
    onBtnEvent:function(that){
      var id = $(that).attr('data-id');
      var btnNode = $('#idCard_'+id);
      if(btnNode.attr('data-isUpload')==='false'){
        win_edit_distin_guish.onIdCardsEvent(btnNode);
        btnNode.click();
      }
    },
    unmask:function(that){
      $(that).hide();
      $('#codeImg').hide();
    },
    htmlTaiwanCard:function(row,dis){  //卡式入台证   22
      var id = row.ID;
      return '<div class="btnList clearfix">'+
        '<button class="btn'+(row.img ? ' btn-onclick':' btn-default')+'" '+(dis || (row.img? '': 'disabled="disabled" '))+'id="btn_distin_'+id+'" data-id="'+id+'" onclick="win_edit_distin_guish.distinguish(event,this)">点击识别</button></div>'+
        '<div class="clearfix"><div class="group clearfix"><span class="form-desc">证件号:</span><input '+dis+'type="text" name="passport" value="'+(row.passport || '')+'" id="passport_'+id+'" class="input-item input-100"></div></div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">姓 名:</span><input '+dis+'type="text" data-text="点击上传护照照片" id="cnName_'+id+'" onkeyup="win_edit_distin_guish.changeName(this,\''+id+'\');" value="'+(row.cnName || '')+'" name="cnName" class="input-item input-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">英文姓:</span><input '+dis+'type="text" value="'+(row.enName1 || '')+'" id="enName1_'+id+'" name="enName1" class="input-item input-100" /></div>'+
        '<div class="group clearfix"><span class="form-desc">英文名:</span><input '+dis+'value="'+(row.enName2 || '')+'" type="text" id="enName2_'+id+'" name="enName2" class="input-item input-100"></div></div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">出生日期:</span><input '+dis+'type="text" value="'+(row.birth ? Wb.formatDate(row.birth,'Y-m-d') : '')+'" name="birth" id="birth_'+id+'" onclick="laydate()" class="laydate-icon input-item timer-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">性 别:</span><select '+dis+'name="sex" id="sex_'+id+'" class="select-item input-100"><option '+(row.sex && row.sex==='男' ? 'selected=\"selected\"' : '')+' value="男">男</option><option '+(row.sex && row.sex==='女' ? 'selected=\"selected\"' : '')+' value="女">女</option></select></div>'+
        '</div>'+
         '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">签发日期:</span><input '+dis+'type="text" value="'+(row.DOI ? Wb.formatDate(row.DOI,'Y-m-d') : '')+'" name="DOI" id="DOI_'+id+'" onclick="laydate()" class="laydate-icon DOI input-item timer-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">有效日期:</span><input '+dis+'type="text" value="'+(row.DOE ? Wb.formatDate(row.DOE,'Y-m-d') : '')+'" name="DOE" id="DOE_'+id+'" onclick="laydate()" class="laydate-icon DOE input-item timer-100"></div>'+
        '</div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">签发地点:</span><input '+dis+'type="text" value="'+(row.POI || '')+'" name="POI" id="POI_'+id+'" class="input-item POI input-100"></div>'+
        '</div>';
    },
    htmlTaiwan:function(row,dis){  //台湾通信证
      var id = row.ID;
      return '<div class="btnList clearfix">'+
        '<button class="btn'+(row.img ? ' btn-onclick':' btn-default')+'" '+(dis || (row.img? '': 'disabled="disabled" '))+'id="btn_distin_'+id+'" data-id="'+id+'" onclick="win_edit_distin_guish.distinguish(event,this)">点击识别</button></div>'+
        '<div class="clearfix"><div class="group clearfix"><span class="form-desc">证件号:</span><input '+dis+'type="text" name="passport" value="'+(row.passport || '')+'" id="passport_'+id+'" class="input-item input-100"></div></div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">姓 名:</span><input '+dis+'type="text" data-text="点击上传护照照片" id="cnName_'+id+'" onkeyup="win_edit_distin_guish.changeName(this,\''+id+'\');" value="'+(row.cnName || '')+'" name="cnName" class="input-item input-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">英文姓:</span><input '+dis+'type="text" value="'+(row.enName1 || '')+'" id="enName1_'+id+'" name="enName1" class="input-item input-100" /></div>'+
        '<div class="group clearfix"><span class="form-desc">英文名:</span><input '+dis+'value="'+(row.enName2 || '')+'" type="text" id="enName2_'+id+'" name="enName2" class="input-item input-100"></div></div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">性 别:</span><select '+dis+'name="sex" id="sex_'+id+'" class="select-item input-100"><option '+(row.sex && row.sex==='男' ? 'selected=\"selected\"' : '')+' value="男">男</option><option '+(row.sex && row.sex==='女' ? 'selected=\"selected\"' : '')+' value="女">女</option></select></div>'+
        '<div class="group clearfix"><span class="form-desc">出生日期:</span><input '+dis+'type="text" value="'+(row.birth ? Wb.formatDate(row.birth,'Y-m-d') : '')+'" name="birth" id="birth_'+id+'" onclick="laydate()" class="laydate-icon input-item timer-100"></div>'+
        '</div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">公民身份号码:</span><input onblur="win_edit_distin_guish.validator(\'IDCard\',this);" '+dis+'id="IDCard_'+id+'" value="'+(row.IDCard || '')+'" type="text" name="IDCard" class="input-item input-300"></div>'+
        '<div class="group clearfix"><span class="form-desc">有效日期:</span><input '+dis+'type="text" value="'+(row.DOE ? Wb.formatDate(row.DOE,'Y-m-d') : '')+'" name="DOE" id="DOE_'+id+'" onclick="laydate()" class="laydate-icon DOE input-item timer-100"></div>'+
        '</div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">签发地点:</span><input '+dis+'type="text" value="'+(row.POI || '')+'" name="POI" id="POI_'+id+'" class="input-item POI input-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">签发日期:</span><input '+dis+'type="text" value="'+(row.DOI ? Wb.formatDate(row.DOI,'Y-m-d') : '')+'" name="DOI" id="DOI_'+id+'" onclick="laydate()" class="laydate-icon DOI input-item timer-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">联系方式:</span><input '+dis+'type="text" value="'+(row.ctInfo || '')+'" id="ctInfo_'+id+'" name="ctInfo" class="input-item input-100" /></div>'+ 
        '</div>';
    },
    htmlHk:function(row,dis){  //港澳通信证
      var id = row.ID;      
      return '<div class="btnList clearfix">'+
        '<button class="btn'+(row.img ? ' btn-onclick':' btn-default')+'" '+(dis || (row.img? '': 'disabled="disabled" '))+'id="btn_distin_'+id+'" data-id="'+id+'" onclick="win_edit_distin_guish.distinguish(event,this)">点击识别</button></div>'+
        '<div class="clearfix"><div class="group clearfix"><span class="form-desc">证件号:</span><input '+dis+'type="text" name="passport" value="'+(row.passport || '')+'" id="passport_'+id+'" class="input-item input-100"></div></div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">姓 名:</span><input '+dis+'type="text" data-text="点击上传护照照片" id="cnName_'+id+'" onkeyup="win_edit_distin_guish.changeName(this,\''+id+'\');" value="'+(row.cnName || '')+'" name="cnName" class="input-item input-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">英文姓:</span><input '+dis+'type="text" value="'+(row.enName1 || '')+'" id="enName1_'+id+'" name="enName1" class="input-item input-100" /></div>'+
        '<div class="group clearfix"><span class="form-desc">英文名:</span><input '+dis+'value="'+(row.enName2 || '')+'" type="text" id="enName2_'+id+'" name="enName2" class="input-item input-100"></div></div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">出生日期:</span><input '+dis+'type="text" value="'+(row.birth ? Wb.formatDate(row.birth,'Y-m-d') : '')+'" name="birth" id="birth_'+id+'" onclick="laydate()" class="laydate-icon input-item timer-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">性 别:</span><select '+dis+'name="sex" id="sex_'+id+'" class="select-item input-100"><option '+(row.sex && row.sex==='男' ? 'selected=\"selected\"' : '')+' value="男">男</option><option '+(row.sex && row.sex==='女' ? 'selected=\"selected\"' : '')+' value="女">女</option></select></div>'+
        '</div>'+
         '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">签发日期:</span><input '+dis+'type="text" value="'+(row.DOI ? Wb.formatDate(row.DOI,'Y-m-d') : '')+'" name="DOI" id="DOI_'+id+'" onclick="laydate()" class="laydate-icon DOI input-item timer-100"></div>'+
        '<div class="group clearfix"><span class="form-desc">有效日期:</span><input '+dis+'type="text" value="'+(row.DOE ? Wb.formatDate(row.DOE,'Y-m-d') : '')+'" name="DOE" id="DOE_'+id+'" onclick="laydate()" class="laydate-icon DOE input-item timer-100"></div>'+
        '</div>'+
        '<div class="clearfix">'+
        '<div class="group clearfix"><span class="form-desc">签发地点:</span><input '+dis+'type="text" value="'+(row.POI || '')+'" name="POI" id="POI_'+id+'" class="input-item POI input-100"></div>'+
        '</div>';
    },
    htmlpass:function(row,dis){                   //护照
      var id = row.ID;
      return '<div class="btnList clearfix">'+
       '<button class="btn'+(row.img ? ' btn-onclick':' btn-default')+'" '+(dis || (row.img? '': 'disabled="disabled" '))+'id="btn_distin_'+id+'" data-id="'+id+'" onclick="win_edit_distin_guish.distinguish(event,this)">点击识别</button></div>'+
       '<div class="clearfix"><div class="group clearfix"><span class="form-desc">护照号:</span><input '+dis+'type="text" name="passport" value="'+(row.passport || '')+'" id="passport_'+id+'" class="input-item input-100"></div></div>'+
       '<div class="clearfix">'+
       '<div class="group clearfix"><span class="form-desc">姓 名:</span><input '+dis+'type="text" data-text="点击上传护照照片" id="cnName_'+id+'" onkeyup="win_edit_distin_guish.changeName(this,\''+id+'\');" value="'+(row.cnName || '')+'" name="cnName" class="input-item input-100"></div>'+
       '<div class="group clearfix"><span class="form-desc">英文姓:</span><input '+dis+'type="text" value="'+(row.enName1 || '')+'" id="enName1_'+id+'" name="enName1" class="input-item input-100" /></div>'+
       '<div class="group clearfix"><span class="form-desc">英文名:</span><input '+dis+'value="'+(row.enName2 || '')+'" type="text" id="enName2_'+id+'" name="enName2" class="input-item input-100"></div></div>'+
       '<div class="clearfix">'+
       '<div class="group clearfix"><span class="form-desc">性 别:</span><select '+dis+'name="sex" id="sex_'+id+'" class="select-item input-100"><option '+(row.sex && row.sex==='男' ? 'selected=\"selected\"' : '')+' value="男">男</option><option '+(row.sex && row.sex==='女' ? 'selected=\"selected\"' : '')+' value="女">女</option></select></div>'+
       '<div class="group clearfix"><span class="form-desc">出生地点:</span><input '+dis+'type="text" value="'+(row.POB || '')+'" name="POB" id="POB_'+id+'" class="input-item input-100"></div>'+
       '</div>'+
       '<div class="clearfix">'+
       '<div class="group clearfix"><span class="form-desc">出生日期:</span><input '+dis+'type="text" value="'+(row.birth ? Wb.formatDate(row.birth,'Y-m-d') : '')+'" name="birth" id="birth_'+id+'" onclick="laydate()" class="laydate-icon input-item timer-100"></div>'+
       '<div class="group clearfix"><span class="form-desc">签发地点:</span><input '+dis+'type="text" value="'+(row.POI || '')+'" name="POI" id="POI_'+id+'" class="input-item POI input-100"></div>'+
       '</div>'+
       '<div class="clearfix">'+
       '<div class="group clearfix"><span class="form-desc">签发日期:</span><input '+dis+'type="text" value="'+(row.DOI ? Wb.formatDate(row.DOI,'Y-m-d') : '')+'" name="DOI" id="DOI_'+id+'" onclick="laydate()" class="laydate-icon DOI input-item timer-100"></div>'+
       '<div class="group clearfix"><span class="form-desc">有效日期:</span><input '+dis+'type="text" value="'+(row.DOE ? Wb.formatDate(row.DOE,'Y-m-d') : '')+'" name="DOE" id="DOE_'+id+'" onclick="laydate()" class="laydate-icon DOE input-item timer-100"></div>'+
       '<div class="group clearfix"><span class="form-desc">联系方式:</span><input '+dis+'type="text" value="'+(row.ctInfo || '')+'" id="ctInfo_'+id+'" name="ctInfo" class="input-item input-100" /></div>'+ 
       '</div>';
    },
    htmlCard:function(row,dis){                     //身份证
     var id = row.ID;
     return '<div class="btnList clearfix">'+  
            '<button class="btn'+(row.img ? ' btn-onclick':' btn-default')+'" '+(dis || (row.img? '': 'disabled="disabled" '))+'id="btn_distin_'+id+'" data-id="'+id+'" onclick="win_edit_distin_guish.distinguish(event,this)">点击识别</button></div>'+
            '<div class="clearfix">'+
              '<div class="group clearfix"><span class="form-desc">姓 名:</span><input '+dis+'data-text="点击上传身份证照片" onkeyup="win_edit_distin_guish.changeName(this,\''+id+'\');" id="cnName_'+id+'" type="text" value="'+(row.cnName || '')+'" name="cnName" class="input-item input-100"></div>'+
              '<div class="group clearfix"><span class="form-desc">英文姓:</span><input '+dis+'id="enName1_'+id+'" type="text" value="'+(row.enName1 || '')+'" name="enName1" class="input-item input-100"></div>'+
              '<div class="group clearfix"><span class="form-desc">英文名:</span><input '+dis+'id="enName2_'+id+'" type="text" value="'+(row.enName2 || '')+'" name="enName2" class="input-item input-100"></div>'+
            '</div>'+
            '<div class="clearfix">'+
              '<div class="group clearfix"><span class="form-desc">性 别:</span><select '+dis+'name="sex" id="sex_'+id+'" class="select-item input-100"><option '+(row.sex && row.sex==='男' ? 'selected=\"selected\"' : '')+' value="男">男</option><option '+(row.sex && row.sex==='女' ? 'selected=\"selected\"' : '')+' value="女">女</option></select></div>'+
              '<div class="group clearfix"><span class="form-desc">民 族:</span><input '+dis+'type="text" value="'+(row.nation || '')+'" name="nation" id="nation_'+id+'" class="input-item input-100"></div>'+
            '</div>'+
            '<div class="clearfix"><div class="group clearfix"><span class="form-desc">出生日期:</span><input '+dis+'value="'+(row.birth ? Wb.formatDate(row.birth,'Y-m-d') : '')+'" id="birth_'+id+'" type="text" name="birth" onclick="laydate()" class="laydate-icon input-item timer-100"></div>'+
            '</div>'+
            '<div class="clearfix"><div class="group clearfix"><span class="form-desc">住 址:</span><input '+dis+'id="address_'+id+'" type="text" value="'+(row.address || '')+'" name="address" class="input-item input-300"></div>'+
            '</div>'+
            '<div class="clearfix">'+
            '<div class="group clearfix"><span class="form-desc">公民身份号码:</span><input onblur="win_edit_distin_guish.validator(\'IDCard\',this);" '+dis+'id="IDCard_'+id+'" value="'+(row.IDCard || '')+'" type="text" name="IDCard" class="input-item input-300"></div>'+
            '<div class="group clearfix"><span class="form-desc">联系方式:</span><input '+dis+'type="text" value="'+(row.ctInfo || '')+'" id="ctInfo_'+id+'" name="ctInfo" class="input-item input-100" /></div>'+ 
            '</div>';
    },
    validator:function(type,that){
      var str,reg;
      if(type==='IDCard'){
        str = $(that).val();
        if(str && str.length>10){
          reg=/^(\d{6})(18|19|20)(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)$/.test(str);
          if(!reg){
            layer.msg('身份证填写有误！',{shift:6});
            $(that).val('');
          }
        }
      }
    },
    changeDeleteImg:function(preNode,id,text){
        preNode.hide().html('');
        var idCard = $('#idCard_'+id);
            idCard.show();
        idCard.attr({
          'data-url':'',
          'data-isupload':'false'
        }).find('p').text(text);
        $('#btn_distin_'+id).attr('disabled','disabled').removeClass('btn-onclick').addClass('btn-default');

    },
    changeCard:function(that){
      var node = $(that),
          preId;
      preId = node.parent().attr('data-id');
      var clickType = node.attr('data-type'),
          changeNode = $('#user_form_'+preId),
          nowType = changeNode.attr('data-type'),
          itemNode = $('#user_item_'+preId),
          clickText = node.attr('data-text');
      if(nowType!==clickType){
          var cnName = $('#cnName_'+preId).val(),
              IDCard = $('#IDCard_'+preId).val(),
              passport = $('#passport_'+preId).val();
          var isUpload = $('#idCard_'+preId).attr('data-isupload');
            var rows = {
                 ID:preId,
                 cnName:'',
                 enName1:'',
                 enName2:'',
                 sex:'男', 
                 birth:'',
                 POB:'',
                 passport:'',
                 DOI:'',
                 DOE:'',
                 POI:'',
                 IDCard:'',
                 img:''
              };

          if(cnName && (IDCard || passport)){
             layer.confirm('确定要切换吗？之前的数据将会被清空！？', {
                btn: ['确定', '取消'] //可以无限个按钮
              }, function(index, layero){
                //按钮【按钮一】的回调
                layer.close(index);
                 node.addClass("active").siblings().removeClass("active");
                 itemNode.attr('data-card-type',clickType);
                 if(isUpload==='true'){
                    win_edit_distin_guish.changeDeleteImg($('#showList_item_img_'+preId),preId,clickText); 
                 }
                 switch(clickType){  
                   case '13':  //护照
                     changeNode.attr('data-type','13').html(win_edit_distin_guish.htmlpass(rows,''));
                     break;
                   case '2':  //身份证
                     changeNode.attr('data-type','2').html(win_edit_distin_guish.htmlCard(rows,''));
                     break;
                   case '22':  //港澳通行证
                     changeNode.attr('data-type','22').html(win_edit_distin_guish.htmlHk(rows,''));
                     break;
                   case '11':  //台湾通行证
                     changeNode.attr('data-type','11').html(win_edit_distin_guish.htmlTaiwan(rows,''));
                     break;
                 }
              }, function(index){
                //按钮【按钮二】的回调
                layer.close(index);
              }); 	
          }else{
             node.addClass("active").siblings().removeClass("active");
             itemNode.attr('data-card-type',clickType);
             if(isUpload==='false'){
                 $('#idCard_'+preId).find('p').text(clickText);
             }else{
                 rows.img = '.jpg';
             }
             switch(clickType){  
               case '13':  //护照
                 changeNode.attr('data-type','13').html(win_edit_distin_guish.htmlpass(rows,''));
                 break;
               case '2':  //身份证
                 changeNode.attr('data-type','2').html(win_edit_distin_guish.htmlCard(rows,''));
                 break;
               case '22':  //港澳通行证
                 changeNode.attr('data-type','22').html(win_edit_distin_guish.htmlHk(rows,''));
                 break;
               case '11':  //台湾通行证 老式
                 changeNode.attr('data-type','11').html(win_edit_distin_guish.htmlTaiwan(rows,''));
                 break;
             }
          }
      }
    },
    htmlFn:function(obj){
          var events={
            uploads:'',
            distin:'',
            ID:obj.ID,
            ordID:obj.ordID,
            perType:obj.perType,
            cardType:obj.file_type*1 || 13,
            img:obj.img,          
            ctName:obj.ctName,
            isOK:obj.isOK,
            cpyName:obj.cpyName,
            isLock:obj.isLock,
            saleName:obj.saleName,
            fromcity_name:obj.fromcity_name,
            sort:obj.sort
          };
          var dis='',
              upLoadText='';
          if(events.isLock!==0){
             dis = 'disabled="disabled" '; 
          }
          var html='<div id="user_item_'+events.ID+'" data-islock="'+events.isLock+'" data-ordid="'+events.ordID+'" data-card-type="'+events.cardType+'" class="upload_ctr">';
              //--------------------------------------------
              html+='<div class="userInfo-title">'; 
              html+='<span class="item">第 <span style="font-size:16px;color:#0386ca;font-weight:bold;">'+(events.sort || '')+'</span> 位</span>'; 
              html+='<span class="item-title">游客类型：</span>';
              html+='<span class="item">'+(events.perType || '')+'</span>';

  //             html+='<span class="item-title">状态：</span>';
  //             html+='<span class="item" style="color:'+(events.isLock===1 ? "green":"gray")+';">'+(events.isLock===1 ? '已审核':'未审核' || '')+'</span>';

  //             html+='<span class="item-title">订单号：</span>';
  //             html+='<span class="item">'+(events.ordID || '')+'</span>';    
  //             html+='<span class="item-title">联系人：</span>';
  //             html+='<span class="item">'+(events.ctName || '')+'</span>';
  //             html+='<span class="item-title">公司名称：</span>';    
  //             html+='<span class="item">'+(events.cpyName || '')+'</span>';
  //             html+='<span class="item-title">销售：</span>';    
  //             html+='<span class="item">'+(events.saleName || '')+'</span>';
  //             html+='<span class="item-title">出发城市:</span>';    
  //             html+='<span class="item">'+(events.fromcity_name || '')+'</span>';
              html+='</div>';   
              html+='<div class="userforms clearfix">';
              //--------------------------------------------
              html+='<div class="tablist" data-id="'+events.ID+'">';
                html+='<span class="'+(events.cardType*1===13 ? 'active': '')+'" data-text="点击上传护照照片" data-type="13" '+(events.isLock!==0 ? "" : "onclick=\"win_edit_distin_guish.changeCard(this);\"")+'>护 照</span>';
                html+='<span class="'+(events.cardType*1===2 ? 'active': '')+'" data-text="点击上传身份证照片" data-type="2" '+(events.isLock!==0 ? "" : "onclick=\"win_edit_distin_guish.changeCard(this);\"")+'>身份证</span>';
                //html+='<span class="'+(events.cardType*1===22 ? 'active': '')+'" data-text="点击上传港澳通行证照片" data-type="22" '+(events.isLock!==0 ? "" : "onclick=\"win_edit_distin_guish.changeCard(this);\"")+'>港澳通行证</span>';
                html+='<span class="'+(events.cardType*1===11 ? 'active': '')+'" data-text="点击上传台湾通行证照片" data-type="11" '+(events.isLock!==0 ? "" : "onclick=\"win_edit_distin_guish.changeCard(this);\"")+'>台湾通行证</span>';
              html+='</div>';
              switch(events.cardType){
                case 13:
                  upLoadText = '点击上传护照照片';
                  break;
                case 2:
                  upLoadText = '点击上传身份证照片';
                  break;
                case 22:
                  upLoadText = '点击上传港澳通行证照片';
                  break;
                case 11:
                  upLoadText = '点击上传台湾通行证照片';
                  break;
              }




                  html+='<div class="userInfo clearfix">';
                  html+='<div class="card" id="showList_item_img_'+events.ID+'" '+(events.img ? 'style="display:show;"' : 'style="display:none;"')+'>'+(events.img ? '<div class="rotate rotate-left" '+(events.isLock!==0 ? '' : 'onclick="win_edit_distin_guish.rotate(\'left\',this);"')+'><span></span></div>'+
                         '<div class="rotate rotate-right" '+(events.isLock!==0 ? '' : 'onclick="win_edit_distin_guish.rotate(\'right\',this);"')+'><span></span></div>'+
                         '<div class="delCard" data-id="'+events.ID+'" '+(events.isLock!==0 ? '' : 'onclick="win_edit_distin_guish.deleteCard(event,this);"')+'><span></span></div>'+
                         '<img '+(events.isLock!==0 ? '' : 'onmousedown="win_edit_distin_guish.mousedown(this,event);"')+' data-rotate="0" '+(events.isLock!==0 ? '' : 'onmousewheel="win_edit_distin_guish.mousewheel(this,event);"')+' src="'+events.img+'" />' :'')+'</div>';
                  html+='<label style="width:348px;height:228px;" '+(events.img ? 'style="display:none;"':'')+' id="idCard_'+events.ID+'" data-id="'+events.ID+'" data-url="'+(events.img ? escape(events.img) :'')+'" data-isupload="false"><div id="uploadfileitem_'+events.ID+'" class="card"><div class="add">+</div><p>'+upLoadText+'</p></div></label>';


  //                     html+='<label id="idCard_'+events.ID+'" data-id="'+events.ID+'" data-url="'+(events.img ? escape(events.img) : '' )+'" data-isupload="'+(events.img ? true : false)+'" '+((events.isLock!==0)? '' :'onclick="win_edit_distin_guish.onIdCardsEvent(this);"')+'>';
  //                         html+='<div class="card">'+(events.img ? '<div class="rotate rotate-left" '+((events.isLock!==0)? '' :'onclick="win_edit_distin_guish.rotate(\'left\',this);"')+'><span></span></div><div class="rotate rotate-right" '+((events.isLock!==0)? '' :'onclick="win_edit_distin_guish.rotate(\'right\',this);"')+'><span></span></div><div class="delCard" data-id="'+events.ID+'" '+((events.isLock!==0)? '' :'onclick="win_edit_distin_guish.deleteCard(event,this);"')+'><span></span></div><img '+((events.isLock!==0)? '' :'onmousedown="win_edit_distin_guish.mousedown(this,event);"')+' data-rotate="0" '+((events.isLock!==0)? '' :'onmousewheel="win_edit_distin_guish.mousewheel(this,event);"')+' src="'+events.img+'">' : '<div class="add">+</div><p>'+upLoadText+'</p>');
  //                         html+='</div>';
  //                     html+='</label>';
                  html+='</div>';
                      switch(events.cardType){                      
                        case 13:   //护照
                          html+='<div id="user_form_'+events.ID+'" data-type="13" class="userformList clearfix">'+win_edit_distin_guish.htmlpass(obj,dis)+'</div>';
                          break;
                        case 2:    //身份证
                          html+='<div id="user_form_'+events.ID+'" data-type="2" class="userformList clearfix">'+win_edit_distin_guish.htmlCard(obj,dis)+'</div>';
                          break;  
                        case 22:  //港澳通行证
                          html+='<div id="user_form_'+events.ID+'" data-type="22" class="userformList clearfix">'+win_edit_distin_guish.htmlHk(obj,dis)+'</div>';
                          break;
                        case 11:  //台湾通行证
                          html+='<div id="user_form_'+events.ID+'" data-type="9" class="userformList clearfix">'+win_edit_distin_guish.htmlTaiwan(obj,dis)+'</div>';
                          break;
                      }

              html+='</div>';
          html+='</div>';
          return html;
    }
  };
  win_edit_distin_guish.userList.length = 0;
  win_edit_distin_guish.userIDs.length = 0;
  win_edit_distin_guish.initUser.length = 0;
  // Wb.request({
  //   url: 'main?xwl=342SNBWGJGT4',
  //   params: {
  //     planID: 1007552,
  //     ordID: 110763
  //   },
  //   showMask:true,
  //   success: function(r){
  //     var j = Wb.decode(r.responseText);
  //     if(j.success){
  //           var rows = j.rows; 
              var rows = mingdan_edit_store.distinData;
            if(rows.length){
               var htmls='<div class="mingdan_distin_guish_win">';
                    htmls+='<div class="header clearfix">';
                    htmls+='<div class="btn save" onclick="win_edit_distin_guish.saveUser();">保 存</div>';
                    htmls+='<div class="btn qrcode" onclick="win_edit_distin_guish.getqrcorde(this,event,\'batch\');">手机批量传图'+
                           '<div style="left:-25px;display:none;" id="codeImg" title="点击刷新" onclick="win_edit_distin_guish.refreshCode();"></div>'+
                           '</div>';
                    htmls+='<div id="mask" onclick="win_edit_distin_guish.unmask(this);"></div><div class="btn batch" id="container"><a href="javascript:;" id="pickfiles_1">电脑批量传图</a></div>'+
                           // '<div class="btn" onclick="win_edit_distin_guish.batchdist();">批量识别</div>'+
  //                          '<div class="textInfo">公测期间免费使用，正式商用时需要购买识别次数，正式商用时间另行通知。</div><div class="help" onclick="win_edit_distin_guish.help();">拍照小技巧</div></div>';
                      '<div style="color:red;font-size:14px;line-height:3;" >（注：证件识别的自动识别功能是增值功能，需要充值后才能使用！）</div>'+
                      '<div class="textInfo"></div><div class="help" onclick="win_edit_distin_guish.help();">拍照小技巧</div></div>';
              var timer = rows[0].backDate.substring(0,10).split('-');
              win_edit_distin_guish.G_backDate = new Date(timer[0],Number(timer[1])-1,timer[2]);
              for(var i=0;i<rows.length;i++){
                   rows[i].sort = i+1;
                   win_edit_distin_guish.userList.push({
                     ID:rows[i].ID,
                     perType:rows[i].perType,
                     cardType:rows.file_type || 13,
                     isLock:rows[i].isLock,
                     img:'',
                     name:''
                   });
                   if(!rows[i].img){
                     win_edit_distin_guish.uploadCheckImg.push({
                        ID:rows[i].ID,
                        isLock:rows[i].isLock
                     });
                   }
                   win_edit_distin_guish.userIDs.push(rows[i].ID);
                  if(rows[i].passport || rows[i].IDCard){
                    win_edit_distin_guish.initUser.push({
                       ID:rows[i].ID,
                       passport:rows[i].passport,
                       IDCard:rows[i].IDCard
                    });
                   }

                   htmls+=win_edit_distin_guish.htmlFn(rows[i]);
                }
                htmls+='</div>';
               $('#mingdan_distin_guish_win_panel').html(htmls);
                $.post('service/attach/token/create',function(data){
                    win_edit_distin_guish.itemQiniuUpload(data.values.token,data.values.dn,rows);
                });

                win_edit_distin_guish.timer = null;
                clearTimeout(win_edit_distin_guish.timer);
                //七牛上传
                win_edit_distin_guish.qiniuToken();
            }
  //     }
  //   }
  // });  
}