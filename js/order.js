//   $('#ele_edit_win').show();
//系统配置
var userConfig = $.parseJSON('{"user_end_num_show_config":1,"user_end_num_config":9,"user_end_num_than_config":"≥9","user_end_num_less_config":"紧张","user_show_sup_info":1,"btb_price_type":3,"pubFromCityID":"0","pubFromCityName":"不限","isVip":0}'); //系统配置
userConfig.user_show_sup_info_bool = userConfig.user_show_sup_info*1==1 ? false : true;  // 供应商 1 显示（false） 0 不显示(true)，
userConfig.btb_price_type_bool = userConfig.btb_price_type*1 == 1 ? true : false;    //客户价格。   1  为市场价   3 为 市场价 和同行价
userConfig.isVip_bool = userConfig.isVip*1 >0 ?false:true;  //结算价类型 0 市场价结算 1同行价结算  
var contract_type = Wb.decode('[1,1]'); //电子合同类型
window.Wd = window;
var overdue_order = '2';  //是否允许补单
var overdue_day = '30' //过期多少天可补单
// console.log('overdue_order:'+overdue_order);
// console.log('overdue_day:'+overdue_day);
var lineID = '10407';
var planID = '';  
var type_num = 0;  //判断是线路还是团期  
var planIDInTip = null;  
Wd.datePlans = {};  //线路的所有团期，按日期划分
var priceMealDatas = []; //团期的价格套餐数据
var fromCityDatas = [];  //起止城市数据
var contractDatas = [];	 //合同数据
var insuranceDatas = []; //保险数据 
var priceType = 0;	//门店结算价格  0.市场价  1.同行价  
var getPriceTypeFlag = false;  
var mealPrice = [0,0,0,0,0];  //结算单价
var perCount = [0,0,0,0,0];  //人数
var otherBillPrice = 0;  //杂费单价
var sale_price = 0; //联运城市单价  
var orderAmount = 0;  //订单合计金额
var otherBillAmount = 0;  //杂费总额
var distinGuishLayerIndex = 0;  
var o_byTpl_files_url = '';  
var point_type = 0, point_rate = 0, point_price = 0; //获取扣点信息  
var all_amount = 0;
var change_num = 0;  //增减费
var originalValue={};  
var line_Type = ''; 
var per_dingPrice = 0;//定金/人
var ding_price = 0;//总定金
var insurance_cost_price = 0; //保险单价
var insurance_cost_total = 0; //保险总价
var otherBillProAmout = 0;//其他费用项目总价
var issue_order_start_time = ''; //允许补单开始时间
var issue_order_end_time = ''; //允许补单截至时间
var adu_price =0; //成人价
var chd_price =0; //小童价
var is_contract = '' //是否选中电子合同
var conTract_cpy ='';  //合同平台
var amount_all =''; //总团费
var amount_adult=''; //成人单价
var amount_child =''; //小童占床
var amount_adult1 =''; //小年轻
var amount_adult2 =''; //老人
var amount_child1=''; //小童不占床
var per_Adult_amount = ''; //成人单价
var per_Child_amount = ''; //儿童单价
var aduAmount = ''; //成人总费用
var childAcmount = ''; //儿童总费用
var adu_number ='' //成人总数
var child_number = ''; //儿童总数
var ordID = ''; //订单号
var traveler = '';  //签署人
var travelmobile = '';   //签署人联系方式
var guideFee = '' //导服费
var other_info ='';  //电子合同其他事项
var ele_contract_lq_data = ''; //领签发起电子合同数据
var ele_contract_qg_data = ''; //全国发起电子合同数据
var travels = '';  //游客名单
var address = '';  //领签签约地址
var cnName = '';   //游客代表姓名
var transactorName = ''; //经办人姓名
var transactorPhone = '';  //经办人电话
var payTime = Wb.formatDate(new Date(),'Y-m-d'); //支付时间
var mode = 1; //签约方式
var payType = 1;  //支付方式
var payOther ='' //其他支付方式
var singleSupplementCost = 0; //单房差
var contract_tpljson = '';  //领签合同数据
var files= '';//全国电子合同上传附件
var lq_templet_option = ''; //领签电子合同模板选择
var json = {}; //领签预览数据
var templetID = ''; //所选合同模板id
var hhh = {};
Wd.mingdanRowCount = 0;
Wd.mingdanData = [];
Wd.mingdanDataLength = 0;
Wd.mingdan_distin_data = [];
Wd.mingdanData_temp = [];  
//电子合同附件上传获取图标
Wd.Doc = {  
  getIcon:function(type){
    type = type.toLowerCase();
    var css = null;
    if ( type =='目录'){  //目录
       css =  'icon-type-folder';
      
    }else if (type == 'doc' || type == 'docx'){ //word
       css = 'icon-type-word';
    
    }else if (type == 'xls' || type=='xlsx'){ //excel
      css = 'icon-type-excel';
      
    }else if (type == 'ppt' || type == 'pptx'){
      css = 'icon-type-ppt';
    }else if (type == 'rar' || type == 'zip' || type == '7z' ){ //压缩
      css = 'icon-type-rar';
      
    }else if (type == 'pdf'){  //pdf
      css = 'icon-type-pdf';
      
    }else if (type == 'jpg'){  //jpg
      css = 'icon-type-jpg';
      
    }else if (type == 'gif'){  //gif
      css = 'icon-type-gif';
      
    }else if (type == 'png'){  //png
      css = 'icon-type-png';
      
    }else if (type == 'wps'){  //wps
      css = 'icon-type-wps';
      
    }else if (type == 'et'){  //et
      css = 'icon-type-et'; 
      
    }else if (type == 'dps' ){  //dps
      css = 'icon-type-dps'; 
      
    }else if (type == 'txt') {  //txt
      css = 'icon-type-txt'; 
      
    }else if (type == 'mp3') {  //mp3
      css = 'icon-type-mp3'; 
      
    }else if (type == 'mov' || type == 'mpeg' ||  type == 'flv' ||
              type == 'mpeg4' || type == 'avi' || type == 'rm' ) {  
      css = 'icon-type-move';  
      
    }else{  //其他
      css = 'icon-type-other';
      
    }
    return css;
  }
};
function isEmpty(value){
  if(typeof value === 'undefined' || value === null || value === ''){
      return true;
  }
  return false;   
}
  
function findRecord(arr, field, value){
  for(var i=0;i<arr.length;i++){  
    var obj = arr[i];
    if(obj[field] == value){
     	return obj;
    }
  }
  return null;
}

  //检测能否发起电子合同
  $.post("main?xwl=54A7H254ZGIL",function (data) {//检查合同公共配置
    if (data) {
      $.post("main?xwl=549XAT3UOA72", function (conf) {//检查门店配置
        var config = $.parseJSON(conf.rows[0].user_config);
        if (config.user_auto_audit === 0) {
          $("#e_contract").prop('disabled', 'disabled');
          $("#e_contract_img").css('display', '')
          .mouseover(function () {
            $("#e_contract_hint").css('display', '');
          })
          .mouseout(function () {
            $("#e_contract_hint").css('display', 'none');
          });
        }
      },'json')
    }
  },'json')
  layui.use('form', function () {
    var form = layui.form;
  });
  AMUI.plugin('mySelected', AMUI.selected);
  //    $('[data-am-selected]').mySelected();
  if ("false" != "false") { //检查报名权限
    $("#order").hide();
  }
  if ("false" != "false") { //检查占位权限
    $("#preOrder").hide();
  }
  //读取当前系统电子合同平台类型 
  $.ajax({
    type: "post",
    url: "main?xwl=346QG44BI18N",
    data: {
      planId: planID
    },
    success: function (text) {
      var data = JSON.parse(text);
      conTract_cpy = data.contractCpy;
    }
  });
  //检查增减费用权限
  if ("false" != "false") {
    $('#increase_fee').hide();
  } else {
    $('#increase_fee').show();
  }
  //预订人数增加
  $(".countadd").click(function () {
    var price_text = $(this).parent().parent().parent().parent().next().children().text();
    var input = $(this).prev().find('input');
    var value = input.val() ? parseInt(input.val()) : 0;
    if (price_text == "-") {
      value = 0;
    } else {
      value = value + 1;
      input.val(value);
    }
    countOrderPrice();
    var all_amount = $('.amount_all').text();
    var money = all_amount.substring(all_amount.lastIndexOf("￥") + 1);
    //     $('.orderAllAmount').html('￥'+(parseFloat(money)+parseFloat(change_num)).toFixed(2));
    //     $('#accountBalance').html('￥'+(parseFloat(money)+parseFloat(change_num)).toFixed(2)); 
  });
  $('.countendter>input').focus(function () {
    var price_text_2 = $(this).parent().parent().parent().parent().parent().next().children().text();
    if (price_text_2 == '-') {
      $(this).attr("disabled", "true");
      $(this).css('background', "#FFF");
    };
  });
  //预订人数减少
  $(".countsub").click(function () {
    var input = $(this).next().find('input');
    var value = input.val() ? parseInt(input.val()) : 0;
    if (value > 0) {
      layer.confirm('减少人数将自动移除对应名单，确认减少?', function (index) {
        value = value - 1;
        if (value < 0) {
          value = 0;
        }
        input.val(value);
        countOrderPrice();
        layer.close(index);
      });
    }
  });
  //价格套餐改变
  $('#priceMeal').change(function () {
    priceMealChange($(this).val());
    countOrderPrice();
  });
  //出发城市改变
  $('#fromCity').change(function () {
    var record = findRecord(fromCityDatas, 'transport_city_id', $(this).val());
    sale_price = record.sale_price;
    priceMealChange($('#priceMeal').val());
    countOrderPrice();
  });
  var preNumValue = 0;
  $('#aduNum').focus(function () {
    preNumValue = $(this).val() || 0;
  });
  $('#aduNum1').focus(function () {
    preNumValue = $(this).val() || 0;
  });
  $('#aduNum2').focus(function () {
    preNumValue = $(this).val() || 0;
  });
  $('#chdNum').focus(function () {
    preNumValue = $(this).val() || 0;
  });
  $('#chdNum1').focus(function () {
    preNumValue = $(this).val() || 0;
  });
  //预订人数变化
  $('#aduNum').change(function () {
    var input = $(this);
    var newValue = input.val() || 0;
    if (newValue < preNumValue) {
      layer.confirm('减少人数将自动移除对应名单，确认减少?', function (index) {
        countOrderPrice();
        layer.close(index);
      }, function (index) {
        input.val(preNumValue);
        layer.close(index);
      });
    } else {
      countOrderPrice();
    }
  });
  $('#aduNum1').change(function () {
    var input = $(this);
    var newValue = input.val() || 0;
    if (newValue < preNumValue) {
      layer.confirm('减少人数将自动移除对应名单，确认减少?', function (index) {
        countOrderPrice();
        layer.close(index);
      }, function (index) {
        input.val(preNumValue);
        layer.close(index);
      });
    } else {
      countOrderPrice();
    }
  });
  $('#aduNum2').change(function () {
    var input = $(this);
    var newValue = input.val() || 0;
    if (newValue < preNumValue) {
      layer.confirm('减少人数将自动移除对应名单，确认减少?', function (index) {
        countOrderPrice();
        layer.close(index);
      }, function (index) {
        input.val(preNumValue);
        layer.close(index);
      });
    } else {
      countOrderPrice();
    }
  });
  $('#chdNum').change(function () {
    var input = $(this);
    var newValue = input.val() || 0;
    if (newValue < preNumValue) {
      layer.confirm('减少人数将自动移除对应名单，确认减少?', function (index) {
        countOrderPrice();
        layer.close(index);
      }, function (index) {
        input.val(preNumValue);
        layer.close(index);
      });
    } else {
      countOrderPrice();
    }
  });
  $('#chdNum1').change(function () {
    var input = $(this);
    var newValue = input.val() || 0;
    if (newValue < preNumValue) {
      layer.confirm('减少人数将自动移除对应名单，确认减少?', function (index) {
        countOrderPrice();
        layer.close(index);
      }, function (index) {
        input.val(preNumValue);
        layer.close(index);
      });
    } else {
      countOrderPrice();
    }
  });
  $('#aduNum').val(1); //默认一个成人
  countOrderPrice();
  //导出名单
  $('#downloadMingdan').click(function () {
    var mda = getMingdanData(), //获取游客列表信息
        array = [];
    for (var x in mda) { //调整导出格式与顺序
      var arrayTemp = [
        mda[x].cnName || '', //姓名
        mda[x].enName1 || '', //英文姓氏
        mda[x].enName2 || '', //英文名字
        mda[x].sex || '', //性别
        mda[x].birth || '', //出生日期
        mda[x].POB || '', //出生地
        mda[x].POI || '', //签发地
        mda[x].passport || '', //证件号码
        mda[x].DOI || '', //签发日期
        mda[x].DOE || '', //有效日期
        mda[x].IDCard || '', //身份证
        mda[x].ctInfo || '' //联系方式
      ];
      array.push(arrayTemp);
    }
    var planDate = $("#planDate")[0].innerHTML, //导出名字(planCode)+planDate+名单
        planCode = $("#planCode")[0].innerHTML;
    if (planCode != '' && planCode != null) { //去掉团号的括号
      planCode = "_" + planCode.substring(1, (planCode.length - 1));
    }
    if (planCode != '' && planCode != null) { //去掉时间的-
      planDate = Wb.formatDate(new Date(planDate), 'Ymd');
    }
    Wb.download('main?xwl=346OCGL1XEWT', {
      "array": Wb.encode(array),
      "planCode": (planDate + planCode)
    });
  });
  function downloadTemplate() {
    top.location.href = 'https://tcdn.op110.com.cn/files/1/file/20190424/下单-名单导入模板_1556072062486.xls';
  }
  //导入名单
  $('#importMingdan').click(function () {
    if (Wd.mingdanRowCount <= 0) {
      layer.msg('请先输入预订人数，再录入名单！', {
        shift: 6
      });
      return;
    }
    o_byTpl_files_url = '';
    var html = '<div class="uploadDiv">  <div class="uploadContent">    <div style="display:inline-block;">上传文件：<input type="text" class="uploadFile" id="uploadFile" readOnly/><span class="uploadIcon" onclick="uploadFile()"><img src="http://dev.op110.com.cn/sys/lincase/images/folder-magnify.png"></img></span></div>    <div style="display:inline-block;margin-left:160px;"><a href="javascript:void(0)" onclick = "downloadTemplate()"><img style="width:13px;height:13px;" src="https://cdn.op110.com.cn/lib/imgs/erp/download.png"> 下载导入模板</a></div>    <div class="uploadMingdans" id="uploadMingdans">        	</div>    	<div>  		设置名单数据区域：从 <input id="fromRow" class="mingdanRow" onkeyup="this.value=this.value.replace(/[^0-9]/g,\'\')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,\'\')" /> 行       	&nbsp;&nbsp;到 <input id="toRow" class="mingdanRow" onkeyup="this.value=this.value.replace(/[^0-9]/g,\'\')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,\'\')" /> 行  	</div>  </div>      <!--<div class="uploadToolbar">    <div class="fr toolbarBtn" onclick="cancelUploadMingdan()">取消</div>    <div class="fr toolbarBtn" onclick="confirmUploadMingdan()">确定</div>  </div>-->  </div>';
    //自定页
    layer.open({
      type: 1,
      title: '上传Excel模板',
      skin: 'layui-layer-demo', //样式类名
      closeBtn: 1, //不显示关闭按钮
      anim: 2,
      shadeClose: true, //开启遮罩关闭
      area: ['900px', '515px'],
      content: html,
      btn: ['确定', '取消'],
      yes: function (index, layero) {
        var data = {};
        data.filePath = o_byTpl_files_url;
        data.startRow = $('#fromRow').val();
        data.lastRow = $('#toRow').val();
        if (isEmpty(data.filePath)) {
          layer.msg('请先上传名单文件！', {
            shift: 6
          });
          return;
        }
        if (isEmpty(data.startRow)) {
          layer.msg('请输入起始行！', {
            shift: 6
          });
          return;
        }
        if (isEmpty(data.lastRow)) {
          layer.msg('请输入结束行！', {
            shift: 6
          });
          return;
        }
        if (data.startRow * 1 > data.lastRow * 1) {
          layer.msg('起始行不能大于结束行！', {
            shift: 6
          });
          return;
        }
        Wb.request({
          url: 'main?xwl=345VRFPPK3GR',
          params: data,
          showMask: false,
          success: function (r) {
            var j = Wb.decode(r.responseText);
            if (j.success === true) {
              setMingdanData(j.array);
              layer.close(index);
            } else {
              layer.msg(j.msg, {
                "shift": 6,
                time: 2000
              });
            }
          }
        });
      },
      btn2: function (index, layero) {
        return true;
      }
    });
    $('#o_file_byTpl').on('change', function () {
      $('#o_form_byTpl').submit();
      Wb.mask(null, '上传中...');
      $("#o_iframe_byTpl").load(function () {
        var resultJson = $(this).contents().find("*").first().text();
        var result = $.parseJSON(resultJson);
        if (result && result.state == "SUCCESS") {
          Wb.unmask(null);
          o_byTpl_files_url = result.url;
          $('#uploadFile').val(result.url);
          $('#o_file_byTpl').val(null);
          // 再次请求服务器预览
          Wb.request({
            url: 'main?xwl=343N7UHX9UVO',
            params: {
              "filePath": result.url,
              'planID': planID
            },
            showMask: false,
            success: function (r) {
              if (r.responseText) {
                $('#uploadMingdans').html(unescape(r.responseText));
                var lastRow = r.responseText.match(/<\/tr>/g).length;
                $('#fromRow').val(2);
                $('#toRow').val(lastRow - 1);
              } else {
                layer.msg('系统错误！', {
                  "shift": 6,
                  time: 2000
                });
              }
            }
          });
        }
      });
    });
  });
  //证件识别
  $('#distinGuish').click(function () {
    if (Wd.mingdanRowCount <= 0) {
      layer.msg('请先输入预订人数，再录入名单！', {
        shift: 6
      });
      return;
    }
    var html = '<div id="mingdan_distin_guish_win_panel">  <div class="mingdan_distin_guish_win">  <div class="upload_ctr">        <div class="userforms clearfix">            <span class="title">成 人</span>            <div class="userInfo clearfix">                <div class="card onIDCard">                    <div class="add">+</div>                    <p>身份证正面</p>                </div>                <div class="card offIDCard">                    <div class="add">+</div>                    <p>身份证反面</p>                </div>                <div class="card passport">                    <div class="add">+</div>                    <p>护 照</p>                </div>            </div>            <div class="btns clearfix">                <div class="btn">证件识别</div>                <div class="btn">证件识别</div>                <div class="btn">证件识别</div>            </div>            <div class="userformList">                <div class="group clearfix">                    <span class="form-desc">姓 名:</span>                    <input type="text" name="cnName" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">英文性:</span>                    <input type="text" name="enName1" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">英文名:</span>                    <input type="text" name="enName2" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">性 别:</span>                    <select name="sex" class="select-item input-100">                            <option value ="boy">男</option>                            <option value ="girl">女</option>                    </select>                </div>                <div class="group clearfix">                    <span class="form-desc">出生日期:</span>                    <input type="text" name="birth" onclick="laydate()" class="laydate-icon input-item timer-100">                </div>                <div class="group clearfix">                    <span class="form-desc">出生地:</span>                    <input type="text" name="POB" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">证件号码:</span>                    <input type="text" name="passport" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">签发日期:</span>                    <input type="text" name="DOI" onclick="laydate()" class="laydate-icon input-item timer-100">                </div>                <div class="group clearfix">                    <span class="form-desc">有效日期:</span>                    <input type="text" name="DOE" onclick="laydate()" class="laydate-icon input-item timer-100">                </div>                <div class="group clearfix">                    <span class="form-desc">签发地:</span>                    <input type="text" name="POI" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">身份证:</span>                    <input type="text" name="IDCard" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">联系方式:</span>                    <input type="text" name="ctInfo" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">分房信息:</span>                    <input type="text" name="room" class="input-item input-100">                </div>                <div class="group clearfix">                    <span class="form-desc">备注说明:</span>                    <input type="text" name="remark" class="input-item input-100">                </div>            </div>        </div>    </div></div>   </div>  ';
    //自定页
    layer.open({
      type: 1,
      title: '证件识别',
      skin: 'layui-layer-demo', //样式类名
      closeBtn: 1, //显示关闭按钮
      maxmin: true,
      resize: true,
      anim: 2,
      shadeClose: true, //开启遮罩关闭
      area: ['1150px', '700px'],
      content: html
    });
    distinGuishLayerIndex = layer.index;
    showDisGuishWin();
  });
  //报名
  $('#order').click(function () {
    if (!orderVerify('order')) {
      $('#order').css('background-color', "#169DF9");
      $('#order').removeAttr("disabled");
      return;
    }
    if ($('input:radio[name=contract]')[1].checked) { //选择电子合同
      //show_ele_contract_preview();
      is_contract = 1;
      $('#order').attr('disabled', "true");
      $('#order').css('background-color', "gray");
      //order();
      tj();
    };
    if ($('input:radio[name=contract]')[0].checked) { //选择纸质合同
      is_contract = 0;
      //验证
      $('#order').attr('disabled', "true");
      $('#order').css('background-color', "gray");
      order();
    }
  });
  //占位
  $('#preOrder').click(function () {
    Wb.request({
      //           type:"get",
      url: "main?xwl=3460ODAVLWC8",
      params: {
        'type': 1
      },
      success: function (r) {
        var data_ordId = Wb.decode(r.responseText);;
        if (!data_ordId.success) {
          return layer.msg('无效的身份信息。当前登陆不是门店账号！', {
            shift: 6
          });
        } else {
          preOrder();
        }
      }
    });
  });
  var url = "345VRFPPF8F0";
  if (!isEmpty(planID)) {
    url = "3430YCUAWXCS";
  }
  //获取线路信息、团期信息
  $.get("main?xwl=" + url, {
    lineID: lineID,
    planID: planID
  }, function (data) {
    originalValue = data;
    $('#lineTitle').html(data.lineTitle);
    $('#lineTitle').attr("data-lineid", lineID);
    if (1 === data.confirm_type || '1' === data.confirm_type) {
      $('#confirm_type').html('实时产品');
    } else if (2 === data.confirm_type || '2' === data.confirm_type) {
      $('#confirm_type').html('二次确认产品');
      $('#order').hide();
      $('#preOrder').css('background', "#169DF9");
      $('#preOrder').css('color', '#FFF');
      $('#preOrder').css('border-color', '#169DF9');
    } else {
      $('#confirm_type').html('数据异常');
    }
    $('#lineID').html('产品编号：' + data.lineID);
    $('#days').html('行程天数：' + data.days);
    if (0 === data.lineType || '0' === data.lineType) {
      $('#lineTypeName').html('产品类型：国内');
    } else if (1 === data.lineType || '1' === data.lineType) {
      $('#lineTypeName').html('产品类型：出境');
    } else if (2 === data.lineType || '2' === data.lineType) {
      $('#lineTypeName').html('产品类型：周边');
    } else if (4 === data.lineType || '4' === data.lineType) {
      $('#lineTypeName').html('产品类型：游轮');
    } else {
      $('#lineTypeName').html('产品类型：其它');
    }
    if (data.supCpyID && data.user_show_sup_info == 1) {
      $('#supCpyName').html('供应商：' + data.supCpyName);
      $('#supCpyName').show();
    }
    $('#userName').html(data.userName || '');
    $('#mobile').html(data.mobile || '');
    if (!isEmpty(data.isVip)) {
      priceType = data.isVip;
    }
    getPriceTypeFlag = true;
    if (!isEmpty(data.otherBillPrice)) {
      otherBillPrice = data.otherBillPrice;
    }
    //扣点
    point_type = data.point_type;
    point_rate = data.point_rate;
    point_price = data.point_price;
    //当前门店用户
    $('#userName').val(data.userName || "");
    $('#userPhone').val(data.mobile || "");
    //当前余额
    //     if(!isEmpty(data.account_balance)){
    // //       $('#accountBalance').html(Wb.formatNum(data.account_balance,'￥0,000.00'));
    //     }
    layui.use('form', function () {
      var form = layui.form;
      if (contract_type[0] == 1 && contract_type[1] == 0) { //纸质合同
        $('input:radio[name=contract]')[1].disabled = true;
        $("#ele_contract_list").css("display", "none");
        //           $('.layui-unselect').last().addClass('layui-radio-disbaled layui-disabled');
        form.render('radio');
      } else if (contract_type[0] == 0 && contract_type[1] == 1) { //电子合同
        // 根据门店配置显示电子合同页面		2019/08/13		万俊旭
        $('input:radio[name=contract]')[0].checked = false;
        $('input:radio[name=contract]')[1].checked = true;
        $('input:radio[name=contract]')[0].disabled = true;
        form.render('radio');
        $('#paper_contract').css("display", "none");
        //         $('#ele_contract').css("display", "block");
        //         if ('1' * 1 == 1 || '1' * 1 == 2102 || '1' * 1 == 1799) {
        //           $('#ele_contract_list').css("display", "block");
        //         }
        if('1' * 1 === 1){						//门店配置  允许电子合同配置
          $('#ele_contract').css("display", "none");
          $('#ele_contract_list').css("display", "block");
        }else{
          $('#ele_contract').css("display", "block");
        }
      } else if (contract_type[0] == 1 && contract_type[1] == 1) {
        $('input:radio[name=contract]')[0].checked = true;
        form.on('radio(contract)', function (data) {
          if (data.value == "纸质合同") { //判断单选框的选中值
            $('#ele_contract').css("display", "none");
            $("#ele_contract_list").css("display", "none");
            $('#paper_contract').css("display", "block");
          } else {
            $('#paper_contract').css("display", "none");
            //             $('#ele_contract').css("display", "block");
            //             if ('1' * 1 == 1 || '1' * 1 == 2102 || '1' * 1 == 1799) {
            //               $('#ele_contract_list').css("display", "block");
            //             }
            if('1' * 1 === 1){						//门店配置  允许电子合同配置
              $('#ele_contract').css("display", "none");
              $('#ele_contract_list').css("display", "block");
            }else{
              $('#ele_contract').css("display", "block");
            }
          }
        });
      }
    });
    //加载合同
    line_Type = data.lineType; //线路类别
    $.get("main?xwl=343KHTEPM4HO", {
      type: data.lineType
    }, function (data) {
      var row = data.rows;
      contractDatas = data.rows;
      var str = '<option></option>';
      for (var i = 0; i < row.length; i++) {
        str += '<option value=\'' + row[i].id + '\' data-contractno="' + row[i].contract_no + '">' + row[i]
        .contract_info + '</option>';
      }
      $('#contract').html(str);
    }, "json");
    //加载保险
    $.get("main?xwl=343UN6AF7K5R", {
      ins_type: data.lineType,
      days: data.days
    }, function (data) {
      var row = data.rows;
      insuranceDatas = data.rows;
      var str = '<option selected value="">请选择</option>';
      for (var i = 0; i < row.length; i++) {
        str += '<option value=\'' + row[i].id + '\' data-costprice="' + row[i].sale_price + '">' + row[i]
        .insurance + '</option>';
      }
      $('#insurance').html(str);
    }, "json");
    //海中旅定制 加载电子合同下拉列表
    if ('1' * 1 == 1 || '1' * 1 == 2102 || '1' * 1 == 1799) {
      $.get("main?xwl=345VRFPPJDB1", {
        contract_cpy: 3
      }, function (data) {
        if (data.success) {
          var row = data.rows;
          var str = '<option selected value="">请选择电子合同认证旅行社</option>';
          for (var i = 0; i < row.length; i++) {
            str += '<option value=\'' + row[i].id + '\' >' + row[i].agency_name + '</option>';
          }
          $("#ele_contract_select").html(str);
        }
      }, "json");
    }
    if (!isEmpty(planID) && !isEmpty(data.planDate)) {
      var planDom = $.find("li[data-date='" + data.planDate + "']");
      if (planDom.length > 0) {
        $(planDom).click();
      } else { //存在先取到数据，然后才渲染完DOM，导致找不到元素，故循环去多执行几次
        var i = 0;
        var t = setInterval(function () {
          var planDom = $.find("li[data-date='" + data.planDate + "']");
          if (planDom.length > 0) {
            $(planDom).click();
            clearTimeout(t);
          }
          i++;
          if (i > 8) {
            clearTimeout(t);
          }
        }, 200);
      }
    }
  }, "json");
  //选中团期
  function linePlanSelect(planID, planDate) {
    //选择团期后 移除对预定信息这一块不允许点击的操作的限制
    $("#schedule").css("pointer-events","auto");
    $('#planDate').html(planDate);
    //加载价格套餐
    $.get("main?xwl=34238056HZOZ", {
      planID: planID
    }, function (data) {
      var row = data.rows;
      per_dingPrice = row[0].DingPrice;
      priceMealDatas = data.rows;
      var str = '';
      for (var i = 0; i < row.length; i++) {
        if (i == 0) {
          str += '<option value=\'' + row[i].ID + '\' selected=\"selected\">' + row[i].price_title + '</option>';
        } else {
          str += '<option value=\'' + row[i].ID + '\'>' + row[i].price_title + '</option>';
        }
      }
      $('#priceMeal').html(str);
      if (per_dingPrice > 0) {
        $('#dingPrice_box').css('display', 'block');
        $('#ding_price').html(per_dingPrice.toFixed(2) + ' 元/人');
      } else {
        $('#dingPrice_box').css('display', 'none');
      }
      priceMealChange(priceMealDatas[0].ID);
      countOrderPrice();
    }, "json");
    //加载出发城市
    setTimeout(function () {
      $.get("main?xwl=341NW55QWSUD", {
        planID: planID
      }, function (data) {
        var row = data.rows;
        //         console.log('团期备注 '+row[0].plan_info);
        if (row[0].plan_info != null && row[0].plan_info != "") {
          $('#plan_info_content').show();
          if (per_dingPrice > 0) {
            $('#main > div:first-child > .manner').css("height", "600px");
          } else {
            $('#main > div:first-child > .manner').css("height", "570px");
          }
          $('#plan_info_content_look').html(row[0].plan_info);
          $('#plan_info_content_look').attr('title', '点击查看完整团期备注');
          $('#plan_info_content_look').on('click', function () {
            $('#plan_info_content_box').show();
            $('body').addClass('over_y');
            $('.plan_info_text').html(row[0].plan_info);
          });
          //关闭团期备注窗口
          $('.plan_info_btn_close').on('click', function () {
            $('#plan_info_content_box').hide();
            $('body').removeClass('over_y');
            $('.plan_info_text').html('');
          });
          $(document).keydown(function (e) {
            if (e.keyCode == 27) {
              $('#plan_info_content_box').hide();
              $('body').removeClass('over_y');
              $('.plan_info_text').html('');
            }
          });
        }
        fromCityDatas = data.rows;
        var str = '';
        for (var i = 0; i < row.length; i++) {
          if (i == 0) {
            sale_price = row[i].sale_price
            str += '<option value=\'' + row[i].transport_city_id + '\' selected=\"selected\">' + row[i]
            .fromCityName + '</option>';
          } else {
            str += '<option value=\'' + row[i].transport_city_id + '\'>' + row[i].fromCityName + '</option>';
          }
        }
        $('#fromCity').html(str);
      }, "json");
    }, 100);
    //显示团期信息
    $.get("main?xwl=345VRFPPF98F", {
      planID: planID
    }, function (data) {
      $('#planCode').html('(' + data.planCode + ')');
      var endNum = data.endNum,
          endNumStr = endNum;
      if (userConfig.user_end_num_show_config == 1) {
        if (endNum < userConfig.user_end_num_config) { //余位为1至小于设置位置，根据判断有设置显示设置，没设置显示余位。（orange）
          if (!Wb.isEmpty(userConfig.user_end_num_less_config)) {
            endNumStr = userConfig.user_end_num_less_config;
          } else {
            endNumStr = endNum;
          }
        } else { //余位>=设置位置，根据位置判断，有设置，显示设置，没有设置显示余位。 （green）
          if (!Wb.isEmpty(userConfig.user_end_num_than_config)) {
            endNumStr = userConfig.user_end_num_than_config;
          } else {
            endNumStr = '≥' + userConfig.user_end_num_config;
          }
        }
      }
      $('#endNum').text(endNumStr);
      $('#planNum').text(data.planNum);
    }, "json");
  }
  //价格套餐改变
  function priceMealChange(value) {
    if (isEmpty(value)) {
      return;
    }
    var record = findRecord(priceMealDatas, 'ID', value);
    //     console.log(priceType);
    if (priceType == 1) { //保存同行价
      mealPrice = [record.adultPrice + sale_price, record.adultPrice1 + sale_price, record.adultPrice2 + sale_price,
                   record.childPrice + sale_price, record.childPrice1 + sale_price
                  ];
    } else { //保存市场价
      mealPrice = [record.sadultPrice + sale_price, record.sadultPrice1 + sale_price, record.sadultPrice2 + sale_price,
                   record.schildPrice + sale_price, record.schildPrice1 + sale_price
                  ];
    }
    $('#adultPrice').html(mealPrice[0] * 1 ? Wb.formatNum(mealPrice[0], '￥0,000.00') : '-');
    $('#adultPrice1').html(mealPrice[1] * 1 ? Wb.formatNum(mealPrice[1], '￥0,000.00') : '-');
    $('#adultPrice2').html(mealPrice[2] * 1 ? Wb.formatNum(mealPrice[2], '￥0,000.00') : '-');
    $('#childPrice').html(mealPrice[3] * 1 ? Wb.formatNum(mealPrice[3], '￥0,000.00') : '-');
    $('#childPrice1').html(mealPrice[4] * 1 ? Wb.formatNum(mealPrice[4], '￥0,000.00') : '-');
  }
  //修改保险费用
  $('#insurance').change(function () {
    var insurance_price = $('#insurance').val();
    if (!isEmpty(insurance_price)) {
      var insurance_cost_total = 0;
      var sum0, sum1, sum2, sum3, sum4;
      sum0 = parseInt($('#aduNum').val(), 10),
        sum1 = parseInt($('#aduNum1').val(), 10),
        sum2 = parseInt($('#aduNum2').val(), 10),
        sum3 = parseInt($('#chdNum').val(), 10),
        sum4 = parseInt($('#chdNum1').val(), 10);
      $('.check_amount_insurance').show();
      var obj_ins = document.getElementById("insurance");
      for (var i = 0; i < obj_ins.options.length; i++) {
        if (obj_ins.options[i].selected) {
          var cost_price = obj_ins.options[i].dataset.costprice;
          var pri = parseFloat(cost_price);
          insurance_cost_price = pri;
          insurance_cost_total = insurance_cost_price * (sum0 + sum1 + sum2 + sum3 + sum4);
          $('.insurance_price').html(insurance_cost_total.toFixed(2));
        }
      }
      // $('.orderAllAmount').html(Wb.formatNum(orderAmount+insurance_cost_total+otherBillProAmout,'￥0000.00'));
      // $('#accountBalance').html(Wb.formatNum(orderAmount+insurance_cost_total+otherBillProAmout,'￥0000.00'));
      // accountBalance = Wb.formatNum(orderAmount+insurance_cost_total+otherBillProAmout,'0000.00');
    } else {
      $('.check_amount_insurance').hide();
      // $('.orderAllAmount').html(Wb.formatNum(orderAmount+otherBillProAmout,'￥0000.00'));
      // $('#accountBalance').html(Wb.formatNum(orderAmount+otherBillProAmout,'￥0000.00'));
      // accountBalance = Wb.formatNum(orderAmount+otherBillProAmout,'0000.00');
    }
    countOrderPrice();
  });
  //增减费
  $(document).ready(function () {
    $("#thePrice").blur(function () {
      var thePrice = $('#thePrice').val();
      if (orderAmount == 0) {
        $('#thePrice').val('');
        return layer.msg('请先选择一个团期', {
          shift: 6
        });
      }
      if (isNaN(thePrice) == true) {
        layer.msg("请输入数字", {
          shift: 6
        });
        return;
      }
      if (parseFloat(thePrice) < 0) {
        if (orderAmount + insurance_cost_total + parseFloat(thePrice) < 0) {
          return layer.msg('所减费用不能超过总团费哦', {
            shift: 6
          });
        }
      }
      var fin_price = parseFloat(orderAmount + parseFloat(thePrice) + insurance_cost_total);
      var order_price = parseFloat(ding_price);
      if (ding_price > 0) {
        if (fin_price < order_price) {
          return layer.msg('结算费用不能小于定金金额', {
            shift: 6
          });
        }
      }
      if (thePrice == '') {
        change_num = 0;
        $('.thePrice').html('￥0');
        // $('.orderAllAmount').html('￥'+(orderAmount+change_num+insurance_cost_total+otherBillProAmout).toFixed(2));
        // $('#accountBalance').html('￥'+(orderAmount+change_num+insurance_cost_total+otherBillProAmout).toFixed(2));
        // accountBalance = Wb.formatNum(orderAmount+change_num+insurance_cost_total+otherBillProAmout,'0000.00');
      } else {
        $('.thePrice').html(parseFloat(thePrice).toFixed(2));
        all_amount = orderAmount;
        change_num = parseFloat(thePrice);
        // var orderAllAmount = (orderAmount+(parseFloat(thePrice))+insurance_cost_total+otherBillProAmout).toFixed(2);
        // $('.orderAllAmount').html('');
        // $('.orderAllAmount').html('￥'+orderAllAmount);
        // $('#accountBalance').html('￥'+orderAllAmount);
        // accountBalance = orderAllAmount;
      }
      countOrderPrice();
    });
    // $('#accountBalance').html(Wb.formatNum(orderAmount+insurance_cost_total+otherBillProAmout,'￥0,000.00'));
    // accountBalance = Wb.formatNum(orderAmount+insurance_cost_total+otherBillProAmout,'0000.00');
  });
  function countOrderPrice() {
    var sum0, sum1, sum2, sum3, sum4;
    sum0 = parseInt($('#aduNum').val(), 10),
      sum1 = parseInt($('#aduNum1').val(), 10),
      sum2 = parseInt($('#aduNum2').val(), 10),
      sum3 = parseInt($('#chdNum').val(), 10),
      sum4 = parseInt($('#chdNum1').val(), 10);
    var sum0Price = isNaN(sum0) ? 0 : sum0 * mealPrice[0],
        sum1Price = isNaN(sum1) ? 0 : sum1 * mealPrice[1],
        sum2Price = isNaN(sum2) ? 0 : sum2 * mealPrice[2],
        sum3Price = isNaN(sum3) ? 0 : sum3 * mealPrice[3],
        sum4Price = isNaN(sum4) ? 0 : sum4 * mealPrice[4];
    //杂费    
    otherBillAmount = otherBillPrice * 1 * ((isNaN(sum0) ? 0 : sum0) + (isNaN(sum1) ? 0 : sum1) + (isNaN(sum2) ? 0 :
                                                                                                   sum2) + (isNaN(sum3) ? 0 : sum3) + (isNaN(sum4) ? 0 : sum4));
    //总团费
    orderAmount = sum0Price + sum1Price + sum2Price + sum3Price + sum4Price + otherBillAmount;
    //定金总额
    ding_price = per_dingPrice * ((isNaN(sum0) ? 0 : sum0) + (isNaN(sum1) ? 0 : sum1) + (isNaN(sum2) ? 0 : sum2) + (
      isNaN(sum3) ? 0 : sum3) + (isNaN(sum4) ? 0 : sum4));
    //其他费用项目
    otherBillProAmout = $(".other_amount_all_price").text() == "" ? 0 : parseFloat($(".other_amount_all_price").text());
    //保险费用总价
    insurance_cost_total = $(".insurance_price").text() == "" ? 0 : parseFloat($(".insurance_price").text());
    //总价
    // insurance_cost_total = insurance_cost_price*(sum0+sum1+sum2+sum3+sum4);
    // $('.insurance_price').html('￥'+insurance_cost_total.toFixed(2));
    //总团费
    $('.amount_all').html(Wb.formatNum(orderAmount, '0000.00'));
    //结算价格
    $('#accountBalance').html('￥' + parseFloat(orderAmount + insurance_cost_total + change_num + otherBillProAmout)
                              .toFixed(2));
    $('.orderAllAmount').html('￥' + parseFloat(orderAmount + insurance_cost_total + change_num + otherBillProAmout)
                              .toFixed(2));
    accountBalance = Wb.formatNum(orderAmount + change_num + (insurance_cost_price * (sum0 + sum1 + sum2 + sum3 +
                                                                                      sum4)), '0000.00');
    //成人
    if (mealPrice[0] == 0) {
      $('.amount_adult').html('￥0');
    } else {
      $('.amount_adult').html('￥' + mealPrice[0] + '×' + sum0);
      //发起电子合同时获取成人总价和儿童总价
      adu_price = mealPrice[0];
      if (mealPrice[0] > 0) {
        aduAmount = (mealPrice[0] * sum0 + mealPrice[1] * sum1 + mealPrice[2] * sum2);
        adu_number = sum0;
      }
      if (mealPrice[0] > 0 && mealPrice[1] > 0) {
        aduAmount = (mealPrice[0] * sum0 + mealPrice[1] * sum1);
        adu_number = sum0 + sum1;
      }
      if (mealPrice[0] > 0 && mealPrice[1] > 0 && mealPrice[2] > 0) {
        aduAmount = (mealPrice[0] * sum0 + mealPrice[1] * sum1 + mealPrice[2] * sum2);
        adu_number = sum0 + sum1 + sum2;
      }
      if (mealPrice[3] > 0) {
        childAcmount = (mealPrice[3] * sum3);
        child_number = sum3;
        per_Child_amount = mealPrice[3];
      }
      if (mealPrice[3] > 0 && mealPrice[4] > 0) {
        childAcmount = (mealPrice[3] * sum3 + mealPrice[4] * sum4);
        child_number = sum3 + sum4;
        per_Child_amount = mealPrice[3];
      }
      if (mealPrice[4] > 0) {
        child_number = sum4;
        amount_all = mealPrice[0] * adu_number + mealPrice[4] * child_number;
        per_Child_amount = mealPrice[4];
      } else {
        amount_all = mealPrice[0] * adu_number + mealPrice[3] * child_number;
      }
      per_Adult_amount = mealPrice[0];
      per_Child_amount = mealPrice[3];
      child_number = sum3 + sum4;
      amount_all = mealPrice[0] * (sum0 + sum1 + sum2) + mealPrice[3] * (sum3 + sum4);
    }
    //小童占床
    if (mealPrice[3] > 0) {
      if (sum3 == 0) {
        $('.amount_child').html('￥0');
      } else {
        $('.amount_child').html('￥' + mealPrice[3] + '×' + sum3);
        chd_price = mealPrice[3];
      }
    }
    //小年轻
    if (mealPrice[1] > 0) {
      if (sum1 == 0) {
        $('.amount_adult1').html('￥0');
      } else {
        $('.amount_adult1').html('￥' + mealPrice[1] + '×' + sum1);
      }
    }
    //老人
    if (mealPrice[2] > 0) {
      if (sum2 == 0) {
        $('.amount_adult2').html('￥0');
      } else {
        $('.amount_adult2').html('￥' + mealPrice[2] + '×' + sum2);
      }
    }
    //小童不占床
    if (mealPrice[4] > 0) {
      if (sum4 == 0) {
        $('.amount_child1').html('￥0');
      } else {
        $('.amount_child1').html('￥' + mealPrice[4] + '×' + sum4);
      }
    }
    if (otherBillAmount > 0) {
      $('.amount_other').html('￥' + (parseFloat(otherBillAmount)));
    }
    var amountDetailHtml = '';
    if (!isEmpty(sum0) && sum0 > 0) {
      amountDetailHtml += ' 成人' + sum0 + '位';
    }
    if (!isEmpty(sum3) && sum3 > 0) {
      if (!isEmpty(amountDetailHtml)) amountDetailHtml += ', ';
      amountDetailHtml += '小童占床' + sum3 + '位';
    }
    if (!isEmpty(sum1) && sum1 > 0) {
      if (!isEmpty(amountDetailHtml)) amountDetailHtml += ', ';
      amountDetailHtml += '小年轻' + sum1 + '位';
    }
    if (!isEmpty(sum2) && sum2 > 0) {
      if (!isEmpty(amountDetailHtml)) amountDetailHtml += ', ';
      amountDetailHtml += '老人' + sum2 + '位';
    }
    if (!isEmpty(sum4) && sum4 > 0) {
      if (!isEmpty(amountDetailHtml)) amountDetailHtml += ', ';
      amountDetailHtml += '小童不占床' + sum4 + '位';
    }
    if (isEmpty(amountDetailHtml)) amountDetailHtml += '成人0位， 小童占床0位';
    amountDetailHtml += '<br> 含杂费<span style="color:red;font-size:14px;font-weight:bold;">' + Wb.formatNum(
      otherBillPrice, '￥0,000.00') + '/人</span>';
    $('#amountdetail').html(amountDetailHtml);
    updateMingdan(sum0, sum1, sum2, sum3, sum4);
  }
  function updateMingdan(adt, adt1, adt2, chd, chd1) {
    adt = isNaN(adt) ? 0 : adt;
    adt1 = isNaN(adt1) ? 0 : adt1;
    adt2 = isNaN(adt2) ? 0 : adt2;
    chd = isNaN(chd) ? 0 : chd;
    chd1 = isNaN(chd1) ? 0 : chd1;
    //人数增加
    if (perCount[0] < adt) {
      addMingdan('adt', perCount[0], adt);
    }
    if (perCount[1] < chd) {
      addMingdan('chd', perCount[1], chd);
    }
    if (perCount[2] < adt1) {
      addMingdan('adt1', perCount[2], adt1);
    }
    if (perCount[3] < adt2) {
      addMingdan('adt2', perCount[3], adt2);
    }
    if (perCount[4] < chd1) {
      addMingdan('chd1', perCount[4], chd1);
    }
    //人数减少
    if (perCount[0] > adt) {
      removeMingdan('adt', perCount[0], adt);
    }
    if (perCount[1] > chd) {
      removeMingdan('chd', perCount[1], chd);
    }
    if (perCount[2] > adt1) {
      removeMingdan('adt1', perCount[2], adt1);
    }
    if (perCount[3] > adt2) {
      removeMingdan('adt2', perCount[3], adt2);
    }
    if (perCount[4] > chd1) {
      removeMingdan('chd1', perCount[4], chd1);
    }
    //修改人数对应的性质文字
    var type_text = {
      'adt': '成人',
      'chd': '小童占床',
      'adt1': '小年轻',
      'adt2': '老人',
      'chd1': '小童不占床'
    };
    var eles = $('#mingdansDiv').children();
    for (var i = 0; i < eles.length; i++) {
      var ele = $(eles[i]);
      var type = ele.attr('type');
      $(ele).find('.mingdantag').html(type_text[type]);
    }
    perCount = [adt, chd, adt1, adt2, chd1];
    Wd.mingdanRowCount = perCount[0] + perCount[1] + perCount[2] + perCount[3] + perCount[4];
    return true;
  }
  //名单增加
  function addMingdan(type, oldCount, nowCount) {
    var html = '<div type="adt">    <table width="100%" border=0>        <tr>            <td style="width:110px;" class="fieldlabel">                <span class="rank">1.</span>                <span class="must">*</span>                <span class="mingdantag">成人</span>：            </td>            <td>                <input type="text" name="cnName" placeholder="请输入游客姓名" onchange="toPinyin(this)"/>            </td>            <td class="fieldlabel">                英文姓氏：            </td>            <td>                <input type="text" name="enName1" placeholder="请输入英文姓氏"/>            </td>            <td class="fieldlabel">                英文名字：            </td>            <td>                <input type="text" name="enName2" placeholder="请输入英文名字"/>            </td>            <td class="fieldlabel">                性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：            </td>            <td>                <select name="sex">                    <option value="男">男</option>                    <option value="女">女</option>                </select>            </td>        </tr>        <tr>            <td class="fieldlabel">                <span class="must">*</span>                证件类型：            </td>            <td>                <select name="IDType" onchange="idTypeChange(this)">                    <option value="01">身份证</option>                    <option value="02">户口簿</option>                    <option value="03">护照</option>                    <option value="04">军人证件</option>                    <option value="09">赴台通行证</option>                    <option value="10">港澳通行证</option>                    <option value="25">港澳居民来往内地通行证</option>                    <option value="99">其他</option>                </select>            </td>            <td class="fieldlabel">                <span class="must">*</span>                证件号码：            </td>            <td>                <input type="text" name="IDCard" placeholder="请输入您的证件号码" onchange="IDCardInfo(this)"/>            </td>            <td class="fieldlabel">                出生日期：            </td>            <td>                <input type="text" name="birth" placeholder="请选择出生日期" onclick="laydate()" class="laydate-icon timer-113" />            </td>            <td class="fieldlabel">                联系方式：            </td>            <td>                <input type="text" name="ctInfo" placeholder="请输入游客联系方式"/>            </td>        </tr>        <tr class="other-mingdan-msg">            <td class="fieldlabel">                签发地点：            </td>            <td>                <input type="text" name="POI" placeholder="请输入您的签发地点"/>            </td>            <td class="fieldlabel">                签发日期：            </td>            <td>                <input type="text" name="DOI" placeholder="请选择签发日期" onclick="laydate()" class="laydate-icon timer-113"/>            </td>            <td class="fieldlabel">                有效日期：            </td>            <td>                <input type="text" name="DOE" placeholder="请选择有效日期" onclick="laydate()" class="laydate-icon timer-113"/>            </td>            <td class="fieldlabel">                出生地址：            </td>            <td>                <input type="text" name="POB" placeholder="请输入游客出生地址"/>            </td>        </tr>    </table>    <hr></div>';
    var addMingdanCount = nowCount - oldCount;
    for (var i = 0; i < addMingdanCount; i++) {
      Wd.mingdanData.push({});
      var appendIndex = 0;
      if (type == 'adt' || type == 'chd' || type == 'adt1' || type == 'adt2' || type == 'chd1') {
        appendIndex += $('#mingdansDiv').children("div[type='adt']").length;
      }
      if (type == 'chd' || type == 'adt1' || type == 'adt2' || type == 'chd1') {
        appendIndex += $('#mingdansDiv').children("div[type='chd']").length;
      }
      if (type == 'adt1' || type == 'adt2' || type == 'chd1') {
        appendIndex += $('#mingdansDiv').children("div[type='adt1']").length;
      }
      if (type == 'adt2' || type == 'chd1') {
        appendIndex += $('#mingdansDiv').children("div[type='adt2']").length;
      }
      if (type == 'chd1') {
        appendIndex += $('#mingdansDiv').children("div[type='chd1']").length;
      }
      appendIndex = appendIndex - 1;
      if (appendIndex < 0) {
        $('#mingdansDiv').append(html);
      } else {
        $('#mingdansDiv').find('div').eq(appendIndex).after(html);
      }
      //添加序号
      var rank_len = $('.rank');
      for (var j = 0; j < rank_len.length; j++) {
        $('.rank').eq(j).html(j + 1 + '.');
      }
      var ele = $('#mingdansDiv').children()[appendIndex + 1];
      $(ele).attr('type', type);
    }
  }
  //名单减少
  function removeMingdan(type, oldCount, nowCount) {
    var removeMingdanCount = oldCount - nowCount;
    for (var i = 0; i < removeMingdanCount; i++) {
      var eles = $('#mingdansDiv').find("div[type='" + type + "']");
      var index = eles.length;
      if (index > 0) {
        index--;
      }
      $(eles[index]).remove();
      //添加序号
      var rank_len = $('.rank');
      for (var j = 0; j < rank_len.length; j++) {
        $('.rank').eq(j).html(j + 1 + '.');
      }
    }
  }
  function toPinyin(nameInput) {
    var mingdanCon = $(nameInput).parent().parent().parent();
    var allName = $(nameInput).toSplicPinyin();
    mingdanCon.find('input[name="enName1"]').val(allName.firstName);
    mingdanCon.find('input[name="enName2"]').val(allName.lastName);
  }
  //证件类型Change事件
  function idTypeChange(select) {
    var mingdanCon = $(select).parent().parent().parent();
    var value = $(select).val();
    if (value !== '01') {
      mingdanCon.find('.other-mingdan-msg').show();
    } else {
      mingdanCon.find('.other-mingdan-msg').hide();
    }
  }
  //身份证自动获取出生日期、性别Change事件
  function IDCardInfo(select) {
    var mingdanCon = $(select).parent().parent().parent();
    var idcard = $(select).val();
    var idType = mingdanCon.find('select[name="IDType"]').val();
    if ("01" == idType || 1 == idType * 1) {
      if (getBirth(idcard)) {
        mingdanCon.find('input[name="birth"]').val(getBirth(idcard));
      } else {
        mingdanCon.find('input[name="birth"]').val('');
      }
      if (getSex(idcard)) {
        mingdanCon.find('select[name="sex"]').val(getSex(idcard));
      } else {
        mingdanCon.find('select[name="sex"]').val('');
      }
      if (getArea(idcard)) {
        mingdanCon.find('input[name="POB"]').val(getArea(idcard));
      } else {
        mingdanCon.find('input[name="POB"]').val('');
      }
    }
  }
  //获取名单数据
  function getMingdanData() {
    //修改人数对应的性质文字
    var type_text = {
      'adt': '成人',
      'chd': '小童占床',
      'adt1': '小年轻',
      'adt2': '老人',
      'chd1': '小童不占床'
    };
    var mingdanDatas = [];
    var mingdansEles = $('#mingdansDiv').children();
    for (var i = 0; i < mingdansEles.length; i++) {
      var mingdanEle = $(mingdansEles[i]);
      var mingdanData = {
        uid: i,
        perType: type_text[mingdanEle.attr('type')],
        cnName: mingdanEle.find("input[name='cnName']").val(),
        IDType: mingdanEle.find("select[name='IDType']").val(),
        //            IDCard: mingdanEle.find("input[name='IDCard']").val(),
        //            passport: mingdanEle.find("input[name='IDCard']").val(),
        birth: mingdanEle.find("input[name='birth']").val() || "",
        ctInfo: mingdanEle.find("input[name='ctInfo']").val(),
        sex: mingdanEle.find("select[name='sex']").val(),
        enName1: mingdanEle.find("input[name='enName1']").val(),
        enName2: mingdanEle.find("input[name='enName2']").val(),
        POI: mingdanEle.find("input[name='POI']").val(),
        DOI: mingdanEle.find("input[name='DOI']").val(),
        DOE: mingdanEle.find("input[name='DOE']").val(),
        POB: mingdanEle.find("input[name='POB']").val()
      };
      if (mingdanData.IDType == "01") { //身份证
        mingdanData.IDCard = mingdanEle.find("input[name='IDCard']").val();
        mingdanData.passport = "";
      } else {
        mingdanData.IDCard = "";
        mingdanData.passport = mingdanEle.find("input[name='IDCard']").val();
      }
      mingdanDatas.push(mingdanData);
    }
    return mingdanDatas;
  }
  //设置名单数据
  function setMingdanData(mingdanDatas) {
    var mingdansEles = $('#mingdansDiv').children();
    for (var i = 0; i < mingdansEles.length; i++) {
      if (i > mingdanDatas.length - 1) {
        break;
      }
      var mingdanEle = $(mingdansEles[i]);
      if (mingdanDatas[i].IDType == 2) {
        mingdanEle.find("select[name='IDType']").find("option[value='01']").attr("selected", true);
        mingdanEle.find("input[name='IDCard']").val(mingdanDatas[i].IDCard);
      } else if (mingdanDatas[i].IDType == 13) {
        mingdanEle.find("select[name='IDType']").find("option[value='03']").attr("selected", true);
        mingdanEle.find("input[name='IDCard']").val(mingdanDatas[i].passport);
      } else if (mingdanDatas[i].IDType == 11) {
        mingdanEle.find("select[name='IDType']").find("option[value='09']").attr("selected", true);
        mingdanEle.find("input[name='IDCard']").val(mingdanDatas[i].passport);
      } else {
        mingdanEle.find("select[name='IDType']").find("option[value='99']").attr("selected", true);
        mingdanEle.find("input[name='IDCard']").val(mingdanDatas[i].passport);
      }
      idTypeChange(mingdanEle.find("select[name='IDType']"));
      if (mingdanDatas[i].IDType == 2) {
        IDCardInfo(mingdanEle.find("input[name='IDCard']"));
      } else {
        mingdanEle.find("input[name='birth']").val(mingdanDatas[i].birth);
        mingdanEle.find("select[name='sex']").find("option[value='" + mingdanDatas[i].sex + "']").attr("selected",
                                                                                                       true);
        mingdanEle.find("input[name='POB']").val(mingdanDatas[i].POB);
      }
      mingdanEle.find("input[name='cnName']").val(mingdanDatas[i].cnName);
      if (!Wb.isEmpty(mingdanEle.find("input[name='cnName']"))) {
        toPinyin(mingdanEle.find("input[name='cnName']"));
      } else {
        mingdanEle.find("input[name='enName1']").val(mingdanDatas[i].enName1);
        mingdanEle.find("input[name='enName2']").val(mingdanDatas[i].enName2);
      }
      mingdanEle.find("input[name='ctInfo']").val(mingdanDatas[i].ctInfo);
      mingdanEle.find("input[name='POI']").val(mingdanDatas[i].POI);
      mingdanEle.find("input[name='DOI']").val(mingdanDatas[i].DOI);
      mingdanEle.find("input[name='DOE']").val(mingdanDatas[i].DOE);
    }
  }
  //获取有效的名单
  function getEffecMingdanData() {
    var mingdanDatas = [];
    var mingdansEles = $('#mingdansDiv').children();
    for (var i = 0; i < mingdansEles.length; i++) {
      var mingdanEle = $(mingdansEles[i]);
      var mingdanData = {
        uid: i,
        cnName: mingdanEle.find("input[name='cnName']").val(),
        IDType: mingdanEle.find("select[name='IDType']").val(),
        IDCard: mingdanEle.find("input[name='IDCard']").val(),
        passport: mingdanEle.find("input[name='IDCard']").val(),
        birth: mingdanEle.find("input[name='birth']").val(),
        ctInfo: mingdanEle.find("input[name='ctInfo']").val(),
        sex: mingdanEle.find("select[name='sex']").val(),
        enName1: mingdanEle.find("input[name='enName1']").val(),
        enName2: mingdanEle.find("input[name='enName2']").val(),
        POI: mingdanEle.find("input[name='POI']").val(),
        DOI: mingdanEle.find("input[name='DOI']").val(),
        DOE: mingdanEle.find("input[name='DOE']").val(),
        POB: mingdanEle.find("input[name='POB']").val()
      };
      if (!isEmpty(mingdanData.cnName) && !isEmpty(mingdanData.IDCard)) {
        mingdanDatas.push(mingdanData);
      }
    }
    return mingdanDatas;
  }
  function uploadFile() {
    $('#o_file_byTpl').click();
  }
  //报名
  function order(e) {
    //组织浏览器默认行为
    stopDefault(e);
    if (!orderVerify('order')) {
      $('#order').css('background-color', "#169DF9");
      $('#order').removeAttr("disabled");
      return;
    }
    var arr_OrdBills = [];
    var thePrice = $('#thePrice').val();
    var theTitle = $('#thePrice_reason').val();
    if (Wb.isEmpty(thePrice)) {
      theTitle = '';
    }
    if (thePrice == '') {
      theTitle = '';
      thePrice = 0;
    }
    if (Wb.isEmpty(theTitle)) {
      theTitle = '';
    }
    var contractID = $('#contract').val();
    if (!isEmpty(contractID)) {
      var contract_id_o = contractID.join(',');
    }
    if ($('input:radio[name=contract]')[1].checked) {
      if (conTract_cpy == 2) {
        $.ajax({
          type: "post",
          url: "main?xwl=346RFRS4I5OA",
          data: ele_contract_lq_data,
          success: function (text) {
            var j = JSON.parse(text);
            if (j.success) {
              var contract_Id = j.data.contractId;
              var contract_No = j.data.contractNo;
              var erp = j.data.erp;
              if (thePrice == '') {
                conmmon_req(erp, contract_Id, contract_No);
              } else {
                conmmon_req(erp, contract_Id, contract_No, thePrice, theTitle);
              }
            } else {
              layer.closeAll('loading');
              var msg_str = j.msg;
              var Msg = msg_str.replace(/&/g, '<br/>');
              return layer.msg(Msg, {
                shift: 6
              });
            }
          }
        });
      } else if (conTract_cpy == 3) {
        $.ajax({
          type: "post",
          url: "main?xwl=346RFRS4PWN6",
          data: ele_contract_qg_data,
          success: function (text) {
            var j = JSON.parse(text);
            if (j.success) {
              var contract_Id = j.data.contractId;
              var contract_No = j.data.contractNo;
              var erp = j.data.erp;
              if (thePrice == '') {
                conmmon_req(erp, contract_Id, contract_No);
              } else {
                conmmon_req(erp, contract_Id, contract_No, thePrice, theTitle);
              }
              files = ""; //清空电子合同附件
            } else {
              layer.closeAll('loading');
              var msg_str = j.msg;
              var Msg = msg_str.replace(/&/g, '<br/>');
              return layer.msg(Msg+"9999", {
                shift: 6
              });
            }
          }
        });
      }
    } else {
      $.ajax({
        type: "get",
        url: "main?xwl=3460ODAVLWC8",
        success: function (text) {
          var data_ordId = JSON.parse(text);
          if (!data_ordId.success) {
            return layer.msg('无效的身份信息。当前登陆不是门店账号！', {
              shift: 6
            });
          }
          var ordId = data_ordId.ordId;
          ordID = ordId;
          var result = getOrderData();
          var otherLinePlanOrdBillsStr = [];
          $("#other_amount_list .check_amount_child").each(function (i, ele) {
            var theTitle = $(ele).find(".fl").text() == "" ? "" : $(ele).find(".fl").text();
            var thePrice = $(ele).find(".price").text() == "" ? 0 : parseFloat($(ele).find(
              ".price").text());
            var theNum = $(ele).find(".number").text() == "" ? 0 : parseInt($(ele).find(
              ".number").text());
            otherLinePlanOrdBillsStr.push({
              theTitle: theTitle,
              thePrice: thePrice,
              theNum: theNum,
              billType: 14,
              costPrice:thePrice,
              costAmount:thePrice*theNum
            })
          })
          var data = {
            'id': ordId,
            'planId': planID,
            'pub_fromcity_id': result.pub_fromcity_id, //联运城市城市ID
            'policyId': result.policyId, //联运政策ID
            'baseTransportCityId': result.transport_city_id, //联运城市ID
            'fromCityId': result.fromCityID, //起止城市ID
            'ordType': '', //订单；类型
            'userType': result.priceType, //价格类型
            'isTicket': originalValue.isTicket, //是否占位，后台提供  
            'saleScore': '',
            'saleSalary': '',
            'aduNum': result.aduNum,
            'aduNum1': result.aduNum1,
            'aduNum2': result.aduNum2,
            'chdNum': result.chdNum,
            'chdNum1': result.chdNum1,
            'cpyBaseId': originalValue.cpyBaseID, //客户ID
            'cpyId': originalValue.cpyID, //供应商ID
            'ctName': result.userName, //客户联系人名
            'ctInfo': result.userPhone, //客户联系人电话
            'ordBak': result.ordBak,
            'iordBak': '',
            'billBak': '',
            'cpyTitle': '',
            'cpyTitleId': '',
            'saleId':originalValue.saleID,  //销售ID
            //               'saleId': 0, //佳俊 需求
            //               'saleName':'共享',
            'zhuliId': '', //
            'isTrueNum': 0, //确认单
            'linePlanPriceId': result.price_meal, //价格套餐
            'sourcesId': -1,
            //'mingdan': JSON.stringify(Wd.mingdanData),//Wb.encode(Wd.mingdanData),
            'mingdan': Wb.encode(result.mingdanData),
            "otherLinePlanOrdBills[0].theTitle": theTitle || '',
            "otherLinePlanOrdBills[0].thePrice": thePrice || 0,
            "otherLinePlanOrdBills[0].theNum": 1,
            "otherLinePlanOrdBills[0].costPrice": thePrice || 0,
            "otherLinePlanOrdBills[0].costAmount": thePrice || 0,
            "otherLinePlanOrdBills[0].billType": 3,
            'contractId_s': contract_id_o || '', //预留单不保存合同id和编号
            'contractNo_s': result.contract_no || '',
            'pointType': result.point_type,
            'pointRate': result.point_rate,
            'pointPrice': result.point_price,
            'amount': result.orderAmount, //市场金额
            'supAmount': result.supAmount, //结算金额
            'baoxianAmount': insurance_cost_total, //保险金额  result.baoxianAmount
            'insId': result.ins_id, //保险ID
            'admdeptid': parseInt('21', 0), //所属组织ID
            'otherLinePlanOrdBillsStr': JSON.stringify(otherLinePlanOrdBillsStr) //其他项目费用
          };
          var contract_num = result.contract_no;
          var insId_data = data.insId;
          var contractId_data = contract_id_o;
          //二次确认产品禁止报名
          var confirm_str = $('#confirm_type').text();
          if (confirm_str == '二次确认产品') {
            return layer.msg('二次确认产品不能报名哦', {
              shift: 6
            });
          }
          Wb.request({
            url: 'service/business/lineplanord/createOrd',
            params: data,
            showMask: false,
            headers: {
              "access-token": ""
            },
            success: function (j) {
              if (j.status == 200) {
                var result = Wb.decode(j.responseText);
                $('#order').css('background-color', "#169DF9");
                $('#order').removeAttr("disabled");
                if (result.success) {
                  $.ajax({
                    type: "post",
                    url: "main?xwl=3460ODAVSF4L",
                    data: {
                      ordId: ordId,
                      contract_no: contract_num,
                      contract_id: contractId_data,
                      ins_id: insId_data
                    },
                    success: function (text) {
                      layer.closeAll('loading');
                      var data_contract = JSON.parse(text);
                      if (!data_contract.success) {
                        return layer.msg(data_contract.msg, {
                          shift: 6
                        });
                      }
                    }
                  });
                  window.location.href = "/sys/main?xwl=345VRFPQ7T7V&ordId=" + ordId + "&contract_id=" +
                    contractId_data + "&contract_no=" + contract_num + "&is_contract=" + is_contract + "" +
                    "&insId=" + insId_data;
                } else {
                  layer.closeAll('loading');
                  Wb.err(result.code);
                }
              } else {
                layer.closeAll('loading');
                layer.msg('报名失败', {
                  shift: 6
                });
              }
            },
            failure: function () {
              layer.msg('数据请求失败', {
                shift: 6
              });
              layer.closeAll('loading');
              $('#order').css('background-color', "#169DF9");
              $('#order').removeAttr("disabled");
            }
          });
        }
      });
    }
  }
  function tj(e){
    stopDefault(e);
    if (!orderVerify('order')) {
      $('#order').css('background-color', "#169DF9");
      $('#order').removeAttr("disabled");
      return;
    }
    var arr_OrdBills = [];
    var thePrice = $('#thePrice').val();
    var theTitle = $('#thePrice_reason').val();
    if (Wb.isEmpty(thePrice)) {
      theTitle = '';
    }
    if (thePrice == '') {
      theTitle = '';
      thePrice = 0;
    }
    if (Wb.isEmpty(theTitle)) {
      theTitle = '';
    }
    var contractID = $('#contract').val();
    if (!isEmpty(contractID)) {
      var contract_id_o = contractID.join(',');
    }
    $.ajax({
      type: "get",
      url: "main?xwl=3460ODAVLWC8",
      success: function (text) {
        var data_ordId = JSON.parse(text);
        if (!data_ordId.success) {
          return layer.msg('无效的身份信息。当前登陆不是门店账号！', {
            shift: 6
          });
        }
        var ordId = data_ordId.ordId;
        ordID = ordId;
        var result = getOrderData();
        var otherLinePlanOrdBillsStr = [];
        $("#other_amount_list .check_amount_child").each(function (i, ele) {
          var theTitle = $(ele).find(".fl").text() == "" ? "" : $(ele).find(".fl").text();
          var thePrice = $(ele).find(".price").text() == "" ? 0 : parseFloat($(ele).find(
            ".price").text());
          var theNum = $(ele).find(".number").text() == "" ? 0 : parseInt($(ele).find(
            ".number").text());
          otherLinePlanOrdBillsStr.push({
            theTitle: theTitle,
            thePrice: thePrice,
            theNum: theNum,
            billType: 14,
            costPrice:thePrice,
            costAmount:thePrice*theNum
          })
        })
        var data = {
          'id': ordId,
          'planId': planID,
          'pub_fromcity_id': result.pub_fromcity_id, //联运城市城市ID
          'policyId': result.policyId, //联运政策ID
          'baseTransportCityId': result.transport_city_id, //联运城市ID
          'fromCityId': result.fromCityID, //起止城市ID
          'ordType': '', //订单；类型
          'userType': result.priceType, //价格类型
          'isTicket': originalValue.isTicket, //是否占位，后台提供  
          'saleScore': '',
          'saleSalary': '',
          'aduNum': result.aduNum,
          'aduNum1': result.aduNum1,
          'aduNum2': result.aduNum2,
          'chdNum': result.chdNum,
          'chdNum1': result.chdNum1,
          'cpyBaseId': originalValue.cpyBaseID, //客户ID
          'cpyId': originalValue.cpyID, //供应商ID
          'ctName': result.userName, //客户联系人名
          'ctInfo': result.userPhone, //客户联系人电话
          'ordBak': result.ordBak,
          'iordBak': '',
          'billBak': '',
          'cpyTitle': '',
          'cpyTitleId': '',
          'saleId':originalValue.saleID,  //销售ID
          //               'saleId': 0, //佳俊 需求
          //               'saleName':'共享',
          'zhuliId': '', //
          'isTrueNum': 0, //确认单
          'linePlanPriceId': result.price_meal, //价格套餐
          'sourcesId': -1,
          //'mingdan': JSON.stringify(Wd.mingdanData),//Wb.encode(Wd.mingdanData),
          'mingdan': Wb.encode(result.mingdanData),
          "otherLinePlanOrdBills[0].theTitle": theTitle || '',
          "otherLinePlanOrdBills[0].thePrice": thePrice || 0,
          "otherLinePlanOrdBills[0].theNum": 1,
          "otherLinePlanOrdBills[0].costPrice": thePrice || 0,
          "otherLinePlanOrdBills[0].costAmount": thePrice || 0,
          "otherLinePlanOrdBills[0].billType": 3,
          'contractId_s': contract_id_o || '', //预留单不保存合同id和编号
          'contractNo_s': result.contract_no || '',
          'pointType': result.point_type,
          'pointRate': result.point_rate,
          'pointPrice': result.point_price,
          'amount': result.orderAmount, //市场金额
          'supAmount': result.supAmount, //结算金额
          'baoxianAmount': insurance_cost_total, //保险金额  result.baoxianAmount
          'insId': result.ins_id, //保险ID
          'admdeptid': parseInt('21', 0), //所属组织ID
          'otherLinePlanOrdBillsStr': JSON.stringify(otherLinePlanOrdBillsStr) //其他项目费用
        };
        var contract_num = result.contract_no;
        var insId_data = data.insId;
        var contractId_data = contract_id_o;
        //二次确认产品禁止报名
        var confirm_str = $('#confirm_type').text();
        if (confirm_str == '二次确认产品') {
          return layer.msg('二次确认产品不能报名哦', {
            shift: 6
          });
        }
        Wb.request({
          url: 'service/business/lineplanord/createOrd',
          params: data,
          showMask: false,
          headers: {
            "access-token": ""
          },
          success: function (j) {
            if (j.status == 200) {
              var result = Wb.decode(j.responseText);
              $('#order').css('background-color', "#169DF9");
              $('#order').removeAttr("disabled");
              if (result.success) {
                $.ajax({
                  type: "post",
                  url: "main?xwl=3460ODAVSF4L",
                  data: {
                    ordId: ordId,
                    contract_no: contract_num,
                    contract_id: contractId_data,
                    ins_id: insId_data
                  },
                  success: function (text) {
                    layer.closeAll('loading');
                    var data_contract = JSON.parse(text);
                    if (!data_contract.success) {
                      return layer.msg(data_contract.msg, {
                        shift: 6
                      });
                    }
                  }
                });
                window.location.href = "/sys/main?xwl=345VRFPQ7T7V&ordId=" + ordId + "&contract_id=" +
                  contractId_data + "&contract_no=" + contract_num + "&is_contract=" + is_contract + "" +
                  "&insId=" + insId_data;
              } else {
                layer.closeAll('loading');
                Wb.err(result.code);
              }
            } else {
              layer.closeAll('loading');
              layer.msg('报名失败', {
                shift: 6
              });
            }
          },
          failure: function () {
            layer.msg('数据请求失败', {
              shift: 6
            });
            layer.closeAll('loading');
            $('#order').css('background-color', "#169DF9");
            $('#order').removeAttr("disabled");
          }
        });
      }
    });
  }
  //}
  //占位
  function preOrder() {
    if (!orderVerify('preOrder')) {
      return;
    }
    var result = getOrderData();
    var arr_OrdBills_pre = [];
    var thePrice_pre = $('#thePrice').val();
    var theTitle_pre = $('#thePrice_reason').val();
    if (Wb.isEmpty(thePrice_pre)) {
      theTitle_pre = '';
    }
    if (thePrice_pre == '') {
      theTitle_pre = '';
      thePrice_pre = 0;
    }
    if (Wb.isEmpty(theTitle_pre)) {
      theTitle_pre = '';
    }
    var otherLinePlanOrdBillsStr = [];
    $("#other_amount_list .check_amount_child").each(function (i, ele) {
      var theTitle = $(ele).find(".fl").text() == "" ? "" : $(ele).find(".fl").text();
      var thePrice = $(ele).find(".price").text() == "" ? 0 : parseFloat($(ele).find(
        ".price").text());
      var theNum = $(ele).find(".number").text() == "" ? 0 : parseInt($(ele).find(
        ".number").text());
      otherLinePlanOrdBillsStr.push({
        theTitle: theTitle,
        thePrice: thePrice,
        theNum: theNum,
        billType: 14,
        costPrice:thePrice,
        costAmount:thePrice*theNum
      })
    })
    var data = {
      'planId': planID,
      'pub_fromcity_id': result.pub_fromcity_id, //联运城市城市ID
      'policyId': result.policyId, //联运政策ID
      'baseTransportCityId': result.transport_city_id, //联运城市ID
      'fromCityId': result.fromCityID, //起止城市ID
      'ordType': '', //订单；类型 - 表示后台分销下单。
      'userType': result.priceType, //价格类型
      'isTicket': originalValue.isTicket, //是否占位，后台提供  
      'saleScore': '',
      'saleSalary': '',
      'aduNum': result.aduNum,
      'aduNum1': result.aduNum1,
      'aduNum2': result.aduNum2,
      'chdNum': result.chdNum,
      'chdNum1': result.chdNum1,
      'cpyBaseId': originalValue.cpyBaseID, //客户ID
      'cpyId': originalValue.cpyID, //供应商ID
      'ctName': result.userName, //客户联系人名
      'ctInfo': result.userPhone, //客户联系人电话
      'ordBak': result.ordBak,
      'iordBak': '',
      'billBak': '',
      'cpyTitle': '',
      'cpyTitleId': '',
      'saleId': originalValue.saleID, //销售ID
      //         'saleId':0,
      //         'saleName':'共享',
      'zhuliId': '', //
      'isTrueNum': 0, //预留单
      'linePlanPriceId': result.price_meal, //价格套餐
      'sourcesId': -1,
      'mingdan': Wb.encode(result.mingdanData),
      "otherLinePlanOrdBills[0].theTitle": theTitle_pre || '',
      "otherLinePlanOrdBills[0].thePrice": thePrice_pre || 0,
      "otherLinePlanOrdBills[0].theNum": 1,
      "otherLinePlanOrdBills[0].costPrice": thePrice_pre || 0,
      "otherLinePlanOrdBills[0].costAmount": thePrice_pre || 0,
      "otherLinePlanOrdBills[0].billType": 3,
      'pointType': result.point_type,
      'pointRate': result.point_rate,
      'pointPrice': result.point_price,
      'amount': result.orderAmount, //市场金额
      'supAmount': result.supAmount, //结算金额
      'baoxianAmount': 0, //保险金额
      'admdeptid': parseInt('21', 0), //所属组织ID
      'otherLinePlanOrdBillsStr': JSON.stringify(otherLinePlanOrdBillsStr) //其他项目费用
    };
    Wb.request({
      url: 'service/business/lineplanord/createOrd',
      params: data,
      showMask: false,
      headers: {
        "access-token": ""
      },
      success: function (data) {
        if (data.status == 200) {
          var result = Wb.decode(data.responseText);
          $('#order').css('background-color', "#169DF9");
          $('#order').removeAttr("disabled");
          if (result.success) {
            layer.confirm('占位成功, 是否关闭当前下单页？', {
              title: '提示',
              closeBtn: 0,
              btn: ['是', '否，继续下单'],
            }, function (index, layero) {
              window.history.back(-1);
              window.close();
            }, function (index) {
              open(location, '_self');
            });
          } else {
            Wb.err(result.code);
          }
        } else {
          layer.msg('占位失败', {
            shift: 6
          });
        }
      },
      failure: function () {
        layer.msg('数据请求失败', {
          shift: 6
        });
        $('#order').css('background-color', "#169DF9");
        $('#order').removeAttr("disabled");
      }
    });
  }
  //增加电子合同后的报名公共请求部分
  function conmmon_req(erp, contract_Id, contract_No, thePrice, theTitle, contract_id_o) {
    $.ajax({
      type: "get",
      url: "main?xwl=3460ODAVLWC8",
      success: function (text) {
        var data_ordId = JSON.parse(text);
        if (!data_ordId.success) {
          return layer.msg('无效的身份信息。当前登陆不是门店账号！', {
            shift: 6
          });
        }
        var ordId = data_ordId.ordId;
        ordID = ordId;
        $.ajax({
          type: "post",
          url: "main?xwl=346RFRS4L5OT",
          data: {
            ordId: ordID,
            erp: erp,
            contractId: contract_Id,
            contractNo: contract_No
          },
          success: function (text) {
            var p = JSON.parse(text);
            var result = getOrderData();
            var otherLinePlanOrdBillsStr = [];
            $("#other_amount_list .check_amount_child").each(function (i, ele) {
              var theTitle = $(ele).find(".fl").text() == "" ? "" : $(ele).find(".fl").text();
              var thePrice = $(ele).find(".price").text() == "" ? 0 : parseFloat($(ele).find(
                ".price").text());
              var theNum = $(ele).find(".number").text() == "" ? 0 : parseInt($(ele).find(
                ".number").text());
              otherLinePlanOrdBillsStr.push({
                theTitle: theTitle,
                thePrice: thePrice,
                theNum: theNum,
                billType: 14,
                costPrice:thePrice,
                costAmount:thePrice*theNum
              })
            });
            var data = {
              'id': ordId,
              'planId': planID,
              'pub_fromcity_id': result.pub_fromcity_id, //联运城市城市ID
              'policyId': result.policyId, //联运政策ID
              'baseTransportCityId': result.transport_city_id, //联运城市ID
              'fromCityId': result.fromCityID, //起止城市ID
              'ordType': '', //订单；类型
              'userType': result.priceType, //价格类型
              'isTicket': originalValue.isTicket, //是否占位，后台提供  
              'saleScore': '',
              'saleSalary': '',
              'aduNum': result.aduNum,
              'aduNum1': result.aduNum1,
              'aduNum2': result.aduNum2,
              'chdNum': result.chdNum,
              'chdNum1': result.chdNum1,
              'cpyBaseId': originalValue.cpyBaseID, //客户ID
              'cpyId': originalValue.cpyID, //供应商ID
              'ctName': result.userName, //客户联系人名
              'ctInfo': result.userPhone, //客户联系人电话
              'ordBak': result.ordBak,
              'iordBak': '',
              'billBak': '',
              'cpyTitle': '',
              'cpyTitleId': '',
              'saleId': originalValue.saleID, //销售ID
              //                 'saleId':0,
              //                 'saleName':'共享',
              'zhuliId': '', //
              'isTrueNum': 0, //确认单
              'linePlanPriceId': result.price_meal, //价格套餐
              'sourcesId': -1,
              //'mingdan': JSON.stringify(Wd.mingdanData),//Wb.encode(Wd.mingdanData),
              'mingdan': Wb.encode(result.mingdanData),
              "otherLinePlanOrdBills[0].theTitle": theTitle,
              "otherLinePlanOrdBills[0].thePrice": thePrice || 0,
              "otherLinePlanOrdBills[0].theNum": 1,
              "otherLinePlanOrdBills[0].costPrice": thePrice || 0,
              "otherLinePlanOrdBills[0].costAmount": thePrice || 0,
              "otherLinePlanOrdBills[0].billType": 3,
              'contractId_s': contract_id_o || '', //预留单不保存合同id和编号
              'contractNo_s': result.contract_no || '',
              'pointType': result.point_type,
              'pointRate': result.point_rate,
              'pointPrice': result.point_price,
              'amount': result.orderAmount, //市场金额
              'supAmount': result.supAmount, //结算金额
              'baoxianAmount': insurance_cost_total, //保险金额  result.baoxianAmount
              'insId': result.ins_id, //保险ID
              'admdeptid': parseInt('21', 0), //所属组织ID
              'otherLinePlanOrdBillsStr': JSON.stringify(otherLinePlanOrdBillsStr) //其他项目费用
            };
            var contract_num = result.contract_no;
            var insId_data = data.insId;
            var contractId_data = contract_id_o;
            //二次确认产品禁止报名
            var confirm_str = $('#confirm_type').text();
            if (confirm_str == '二次确认产品') {
              return layer.msg('二次确认产品不能报名哦', {
                shift: 6
              });
            }
            Wb.request({
              url: 'service/business/lineplanord/createOrd',
              params: data,
              showMask: false,
              headers: {
                "access-token": ""
              },
              //                     headers: {
              //                       'Accept': 'application/json',
              //                       'Content-Type': 'application/json',
              //                       "access-token":""
              //                     },
              success: function (j) {
                if (j.status == 200) {
                  var result = Wb.decode(j.responseText);
                  $('#order').css('background-color', "#169DF9");
                  $('#order').removeAttr("disabled");
                  if (result.success) {
                    $.ajax({
                      type: "post",
                      url: "main?xwl=3460ODAVSF4L",
                      data: {
                        ordId: ordId,
                        contract_no: contract_num,
                        contract_id: contractId_data,
                        ins_id: insId_data
                      },
                      success: function (text) {
                        layer.closeAll('loading');
                        var data_contract = JSON.parse(text);
                        if (!data_contract.success) {
                          return layer.msg(data_contract.msg, {
                            shift: 6
                          });
                        }
                      }
                    });
                    //                               window.location.href="/sys/main?xwl=345VRFPQ7T7V&ordId="+ordId+"&contract_id="+contractId_data+"&contract_no="+contract_num+"";
                    setTimeout(function timer() {
                      window.location.href = "/sys/main?xwl=345VRFPQ7T7V&ordId=" + ordId +
                        "&contract_id=" + contractId_data + "&contract_no=" + contract_num +
                        "&is_contract=" + is_contract + "" + "&insId=" + insId_data;
                    }, 1000)
                    //                             window.open("/sys/main?xwl=345VRFPQ7T7V&ordId="+ordId+"&contract_id="+contractId_data+"&contract_no="+contract_num+"");
                  } else {
                    layer.closeAll('loading');
                    Wb.err(result.code);
                  }
                } else {
                  layer.closeAll('loading');
                  layer.msg('报名失败', {
                    shift: 6
                  });
                }
              },
              failure: function () {
                layer.msg('数据请求失败', {
                  shift: 6
                });
                layer.closeAll('loading');
                $('#order').css('background-color', "#169DF9");
                $('#order').removeAttr("disabled");
              }
            });
          }
        });
      }
    });
  }
  function orderVerify(orderType) {
    if (isEmpty(planID) || planID <= 0) {
      layer.msg('请先选择团期！', {
        shift: 6
      });
      return false;
    }
    if ('order' == orderType) {
      var insurance = $('#insurance').val();
      // 订单确认配置： 0合同必选 			1不受限制
      if ("1" == "0") {
        if ($('input:radio[name=contract]')[1].checked) { //选择电子合同
          //海中旅定制 
          if ('1' * 1 == 1 || '1' * 1 == 2102 || '1' * 1 == 1799) {
            if ($("#ele_contract_select").val() == "") {
              layer.msg('请选择电子合同！', {
                shift: 6
              });
              return false;
            }
          }
        }
        if ($('input:radio[name=contract]')[0].checked) { //选择纸质合同
          var contract = $('#contract').val();
          if (isEmpty(contract)) {
            layer.msg('请选择合同！', {
              shift: 6
            });
            return false;
          }
        }
      }
      // 订单确认配置： 0保险必选 			1不受限制
      if ("1" == "0") {
        if (isEmpty(insurance)) {
          layer.msg('请选择保险！', {
            shift: 6
          });
          return false;
        }
      }
    }
    //此处是否加入 去除左右空格判断?
    var userName = $('#userName').val();
    var userPhone = $('#userPhone').val();
    var ordBak = $('#ordBak').val();
    if (isEmpty(userName)) {
      layer.msg('请输入联系人姓名！', {
        shift: 6
      });
      return false;
    }
    if (isEmpty(userPhone)) {
      layer.msg('请输入联系人电话！', {
        shift: 6
      });
      return false;
    }
    //     if(isNaN(userPhone*1)==true){
    //       layer.msg('请检查联系人电话！',{shift:6});
    //       return false;
    //     }
    if (ordBak.length > 800) {
      layer.msg('备注说明不能超过800字哦！');
      return false;
    }
    var sum0, sum1, sum2, sum3, sum4;
    sum0 = parseInt($('#aduNum').val(), 10),
      sum1 = parseInt($('#aduNum1').val(), 10),
      sum2 = parseInt($('#aduNum2').val(), 10),
      sum3 = parseInt($('#chdNum').val(), 10),
      sum4 = parseInt($('#chdNum1').val(), 10);
    sum0 = isNaN(sum0) ? 0 : sum0;
    sum1 = isNaN(sum1) ? 0 : sum1;
    sum2 = isNaN(sum2) ? 0 : sum2;
    sum3 = isNaN(sum3) ? 0 : sum3;
    sum4 = isNaN(sum4) ? 0 : sum4;
    var sum = sum0 + sum1 + sum2 + sum3 + sum4;
    if (sum <= 0) {
      layer.msg('没有预订人数！', {
        shift: 6
      });
      return false;
    }
    var mingdanData = getMingdanData();
    if (sum != mingdanData.length) {
      layer.msg('预计人数和名单人数录入不致，请刷新页面重试！', {
        shift: 6
      });
      return false;
    }
    var thePrice = $('#thePrice').val();
    if (parseFloat(thePrice) < 0) {
      if (orderAmount + parseFloat(thePrice) < 0) {
        //         console.log(orderAmount+parseFloat(thePrice));
        layer.msg('所减费用不能超过总团费哦', {
          shift: 6
        });
        return false;
      }
    }
    var fin_price = parseFloat(orderAmount + parseFloat(thePrice) + insurance_cost_total);
    var order_price = parseFloat(ding_price);;
    if ((ding_price > 0) && (fin_price < order_price)) {
      layer.msg('结算费用不能小于定金金额', {
        shift: 6
      });
      return false;
    }
    if ('order' == orderType) {
      if (getEffecMingdanData().length <= 0) {
        layer.msg('必须先录入一个游客代表信息, 包含完整的姓名和证件号码！', {
          shift: 6
        });
        return false;
      }
      if ($('input:radio[name=contract]')[1].checked) { //选择电子合同
        if (conTract_cpy == 2) {
          for (var i = 0; i < getOrderData().mingdanData.length; i++) {
            if (getOrderData().mingdanData[i].cnName == '') {
              layer.msg('请填写第【' + (i + 1) + '】位游客的姓名', {
                shift: 6
              });
              return false;
            }
            if (getOrderData().mingdanData[i].IDType != "01") {
              if (getOrderData().mingdanData[i].passport == '') {
                layer.msg('请填写第【' + (i + 1) + '】位游客的证件号码', {
                  shift: 6
                });
                return false;
              }
            } else {
              if (getOrderData().mingdanData[i].IDCard == '') {
                layer.msg('请填写第【' + (i + 1) + '】位游客的证件号码', {
                  shift: 6
                });
                return false;
              }
            }
          }
        }
        if (conTract_cpy == 3) {
          for (var i = 0; i < getOrderData().mingdanData.length; i++) {
            if (getOrderData().mingdanData[i].cnName == '') {
              layer.msg('请填写第【' + (i + 1) + '】位游客的姓名', {
                shift: 6
              });
              return false;
            }
            if (getOrderData().mingdanData[i].IDType != "01") {
              if (getOrderData().mingdanData[i].passport == '') {
                layer.msg('请填写第【' + (i + 1) + '】位游客的证件号码', {
                  shift: 6
                });
                return false;
              }
            } else {
              if (getOrderData().mingdanData[i].IDCard == '') {
                layer.msg('请填写第【' + (i + 1) + '】位游客的证件号码', {
                  shift: 6
                });
                return false;
              }
            }
            if (getOrderData().mingdanData[i].birth == '') {
              layer.msg('请填写第【' + (i + 1) + '】位游客出生日期', {
                shift: 6
              });
              return false;
            }
          }
        }
      };
    }
    if (isNaN(thePrice) == true) {
      layer.msg("请输入数字", {
        shift: 6
      });
      //           $('#thePrice').val('');
      return false;
    }
    return true;
  }
  function getOrderData() {
    var data = {
      transport_city_id: $('#fromCity').val(),
      price_meal: $('#priceMeal').val(),
      priceType: priceType,
      aduNum: parseInt($('#aduNum').val() || "0", 10),
      aduNum1: parseInt($('#aduNum1').val() || "0", 10),
      aduNum2: parseInt($('#aduNum2').val() || "0", 10),
      chdNum: parseInt($('#chdNum').val() || "0", 10),
      chdNum1: parseInt($('#chdNum1').val() || "0", 10),
      contract_id: '',
      ins_id: $('#insurance').val(),
      userName: $('#userName').val(),
      userPhone: $('#userPhone').val(),
      ordBak: $('#ordBak').val(),
      point_type: point_type,
      point_rate: point_rate,
      point_price: point_price
    };
    //获取合同编号
    var contrac_Num = $('#contract').val();
    if (!isEmpty(contrac_Num)) {
      var desc_id = [];
      var obj = document.getElementById("contract");
      for (var i = 0; i < obj.options.length; i++) {
        if (obj.options[i].selected) {
          desc_id.push(obj.options[i].dataset.contractno); // 收集选中项
        }
      }
      var contract_num_cao = desc_id.join(',');
    }
    var cityRecord = findRecord(fromCityDatas, 'transport_city_id', data.transport_city_id); //查询出发城市选中的记录
    data.pub_fromcity_id = cityRecord.pub_fromcity_id; //出发城市的城市ID
    data.fromCityID = cityRecord.fromCityID; //起止城市ID
    data.policyId = cityRecord.policy_id; //联运政策ID
    //     if(!isEmpty(data.contract_id)){
    //       data.contract_no = findRecord(contractDatas, 'id', data.contract_id).contract_no;
    data.contract_no = contract_num_cao || '';
    //     }else{
    //       data.contract_id = 0;
    //     }
    data.mingdanData = getMingdanData();
    data.baoxianAmount = 0;
    if (!Wb.isEmpty(data.ins_id)) {
      var sale_price = findRecord(insuranceDatas, 'id', data.ins_id).sale_price;
      var mingdanCount = data.aduNum + data.aduNum1 + data.aduNum2 + data.chdNum + data.chdNum2;
      data.baoxianAmount = sale_price * mingdanCount; //保险金额 = 选择的保险成本 * 人数；
    } else {
      data.ins_id = 0;
    }
    data.orderAmount = orderAmount;
    data.supAmount = getSupAmount(data.price_meal);
    return data;
  }
  function getSupAmount(mealId) {
    var record = findRecord(priceMealDatas, 'ID', mealId);
    if (record) {
      mealPrice = [record.adultPrice + sale_price, record.adultPrice1 + sale_price, record.adultPrice2 + sale_price,
                   record.childPrice + sale_price, record.childPrice1 + sale_price
                  ];
    }
    var sum0, sum1, sum2, sum3, sum4;
    sum0 = parseInt($('#aduNum').val(), 10),
      sum1 = parseInt($('#aduNum1').val(), 10),
      sum2 = parseInt($('#aduNum2').val(), 10),
      sum3 = parseInt($('#chdNum').val(), 10),
      sum4 = parseInt($('#chdNum1').val(), 10);
    var sum0Price = isNaN(sum0) ? 0 : sum0 * mealPrice[0],
        sum1Price = isNaN(sum1) ? 0 : sum1 * mealPrice[1],
        sum2Price = isNaN(sum2) ? 0 : sum2 * mealPrice[2],
        sum3Price = isNaN(sum3) ? 0 : sum3 * mealPrice[3],
        sum4Price = isNaN(sum4) ? 0 : sum4 * mealPrice[4];
    var supOtherBillAmount = otherBillPrice * 1 * ((isNaN(sum0) ? 0 : sum0) + (isNaN(sum1) ? 0 : sum1) + (isNaN(sum2) ?
                                                                                                          0 : sum2) + (isNaN(sum3) ? 0 : sum3) + (isNaN(sum4) ? 0 : sum4));
    var supOrderAmount = sum0Price + sum1Price + sum2Price + sum3Price + sum4Price + supOtherBillAmount;
    return supOrderAmount;
  }
  //   function showLoding(){
  //     $('#maskDiv').show();
  //     $('#progressBar').show();
  //   }
  //   function hideLoding(){
  //     $('#maskDiv').hide();
  //     $('#progressBar').hide();
  //   }
  //查看费用明细
  function checkAmount() {
    $('#check_amount').hover(function () {
      $('.check_amount_box').show();
    }, function () {
      $('.check_amount_box').hide();
    });
  }
  checkAmount();
  //返回顶部图标显隐
  $(function () {
    //     $('#to_top_icon').hide(); 
    $(function () {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
          $('#to_top_icon').fadeIn(500);
        } else {
          $('#to_top_icon').fadeOut(100);
        }
      });
      $('#to_top_icon').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 300);
      })
    })
  })
  function stopDefault(e) {
    //非IE
    if (e && e.preventDefault)
      e.preventDefault();
    //IE
    else
      window.event.returnValue = false;
  }
  //   function showLoding(){
  //      $('#maskDiv').show();
  //    	 $('#progressBar').show();
  //   }
  //   function hideLoding(){
  //      $('#maskDiv').hide();
  //    	 $('#progressBar').hide();
  //   }
  /*
   * 验证身份证
   * params: sId 	身份证
   * result: json 	false-msg,true-data(json)
   */
  function isCardID(sId) {
    var aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    var iSum = 0;
    var info = "";
    //     var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    //     console.log(sId);
    var reg = /^[0-9]{17}[0-9xX]{1}$/;
    //     var reg =/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;  //18位验证
    //     if(!/^\d{17}(\d|[xX])$/i.test(sId)){ 
    //       layer.msg("身份证长度或格式错误",{shift:6}); 
    //       return false;
    //     }
    if (reg.test(sId) == false) {
      layer.msg("身份证长度或格式错误", {
        shift: 6
      });
      return false;
    }
    sId = sId.replace(/x$/i, "a");
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
      //       console.log(sBirthday);
      //       console.log(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
      layer.msg("身份证上的出生日期非法", {
        shift: 6
      });
      return false;
    }
    for (var i = 17; i >= 0; i--) {
      iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    }
    if (iSum % 11 != 1) {
      layer.msg("身份证号非法", {
        shift: 6
      });
      return false;
    }
    return sId;
  }
  /*
   * 获取省市
   * params: sId 	身份证
   * result: json 	false-msg,true-data(json)
   */
  function getArea(sId) {
    sId = "" + sId;
    var isCardIDRs = isCardID(sId);
    if (!isCardIDRs) {
      return isCardIDRs;
    }
    var areaJson = [{
      '11': '北京市',
      '1101': '北京市市辖区',
      '110101': '北京市东城区',
      '110102': '北京市西城区',
      '110103': '北京市崇文区',
      '110104': '北京市宣武区',
      '110105': '北京市朝阳区',
      '110106': '北京市丰台区',
      '110107': '北京市石景山区',
      '110108': '北京市海淀区',
      '110109': '北京市门头沟区',
      '110111': '北京市房山区',
      '1102': '北京市市辖县',
      '110221': '北京市昌平县',
      '110222': '北京市顺义县',
      '110223': '北京市通县',
      '110224': '北京市大兴县',
      '110226': '北京市平谷县',
      '110227': '北京市怀柔县',
      '110228': '北京市密云县',
      '110229': '北京市延庆县'
      ,
      '12': '天津市',
      '1201': '天津市市辖区',
      '120101': '天津市和平区',
      '120102': '天津市河东区',
      '120103': '天津市河西区',
      '120104': '天津市南开区',
      '120105': '天津市河北区',
      '120106': '天津市红桥区',
      '120107': '天津市塘沽区',
      '120108': '天津市汉沽区',
      '120109': '天津市大港区',
      '120110': '天津市东丽区',
      '120111': '天津市西青区',
      '120112': '天津市津南区',
      '120113': '天津市北辰区',
      '1202': '天津市市辖县',
      '120221': '天津市宁河县',
      '120222': '天津市武清县',
      '120223': '天津市静海县',
      '120224': '天津市宝坻县',
      '120225': '天津市蓟县'
      ,
      '13': '河北省',
      '1301': '河北省石家庄市',
      '130101': '河北省石家庄市市辖区',
      '130102': '河北省石家庄市长安区',
      '130103': '河北省石家庄市桥东区',
      '130104': '河北省石家庄市桥西区',
      '130105': '河北省石家庄市新华区',
      '130106': '河北省石家庄市郊区',
      '130107': '河北省石家庄市井陉矿区',
      '130121': '河北省井陉县',
      '130122': '河北省获鹿县',
      '130123': '河北省正定县',
      '130124': '河北省栾城县',
      '130125': '河北省行唐县',
      '130126': '河北省灵寿县',
      '130127': '河北省高邑县',
      '130128': '河北省深泽县',
      '130129': '河北省赞皇县',
      '130130': '河北省无极县',
      '130131': '河北省平山县',
      '130132': '河北省元氏县',
      '130133': '河北省赵县',
      '130181': '河北省辛集市',
      '130182': '河北省藁城市',
      '130183': '河北省晋州市',
      '130184': '河北省新乐市',
      '1302': '河北省唐山市',
      '130201': '河北省唐山市市辖区',
      '130202': '河北省唐山市路南区',
      '130203': '河北省唐山市路北区',
      '130204': '河北省唐山市东矿区',
      '130205': '河北省唐山市开平区',
      '130206': '河北省唐山市新区',
      '130221': '河北省丰润县',
      '130222': '河北省丰南县',
      '130223': '河北省滦县',
      '130224': '河北省滦南县',
      '130225': '河北省乐亭县',
      '130226': '河北省迁安县',
      '130227': '河北省迁西县',
      '130229': '河北省玉田县',
      '130230': '河北省唐海县',
      '130281': '河北省遵化市',
      '1303': '河北省秦皇岛市',
      '130301': '河北省秦皇岛市市辖区',
      '130302': '河北省秦皇岛市海港区',
      '130303': '河北省秦皇岛市山海关区',
      '130304': '河北省秦皇岛市北戴河区',
      '130321': '河北省青龙满族自治县',
      '130322': '河北省昌黎县',
      '130323': '河北省抚宁县',
      '130324': '河北省卢龙县',
      '1304': '河北省邯郸市',
      '130401': '河北省邯郸市市辖区',
      '130402': '河北省邯郸市邯山区',
      '130403': '河北省邯郸市丛台区',
      '130404': '河北省邯郸市复兴区',
      '130406': '河北省邯郸市峰峰矿区',
      '130421': '河北省邯郸县',
      '130423': '河北省临漳县',
      '130424': '河北省成安县',
      '130425': '河北省大名县',
      '130426': '河北省涉县',
      '130427': '河北省磁县',
      '130428': '河北省肥乡县',
      '130429': '河北省永年县',
      '130430': '河北省丘县',
      '130431': '河北省鸡泽县',
      '130432': '河北省广平县',
      '130433': '河北省馆陶县',
      '130434': '河北省魏县',
      '130435': '河北省曲周县',
      '130481': '河北省武安市',
      '1305': '河北省邢台市',
      '130501': '河北省邢台市市辖区',
      '130502': '河北省邢台市桥东区',
      '130503': '河北省邢台市桥西区',
      '130521': '河北省邢台县',
      '130522': '河北省临城县',
      '130523': '河北省内丘县',
      '130524': '河北省柏乡县',
      '130525': '河北省隆尧县',
      '130526': '河北省任县',
      '130527': '河北省南和县',
      '130528': '河北省宁晋县',
      '130529': '河北省巨鹿县',
      '130530': '河北省新河县',
      '130531': '河北省广宗县',
      '130532': '河北省平乡县',
      '130533': '河北省威县',
      '130534': '河北省清河县',
      '130535': '河北省临西县',
      '130581': '河北省南宫市',
      '130582': '河北省沙河市',
      '1306': '河北省保定市',
      '130601': '河北省保定市市辖区',
      '130602': '河北省保定市新市区',
      '130603': '河北省保定市北市区',
      '130604': '河北省保定市南市区',
      '130621': '河北省满城县',
      '130622': '河北省清苑县',
      '1307': '河北省张家口市',
      '130701': '河北省张家口市市辖区',
      '130702': '河北省张家口市桥东区',
      '130703': '河北省张家口市桥西区',
      '130705': '河北省张家口市宣化区',
      '130706': '河北省张家口市下花园区',
      '130721': '河北省宣化县',
      '130722': '河北省张北县',
      '130723': '河北省康保县',
      '130724': '河北省沽源县',
      '130725': '河北省尚义县',
      '130726': '河北省蔚县',
      '130727': '河北省阳原县',
      '130728': '河北省怀安县',
      '130729': '河北省万全县',
      '130730': '河北省怀来县',
      '130731': '河北省涿鹿县',
      '130732': '河北省赤城县',
      '130733': '河北省崇礼县',
      '1308': '河北省承德市',
      '130801': '河北省承德市市辖区',
      '130802': '河北省承德市双桥区',
      '130803': '河北省承德市双滦区',
      '130804': '河北省承德市鹰手营子矿区',
      '130821': '河北省承德县',
      '130822': '河北省兴隆县',
      '130823': '河北省平泉县',
      '130824': '河北省滦平县',
      '130825': '河北省隆化县',
      '130826': '河北省丰宁满族自治县',
      '130827': '河北省宽城满族自治县',
      '130828': '河北省围场满族蒙古族自治县',
      '1309': '河北省沧洲市',
      '130901': '河北省沧洲市市辖区',
      '130902': '河北省沧洲市新华区',
      '130903': '河北省沧洲市运河区',
      '130904': '河北省沧洲市郊区',
      '130921': '河北省沧县',
      '130922': '河北省青县',
      '130923': '河北省东光县',
      '130924': '河北省海兴县',
      '130925': '河北省盐山县',
      '130926': '河北省肃宁县',
      '130927': '河北省南皮县',
      '130928': '河北省吴桥县',
      '130929': '河北省献县',
      '130930': '河北省孟村回族自治县',
      '130981': '河北省泊头市',
      '130982': '河北省任丘市',
      '130983': '河北省黄骅市',
      '130984': '河北省河间市',
      '1310': '河北省廊坊市',
      '131001': '河北省廊坊市市辖区',
      '131002': '河北省廊坊市安次区',
      '131022': '河北省固安县',
      '131023': '河北省永清县',
      '131024': '河北省香河县',
      '131025': '河北省大城县',
      '131026': '河北省文安县',
      '131028': '河北省大厂回族自治县',
      '131081': '河北省霸州市',
      '131082': '河北省三河市',
      '1324': '河北省保定地区',
      '132401': '河北省定州市',
      '132402': '河北省涿州市',
      '132403': '河北省安国市',
      '132404': '河北省高碑店市',
      '132421': '河北省易县',
      '132423': '河北省徐水县',
      '132424': '河北省涞源县',
      '132425': '河北省定兴县',
      '132426': '河北省顺平县',
      '132427': '河北省唐县',
      '132428': '河北省望都县',
      '132429': '河北省涞水县',
      '132432': '河北省高阳县',
      '132433': '河北省安新县',
      '132434': '河北省雄县',
      '132435': '河北省容城县',
      '132437': '河北省曲阳县',
      '132438': '河北省阜平县',
      '132441': '河北省博野县',
      '132442': '河北省蠡县',
      '1330': '河北省衡水地区',
      '133001': '河北省衡水市',
      '133002': '河北省冀州县',
      '133023': '河北省枣强县',
      '133024': '河北省武邑县',
      '133025': '河北省深县',
      '133026': '河北省武强县',
      '133027': '河北省饶阳县',
      '133028': '河北省安平县',
      '133029': '河北省故城县',
      '133030': '河北省景县',
      '133031': '河北省阜城县'
      ,
      '14': '山西省',
      '1401': '山西省太原市',
      '140101': '山西省太原市市辖区',
      '140102': '山西省太原市南城区',
      '140103': '山西省太原市北城区',
      '140104': '山西省太原市河西区',
      '140112': '山西省太原市南郊区',
      '140113': '山西省太原市北郊区',
      '140121': '山西省清徐县',
      '140122': '山西省阳曲县',
      '140123': '山西省娄烦县',
      '140181': '山西省古交市',
      '1402': '山西省大同市',
      '140201': '山西省大同市市辖区',
      '140202': '山西省大同市城区',
      '140203': '山西省大同市矿区',
      '140211': '山西省大同市南郊区',
      '140212': '山西省大同市新荣区',
      '140221': '山西省阳高县',
      '140222': '山西省天镇县',
      '140223': '山西省广灵县',
      '140224': '山西省灵丘县',
      '140225': '山西省浑源县',
      '140226': '山西省左云县',
      '140227': '山西省大同县',
      '1403': '山西省阳泉市',
      '140301': '山西省阳泉市市辖区',
      '140302': '山西省阳泉市城区',
      '140303': '山西省阳泉市矿区',
      '140311': '山西省阳泉市郊区',
      '140321': '山西省平定县',
      '140322': '山西省盂县',
      '1404': '山西省长治市',
      '140401': '山西省长治市市辖区',
      '140402': '山西省长治市城区',
      '140411': '山西省长治市郊区',
      '140421': '山西省长治县',
      '140422': '山西省潞城县',
      '140423': '山西省襄垣县',
      '140424': '山西省屯留县',
      '140425': '山西省平顺县',
      '140426': '山西省黎城县',
      '140427': '山西省壶关县',
      '140428': '山西省长子县',
      '140429': '山西省武乡县',
      '140430': '山西省沁县',
      '140431': '山西省沁源县',
      '1405': '山西省晋城市',
      '140501': '山西省晋城市市辖区',
      '140502': '山西省晋城市城区',
      '140511': '山西省晋城市郊区',
      '140521': '山西省沁水县',
      '140522': '山西省阳城县',
      '140524': '山西省陵川县',
      '140581': '山西省高平市',
      '1406': '山西省朔州市',
      '140601': '山西省朔州市市辖区',
      '140602': '山西省朔州市朔城区',
      '140603': '山西省朔州市平鲁区',
      '140621': '山西省山阴县',
      '140622': '山西省应县',
      '140623': '山西省右玉县',
      '140624': '山西省怀仁县',
      '1422': '山西省忻洲地区',
      '142201': '山西省忻州市',
      '142202': '山西省原平县',
      '142222': '山西省定襄县',
      '142223': '山西省五台县',
      '142225': '山西省代县',
      '142226': '山西省繁峙县',
      '142227': '山西省宁武县',
      '142228': '山西省静乐县',
      '142229': '山西省神池县',
      '142230': '山西省五寨县',
      '142231': '山西省苛岚县',
      '142232': '山西省河曲县',
      '142233': '山西省保德县',
      '142234': '山西省偏关县',
      '1423': '山西省吕梁地区',
      '142301': '山西省孝义市',
      '142321': '山西省汾阳县',
      '142322': '山西省文水县',
      '142323': '山西省交城县',
      '142325': '山西省兴县',
      '142326': '山西省临县',
      '142327': '山西省柳林县',
      '142328': '山西省石楼县',
      '142329': '山西省岚县',
      '142330': '山西省方山县',
      '142331': '山西省离石县',
      '142332': '山西省中阳县',
      '142333': '山西省交口县',
      '1424': '山西省晋中地区',
      '142401': '山西省榆次市',
      '142402': '山西省介休市',
      '142421': '山西省榆社县',
      '142422': '山西省左权县',
      '142423': '山西省和顺县',
      '142424': '山西省昔阳县',
      '142427': '山西省寿阳县',
      '142429': '山西省太谷县',
      '142430': '山西省祁县',
      '142431': '山西省平遥县',
      '142433': '山西省灵石县',
      '1426': '山西省临汾地区',
      '142601': '山西省临汾市',
      '142602': '山西省侯马市',
      '142603': '山西省霍州市',
      '142621': '山西省曲沃县',
      '142622': '山西省翼城县',
      '142623': '山西省襄汾县',
      '142625': '山西省洪洞县',
      '142627': '山西省古县',
      '142628': '山西省安泽县',
      '142629': '山西省浮山县',
      '142630': '山西省吉县',
      '142631': '山西省乡宁县',
      '142632': '山西省蒲县',
      '142633': '山西省大宁县',
      '142634': '山西省永和县',
      '142635': '山西省隰县',
      '142636': '山西省汾西县',
      '1427': '山西省运城地区',
      '142701': '山西省运城市',
      '142722': '山西省永济县',
      '142723': '山西省芮城县',
      '142724': '山西省临猗县',
      '142725': '山西省万荣县',
      '142726': '山西省新绛县',
      '142727': '山西省稷山县',
      '142728': '山西省河津县',
      '142729': '山西省闻喜县',
      '142730': '山西省夏县',
      '142731': '山西省绛县',
      '142732': '山西省平陆县',
      '142733': '山西省垣曲县'
      ,
      '15': '内蒙古',
      '1501': '内蒙古呼和浩特市',
      '150101': '内蒙古呼和浩特市市辖区',
      '150102': '内蒙古呼和浩特市新城区',
      '150103': '内蒙古呼和浩特市回民区',
      '150104': '内蒙古呼和浩特市玉泉区',
      '150105': '内蒙古呼和浩特市郊区',
      '150121': '内蒙古土默特左旗',
      '150122': '内蒙古托克托县',
      '1502': '内蒙古包头市',
      '150201': '内蒙古包头市市辖区',
      '150202': '内蒙古包头市东河区',
      '150203': '内蒙古包头市昆都伦区',
      '150204': '内蒙古包头市青山区',
      '150205': '内蒙古包头市石拐矿区',
      '150206': '内蒙古包头市白云矿区',
      '150207': '内蒙古包头市郊区',
      '150221': '内蒙古土默特右旗',
      '150222': '内蒙古固阳县',
      '1503': '内蒙古乌海市',
      '150301': '内蒙古乌海市市辖区',
      '150302': '内蒙古乌海市海勃湾区',
      '150303': '内蒙古乌海市海南区',
      '150304': '内蒙古乌海市乌达区',
      '1504': '内蒙古赤峰市',
      '150401': '内蒙古赤峰市市辖区',
      '150402': '内蒙古赤峰市红山区',
      '150403': '内蒙古赤峰市元宝山区',
      '150404': '内蒙古赤峰市松山区',
      '150421': '内蒙古阿鲁科尔沁旗',
      '150422': '内蒙古巴林左旗',
      '150423': '内蒙古巴林右旗',
      '150424': '内蒙古林西县',
      '150425': '内蒙古克什克腾旗',
      '150426': '内蒙古翁牛特旗',
      '150428': '内蒙古喀喇沁旗',
      '150429': '内蒙古宁城县',
      '150430': '内蒙古敖汉旗',
      '1521': '内蒙古呼伦贝尔盟',
      '152101': '内蒙古海拉尔市',
      '152102': '内蒙古满洲里市',
      '152103': '内蒙古扎兰屯市',
      '152104': '内蒙古牙克石市',
      '152122': '内蒙古阿荣旗',
      '152123': '内蒙古莫力达瓦达翰尔族自治旗',
      '152125': '内蒙古额尔古纳右旗',
      '152126': '内蒙古额尔古纳左旗',
      '152127': '内蒙古鄂伦春自治旗',
      '152128': '内蒙古鄂温克族自治旗',
      '152129': '内蒙古新巴尔虎右旗',
      '152130': '内蒙古新巴尔虎左旗',
      '152131': '内蒙古陈巴尔虎旗',
      '1522': '内蒙古兴安盟',
      '152201': '内蒙古乌兰浩特市',
      '152221': '内蒙古科尔沁右翼前旗',
      '152222': '内蒙古科尔沁右翼中旗',
      '152223': '内蒙古扎赍特旗',
      '152224': '内蒙古突泉县',
      '1523': '内蒙古哲里木盟',
      '152301': '内蒙古通辽市',
      '152302': '内蒙古霍林郭勒市',
      '152322': '内蒙古科尔沁左翼中旗',
      '152323': '内蒙古科尔沁左翼后旗',
      '152324': '内蒙古开鲁县',
      '152325': '内蒙古库伦旗',
      '152326': '内蒙古奈曼旗　',
      '152327': '内蒙古扎鲁特旗',
      '1525': '内蒙古锡林郭勒盟',
      '152501': '内蒙古二连浩特市',
      '152502': '内蒙古锡林浩特市',
      '152522': '内蒙古阿巴嘎旗',
      '152523': '内蒙古苏尼特左旗',
      '152524': '内蒙古苏尼特右旗',
      '152525': '内蒙古东乌珠穆沁旗',
      '152526': '内蒙古西乌珠穆沁旗',
      '152527': '内蒙古太仆寺旗',
      '152528': '内蒙古镶黄旗',
      '152529': '内蒙古正镶白旗',
      '152530': '内蒙古正蓝旗',
      '152531': '内蒙古多伦县',
      '1526': '内蒙古乌兰察布盟',
      '152601': '内蒙古集宁市',
      '152602': '内蒙古丰镇市',
      '152621': '内蒙古武川县',
      '152622': '内蒙古和林格尔县',
      '152623': '内蒙古清水河县',
      '152624': '内蒙古卓资县',
      '152625': '内蒙古化德县',
      '152626': '内蒙古商都县',
      '152627': '内蒙古兴和县',
      '152629': '内蒙古凉城县',
      '152630': '内蒙古察哈尔右翼前旗',
      '152631': '内蒙古察哈尔右翼中旗',
      '152632': '内蒙古察哈尔右翼后旗',
      '152633': '内蒙古达尔罕茂明安联合旗',
      '152634': '内蒙古四子王旗',
      '1527': '内蒙古伊克昭盟',
      '152701': '内蒙古东胜市',
      '152722': '内蒙古达拉特旗',
      '152723': '内蒙古准格尔旗',
      '152724': '内蒙古鄂托克前旗',
      '152725': '内蒙古鄂托克旗',
      '152726': '内蒙古杭锦旗　',
      '152727': '内蒙古乌审旗',
      '152728': '内蒙古伊金霍洛旗',
      '1528': '内蒙古巴彦淖尔盟',
      '152801': '内蒙古临河市',
      '152822': '内蒙古五原县',
      '152823': '内蒙古磴口县',
      '152824': '内蒙古乌拉特前旗',
      '152825': '内蒙古乌拉特中旗',
      '152826': '内蒙古乌拉特后旗',
      '152827': '内蒙古杭锦后旗',
      '1529': '内蒙古阿拉善盟',
      '152921': '内蒙古阿拉善左旗',
      '152922': '内蒙古阿拉善右旗',
      '152923': '内蒙古额济纳旗'
      ,
      '21': '辽宁省',
      '2101': '辽宁省沈阳市',
      '210101': '辽宁省沈阳市市辖区',
      '210102': '辽宁省沈阳市和平区',
      '210103': '辽宁省沈阳市沈河区',
      '210104': '辽宁省沈阳市大东区',
      '210105': '辽宁省沈阳市皇姑区',
      '210106': '辽宁省沈阳市铁西区',
      '210111': '辽宁省沈阳市苏家屯区',
      '210112': '辽宁省沈阳市东陵区',
      '210113': '辽宁省沈阳市新城子区',
      '210114': '辽宁省沈阳市于洪区',
      '210122': '辽宁省辽中县',
      '210123': '辽宁省康平县',
      '210124': '辽宁省法库县',
      '210181': '辽宁省新民市',
      '2102': '辽宁省大连市',
      '210201': '辽宁省大连市市辖区',
      '210202': '辽宁省大连市中山区',
      '210203': '辽宁省大连市西岗区',
      '210204': '辽宁省大连市沙河口区',
      '210211': '辽宁省大连市甘井子区',
      '210212': '辽宁省大连市旅顺口区',
      '210213': '辽宁省大连市金州区',
      '210224': '辽宁省长海县',
      '210281': '辽宁省瓦房店市',
      '210282': '辽宁省普兰店市',
      '210283': '辽宁省庄河市',
      '2103': '辽宁省鞍山市',
      '210301': '辽宁省鞍山市市辖区',
      '210302': '辽宁省鞍山市铁东区',
      '210303': '辽宁省鞍山市铁西区',
      '210304': '辽宁省鞍山市立山区',
      '210311': '辽宁省鞍山市旧堡区',
      '210321': '辽宁省台安县',
      '210323': '辽宁省岫岩满族自治县',
      '210381': '辽宁省海城市',
      '2104': '辽宁省抚顺市',
      '210401': '辽宁省抚顺市市辖区',
      '210402': '辽宁省抚顺市新抚区',
      '210403': '辽宁省抚顺市露天区',
      '210404': '辽宁省抚顺市望花区',
      '210411': '辽宁省抚顺市顺城区',
      '210421': '辽宁省抚顺县',
      '210422': '辽宁省新宾满族自治县',
      '210423': '辽宁省清原满族自治县',
      '2105': '辽宁省本溪市',
      '210501': '辽宁省本溪市市辖区',
      '210502': '辽宁省本溪市平山区',
      '210503': '辽宁省本溪市溪湖区',
      '210504': '辽宁省本溪市明山区',
      '210511': '辽宁省本溪市南芬区',
      '210521': '辽宁省本溪满族自治县',
      '210522': '辽宁省桓仁满族自治县',
      '2106': '辽宁省丹东市',
      '210601': '辽宁省丹东市市辖区',
      '210602': '辽宁省丹东市元宝区',
      '210603': '辽宁省丹东市振兴区',
      '210604': '辽宁省丹东市振安区',
      '210621': '辽宁省凤城满族自治县',
      '210624': '辽宁省宽甸满族自治县',
      '210681': '辽宁省东港市',
      '2107': '辽宁省锦州市',
      '210701': '辽宁省锦州市市辖区',
      '210702': '辽宁省锦州市古塔区',
      '210703': '辽宁省锦州市凌河区',
      '210711': '辽宁省锦州市太和区',
      '210725': '辽宁省北镇满族自治县',
      '210726': '辽宁省黑山县',
      '210727': '辽宁省义县',
      '210781': '辽宁省凌海市',
      '2108': '辽宁省营口市',
      '210801': '辽宁省营口市市辖区',
      '210802': '辽宁省营口市站前区',
      '210803': '辽宁省营口市西市区',
      '210804': '辽宁省营口市鲅鱼圈区',
      '210811': '辽宁省营口市老边区',
      '210881': '辽宁省盖州市',
      '210882': '辽宁省大石桥市',
      '2109': '辽宁省阜新市',
      '210901': '辽宁省阜新市市辖区',
      '210902': '辽宁省阜新市海洲区',
      '210903': '辽宁省阜新市新邱区',
      '210904': '辽宁省阜新市太平区',
      '210905': '辽宁省阜新市清河门区',
      '210911': '辽宁省阜新市细河区',
      '210921': '辽宁省阜新蒙古族自治县',
      '210922': '辽宁省彰武县',
      '2110': '辽宁省辽阳市',
      '211001': '辽宁省辽阳市市辖区',
      '211002': '辽宁省辽阳市白塔区',
      '211003': '辽宁省辽阳市文圣区',
      '211004': '辽宁省辽阳市宏伟区',
      '211005': '辽宁省辽阳市弓长岭区',
      '211011': '辽宁省辽阳市太子河区',
      '211021': '辽宁省辽阳县',
      '211022': '辽宁省灯塔县',
      '2111': '辽宁省盘锦市',
      '211101': '辽宁省盘锦市市辖区',
      '211102': '辽宁省盘锦市双台子区',
      '211103': '辽宁省盘锦市兴隆台区',
      '211121': '辽宁省大洼县',
      '211122': '辽宁省盘山县',
      '2112': '辽宁省铁岭市',
      '211201': '辽宁省铁岭市市辖区',
      '211202': '辽宁省铁岭市银州区',
      '211204': '辽宁省铁岭市清河区',
      '211221': '辽宁省铁岭县',
      '211223': '辽宁省西丰县',
      '211224': '辽宁省昌图县',
      '211281': '辽宁省铁法市',
      '211282': '辽宁省开原市',
      '2113': '辽宁省朝阳市',
      '211301': '辽宁省朝阳市市辖区',
      '211302': '辽宁省朝阳市双塔区',
      '211303': '辽宁省朝阳市龙城区',
      '211321': '辽宁省朝阳县',
      '211322': '辽宁省建平县',
      '211324': '辽宁省喀喇沁左翼蒙古族自治县',
      '211381': '辽宁省北票市',
      '211382': '辽宁省凌源市',
      '2114': '辽宁省锦西市',
      '211401': '辽宁省锦西市市辖区',
      '211402': '辽宁省锦西市连山区',
      '211403': '辽宁省锦西市葫芦岛区',
      '211404': '辽宁省锦西市南票区',
      '211421': '辽宁省绥中县',
      '211422': '辽宁省建昌县',
      '211481': '辽宁省兴城市'
      ,
      '22': '吉林省',
      '2201': '吉林省长春市',
      '220101': '吉林省长春市市辖区',
      '220102': '吉林省长春市南关区',
      '220103': '吉林省长春市宽城区',
      '220104': '吉林省长春市朝阳区',
      '220105': '吉林省长春市二道河子区',
      '220111': '吉林省长春市郊区',
      '220122': '吉林省农安县',
      '220124': '吉林省德惠县',
      '220125': '吉林省双阳县',
      '220181': '吉林省九台市',
      '220182': '吉林省榆树市',
      '2202': '吉林省吉林市',
      '220201': '吉林省吉林市市辖区',
      '220202': '吉林省吉林市昌邑区',
      '220203': '吉林省吉林市龙潭区',
      '220204': '吉林省吉林市船营区',
      '220211': '吉林省吉林市丰满区',
      '220221': '吉林省永吉县',
      '220223': '吉林省磐石县',
      '220281': '吉林省蛟河市',
      '220282': '吉林省桦甸市',
      '220283': '吉林省舒兰市',
      '2203': '吉林省四平市',
      '220301': '吉林省四平市市辖区',
      '220302': '吉林省四平市铁西区',
      '220303': '吉林省四平市铁东区',
      '220322': '吉林省梨树县',
      '220323': '吉林省伊通满族自治县',
      '220324': '吉林省双辽县',
      '220381': '吉林省公主岭市',
      '2204': '吉林省辽源市',
      '220401': '吉林省辽源市市辖区',
      '220402': '吉林省辽源市龙山区',
      '220403': '吉林省辽源市西安区',
      '220421': '吉林省东丰县',
      '220422': '吉林省东辽县',
      '2205': '吉林省通化市',
      '220501': '吉林省通化市市辖区',
      '220502': '吉林省通化市东昌区',
      '220503': '吉林省通化市二道江区',
      '220521': '吉林省通化县',
      '220523': '吉林省辉南县',
      '220524': '吉林省柳河县',
      '220581': '吉林省梅河口市',
      '220582': '吉林省集安市',
      '2206': '吉林省浑江市',
      '220601': '吉林省浑江市市辖区',
      '220602': '吉林省浑江市八道江区',
      '220603': '吉林省浑江市三岔子区',
      '220621': '吉林省抚松县',
      '220622': '吉林省靖宇县',
      '220623': '吉林省长白朝鲜族自治县',
      '220681': '吉林省临江市',
      '2207': '吉林省松原市',
      '220701': '吉林省松原市市辖区',
      '220702': '吉林省松原市扶余区',
      '220721': '吉林省前郭尔罗斯蒙古族自治县',
      '220722': '吉林省长岭县',
      '220723': '吉林省乾安县',
      '2208': '吉林省白城市',
      '220801': '吉林省白城市市辖区',
      '220802': '吉林省白城市洮北区',
      '220821': '吉林省镇赍县',
      '220822': '吉林省通榆县',
      '220881': '吉林省洮南市',
      '220882': '吉林省大安市',
      '2224': '吉林省延边朝鲜族自治州',
      '222401': '吉林省延吉市',
      '222402': '吉林省图们市',
      '222403': '吉林省敦化市',
      '222404': '吉林省珲春市',
      '222405': '吉林省龙井市',
      '222406': '吉林省和龙市',
      '222424': '吉林省汪清县',
      '222426': '吉林省安图县'
      ,
      '23': '黑龙江',
      '2301': '黑龙江哈尔滨市',
      '230101': '黑龙江哈尔滨市市辖区',
      '230102': '黑龙江哈尔滨市道里区',
      '230103': '黑龙江哈尔滨市南岗区',
      '230104': '黑龙江哈尔滨市道外区',
      '230105': '黑龙江哈尔滨市太平区',
      '230106': '黑龙江哈尔滨市香坊区',
      '230107': '黑龙江哈尔滨市动力区',
      '230108': '黑龙江哈尔滨市平房区',
      '230121': '黑龙江呼兰县',
      '230123': '黑龙江依兰县',
      '230124': '黑龙江方正县',
      '230125': '黑龙江宾县',
      '230181': '黑龙江阿城市',
      '2302': '黑龙江齐齐哈尔市',
      '230201': '黑龙江齐齐哈尔市市辖区',
      '230202': '黑龙江齐齐哈尔市龙沙区',
      '230203': '黑龙江齐齐哈尔市建华区',
      '230204': '黑龙江齐齐哈尔市铁锋区',
      '230205': '黑龙江齐齐哈尔市昂昂溪区',
      '230206': '黑龙江齐齐哈尔市富拉尔基区',
      '230207': '黑龙江齐齐哈尔市碾子山区',
      '230208': '黑龙江齐齐哈尔市梅里斯达斡尔族',
      '230221': '黑龙江龙江县',
      '230223': '黑龙江依安县',
      '230224': '黑龙江泰来县',
      '230225': '黑龙江甘南县',
      '230227': '黑龙江富裕县',
      '230229': '黑龙江克山县',
      '230230': '黑龙江克东县',
      '230231': '黑龙江拜泉县',
      '230281': '黑龙江讷河市',
      '2303': '黑龙江鸡西市',
      '230301': '黑龙江鸡西市市辖区',
      '230302': '黑龙江鸡西市鸡冠区',
      '230303': '黑龙江鸡西市恒山区',
      '230304': '黑龙江鸡西市滴道区',
      '230305': '黑龙江鸡西市梨树区',
      '230306': '黑龙江鸡西市城子河区',
      '230307': '黑龙江鸡西市麻山区',
      '230321': '黑龙江鸡东县',
      '230322': '黑龙江虎林县',
      '2304': '黑龙江鹤岗市',
      '230401': '黑龙江鹤岗市市辖区',
      '230402': '黑龙江鹤岗市向阳区',
      '230403': '黑龙江鹤岗市工农区',
      '230404': '黑龙江鹤岗市南山区',
      '230405': '黑龙江鹤岗市兴安区',
      '230406': '黑龙江鹤岗市东山区',
      '230407': '黑龙江鹤岗市兴山区',
      '230421': '黑龙江萝北县',
      '230422': '黑龙江绥滨县',
      '2305': '黑龙江双鸭山市',
      '230501': '黑龙江双鸭山市市辖区',
      '230502': '黑龙江双鸭山市尖山区',
      '230503': '黑龙江双鸭山市岭东区',
      '230505': '黑龙江双鸭山市四方台区',
      '230506': '黑龙江双鸭山市宝山区',
      '230521': '黑龙江集贤县',
      '230522': '黑龙江友谊县',
      '230523': '黑龙江宝清县',
      '230524': '黑龙江饶河县',
      '2306': '黑龙江大庆市',
      '230601': '黑龙江大庆市市辖区',
      '230602': '黑龙江大庆市萨尔图区',
      '230603': '黑龙江大庆市龙凤区',
      '230604': '黑龙江大庆市让胡路区',
      '230605': '黑龙江大庆市红岗区',
      '230606': '黑龙江大庆市大同区',
      '230621': '黑龙江肇州县',
      '230622': '黑龙江肇源县',
      '230623': '黑龙江林甸县',
      '230624': '黑龙江杜尔伯特蒙古族自治县',
      '2307': '黑龙江伊春市',
      '230701': '黑龙江伊春市市辖区',
      '230702': '黑龙江伊春市伊春区',
      '230703': '黑龙江伊春市南岔区',
      '230704': '黑龙江伊春市友好区',
      '230705': '黑龙江伊春市西林区',
      '230706': '黑龙江伊春市翠峦区',
      '230707': '黑龙江伊春市新青区',
      '230708': '黑龙江伊春市美溪区',
      '230709': '黑龙江伊春市金山屯区',
      '230710': '黑龙江伊春市五营区',
      '230711': '黑龙江伊春市乌马河区',
      '230712': '黑龙江伊春市汤旺河区',
      '230713': '黑龙江伊春市带岭区',
      '230714': '黑龙江伊春市乌伊岭区',
      '230715': '黑龙江伊春市红星区',
      '230716': '黑龙江伊春市上甘岭区',
      '230722': '黑龙江嘉荫县',
      '230781': '黑龙江铁力市',
      '2308': '黑龙江佳木斯市',
      '230801': '黑龙江佳木斯市市辖区',
      '230802': '黑龙江佳木斯市永红区',
      '230803': '黑龙江佳木斯市向阳区',
      '230804': '黑龙江佳木斯市前进区',
      '230805': '黑龙江佳木斯市东风区',
      '230811': '黑龙江佳木斯市郊区',
      '230822': '黑龙江桦南县',
      '230826': '黑龙江桦川县',
      '230828': '黑龙江汤原县',
      '230833': '黑龙江扶远县',
      '230881': '黑龙江同江市',
      '230882': '黑龙江富锦市',
      '2309': '黑龙江七台河市',
      '230901': '黑龙江七台河市市辖区',
      '230902': '黑龙江七台河市新兴区',
      '230903': '黑龙江七台河市桃山区',
      '230904': '黑龙江七台河市茄子河区',
      '230921': '黑龙江勃利县',
      '2310': '黑龙江牡丹江市',
      '231001': '黑龙江牡丹江市市辖区',
      '231002': '黑龙江牡丹江市东安区',
      '231003': '黑龙江牡丹江市阳明区',
      '231004': '黑龙江牡丹江市爱民区',
      '231005': '黑龙江牡丹江市西安区',
      '231011': '黑龙江牡丹江市郊区',
      '231023': '黑龙江穆棱县',
      '231024': '黑龙江东宁县',
      '231025': '黑龙江林口县',
      '231081': '黑龙江绥芬河市',
      '231082': '黑龙江密山市',
      '231083': '黑龙江海林市',
      '231084': '黑龙江宁安市',
      '2311': '黑龙江黑河市',
      '231101': '黑龙江黑河市市辖区',
      '231102': '黑龙江黑河市爱辉区',
      '231121': '黑龙江嫩江县',
      '231122': '黑龙江德都县',
      '231123': '黑龙江逊克县',
      '231124': '黑龙江孙吴县',
      '231181': '黑龙江北安市',
      '231182': '黑龙江五大连池市',
      '2321': '黑龙江松花江地区',
      '232101': '黑龙江双城市',
      '232102': '黑龙江尚志市',
      '232103': '黑龙江五常市',
      '232126': '黑龙江巴彦县',
      '232127': '黑龙江木兰县',
      '232128': '黑龙江通河县',
      '232131': '黑龙江延寿县',
      '2323': '黑龙江绥化地区',
      '232301': '黑龙江绥化市',
      '232302': '黑龙江安达市',
      '232303': '黑龙江肇东市',
      '232304': '黑龙江海伦市',
      '232324': '黑龙江望奎县',
      '232325': '黑龙江兰西县',
      '232326': '黑龙江青冈县',
      '232330': '黑龙江庆安县',
      '232331': '黑龙江明水县',
      '232332': '黑龙江绥棱县',
      '2327': '黑龙江大兴安岭地区',
      '232721': '黑龙江呼玛县',
      '232722': '黑龙江塔河县',
      '232723': '黑龙江漠河县'
      ,
      '31': '上海市',
      '3101': '上海市市辖区',
      '310101': '上海市黄浦区',
      '310102': '上海市南市区',
      '310103': '上海市卢湾区',
      '310104': '上海市徐汇区',
      '310105': '上海市长宁区',
      '310106': '上海市静安区',
      '310107': '上海市普陀区',
      '310108': '上海市闸北区',
      '310109': '上海市虹口区',
      '310110': '上海市扬浦区',
      '310112': '上海市闵行区',
      '310113': '上海市宝山区',
      '310114': '上海市嘉定区',
      '310115': '上海市浦东新区',
      '3102': '上海市市辖县',
      '310225': '上海市南汇县',
      '310226': '上海市奉贤县',
      '310227': '上海市松江县',
      '310228': '上海市金山县',
      '310229': '上海市青浦县',
      '310230': '上海市崇明县'
      ,
      '32': '江苏省',
      '3201': '江苏省南京市',
      '320101': '江苏省南京市市辖区',
      '320102': '江苏省南京市玄武区',
      '320103': '江苏省南京市白下区',
      '320104': '江苏省南京市秦淮区',
      '320105': '江苏省南京市建邺区',
      '320106': '江苏省南京市鼓楼区',
      '320107': '江苏省南京市下关区',
      '320111': '江苏省南京市浦口区',
      '320112': '江苏省南京市大厂区',
      '320113': '江苏省南京市栖霞区',
      '320114': '江苏省南京市雨花台区',
      '320121': '江苏省江宁县',
      '320122': '江苏省江浦县',
      '320123': '江苏省六合县',
      '320124': '江苏省溧水县',
      '320125': '江苏省高淳县',
      '3202': '江苏省无锡市',
      '320201': '江苏省无锡市市辖区',
      '320202': '江苏省无锡市崇安区',
      '320203': '江苏省无锡市南长区',
      '320204': '江苏省无锡市北塘区',
      '320211': '江苏省无锡市郊区',
      '320212': '江苏省无锡市马山区',
      '320222': '江苏省无锡县',
      '320281': '江苏省江阴市',
      '320282': '江苏省宜兴市',
      '3203': '江苏省徐州市',
      '320301': '江苏省徐州市市辖区',
      '320302': '江苏省徐州市鼓楼区',
      '320303': '江苏省徐州市云龙区',
      '320304': '江苏省徐州市矿区',
      '320305': '江苏省徐州市贾汪区',
      '320311': '江苏省徐州市泉山区',
      '320321': '江苏省丰县',
      '320322': '江苏省沛县',
      '320323': '江苏省铜山县',
      '320324': '江苏省睢宁县',
      '320381': '江苏省新沂市',
      '320382': '江苏省邳州市',
      '3204': '江苏省常州市',
      '320401': '江苏省常州市市辖区',
      '320402': '江苏省常州市天宁区',
      '320404': '江苏省常州市钟楼区',
      '320405': '江苏省常州市戚墅堰区',
      '320411': '江苏省常州市郊区',
      '320421': '江苏省武进县',
      '320481': '江苏省溧阳市',
      '320482': '江苏省金坛市',
      '3205': '江苏省苏州市',
      '320501': '江苏省苏州市市辖区',
      '320502': '江苏省苏州市沧浪区',
      '320503': '江苏省苏州市平江区',
      '320504': '江苏省苏州市金阊区',
      '320511': '江苏省苏州市郊区',
      '320524': '江苏省吴县',
      '320581': '江苏省常熟市',
      '320582': '江苏省张家港市',
      '320583': '江苏省昆山市',
      '320584': '江苏省吴江市',
      '320585': '江苏省太仓市',
      '3206': '江苏省南通市',
      '320601': '江苏省南通市市辖区',
      '320602': '江苏省南通市崇川区',
      '320611': '江苏省南通市港闸区',
      '320621': '江苏省海安县',
      '320623': '江苏省如东县',
      '320625': '江苏省海门县',
      '320681': '江苏省启东市',
      '320682': '江苏省如皋市',
      '320683': '江苏省通州市',
      '3207': '江苏省连云港市',
      '320701': '江苏省连云港市市辖区',
      '320703': '江苏省连云港市连云区',
      '320704': '江苏省连云港市云台区',
      '320705': '江苏省连云港市新浦区',
      '320706': '江苏省连云港市海州区',
      '320721': '江苏省赣榆县',
      '320722': '江苏省东海县',
      '320723': '江苏省灌云县',
      '3208': '江苏省淮阴市',
      '320801': '江苏省淮阴市市辖区',
      '320802': '江苏省淮阴市清河区',
      '320811': '江苏省淮阴市清浦区',
      '320821': '江苏省淮阴县',
      '320822': '江苏省灌南县',
      '320823': '江苏省沭阳县',
      '320825': '江苏省泗阳县',
      '320826': '江苏省涟水县',
      '320827': '江苏省泗洪县',
      '320829': '江苏省洪泽县',
      '320830': '江苏省盱眙县',
      '320831': '江苏省金湖县',
      '320881': '江苏省宿迁市',
      '320882': '江苏省淮安市',
      '3209': '江苏省盐城市',
      '320901': '江苏省盐城市市辖区',
      '320902': '江苏省盐城市城区',
      '320911': '江苏省盐城市郊区',
      '320921': '江苏省响水县',
      '320922': '江苏省滨海县',
      '320923': '江苏省阜宁县',
      '320924': '江苏省射阳县',
      '320925': '江苏省建湖县',
      '320926': '江苏省大丰县',
      '320981': '江苏省东台市',
      '3210': '江苏省扬州市',
      '321001': '江苏省扬州市市辖区',
      '321002': '江苏省扬州市广陵区',
      '321011': '江苏省扬州市郊区',
      '321023': '江苏省宝应县',
      '321026': '江苏省江都县',
      '321027': '江苏省邗江县',
      '321028': '江苏省泰县',
      '321081': '江苏省仪征市',
      '321082': '江苏省泰州市',
      '321083': '江苏省兴化市',
      '321084': '江苏省高邮市',
      '321085': '江苏省泰兴市',
      '321086': '江苏省靖江市',
      '3211': '江苏省镇江市',
      '321101': '江苏省镇江市市辖区',
      '321102': '江苏省镇江市京口区',
      '321111': '江苏省镇江市润州区',
      '321121': '江苏省丹徒县',
      '321123': '江苏省句容县',
      '321124': '江苏省扬中县',
      '321181': '江苏省丹阳市'
      ,
      '33': '浙江省',
      '3301': '浙江省杭州市',
      '330101': '浙江省杭州市市辖区',
      '330102': '浙江省杭州市上城区',
      '330103': '浙江省杭州市下城区',
      '330104': '浙江省杭州市江干区',
      '330105': '浙江省杭州市拱墅区',
      '330106': '浙江省杭州市西湖区',
      '330122': '浙江省桐庐县',
      '330123': '浙江省富阳县',
      '330124': '浙江省临安县',
      '330125': '浙江省余杭县',
      '330126': '浙江省建德县',
      '330127': '浙江省淳安县',
      '330181': '浙江省萧山市',
      '3302': '浙江省宁波市',
      '330201': '浙江省宁波市市辖区',
      '330203': '浙江省宁波市海曙区',
      '330204': '浙江省宁波市江东区',
      '330205': '浙江省宁波市江北区',
      '330206': '浙江省宁波市北仓区',
      '330211': '浙江省宁波市镇海区',
      '330225': '浙江省象山县',
      '330226': '浙江省宁海县',
      '330227': '浙江省鄞县',
      '330281': '浙江省余姚市',
      '330282': '浙江省慈溪市',
      '330283': '浙江省奉化市',
      '3303': '浙江省温州市',
      '330301': '浙江省温州市市辖区',
      '330302': '浙江省温州市鹿城区',
      '330303': '浙江省温州市龙湾区',
      '330304': '浙江省温州市瓯海区',
      '330322': '浙江省洞头县',
      '330324': '浙江省永嘉县',
      '330326': '浙江省平阳县',
      '330327': '浙江省苍南县',
      '330328': '浙江省文成县',
      '330329': '浙江省泰顺县',
      '330381': '浙江省瑞安市',
      '330382': '浙江省乐清市',
      '3304': '浙江省嘉兴市',
      '330401': '浙江省嘉兴市市辖区',
      '330402': '浙江省嘉兴市城区',
      '330411': '浙江省嘉兴市郊区',
      '330421': '浙江省嘉善县',
      '330424': '浙江省海盐县',
      '330481': '浙江省海宁市',
      '330482': '浙江省平湖市',
      '330483': '浙江省桐乡市',
      '3305': '浙江省湖洲市',
      '330501': '浙江省湖洲市市辖区',
      '330521': '浙江省德清县',
      '330522': '浙江省长兴县',
      '330523': '浙江省安吉县',
      '3306': '浙江省绍兴市',
      '330601': '浙江省绍兴市市辖区',
      '330602': '浙江省绍兴市越城区',
      '330621': '浙江省绍兴县',
      '330623': '浙江省嵊县',
      '330624': '浙江省新昌县',
      '330681': '浙江省诸暨市',
      '330682': '浙江省上虞市',
      '3307': '浙江省金华市',
      '330701': '浙江省金华市市辖区',
      '330702': '浙江省金华市婺城区',
      '330721': '浙江省金华县',
      '330723': '浙江省武义县',
      '330726': '浙江省浦江县',
      '330727': '浙江省磐安县',
      '330728': '浙江省永康市',
      '330781': '浙江省兰溪市',
      '330782': '浙江省义乌市',
      '330783': '浙江省东阳市',
      '3308': '浙江省衢州市',
      '330801': '浙江省衢州市市辖区',
      '330802': '浙江省衢州市柯城区',
      '330821': '浙江省衢县',
      '330822': '浙江省常山县',
      '330824': '浙江省开化县',
      '330825': '浙江省龙游县',
      '330881': '浙江省江山市',
      '3309': '浙江省舟山市',
      '330901': '浙江省舟山市市辖区',
      '330902': '浙江省舟山市定海区',
      '330903': '浙江省舟山市普陀区',
      '330921': '浙江省岱山县',
      '330922': '浙江省嵊泗县',
      '3325': '浙江省丽水地区',
      '332501': '浙江省丽水市',
      '332502': '浙江省龙泉市',
      '332522': '浙江省青田县',
      '332523': '浙江省云和县',
      '332525': '浙江省庆元县',
      '332526': '浙江省缙云县',
      '332527': '浙江省遂昌县',
      '332528': '浙江省松阳县',
      '332529': '浙江省景宁畲族自治县',
      '3326': '浙江省台州地区',
      '332601': '浙江省椒江市',
      '332602': '浙江省临海市',
      '332603': '浙江省黄岩市',
      '332623': '浙江省温岭县',
      '332624': '浙江省仙居县',
      '332625': '浙江省天台县',
      '332626': '浙江省三门县',
      '332627': '浙江省玉环县'
      ,
      '34': '安徽省',
      '3401': '安徽省合肥市',
      '340101': '安徽省合肥市市辖区',
      '340102': '安徽省合肥市东市区',
      '340103': '安徽省合肥市中市区',
      '340104': '安徽省合肥市西市区',
      '340111': '安徽省合肥市郊区',
      '340121': '安徽省长丰县',
      '340122': '安徽省肥东县',
      '340123': '安徽省肥西县',
      '3402': '安徽省芜湖市',
      '340201': '安徽省芜湖市市辖区',
      '340202': '安徽省芜湖市镜湖区',
      '340203': '安徽省芜湖市马塘区',
      '340204': '安徽省芜湖市新芜区',
      '340207': '安徽省芜湖市鸠江区',
      '340221': '安徽省芜湖县',
      '340222': '安徽省繁昌县',
      '340223': '安徽省南陵县',
      '3403': '安徽省蚌埠市',
      '340301': '安徽省蚌埠市市辖区',
      '340302': '安徽省蚌埠市东市区',
      '340303': '安徽省蚌埠市中市区',
      '340304': '安徽省蚌埠市西市区',
      '340311': '安徽省蚌埠市郊区',
      '340321': '安徽省怀远县',
      '340322': '安徽省五河县',
      '340323': '安徽省固镇县',
      '3404': '安徽省淮南市',
      '340401': '安徽省淮南市市辖区',
      '340402': '安徽省淮南市大通区',
      '340403': '安徽省淮南市田家庵区',
      '340404': '安徽省淮南市谢家集区',
      '340405': '安徽省淮南市八公山区',
      '340406': '安徽省淮南市潘集区',
      '340421': '安徽省凤台县',
      '3405': '安徽省马鞍山市',
      '340501': '安徽省马鞍山市市辖区',
      '340502': '安徽省马鞍山市金家庄区',
      '340503': '安徽省马鞍山市花山区',
      '340504': '安徽省马鞍山市雨山区',
      '340505': '安徽省马鞍山市向山区',
      '340521': '安徽省当涂县',
      '3406': '安徽省淮北市',
      '340601': '安徽省淮北市市辖区',
      '340602': '安徽省淮北市杜集区',
      '340603': '安徽省淮北市相山区',
      '340604': '安徽省淮北市烈山区',
      '340621': '安徽省濉溪县',
      '3407': '安徽省铜陵市',
      '340701': '安徽省铜陵市市辖区',
      '340702': '安徽省铜陵市铜官山区',
      '340703': '安徽省铜陵市狮子山区',
      '340711': '安徽省铜陵市郊区',
      '340721': '安徽省铜陵县',
      '3408': '安徽省安庆市',
      '340801': '安徽省安庆市市辖区',
      '340802': '安徽省安庆市迎江区',
      '340803': '安徽省安庆市大观区',
      '340811': '安徽省安庆市郊区',
      '340821': '安徽省桐城县',
      '340822': '安徽省怀宁县',
      '340823': '安徽省枞阳县',
      '340824': '安徽省潜山县',
      '340825': '安徽省太湖县',
      '340826': '安徽省宿松县',
      '340827': '安徽省望江县',
      '340828': '安徽省岳西县',
      '3410': '安徽省黄山市',
      '341001': '安徽省黄山市市辖区',
      '341002': '安徽省黄山市屯溪区',
      '341003': '安徽省黄山市黄山区',
      '341004': '安徽省黄山市徽州区',
      '341021': '安徽省歙县',
      '341022': '安徽省休宁县',
      '341023': '安徽省黟县',
      '341024': '安徽省祁门县',
      '3411': '安徽省滁州市',
      '341101': '安徽省滁州市市辖区',
      '341102': '安徽省滁州市琅琊区',
      '341103': '安徽省滁州市南谯区',
      '341122': '安徽省来安县',
      '341124': '安徽省全椒县',
      '341125': '安徽省定远县',
      '341126': '安徽省凤阳县',
      '341127': '安徽省嘉山县',
      '341181': '安徽省天长县',
      '3421': '安徽省阜阳地区',
      '342101': '安徽省阜阳市',
      '342102': '安徽省毫州市',
      '342103': '安徽省界首市',
      '342122': '安徽省临泉县',
      '342123': '安徽省太和县',
      '342124': '安徽省涡阳县',
      '342125': '安徽省蒙城县',
      '342127': '安徽省阜南县',
      '342128': '安徽省颖上县',
      '342130': '安徽省利辛县',
      '3422': '安徽省宿县地区',
      '342201': '安徽省宿州市',
      '342221': '安徽省砀山县',
      '342222': '安徽省萧县',
      '342224': '安徽省灵壁县',
      '342225': '安徽省泗县',
      '3424': '安徽省六安地区',
      '342401': '安徽省六安市',
      '342422': '安徽省寿县',
      '342423': '安徽省霍邱县',
      '342425': '安徽省舒城县',
      '342426': '安徽省金寨县',
      '342427': '安徽省霍山县',
      '3425': '安徽省宣城地区',
      '342501': '安徽省宣州市',
      '342522': '安徽省郎溪县',
      '342523': '安徽省广德县',
      '342524': '安徽省宁国县',
      '342529': '安徽省泾县',
      '342530': '安徽省旌德县',
      '342531': '安徽省绩溪县',
      '3426': '安徽省巢湖地区',
      '342601': '安徽省巢湖市',
      '342622': '安徽省庐江县',
      '342623': '安徽省无为县',
      '342625': '安徽省含山县',
      '342626': '安徽省和县',
      '3429': '安徽省池州地区',
      '342901': '安徽省贵池县',
      '342921': '安徽省东至县',
      '342922': '安徽省石台县',
      '342923': '安徽省青阳县'
      ,
      '35': '福建省',
      '3501': '福建省福州市',
      '350101': '福建省福州市市辖区',
      '350102': '福建省福州市鼓楼区',
      '350103': '福建省福州市台江区',
      '350104': '福建省福州市仓山区',
      '350105': '福建省福州市马尾区',
      '350111': '福建省福州市郊区',
      '350121': '福建省闽侯县',
      '350122': '福建省连江县',
      '350123': '福建省罗源县',
      '350124': '福建省闽清县',
      '350125': '福建省永泰县',
      '350126': '福建省长乐县',
      '350128': '福建省平潭县',
      '350181': '福建省福清市',
      '3502': '福建省厦门市',
      '350201': '福建省厦门市市辖区',
      '350202': '福建省厦门市鼓浪屿区',
      '350203': '福建省厦门市思明区',
      '350204': '福建省厦门市开元区',
      '350205': '福建省厦门市杏林区',
      '350206': '福建省厦门市湖里区',
      '350211': '福建省厦门市集美区',
      '350221': '福建省同安县',
      '3503': '福建省莆田市',
      '350301': '福建省莆田市市辖区',
      '350302': '福建省莆田市城厢区',
      '350303': '福建省莆田市涵江区',
      '350321': '福建省莆田县',
      '350322': '福建省仙游县',
      '3504': '福建省三明市',
      '350401': '福建省三明市市辖区',
      '350402': '福建省三明市梅列区',
      '350403': '福建省三明市三元区',
      '350421': '福建省明溪县',
      '350423': '福建省清流县',
      '350424': '福建省宁化县',
      '350425': '福建省大田县',
      '350426': '福建省尤溪县',
      '350427': '福建省沙县',
      '350428': '福建省将乐县',
      '350429': '福建省泰宁县',
      '350430': '福建省建宁县',
      '350481': '福建省永安市',
      '3505': '福建省泉州市',
      '350501': '福建省泉州市市辖区',
      '350502': '福建省泉州市鲤城区',
      '350521': '福建省惠安县',
      '350524': '福建省安溪县',
      '350525': '福建省永春县',
      '350526': '福建省德化县',
      '350527': '福建省金门县',
      '350581': '福建省石狮市',
      '350582': '福建省晋江市',
      '350583': '福建省南安市',
      '3506': '福建省漳州市',
      '350601': '福建省漳州市市辖区',
      '350602': '福建省漳州市芗城区',
      '350622': '福建省云霄县',
      '350623': '福建省漳浦县',
      '350624': '福建省诏安县',
      '350625': '福建省长泰县',
      '350626': '福建省东山县',
      '350627': '福建省南靖县',
      '350628': '福建省平和县',
      '350629': '福建省华安县',
      '350681': '福建省龙海市',
      '3521': '福建省南平地区',
      '352101': '福建省南平市',
      '352102': '福建省邵武市',
      '352103': '福建省武夷山市',
      '352104': '福建省建瓯市',
      '352121': '福建省顺昌县',
      '352122': '福建省建阳县',
      '352124': '福建省浦城县',
      '352127': '福建省光泽县',
      '352128': '福建省松溪县',
      '352129': '福建省政和县',
      '3522': '福建省宁德地区',
      '352201': '福建省宁德市',
      '352202': '福建省福安市',
      '352224': '福建省福鼎县',
      '352225': '福建省霞浦县',
      '352227': '福建省古田县',
      '352228': '福建省屏南县',
      '352229': '福建省寿宁县',
      '352230': '福建省周宁县',
      '352231': '福建省柘荣县',
      '3526': '福建省龙岩地区',
      '352601': '福建省龙岩市',
      '352602': '福建省漳平市',
      '352622': '福建省长汀县',
      '352623': '福建省永定县',
      '352624': '福建省上杭县',
      '352625': '福建省武平县',
      '352627': '福建省连城县'
      ,
      '36': '江西省',
      '3601': '江西省南昌市',
      '360101': '江西省南昌市市辖区',
      '360102': '江西省南昌市东湖区',
      '360103': '江西省南昌市西湖区',
      '360104': '江西省南昌市青云谱区',
      '360105': '江西省南昌市湾里区',
      '360111': '江西省南昌市郊区',
      '360121': '江西省南昌县',
      '360122': '江西省新建县',
      '360123': '江西省安义县',
      '360124': '江西省进贤县',
      '3602': '江西省景德镇市',
      '360201': '江西省景德镇市市辖区',
      '360202': '江西省景德镇市昌江区',
      '360203': '江西省景德镇市珠山区',
      '360222': '江西省浮梁县',
      '360281': '江西省乐平市',
      '3603': '江西省萍乡市',
      '360301': '江西省萍乡市市辖区',
      '360302': '江西省萍乡市安源区',
      '360311': '江西省萍乡市上栗区',
      '360312': '江西省萍乡市芦溪区',
      '360313': '江西省萍乡市湘东区',
      '360321': '江西省莲花县',
      '3604': '江西省九江市',
      '360401': '江西省九江市市辖区',
      '360402': '江西省九江市庐山区',
      '360403': '江西省浔阳县',
      '360421': '江西省九江县',
      '360423': '江西省武宁县',
      '360424': '江西省修水县',
      '360425': '江西省永修县',
      '360426': '江西省德安县',
      '360427': '江西省星子县',
      '360428': '江西省都昌县',
      '360429': '江西省湖口县',
      '360430': '江西省彭泽县',
      '360481': '江西省瑞昌市',
      '3605': '江西省新余市',
      '360501': '江西省新余市市辖区',
      '360502': '江西省新余市渝水区',
      '360521': '江西省分宜县',
      '3606': '江西省鹰潭市',
      '360601': '江西省鹰潭市市辖区',
      '360602': '江西省鹰潭市月湖区',
      '360621': '江西省贵溪县',
      '360622': '江西省余江县',
      '3621': '江西省赣州地区',
      '362101': '江西省赣州市',
      '362121': '江西省赣县',
      '362122': '江西省南康县',
      '362123': '江西省信丰县',
      '362124': '江西省大余县',
      '362125': '江西省上犹县',
      '362126': '江西省崇义县',
      '362127': '江西省安远县',
      '362128': '江西省龙南县',
      '362129': '江西省定南县',
      '362130': '江西省全南县',
      '362131': '江西省宁都县',
      '362132': '江西省于都县',
      '362133': '江西省兴国县',
      '362134': '江西省瑞金县',
      '362135': '江西省会昌县',
      '362136': '江西省寻乌县',
      '362137': '江西省石城县',
      '3622': '江西省宜春地区',
      '362201': '江西省宜春市',
      '362202': '江西省丰城市',
      '362203': '江西省樟树市',
      '362204': '江西省高安市',
      '362226': '江西省奉新县',
      '362227': '江西省万载县',
      '362228': '江西省上高县',
      '362229': '江西省宜丰县',
      '362232': '江西省靖安县',
      '362233': '江西省铜鼓县',
      '3623': '江西省上饶地区',
      '362301': '江西省上饶市',
      '362302': '江西省德兴市',
      '362321': '江西省上饶县',
      '362322': '江西省广丰县',
      '362323': '江西省玉山县',
      '362324': '江西省铅山县',
      '362325': '江西省横峰县',
      '362326': '江西省弋阳县',
      '362329': '江西省余干县',
      '362330': '江西省波阳县',
      '362331': '江西省万年县',
      '362334': '江西省婺源县',
      '3624': '江西省吉安地区',
      '362401': '江西省吉安市',
      '362402': '江西省井岗山市',
      '362421': '江西省吉安县',
      '362422': '江西省吉水县',
      '362423': '江西省峡江县',
      '362424': '江西省新干县',
      '362425': '江西省永丰县',
      '362426': '江西省泰和县',
      '362427': '江西省遂川县',
      '362428': '江西省万安县',
      '362429': '江西省安福县',
      '362430': '江西省永新县',
      '362432': '江西省宁冈县',
      '3625': '江西省抚州地区',
      '362502': '江西省临川市',
      '362522': '江西省南城县',
      '362523': '江西省黎川县',
      '362524': '江西省南丰县',
      '362525': '江西省崇仁县',
      '362526': '江西省乐安县',
      '362527': '江西省宜黄县',
      '362528': '江西省金溪县',
      '362529': '江西省资溪县',
      '362531': '江西省东乡县',
      '362532': '江西省广昌县'
      ,
      '37': '山东省',
      '3701': '山东省济南市',
      '370101': '山东省济南市市辖区',
      '370102': '山东省济南市历下区',
      '370103': '山东省济南市市中区',
      '370104': '山东省济南市槐荫区',
      '370105': '山东省济南市天桥区',
      '370112': '山东省济南市历城区',
      '370123': '山东省长清县',
      '370124': '山东省平阴县',
      '370125': '山东省商河县',
      '370126': '山东省济阳县',
      '370181': '山东省章丘市',
      '3702': '山东省青岛市',
      '370201': '山东省青岛市市辖区',
      '370202': '山东省青岛市市南区',
      '370203': '山东省青岛市市北区',
      '370204': '山东省青岛市台东区',
      '370205': '山东省青岛市四方区',
      '370206': '山东省青岛市沧口区',
      '370211': '山东省青岛市黄岛区',
      '370212': '山东省青岛市崂山区',
      '370281': '山东省胶州市',
      '370282': '山东省即墨市',
      '370283': '山东省平度市',
      '370284': '山东省胶南市',
      '370285': '山东省菜西市',
      '3703': '山东省淄博市',
      '370301': '山东省淄博市市辖区',
      '370302': '山东省淄博市淄川区',
      '370303': '山东省淄博市张店区',
      '370304': '山东省淄博市博山区',
      '370305': '山东省淄博市临淄区',
      '370306': '山东省淄博市周村区',
      '370321': '山东省桓台县',
      '370322': '山东省高青县',
      '370323': '山东省沂源县',
      '3704': '山东省枣庄市',
      '370401': '山东省枣庄市市辖区',
      '370402': '山东省枣庄市市中区',
      '370403': '山东省枣庄市薛城区',
      '370404': '山东省枣庄市峄城区',
      '370405': '山东省枣庄市台儿庄区',
      '370406': '山东省枣庄市山亭区',
      '370481': '山东省滕州市',
      '3705': '山东省东营市',
      '370501': '山东省东营市市辖区',
      '370502': '山东省东营市东营区',
      '370503': '山东省东营市河口区',
      '370521': '山东省垦利县',
      '370522': '山东省利津县',
      '370523': '山东省广饶县',
      '3706': '山东省烟台市',
      '370601': '山东省烟台市市辖区',
      '370602': '山东省烟台市芝罘区',
      '370611': '山东省烟台市福山区',
      '370628': '山东省栖霞县',
      '370629': '山东省海阳县',
      '370631': '山东省牟平县',
      '370634': '山东省长岛县',
      '370681': '山东省龙口市',
      '370682': '山东省莱阳市',
      '370683': '山东省莱州市',
      '370684': '山东省蓬莱市',
      '370685': '山东省招远市',
      '3707': '山东省潍坊市',
      '370701': '山东省潍坊市市辖区',
      '370702': '山东省潍坊市潍城区',
      '370703': '山东省潍坊市寒亭区',
      '370704': '山东省潍坊市坊子区',
      '370722': '山东省安丘县',
      '370724': '山东省临朐县',
      '370725': '山东省昌乐县',
      '370726': '山东省昌邑县',
      '370727': '山东省高密县',
      '370781': '山东省青州市',
      '370782': '山东省诸城市',
      '370783': '山东省寿光市',
      '3708': '山东省济宁市',
      '370801': '山东省济宁市市辖区',
      '370802': '山东省济宁市市中区',
      '370811': '山东省济宁市任城区',
      '370826': '山东省微山县',
      '370827': '山东省鱼台县',
      '370828': '山东省金乡县',
      '370829': '山东省嘉祥县',
      '370830': '山东省汶上县',
      '370831': '山东省泗水县',
      '370832': '山东省梁山县',
      '370881': '山东省曲阜市',
      '370882': '山东省兖州市',
      '370883': '山东省邹城市',
      '3709': '山东省泰安市',
      '370901': '山东省泰安市市辖区',
      '370902': '山东省泰安市泰山区',
      '370911': '山东省泰安市郊区',
      '370921': '山东省宁阳县',
      '370923': '山东省东平县',
      '370982': '山东省新泰市',
      '370983': '山东省肥城市',
      '3710': '山东省威海市',
      '371001': '山东省威海市市辖区',
      '371002': '山东省威海市环翠区',
      '371081': '山东省文登市',
      '371082': '山东省荣城市',
      '371083': '山东省乳山市',
      '3711': '山东省日照市',
      '371101': '山东省日照市市辖区',
      '371102': '山东省日照市东港区',
      '371121': '山东省五莲县',
      '371122': '山东省莒县',
      '3712': '山东省莱芜市',
      '371201': '山东省莱芜市市辖区',
      '371202': '山东省莱芜市莱城区',
      '371203': '山东省莱芜市钢城区',
      '3723': '山东省滨州地区',
      '372301': '山东省滨州市',
      '372321': '山东省惠民县',
      '372323': '山东省阳信县',
      '372324': '山东省无棣县',
      '372325': '山东省沾化县',
      '372328': '山东省博兴县',
      '372330': '山东省邹平县',
      '3724': '山东省德州地区',
      '372401': '山东省德州市',
      '372402': '山东省乐陵市',
      '372403': '山东省禹城市',
      '372421': '山东省陵县',
      '372422': '山东省平原县',
      '372423': '山东省夏津县',
      '372424': '山东省武城县',
      '372425': '山东省齐河县',
      '372428': '山东省临邑县',
      '372431': '山东省宁津县',
      '372432': '山东省庆云县',
      '3725': '山东省聊城地区',
      '372501': '山东省聊城市',
      '372502': '山东省临清市',
      '372522': '山东省阳谷县',
      '372523': '山东省莘县',
      '372524': '山东省茌平县',
      '372525': '山东省东阿县',
      '372526': '山东省冠县',
      '372527': '山东省高唐县',
      '3728': '山东省临沂地区',
      '372801': '山东省临沂市',
      '372822': '山东省郯城县',
      '372823': '山东省苍山县',
      '372824': '山东省莒南县',
      '372827': '山东省沂水县',
      '372829': '山东省蒙阴县',
      '372830': '山东省平邑县',
      '372831': '山东省费县',
      '372832': '山东省沂南县',
      '372833': '山东省临沭县',
      '3729': '山东省菏泽地区',
      '372901': '山东省菏泽市',
      '372922': '山东省曹县',
      '372923': '山东省定陶县',
      '372924': '山东省成武县',
      '372925': '山东省单县',
      '372926': '山东省巨野县',
      '372928': '山东省郓城县',
      '372929': '山东省鄄城县',
      '372930': '山东省东明县'
      ,
      '41': '河南省',
      '4101': '河南省郑州市',
      '410101': '河南省郑州市市辖区',
      '410102': '河南省郑州市中原区',
      '410103': '河南省郑州市二七区',
      '410104': '河南省郑州市管城回族区',
      '410105': '河南省郑州市金水区',
      '410106': '河南省郑州市上街区',
      '410108': '河南省郑州市邙山区',
      '410121': '河南省荥阳县',
      '410122': '河南省中牟县',
      '410123': '河南省新郑县',
      '410125': '河南省登封县',
      '410126': '河南省密县',
      '410181': '河南省巩义市',
      '4102': '河南省开封市',
      '410201': '河南省开封市市辖区',
      '410202': '河南省开封市龙亭区',
      '410203': '河南省开封市顺河回族区',
      '410204': '河南省开封市鼓楼区',
      '410205': '河南省开封市南关区',
      '410211': '河南省开封市郊区',
      '410221': '河南省杞县',
      '410222': '河南省通许县',
      '410223': '河南省尉氏县',
      '410224': '河南省开封县',
      '410225': '河南省兰考县',
      '4103': '河南省洛阳市',
      '410301': '河南省洛阳市市辖区',
      '410302': '河南省洛阳市老城区',
      '410303': '河南省洛阳市西工区',
      '410304': '河南省洛阳市廛河回族区',
      '410305': '河南省洛阳市涧西区',
      '410306': '河南省洛阳市吉利区',
      '410311': '河南省洛阳市郊区',
      '410322': '河南省孟津县',
      '410323': '河南省新安县',
      '410324': '河南省栾川县',
      '410325': '河南省嵩县',
      '410326': '河南省汝阳县',
      '410327': '河南省宜阳县',
      '410328': '河南省洛宁县',
      '410329': '河南省伊川县',
      '410381': '河南省偃师市',
      '4104': '河南省平顶山市',
      '410401': '河南省平顶山市市辖区',
      '410402': '河南省平顶山市新华区',
      '410403': '河南省平顶山市卫东区',
      '410411': '河南省平顶山市郊区',
      '410421': '河南省宝丰县',
      '410422': '河南省叶县',
      '410423': '河南省鲁山县',
      '410425': '河南省郏县',
      '410426': '河南省襄城县',
      '410481': '河南省舞钢市',
      '410482': '河南省汝州市',
      '4105': '河南省安阳市',
      '410501': '河南省安阳市市辖区',
      '410502': '河南省安阳市文峰区',
      '410503': '河南省安阳市北关区',
      '410504': '河南省安阳市铁西区',
      '410511': '河南省安阳市郊区',
      '410521': '河南省林县',
      '410522': '河南省安阳县',
      '410523': '河南省汤阴县',
      '410526': '河南省滑县',
      '410527': '河南省内黄县',
      '4106': '河南省鹤壁市',
      '410601': '河南省鹤壁市市辖区',
      '410602': '河南省鹤壁市鹤山区',
      '410603': '河南省鹤壁市山城区',
      '410611': '河南省鹤壁市郊区',
      '410621': '河南省浚县',
      '410622': '河南省淇县',
      '4107': '河南省新乡市',
      '410701': '河南省新乡市市辖区',
      '410702': '河南省新乡市红旗区',
      '410703': '河南省新乡市新华区',
      '410704': '河南省新乡市北站区',
      '410711': '河南省新乡市郊区',
      '410721': '河南省新乡县',
      '410724': '河南省获嘉县',
      '410725': '河南省原阳县',
      '410726': '河南省延津县',
      '410727': '河南省封丘县',
      '410728': '河南省长恒县',
      '410781': '河南省卫辉市',
      '410782': '河南省辉县市',
      '4108': '河南省焦作市',
      '410801': '河南省焦作市市辖区',
      '410802': '河南省焦作市解放区',
      '410803': '河南省焦作市中站区',
      '410804': '河南省焦作市马村区',
      '410811': '河南省焦作市山阳区',
      '410821': '河南省修武县',
      '410822': '河南省博爱县',
      '410823': '河南省武陟县',
      '410825': '河南省温县',
      '410826': '河南省孟县',
      '410881': '河南省济源市',
      '410882': '河南省沁阳市',
      '4109': '河南省濮阳市',
      '410901': '河南省濮阳市市辖区',
      '410902': '河南省濮阳市市区',
      '410922': '河南省清丰县',
      '410923': '河南省南乐县',
      '410926': '河南省范县',
      '410927': '河南省台前县',
      '410928': '河南省濮阳县',
      '4110': '河南省许昌市',
      '411001': '河南省许昌市市辖区',
      '411002': '河南省许昌市魏都区',
      '411023': '河南省许昌县',
      '411024': '河南省鄢陵县',
      '411081': '河南省禹州市',
      '411082': '河南省长葛市',
      '4111': '河南省漯河市',
      '411101': '河南省漯河市市辖区',
      '411102': '河南省漯河市源仁区',
      '411121': '河南省舞阳县',
      '411122': '河南省临颖县',
      '411123': '河南省郾城县',
      '4112': '河南省三门峡市',
      '411201': '河南省三门峡市市辖区',
      '411202': '河南省三门峡市湖滨区',
      '411221': '河南省渑池县',
      '411222': '河南省陕县',
      '411224': '河南省卢氏县',
      '411281': '河南省义马市',
      '411282': '河南省灵宝市',
      '4123': '河南省商丘地区',
      '412301': '河南省商丘市',
      '412321': '河南省虞城县',
      '412322': '河南省商丘县',
      '412323': '河南省民权县',
      '412324': '河南省宁陵县',
      '412325': '河南省睢县',
      '412326': '河南省夏邑县',
      '412327': '河南省柘城县',
      '412328': '河南省永城县',
      '4127': '河南省周口地区',
      '412701': '河南省周口市',
      '412702': '河南省项城市',
      '412721': '河南省扶沟县',
      '412722': '河南省西华县',
      '412723': '河南省商水县',
      '412724': '河南省太康县',
      '412725': '河南省鹿邑县',
      '412726': '河南省郸城县',
      '412727': '河南省淮阳县',
      '412728': '河南省沈丘县',
      '4128': '河南省驻马店地区',
      '412801': '河南省驻马店市',
      '412821': '河南省确山县',
      '412822': '河南省泌阳县',
      '412823': '河南省遂平县',
      '412824': '河南省西平县',
      '412825': '河南省上蔡县',
      '412826': '河南省汝南县',
      '412827': '河南省平舆县',
      '412828': '河南省新蔡县',
      '412829': '河南省正阳县',
      '4129': '河南省南阳地区',
      '412901': '河南省南阳市',
      '412902': '河南省邓州市',
      '412921': '河南省南召县',
      '412922': '河南省方城县',
      '412923': '河南省西峡县',
      '412924': '河南省南阳县',
      '412925': '河南省镇平县',
      '412926': '河南省内乡县',
      '412927': '河南省淅川县',
      '412928': '河南省社旗县',
      '412929': '河南省唐河县',
      '412931': '河南省新野县',
      '412932': '河南省桐柏县',
      '4130': '河南省信阳地区',
      '413001': '河南省信阳市',
      '413021': '河南省息县',
      '413022': '河南省淮滨县',
      '413023': '河南省信阳县',
      '413024': '河南省横川县',
      '413025': '河南省光山县',
      '413026': '河南省固始县',
      '413027': '河南省商城县',
      '413028': '河南省罗山县',
      '413029': '河南省新县'
      ,
      '42': '湖北省',
      '4201': '湖北省武汉市',
      '420101': '湖北省武汉市市辖区',
      '420102': '湖北省武汉市江岸区',
      '420103': '湖北省武汉市江汉区',
      '420104': '湖北省武汉市乔口区',
      '420105': '湖北省武汉市汉阳区',
      '420106': '湖北省武汉市武昌区',
      '420107': '湖北省武汉市青山区',
      '420111': '湖北省武汉市洪山区',
      '420112': '湖北省武汉市东西湖区',
      '420113': '湖北省武汉市汉南区',
      '420114': '湖北省蔡甸区',
      '420122': '湖北省武昌县',
      '420123': '湖北省黄陂县',
      '420124': '湖北省新洲县',
      '4202': '湖北省黄石市',
      '420201': '湖北省黄石市市辖区',
      '420202': '湖北省黄石市黄石港区',
      '420203': '湖北省黄石市石灰窑区',
      '420204': '湖北省黄石市下陆区',
      '420205': '湖北省黄石市铁山区',
      '420221': '湖北省大冶县',
      '4203': '湖北省十堰市',
      '420301': '湖北省十堰市市辖区',
      '420302': '湖北省十堰市茅箭区',
      '420303': '湖北省十堰市张湾区',
      '4204': '湖北省沙市市',
      '420400': '湖北省沙市市',
      '4205': '湖北省宜昌市',
      '420501': '湖北省宜昌市市辖区',
      '420502': '湖北省宜昌市西陵区',
      '420503': '湖北省宜昌市伍家岗区',
      '420504': '湖北省宜昌市点军区',
      '420521': '湖北省宜昌县',
      '420523': '湖北省枝江县',
      '420525': '湖北省远安县',
      '420526': '湖北省兴山县',
      '420527': '湖北省秭归县',
      '420528': '湖北省长阳土家族自治县',
      '420529': '湖北省五峰土家族自治县',
      '420581': '湖北省枝城市',
      '420582': '湖北省当阳市',
      '4206': '湖北省襄樊市',
      '420601': '湖北省襄樊市市辖区',
      '420602': '湖北省襄樊市襄城区',
      '420603': '湖北省襄樊市樊东区',
      '420604': '湖北省襄樊市樊西区',
      '420605': '湖北省襄樊市郊区',
      '420621': '湖北省襄阳县',
      '420623': '湖北省宜城县',
      '420624': '湖北省南漳县',
      '420625': '湖北省谷城县',
      '420626': '湖北省保康县',
      '420681': '湖北省随州市',
      '420682': '湖北省老河口市',
      '420683': '湖北省枣阳市',
      '4207': '湖北省鄂州市',
      '420701': '湖北省鄂州市市辖区',
      '420702': '湖北省鄂州市梁子湖区',
      '420703': '湖北省鄂州市谷容区',
      '420704': '湖北省鄂州市鄂城区',
      '4208': '湖北省荆门市',
      '420801': '湖北省荆门市市辖区',
      '420802': '湖北省荆门市东宝区',
      '420803': '湖北省荆门市沙洋区',
      '4209': '湖北省孝感市',
      '420901': '湖北省孝感市市辖区',
      '420902': '湖北省孝感市孝南区',
      '420903': '湖北省孝感市孝昌区',
      '420922': '湖北省大悟县',
      '420923': '湖北省云梦县',
      '420924': '湖北省汉川县',
      '420981': '湖北省应城市',
      '420982': '湖北省安陆市',
      '420983': '湖北省广水市',
      '4221': '湖北省黄冈地区',
      '422101': '湖北省麻城市',
      '422102': '湖北省武穴市',
      '422103': '湖北省黄州市',
      '422123': '湖北省红安县',
      '422125': '湖北省罗田县',
      '422126': '湖北省英山县',
      '422127': '湖北省浠水县',
      '422128': '湖北省蕲春县',
      '422130': '湖北省黄梅县',
      '4223': '湖北省咸宁地区',
      '422301': '湖北省咸宁市',
      '422302': '湖北省蒲圻市',
      '422322': '湖北省嘉鱼县',
      '422324': '湖北省通城县',
      '422325': '湖北省崇阳县',
      '422326': '湖北省通山县',
      '422327': '湖北省阳新县',
      '4224': '湖北省荆州地区',
      '422401': '湖北省仙桃市',
      '422402': '湖北省石首市',
      '422403': '湖北省洪湖市',
      '422404': '湖北省天门市',
      '422405': '湖北省潜江市',
      '422406': '湖北省钟祥市',
      '422421': '湖北省江陵县',
      '422422': '湖北省松滋县',
      '422423': '湖北省公安县',
      '422425': '湖北省监利县',
      '422432': '湖北省京山县',
      '4226': '湖北省郧阳地区',
      '422601': '湖北省丹江口市',
      '422622': '湖北省郧县',
      '422623': '湖北省郧西县',
      '422624': '湖北省竹山县',
      '422625': '湖北省竹溪县',
      '422626': '湖北省房县',
      '4228': '湖北省恩施土家族苗族自治州',
      '422801': '湖北省恩施市',
      '422802': '湖北省利川市',
      '422822': '湖北省建始县',
      '422823': '湖北省巴东县',
      '422825': '湖北省宣恩县',
      '422826': '湖北省咸丰县',
      '422827': '湖北省来凤县',
      '422828': '湖北省鹤峰县',
      '4229': '湖北省省直辖行政单位',
      '422921': '湖北省神农架林区'
      ,
      '43': '湖南省',
      '4301': '湖南省长沙市',
      '430101': '湖南省长沙市市辖区',
      '430102': '湖南省长沙市东区',
      '430103': '湖南省长沙市南区',
      '430104': '湖南省长沙市西区',
      '430105': '湖南省长沙市北区',
      '430111': '湖南省长沙市郊区',
      '430121': '湖南省长沙县　　',
      '430122': '湖南省望城县',
      '430124': '湖南省宁乡县',
      '430181': '湖南省浏阳市',
      '4302': '湖南省株洲市',
      '430201': '湖南省株洲市市辖区',
      '430202': '湖南省株洲市东区',
      '430203': '湖南省株洲市北区',
      '430204': '湖南省株洲市南区',
      '430211': '湖南省株洲市郊区',
      '430221': '湖南省株洲县',
      '430223': '湖南省攸县',
      '430224': '湖南省茶陵县',
      '430225': '湖南省酃县',
      '430281': '湖南省醴陵市',
      '4303': '湖南省湘潭市',
      '430301': '湖南省湘潭市市辖区',
      '430302': '湖南省湘潭市雨湖区',
      '430304': '湖南省湘潭市岳塘区',
      '430321': '湖南省湘潭县',
      '430381': '湖南省湘乡市',
      '430382': '湖南省韶山市',
      '4304': '湖南省衡阳市',
      '430401': '湖南省衡阳市市辖区',
      '430402': '湖南省衡阳市江东区',
      '430403': '湖南省衡阳市城南区',
      '430404': '湖南省衡阳市城北区',
      '430411': '湖南省衡阳市郊区',
      '430412': '湖南省衡阳市南岳区',
      '430421': '湖南省衡阳县',
      '430422': '湖南省衡南县',
      '430423': '湖南省衡山县',
      '430424': '湖南省衡东县',
      '430425': '湖南省常宁县',
      '430426': '湖南省祁东县',
      '430481': '湖南省耒阳市',
      '4305': '湖南省邵阳市',
      '430501': '湖南省邵阳市市辖区',
      '430502': '湖南省邵阳市东区',
      '430503': '湖南省邵阳市西区',
      '430511': '湖南省邵阳市郊区',
      '430521': '湖南省邵东县',
      '430522': '湖南省新邵县',
      '430523': '湖南省邵阳县',
      '430524': '湖南省隆回县',
      '430525': '湖南省洞口县',
      '430526': '湖南省武冈县',
      '430527': '湖南省绥宁县',
      '430528': '湖南省新宁县',
      '430529': '湖南省城步苗族自治县',
      '4306': '湖南省岳阳市',
      '430601': '湖南省岳阳市市辖区',
      '430602': '湖南省岳阳市南区',
      '430603': '湖南省岳阳市北区',
      '430611': '湖南省岳阳市郊区',
      '430621': '湖南省岳阳县',
      '430623': '湖南省华容县',
      '430624': '湖南省湘阴县',
      '430626': '湖南省平江县',
      '430681': '湖南省汨罗市',
      '430682': '湖南省临湘市',
      '4307': '湖南省常德市',
      '430701': '湖南省常德市市辖区',
      '430702': '湖南省常德市武陵区',
      '430703': '湖南省常德市鼎城区',
      '430721': '湖南省安乡县',
      '430722': '湖南省汉寿县',
      '430723': '湖南省澧县',
      '430724': '湖南省临澧县',
      '430725': '湖南省桃源县',
      '430726': '湖南省石门县',
      '430781': '湖南省津市市',
      '4308': '湖南省大庸市',
      '430801': '湖南省大庸市市辖区',
      '430802': '湖南省大庸市永定区',
      '430811': '湖南省大庸市武陵源区',
      '430821': '湖南省慈利县',
      '430822': '湖南省桑植县',
      '4323': '湖南省益阳地区',
      '432301': '湖南省益阳市',
      '432302': '湖南省沅江市',
      '432321': '湖南省益阳县',
      '432322': '湖南省南县',
      '432325': '湖南省桃江县',
      '432326': '湖南省安化县',
      '4325': '湖南省娄底地区',
      '432501': '湖南省娄底市',
      '432502': '湖南省冷水江市',
      '432503': '湖南省涟源市',
      '432522': '湖南省双峰县',
      '432524': '湖南省新化县',
      '4328': '湖南省郴州地区',
      '432801': '湖南省郴州市',
      '432802': '湖南省资兴市',
      '432821': '湖南省郴县',
      '432822': '湖南省桂阳县',
      '432823': '湖南省永兴县',
      '432824': '湖南省宜章县',
      '432826': '湖南省嘉禾县',
      '432827': '湖南省临武县',
      '432828': '湖南省汝城县',
      '432829': '湖南省桂东县',
      '432831': '湖南省安仁县',
      '4329': '湖南省零陵地区',
      '432901': '湖南省永州市',
      '432902': '湖南省冷水滩市',
      '432922': '湖南省东安县',
      '432923': '湖南省道县',
      '432924': '湖南省宁远县',
      '432925': '湖南省江永县',
      '432926': '湖南省江华瑶族自治县',
      '432927': '湖南省蓝山县',
      '432928': '湖南省新田县　',
      '432929': '湖南省双牌县',
      '432930': '湖南省祁阳县',
      '4330': '湖南省怀化地区',
      '433001': '湖南省怀化市',
      '433002': '湖南省洪江市',
      '433021': '湖南省黔阳县',
      '433022': '湖南省沅陵县',
      '433023': '湖南省辰溪县',
      '433024': '湖南省溆浦县',
      '433025': '湖南省麻阳苗族自治县',
      '433026': '湖南省新晃侗族自治县',
      '433027': '湖南省芷江侗族自治县',
      '433029': '湖南省会同县',
      '433030': '湖南省靖州苗族侗族自治县',
      '433031': '湖南省通道侗族自治县',
      '4331': '湖南省湘西土家族苗族自治州',
      '433101': '湖南省吉首市',
      '433122': '湖南省泸溪县',
      '433123': '湖南省风凰县',
      '433124': '湖南省花垣县',
      '433125': '湖南省保靖县',
      '433126': '湖南省古丈县',
      '433127': '湖南省永顺县',
      '433130': '湖南省龙山县'
      ,
      '44': '广东省',
      '4401': '广东省广州市',
      '440101': '广东省广州市市辖区',
      '440102': '广东省广州市东山区',
      '440103': '广东省广州市荔湾区',
      '440104': '广东省广州市越秀区',
      '440105': '广东省广州市海珠区',
      '440106': '广东省广州市天河区',
      '440107': '广东省广州市芳村区',
      '440111': '广东省广州市白云区',
      '440112': '广东省广州市黄埔区',
      '440122': '广东省从花县',
      '440181': '广东省番禺市',
      '440182': '广东省花都市',
      '440183': '广东省增城市',
      '4402': '广东省韶关市',
      '440201': '广东省韶关市市辖区',
      '440202': '广东省韶关市北江区',
      '440203': '广东省韶关市武江区',
      '440204': '广东省韶关市浈江区',
      '440221': '广东省曲江县',
      '440222': '广东省始兴县',
      '440223': '广东省南雄县',
      '440224': '广东省仁化县',
      '440225': '广东省乐昌县',
      '440229': '广东省翁源县',
      '440232': '广东省乳源瑶族自治县',
      '440233': '广东省新丰县',
      '4403': '广东省深圳市',
      '440301': '广东省深圳市市辖区',
      '440303': '广东省深圳市罗湖区',
      '440304': '广东省深圳市福田区',
      '440305': '广东省深圳市南山区',
      '440306': '广东省深圳市宝安区',
      '440307': '广东省深圳市龙岗区',
      '4404': '广东省珠海市',
      '440401': '广东省珠海市市辖区',
      '440402': '广东省珠海市香州区',
      '440407': '广东省汕头市龙湖区',
      '440421': '广东省斗门县',
      '4405': '广东省汕头市',
      '440501': '广东省汕头市市辖区',
      '440506': '广东省汕头市达濠区',
      '440508': '广东省汕头市金园区',
      '440509': '广东省汕头市升平区',
      '440521': '广东省澄海县',
      '440523': '广东省南懊县',
      '440582': '广东省潮阳市',
      '4406': '广东省佛山市',
      '440601': '广东省佛山市市辖区',
      '440602': '广东省佛山市城区',
      '440603': '广东省佛山市石湾区',
      '440624': '广东省高明县',
      '440681': '广东省顺德市',
      '440682': '广东省南海市',
      '440683': '广东省三水市',
      '4407': '广东省江门市',
      '440701': '广东省江门市市辖区',
      '440702': '广东省江门市城区',
      '440711': '广东省江门市郊区',
      '440723': '广东省恩平县',
      '440781': '广东省台山市',
      '440782': '广东省新会市',
      '440783': '广东省开平市',
      '440784': '广东省鹤山市',
      '4408': '广东省湛江市',
      '440801': '广东省湛江市市辖区',
      '440802': '广东省湛江市赤坎区',
      '440803': '广东省湛江市霞山区',
      '440804': '广东省湛江市坡头区',
      '440811': '广东省湛江市郊区',
      '440821': '广东省吴川县',
      '440823': '广东省遂溪县',
      '440824': '广东省海康县',
      '440825': '广东省徐闻县',
      '440881': '广东省廉江市',
      '4409': '广东省茂名市',
      '440901': '广东省茂名市市辖区',
      '440902': '广东省茂名市茂南区',
      '440921': '广东省信宜县',
      '440923': '广东省电白县',
      '440924': '广东省化州县',
      '440981': '广东省高州市',
      '4412': '广东省肇庆市',
      '441201': '广东省肇庆市市辖区',
      '441202': '广东省肇庆市端州区',
      '441203': '广东省肇庆市鼎湖区',
      '441223': '广东省广宁县',
      '441224': '广东省怀集县',
      '441225': '广东省封开县',
      '441226': '广东省德庆县',
      '441228': '广东省新兴县',
      '441229': '广东省郁南县',
      '441281': '广东省云浮市',
      '441282': '广东省罗定市',
      '441283': '广东省高要市',
      '441284': '广东省四会市',
      '4413': '广东省惠州市',
      '441301': '广东省惠州市市辖区',
      '441302': '广东省惠州市惠城区',
      '441321': '广东省惠阳县',
      '441322': '广东省博罗县',
      '441323': '广东省惠东县',
      '441324': '广东省龙门县',
      '4414': '广东省梅州市',
      '441401': '广东省梅州市市辖区',
      '441402': '广东省梅州市梅江区',
      '441421': '广东省梅县',
      '441422': '广东省大埔县',
      '441423': '广东省丰顺县',
      '441424': '广东省五华县',
      '441425': '广东省兴宁县',
      '441426': '广东省平远县',
      '441427': '广东省蕉岭县',
      '4415': '广东省汕尾市',
      '441501': '广东省汕尾市市辖区',
      '441502': '广东省汕尾市城区',
      '441521': '广东省海丰县',
      '441522': '广东省陆丰县',
      '441523': '广东省陆河县',
      '4416': '广东省河源市',
      '441601': '广东省河源市市辖区',
      '441602': '广东省河源市源城区',
      '441621': '广东省紫金县',
      '441622': '广东省龙川县',
      '441623': '广东省连平县',
      '441624': '广东省和平县',
      '441625': '广东省东源县',
      '4417': '广东省阳江市',
      '441701': '广东省阳江市市辖区',
      '441702': '广东省阳江市江城区',
      '441721': '广东省阳西县',
      '441722': '广东省阳春县',
      '441723': '广东省阳东县',
      '4418': '广东省清远市',
      '441801': '广东省清远市市辖区',
      '441802': '广东省清远市清城区',
      '441821': '广东省佛冈县',
      '441822': '广东省英德县',
      '441823': '广东省阳山县',
      '441824': '广东省连县',
      '441825': '广东省连山壮族瑶族自治县',
      '441826': '广东省连南瑶族自治县',
      '441827': '广东省清新县',
      '4419': '广东省东莞市',
      '441900': '广东省东莞市',
      '4420': '广东省中山市',
      '442000': '广东省中山市',
      '4451': '广东省潮州市',
      '445101': '广东省潮州市市辖区',
      '445102': '广东省潮州市湘桥区',
      '445121': '广东省潮州市潮安县',
      '445122': '广东省饶平县',
      '4452': '广东省揭阳市',
      '445201': '广东省揭阳市市辖区',
      '445202': '广东省揭阳市榕城区',
      '445221': '广东省揭东县',
      '445222': '广东省揭西县',
      '445224': '广东省惠来县',
      '445281': '广东省普宁县'
      ,
      '45': '广西',
      '4501': '广西南宁市',
      '450101': '广西南宁市市辖区',
      '450102': '广西南宁市兴宁区',
      '450103': '广西南宁市新城区',
      '450104': '广西南宁市城北区',
      '450105': '广西南宁市江南区',
      '450106': '广西南宁市永新区',
      '450111': '广西南宁市市郊区',
      '450121': '广西邕宁县',
      '450122': '广西武鸣县',
      '4502': '广西柳州市',
      '450201': '广西柳州市市辖区',
      '450202': '广西柳州市城中区',
      '450203': '广西柳州市鱼峰区',
      '450204': '广西柳州市柳南区',
      '450205': '广西柳州市柳北区',
      '450211': '广西柳州市市郊区',
      '450221': '广西柳江县',
      '450222': '广西柳城县',
      '4503': '广西桂林市',
      '450301': '广西桂林市市辖区',
      '450302': '广西桂林市秀峰区',
      '450303': '广西桂林市叠彩区',
      '450304': '广西桂林市象山区',
      '450305': '广西桂林市七星区',
      '450311': '广西桂林市市郊区',
      '450321': '广西阳朔县',
      '450322': '广西临桂县',
      '4504': '广西梧州市',
      '450401': '广西梧州市市辖区',
      '450403': '广西梧州市万秀区',
      '450404': '广西梧州市蝶山区',
      '450411': '广西梧州市市郊区',
      '450421': '广西苍梧县',
      '4505': '广西北海市　',
      '450501': '广西北海市市辖区',
      '450502': '广西北海市海城区',
      '450511': '广西北海市市郊区',
      '450521': '广西合浦县',
      '4506': '广西防城港市',
      '450601': '广西防城港市市辖区',
      '450602': '广西防城港市港口区',
      '450603': '广西防城港市防城区',
      '450621': '广西上思县',
      '4521': '广西南宁地区',
      '452101': '广西凭祥市',
      '452122': '广西横县',
      '452123': '广西宾阳县',
      '452124': '广西上林县',
      '452126': '广西隆安县',
      '452127': '广西马山县',
      '452128': '广西扶绥县',
      '452129': '广西崇左县',
      '452130': '广西大新县',
      '452131': '广西天等县',
      '452132': '广西宁明县',
      '452133': '广西龙州县',
      '4522': '广西柳州地区',
      '452201': '广西合山市',
      '452223': '广西鹿寨县',
      '452224': '广西象州县',
      '452225': '广西武宣县',
      '452226': '广西来宾县',
      '452227': '广西融安县',
      '452228': '广西三江侗族自治县',
      '452229': '广西融水苗族自治县',
      '452230': '广西金秀瑶族自治县',
      '452231': '广西忻城县',
      '4523': '广西桂林地区',
      '452322': '广西灵川县',
      '452323': '广西全州县',
      '452324': '广西兴安县',
      '452325': '广西永福县',
      '452327': '广西灌阳县',
      '452328': '广西龙胜各族自治县',
      '452329': '广西资源县',
      '452330': '广西平乐县',
      '452331': '广西荔浦县',
      '452332': '广西恭城瑶族自治县',
      '4524': '广西梧州地区',
      '452421': '广西岑溪县',
      '452423': '广西藤县',
      '452424': '广西昭平县',
      '452425': '广西蒙山县',
      '452426': '广西贺县',
      '452427': '广西钟山县',
      '452428': '广西富川瑶族自治县',
      '4525': '广西玉林地区',
      '452501': '广西玉林市',
      '452502': '广西贵港市',
      '452523': '广西桂平县',
      '452524': '广西平南县',
      '452525': '广西容县',
      '452526': '广西北流县',
      '452527': '广西陆川县',
      '452528': '广西博白县',
      '4526': '广西百色地区',
      '452601': '广西百色市',
      '452622': '广西田阳县',
      '452623': '广西田东县',
      '452624': '广西平果县',
      '452625': '广西德保县',
      '452626': '广西靖西县',
      '452627': '广西那坡县',
      '452628': '广西凌云县',
      '452629': '广西乐业县',
      '452630': '广西田林县',
      '452631': '广西隆林各族自治县',
      '452632': '广西西林县',
      '4527': '广西河池地区',
      '452701': '广西河池市',
      '452702': '广西宜州市',
      '452723': '广西罗城仫佬族自治县',
      '452724': '广西环江毛南族自治县',
      '452725': '广西南丹县',
      '452726': '广西天峨县',
      '452727': '广西凤山县',
      '452728': '广西东兰县',
      '452729': '广西巴马瑶族自治县',
      '452730': '广西都安瑶族自治县',
      '452731': '广西大化瑶族自治县',
      '4528': '广西钦州地区',
      '452802': '广西钦州市',
      '452824': '广西灵山县',
      '452826': '广西浦北县'
      ,
      '46': '海南省',
      '4600': '海南省三亚各市县',
      '460001': '海南省通什市',
      '460002': '海南省琼海市',
      '460003': '海南省儋州市',
      '460021': '海南省琼山县',
      '460022': '海南省文昌县',
      '460024': '海南省万宁县',
      '460025': '海南省定安县',
      '460026': '海南省屯昌县',
      '460027': '海南省澄迈县',
      '460028': '海南省临高县',
      '460030': '海南省白沙黎族自治县',
      '460031': '海南省昌江黎族自治县',
      '460032': '海南省东方黎族自治县',
      '460033': '海南省乐东黎族自治县',
      '460034': '海南省陵水黎族自治县',
      '460035': '海南省保亭黎族苗族自治县',
      '460036': '海南省琼中黎族苗族自治县',
      '460037': '海南省西沙群岛',
      '460038': '海南省南沙群岛',
      '460039': '海南省中沙群岛的岛礁及其海域',
      '4601': '海南省海口市',
      '460101': '海南省海口市市辖区',
      '460102': '海南省海口市振东区',
      '460103': '海南省海口市新华区',
      '460104': '海南省海口市秀英区',
      '4602': '海南省三亚市',
      '460201': '海南省三亚市市辖区'
      ,
      '500000': '重庆市',
      '500100': '重庆市市辖区',
      '500101': '重庆市万州区',
      '500102': '重庆市涪陵区',
      '500103': '重庆市渝中区',
      '500104': '重庆市大渡口区',
      '500105': '重庆市江北区',
      '500106': '重庆市沙坪坝区',
      '500107': '重庆市九龙坡区',
      '500108': '重庆市南岸区',
      '500109': '重庆市北碚区',
      '500110': '重庆市万盛区',
      '500111': '重庆市双桥区',
      '500112': '重庆市渝北区',
      '500113': '重庆市巴南区',
      '500114': '重庆市黔江区',
      '500115': '重庆市长寿区',
      '500200': '重庆市县',
      '500222': '重庆市綦江县',
      '500223': '重庆市潼南县',
      '500224': '重庆市铜梁县',
      '500225': '重庆市大足县',
      '500226': '重庆市荣昌县',
      '500227': '重庆市璧山县',
      '500228': '重庆市梁平县',
      '500229': '重庆市城口县',
      '500230': '重庆市丰都县',
      '500231': '重庆市垫江县',
      '500232': '重庆市武隆县',
      '500233': '重庆市忠县',
      '500234': '重庆市开县',
      '500235': '重庆市云阳县',
      '500236': '重庆市奉节县',
      '500237': '重庆市巫山县',
      '500238': '重庆市巫溪县',
      '500240': '重庆市石柱土家族自治县',
      '500241': '重庆市秀山土家族苗族自治县',
      '500242': '重庆市酉阳土家族苗族自治县',
      '500243': '重庆市彭水苗族土家族自治县',
      '500381': '重庆市江津市',
      '500382': '重庆市合川市',
      '500383': '重庆市永川市',
      '500384': '重庆市南川市'
      ,
      '51': '四川省',
      '5101': '四川省成都市',
      '510101': '四川省成都市市辖区',
      '510104': '四川省成都市锦江区',
      '510105': '四川省成都市青羊区',
      '510106': '四川省成都市金牛区',
      '510107': '四川省成都市武候区',
      '510108': '四川省成都市成华区',
      '510112': '四川省成都市龙泉驿区',
      '510113': '四川省成都市青白江区',
      '510121': '四川省金堂县',
      '510122': '四川省双流县',
      '510123': '四川省温江县',
      '510124': '四川省郫县',
      '510125': '四川省新都县',
      '510128': '四川省崇庆县',
      '510129': '四川省大邑县',
      '510130': '四川省邛崃县',
      '510131': '四川省蒲江县',
      '510132': '四川省新津县',
      '510181': '四川省都江堰市',
      '510182': '四川省彭州市',
      '5102': '四川省重庆市',
      '510201': '四川省重庆市市辖区',
      '510202': '四川省重庆市市中区',
      '510203': '四川省重庆市大渡口区',
      '510211': '四川省重庆市江北区',
      '510212': '四川省重庆市沙坪坝区',
      '510213': '四川省重庆市九龙坡区',
      '510214': '四川省重庆市南岸区',
      '510215': '四川省重庆市北碚区',
      '510216': '四川省重庆市万盛区',
      '510217': '四川省重庆市双桥区',
      '510221': '四川省长寿县',
      '510222': '四川省巴县',
      '510223': '四川省綦江县',
      '510224': '四川省江北县',
      '510227': '四川省潼南县',
      '510228': '四川省铜梁县',
      '510230': '四川省大足县',
      '510231': '四川省荣昌县',
      '510232': '四川省璧山县',
      '510281': '四川省永川市',
      '510282': '四川省江津市',
      '510283': '四川省合川市',
      '5103': '四川省自贡市',
      '510301': '四川省自贡市市辖区',
      '510302': '四川省自贡市自流井区',
      '510303': '四川省自贡市贡井区',
      '510304': '四川省自贡市大安区',
      '510311': '四川省自贡市沿滩区',
      '510321': '四川省荣县',
      '510322': '四川省富顺县',
      '5104': '四川省攀枝花市',
      '510401': '四川省攀枝花市市辖区',
      '510402': '四川省攀枝花市东区',
      '510403': '四川省攀枝花市西区',
      '510411': '四川省攀枝花市仁和区',
      '510421': '四川省米易县',
      '510422': '四川省盐边县',
      '5105': '四川省泸州市',
      '510501': '四川省泸州市市辖区',
      '510502': '四川省泸州市市中区',
      '510521': '四川省泸县',
      '510522': '四川省合江县',
      '510523': '四川省纳溪县',
      '510524': '四川省叙永县',
      '510525': '四川省古蔺县',
      '5106': '四川省德阳市',
      '510601': '四川省德阳市市辖区',
      '510602': '四川省德阳市市中区',
      '510622': '四川省绵竹县',
      '510623': '四川省中江县',
      '510625': '四川省什邡县',
      '510681': '四川省广汉市',
      '5107': '四川省绵阳市',
      '510701': '四川省绵阳市市辖区',
      '510703': '四川省绵阳市涪城区',
      '510704': '四川省绵阳市游仙区',
      '510722': '四川省三台县',
      '510723': '四川省盐亭县',
      '510724': '四川省安县',
      '510725': '四川省梓潼县',
      '510726': '四川省北川县',
      '510727': '四川省平武县',
      '510781': '四川省江油市',
      '5108': '四川省广元市',
      '510801': '四川省广元市市辖区',
      '510802': '四川省广元市市中区',
      '510811': '四川省广元市元坝区',
      '510812': '四川省广元市朝天区',
      '510821': '四川省旺苍县',
      '510822': '四川省青川县',
      '510823': '四川省剑阁县',
      '510824': '四川省苍溪县',
      '5109': '四川省遂宁市',
      '510901': '四川省遂宁市市辖区',
      '510902': '四川省遂宁市市中区',
      '510921': '四川省蓬溪县',
      '510922': '四川省射洪县',
      '5110': '四川省内江市',
      '511001': '四川省内江市市辖区',
      '511002': '四川省内江市市中区',
      '511011': '四川省内江市东兴区',
      '511022': '四川省乐至县',
      '511023': '四川省安岳县',
      '511024': '四川省威远县',
      '511025': '四川省资中县',
      '511027': '四川省简阳县',
      '511028': '四川省隆昌县',
      '511081': '四川省资阳市',
      '5111': '四川省乐山市',
      '511101': '四川省乐山市市辖区',
      '511102': '四川省乐山市市中区',
      '511111': '四川省乐山市沙湾区',
      '511112': '四川省乐山市五通桥区',
      '511113': '四川省乐山市金口河区',
      '511121': '四川省仁寿县',
      '511122': '四川省眉山县',
      '511123': '四川省犍为县',
      '511124': '四川省井研县',
      '511126': '四川省夹江县',
      '511127': '四川省洪雅县',
      '511128': '四川省彭山县',
      '511129': '四川省沐川县',
      '511130': '四川省青神县',
      '511131': '四川省丹棱县',
      '511132': '四川省峨边彝族自治县',
      '511133': '四川省马边彝族自治县',
      '511181': '四川省峨眉山市',
      '5112': '四川省万县市',
      '511201': '四川省万县市市辖区',
      '511202': '四川省万县市龙宝区',
      '511203': '四川省万县市天城区',
      '511204': '四川省万县市五桥区',
      '511221': '四川省开县',
      '511222': '四川省忠县',
      '511223': '四川省梁平县',
      '511224': '四川省云阳县',
      '511225': '四川省奉节县',
      '511226': '四川省巫山县',
      '511227': '四川省巫溪县',
      '511228': '四川省城口县',
      '5113': '四川省南充市',
      '511301': '四川省南充市市辖区',
      '511302': '四川省南充市顺庆区',
      '511303': '四川省南充市高坪区',
      '511304': '四川省南充市嘉陵区',
      '511321': '四川省南部县',
      '511322': '四川省营山县',
      '511323': '四川省蓬安县',
      '511324': '四川省仪陇县',
      '511325': '四川省西充县',
      '511381': '四川省阆中市',
      '5123': '四川省涪陵地区',
      '512301': '四川省涪陵市',
      '512322': '四川省垫江县',
      '512323': '四川省南川县',
      '512324': '四川省丰都县',
      '512326': '四川省武隆县',
      '5125': '四川省宜宾地区',
      '512501': '四川省宜宾市',
      '512527': '四川省宜宾县',
      '512528': '四川省南溪县',
      '512529': '四川省江安县',
      '512530': '四川省长宁县',
      '512531': '四川省高县',
      '512532': '四川省筠连县',
      '512533': '四川省珙县',
      '512534': '四川省兴文县',
      '512535': '四川省屏山县',
      '5130': '四川省达川地区',
      '513001': '四川省达川市',
      '513002': '四川省万源县',
      '513021': '四川省达县',
      '513022': '四川省宣汉县',
      '513023': '四川省开江县',
      '513029': '四川省大竹县',
      '513030': '四川省渠县',
      '5131': '四川省雅安地区',
      '513101': '四川省雅安市',
      '513122': '四川省名山县',
      '513123': '四川省荥经县',
      '513124': '四川省汉源县',
      '513125': '四川省石棉县',
      '513126': '四川省天全县',
      '513127': '四川省芦山县',
      '513128': '四川省宝兴县',
      '5132': '四川省阿坝藏族羌族自治州',
      '513221': '四川省汶川县',
      '513222': '四川省理县',
      '513223': '四川省茂县',
      '513224': '四川省松潘县',
      '513225': '四川省南坪县',
      '513226': '四川省金川县',
      '513227': '四川省小金县',
      '513228': '四川省黑水县',
      '513229': '四川省马尔康县',
      '513230': '四川省壤塘县',
      '513231': '四川省阿坝县',
      '513232': '四川省若尔盖县',
      '513233': '四川省红原县',
      '5133': '四川省甘孜藏族自治州',
      '513321': '四川省康定县',
      '513322': '四川省泸定县',
      '513323': '四川省丹巴县',
      '513324': '四川省九龙县',
      '513325': '四川省雅江县',
      '513326': '四川省道孚县',
      '513327': '四川省炉霍县',
      '513328': '四川省甘孜县',
      '513329': '四川省新龙县',
      '513330': '四川省德格县',
      '513331': '四川省白玉县',
      '513332': '四川省石渠县',
      '513333': '四川省色达县',
      '513334': '四川省理塘县',
      '513335': '四川省巴塘县',
      '513336': '四川省乡城县',
      '513337': '四川省稻城县',
      '513338': '四川省得荣县',
      '5134': '四川省凉山彝族自治州',
      '513401': '四川省西昌市',
      '513422': '四川省木里藏族自治县',
      '513423': '四川省盐源县',
      '513424': '四川省德昌县',
      '513425': '四川省会理县',
      '513426': '四川省会东县',
      '513427': '四川省宁南县',
      '513428': '四川省普格县',
      '513429': '四川省布拖县',
      '513430': '四川省金阳县',
      '513431': '四川省昭觉县',
      '513432': '四川省喜德县',
      '513433': '四川省冕宁县',
      '513434': '四川省越西县',
      '513435': '四川省甘洛县',
      '513436': '四川省美姑县',
      '513437': '四川省雷波县',
      '5135': '四川省黔江地区',
      '513521': '四川省石柱土家族自治县',
      '513522': '四川省秀山土家族苗族自治县',
      '513523': '四川省黔江土家族苗族自治县',
      '513524': '四川省酉阳土家族苗族自治县',
      '513525': '四川省彭水苗族土家族自治县',
      '5136': '四川省广安地区',
      '513601': '四川省华蓥市',
      '513621': '四川省岳池县',
      '513622': '四川省广安县',
      '513623': '四川省武胜县',
      '513624': '四川省邻水县',
      '5137': '四川省巴中地区',
      '513701': '四川省巴中市',
      '513721': '四川省通江县',
      '513722': '四川省南江县',
      '513723': '四川省平昌县'
      ,
      '52': '贵州省',
      '5201': '贵州省贵阳市',
      '520101': '贵州省贵阳市市辖区',
      '520102': '贵州省贵阳市南明区',
      '520103': '贵州省贵阳市云岩区',
      '520111': '贵州省贵阳市花溪区',
      '520112': '贵州省贵阳市乌当区',
      '520113': '贵州省贵阳市白云区',
      '5202': '贵州省六盘水市',
      '520201': '贵州省六盘水市钟山区',
      '520202': '贵州省六盘水市盘县特区',
      '520203': '贵州省六盘水市六枝特区',
      '520221': '贵州省水城县',
      '5221': '贵州省遵义地区',
      '522101': '贵州省遵义市',
      '522102': '贵州省赤水市',
      '522121': '贵州省遵义县',
      '522122': '贵州省桐梓县',
      '522123': '贵州省绥阳县',
      '522124': '贵州省正安县',
      '522125': '贵州省道真仡佬苗族自治县',
      '522126': '贵州省务川仡佬苗族自治县',
      '522127': '贵州省凤冈县',
      '522128': '贵州省湄潭县',
      '522129': '贵州省余庆县',
      '522130': '贵州省仁怀县',
      '522132': '贵州省习水县',
      '5222': '贵州省铜仁地区',
      '522201': '贵州省铜仁市',
      '522222': '贵州省江口县',
      '522223': '贵州省玉屏侗族自治县',
      '522224': '贵州省石阡县',
      '522225': '贵州省思南县',
      '522226': '贵州省印江土家族苗族自治县',
      '522227': '贵州省德江县',
      '522228': '贵州省沿河土家族自治县',
      '522229': '贵州省松桃苗族自治县',
      '522230': '贵州省万山特区',
      '5223': '贵州省黔西南布依族苗族自治州',
      '522301': '贵州省兴义市',
      '522322': '贵州省兴仁县',
      '522323': '贵州省普安县',
      '522324': '贵州省晴隆县',
      '522325': '贵州省贞丰县',
      '522326': '贵州省望谟县',
      '522327': '贵州省册亨县',
      '522328': '贵州省安龙县',
      '5224': '贵州省毕节地区',
      '522401': '贵州省毕节市',
      '522422': '贵州省大方县',
      '522423': '贵州省黔西县',
      '522424': '贵州省金沙县',
      '522425': '贵州省织金县',
      '522426': '贵州省纳雍县',
      '522427': '贵州省威宁彝族回族苗族自治县',
      '522428': '贵州省赫章县',
      '5225': '贵州省安顺地区',
      '522501': '贵州省安顺市',
      '522502': '贵州省清镇市',
      '522522': '贵州省开阳县',
      '522523': '贵州省息烽县',
      '522524': '贵州省修文县',
      '522526': '贵州省平坝县',
      '522527': '贵州省普定县',
      '522528': '贵州省关岭布依族苗族自治县',
      '522529': '贵州省镇宁布依族苗族自治县',
      '522530': '贵州省紫云苗族布依族自治县',
      '5226': '贵州省黔东南苗族侗族自治州',
      '522601': '贵州省凯里市',
      '522622': '贵州省黄平县　',
      '522623': '贵州省施秉县',
      '522624': '贵州省三穗县',
      '522625': '贵州省镇远县',
      '522626': '贵州省岑巩县',
      '522627': '贵州省天柱县',
      '522628': '贵州省锦屏县',
      '522629': '贵州省剑河县',
      '522630': '贵州省台江县',
      '522631': '贵州省黎平县',
      '522632': '贵州省榕江县',
      '522633': '贵州省从江县',
      '522634': '贵州省雷山县',
      '522635': '贵州省麻江县',
      '522636': '贵州省丹寨县',
      '5227': '贵州省黔南布依族苗族自治州',
      '522701': '贵州省都匀市',
      '522722': '贵州省荔波县',
      '522723': '贵州省贵定县',
      '522724': '贵州省福泉县',
      '522725': '贵州省瓮安县',
      '522726': '贵州省独山县',
      '522727': '贵州省平塘县',
      '522728': '贵州省罗甸县',
      '522729': '贵州省长顺县',
      '522730': '贵州省龙里县',
      '522731': '贵州省惠水县',
      '522732': '贵州省三都水族自治县'
      ,
      '53': '云南省',
      '5301': '云南省昆明市',
      '530101': '云南省昆明市市辖区',
      '530102': '云南省昆明市五华区',
      '530103': '云南省昆明市盘龙区',
      '530111': '云南省昆明市官渡区',
      '530112': '云南省昆明市西山区',
      '530121': '云南省呈贡县',
      '530122': '云南省晋宁县',
      '530123': '云南省安宁县',
      '530124': '云南省富民县',
      '530125': '云南省宜良县',
      '530126': '云南省路南彝族自治县',
      '530127': '云南省嵩明县',
      '530128': '云南省禄劝彝族苗族自治区',
      '5302': '云南省东川市',
      '530201': '云南省东川市市辖区',
      '5321': '云南省昭通地区',
      '532101': '云南省昭通市',
      '532122': '云南省鲁甸县',
      '532123': '云南省巧家县',
      '532124': '云南省盐津县',
      '532125': '云南省大关县',
      '532126': '云南省永善县',
      '532127': '云南省绥江县',
      '532128': '云南省镇雄县',
      '532129': '云南省彝良县',
      '532130': '云南省威信县',
      '532131': '云南省水富县',
      '5322': '云南省曲靖地区',
      '532201': '云南省曲靖市',
      '532223': '云南省马龙县',
      '532224': '云南省宜威县',
      '532225': '云南省富源县',
      '532226': '云南省罗平县',
      '532227': '云南省师宗县',
      '532228': '云南省陆良县',
      '532231': '云南省寻甸回族彝族自治县',
      '532233': '云南省会泽县',
      '5323': '云南省楚雄彝族自治州',
      '532301': '云南省楚雄市',
      '532322': '云南省双柏县',
      '532323': '云南省牟定县',
      '532324': '云南省南华县',
      '532325': '云南省姚安县',
      '532326': '云南省大姚县',
      '532327': '云南省永仁县',
      '532328': '云南省元谋县',
      '532329': '云南省武定县',
      '532331': '云南省禄丰县',
      '5324': '云南省玉溪地区',
      '532401': '云南省玉溪市',
      '532422': '云南省江川县',
      '532423': '云南省澄江县',
      '532424': '云南省通海县',
      '532425': '云南省华宁县',
      '532426': '云南省易门县',
      '532427': '云南省峨山彝族自治县',
      '532428': '云南省新平彝族傣族自治县',
      '532429': '云南省元江哈尼族彝族自治县',
      '5325': '云南省红河哈尼族彝族自治州',
      '532501': '云南省个旧市',
      '532502': '云南省开远市',
      '532522': '云南省蒙自县',
      '532523': '云南省屏边苗族自治县',
      '532524': '云南省建水县',
      '532525': '云南省石屏县',
      '532526': '云南省弥勒县',
      '532527': '云南省泸西县',
      '532528': '云南省元阳县',
      '532529': '云南省红河县',
      '532530': '云南省金平苗族瑶族傣族自治县',
      '532531': '云南省绿春县',
      '532532': '云南省河口瑶族自治县',
      '5326': '云南省文山壮族苗族自治州',
      '532621': '云南省文山县',
      '532622': '云南省砚山县',
      '532623': '云南省西畴县',
      '532624': '云南省麻栗坡县',
      '532625': '云南省马关县',
      '532626': '云南省丘北县',
      '532627': '云南省广南县',
      '532628': '云南省富宁县',
      '5327': '云南省思茅地区',
      '532701': '云南省思茅市',
      '532722': '云南省普洱哈尼族继族自治区',
      '532723': '云南省墨江哈尼族自治县',
      '532724': '云南省景东彝族自治区',
      '532725': '云南省景谷傣族彝族自治区',
      '532726': '云南省镇沅彝族哈尼族拉祜族自治',
      '532727': '云南省江城哈尼族彝族自治县',
      '532728': '云南省孟连傣族拉祜族佤族自治县',
      '532729': '云南省澜沧拉祜族自治县',
      '532730': '云南省西盟佤族自治县',
      '5328': '云南省西双版纳傣族自治州',
      '532801': '云南省景洪市',
      '532822': '云南省勐海县',
      '532823': '云南省勐腊县',
      '5329': '云南省大理白族自治州',
      '532901': '云南省大理市',
      '532922': '云南省漾濞彝族自治县',
      '532923': '云南省祥云县',
      '532924': '云南省宾川县',
      '532925': '云南省弥渡县',
      '532926': '云南省南涧彝族自治县',
      '532927': '云南省巍山彝族回族自治县',
      '532928': '云南省永平县',
      '532929': '云南省云龙县',
      '532930': '云南省洱源县',
      '532931': '云南省剑川县',
      '532932': '云南省鹤庆县',
      '5330': '云南省保山地区',
      '533001': '云南省保山市',
      '533022': '云南省施甸县',
      '533023': '云南省腾冲县',
      '533024': '云南省龙陵县',
      '533025': '云南省昌宁县',
      '5331': '云南省德宏傣族景颇族自治州',
      '533101': '云南省畹町市',
      '533102': '云南省瑞丽市',
      '533121': '云南省潞西县',
      '533122': '云南省梁河县',
      '533123': '云南省盈江县',
      '533124': '云南省陇川县',
      '5332': '云南省丽江地区',
      '533221': '云南省丽江纳西族自治县',
      '533222': '云南省永胜县',
      '533223': '云南省华坪县',
      '533224': '云南省宁蒗彝族自治县',
      '5333': '云南省怒江傈僳族自治州',
      '533321': '云南省泸水县',
      '533323': '云南省福贡县',
      '533324': '云南省贡山独龙族怒族自治县',
      '533325': '云南省兰坪白族普米族自治县',
      '5334': '云南省迪庆藏族自治州',
      '533421': '云南省中甸县',
      '533422': '云南省德钦县',
      '533423': '云南省维西傈傈族自治县',
      '5335': '云南省临沧地区',
      '533521': '云南省临沧县',
      '533522': '云南省凤庆县',
      '533523': '云南省云县',
      '533524': '云南省永德县',
      '533525': '云南省镇康县',
      '533526': '云南省双江拉祜族佤族布朗族傣族',
      '533527': '云南省耿马傣族佤族自治县',
      '533528': '云南省沧源佤族自治县'
      ,
      '54': '西藏自治区',
      '5401': '西藏拉萨市',
      '540101': '西藏拉萨市市辖区',
      '540102': '西藏拉萨市城关区',
      '540121': '西藏林周县',
      '540122': '西藏当雄县',
      '540123': '西藏尼木县',
      '540124': '西藏曲水县',
      '540125': '西藏堆龙德庆县',
      '540126': '西藏达孜县',
      '540127': '西藏墨竹工卡县',
      '5421': '西藏昌都地区',
      '542121': '西藏昌都县',
      '542122': '西藏江达县',
      '542123': '西藏贡觉县',
      '542124': '西藏类乌齐县',
      '542125': '西藏丁青县',
      '542126': '西藏察雅县',
      '542127': '西藏八宿县',
      '542128': '西藏左贡县',
      '542129': '西藏芒康县',
      '542132': '西藏洛隆县',
      '542133': '西藏边坝县',
      '542134': '西藏盐井县',
      '542135': '西藏碧土县',
      '542136': '西藏妥坝县',
      '542137': '西藏生达县',
      '5422': '西藏山南地区',
      '542221': '西藏乃东县',
      '542222': '西藏扎襄县',
      '542223': '西藏贡嘎县',
      '542224': '西藏桑日县',
      '542225': '西藏琼结县',
      '542226': '西藏曲松县',
      '542227': '西藏措美县',
      '542228': '西藏洛扎县',
      '542229': '西藏加查县',
      '542231': '西藏隆子县',
      '542232': '西藏错那县',
      '542233': '西藏浪卡子县',
      '5423': '西藏日喀则地区',
      '542301': '西藏日喀则市',
      '542322': '西藏南木林县',
      '542323': '西藏江孜县',
      '542324': '西藏定日县',
      '542325': '西藏萨迦县',
      '542326': '西藏拉孜县',
      '542327': '西藏昂仁县',
      '542328': '西藏谢通门县',
      '542329': '西藏白朗县',
      '542330': '西藏仁布县',
      '542331': '西藏康马县',
      '542332': '西藏定结县',
      '542333': '西藏仲巴县',
      '542334': '西藏亚东县',
      '542335': '西藏吉隆县',
      '542336': '西藏聂拉木县',
      '542337': '西藏萨嘎县',
      '542338': '西藏岗巴县',
      '5424': '西藏那曲地区',
      '542421': '西藏那曲县',
      '542422': '西藏嘉黎县',
      '542423': '西藏比如县',
      '542424': '西藏聂荣县',
      '542425': '西藏安多县',
      '542426': '西藏申扎县',
      '542427': '西藏索县',
      '542428': '西藏班戈县',
      '542429': '西藏巴青县',
      '542430': '西藏尼玛县',
      '5425': '西藏阿里地区',
      '542521': '西藏普兰县',
      '542522': '西藏札达县',
      '542523': '西藏噶尔县',
      '542524': '西藏日土县',
      '542525': '西藏革吉县',
      '542526': '西藏改则县',
      '542527': '西藏措勤县',
      '542528': '西藏隆格尔县',
      '5426': '西藏林芝地区',
      '542621': '西藏林芝县',
      '542622': '西藏工布江达县',
      '542623': '西藏米林县',
      '542624': '西藏墨脱县',
      '542625': '西藏波密县',
      '542626': '西藏察隅县',
      '542627': '西藏朗县'
      ,
      '61': '陕西省',
      '6101': '陕西省西安市',
      '610101': '陕西省西安市市辖区',
      '610102': '陕西省西安市新城区',
      '610103': '陕西省西安市碑林区',
      '610104': '陕西省西安市莲湖区',
      '610111': '陕西省西安市灞桥区',
      '610112': '陕西省西安市未央区',
      '610113': '陕西省西安市雁塔区',
      '610114': '陕西省西安市阎良区',
      '610121': '陕西省长安县',
      '610122': '陕西省蓝田县',
      '610123': '陕西省临潼县',
      '610124': '陕西省周至县',
      '610125': '陕西省户县',
      '610126': '陕西省高陵县',
      '6102': '陕西省铜川市',
      '610201': '陕西省铜川市市辖区',
      '610202': '陕西省铜川市城区',
      '610203': '陕西省铜川市郊区',
      '610221': '陕西省耀县',
      '610222': '陕西省宜君县',
      '6103': '陕西省宝鸡市',
      '610301': '陕西省宝鸡市市辖区',
      '610302': '陕西省宝鸡市渭滨区',
      '610303': '陕西省宝鸡市金台区',
      '610321': '陕西省宝鸡县',
      '610322': '陕西省凤翔县',
      '610323': '陕西省岐山县',
      '610324': '陕西省扶风县',
      '610326': '陕西省眉县',
      '610327': '陕西省陇县',
      '610328': '陕西省千阳县',
      '610329': '陕西省麟游县',
      '610330': '陕西省凤县',
      '610331': '陕西省太白县',
      '6104': '陕西省咸阳市',
      '610401': '陕西省咸阳市市辖区',
      '610402': '陕西省咸阳市秦都区',
      '610403': '陕西省咸阳市杨陵区',
      '610404': '陕西省咸阳市渭城区',
      '610422': '陕西省三原县',
      '610423': '陕西省泾阳县',
      '610424': '陕西省乾县',
      '610425': '陕西省礼泉县',
      '610426': '陕西省永寿县',
      '610427': '陕西省彬县',
      '610428': '陕西省长武县',
      '610429': '陕西省旬邑县',
      '610430': '陕西省淳化县',
      '610431': '陕西省武功县',
      '610481': '陕西省兴平市',
      '6121': '陕西省渭南地区',
      '612101': '陕西省渭南市',
      '612102': '陕西省韩城市',
      '612103': '陕西省华阴市',
      '612124': '陕西省华县',
      '612126': '陕西省潼关县',
      '612127': '陕西省大荔县',
      '612128': '陕西省蒲城县',
      '612129': '陕西省澄城县',
      '612130': '陕西省白水县',
      '612132': '陕西省合阳县',
      '612133': '陕西省富平县',
      '6123': '陕西省汉中地区',
      '612301': '陕西省汉中市',
      '612321': '陕西省南郑县',
      '612322': '陕西省城固县',
      '612323': '陕西省洋县',
      '612324': '陕西省西乡县',
      '612325': '陕西省勉县',
      '612326': '陕西省宁强县',
      '612327': '陕西省略阳县',
      '612328': '陕西省镇巴县',
      '612329': '陕西省留坝县',
      '612330': '陕西省佛坪县',
      '6124': '陕西省安康地区',
      '612401': '陕西省安康市',
      '612422': '陕西省汉阳县',
      '612423': '陕西省石泉县',
      '612424': '陕西省宁陕县',
      '612425': '陕西省紫阳县',
      '612426': '陕西省岚皋县',
      '612427': '陕西省平利县',
      '612428': '陕西省镇坪县',
      '612429': '陕西省旬阳县',
      '612430': '陕西省白河县',
      '6125': '陕西省商洛地区',
      '612501': '陕西省商州市',
      '612522': '陕西省洛南县',
      '612523': '陕西省丹风县',
      '612524': '陕西省商南县',
      '612525': '陕西省山阳县',
      '612526': '陕西省镇安县',
      '612527': '陕西省柞水县',
      '6126': '陕西省延安地区',
      '612601': '陕西省延安市',
      '612621': '陕西省延长县',
      '612622': '陕西省延川县',
      '612623': '陕西省子长县',
      '612624': '陕西省安塞县',
      '612625': '陕西省志丹县',
      '612626': '陕西省吴旗县',
      '612627': '陕西省甘泉县',
      '612628': '陕西省富县',
      '612629': '陕西省洛川县',
      '612630': '陕西省宜川县',
      '612631': '陕西省黄龙县',
      '612632': '陕西省黄陵县',
      '6127': '陕西省榆林地区',
      '612701': '陕西省榆林市',
      '612722': '陕西省神木县',
      '612723': '陕西省府谷县',
      '612724': '陕西省横山县',
      '612725': '陕西省靖边县',
      '612726': '陕西省定边县',
      '612727': '陕西省绥德县',
      '612728': '陕西省米脂县',
      '612729': '陕西省佳县',
      '612730': '陕西省吴堡县',
      '612731': '陕西省清涧县',
      '612732': '陕西省子洲县'
      ,
      '62': '甘肃省',
      '6201': '甘肃省兰州市',
      '620101': '甘肃省兰州市市辖区',
      '620102': '甘肃省兰州市城关区',
      '620103': '甘肃省兰州市七里河区',
      '620104': '甘肃省兰州市西固区',
      '620105': '甘肃省兰州市安宁区',
      '620111': '甘肃省兰州市红古区',
      '620121': '甘肃省永登县',
      '620122': '甘肃省皋兰县',
      '620123': '甘肃省榆中县',
      '6202': '甘肃省嘉峪关市',
      '620201': '甘肃省嘉峪关市市辖区',
      '6203': '甘肃省金昌市',
      '620301': '甘肃省金昌市市辖区',
      '620302': '甘肃省金昌市金川区',
      '620321': '甘肃省永昌县',
      '6204': '甘肃省白银市',
      '620401': '甘肃省白银市市辖区',
      '620402': '甘肃省白银市白银区',
      '620403': '甘肃省白银市平川区',
      '620421': '甘肃省清远县',
      '620422': '甘肃省会宁县',
      '620423': '甘肃省景泰县',
      '6205': '甘肃省天水市',
      '620501': '甘肃省天水市市辖区',
      '620502': '甘肃省天水市秦城区',
      '620503': '甘肃省天水市北道区',
      '620521': '甘肃省清水县',
      '620522': '甘肃省秦安县',
      '620523': '甘肃省甘谷县',
      '620524': '甘肃省武山县',
      '620525': '甘肃省张家川回族自治县',
      '6221': '甘肃省酒泉地区',
      '622101': '甘肃省玉门市',
      '622102': '甘肃省酒泉市',
      '622103': '甘肃省敦煌市',
      '622123': '甘肃省金塔县',
      '622124': '甘肃省肃北蒙古族自治县',
      '622125': '甘肃省阿克塞哈萨克族自治县',
      '622126': '甘肃省安西县',
      '6222': '甘肃省张掖地区',
      '622201': '甘肃省张掖市',
      '622222': '甘肃省肃南裕固族自治县',
      '622223': '甘肃省民乐县',
      '622224': '甘肃省临泽县',
      '622225': '甘肃省高台县',
      '622226': '甘肃省山丹县',
      '6223': '甘肃省武威地区',
      '622301': '甘肃省武威市',
      '622322': '甘肃省民勤县　',
      '622323': '甘肃省古浪县',
      '622326': '甘肃省天祝藏族自治县',
      '6224': '甘肃省定西地区',
      '622421': '甘肃省定西县',
      '622424': '甘肃省通渭县',
      '622425': '甘肃省陇西县',
      '622426': '甘肃省渭源县',
      '622427': '甘肃省临洮县',
      '622428': '甘肃省漳县',
      '622429': '甘肃省岷县',
      '6226': '甘肃省陇南地区',
      '622621': '甘肃省武都县',
      '622623': '甘肃省宕昌县',
      '622624': '甘肃省成县',
      '622625': '甘肃省康县',
      '622626': '甘肃省文县',
      '622627': '甘肃省西和县',
      '622628': '甘肃省礼县',
      '622629': '甘肃省两当县',
      '622630': '甘肃省徽县',
      '6227': '甘肃省平凉地区',
      '622701': '甘肃省平凉市',
      '622722': '甘肃省泾川县',
      '622723': '甘肃省灵台县',
      '622724': '甘肃省崇信县',
      '622725': '甘肃省华亭县',
      '622726': '甘肃省庄浪县',
      '622727': '甘肃省静宁县',
      '6228': '甘肃省庆阳地区',
      '622801': '甘肃省西峰市',
      '622821': '甘肃省庆阳县',
      '622822': '甘肃省环县',
      '622823': '甘肃省华池县',
      '622824': '甘肃省合水县',
      '622825': '甘肃省正宁县',
      '622826': '甘肃省宁县',
      '622827': '甘肃省镇原县',
      '6229': '甘肃省临夏回族自治州',
      '622901': '甘肃省临夏市',
      '622921': '甘肃省临夏县',
      '622922': '甘肃省康乐县',
      '622923': '甘肃省永靖县',
      '622924': '甘肃省广河县',
      '622925': '甘肃省和政县',
      '622926': '甘肃省东乡族自治县',
      '622927': '甘肃省积石山保安族东乡族撒拉族',
      '6230': '甘肃省甘南藏族自治州',
      '623021': '甘肃省临潭县',
      '623022': '甘肃省卓尼县',
      '623023': '甘肃省舟曲县',
      '623024': '甘肃省迭部县',
      '623025': '甘肃省玛曲县',
      '623026': '甘肃省碌曲县',
      '623027': '甘肃省夏河县'
      ,
      '63': '青海省',
      '6301': '青海省西宁市',
      '630101': '青海省西宁市市辖区',
      '630102': '青海省西宁市城东区',
      '630103': '青海省西宁市城中区',
      '630104': '青海省西宁市城西区',
      '630105': '青海省西宁市城北区',
      '630121': '青海省大通回族土族自治县',
      '6321': '青海省海东地区',
      '632121': '青海省平安县',
      '632122': '青海省民和回族土族自治县',
      '632123': '青海省乐都县',
      '632124': '青海省湟中县',
      '632125': '青海省湟源县',
      '632126': '青海省互助土族自治县',
      '632127': '青海省化隆回族自治县',
      '632128': '青海省循化撒拉族自治县',
      '6322': '青海省海北藏族自治州',
      '632221': '青海省门源回族自治县',
      '632222': '青海省祁连县',
      '632223': '青海省海晏县',
      '632224': '青海省刚察县',
      '6323': '青海省黄南藏族自治州',
      '632321': '青海省同仁县',
      '632322': '青海省尖扎县',
      '632323': '青海省泽库县',
      '632324': '青海省河南蒙古族自治县',
      '6325': '青海省海南藏族自治州',
      '632521': '青海省共和县',
      '632522': '青海省同德县',
      '632523': '青海省贵德县',
      '632524': '青海省兴海县',
      '632525': '青海省贵南县',
      '6326': '青海省果洛藏族自治州',
      '632621': '青海省玛沁县',
      '632622': '青海省班玛县',
      '632623': '青海省甘德县',
      '632624': '青海省达日县',
      '632625': '青海省久治县',
      '632626': '青海省玛多县',
      '6327': '青海省玉树藏族自治州',
      '632721': '青海省玉树县',
      '632722': '青海省杂多县',
      '632723': '青海省称多县',
      '632724': '青海省治多县',
      '632725': '青海省囊谦县',
      '632726': '青海省曲麻莱县',
      '6328': '青海省海西蒙古族藏族自治州',
      '632801': '青海省格尔木市',
      '632802': '青海省德令哈市',
      '632821': '青海省乌兰县',
      '632822': '青海省都兰县',
      '632823': '青海省天峻县',
      '64': '宁夏',
      '6401': '宁夏银川市',
      '640101': '宁夏银川市市辖区',
      '640102': '宁夏银川市城区',
      '640103': '宁夏银川市新城区',
      '640111': '宁夏银川市郊区',
      '640121': '宁夏永宁县',
      '640122': '宁夏贺兰县',
      '6402': '宁夏石嘴山市',
      '640201': '宁夏石嘴山市市辖区',
      '640202': '宁夏石嘴山市大武口区',
      '640203': '宁夏石嘴山市石嘴山区',
      '640204': '宁夏石嘴山市石炭井区',
      '640221': '宁夏平罗县',
      '640222': '宁夏陶乐县',
      '640223': '宁夏惠农县',
      '6421': '宁夏银南地区',
      '642101': '宁夏吴忠市',
      '642102': '宁夏青铜峡市',
      '642123': '宁夏中卫县',
      '642124': '宁夏中宁县',
      '642125': '宁夏灵武县',
      '642126': '宁夏盐池县',
      '642127': '宁夏同心县',
      '6422': '宁夏固原地区',
      '642221': '宁夏固原县',
      '642222': '宁夏海原县',
      '642223': '宁夏西吉县',
      '642224': '宁夏隆德县',
      '642225': '宁夏泾源县',
      '642226': '宁夏彭阳县'
      ,
      '65': '新疆',
      '6501': '新疆乌鲁木齐市',
      '650101': '新疆乌鲁木齐市市辖区',
      '650102': '新疆乌鲁木齐市天山区',
      '650103': '新疆乌鲁木齐市沙衣巴克区',
      '650104': '新疆乌鲁木齐市新市区',
      '650105': '新疆乌鲁木齐市水磨沟区',
      '650106': '新疆乌鲁木齐市头屯河区',
      '650107': '新疆乌鲁木齐市南山矿区',
      '650108': '新疆乌鲁木齐市东山区',
      '650121': '新疆乌鲁木齐县',
      '6502': '新疆克拉玛依市',
      '650201': '新疆克拉玛依市市辖区',
      '650202': '新疆克拉玛依市独山子区',
      '650203': '新疆克拉玛依市克拉玛依区',
      '650204': '新疆克拉玛依市白碱滩区',
      '650205': '新疆克拉玛依市乌尔禾区',
      '6521': '新疆吐鲁番地区',
      '652101': '新疆吐鲁番市',
      '652122': '新疆鄯善县',
      '652123': '新疆托克逊县',
      '6522': '新疆哈密地区',
      '652201': '新疆哈密市',
      '652222': '新疆巴里坤哈萨克自治县',
      '652223': '新疆伊吾县',
      '6523': '新疆昌吉回族自治州',
      '652301': '新疆昌吉市',
      '652302': '新疆阜康市',
      '652322': '新疆米泉县',
      '652323': '新疆呼图壁县',
      '652324': '新疆玛纳斯县',
      '652325': '新疆奇台县',
      '652327': '新疆吉木萨尔县',
      '652328': '新疆木垒哈萨克自治县',
      '6527': '新疆博尔塔拉蒙古自治州',
      '652701': '新疆博乐市',
      '652722': '新疆精河县',
      '652723': '新疆温泉县',
      '6528': '新疆巴音郭楞蒙古自治州',
      '652801': '新疆库尔勒市',
      '652822': '新疆轮台县',
      '652823': '新疆尉梨县',
      '652824': '新疆若羌县',
      '652825': '新疆且未县',
      '652826': '新疆焉耆回族自治县',
      '652827': '新疆和静县',
      '652828': '新疆和硕县',
      '652829': '新疆博湖县',
      '6529': '新疆阿克苏地区',
      '652901': '新疆阿克苏市',
      '652922': '新疆温宿县',
      '652923': '新疆库车县',
      '652924': '新疆沙雅县',
      '652925': '新疆新和县',
      '652926': '新疆拜城县',
      '652927': '新疆乌什县',
      '652928': '新疆阿瓦提县',
      '652929': '新疆柯坪县',
      '6530': '新疆克孜勒苏柯尔克孜自治州',
      '653001': '新疆阿图什市',
      '653022': '新疆阿克陶县',
      '653023': '新疆阿合奇县',
      '653024': '新疆乌恰县',
      '6531': '新疆喀什地区',
      '653101': '新疆喀什市',
      '653121': '新疆疏附县',
      '653122': '新疆疏勒县',
      '653123': '新疆英吉沙县',
      '653124': '新疆泽普县',
      '653125': '新疆莎车县',
      '653126': '新疆叶城县',
      '653127': '新疆麦盖提县',
      '653128': '新疆岳普湖县',
      '653129': '新疆伽师县',
      '653130': '新疆巴楚县',
      '653131': '新疆塔什库尔干塔吉克自治县',
      '6532': '新疆和田地区',
      '653201': '新疆和田市',
      '653221': '新疆和田县',
      '653222': '新疆墨玉县',
      '653223': '新疆皮山县',
      '653224': '新疆洛浦县',
      '653225': '新疆策勒县',
      '653226': '新疆于田县',
      '653227': '新疆民丰县',
      '6540': '新疆伊犁哈萨克自治州',
      '654001': '新疆奎屯市',
      '6541': '新疆伊犁地区',
      '654101': '新疆伊宁市',
      '654121': '新疆伊宁县',
      '654122': '新疆察布查尔锡伯自治县',
      '654123': '新疆霍城县',
      '654124': '新疆巩留县',
      '654125': '新疆新源县',
      '654126': '新疆昭苏县',
      '654127': '新疆特克斯县',
      '654128': '新疆尼勒克县',
      '6542': '新疆塔城地区',
      '654201': '新疆塔城市',
      '654221': '新疆额敏县',
      '654222': '新疆乌苏县',
      '654223': '新疆沙湾县',
      '654224': '新疆托里县',
      '654225': '新疆裕民县',
      '654226': '新疆和布克赛尔蒙古自治县',
      '6543': '新疆阿勒泰地区',
      '654301': '新疆阿勒泰市',
      '654321': '新疆布尔津县',
      '654322': '新疆富蕴县',
      '654323': '新疆福海县',
      '654324': '新疆哈巴河县',
      '654325': '新疆青河县',
      '654326': '新疆吉木乃县',
      '6590': '新疆省直辖行政单位',
      '659001': '新疆石河子市'
      ,
      '71': '台湾省',
      '7100': '台湾',
      '710000': '台湾省',
      '72': '香港',
      '7200': '香港特别行政区',
      '720000': '香港特别行政区',
      '73': '澳门',
      '7300': '澳门特别行政区',
      '91': '国外'
    }];
    return getArea(6);
    function getArea(num) {
      var cityId = sId.substr(0, num); //截取身份证前6位进行比对
      for (var i = 0; i < areaJson.length; i++) {
        for (var key in areaJson[i]) {
          if (cityId == key) {
            return areaJson[i][key];
          }
        }
      }
      if (num >= 2) { //如果前6位没有找到，则用前4位去比对；前4位还没找到，则用前2位比对
        return getArea(num - 2);
      } else {
        //        layer.msg("【"+cityId+"】没有找到省市",{shift:6});
        return false;
      }
    }
  }
  /*
   * 移除左右空格
   * params: str 	字符串
   * result: string
   */
  function tirm(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  /*
   * 获取出生日期
   * params: sId 	身份证
   * result: json 	false-msg,true-data(json)
   */
  function getBirth(sId) {
    sId = "" + sId;
    var isCardIDRs = isCardID(sId);
    if (!isCardIDRs) {
      return isCardIDRs;
    }
    var year = sId.substr(6, 4),
        month = sId.substr(10, 2),
        day = sId.substr(12, 2);
    var gBirth = year + "-" + month + "-" + day;
    var date = new Date(gBirth);
    if (date == 'Invalid Date') {
      layer.msg("【" + gBirth + "】出生日期错误", {
        shift: 6
      });
      return false;
    }
    return gBirth;
  }
  /*
   * 获取性别
   * params: sId 	身份证
   * result: json 	false-msg,true-data(json)
   */
  function getSex(sId) {
    sId = "" + sId;
    var isCardIDRs = isCardID(sId);
    if (!isCardIDRs) {
      return isCardIDRs;
    }
    var sexId = sId.substr(16, 1);
    var sex = sexId % 2 === 0 ? "女" : "男";
    return sex;
  }
  /*
   * 获取年龄
   * params: sId 	身份证
   * result: json 	false-msg,true-data(json)
   */
  function getAge(sId) {
    sId = "" + sId;
    var rsJ = getBirth(sId);
    if (!rsJ) {
      return rsJ;
    }
    var birth = rsJ.data.birth;
    var age = dateDiff('y', new Date(birth), new Date());
    return age;
  }
  /*
   * 计算日期差
   * params: interval 	计算标识
   * params: date1 		开始日期
   * params: date2 		结束日期
   * result: number
   */
  function dateDiff(interval, date1, date2) {
    var long = date2.getTime() - date1.getTime();
    switch (interval.toLowerCase()) {
      case "y":
        return parseInt(date2.getFullYear() - date1.getFullYear());
      case "m":
        return parseInt((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
      case "d":
        return parseInt(long / 1000 / 60 / 60 / 24);
      case "w":
        return parseInt(long / 1000 / 60 / 60 / 24 / 7);
      case "h":
        return parseInt(long / 1000 / 60 / 60);
      case "n":
        return parseInt(long / 1000 / 60);
      case "s":
        return parseInt(long / 1000);
      case "l":
        return parseInt(long);
    }
  }
  /* 其他费用项目 */
  //计算当前订单人数
  function totalPer() {
    var aduNum = $("#aduNum").val() == "" || $("#adultPrice").text() == "-" ? 0 : parseInt($("#aduNum").val());
    var chdNum = $("#chdNum").val() == "" || $("#childPrice").text() == "-" ? 0 : parseInt($("#chdNum").val());
    var aduNum1 = $("#aduNum1").val() == "" || $("#adultPrice1").text() == "-" ? 0 : parseInt($("#aduNum1").val());
    var aduNum2 = $("#aduNum2").val() == "" || $("#adultPrice2").text() == "-" ? 0 : parseInt($("#aduNum2").val());
    var chdNum1 = $("#chdNum1").val() == ""|| $("#childPrice1").text() == "-" ? 0 : parseInt($("#chdNum1").val());
    return aduNum + chdNum + aduNum1 + aduNum2 + chdNum1;
  }
  //账单费用明细显示其他项目费用
  function showOtherBillDetails() {
    var title = "",
        price = 0,
        num = 0,
        doms = "",
        total = 0;
    $("#otherBillList").find(".checkbox").each(function (e, ele) {
      if ($(this).prop("checked")) {
        title = $(ele).siblings(".title").text();
        price = parseFloat($(ele).siblings(".price").text());
        num = parseInt($(ele).siblings(".personNum").text());
        total += price * num;
        if(title.length>10){
          title=title.substring(0,10)+"...";
        }
        doms += "<p class='check_amount_child clear'><span class='fl'>" + title + "</span>";
        doms += "<span class='fr'><span class='price'>" + price + "</span>x";
        doms += "<span class='number'>" + num + "</span></span></p>";
      }
    })
    $(".other_amount_all_price").text(total.toFixed(2));
    $("#other_amount_list").empty().append(doms);
  }
  //获取其他项目费用列表
  function getOtherBill() {
    $.ajax({
      type: "post",
      url: "/sys/service/business/baseLineOtherPrice/search",
      data: JSON.stringify({
        "lineId": Number(lineID),
        "orderBy": "by_sort desc"
      }),
      contentType: "application/json;charset=utf-8",
      success: function (res) {
        if (res.executeStatus == 0) {
          if (res.values.length > 0) {
            $("#otherBill").css("display", "block");
            $(".other_amount_all").css("display", "block");
            $("#discount .num").text("7");
            var bills = "";
            for (var i = 0; i < res.values.length; i++) {
              if (res.values[i].optional == '0') {
                bills +=
                  "<div class='otherBillItem'><input type='checkbox' name='' class='checkbox' checked disabled/>";
              } else {
                bills += "<div class='otherBillItem'><input type='checkbox' name='' class='checkbox'/>";
              }
              bills += "<span class='title'>" + res.values[i].name + "";
              if (res.values[i].comment != "") {
                bills += "<i class='tips' title=" + res.values[i].comment + "></i></span>";
              } else {
                bills += "</span>"
              }
              bills += "<span class='price'>" + res.values[i].price + "</span>元/人";
              if (res.values[i].optional == '1') {
                bills += "<div class='clear operatePer'><label class='countsub'>-</label>";
                bills += "<input type='text' value='0' name='number' id=''  />";
                bills += "<label class='countadd'>+</label></div>";
                bills += "<span class='personNum optionalNum'>0</span>人</div>";
              } else {
                bills += "<span class='personNum requiredNum'>1</span>人</div>";
              }
            }
            $("#otherBillList").empty().append(bills);
            $("#otherBillList").find(".requiredNum").text(totalPer());
            showOtherBillDetails();
          } else {
            $("#otherBill").css("display", "none");
            $(".other_amount_all").css("display", "none");
            $("#discount .num").text("6");
          }
        }
      }
    });
  }
  getOtherBill();
  /* 其他费用项目 */
  $("#otherBill").delegate(".countadd", 'click', function () {
    var val = parseInt($(this).prev().val());
    ++val;
    $(this).prev().val(val);
    $(this).parent().siblings(".personNum").text(val);
    $(this).parent().siblings(".checkbox").prop("checked", true);
    showOtherBillDetails();
    countOrderPrice();
  });
  $("#otherBill").delegate(".countsub", 'click', function () {
    var _this = this;
    layer.confirm('确认要减少人数吗？', function (index) {
      var val = parseInt($(_this).next().val());
      --val;
      if (val <= 0) {
        $(_this).parent().siblings(".checkbox").prop("checked", false);
        $(_this).next().val(0);
        $(_this).parent().siblings(".personNum").text(0);
      } else {
        $(_this).parent().siblings(".checkbox").prop("checked", true);
        $(_this).next().val(val);
        $(_this).parent().siblings(".personNum").text(val);
      }
      layer.close(index);
      showOtherBillDetails();
      countOrderPrice();
    });
  });
  $("#otherBill").delegate("input[name='number']", 'change', function () {
    if($(this).val() == ""){
      $(this).val(0);
    }
    $(this).val(parseInt($(this).val().replace(/[^0-9]/g, '0')));
    if ($(this).val() == "0" || $(this).val() == "") {
      $(this).parent().siblings(".checkbox").prop("checked", false);
      $(this).parent().siblings(".personNum").text(0);
    } else {
      $(this).parent().siblings(".personNum").text($(this).val());
      $(this).parent().siblings(".checkbox").prop("checked", true);
    }
    showOtherBillDetails();
    countOrderPrice();
  });
  $("#otherBill").delegate(".checkbox", 'change', function () {
    if ($(this).prop("checked")) {
      $(this).siblings(".operatePer").find("input[name='number']").val(totalPer());
      $(this).siblings(".personNum").text(totalPer());
    } else {
      $(this).siblings(".operatePer").find("input[name='number']").val(0);
      $(this).siblings(".personNum").text(0);
    }
    showOtherBillDetails();
    countOrderPrice();
  });