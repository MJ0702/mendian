function show_ele_contract_preview() {
  layer.load(2);
  $.ajax({
    type: "post",
    url: "main?xwl=346QG44BI18N",
    data: {
      planId: planID
    },
    success: function (text) {
      layer.closeAll('loading'); 
      var data = JSON.parse(text);
      conTract_cpy = data.contractCpy;
      var contractCpy = data.contractCpy;
      //获取预览合同数据  
     // $('#ele_contract_bg').show();
      $('body').addClass('over_y');
      //游客名单信息
      //获取游客名单信息
      var result = getOrderData();
      travels = result.mingdanData;
      traveler = result.mingdanData[0].cnName;
      travelmobile = result.mingdanData[0].ctInfo;
      if (data.contractCpy == 2) {
        $.ajax({
          type: "post",
          url: "main?xwl=346QG44BJBQV",
          data: {
            planId: planID
          },
          success: function (text) {
            json = JSON.parse(text);
            contract_tpljson = Wb.encode(json.data.tplJson);
            var lq_obj = json.data.tplJson; //领签后台返回线路信息
            //导游服务费
            if (1 == line_Type) {
              guideFee = parseInt(30 * lq_obj.days);
            } else {
              guideFee = parseInt(10 * lq_obj.days);
            }
            //签约地址
            address = lq_obj.address;
            //其他约定事项
            other_info = lq_obj.supplementaryClause;
            var account_type = '4';
            $.ajax({
              type: "post",
              url: "main?xwl=345VRFPPQZDB",
              data: {
                contractCpy: contractCpy,
                account_type: account_type,
                planID: planID
              },
              success: function (text) {
                var model_data = JSON.parse(text);
                lq_templet_option = model_data.rows;
                //领签
               // $('#ele_edit_win').show();
                confirm_edit(contractCpy, travels, guideFee, address, other_info,
                  lq_templet_option);
                cofirm_save(contractCpy, data, json);
              }
            });
          }
        });
      }
      //根据门店配置来显示门店是否允许修改更多配置
      if (data.contractCpy == 3) {
        if ('1' == 0) {
          $('.more_config').hide();
        } else {
          $('.more_config').show();
        }
        //海中旅定制 
        var contractId = "";
        if ('1' * 1 == 1 || '1' * 1 == 2102 || '1' * 1 == 1799) {
          contractId = $("#ele_contract_select").val();
        }
        $.ajax({
          type: "post",
          url: "main?xwl=346QG44BHUNW",
          data: {
            planId: planID,
            templetId: contractId
          },
          success: function (text) {
            var j = JSON.parse(text);
            //全国
            var qgJson = j.data;
            var qg_obj = j.data; //领签后台返回线路信息
            //                 $('.ele_qg_contract').show();
            //导游服务费
            if (1 == line_Type) {
              guideFee = parseInt(30 * qg_obj.itinerary.days);
            } else {
              guideFee = parseInt(10 * qg_obj.itinerary.days);
            }
            //经办人、经办人电话
            transactorName = qg_obj.tplJson.transactorName;
            transactorPhone = qg_obj.tplJson.transactorPhone;
            //其他约定事项
            other_info = qg_obj.tplJson.other_info;
            leastCustomerNumber = qg_obj.tplJson.leastCustomerNumber; //最低成团人数                  
            agreeToTransfer = qg_obj.tplJson.agreeToTransfer; //成团选项1 委托第三方
            entrustedTravelAgency = qg_obj.tplJson.entrustedTravelAgency; //成团选项1 第三方旅行社名称
            agreeToDelay = qg_obj.tplJson.agreeToDelay; //成团选项2 延期出团
            agreeToChangeLine = qg_obj.tplJson.agreeToChangeLine; //成团选项3  改签其他线路
            agreeToTerminate = qg_obj.tplJson.agreeToTerminate; //成团选项4    解除合同 
            agreeToMerge = qg_obj.tplJson.agreeToMerge; //拼团约定 同意/不同意
            mergeToCompanyName = qg_obj.tplJson.mergeToCompanyName; //拼团第三方名称
            purchaseMethod = qg_obj.tplJson.purchaseMethod; //购买产品
            productName = qg_obj.tplJson.productName; //保险第三方产品名称
            resolution = qg_obj.tplJson.resolution; //争议解决
            tribunalName = qg_obj.tplJson.tribunalName; //争议解决法院名称
            //                   NumberOfContracts = qg_obj.tplJson.NumberOfContracts;      //合同份数
            //                   PerCapita = qg_obj.tplJson.PerCapita;      //合同双方各持份数
            //由于12301平台暂不支持自定义 合同份数，所以此处暂时固定写死为2,1
            NumberOfContracts = 2;
            PerCapita = 1;

                            qg_show_detail(qgJson,contractCpy);   //全国电子合同预览显示
           $('#ele_edit_win').show();
            confirm_edit(contractCpy);
            cofirm_save(contractCpy, data, '', qgJson);
          }
        });
      }

      $('#entrust-agrees').on('click', 'li', function () { //成团约定
        var is_Agglomeration = $(this).data('index');

        if (is_Agglomeration == 1) {
          $(".qg_entrustAgree").html("1");
          agreeToTransfer = true;
          agreeToDelay = false;
          agreeToChangeLine = false;
          agreeToTerminate = false;
        } else if (is_Agglomeration == 2) {
          $(".qg_entrustAgree").html("2");
          agreeToTransfer = false;
          agreeToDelay = true;
          agreeToChangeLine = false;
          agreeToTerminate = false;
        } else if (is_Agglomeration == 3) {
          $(".qg_entrustAgree").html("3");
          agreeToTransfer = false;
          agreeToDelay = false;
          agreeToChangeLine = true;
          agreeToTerminate = false;
        } else if (is_Agglomeration == 4) {
          $(".qg_entrustAgree").html("4");
          agreeToTransfer = false;
          agreeToDelay = false;
          agreeToChangeLine = false;
          agreeToTerminate = true;
        }
      });

      $('#assemble').on('click', 'li', function () { //拼团约定
        agreeToMerge = $(this).data('index');
        if (agreeToMerge == 1) {
          $('.qg_mergeAgree').html('同意');
          $('.qg_mergeAgency').html(mergeToCompanyName);
        } else if (agreeToMerge == 2) {
          $('.qg_mergeAgree').html('不同意');
          $('.qg_mergeAgency').html('/');
        }
      });

      $('#purchaseMethod').on('click', 'li', function () { //保险约定
        purchaseMethod = $(this).data('index');
        if (purchaseMethod == 1) {
          $(".qg_productName").html("委托旅行社购买");
        } else if (purchaseMethod == 2) {
          $(".qg_productName").html("自行购买");
        } else if (purchaseMethod == 3) {
          $(".qg_productName").html("放弃购买");
        } else if (purchaseMethod == 4) {
          $(".qg_productName").html("同意旅行社赠送人生意外伤害险");
        }
      });

      $('#resolutions').on('click', 'li', function () { //争议解决约定
        resolution = $(this).data('index');
        if (resolution == 1) {
          $(".qg_resolution").html("1");
        } else if (resolution == 2) {
          $(".qg_resolution").html("2");
        }
      });


      $('#ele_cancel_btn').on('click', function () { //取消电子合同
        $('#ele_contract_bg').hide();
        $('#ele_contract_win').hide();
        $('.ele_contract_win_close').hide();
        $('body').removeClass('over_y');
      });

      $('#ele_edit_btn').on('click', function (e) { //编辑电子合同
        e.stopPropagation();
        $('#ele_contract_win').hide();
        $('.ele_contract_win_close').hide();
        //$('#ele_edit_win').show();
        confirm_edit(contractCpy, travels, guideFee, address, other_info);
      });
      //           $('#ele_confirm_btn').on('click',function(e){  //确认电子合同

      //           });
      $("#ele_confirm_btn").off("click").on("click", function (e) {
        e.stopPropagation();
        layer.load(2);
        confirm_submit(contractCpy);
      });
    }
  });
}
//显示合同信息配置窗口
function confirm_edit(contractCpy) {
  if (contractCpy == 2) {
    $('#qg_preview_edit').hide();
    $('.lq_amount_adult').val(per_Adult_amount);
    $('.lq_amount_child').val(per_Child_amount);
    $('.lq_guideFee').val(guideFee);
    $('.lq_amount_all').val((parseFloat(amount_all)).toFixed(2));
    $('.lq_travelmobile').val(travelmobile); //联系人电话
    $('.payTypeText').val(payType);
    if (payType == 4) {
      $('#sign_address_inp').removeClass('ele_address_content');
      $('#ele_other_info_inp').next().removeClass('ele_address');
      $('#ele_other_info_inp').show();
      $('.lq_payOther').val(payOther); //其他付款方式
    }
    $('.lq_address').val(address);
    $('.lq_payTime').val(payTime);
    // $('.lq_ele_other_content').val(other_info);
    $('.lq_ele_other_content').html(other_info);
    var travelsName = "";
    var templet = '';
    for (var m = 0; m < travels.length; m++) {
      travelsName += '<option>' + travels[m].cnName + '</option>';
    }
    $('.lq_cnName').html('');
    $('.lq_cnName').append(travelsName);
    if (traveler != travels[0].cnName) {
      $('.lq_cnName').val(traveler);
    } else {
      $('.lq_cnName').val(travels[0].cnName);
    }
    //1716定制领签模板选择
    if ('1' == 1716 || '1' == 1) {
      $('#lq_templet_content').show();
    }
    var templet_empty = "<option value=''>选择模板</option>"
    for (var l = 0; l < lq_templet_option.length; l++) {
      templet += "<option data-id=" + lq_templet_option[l].id + " data-contractJson=" + lq_templet_option[l]
        .contract_tpljson + ">" + lq_templet_option[l].templetName + "</option>";
    }
    $('.lq_templet').html('');
    $('.lq_templet').append(templet_empty + templet);
    layui.use('form', function () {
      var form1 = layui.form;
      form1.render();
      form1.on('select(lq_cnName)', function (data) {
        for (var i = 0; i < travels.length; i++) {
          if (data.value == travels[i].cnName) {
            $('.lq_travelmobile').val(travels[i].ctInfo);
            break;
          }
        }
      });

      form1.on('select(payType)', function (data) {
        if (data.value == 4) {
          $('#sign_address_inp').removeClass('ele_address_content');
          $('#ele_other_info_inp').next().removeClass('ele_address');
          $('#ele_other_info_inp').show();
        } else {
          $('#ele_other_info_inp').next().addClass('ele_address');
          $('#sign_address_inp').addClass('ele_address_content');
          $('#ele_other_info_inp').hide();
        }
      });
      //领签选择不同电子合同模板
      form1.on('select(lq_templet)', function (data) {
        for (var i = 0; i < lq_templet_option.length; i++) {
          if (data.value == lq_templet_option[i].templetName) {
            json.data.tplJson = lq_templet_option[i].contract_tpljson;
            $('.lq_address').val(json.data.tplJson.address);
            $('.lq_ele_other_content').val(json.data.tplJson.supplementaryClause);
            templetID = lq_templet_option[i].id;
          }
        }
      })
    });
    confirm_change_fee_params(contractCpy);
  }
  if (contractCpy == 3) {
    if (window.screen.height < 900) {
      $('#ele_edit_win').css('height', '600px');
      $('#ele_edit_win').css('overflow', 'auto');
    } else {
      $('#ele_edit_win').css('height', '820px');
    }
    //        $('#ele_edit_win > .ele_save_btn').css('margin-top','7px');
    $('#lq_preview_edit').remove();
    $('#qg_preview_edit').show();
    if ('1' == 1193 || '1' == 1) {
      $('#contract_file_up').show();
    }
    $('.qg_amount_adult').val(parseFloat(per_Adult_amount).toFixed(2));
    $('.qg_amount_child').val(parseFloat(per_Child_amount).toFixed(2));
    $('.qg_guideFee').val(guideFee);
    $('.qg_amount_all').val((parseFloat(amount_all)).toFixed(2));
    $('.qg_travelmobile').val(travelmobile); //联系人电话
    $('.qg_payTypeText').val(payType);
    $('.qg_address').val(address);
    $('.qg_payTime').val(payTime);
    // $('.qg_ele_other_content').val(other_info);
    $('.qg_ele_other_content').html(other_info);
    $('.qg_single_amount').val(singleSupplementCost);
    $('.qg_transactorName').val(transactorName);
    $('.qg_transactorPhone').val(transactorPhone);

    $("#qg_preview_edit").find("input[type='radio']").prop("checked", false);
    //更多配置项
    $('.qg_leastCustomerNumber').val(leastCustomerNumber); //最低成团人数      
    if (agreeToTransfer == 'true') { //成团配置项
      $("input[name='qg_entrustAgrees'][value=1]").prop("checked", true);
      $(".qg_entrustAgree").html("1");
      $('.qg_transAgency').val(entrustedTravelAgency);
    } else {
      $('.qg_transAgency').html('/');
    }
    if (agreeToDelay == 'true') {
      $(".qg_entrustAgree").html("2");
      $("input[name='qg_entrustAgrees'][value=2]").prop("checked", true);
    } else if (agreeToChangeLine == 'true') {
      $(".qg_entrustAgree").html("3");
      $("input[name='qg_entrustAgrees'][value=3]").prop("checked", true);
    } else if (agreeToTerminate == 'true') {
      $(".qg_entrustAgree").html("4");
      $("input[name='qg_entrustAgrees'][value=4]").prop("checked", true);
    }
    if (agreeToMerge == 1) { //拼团约定
      $('.qg_mergeAgree').html('同意');
      $('.qg_mergeAgency').html(mergeToCompanyName);
      $("input[name='qg_assemble'][value=1]").prop("checked", true);
    } else {
      $('.qg_mergeAgree').html('不同意');
      $('.qg_mergeAgency').html('/');
      $("input[name='qg_assemble'][value=2]").prop("checked", true);
    }
    $('.qg_mergeAgency_input').val(mergeToCompanyName);
    if (purchaseMethod == 1) { //购买保险约定
      $("input[name='qg_purchaseMethod'][value=1]").prop("checked", true);
      $(".qg_productName").html("委托旅行社购买");
      $(".qg_productName_input").val(productName);
    } else if (purchaseMethod == 2) {
      $("input[name='qg_purchaseMethod'][value=2]").prop("checked", true);
      $(".qg_productName").html("自行购买");
      $(".qg_productName_input").val(productName);
    } else if (purchaseMethod == 3) {
      $("input[name='qg_purchaseMethod'][value=3]").prop("checked", true);
      $(".qg_productName").html("放弃购买");
      $(".qg_productName_input").val(productName);
    } else if (purchaseMethod == 4) {
      $("input[name='qg_purchaseMethod'][value=4]").prop("checked", true);
      $(".qg_productName").html("同意旅行社赠送人生意外伤害险");
      $(".qg_productName_input").val(productName);
    }
    if (resolution == 1) { //争议解决
      $("input[name='qg_resolutions'][value=1]").prop("checked", true);
    } else {
      $("input[name='qg_resolutions'][value=2]").prop("checked", true);
    }
    $(".qg_resolution").html(resolution);
    $(".qg_tribunalName").val(tribunalName);
    $(".qg_numberOfContracts").val(NumberOfContracts); //合同份数
    $(".qg_perCapita").val(PerCapita); //双方各持合同份数


    var travelsName = "";
    for (var m = 0; m < travels.length; m++) {
      travelsName += '<option>' + travels[m].cnName + '</option>';
    }
    $('.qg_cnName').html('');
    $('.qg_cnName').append(travelsName);
    if (traveler != travels[0].cnName) {
      $('.qg_cnName').val(traveler);
    } else {
      $('.qg_cnName').val(travels[0].cnName);
    }
    layui.use('form', function () {
      var form1 = layui.form;
      form1.render();
      form1.on('select(qg_cnName)', function (data) {
        for (var i = 0; i < travels.length; i++) {
          if (data.value == travels[i].cnName) {
            $('.qg_travelmobile').val(travels[i].ctInfo);
            break;
          }
        }
      });
    });
    confirm_change_fee_params(contractCpy);
  }

  //关闭合同配置窗口
  $('.ele_edit_close').on('click', function () {
    $('#ele_edit_win').hide();
    $('#ele_contract_bg').hide();
    $('body').removeClass('over_y');
    $('#imgListBox').empty();
    files = ""; //清空电子合同附件
  });
  //关闭合同配置窗口
  $('#ele_contract_bg').on('click', function () {
    $('#ele_edit_win').hide();
    $('#ele_contract_bg').hide();
    $('#ele_contract_win').hide();
    $('.ele_contract_win_close').hide();
    $('body').removeClass('over_y');
    $('#imgListBox').empty();
    files = ""; //清空电子合同附件
  });
  //关闭合同配置窗口
  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      $('#ele_edit_win').hide();
      $('#ele_contract_win').hide();
      $('.ele_contract_win_close').hide();
      $('body').removeClass('over_y');
      $('#ele_contract_bg').hide();
      $('#imgListBox').empty();
      files = ""; //清空电子合同附件
    }
  });
}
//确认电子合同修改并显示合同预览
function cofirm_save(contractCpy, data, json, qgJson) {
  //编辑-保存
  $('.ele_save_btn').on('click', function (e) {
    e.stopPropagation();
    if (contractCpy == 2) {
      //校验参数 
      if (!confirm_params(contractCpy)) {
        return;
      }
      //保存修改的值
      per_Adult_amount = $('.lq_amount_adult').val(); //成人费用
      per_Child_amount = $('.lq_amount_child').val(); //儿童费用
      guideFee = $('.lq_guideFee').val(); //导游服务费
      amount_all = $('.lq_amount_all').val(); //旅游费用合计
      travelmobile = $('.lq_travelmobile').val(); //游客手机号
      payTime = $('.lq_payTime').val(); //支付时间
      address = $('.lq_address').val(); //签约地址
      payOther = $('.lq_payOther').val(); //其他付款方式
      traveler = $('.lq_cnName').val(); //游客姓名代表
      payType = $('#lq_payType_s').val(); //支付方式
      other_info = $('.lq_ele_other_content').val();
      for (var i = 0; i < travels.length; i++) {
        if (traveler == travels[i].cnName) {
          if (travelmobile != travels[i].ctInfo) {
            travels[i].ctInfo = travelmobile;
            break;
          }
        }
      }
      layer.msg('保存成功');
      setTimeout(function () {
        $('#ele_edit_win').hide();
        if (window.screen.height < 800) {
          $('#ele_contract_win').show();
          $('#ele_contract_win').css('height', '680px');
        } else {
          $('#ele_contract_win').show();
        }
        $('.ele_contract_win_close').show();
        $('.ele_lq_contract').show();
        if (data.contractType == 0) { //国内
          $('.ele_lq_contract > #warp').show();
        } else if (data.contractType == 1) { //境外
          $('.ele_lq_contract > #overseas').show();
        } else if (data.contractType == 2) { //一日游
          $('.ele_lq_contract > #one_day').show();
        } else if (data.contractType == 3) { //台湾游
          $('.ele_lq_contract > #taiwan').show();
        }
        lq_show_detail(json, contractCpy); //领签电子合同预览显示
        //修改合同预览中改变的值
        $('.cus_name').html(traveler);
        $('.aduAmount').html(per_Adult_amount);
        $('.childAcmount').html(per_Child_amount);
        $('.payGuide').html(guideFee);
        $('.amountAll').html(amount_all);
        var payTypeText = '';
        $('.payTypeText').html('');
        switch (payType) {
          case '1':
            payTypeText = '现金';
            break;
          case '2':
            payTypeText = '支票';
            break;
          case '3':
            payTypeText = '信用卡';
            break;
          case '4':
            payTypeText = '其他';
            break;
          case '5':
            payTypeText = '在线支付';
            break;
          default:
            payTypeText = payType;
            break;
        }
        $('.payTypeText').html(payTypeText);
        $('.payDeadline').html(payTime);
        $('.other').html(other_info);
        $('.signAddress').html(address || '/');
        if (payType == 4) {
          $('.payOtherContent').show();
          $('.payOtherText').html(payOther || '/');
        } else {
          $('.payOtherContent').hide();
          $('.payOtherText').html(payOther || '/');
        }

        if (data.contractType == 0) { //国内游
          document.getElementById("scroll_condition_lq_0").scrollIntoView();
        }
        if (data.contractType == 1) { //境外游
          document.getElementById("scroll_condition_lq_1").scrollIntoView();
        }
        if (data.contractType == 2) { //一日游
          document.getElementById("scroll_condition_lq_2").scrollIntoView();
        }
        if (data.contractType == 3) { //台湾游
          document.getElementById("scroll_condition_lq_3").scrollIntoView();
        }
      }, 500);
    }
    if (contractCpy == 3) {
      //校验参数 
      if (!confirm_params(contractCpy)) {
        return;
      }
      //保存修改的值
      per_Adult_amount = $('.qg_amount_adult').val(); //成人费用
      per_Child_amount = $('.qg_amount_child').val(); //儿童费用
      guideFee = $('.qg_guideFee').val(); //导游服务费
      amount_all = $('.qg_amount_all').val(); //旅游费用合计
      travelmobile = $('.qg_travelmobile').val(); //游客手机号
      payTime = $('.qg_payTime').val(); //支付时间
      address = $('.qg_address').val();
      mode = $('#mode').val(); //签约方式
      transactorName = $('.qg_transactorName').val();
      transactorPhone = $('.qg_transactorPhone').val();
      traveler = $('.qg_cnName').val(); //游客姓名代表
      payType = $('#qg_payType_s').val(); //支付方式
      other_info = $('.qg_ele_other_content').val();
      singleSupplementCost = $('.qg_single_amount').val(); //单房差 
      leastCustomerNumber = $('.qg_leastCustomerNumber').val(); //最低成团人数
      entrustedTravelAgency = $('.qg_transAgency').val() || entrustedTravelAgency; //成团选项1 第三方旅行社名称
      mergeToCompanyName = $('.qg_mergeAgency_input').val(); //拼团第三方名称     
      productName = $(".qg_productName_input").val(); //保险第三方产品名称        
      tribunalName = $(".qg_tribunalName").val(); //争议解决法院名称
      NumberOfContracts = $(".qg_numberOfContracts").val(); //合同份数
      PerCapita = $(".qg_perCapita").val(); //合同双方各持份数        

      for (var i = 0; i < travels.length; i++) {
        if (traveler == travels[i].cnName) {
          if (travelmobile != travels[i].ctInfo) {
            travels[i].ctInfo = travelmobile;
            break;
          }
        }
      }
      //附件传给后端
      var $docData = $('#imgListBox > li'); //获取上传的文件li列表

      var file = []; //上传的文档的参数
      $docData.each(function () {
        file.push($(this).data('file'));
      });
      files = Wb.encode(file);
      layer.msg('保存成功');
      setTimeout(function () {
        $('#ele_edit_win').hide();
        if (window.screen.height < 800) {
          $('#ele_contract_win').show();
          $('#ele_contract_win').css('height', '680px');
        } else {
          $('#ele_contract_win').show();
        }
        $('.ele_contract_win_close').show();
        $('.ele_qg_contract').show();
        if (data.contractType == 0) { //国内
          $('.ele_qg_contract > #warp').show();
        } else if (data.contractType == 1) { //境外
          $('.ele_qg_contract > #overseas').show();
        } else if (data.contractType == 2) { //一日游
          $('.ele_qg_contract > #one_day').show();
        } else if (data.contractType == 3) { //台湾游
          $('.ele_qg_contract > #taiwan').show();
        }


        //替换最新的json配置， 用于合同预览
        qgJson.tplJson.payType = payType; //支付方式
        qgJson.tplJson.payTime = payTime; //支付时间
        qgJson.tplJson.leastCustomerNumber = leastCustomerNumber; //成团最低人数
        qgJson.tplJson.agreeToTransfer = agreeToTransfer; //成团约定项 1
        qgJson.tplJson.entrustedTravelAgency = entrustedTravelAgency; //成团约定-第三方名称
        qgJson.tplJson.agreeToDelay = agreeToDelay; //成团约定项 2
        qgJson.tplJson.agreeToChangeLine = agreeToChangeLine; //成团约定项 3
        qgJson.tplJson.agreeToTerminate = agreeToTerminate; //成团约定项 4
        qgJson.tplJson.purchaseMethod = purchaseMethod; //购买保险约定
        qgJson.tplJson.productName = productName; //购买保险第三方
        qgJson.tplJson.agreeToMerge = agreeToMerge; //拼团约定项
        qgJson.tplJson.mergeToCompanyName = mergeToCompanyName; //拼团第三方名称
        qgJson.tplJson.resolution = resolution; //争议解决
        qgJson.tplJson.tribunalName = tribunalName; //争议解决仲裁法院名称  
        qgJson.tplJson.other_info = other_info; //其他约定事项
        qgJson.tplJson.NumberOfContracts = NumberOfContracts; //合同份数
        qgJson.tplJson.PerCapita = PerCapita; //合同双方各持份数
        qg_show_detail(qgJson, contractCpy);

        //修改合同预览中改变的值
        $('.sigle_room').html(singleSupplementCost || 0);
        $('.cus_name').html(traveler);
        $('.aduAmount').html(per_Adult_amount);
        $('.childAcmount').html(per_Child_amount);
        $('.payGuide').html(guideFee);
        $('.amountAll').html(amount_all);
        $('.operatorName').html(transactorName);
        $('.tel').html(transactorPhone);
        $('.payDeadline').html(payTime);
        $('.signAddress').html(address || '/');
        //重新渲染修改后的名单
        $('.J_trave').html('');
        var showName = '';
        for (var i = 0; i < travels.length; i++) {
          showName += '<tr><td style="width:60px">' + (i + 1) + '</td>' +
            '<td style="width:80px">' + (travels[i].cnName || '/') + '</td>' +
            '<td style="width:80px">' + (travels[i].IDCard || '/') + '</td>' +
            '<td style="width:90px">' + (travels[i].sex || '/') + '</td>' +
            '<td style="width:80px">' + (travels[i].ctInfo || '/') + '</td>' +
            '<td style="width:80px">' + ('/') + '</td>' +
            '</tr>';
        }
        $('.J_trave').html(showName);
        if (data.contractType == 0) { //国内游
          document.getElementById("scroll_condition_qg_0").scrollIntoView();
        }
        if (data.contractType == 1) { //境外游
          document.getElementById("scroll_condition_qg_1").scrollIntoView();
        }
        if (data.contractType == 2) { //一日游
          document.getElementById("scroll_condition_qg_2").scrollIntoView();
        }
        if (data.contractType == 3) { //台湾游
          document.getElementById("scroll_condition_qg_3").scrollIntoView();
        }
      }, 500);
    }
    //关闭预览窗口
    $('.ele_contract_win_close>img').on('click', function () {
      $('#ele_contract_bg').hide();
      $('#ele_contract_win').hide();
      $('.ele_contract_win_close').hide();
      $('body').removeClass('over_y');
    });
    $('.ele_to_top').on('click', function () { //返回合同顶部
      $('#ele_contract_win').animate({
        scrollTop: 0
      });
    });
  });
}
//编辑电子合同信息配置时费用改变的校验
function confirm_change_fee_params(contractCpy) {
  if (contractCpy == 2) {
    //改变成人费用同步旅游合计费用
    var reg = /^[0-9]+\.?[0-9]*$/; //验证是否是数字
    $('.lq_amount_adult').on('change', function () {
      if ($('.lq_amount_adult').val() != '') {
        if ($('.lq_amount_adult').val() < 0) {
          layer.msg('成人费用必须大于0！', {
            shift: 6
          });
          $('.lq_amount_adult').val(per_Adult_amount);
          return false;
        }
        if (!reg.test($('.lq_amount_adult').val())) {
          layer.msg('成人费用必须为数字！', {
            shift: 6
          });
          $('.lq_amount_adult').val(per_Adult_amount);
          return false;
        }
      } else {
        layer.msg('成人费用为必填！', {
          shift: 6
        });
        return false;
      }
      var c_adult = parseFloat($('.lq_amount_adult').val()); //改变的成人单价
      var c_child = parseFloat($('.lq_amount_child').val()); //改变的儿童单价
      var c_guide = parseInt($('.lq_guideFee').val());
      var c_total = '';
      if (child_number > 0) {
        if ($('.lq_amount_child').val() != '') {
          c_total = c_adult * parseInt(adu_number) + c_child * parseInt(child_number);
        } else {
          c_total = parseFloat(amount_all);
        }
      } else {
        c_total = c_adult * parseInt(adu_number);
      }

      $('.lq_amount_all').val(c_total.toFixed(2));
    });
    //改变儿童费用同步旅游合计费用
    $('.lq_amount_child').on('change', function () {
      if ($('.lq_amount_child').val() != '') {
        if (child_number > 0) {
          if ($('.lq_amount_child').val() < 0) {
            layer.msg('儿童费用必须大于0！', {
              shift: 6
            });
            $('.lq_amount_child').val(per_Child_amount);
            return false;
          }
        }
        if (!reg.test($('.lq_amount_child').val())) {
          layer.msg('儿童费用必须为数字！', {
            shift: 6
          });
          $('.lq_amount_child').val(per_Child_amount);
          return false;
        }
      } else {
        if (parseInt(child_number) > 0) {
          layer.msg('儿童费用为必填！', {
            shift: 6
          });
          return false;
        }
      }
      var c_adult = parseFloat($('.lq_amount_adult').val()); //改变的成人单价
      var c_child = parseFloat($('.lq_amount_child').val()); //改变的儿童单价
      var c_guide = parseInt($('.lq_guideFee').val());
      var c_total = '';
      if (child_number > 0) {
        if ($('.lq_amount_child').val() != '') {
          if ($('.lq_amount_adult').val() == '') {
            layer.msg('请输入成人费用', {
              shift: 6
            });
            return false;
          }
          c_total = c_adult * parseInt(adu_number) + c_child * parseInt(child_number);
        } else {
          c_total = parseFloat(amount_all);
        }
      } else {
        c_total = c_adult * parseInt(adu_number);
      }

      $('.lq_amount_all').val(c_total.toFixed(2));
    });
    //改变旅游合计费用同步成人费用
    $('.lq_amount_all').on('change', function () {
      if ($('.lq_amount_all').val() != '') {
        if ($('.lq_amount_all').val() <= 0) {
          layer.msg('旅游合计费用必须大于0！', {
            shift: 6
          });
          $('.lq_amount_all').val((parseFloat(amount_all)).toFixed(2));
          return false;
        }
        if (!reg.test($('.lq_amount_all').val())) {
          layer.msg('旅游合计费用必须为数字！', {
            shift: 6
          });
          $('.lq_amount_all').val((parseFloat(amount_all)).toFixed(2));
          return false;
        }
      } else {
        layer.msg('旅游合计费用为必填！', {
          shift: 6
        });
        return false;
      }
      var c_adult = parseFloat($('.lq_amount_adult').val()); //改变的成人单价
      var c_child = parseFloat($('.lq_amount_child').val()); //改变的儿童单价
      var c_total = parseFloat($('.lq_amount_all').val()); //改变的旅游合计费用
      var c_adult_2 = '';
      if (child_number > 0) {
        if ($('.lq_amount_child').val() == '') {
          layer.msg('请输入儿童费用', {
            shift: 6
          });
          return false;
        }
        c_adult_2 = (c_total - (c_child * parseInt(child_number))) / parseInt(adu_number);
      } else {
        c_adult_2 = c_total / parseInt(adu_number);
      }
      $('.lq_amount_adult').val(c_adult_2.toFixed(2));
    });
  }
  if (contractCpy == 3) {
    //改变成人费用同步旅游合计费用
    var reg = /^[0-9]+\.?[0-9]*$/; //验证是否是数字
    $('.qg_amount_adult').on('change', function () {
      if ($('.qg_amount_adult').val() != '') {
        if ($('.qg_amount_adult').val() < 0) {
          layer.msg('成人费用必须大于0！', {
            shift: 6
          });
          $('.qg_amount_adult').val(per_Adult_amount);
          return false;
        }
        if (!reg.test($('.qg_amount_adult').val())) {
          layer.msg('成人费用必须为数字！', {
            shift: 6
          });
          $('.qg_amount_adult').val(per_Adult_amount);
          return false;
        }
      } else {
        layer.msg('成人费用为必填！', {
          shift: 6
        });
        return false;
      }
      var c_adult = parseFloat($('.qg_amount_adult').val()); //改变的成人单价
      var c_child = parseFloat($('.qg_amount_child').val()); //改变的儿童单价
      var c_guide = parseInt($('.qg_guideFee').val());
      var c_total = '';
      if (child_number > 0) {
        if ($('.qg_amount_child').val() != '') {
          c_total = c_adult * parseInt(adu_number) + c_child * parseInt(child_number);
        } else {
          c_total = parseFloat(amount_all);
        }
      } else {
        c_total = c_adult * parseInt(adu_number);
      }
      $('.qg_amount_all').val(c_total.toFixed(2));
    });
    //改变儿童费用同步旅游合计费用
    $('.qg_amount_child').on('change', function () {
      if ($('.qg_amount_child').val() != '') {
        if (child_number > 0) {
          if ($('.qg_amount_adult').val() < 0) {
            layer.msg('儿童费用必须大于0！', {
              shift: 6
            });
            $('.qg_amount_child').val(per_Child_amount);
            return false;
          }
        }
        if (!reg.test($('.qg_amount_child').val())) {
          layer.msg('儿童费用必须为数字！', {
            shift: 6
          });
          $('.qg_amount_child').val(per_Child_amount);
          return false;
        }
      } else {
        if (parseInt(child_number) > 0) {
          layer.msg('儿童费用为必填！', {
            shift: 6
          });
          return false;
        }
      }
      var c_adult = parseFloat($('.qg_amount_adult').val()); //改变的成人单价
      var c_child = parseFloat($('.qg_amount_child').val()); //改变的儿童单价
      var c_guide = parseInt($('.qg_guideFee').val());
      var c_total = '';
      if (child_number > 0) {
        if ($('.qg_amount_child').val() != '') {
          if ($('.qg_amount_adult').val() == '') {
            layer.msg('请输入成人费用！', {
              shift: 6
            });
            return false;
          }
          c_total = c_adult * parseInt(adu_number) + c_child * parseInt(child_number);
        } else {
          c_total = parseFloat(amount_all);
        }
      } else {
        c_total = c_adult * parseInt(adu_number);
      }
      $('.qg_amount_all').val(c_total.toFixed(2));
    });
    //改变旅游合计费用同步成人费用
    $('.qg_amount_all').on('change', function () {
      if ($('.qg_amount_all').val() != '') {
        if ($('.qg_amount_all').val() <= 0) {
          layer.msg('旅游合计费必须大于0', {
            shift: 6
          });
          $('.qg_amount_all').val((parseFloat(amount_all)).toFixed(2));
          return false;
        }
        if (!reg.test($('.qg_amount_all').val())) {
          layer.msg('旅游合计费用必须为数字！', {
            shift: 6
          });
          $('.qg_amount_all').val((parseFloat(amount_all)).toFixed(2));
          return false;
        }
      } else {
        if ($('.qg_amount_all').val() == '') {
          layer.msg('请输入旅游合计费用', {
            shift: 6
          });
          return false;
        }
      }
      var c_adult = parseFloat($('.qg_amount_adult').val()); //改变的成人单价
      var c_child = parseFloat($('.qg_amount_child').val()); //改变的儿童单价
      var c_total = parseFloat($('.qg_amount_all').val()); //改变的旅游合计费用
      var c_adult_2 = '';
      if (child_number > 0) {
        if ($('.qg_amount_child').val() == '') {
          layer.msg('请输入儿童费用！', {
            shift: 6
          });
          return false;
        }
        c_adult_2 = (c_total - (c_child * parseInt(child_number))) / parseInt(adu_number);
      } else {
        c_adult_2 = c_total / parseInt(adu_number);
      }
      $('.qg_amount_adult').val(c_adult_2.toFixed(2));
    });
  }
}
//编辑电子合同信息保存校验参数
function confirm_params(contractCpy) {
  var reg = /^[0-9]+\.?[0-9]*$/; //验证是否是数字
  var re = /^1\d{10}$/;
  if (contractCpy == 2) {
    if ($('.lq_amount_adult').val() == '') {
      layer.msg('请输入成人费用！', {
        shift: 6
      });
      return false;
    }
    if ($('.lq_amount_adult').val() != '') {
      if ($('.lq_amount_adult').val() < 0) {
        layer.msg('成人费用必须大于0！', {
          shift: 6
        });
        return false;
      }
      if (!reg.test($('.lq_amount_adult').val())) {
        layer.msg('成人费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if (child_number > 0) {
      if ($('.lq_amount_child').val() == '') {
        layer.msg('请输入儿童费用！', {
          shift: 6
        });
        return false;
      }
      if ($('.lq_amount_child').val() != '') {
        if ($('.lq_amount_child').val() < 0) {
          layer.msg('儿童费用必须大于0！', {
            shift: 6
          });
          return false;
        }
        if (!reg.test($('.lq_amount_child').val())) {
          layer.msg('儿童费用必须为数字！', {
            shift: 6
          });
          return false;
        }
      }
    }
    if ($('.lq_guideFee').val() == '') {
      layer.msg('请输入导游费用！', {
        shift: 6
      });
      return false;
    }
    if ($('.lq_guideFee').val() != '') {
      if (!reg.test($('.lq_guideFee').val())) {
        layer.msg('导游费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('.lq_amount_all').val() == '') {
      layer.msg('请输入旅游费用！', {
        shift: 6
      });
      return false;
    }
    if ($('.lq_amount_all').val() != '') {
      if (!reg.test($('.lq_amount_all').val())) {
        layer.msg('旅游费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('.lq_cnName').val() == '') {
      layer.msg('请选择游客代表！', {
        shift: 6
      });
      return false;
    }
    if ($('.lq_travelmobile').val() == '') {
      layer.msg('请输入游客手机号！', {
        shift: 6
      });
      return false;
    }
    if ($('.lq_travelmobile').val() != '') {
      if (!reg.test($('.lq_travelmobile').val())) {
        layer.msg('手机号码必须为数字！', {
          shift: 6
        });
        return false;
      }
      if (!re.test($('.lq_travelmobile').val())) {
        layer.msg('手机号码长度有误！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('#lq_payType_s').val() == '') {
      layer.msg('请选择支付方式！', {
        shift: 6
      });
      return false;
    }
    if ($('.lq_payTime').val() == '') {
      layer.msg('请输入支付时间！', {
        shift: 6
      });
      return false;
    }
    return true;
  }
  if (contractCpy == 3) {
    if ($('.qg_single_amount').val() != '') {
      if (!reg.test($('.qg_single_amount').val())) {
        layer.msg('单房差费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('.qg_amount_adult').val() == '') {
      layer.msg('请输入成人费用！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_amount_adult').val() != '') {
      if ($('.qg_amount_adult').val() < 0) {
        layer.msg('成人费用必须大于0！', {
          shift: 6
        });
        return false;
      }
      if (!reg.test($('.qg_amount_adult').val())) {
        layer.msg('成人费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if (child_number > 0) {
      if ($('.qg_amount_child').val() == '') {
        layer.msg('请输入儿童费用！', {
          shift: 6
        });
        return false;
      }
      if ($('.qg_amount_child').val() != '') {
        if ($('.qg_amount_child').val() < 0) {
          layer.msg('儿童费用必须大于0！', {
            shift: 6
          });
          return false;
        }
        if (!reg.test($('.qg_amount_child').val())) {
          layer.msg('儿童费用必须为数字！', {
            shift: 6
          });
          return false;
        }
      }
    }
    if ($('.qg_guideFee').val() == '') {
      layer.msg('请输入导游费用！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_guideFee').val() != '') {
      if (!reg.test($('.qg_guideFee').val())) {
        layer.msg('导游费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('.qg_amount_all').val() == '') {
      layer.msg('请输入旅游费用！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_amount_all').val() != '') {
      if (!reg.test($('.qg_amount_all').val())) {
        layer.msg('旅游费用必须为数字！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('.qg_cnName').val() == '') {
      layer.msg('请选择游客代表！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_travelmobile').val() == '') {
      layer.msg('请输入游客手机号！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_travelmobile').val() != '') {
      if (!reg.test($('.qg_travelmobile').val())) {
        layer.msg('手机号码必须为数字！', {
          shift: 6
        });
        return false;
      }
      if (!re.test($('.qg_travelmobile').val())) {
        layer.msg('手机号码长度有误！', {
          shift: 6
        });
        return false;
      }
    }
    if ($('#qg_payType_s').val() == '') {
      layer.msg('请选择支付方式！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_payTime').val() == '') {
      layer.msg('请输入支付时间！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_transactorName').val() == '') {
      layer.msg('请输入经办人姓名！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_transactorPhone').val() == '') {
      layer.msg('请输入经办人电话！', {
        shift: 6
      });
      return false;
    }
    if ($('.qg_transactorPhone').val() != '') {
      if (!reg.test($('.qg_transactorPhone').val())) {
        layer.msg('经办人电话必须为数字！', {
          shift: 6
        });
        return false;
      }
      if (!re.test($('.qg_transactorPhone').val())) {
        layer.msg('经办人电话号码长度有误！', {
          shift: 6
        });
        return false;
      }
    }
    //       if($(".qg_numberOfContracts").val()=='' || $(".qg_perCapita").val()==''){
    //         layer.msg('合同份数和双方各持份数为必填项！',{shift:6});
    //         return false;
    //       }else{           
    //         if(!reg.test($(".qg_numberOfContracts").val())){
    //           layer.msg('合同份数必须为数字！',{shift:6});
    //           return false;
    //         }
    //         if(!reg.test($(".qg_perCapita").val())){
    //           layer.msg('合同双方各持份数必须为数字！',{shift:6});
    //           return false;
    //         }
    //       }
    return true;
  }
}
//确认报名
function confirm_submit(contractCpy) {
  if (contractCpy == 2) {
    var ele_lq_data = {}; //领签电子合同
    ele_lq_data.choose_module = 0; // 合同类别 1定制版 ，0普通版
    ele_lq_data.planID = planID;
    ele_lq_data.contractCpy = contractCpy;
    ele_lq_data.contract_tpljson = contract_tpljson; //合同配置
    ele_lq_data.traveler = traveler; //签署人
    ele_lq_data.travelmobile = travelmobile; //签署人联系方式
    ele_lq_data.amountAll = amount_all; //旅游费合计
    ele_lq_data.guideFee = guideFee; //导游服务费
    ele_lq_data.payType = payType; //支付方式
    ele_lq_data.payTime = payTime; //支付时间
    ele_lq_data.aduAmount = per_Adult_amount; //成人费用
    ele_lq_data.childAcmount = per_Child_amount; //儿童费用
    ele_lq_data.chdNumber = child_number; //儿童数
    ele_lq_data.aduNumber = adu_number; //成人数
    ele_lq_data.other = other_info; //其他约定事项
    ele_lq_data.signAdress = address; //签约地址
    ele_lq_data.travels = Wb.encode(travels);
    ele_lq_data.payOther = payOther;
    ele_lq_data.templetID = templetID;
    ele_contract_lq_data = ele_lq_data;
  } else if (contractCpy == 3) {
    var ele_qg_data = {}; //全国电子合同
    ele_qg_data.planID = planID; //团ID
    ele_qg_data.contractCpy = contractCpy; //合同平台
    ele_qg_data.travels = Wb.encode(travels);; //游客列表
    ele_qg_data.traveler = traveler; //签署人
    ele_qg_data.travelmobile = travelmobile; //签署人联系方式
    ele_qg_data.amountAll = amount_all; //旅游费合计
    ele_qg_data.guideFee = guideFee; //导游服务费
    ele_qg_data.payType = payType; //支付方式
    ele_qg_data.payTime = payTime; //支付时间
    ele_qg_data.aduAmount = per_Adult_amount; //成人费用
    ele_qg_data.childAcmount = per_Child_amount; //儿童费用
    ele_qg_data.other = other_info; //其他约定事项
    ele_qg_data.mode = mode; //签约方式ID
    ele_qg_data.transactorName = transactorName; //经办人姓名
    ele_qg_data.transactorPhone = transactorPhone; //经办人电话
    ele_qg_data.amount = accountBalance; //实付总额
    ele_qg_data.chdNumber = child_number; //儿童数
    ele_qg_data.aduNumber = adu_number; //成人数
    ele_qg_data.choose_module = 0; //合同类别 1定制版 ，0普通版;
    ele_qg_data.signingPlace = address; //签约地址
    ele_qg_data.singleSupplementCost = singleSupplementCost; //单房差
    ele_qg_data.leastCustomerNumber = leastCustomerNumber; //最低成团人数         
    ele_qg_data.agreeToTransfer = agreeToTransfer; //成团约定1
    ele_qg_data.entrustedTravelAgency = entrustedTravelAgency; //成团约定1 第三方旅行社名称
    ele_qg_data.agreeToDelay = agreeToDelay; //成团约定项 2
    ele_qg_data.agreeToChangeLine = agreeToChangeLine; //成团约定项 3
    ele_qg_data.agreeToTerminate = agreeToTerminate; //成团约定项 4
    ele_qg_data.agreeToMerge = agreeToMerge; //拼团约定
    ele_qg_data.mergeToCompanyName = mergeToCompanyName; //拼团第三方名称
    ele_qg_data.purchaseMethod = purchaseMethod; //购买保险
    ele_qg_data.productName = productName; //保险第三方名称
    ele_qg_data.resolution = resolution; //争议解决
    ele_qg_data.tribunalName = tribunalName; //争议解决仲裁法院名称
    ele_qg_data.NumberOfContracts = NumberOfContracts; //合同份数
    ele_qg_data.PerCapita = PerCapita; //合同双方各持份数

    ele_qg_data.files = files; //全国电子合同上传附件
    ele_contract_qg_data = ele_qg_data;
  }
  //报名并发起电子合同
  order();
}
//预览领签电子合同显示赋值
function lq_show_detail(json, contractCpy) {
  //获取游客名单信息
  var result = getOrderData();
  var travels = result.mingdanData;
  var cusName = result.mingdanData[0].cnName;
  var perNum = result.mingdanData.length;
  var traveler = result.mingdanData[0].cnName;
  //赋值
  var obj = {};
  obj = json.data.tplJson;

  var shopInfo = json.data.shopping || [];
  var selfInfo = json.data.selfFee || [];
  var itinerary_document = json.data.itinerary.routes || [];
  var mattersDesc = json.data.other;
  var isDayEdit = json.data.itinerary.routes.isDayEdit;
  //合同抬头
  $('.contract_no').html(obj.contractNO || '/');
  $('.cus_name').html(cusName);
  $('.perNum').html(perNum);
  $('.corp').html(obj.corp);
  $('.corpCode').html(obj.corpCode);
  $('.one_day_userIDCard').html(result.mingdanData[0].IDCard);
  // 第二十条 线路行程时间
  $.get("main?xwl=345AMFHCYN5C", {
    date: obj.PlanDate
  }, function (data) {
    if (data) {
      obj.PlanDate = data;
      $('.goYear').html(Wb.formatDate(obj.PlanDate, 'Y') || '/');
      $('.goMonth').html(Wb.formatDate(obj.PlanDate, 'm') || '/');
      $('.goDay').html(Wb.formatDate(obj.PlanDate, 'd') || '/');
      //     $('#goHour').html(Wb.formatDate(obj.PlanDate,'H') || '/');
      $('.PlanCode').html(obj.PlanCode);
    }
  });
  $.get("main?xwl=345AMFHCYN5C", {
    date: obj.backDate
  }, function (data) {
    if (data) {
      obj.backDate = data;
      $('.overYear').html(Wb.formatDate(obj.backDate, 'Y') || '/');
      $('.overMonth').html(Wb.formatDate(obj.backDate, 'm') || '/');
      $('.overDay').html(Wb.formatDate(obj.backDate, 'd') || '/');
      //     $('#overHour').html(Wb.formatDate(obj.backDate,'H') || '/');
    }
  });

  $('.Days').html(obj.days);
  $('.night').html(obj.night);
  // 第二十一条 旅游费用及支付（以人民币为计算单位）
  var adultPrice = adu_price;
  $('.aduAmount').html(adultPrice);
  var childPrice = chd_price;
  var childNum = $('#chdNum').val();
  var aduNum = $('#aduNum').val();
  $('.chdNumber').html(childNum);
  $('.aduNumber').html(aduNum);
  if (childNum == 0) {
    $('.childAcmount').html('/');
    if (1 == line_Type) {
      $('.payGuide').html(30 * obj.days);

    } else {
      $('.payGuide').html(10 * obj.days);
    }
    $('.amountAll').html(adultPrice);
  } else {
    $('.childAcmount').html(childPrice);
    if (1 == line_Type) {
      $('.payGuide').html(30 * obj.days);
    } else {
      $('.payGuide').html(10 * obj.days);
    }
    $('.amountAll').html(amount_all);
  }
  if (obj.agree == 1) {
    $('.weituo').html('√  ');
    $('.zixing').html('□  ');
    $('.fangqi').html('□  ');
    //1 境外，0境内
    if (line_Type == 1) {
      $('.safeProduct').text(obj.product2);
    } else {
      $('.safeProduct').text(obj.product);
    }
  } else if (obj.agree == 2) {
    $('.weituo').html('□  ');
    $('.zixing').html('√  ');
    $('.fangqi').html('□  ');
    $('.safeProduct').text('/');
  } else if (obj.agree == 3) {
    $('.weituo').html('□  ');
    $('.zixing').html('□  ');
    $('.fangqi').html('√  ');
    $('.safeProduct').text('/');
  } else if (obj.agree == 4) {
    $('.weituo').html('□  ');
    $('.zixing').html('□  ');
    $('.fangqi').html('□  ');
    $('.safeProduct').text('/');
  }

  var payTypeText = '';
  switch (payType) {
    case 1:
      payTypeText = '现金';
      break;
    case 2:
      payTypeText = '支票';
      break;
    case 3:
      payTypeText = '信用卡';
      break;
    case 4:
      payTypeText = '其他';
      break;
    case 5:
      payTypeText = '在线支付';
      break;
    default:
      payTypeText = payType;
      break;
  }
  $('.payTypeText').html(payTypeText);
  $('.payDeadline').html(Wb.formatDate(payTime, 'Y-m-d'));
  if (payType == 4) {
    $('.payOtherContent').show();
    $('.payOtherText').html(payOther || '/');
  }
  //第二十三条  成团人数与不成团的约定
  $('.personLimit').html(obj.minNum);

  //把属于erp：947的逻辑独立出来 如果ERPID不等于947则合同第二十三条读取配置
  //因为一开始电子合同就是为上航假期一家开发的，所以基本上按照他们的要求来的，但是现在不符合其他用户的需求，所以需要单独处理这个逻辑
  if (947 == "1") {
    if (0 == obj.operateType) { //自营
      $('.entrustAgree').html('不同意');
      $('.transAgency').html('/');
      if (obj.delayAgree == 1) {
        $('.delayAgree').html('同意');
      } else {
        $('.delayAgree').html('不同意');
      }
      if (obj.changeLineAgree == 1) {
        $('.changeLineAgree').html('同意');
      } else {
        $('.changeLineAgree').html('不同意');
      }
      if (obj.terminateAgree == 1) {
        $('.terminateAgree').html('同意');
      } else {
        $('.terminateAgree').html('不同意');
      }
    } else { //他营
      $('.entrustAgree').html('同意');
      if (!Wb.isEmpty(obj.cpyName)) { //优先写入供应商名称，没有就填入 合同配置中 的配置
        $('.transAgency').html(obj.cpyName);
      } else {
        $('.transAgency').html(obj.transAgency);
      }
      $('.delayAgree').html('不同意');
      $('.changeLineAgree').html('不同意');
      $('.terminateAgree').html('不同意');
    }
  } else {
    if (obj.transAgree == 1) {
      $('.entrustAgree').html('同意');
      $('.transAgency').html(obj.transAgency);
    } else {
      $('.entrustAgree').html('不同意');
      $('.transAgency').html('/');
    }
    if (obj.delayAgree == 1) {
      $('.delayAgree').html('同意');
    } else {
      $('.delayAgree').html('不同意');
    }
    if (obj.changeLineAgree == 1) {
      $('.changeLineAgree').html('同意');
    } else {
      $('.changeLineAgree').html('不同意');
    }
    if (obj.terminateAgree == 1) {
      $('.terminateAgree').html('同意');
    } else {
      $('.terminateAgree').html('不同意');
    }

  }
  //第二十四条 拼团约定
  if (obj.mergeAgree == 1) {
    $('.mergeAgree').html('同意');
    $('.mergeAgency').html(obj.mergeAgency);
  } else {
    $('.mergeAgree').html('不同意');
    $('.mergeAgency').html('/');
  }
  //第二十六条 争议的解决方式
  $('.teminateDealType').html(obj.teminateDealType || '/');
  $('.committee').html(obj.committee || '/');
  //第二十七条 其他约定事项
  $('.other').html(''); //清空一次
  if (Wb.isEmpty(obj.supplementaryClause)) {
    $('.other').html(
      '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; / &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' +
      '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'
    );
  } else {
    $('.other').html(obj.supplementaryClause);
  }
  //第二十八条　合同效力
  $('.copys1').html(obj.copys1 || '/');
  $('.copys2').html(obj.copys2 || '/');
  //签字盖章
  $('.userIDCard').html(obj.userIDCard || '/');
  $('.address').html(obj.address || '/');
  $('.cpyEmail').html(obj.cpyEmail || '/');
  $('.tel').html(obj.tel || '/');
  $('.cpyFax').html(obj.cpyFax || '/');
  $('.cpyzip').html(obj.cpyzip || '/');
  $('.signAddress').html(obj.address || '/');
  //旅游监督投诉
  $('.agencyComplaintsMobile').html(obj.agencyComplaintsMobile || '/');
  $('.lawState').html(obj.lawState || '/');
  $('.lawCity').html(obj.lawCity || '/');
  $('.lawComplaintsMobile').html(obj.lawComplaintsMobile || '/');
  $('.lawEmail').html(obj.lawEmail || '/');
  $('.lawAddress').html(obj.lawAddress || '/');
  $('.lawZip').html(obj.lawZip || '/');
  //游客名单预览
  var showName = '';
  for (var i = 0; i < travels.length; i++) {
    showName += '<tr><td style="width:60px">' + (i + 1) + '</td>' +
      '<td style="width:80px">' + (travels[i].cnName || '/') + '</td>' +
      '<td style="width:90px">' + (travels[i].sex || '/') + '</td>' +
      '<td style="width:80px">' + (travels[i].perType || '/') + '</td>' +
      '<td style="width:80px">' + (travels[i].IDCard || '/') + '</td>' +
      '</tr>';
  }
  $('.J_trave').html(showName);

  //自费/购物协议
  var stoping = '',
    diyMoney = '';
  if (shopInfo.length === 0) {
    stoping += '<tr><td style="width:150px">&nbsp; / 年 &nbsp;/ 月 &nbsp;/ 日 &nbsp;/ 时</td>' +
      '<td style="width:60px">/ </td>' +
      '<td> / </td>' +
      '<td style="width:70px">  /</td>' +
      '<td style="width:90px">/  </td>' +
      '<td style="width:80px">/  </td>' +
      '<td style="width:90px"> 签名： /  </td></tr>';

  } else {

    for (var i = 0; i < shopInfo.length; i++) {
      //购物
      stoping += '<tr><td style="width:126px">' + Wb.formatDate(shopInfo[i].date, 'Y') + '年' + Wb.formatDate(shopInfo[
          i].date, 'm') + '月' + Wb.formatDate(shopInfo[i].date, 'd') + '日' + (Wb.formatDate(shopInfo[i].theTime,
          'H') || '/') + '时</td>' +
        '<td style="width:60px">' + (shopInfo[i].place || '/') + '</td>' +
        '<td>' + (shopInfo[i].shoppingPlace || '/') + '</td>' +
        '<td style="width:70px">' + (shopInfo[i].goods || '/') + '</td>' +
        '<td style="width:90px">' + (shopInfo[i].stayDuration || '/') + '</td>' +
        '<td style="width:80px">' + (shopInfo[i].memo || '/') + '</td>' +
        '<td style="width:90px"> 签名：' + (obj.traveler || '/') + '</td></tr>';
    }
  }
  if (selfInfo.length == 0) {
    diyMoney += '<tr><td style="width:150px">&nbsp;/  年 &nbsp;/ 月 &nbsp;/ 日 &nbsp;/ 时</td>' +
      '<td style="width:60px">/ </td>' +
      '<td>/  </td>' +
      '<td style="width:70px"> / </td>' +
      '<td style="width:90px"> / </td>' +
      '<td style="width:80px"> / </td>' +
      '<td style="width:90px"> 签名： /  </td></tr>';
  } else {
    //自费
    for (var j = 0; j < selfInfo.length; j++) {
      diyMoney += '<tr><td style="width:126px">' + Wb.formatDate(selfInfo[j].date, 'Y') + '年' + Wb.formatDate(
          selfInfo[j].date, 'm') + '月' + Wb.formatDate(selfInfo[j].date, 'd') + '日' + (Wb.formatDate(selfInfo[j].date
          .theTime, 'H') || '/') + '时</td>' +
        '<td style="width:60px">' + (selfInfo[j].place || '/') + '</td>' +
        '<td>' + (selfInfo[j].item || '/') + '</td>' +
        '<td style="width:60px">' + (parseFloat(selfInfo[j].fee).toFixed(2) || '/') + '</td>' +
        '<td style="width:90px">' + (selfInfo[j].stayDuration || '/') + '</td>' +
        '<td style="width:80px">' + (selfInfo[j].memo || '/') + '</td>' +
        '<td style="width:90px">签名：' + ('/') + '</td></tr>';

    }
  }
  $('.J_shoping').html(stoping);
  $('.J_diyMoney').html(diyMoney);

  //行程文档
  if (itinerary_document.length != 0) {
    $("._itinerary_document").css("display", "block");
    $("._itinerary").css("display", "block");
    var id_htmls = "";
    if (isDayEdit == 0) {
      id_htmls += "<tr><td width='665px'>" + itinerary_document[0].theDesc + "</td></tr>";
    } else {
      for (var m = 0; m < itinerary_document.length; m++) {
        id_htmls += "<tr><td width='100px'>" + "第" + (m + 1) + "天" + "</td><td width='750px'>" + itinerary_document[m]
          .theTitle || '' + "</td></tr>";
        id_htmls += "<tr><td width='100px'>" + "用餐：" + "</td><td width='750px'>" + itinerary_document[m].theCan ||
          '' + "</td></tr>";
        id_htmls += "<tr><td width='100px'>" + "住宿：" + "</td><td width='750px'>" + itinerary_document[m].theHotel ||
          '' + "</td></tr>";
        id_htmls += "<tr><td width='100px'>" + "交通：" + "</td><td width='750px'>" + itinerary_document[m].theTraffic ||
          '' + "</td></tr>";
        id_htmls += "<tr><td width='100px'>" + "详情：" + "</td><td width='750px'>" + itinerary_document[m].theDesc ||
          '' + "</td></tr>";
      }
    }
    $("._itinerary_document").html('');
    $("._itinerary_document").append(id_htmls);
  }
  //注意事项
  if (mattersDesc.length !== 0) {
    $("._matters_attention").css("display", "block");
    $("._matters").css("display", "block");
    var md_htmls = "";
    var m = 0;
    for (m = 0; m < mattersDesc.length; m++) {
      md_htmls += "<tr><td width='110px'>" + (mattersDesc[m].LineItemName || '') + "：</td><td width='750px'>" + (
        mattersDesc[m].theDetail || '') + "</td></tr>";
    }
    $("._matters_attention").html('');
    $("._matters_attention").append(md_htmls);
  }
}
//预览全国电子合同显示赋值
function qg_show_detail(qgJson, contractCpy) {
  //获取游客名单信息
  var result = getOrderData();
  var travels = result.mingdanData;
  var cusName = result.mingdanData[0].cnName;
  var perNum = result.mingdanData.length;
  var traveler = result.mingdanData[0].cnName;
  var travelmobile = result.mingdanData[0].ctInfo;
  //赋值
  var obj = {};
  obj = qgJson;
  var contract_id = obj.ERPContractID;
  var shopInfo = obj.shopping || []; //购物
  var selfInfo = obj.selfFee || []; //自费
  //合同抬头
  $('.contractNO').html(contract_id || '/'); //合同编号
  $('.cus_name').html(cusName);
  $('.perNum').html(perNum);
  $('.corp').html(obj.tplJson.agencyName);
  $('#taiwang').html(obj.tplJson.agencyName);
  $('.corpCode').html(obj.tplJson.travelAgencyLicenseNumber);
  $('.LicenseNumber').html(obj.tplJson.businessLicenseNumber);
  $('.userIDCard').html(result.mingdanData[0].IDCard || '/');
  // 第二十条 线路行程时间
  $('.goYear').html(Wb.formatDate(obj.itinerary.startDate, 'Y') || '/');
  $('.goMonth').html(Wb.formatDate(obj.itinerary.startDate, 'm') || '/');
  $('.goDay').html(Wb.formatDate(obj.itinerary.startDate, 'd') || '/');
  //     $('#goHour').html(Wb.formatDate(obj.PlanDate,'H') || '/');
  $('.overYear').html(Wb.formatDate(obj.itinerary.endDate, 'Y') || '/');
  $('.overMonth').html(Wb.formatDate(obj.itinerary.endDate, 'm') || '/');
  $('.overDay').html(Wb.formatDate(obj.itinerary.endDate, 'd') || '/');
  //     $('#overHour').html(Wb.formatDate(obj.backDate,'H') || '/');
  $('.Days').html(obj.itinerary.days);
  $('.night').html(obj.itinerary.nights);

  var adultPrice = adu_price;
  $('.aduAmount').html(adultPrice);
  var childPrice = chd_price;
  var childNum = $('#chdNum').val();
  var aduNum = $('#aduNum').val();
  $('.chdNumber').html(childNum);
  $('.aduNumber').html(aduNum);
  if (childNum == 0) {
    $('.childAcmount').html('/');
    $('.chdNumber').html('/');
    if (1 == line_Type) {
      $('.payGuide').html(30 * obj.itinerary.days);
    } else {
      $('.payGuide').html(10 * obj.itinerary.days);
    }
    $('.amountAll').html(adultPrice);
  } else {
    $('.childAcmount').html(childPrice);
    $('.chdNumber').html(childNum);
    if (1 == line_Type) {
      $('.payGuide').html(30 * obj.itinerary.days);
    } else {
      $('.payGuide').html(10 * obj.itinerary.days);
      $('.amountAll').html(amount_all);
    }
  }
  if (obj.tplJson.purchaseMethod == 1) {
    $('.weituo').html('√  ');
    $('.zixing').html('□  ');
    $('.fangqi').html('□  ');
    $('.zengsong').html('□  ');
    //1 境外，0境内
    if (line_Type == 1) {
      $('.safeProduct').text(obj.tplJson.productName);
    } else {
      $('.safeProduct').text(obj.tplJson.productName);
    }
  } else if (obj.tplJson.purchaseMethod == 2) {
    $('.weituo').html('□  ');
    $('.zixing').html('√  ');
    $('.fangqi').html('□  ');
    $('.zengsong').html('□  ');
    $('.safeProduct').text('/');
  } else if (obj.tplJson.purchaseMethod == 3) {
    $('.weituo').html('□  ');
    $('.zixing').html('□  ');
    $('.fangqi').html('√  ');
    $('.zengsong').html('□  ');
    $('.safeProduct').text('/');
  } else if (obj.tplJson.purchaseMethod == 4) {
    $('.weituo').html('□  ');
    $('.zixing').html('□  ');
    $('.fangqi').html('□  ');
    $('.zengsong').html('√  ');
    $('.safeProduct').text('/');
  }

  var payTypeText = '';
  switch (obj.tplJson.payType * 1) {
    case 1:
      payTypeText = '现金';
      break;
    case 2:
      payTypeText = '转账';
      break;
    case 3:
      payTypeText = '线上支付';
      break;
    default:
      payTypeText = obj.tplJson.payType;
      break;
  }
  $('.payTypeText').html(payTypeText);
  $('.payDeadline').html(Wb.formatDate(obj.tplJson.payTime, 'Y-m-d'));
  //第二十三条  成团人数与不成团的约定
  $('.personLimit').html(obj.tplJson.leastCustomerNumber);
  //处理947的特殊逻辑
  if (947 == "1" || 1 == "1") {
    if (1 == obj.tplJson.operateType) {
      $('.entrustAgree').html('1');
      $('.transAgency').html(obj.tplJson.entrustedTravelAgency);
    } else {
      $('.entrustAgree').html('4');
      $('.transAgency').html("/");
    }
  } else {

    if (obj.tplJson.agreeToTransfer) {
      $('.entrustAgree').html('1');
      $('.transAgency').html(obj.tplJson.entrustedTravelAgency);
    } else {
      $('.transAgency').html('/');
    }
    if (obj.tplJson.agreeToDelay) {
      $('.entrustAgree').html('2');
    } else if (obj.tplJson.agreeToChangeLine) {
      $('.entrustAgree').html('3');
    } else if (obj.tplJson.agreeToTerminate) {
      $('.entrustAgree').html('4');
    }
  }

  //第二十四条 拼团约定
  if (obj.tplJson.agreeToMerge * 1 === 1) {
    $('.mergeAgree').html('同意');
    $('.mergeAgency').html(obj.tplJson.mergeToCompanyName);
  } else {
    $('.mergeAgree').html('不同意');
    $('.mergeAgency').html('/');
  }
  //第二十六条 争议的解决方式
  $('.teminateDealType').html(obj.tplJson.resolution || '/');
  $('.committee').html(obj.tplJson.tribunalName || '/');

  //第二十七条 其他约定事项
  $('.other').html(''); //清空一次
  if (Wb.isEmpty(obj.tplJson.other_info)) {
    $('.other').html(
      '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; / &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' +
      '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'
    );
  } else {
    // $('.other').html(obj.tplJson.other_info);
    $('.other').html(obj.tplJson.other_info+obj.tplJson.AgreedMatters);
  }
  //第二十八条　合同效力
  $('.copys1').html(obj.tplJson.NumberOfContracts || '2');
  $('.copys2').html(obj.tplJson.PerCapita || '1');

  //如果是一日游合同，显示旅行社客服电话配置
  $('.travel_photo').html(obj.tplJson.contactPhone);


  //签字盖章
  $('.userIDCard').html('/');
  $('.address').html(obj.tplJson.state + obj.tplJson.city + obj.tplJson.district + obj.tplJson.description || '/');
  $('.cpyEmail').html('/');
  $('.operatorName').html(obj.tplJson.transactorName || '/');
  $('.tel').html(obj.tplJson.transactorPhone || '/');
  $('.cpyFax').html('/');
  $('.cpyzip').html('/');
  $('.signAddress').html('/');
  //旅游监督投诉
  //           $('.agencyComplaintsMobile').html(obj.agencyComplaintsMobile || '/');
  //           $('.lawState').html(obj.lawState || '/');
  //           $('.lawCity').html(obj.lawCity || '/');
  //           $('.lawComplaintsMobile').html(obj.lawComplaintsMobile || '/');
  //           $('.lawEmail').html(obj.lawEmail || '/');
  //           $('.lawAddress').html(obj.lawAddress || '/');
  //           $('.lawZip').html(obj.lawZip || '/');

  //游客名单预览
  var showName = '';
  for (var i = 0; i < travels.length; i++) {
    showName += '<tr><td style="width:60px">' + (i + 1) + '</td>' +
      '<td style="width:80px">' + (travels[i].cnName || '/') + '</td>' +
      '<td style="width:80px">' + (travels[i].IDCard || '/') + '</td>' +
      '<td style="width:90px">' + (travels[i].sex || '/') + '</td>' +
      '<td style="width:80px">' + (travels[i].ctInfo || '/') + '</td>' +
      '<td style="width:80px">' + ('/') + '</td>' +
      '</tr>';
  }
  $('.J_trave').html(showName);

  //行程安排预览
  $(".group_ID").text(obj.itinerary.groupID);
  $(".route_name").text(obj.itinerary.routeName);
  var routes = obj.itinerary.routes || []; //行程安排
  var tourPlan = "";
  for (var n = 0; n < routes.length; n++) {
    tourPlan += "<tr><td style='width:50px'>天数</td><td>" + (n + 1) + "</td>";
    tourPlan += "<td style='width:50px'>站点</td><td>/</td>";
    tourPlan += "<td style='width:50px'>前往城市</td><td>/</td>";
    tourPlan += "<td style='width:50px'>前往省份</td><td>/</td></tr>";

    tourPlan += "<tr><td>行程描述</td><td colspan='7' style='text-align: left;'>" + (routes[n].theDesc || '/') + "</td></tr>";
  }
  $('.J_tour_plan').html(tourPlan);

  //自费/购物协议
  var stoping = '',
    diyMoney = '';
  if (shopInfo.length == 0) {
    stoping += '<tr><td style="width:150px">&nbsp; / 年 &nbsp;/ 月 &nbsp;/ 日 &nbsp;/ 时</td>' +
      '<td style="width:60px">/ </td>' +
      '<td> / </td>' +
      '<td style="width:70px">  /</td>' +
      '<td style="width:90px">/  </td>' +
      '<td style="width:80px">/  </td>' +
      '<td style="width:90px"> 签名： /  </td></tr>';

  } else {

    for (var i = 0; i < shopInfo.length; i++) {
      //购物
      stoping += '<tr><td style="width:126px">' + Wb.formatDate(shopInfo[i].date, 'Y') + '年' + Wb.formatDate(shopInfo[
          i].date, 'm') + '月' + Wb.formatDate(shopInfo[i].date, 'd') + '日' + (Wb.formatDate(shopInfo[i].theTime,
          'H') || '/') + '时</td>' +
        '<td style="width:60px">' + (shopInfo[i].place || '/') + '</td>' +
        '<td>' + (shopInfo[i].shoppingPlace || '/') + '</td>' +
        '<td style="width:70px">' + (shopInfo[i].goods || '/') + '</td>' +
        '<td style="width:90px">' + (shopInfo[i].stayDuration || '/') + '</td>' +
        '<td style="width:80px">' + (shopInfo[i].memo || '/') + '</td>' +
        '<td style="width:90px"> 签名：' + (obj.traveler || '/') + '</td></tr>';
    }
  }
  if (selfInfo.length == 0) {
    diyMoney += '<tr><td style="width:150px">&nbsp;/  年 &nbsp;/ 月 &nbsp;/ 日 &nbsp;/ 时</td>' +
      '<td style="width:60px">/ </td>' +
      '<td>/  </td>' +
      '<td style="width:70px"> / </td>' +
      '<td style="width:90px"> / </td>' +
      '<td style="width:80px"> / </td>' +
      '<td style="width:90px"> 签名： /  </td></tr>';
  } else {
    //自费
    for (var j = 0; j < selfInfo.length; j++) {
      diyMoney += '<tr><td style="width:126px">' + Wb.formatDate(selfInfo[j].date, 'Y') + '年' + Wb.formatDate(
          selfInfo[j].date, 'm') + '月' + Wb.formatDate(selfInfo[j].date, 'd') + '日' + (Wb.formatDate(selfInfo[j].date
          .theTime, 'H') || '/') + '时</td>' +
        '<td style="width:60px">' + (selfInfo[j].place || '/') + '</td>' +
        '<td>' + (selfInfo[j].item || '/') + '</td>' +
        '<td style="width:60px">' + (parseFloat(selfInfo[j].fee).toFixed(2) || '/') + '</td>' +
        '<td style="width:90px">' + (selfInfo[j].stayDuration || '/') + '</td>' +
        '<td style="width:80px">' + (selfInfo[j].memo || '/') + '</td>' +
        '<td style="width:90px">签名：' + ('/') + '</td></tr>';

    }
  }
  $('.J_shoping').html(stoping);
  $('.J_diyMoney').html(diyMoney);
}