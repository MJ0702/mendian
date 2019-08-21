var now = new Date();
  //根据系统配置的补单配置来设置日历控件禁用时间

  var start_date = '';
  if(overdue_order==0){
    issue_order_start_time = '';
    issue_order_end_time = '';
    start_date = '';
  }else if(overdue_order==1){
    issue_order_start_time = '';
  	issue_order_end_time = '';
    start_date = Wb.formatDate(Wb.dateAdd('y',-1,new Date()),"Y-m-d");
  }else if(overdue_order==2){
    if(overdue_day!=''){
      issue_order_start_time = '2017-01-01';
      issue_order_end_time = Wb.formatDate(Wb.dateAdd('d',-overdue_day-1,now),"Y-m-d"); //日期控件截至补单的时间
      start_date = Wb.formatDate(Wb.dateAdd('d',-overdue_day,new Date()),"Y-m-d");  //查询截至时间以后的团期开始时间
    }
  }
  $.get("main?xwl=345TF0H11CI2", {lineID: lineID, planID: planID,startDate:start_date}, function (result) {
   	var now = new Date();
    var resData = {
      rows:result.rows
    };
    var mark_dates = [];
    var i=0;
    var t = setInterval(function(){
      
      i++;
      if(getPriceTypeFlag||i>8){
        mark_dates = resData.rows.map(function(curVal) {
          	var planDate = curVal.planDate;
          	var obj = {
                id : curVal.id,
                planID : curVal.id,             
                date: parseDate(curVal.planDate, 'yyyy/mm/dd'),
                number: curVal.endNum,
                price: priceType == 1?curVal.adultPrice : curVal.sadultPrice,
                childPrice: priceType == 1?curVal.childPrice : curVal.schildPrice,
                planCode: curVal.planCode,
                color_tag : curVal.color_tag
            };
          	if(datePlans[planDate]){
                datePlans[planDate].push(obj);
            }else{
                datePlans[planDate] = [obj]; 
            }
        	return obj;
        });
        var planCalendar = new PlanCalendar('#planCalendar', {
          markDates: mark_dates,     // Array  默认值 []， 格式化好的团期数据
          monthNum: 4,               // Number 默认值 4，月份显示个数
          sellOutText: '满员',       // String 默认值 '售罄'，余位为0时显示文字
          isTips: true,             // Boolean 默认值 false，是否显示提示层
          disableDates: {
            start: issue_order_start_time,
            end:issue_order_end_time
          },
          start_date:start_date,
          maxNum: (userConfig.user_end_num_show_config==0?-1:userConfig.user_end_num_config),               // Number  默认值 20，大于等于指定余位显示 maxNumText 的值
          maxNumText: userConfig.user_end_num_than_config,       // String  默认值 '充足'，配置大于等于指定余位显示文字
          thenLessMaxNumText: userConfig.user_end_num_less_config, // String  默认值 '少位'，配置小于指定余位显示文字
//          initTips: function(data) { // 初始化tips文档内容，data: 选中日期的团期数据，只选一个团期   
//           },
          
          onSelect: function (dateItem,dataIndex) { // 选择团期之后的回调，dateItem：选中日期项, data[Array]: 团期数据
            planID = dataIndex[0].id;
            var planDate =  dataIndex[0].date;
            var selectPlanInTipDom = $(dateItem).find("tr[class='selected']");
            if(selectPlanInTipDom.length==0){
              $($.find("tr[class='selected']")).attr("class", "noselect");
              var firstTr = $(dateItem).find("tr")[1];
              $(firstTr).attr("class", "selected");
              planIDInTip = null;
//               planID = $(firstTr).attr('planid');
              var plans = dataIndex;
              for(var i=0;i<plans.length;i++){
                if(plans[i].planID = planIDInTip){
                  planDate = plans[i].date;
                  break;
                }
              }
            }
            if(planIDInTip!=null){
              planID = planIDInTip;
              var plans = dataIndex;
              for(var i=0;i<plans.length;i++){
                if(plans[i].planID = planIDInTip){
                  planDate = plans[i].date;
                  break;
                }
              }
            }
            linePlanSelect(planID, planDate);
            
            if(selectPlanInTipDom.length==0){
              $($.find("tr[class='selected']")).attr("class", "noselect");
//               $(dateItem).find("tr[class='selected']").attr("class", "noselect");
//               $(firstTr).attr("class", "selected");
              $(".tips>tr[class='selected']").attr("class", "noselect");
              $(firstTr).attr("class", "selected");
              planIDInTip = null;
            }        
          },
          onMouseEnter:function(data,Node){
            $(Node).find('.tips').html('');
            var planDate = data.date;
            var datePlan = datePlans[planDate];
            var html = '<div class="tips"><table cellpadding=5 cellspacing=0><thead><tr><td>团号</td><td>成人价</td><td style="width:50px">余位</td><td>标签</td><td style="width:22px;"></td></tr></thead>'; // return String 文档内容
            for(var i=0;i<data.length;i++){
                var plan = data[i];
                var color_tag = JSON.parse(data[i].color_tag);
              	var endNum = plan.number;
                var endNumStr=endNum;
                if (userConfig.user_end_num_show_config ==1){  
                    if (endNum < userConfig.user_end_num_config){      //余位为1至小于设置位置，根据判断有设置显示设置，没设置显示余位。（orange）
                      if (!Wb.isEmpty(userConfig.user_end_num_less_config)){
                         endNumStr = userConfig.user_end_num_less_config;
                      }else{
                         endNumStr = endNum;
                      } 
                    }else{  //余位>=设置位置，根据位置判断，有设置，显示设置，没有设置显示余位。 （green）
                      if (!Wb.isEmpty(userConfig.user_end_num_than_config)){
                         endNumStr = userConfig.user_end_num_than_config;
                      }else{
                         endNumStr = '≥'+userConfig.user_end_num_config;
                      } 
                    }    
                }
                html += '<tr planid = '+plan.id+' class="noselect" onclick="selectPlanInTip(this)"><td class="tip-plancode">'+plan.planCode+'</td><td class="tip-price">￥'+plan.price+'</td><td class="tip-num">'+endNumStr+'</td>';
              html += '<td style="text-align:left;">';
                if(color_tag !== null){
                  for(var j = 0;j < color_tag.length;j++){
                  html += '<span class="plan_tips plan_color_data_'+color_tag[j].color_num+'" title="'+color_tag[j].tag_info+'">'+color_tag[j].tag_name+'</span>';
                }
                  html += '</td>';   
              }
              html += '<td><img src="https://cdn.op110.com.cn/lib/imgs/erp/selected.png"></td></tr>';
            }        
            html += '</table></div>';
            $(Node).append(html);
            return html;
          }
        });
        
        clearTimeout(t);
        
      }
      
    },200); 
   
   
   
  }, "json");
    
	
  function selectPlanInTip(tr){
   	 $($.find("tr[class='selected']")).attr("class", "noselect");
     $(tr).attr("class", "selected");
     planIDInTip = $(tr).attr('planid');
  }
  
  function getMinPrice(planDate){
      var price = 99999999999999999999999999;
      var plans = datePlans[planDate];   
      for(var i=0;i<plans.length;i++){
        if(price > plans[i].price){
          price = plans[i].price;
        }
      }
      return price;
  }  

function parseDate(input, format) {
  format = format || 'yyyy-mm-dd'; // default format
  var parts = input.match(/(\d+)/g), 
      i = 0, fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}