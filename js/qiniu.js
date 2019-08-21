//七牛上传图片
//   function file_up(){
  var Uploader = Qiniu.uploader({
    runtimes: 'html5,html4', 
    browse_button: 'pickfiles', 
    uptoken : 'NZrTFjztBSRINUzLMYGRGtuxYBzbE8MeLTXoRgyy:MW_ti2G4Hz2p1rZBlzr92KXUsSs=:eyJzY29wZSI6Im9mZmljZS1maWxlLW9wMTE0IiwiZGVhZGxpbmUiOjE1NjYzNjk4MDJ9',
    domain: 'https://f.op114.com',
    unique_names:false,
    save_key:false,				  
    get_new_uptoken: false,
    container: 'container', 
    multi_selection: false,
    max_file_size: '10mb',
    max_retries: 0,
    dragdrop: false, 
    drop_element: 'imgListBox', 
    chunk_size: '4mb', 
    auto_start: true, 
    filters : {
    max_file_size : '10mb',
    prevent_duplicates: false,
  },
  init: {
    'FilesAdded':function(up, files) {
      //文件限制
      plupload.each(files, function(file) {
          var str = '';
          str = file.name;  //文件名称
          var index = str.lastIndexOf(".");
          var type = str.slice(index+1);    //文件后缀
          var total = $('#imgListBox>li');  //文件限制个数
        
          if(type!='doc' && type!='pdf' && type!='docx'){
            isUpload = false;
            up.removeFile(file);
            layer.msg('请上传word、pdf格式的文件！',{shift:6});
            return false;
          }
          if(total.length == 3){
          isUpload = false;
          up.removeFile(file);
          layer.msg('上传文档总数不能超过3个！',{shift:6});
          return false;
        }
      });
    },
    'BeforeUpload':function(up,file){
      //判断上传文档总大小
      var total_size = 0;
      var total = $('#imgListBox>li');
      var total_s = 0;
      for(var i=0;i<total.length;i++){
         total_s+=parseFloat(total[i].getAttribute('data-size'));
         if(file.name == total[i].getAttribute('data-name')){
           isUpload = false;
           up.removeFile(file);
           layer.msg('已存在该文件，请勿重复添加！',{shift:6});
           Uploader.stop();
           return false;
         }
      }
      if((file.size*1+total_s)/1024/1024>10){
        isUpload = false;
        up.removeFile(file);
        layer.msg('上传文档总大小不能超过10M！',{shift:6});
        Uploader.stop();
        return false; 
      }
      if(file.size == undefined){
        isUpload = false;
        up.removeFile(file);
        layer.msg('上传失败！',{shift:6});
        Uploader.stop();
        return false;
      }
     layer.load(2);        
    },
    'UploadProgress': function(up, files) {        
      // 每个文件上传时,处理相关的事情
//         Progress.update(files.percent);
    },
    'FileUploaded': function(up, file, info){   
      // 获取七牛回传的图片路径
      layer.closeAll('loading');
      var domain = up.getOption('domain');
      var res = JSON.parse(info),keysrc='';
      if(res.hasOwnProperty('executeStatus')){
        keysrc = res.values.key;
      }else{
        keysrc = res.key;
      }
      var sourceLink = domain +'/'+ keysrc;
      showImg($('#imgListBox'),sourceLink,file);
    },
    'Error': function(up, err, errTip) {
      layer.closeAll('loading');
      layer.msg('上传失败，文档最大支持10M！',{shift:6});
    },
    'UploadComplete': function() {
    },
    'Key': function(up, file) {
      // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
      // 该配置必须要在 unique_names: false , save_key: false 时才生效
      var now = new Date(),						    
          indexOf = file.name.lastIndexOf('.'),
          fileName = file.name.substring(0,file.name.lastIndexOf('.')),
          docType = file.name.substring(file.name.lastIndexOf('.')+1);
          timestamp = now.getTime();
      var key = "erp/1/"+getDatetime()+'/'+fileName+"_"+timestamp+'.'+docType;
      return key;
    }
  }
});
//加入预览区
function showImg(preNode,url,file){
var docType = file.name.substring(file.name.lastIndexOf('.')+1);
var fileName = file.name.substring(0,file.name.lastIndexOf('.'));
var html = '<li style="padding-right:5px" data-name="'+file.name+'" data-size="'+file.size+'" data-file=\'{url:"'+url+'",name: "'+fileName+'",type:"'+docType+'",size:"'+file.size+'"}\' >';
   html += '<i class="grid-column-icon '+Doc.getIcon(docType)+'"></i>';
   html += '<span style="padding:0px 5px 0px 3px;" title="'+fileName+'"  >'+Ext.String.ellipsis(fileName,14)+'</span>';
   html += '<i class="grid-column-icon del-btn"></i>';
html += '</li>';
preNode.append(html);   
}

//取时间
function getDatetime(){
function toNum(num){
  return num>9 ? num : ('0'+num);
}
var now = new Date();
var Y = now.getFullYear(),
    m = now.getMonth(),
    d = now.getDate();
return Y+toNum(m)+toNum(d);
}
//清空已传文件区文件。
$('#imgListBox').empty();


//点击删除按钮删除
$('#imgListBox').on('click','.del-btn',function(){
var thisNode = $(this);
   thisNode.parent().remove();
});
//   }