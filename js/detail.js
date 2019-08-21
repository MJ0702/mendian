//---------------详情页数据获取和显示-----------------------------
   //遮罩和产品详情窗口
   function show_mask_procuct(){
    $('#lineTitle').on('click',function(){
      $('html,body').animate({scrollTop: 0},500);
        this_list = $(this);
        $('#product_detail_mask').css("display","block");
        $('#product_detail_page').css("display","block");
        //判断如果是按线路获取并显示详情信息
          var lineID = this_list.attr('data-lineid');
          if(type_num==0){
          $.ajax({
            type:"post",
            url:"main?xwl=343QOPTFB1EE",
            data:{lineID:lineID},
            success:function(text){
              var data = JSON.parse(text).rows[0];
              show_plan_details(data);
              consult_journey(data);
              print_journey(data);
            }
          });
          $.ajax({
            type:"post",
            url:"main?xwl=33ZGTNWXRD8K",
            data:{lineID:lineID},
            success:function(text){
              var data = JSON.parse(text).rows;
              jurney_info(data);
            }
          });
          $.ajax({
            type:"post",
            url:"main?xwl=346M92FB2S8H",
            data:{lineID:lineID},
            success:function(text){
              var data = JSON.parse(text);
              shopping_info(data);
            }
          });
        }
        if(type_num==1){
          $.ajax({
            type:"post",
            url:"main?xwl=343QOPTFB1EE",
            data:{lineID:lineID},
            success:function(text){
              var data = JSON.parse(text).rows[0];
              show_plan_details(data);
              consult_journey(data);
              print_journey(data);
            }
          });
          $.ajax({
            type:"post",
            url:"main?xwl=33ZGTNWXRD8K",
            data:{lineID:lineID},
            success:function(text){
              var data = JSON.parse(text).rows;
              jurney_info(data);
            }
          });
          $.ajax({
            type:"post",
            url:"main?xwl=346M92FB2S8H",
            data:{lineID:lineID},
            success:function(text){
              var data = JSON.parse(text);
              shopping_info(data);
            }
          });
        }
    function show_plan_details(data){
          if(data.img2==null){
            $('.p_image>img').attr("src","https://tcdn.op110.com.cn/files/1/file/20180329/z_1522295362286.jpg");
          }else{
            $('.p_image>img').attr("src",data.img2);
          }
          $('.p_intro_title').html(data.Title);
          $('.p_intro_title').attr("title",data.Title);
          if(data.Tags==null){
            $('.description_con').html('暂无简要描述哦！');
            $('.description_con').attr("title","");
            $('.description_con').removeClass("p_intro_para");
            $('.description_con').addClass("p_intro_para_blank");
            $('.description_con_more').css('display','none');
          }else{
            $('.description_con').removeClass("p_intro_para");
            $('.description_con').removeClass("p_intro_para_blank");
            $('.description_con').html(data.Tags);
            if(($('.description_con').outerHeight())>50){
              $('.description_con').addClass("p_intro_para");
              $('.description_con_more').css('display','block');
              $('.description_con_more').children().attr("title",data.Tags);
            }else{
              $('.description_con_more').css('display','none');
            }
            $('.description_con').attr("title",data.Tags);
          }
          $('.pro_code').html(data.Code);
          $('.pro_day').html(data.Days);
          $('.line_type').html(data.lineTypeName);
          $('.line_type').attr("title",data.lineTypeName);
          $('.adult_price').html(data.sadultPrice);
          $('.child_price').html(data.schildPrice);
          //报名
          $('.line_detail_right').attr("target","_blank");
          $('.line_detail_right').attr("href","/sys/main?xwl=345TF0H13QHC&lineID="+lineID);
    }
      //导出参考行程
    function consult_journey(data){
      var fileName = data.Title;
      $(".download_consult_word").off("click");
      $('.download_consult_word').on("click",function(e){
        e.stopPropagation();
        Wb.request({
          url: 'main?xwl=342PTXVGECO4',
          params: {lineID:lineID,fileName:fileName},
          success: function(r){
            var json = r.responseText;
            Wb.download('main?xwl=33YODGG8X42Y', {      
              fileName:fileName+'.doc',
              tplFile:'Base_Line.doc',
              jsonData: json
            });
            $('.x-hide-display').css("display","none");
          }
        });
      });
      $('.download_attachment').attr("data-lineid",lineID);
      //PDF格式下载
      $('.download_consult_pdf').on('click',function(e){
      e.stopPropagation();
        Wb.download('main?xwl=346SLNM1RSO8',{
          lineID:lineID
        });
      });
    }
   //打印行程
    function print_journey(data) {
      $('.print_travel').click(function(){
        var headhtml = "<html><head><title></title></head><body>";
        var foothtml = "</body>";
        // 获取div中的html内容
        var newhtml= $("#product_detail_page").html();

        // 获取原来的窗口界面body的html内容，并保存起来
        var oldhtml = document.body.innerHTML;
        // 给窗口界面重新赋值，赋自己拼接起来的html内容
        document.body.innerHTML = headhtml + newhtml + foothtml;
        // 调用window.print方法打印新窗口
        var style = document.createElement("style");  
        document.head.appendChild(style);  
        sheet = style.sheet  
        sheet.addRule('.p_intro_para::after','display:none'); 
        $('.line_detail_right').css("display","none");
        $('.download').css("display","none");
        $('#p_btn').css("display","none");
        $('.close_icon').css("display","none");
        $('#print_title').removeClass('p_intro_title');
        $('#print_title').addClass('p_intro_title_print');
        $('.description_con').removeClass("p_intro_para");
        $('.description_con').addClass("p_intro_para_print");
        $('.description_con_more').hide();
        $('.description_con').html('');
        $('.description_con').css("max-height","40px");
        $('.p_intro_text').after('<div class="clear" style="padding:10px;">'+data.Tags+'</div>')
        window.print();
		$('.line_detail_right').css("display","block");
        $('.download').css("display","block");
        $('#p_btn').css("display","block");
        $('.close_icon').css("display","block");
        // 将原来窗口body的html值回填展示
        document.body.innerHTML = oldhtml;
        sheet.addRule('.p_intro_para::after','display:block');
        $('#print_title').removeClass('p_intro_title_print');
        $('#print_title').addClass('p_intro_title');
        $('.description_con').removeClass("p_intro_para_print");
        $('.description_con').addClass("p_intro_para");
        $('.description_con').show();
        $('#product_detail_mask').css({"background":"#000","opacity":"0.7"});
        location.reload();
        return false;
      });
   };
      //获取行程具体信息并显示
  function jurney_info(data){
        var arrange_html = "";
        var line_plan = data[1].colss;
    	var line_plan_2 = data[1].lineItemDetail;
        $('.travel_box').html('');
        if(data[0].lineItemDetail=="无"){
          $('.travel_box').html('暂无行程特色');
        }else{
          $('.travel_box').append(data[0].lineItemDetail);
        }
        if(line_plan_2 != undefined){
          arrange_html += ('<div class="line_pic">'+line_plan_2+'</div>');
          $('.arrangement_box').html('');
          $('.arrangement_box').append(arrange_html);
        }else if(line_plan_2 == undefined){
            for(var j=0;j<line_plan.length;j++){
             arrange_html+=('<div class="line_plan_box"><div class="lineTypeName"><div class="trip-box-items"><div class="trip-day">第'+(j+1)+'天</div></div><div>'+line_plan[j].theTitle+'</div></div>');
             arrange_html+=('<ul class="line_plan">');
             arrange_html+=('<li><i title="用餐" class="can_icon"></i><span>'+line_plan[j].theCan+'</span></li>');
             arrange_html+=('<li><i title="酒店" class="hotel_icon"></i><span>'+line_plan[j].theHotel+'</span></li>');
             arrange_html+=('<li><i title="交通" class="traffic_icon"></i><span>'+line_plan[j].theTraffic+'</span></li>');
             arrange_html+=('</ul>');
             arrange_html+=('<p class="line_discription">'+line_plan[j].theDesc+'</p>');
             arrange_html+=('<div class="line_pic">');
             if(line_plan[j].img==''){
               arrange_html+=('<div></div>');
             }else{
               var imgArr = line_plan[j].img.split(',');
               for(var i=0;i<imgArr.length;i++){
                 arrange_html+=('<img src="'+imgArr[i]+'">');
               }  
             }
             arrange_html+=('</div></div>');
            }
            $('.arrangement_box').html('');
            if(line_plan.length==0){
              $('.arrangement_box').html('暂无线路参考行程');
            }else{
              $('.arrangement_box').append(arrange_html);
            }
          }
        $('.flight_box').html('');
        if(data[2].lineItemDetail=="无"){
          $('.flight_box').html('暂无参考航班');
        }else{
          $('.flight_box').append(data[2].lineItemDetail);
        }
        $('.hotel_box').html('');
        if(data[3].lineItemDetail=="无"){
          $('.hotel_box').html('暂无参考酒店');
        }else{
          $('.hotel_box').append(data[3].lineItemDetail);
        }
        $('.fee_box').html('');
        if(data[4].lineItemDetail=="无"){
          $('.fee_box').html('暂无费用说明');
        }else{
          $('.fee_box').append(data[4].lineItemDetail); 
        }
        $('.attention_box').html('');
        if(data[5].lineItemDetail=="无"){
          $('.attention_box').html('暂无注意事项');
        }else{
          $('.attention_box').append(data[5].lineItemDetail);
        }    
   } 
   //显示购物及自费项目
    function shopping_info(data){
      var self_fee_html = '';
      var shopping_fee_html = '';
      if(data.selfFee.length==0 && data.shopping.length==0){
        $('#shopping').css('display','none');
      }else{
        $('#shopping').css('display','block');
        if(data.selfFee.length==0){
          $('#self_fee').css('display','none');
        }else{
          $('#self_fee').css('display','block');
          for(var i=0;i<data.selfFee.length;i++){
            self_fee_html+='<div><li><div class="self_fee_time lf"><span>时间：</span>'+'第'+data.selfFee[i].theDay+'天'+'<span>'+data.selfFee[i].theTime+'</span></div><div class="self_fee_place rt"><span>地点：</span>'+data.selfFee[i].place+'</div></li>';
//             self_fee_html+='<li></li>';
//             self_fee_html+='<li><span>地点：</span>'+data.selfFee[i].place+'</li>';
            
            if(data.selfFee[i].productInfo==null){
              self_fee_html+='<li><div class="lf self_fee_program"><span>费用：</span>暂无</div><div class="rt self_fee_stay"><span>时长：</span>'+data.selfFee[i].stayTime+'</div></li>';
            }else{
              self_fee_html+='<li><div class="lf self_fee_program"><span>费用：</span>'+data.selfFee[i].productInfo+'</div><div class="rt self_fee_stay"><span>时长：</span>'+data.selfFee[i].stayTime+'</div></li>';
            }
            self_fee_html+='<li><span>项目：</span>'+data.selfFee[i].name+'</li>';
//             self_fee_html+='<li><span>时长：</span>'+data.selfFee[i].stayTime+'</li>';
            self_fee_html+='<li><span>其他说明：</span>'+data.selfFee[i].otherInfo+'</li></div>';
          } 
        }
        $('#self_fee_list').html('');
        $('#self_fee_list').append(self_fee_html);
        if(data.shopping.length==0){
          $('#shopping_fee').css('display','none');
        }else{
          $('#shopping_fee').css('display','block');
           for(var j=0;j<data.shopping.length;j++){
            shopping_fee_html+='<div><li><div class="self_fee_time lf"><span>时间：</span>'+'第'+data.shopping[j].theDay+'天'+'<span>'+data.shopping[j].theTime+'</span></div><div class="self_fee_place rt"><span>地点：</span>'+data.shopping[j].place+'</div></li>';
//             shopping_fee_html+='<li><span>时间：</span>'+data.shopping[j].theTime+'</li>';
//             shopping_fee_html+='<li><span>地点：</span>'+data.shopping[j].place+'</li>';
            shopping_fee_html+='<li><div class="lf self_fee_program"><span>购物场所：</span>'+data.shopping[j].name+'</div><div class="rt self_fee_stay"><span>停留时长：</span>'+data.shopping[j].stayTime+'</div></li>';
            if(data.shopping[j].productInfo==null){
              shopping_fee_html+='<li><span>商品信息：</span>暂无</li>';
            }else{
              shopping_fee_html+='<li><span>商品信息：</span>'+data.shopping[j].productInfo+'</li>';
            }
//             shopping_fee_html+='<li><span>停留时长：</span>'+data.shopping[j].stayTime+'</li>';
            shopping_fee_html+='<li><span>其他说明：</span>'+data.shopping[j].otherInfo+'</li></div>';
          } 
        }
        $('#shopping_fee_list').html('');
        $('#shopping_fee_list').append(shopping_fee_html);
      }
    }
  });
    $('#product_detail_mask').click(function(){
        $('#product_detail_mask').css("display","none");
        $('#product_detail_page').css("display","none");
    });
    $(document).keydown(function(e){
    if(e.keyCode == 27){
      $('#product_detail_mask').css("display","none");
      $('#product_detail_page').css("display","none");
    }
  });
    //详情页的点击下载附件事件
          $('.download_attachment').hover(function(){
            var this_ = $(this); 
            this_.children('.down_load_box_2').css("display","block");
            $.ajax({
              type:"post",
              url:"main?xwl=345VRFPPO2T2",
              data:{lineID:lineID},
              success:function(text){
                var data = JSON.parse(text).rows;
                var li_files_html= '';
                if(data.length==0){
                  this_.children('.down_load_box_2').html('');
                  this_.children('.down_load_box_2').append('<div style="height:150px;line-height:150px;font-size:14px;color:#9B9B9B;">没有可以下载的文件哦！</div>');
                }else{
                  this_.children('.down_load_box_2').html('');
                  var fileUrl= [];
                  for(var i=0;i<data.length;i++){
                    li_files_html+=('<li>');
                    li_files_html+=('<div class="down_load_file_btn rt"><a href="'+data[i].fileUrl+'" download="'+data[i].fileUrl+'">下载</a></div>');
                    li_files_html+=('<div class="lf"><img src="https://tcdn.op110.com.cn/files/1/file/20180331/word_03_1522465502763.png" class="word_icon"></div>');
                    li_files_html+=('<div class="file_info lf">');
                    li_files_html+=('<div class="file_name">'+data[i].fileTitle+'</div>');
                    li_files_html+=('<div class="file_up">'+data[i].admName+' 上传</div>');
                    li_files_html+=('</div>');
                    li_files_html+=('</li>');
                    fileUrl.push(data[i].fileUrl);
                  }
                  this_.children('.down_load_box_2').append('<ul>'+li_files_html+'</ul><div class="down_load_all"><a id="down_load_all_files">下载全部</a></div>');
                }
                  //下载全部文件
                    var btn = document.getElementById('down_load_all_files');
                    //将要进行多文件下载的文件地址，以组数的形式存起来
                    function download(href) {
                        var a = document.createElement("a"), //创建a标签
                            e = document.createEvent("MouseEvents"); //创建鼠标事件对象
                        e.initEvent("click", false, false); //初始化事件对象
                        a.href = href; //设置下载地址
                        a.download = name; //设置下载文件名
                        a.dispatchEvent(e); //给指定的元素，执行事件click事件
                    }
                    //给多文件下载按钮添加点击事件
                    btn.onclick = function down_load_all() {
                      for (var i=0; i<fileUrl.length;i++) {
                        download(fileUrl[i]);
                      }
                    }
              }
            });
          },function(){
            $('.down_load_box_2').css("display","none");
          });
          //导出参考行程显示弹窗
          $('.download_consult').hover(function(){
              $('#download_consult_box').show();              
          },function(){
              $('#download_consult_box').hide();
          });
     
          $(document).click(function(e){
            var div_blank_btn = $('.down_load_box_2');   // 设置目标区域
            if(!div_blank_btn.is(e.target) && div_blank_btn.has(e.target).length === 0){
              $('.down_load_box_2').css("display","none");
            }
          }); 
     
  }
  show_mask_procuct();

     //返回顶部
     $(function(){
        $('#to_top').click(function(){
            $('html,body').animate({scrollTop: 0},500);
        });
     //关闭窗口
        $('#close').click(function(){
            $('#product_detail_mask').css("display","none");
            $('#product_detail_page').css("display","none");
        });
        $('.close_icon').click(function(){
            $('#product_detail_mask').css("display","none");
            $('#product_detail_page').css("display","none");
        });
     });