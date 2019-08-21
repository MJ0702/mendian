  //获取用户当前所在城市
  function init() {
    layer.load();
    //   $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){  
    //       // alert(remote_ip_info.country);//国家  
    //       // alert(remote_ip_info.province);//省份  
    //       // alert(remote_ip_info.city);//城市
    //       $('#location_city').html(remote_ip_info.city);
    //   });
    //     $.ajax({
    //       type:"get",
    //       url:"main?xwl=343176WV5071",
    //       success:function(text){
    //         var data = Wb.decode('{"user_end_num_show_config":1,"user_end_num_config":9,"user_end_num_than_config":"≥9","user_end_num_less_config":"紧张","user_show_sup_info":1,"btb_price_type":3,"pubFromCityID":"0","pubFromCityName":"不限","isVip":0}');
    //       }
    //     });
    var userConfig = Wb.decode('{"user_end_num_show_config":1,"user_end_num_config":9,"user_end_num_than_config":"≥9","user_end_num_less_config":"紧张","user_show_sup_info":1,"btb_price_type":3,"pubFromCityID":"0","pubFromCityName":"不限","isVip":0}'); //获取运营对门店的配置
    //   //根据配置隐藏权限按钮
    if ('false' == "false") { //判断是否有查看同行价权限
      if (userConfig.btb_price_type * 1 != 3) { //隐藏同行价和利润、
        $('.hide_price').css("display", "none");
      } else {
        $('.show_price').css("display", "block");
      }
    } else {
      $('.hide_price').css("display", "none");
    }

    if (userConfig.user_show_sup_info * 1 != 1) { //隐藏供应商
      $('.show_supplier').css("display", "none");
    } else {
      $('.show_supplier').css("display", "block");
    }
    if (userConfig.user_show_sup_info * 1 != 1) {
      $('#supplier').hide();
      $('#condition').css("height", "200px");
    } else {
      $('#supplier').show();
      $('#condition').css("height", "228px");
    }
    //鼠标移入出发城市小三角旋转
    $('#pro_city').hover(function () {
      //       $('#pro_city_box').css("display","block");
      $(this).css("cursor", "pointer");
      $('.triangle_down_1').css("background-image",
        "url(https://tcdn.op110.com.cn/files/1/file/20180329/triangle_up_1_1522305475248.png)");

    }, function () {
      //       $('#pro_city_box').css("display","none");
      $('.triangle_down_1').css("background-image",
        "url(https://tcdn.op110.com.cn/files/1/file/20180329/triangle_down_fill_1522304944758.png)");
    });
    //点击出发城市显示选择框
    $('#pro_city').click(function (e) {
      e.stopPropagation();
      //       $('#pro_city_box').css("display","block");
      $('#pro_city_box').fadeIn(300);
      var len = $('.pro_city_box_bottom').children();
      if (len.length == 0) {
        $('.pro_city_box_middle>span').first().addClass('pro_city_box_middle_active')
        $.ajax({
          type: "post",
          url: "main?xwl=343176WV3WVK",
          data: {
            startAlpha: "all"
          },
          success: function (text) {
            var data = JSON.parse(text).rows;
            $('.pro_city_box_bottom').children().remove();
            for (var i = 0; i < data.length; i++) {
              $('.pro_city_box_bottom').append('<span data-pubfromcityid="' + data[i].pubFromCityID + '">' +
                data[i].pubFromCityName + '</span>');
            }
          }
        });
      }
    });

    //关闭选择框
    $('.pro_city_box_close').click(function (e) {
      e.stopPropagation();
      //       $('#pro_city_box').css("display","none");
      $('#pro_city_box').fadeOut(300);
      $('.pro_city_box_middle>span').removeClass('pro_city_box_middle_active');
      $('.pro_city_box_bottom').children().remove();
    });
    $(document).click(function (e) {
      var div_blank_city = $('#pro_city_box'); // 设置目标区域
      var div_blank_up_city_box = $('#pro_city');
      if ((!div_blank_city.is(e.target) && div_blank_city.has(e.target).length === 0) && (!div_blank_up_city_box.is(
          e.target) && div_blank_up_city_box.has(e.target).length === 0)) {
        //       $('#pro_city_box').css("display","none");
        $('#pro_city_box').fadeOut(300);
        $('.pro_city_box_middle>span').removeClass('pro_city_box_middle_active');
        $('.pro_city_box_bottom').children().remove();
      }
    });
    //根据字母选择出发城市
    $('.pro_city_box_middle>span').click(function (e) {
      e.stopPropagation();
      if ($(this).hasClass('pro_city_box_middle_active')) {
        $(this).siblings().removeClass('pro_city_box_middle_active');
      } else {
        $(this).siblings().removeClass('pro_city_box_middle_active');
        $(this).addClass('pro_city_box_middle_active');
      }
      var startAlpha = $(this).text();
      if (startAlpha == "全部") {
        startAlpha = "all";
      }
      $.ajax({
        type: "post",
        url: "main?xwl=343176WV3WVK",
        data: {
          startAlpha: startAlpha
        },
        success: function (text) {
          var data = JSON.parse(text).rows;
          $('.pro_city_box_bottom').children().remove();
          for (var i = 0; i < data.length; i++) {
            $('.pro_city_box_bottom').append('<span data-pubfromcityid="' + data[i].pubFromCityID + '">' +
              data[i].pubFromCityName + '</span>');
          }
        }
      });
    });
    //全局变量  
    var type_num = 0; //判断是线路还是团期
    var hide_price = true; //判断是否显示同行价
    var hide_supplier = false; //判断是否显示供应商
    var hide_condition = false; //判断是否显示搜索条件
    var price_rank = 0; //价格排序
    var profit_rank = 0; //利润排序
    //获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var monthEnd = date.getMonth() + 1;
    var strDate = date.getDate();
    var num = 0; //产品分类搜索标签个数
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var startDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    var s_time = date.getFullYear() + seperator1 + month + seperator1 + strDate;

    setTimeout(function () {
      $('#start_dateTime').val(s_time);
    }, 300);

    //含有所有搜索条件的json
    var data_params = {
      skey: "",
      bySort: 1,
      pubFromCityID: "",
      sup_cpy_id: "",
      price: "",
      days: "",
      startDate: startDate,
      endDate: "",
      bySort: "",
      endNumType: "",
      confirm_type: "",
      startPrice: "",
      endPrice: "",
      operateType: "",
      moreDay: "",
      nav_id: "",
      page: 1,
      limit: 10,
      start: 0,
      storeLineList: 'storeLineList'
    };
    //--------------显示价格、下载附件---------------------------------
    function look() {
      $('#product_list').find(".product_price").hover(function () { //鼠标移入时显示具体价格
        $(this).find('.look_price_detail').css("display", "block");
      }, function () {
        $(this).find('.look_price_detail').css("display", "none");
      });
      //显示大图
      $('.product_detail_L').hover(function () {
        $(this).find('.big_pic').show();
      }, function () {
        $(this).find('.big_pic').hide();
      });
      //点击查看价格
      $('.look_price_detail').click(function () {
        $(this).parent().css("display", "none");
        $(this).parent().next().find('.show_price_detail_box').css("display", "block");
      });
      //点击收起价格
      $('.hide_box').click(function () {
        $(this).parent().css("display", "none");
        $(this).parent().parent().parent().first().children().first().css("display", "block");
      });
      $(document).click(function (e) {
        var div_blank_up = $('.show_price_detail_box'); // 设置目标区域
        var div_blank_up_1 = $('.look_price_detail');
        if ((!div_blank_up.is(e.target) && div_blank_up.has(e.target).length === 0) && (!div_blank_up_1.is(e
            .target) && div_blank_up_1.has(e.target).length === 0)) {
          $('.show_price_detail_box').css("display", "none");
          $('.product_price').css("display", "block")
        }
      });
      //点击下载时获取数据显示下载窗口
      $('.downLoad').hover(function () {
        var this_ = $(this);
        this_.find('.down_load_box').css("display", "block");
        var lineID = $(this).parent().parent().parent().children().eq(2).find('.product_title_c').attr(
          'data-lineid');
        $.ajax({
          type: "post",
          url: "main?xwl=345VRFPPO2T2",
          data: {
            lineID: lineID
          },
          success: function (text) {
            var data = JSON.parse(text).rows;
            var li_file_html = '';
            if (data.length == 0) {
              this_.parent().find('.down_load_box').html('');
              this_.parent().find('.down_load_box').append(
                '<div style="height:150px;line-height:150px;font-size:14px;color:#9B9B9B;">没有可以下载的文件哦！</div>'
                );
            } else {
              this_.parent().find('.down_load_box').html('');
              var fileUrl = [];
              for (var i = 0; i < data.length; i++) {
                li_file_html += ('<li>');
                li_file_html += ('<div class="down_load_file_btn rt"><a href="' + data[i].fileUrl +
                  '" download="' + data[i].fileUrl + '">下载</a></div>');
                li_file_html += (
                  '<div class="lf"><img src="https://tcdn.op110.com.cn/files/1/file/20180331/word_03_1522465502763.png" class="word_icon"></div>'
                  );
                li_file_html += ('<div class="file_info lf">');
                li_file_html += ('<div class="file_name">' + data[i].fileTitle + '</div>');
                li_file_html += ('<div class="file_up">' + data[i].admName + ' 上传</div>');
                li_file_html += ('</div>');
                li_file_html += ('</li>');
                fileUrl.push(data[i].fileUrl);
              }
              this_.parent().find('.down_load_box').append('<ul>' + li_file_html +
                '</ul><div class="down_load_all"><a id="down_load_all_files">下载全部</a></div>');
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
              for (var i = 0; i < fileUrl.length; i++) {
                download(fileUrl[i]);
              }
            }
          }
        });
      }, function () {
        $('.down_load_box').css("display", "none");
      });

      $(document).click(function (e) {
        var div_blank_1 = $('.down_load_box'); // 设置目标区域
        if (!div_blank_1.is(e.target) && div_blank_1.has(e.target).length === 0) {
          $('.down_load_box').css("display", "none");
        }
      });
    }
    //----------------右上方小图标按钮的显示隐藏功能------------------------------
    //显示/隐藏同行价
    $('#icon_1').click(function () {
      var this_ = $(this);
      if (userConfig.btb_price_type * 1 == 3) {
        if (this_.hasClass('hide_price')) {
          hide_price = false;
          this_.removeClass('hide_price');
          this_.addClass('show_price');
          this_.attr("title", "隐藏同行价");
          $('.trade_price').css("display", "block");
          $('.trade_price_peers').css("display", "table-row");
          $('.trade_price_profit').css("display", "table-row");
          $('.market_price').css("margin-top", "0px");
          $('.detail_t table').css("margin-top", "0px");
        } else {
          hide_price = true;
          this_.removeClass('show_price');
          this_.addClass('hide_price');
          this_.attr("title", "显示同行价");
          $('.trade_price').css("display", "none");
          $('.trade_price_peers').css("display", "none");
          $('.trade_price_profit').css("display", "none");
          $('.market_price').css("margin-top", "15px");
          $('.detail_t table').css("margin-top", "24px");
        }
      }
    });
    //显示/隐藏供应商
    $('#icon_2').click(function () {
      var this_ = $(this);
      if (this_.hasClass('hide_supplier')) {
        hide_supplier = false;
        this_.removeClass('hide_supplier');
        this_.addClass('show_supplier');
        this_.attr("title", "隐藏供应商");
        $('.product_supplier').css("display", "block");
        $('.product_supplier_plan').css("display", "block");
        $('#supplier').show();
        $('#condition').css("height", "228px");
      } else {
        hide_supplier = true;
        this_.removeClass('show_supplier');
        this_.addClass('hide_supplier');
        this_.attr("title", "显示供应商");
        $('.product_supplier').css("display", "none");
        $('.product_supplier_plan').css("display", "none");
        $('#supplier').hide();
        $('#condition').css("height", "200px");
      }
    });
    //显示/隐藏搜索条件
    $('#icon_3').click(function () {
      var this_ = $(this);
      if (this_.hasClass('hide_condition')) {
        hide_condition = false;
        this_.removeClass('hide_condition');
        this_.addClass('show_condition');
        this_.attr("title", "隐藏更多搜索条件");
        $('#condition').css("display", "block");
        $('#product').css("margin-top", "20px");
      } else {
        hide_condition = true;
        this_.removeClass('show_condition');
        this_.addClass('hide_condition');
        this_.attr("title", "显示更多搜索条件");
        $('#condition').css("display", "none");
        $('#product').css("margin-top", "0px");
      }
    });

    //----------------------------------------鼠标移入导航栏时出现下方窗口,获取导航栏的数据---------------------------------------------
    $.ajax({
      type: "get",
      url: 'main?xwl=345TF0H0WX67',
      success: function (text) {
        var data = JSON.parse(text).rows;
        var arr = [];
        var arr_more = [];
        var firstSplitIndex = 0;
        var firstWidth = 0;
        if (data.length == 0) {
          return;
        }
        // 遍历属性数组，添加折叠断点一级导航 firstSplitIndex
        if (data.length > 0) {
          for (var index = 0; index < data.length; index++) {
            var item = data[index]
            var itemWith = item['nav_title'].length * 14 + 30
            firstWidth += itemWith
            if (firstWidth >= 1200) {
              firstSplitIndex = index
              break;
            }
          }
        }
        //判断一级导航如果超过一行（1200px）
        if (firstSplitIndex > 0) {
          // 前一行保存在arr中
          for (var i = 0; i < firstSplitIndex; i++) {
            arr.push(data[i]);
          }
          // 整个一级导航保存在arr_more
          for (var j = 0; j < data.length; j++) {
            arr_more.push(data[j]);
          }
          // $('#nav_ul')中添加一行数据
          for (var j = 0; j < arr.length; j++) {
            var tag_html = "";
            tag_html += '<li class="product_list_intro">';
            tag_html += '<a href="#" id="yiriyou" data-navid="' + arr[j].id + '">' + arr[j].nav_title + '</a>';
            var first = arr[j].first;
            if (first.length > 0) {
              tag_html += '<ul class="nav_cate_box">';
              tag_html += '<div class="box_detail">';
              var first = arr[j].first;
              for (var i = 0; i < first.length; i++) {
                tag_html += '<div class="dl">';
                tag_html += '<div class="dt" data-navid="' + first[i].id + '" title="' + first[i].nav_title +
                  '">' + first[i].nav_title + '</div>';
                var next = first[i].next;
                if (next.length > 0) {
                  tag_html += '<div class="dt-mask" data-navid="' + first[i].id + '" title="' + first[i]
                    .nav_title + '">' + first[i].nav_title + '</div>';
                  tag_html += '<div class="dd">';
                  for (var n = 0; n < next.length; n++) {
                    tag_html += '<span class="nav_next_content" data-navid="' + next[n].id + '">' + next[n]
                      .nav_title + '</span>';
                  }
                  tag_html += '</div>';
                }
                tag_html += '</div>';
              }
              tag_html += '</div>';
              tag_html += '</ul>';
            }
            tag_html += '</li>';
            $('#nav_ul_some').append(tag_html);
          }
          // 一行导航后面添加更多
          more_tag_btn =
            '<li class="product_list_intro nav_more">更多<span class="more_icon"><i class="down_icon"></i></span></li>';
          $('#nav_ul_some').append(more_tag_btn);
          $('#nav_ul_some .nav_more').on('click', function () {
            $('#nav_ul_some').hide();
            $('#nav_ul_more').show();
          })


          //$('#nav_ul')中添加所有导航数据
          for (var j = 0; j < arr_more.length; j++) {
            var tag_html = "";
            tag_html += '<li class="product_list_intro">';
            tag_html += '<a href="#" id="yiriyou" data-navid="' + arr_more[j].id + '">' + arr_more[j].nav_title +
              '</a>';
            var first = arr_more[j].first;
            if (first.length > 0) {
              if (j >= firstSplitIndex) {
                tag_html += '<ul class="nav_cate_box nav_cate_box_second">';
              } else {
                tag_html += '<ul class="nav_cate_box">';
              }
              tag_html += '<div class="box_detail">';
              for (var i = 0; i < first.length; i++) {
                tag_html += '<div class="dl">';
                tag_html += '<div class="dt" data-navid="' + first[i].id + '" title="' + first[i].nav_title +
                  '">' + first[i].nav_title + '</div>';
                var next = first[i].next;
                if (next.length > 0) {
                  tag_html += '<div class="dt-mask" data-navid="' + first[i].id + '" title="' + first[i]
                    .nav_title + '">' + first[i].nav_title + '</div>';
                  tag_html += '<div class="dd">';
                  for (var n = 0; n < next.length; n++) {
                    if (next[n].nav_title && next[n].id) {
                      tag_html += '<span class="nav_next_content" data-navid="' + next[n].id + '">' + next[n]
                        .nav_title + '</span>';
                    }
                  }
                  tag_html += '</div>';
                }
                tag_html += '</div>';
              }
              tag_html += '</div>';
              tag_html += '</ul>';
            }
            tag_html += '</li>';
            $('#nav_ul_more').append(tag_html);
          }
          // 输入移入一级导航，显示二级导航，移出也显示二级导航
          $(".product_list_intro").hover(
            function () {
              $(".product_list_intro a").removeClass("a_after");
              $(".product_list_intro").removeClass("product_list_intro_hover");
              $(this).addClass("product_list_intro_hover")
              // 当一级导航含有二级导航时，给一级导航a元素添加伪类下三角
              if ($(this).find(".nav_cate_box").length > 0) {
                $(this).children("a").addClass("a_after")
              }
            },
            function () {
              $(this).addClass("product_list_intro_hover")
            }
          )
          $("body").click(function () {
            $(".product_list_intro").removeClass("product_list_intro_hover");
          })

          $(".dl").hover(function () {
            $(".dl .dt-mask").css({
              "z-index": 99
            });
            $(this).find(".dt-mask").css({
              "z-index": 101
            })
          })
          //
          $('.product_list_intro').on("click", "a", function () {
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }
            data_params.nav_id = $(this).attr('data-navid');

            submit_params();
          })
          //
          $('.box_detail').on("click", ".dt", function (e) {
            e.stopPropagation(); //阻止事件冒泡
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }
            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          })
          //
          $('.box_detail').on("click", ".nav_next_content", function (e) {
            e.stopPropagation(); //阻止事件冒泡
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }

            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          })
          //
          $('.nav_more').on("click", ".nav_more_list", function () {
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }
            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          })
        } else {
          for (var i = 0; i < data.length; i++) {
            arr.push(data[i]);
          }
          // $('#nav_ul_all')中添加所有导航
          for (var j = 0; j < arr.length; j++) {
            var tag_html = "";
            tag_html += '<li class="product_list_intro">';
            tag_html += '<a href="#" id="yiriyou" data-navid="' + arr[j].id + '">' + arr[j].nav_title + '</a>';
            var first = arr[j].first;
            if (first.length > 0) {
              tag_html += '<ul class="nav_cate_box">';
              tag_html += '<div class="box_detail">';
              for (var i = 0; i < first.length; i++) {
                tag_html += '<div class="dl">';
                tag_html += '<div class="dt" data-navid="' + first[i].id + '" title="' + first[i].nav_title +
                  '">' + first[i].nav_title + '</div>';
                var next = first[i].next;
                if (next.length > 0) {
                  tag_html += '<div class="dt-mask" data-navid="' + first[i].id + '" title="' + first[i]
                    .nav_title + '">' + first[i].nav_title + '</div>';
                  tag_html += '<div class="dd">';
                  var next = first[i].next;
                  for (var n = 0; n < next.length; n++) {
                    tag_html += '<span class="nav_next_content" data-navid="' + next[n].id + '">' + next[n]
                      .nav_title + '</span>';
                  }
                  tag_html += '</div>';
                }

                tag_html += '</div>';
              }
              tag_html += '</div>';
              tag_html += '</ul>';
            }
            tag_html += '</li>';
            $('#nav_ul_all').append(tag_html);
          }
          // 输入移入一级导航，显示二级导航，移出也显示二级导航
          $(".product_list_intro").hover(
            function () {
              $(".product_list_intro").removeClass("product_list_intro_hover");
              $(this).addClass("product_list_intro_hover")
            },
            function () {
              $(this).addClass("product_list_intro_hover")
            }
          )
          $("body").click(function () {
            $(".product_list_intro").removeClass("product_list_intro_hover");
          })
          $(".dl").hover(function () {
            $(".dl .dt-mask").css({
              "z-index": 99
            });
            $(this).find(".dt-mask").css({
              "z-index": 101
            })
          })
          $('.product_list_intro').on("click", "a", function () {
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }
            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          })
          // 
          $('.box_detail').on("click", ".dt", function (e) {
            e.stopPropagation(); //阻止事件冒泡
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }
            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          })
          // 
          $('.box_detail').on("click", ".nav_next_content", function (e) {
            e.stopPropagation(); //阻止事件冒泡
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }

            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          });
          $('.nav_more').on("click", ".nav_more_list", function () {
            layer.load();
            num++;
            var li_city = $('#choose_show_details>li>span:first-child');
            var text = $(this).text();
            if (num > 1) {
              li_city.each(function () {
                if ($(this).text() === '产品类别') {
                  $(this).siblings().find('.tag_text').html('');
                  $(this).siblings().find('.tag_text').append(text);
                }
              });
            } else {
              $('#choose_show>div').css("display", "block"); //显示'已选条件'
              $('#del_all_condition').css("display", "block"); //显示'全部清除'
              $('#choose_show_details').append(
                '<li class="lf"><span class="tag">产品类别</span><span class="tag_choose"><span class="tag_text">' +
                text + '</span><span></span><span class="condition_del">x</span></span></li>');
            }
            data_params.nav_id = $(this).attr('data-navid');
            submit_params();
          })
        }
      }
    })
    //------------------搜索-----------------------------------------
    //输入框搜索
    function search() {
      $('#btn').click(function () {
        var skey = $('#serch_content').val();
        //去掉所有空格
        var Skey = skey.replace(/(^\s+)|(\s+$)/g, "");
        data_params.skey = Skey;
        submit_params();
      });
      $("#serch_content").keydown(function (e) {
        if (e.keyCode == 13) {
          var skey = $('#serch_content').val();
          //去掉所有空格
          var Skey = skey.replace(/(^\s+)|(\s+$)/g, "");
          data_params.skey = Skey;
          submit_params();
        }
      });
    }
    search();
    //------------导航栏------------------------------------------------
    //获取出发城市的数据
    $.ajax({
      type: "get",
      url: "main?xwl=345VRFPPEYCA",
      success: function (text) {
        var data = JSON.parse(text).rows;
        for (var i = 0; i < data.length; i++) {
          $('#list_details_city').append('<span data-pubFromCityID="' + data[i].pubFromCityID + '">' + data[i]
            .pubFromCityName + '</span>')
        }
      }
    });
    //获取供应商的数据
    $.ajax({
      type: "get",
      url: "main?xwl=345VRFPPEYAV",
      success: function (text) {
        var data = JSON.parse(text).rows;
        for (var j = 0; j < data.length; j++) {
          $('#list_details_supplier').append('<span data-sup_cpy_id="' + data[j].sup_cpy_id + '">' + data[j]
            .sup_cpy_name + '</span>');
        }
        var w = 0;
        $("#list_details_supplier span").each(function () {
          w += parseInt($(this).width()); //获取宽度。并累加
        });
        var len = w + ((data.length - 1) * 15);
        //         console.log(len);
        if (len > 1020) {
          $('#list_details_supplier').append('<b class="sup_more">更多</b>');
        }
        //点击供应商更多
        $('.sup_more').on('click', function (e) {
          e.stopPropagation();
          //       $('#pro_city_box').css("display","block");
          $('#city_pro_city_box').fadeIn(300);
          var len = $('.city_pro_city_box_bottom').children();
          if (len.length == 0) {
            $('.city_pro_city_box_middle>span').first().addClass('city_pro_city_box_middle_active')
            $.ajax({
              type: "post",
              url: "main?xwl=345VRFPPEYAV",
              data: {
                startAlpha: "all"
              },
              success: function (text) {
                var data = JSON.parse(text).rows;
                $('.city_pro_city_box_bottom').children().remove();
                for (var i = 0; i < data.length; i++) {
                  $('.city_pro_city_box_bottom').append('<span data-sup_cpy_id="' + data[i].sup_cpy_id +
                    '">' + data[i].sup_cpy_name + '</span>');
                }
              }
            });
          }
        });

        //关闭选择框
        $('.city_pro_city_box_close').click(function (e) {
          e.stopPropagation();
          //       $('#pro_city_box').css("display","none");
          $('#city_pro_city_box').fadeOut(300);
          $('.city_pro_city_box_middle>span').removeClass('city_pro_city_box_middle_active');
          $('.city_pro_city_box_bottom').children().remove();
        });
        $(document).click(function (e) {
          var div_blank_sup = $('#city_pro_city_box'); // 设置目标区域
          var div_blank_up_sup_box = $('#city_pro_city');
          if ((!div_blank_sup.is(e.target) && div_blank_sup.has(e.target).length === 0) && (!
              div_blank_up_sup_box.is(e.target) && div_blank_up_sup_box.has(e.target).length === 0)) {
            //       $('#pro_city_box').css("display","none");
            $('#city_pro_city_box').fadeOut(300);
            $('.city_pro_city_box_middle>span').removeClass('city_pro_city_box_middle_active');
            $('.city_pro_city_box_bottom').children().remove();
          }
        });
        //根据字母选择出发城市
        $('.city_pro_city_box_middle>span').click(function (e) {
          e.stopPropagation();
          //           console.log(2222);
          if ($(this).hasClass('city_pro_city_box_middle_active')) {
            $(this).siblings().removeClass('city_pro_city_box_middle_active');
          } else {
            $(this).siblings().removeClass('city_pro_city_box_middle_active');
            $(this).addClass('city_pro_city_box_middle_active');
          }
          var startAlpha = $(this).text();
          //           console.log(startAlpha);
          if (startAlpha == "全部") {
            startAlpha = "all";
          }
          $.ajax({
            type: "post",
            url: "main?xwl=345VRFPPEYAV",
            data: {
              startAlpha: startAlpha
            },
            success: function (text) {
              var data = JSON.parse(text).rows;
              $('.city_pro_city_box_bottom').children().remove();
              for (var i = 0; i < data.length; i++) {
                $('.city_pro_city_box_bottom').append('<span data-sup_cpy_id="' + data[i].sup_cpy_id +
                  '">' + data[i].sup_cpy_name + '</span>');
              }
            }
          });
        });
      }
    });
    //出发日期
    //获取当前时间
    var data = new Date();
    var year = data.getFullYear();
    var date_html = "";
    var date_control = "";
    var date_holiday = "";
    //日期输入框
    date_control = '<div class="layui-inline">' +
      '<div class="layui-input-inline">' +
      '<input type="text" class="layui-input" id="start_dateTime" style="width:90px;height:25px" placeholder="起始日期">' +
      '</div>' +
      '</div>' +
      '<span style="margin-left:4px">-</span>' +
      '<div class="layui-inline">' +
      '<div class="layui-input-inline">' +
      '<input type="text" class="layui-input" id="end_dateTime" style="width:90px;height:25px;margin-left:-10px" placeholder="截至日期">' +
      '</div>' +
      '</div>' +
      '<button class="btn_Date">确定</button>';
    date_holiday = '<span data-startdate="' + year + '-05-01" data-enddate="' + year +
      '-05-03">五一</span><span data-startdate="' + year + '-10-01" data-enddate="' + year + '-10-07">国庆</span>';
    data.setMonth(data.getMonth()); //获取到当前月份,设置月份
    for (var i = 0; i < 12; i++) {
      if (i == 0) {
        data.setMonth(data.getMonth());
      } else {
        data.setMonth(data.getMonth() + 1); //每次循环一次 月份值加1
      }
      //获取每个月的最后一天
      var new_year = year; //取当前的年份   
      var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）   
      if (month > 12) { //如果当前大于12月，则年份转到下一年
        new_month -= 12; //月份减 
        new_year++; //年份增   
      }
      var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
      var dt = new Date(new_date.getTime() - 1000 * 60 * 60 * 24);
      var st = dt.getFullYear() + seperator1 + (dt.getMonth() + 1) + seperator1 + 01 + " " + 00 + seperator2 + 00 +
        seperator2 + 00;
      var et = dt.getFullYear() + seperator1 + (dt.getMonth() + 1) + seperator1 + dt.getDate() + " " + 23 + seperator2 +
        59 + seperator2 + 59;
      date_html += '<span data-startdate="' + st + '" data-enddate="' + et + '">' + data.getFullYear() + "-" + (data
        .getMonth() + 1) + '</span>';
      $('#list_details_date').html(date_html + date_holiday + date_control);
    }
    //日期时间渲染
    layui.use("laydate", function () {
      var laydate = layui.laydate;
      //时间选择器
      laydate.render({
        elem: '#start_dateTime',
        theme: '#0695E2'
      });
      laydate.render({
        elem: '#end_dateTime',
        theme: '#0695E2'
      });
    });
    //更多搜索条件   
    function choose_condition() {
      //按出发城搜索
      var m = 0,
        n = 0,
        p = 0,
        l = 0,
        j = 0;
      $('#list_details_city').on('click', 'span', function () {
        layer.load();
        m++;
        var this_ = $(this);
        var pubFromCityID = this_.attr("data-pubFromCityID");
        data_params.pubFromCityID = pubFromCityID;
        var text = this_.text();
        var title = this_.parent().siblings().text();
        var li_city = $('#choose_show_details>li>span:first-child');
        if (m > 1) {
          li_city.each(function () {
            if ($(this).text() === '出发城市') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append('<li class="lf"><span class="tag">' + title +
            '</span><span class="tag_choose"><span class="tag_text">' + text +
            '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        $('#location_city').html('');
        $('#location_city').html(text);
        submit_params();
      });
      $('.pro_city_box_bottom').on("click", "span", function (e) {
        e.stopPropagation();
        m++;
        var city_th = $(this);
        var pubFromCity_id = city_th.attr("data-pubFromCityID");
        data_params.pubFromCityID = pubFromCity_id;
        var text = city_th.text();
        var li_city = $('#choose_show_details>li>span:first-child');
        if (m > 1) {
          li_city.each(function () {
            if ($(this).text() === '出发城市') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append(
            '<li class="lf"><span class="tag">出发城市</span><span class="tag_choose"><span class="tag_text">' +
            text + '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        $('#location_city').html('');
        $('#location_city').html(text);
        submit_params();
      });
      //按供应商搜索
      $('#list_details_supplier').on('click', 'span', function () {
        layer.load();
        n++;
        var this_sup = $(this);
        var sup_cpy_id = this_sup.attr("data-sup_cpy_id");
        data_params.sup_cpy_id = sup_cpy_id;
        var sup_text = this_sup.text();
        if (sup_text == "自营") {
          data_params.operateType = 0;
          data_params.sup_cpy_id = 0;
        } else if (sup_text == "不限") {
          data_params.operateType = "";
        } else {
          data_params.operateType = 1;
        }
        var sup_title = this_sup.parent().prev().text();
        var li_sup = $('#choose_show_details>li>span:first-child');
        if (n > 1) {
          li_sup.each(function () {
            if ($(this).text() === '供应商') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(sup_text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append('<li class="lf"><span class="tag">' + sup_title +
            '</span><span class="tag_choose"><span class="tag_text">' + sup_text +
            '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });
      $('.city_pro_city_box_bottom').on("click", "span", function (e) {
        e.stopPropagation();
        n++;
        var sup_th = $(this);
        var sup_cpy_id = sup_th.attr("data-sup_cpy_id");
        data_params.sup_cpy_id = sup_cpy_id;
        //         data_params.operateType = 1;
        var text = sup_th.text();
        if (text == "自营") {
          data_params.operateType = 0;
          data_params.sup_cpy_id = 0;
        } else if (text == "不限") {
          data_params.operateType = "";
        } else {
          data_params.operateType = 1;
        }
        var li_sup = $('#choose_show_details>li>span:first-child');
        if (n > 1) {
          li_sup.each(function () {
            if ($(this).text() === '供应商') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append(
            '<li class="lf"><span class="tag">供应商</span><span class="tag_choose"><span class="tag_text">' + text +
            '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });
      //按价格搜索
      $('#list_details_price').on('click', 'span', function () {
        layer.load();
        p++;
        $("input[name='price_min']").val('');
        $("input[name='price_max']").val('');
        var this_pri = $(this);
        var pri_text = this_pri.text();
        var startPrice = this_pri.attr("data-startprice");
        var endPrice = this_pri.attr("data-endPrice");
        data_params.startPrice = startPrice;
        data_params.endPrice = endPrice;
        var pri_title = this_pri.parent().siblings().text();
        var li_pri = $('#choose_show_details>li>span:first-child');
        if (p > 1) {
          li_pri.each(function () {
            if ($(this).text() === '价格区间') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(pri_text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append('<li class="lf"><span class="tag">' + pri_title +
            '</span><span class="tag_choose"><span class="tag_text">' + pri_text +
            '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });
      //输入价格区间进行搜索
      $('.btn_price').click(function () {
        p++;
        var price_min = $("input[name='price_min']").val();
        var price_max = $("input[name='price_max']").val();
        var pri_text = price_min + '元-' + price_max + '元';
        if (price_min == '') {
          return layer.msg('请输入最低价格哦', {
            shift: 6
          });
        }
        var reg = /^\d+(\.\d+)?$/;
        if (!reg.test(price_min)) {
          $("input[name='price_min']").val('');
          return layer.msg("请输入数字", {
            shift: 6
          });
        }
        if (price_max == '') {
          return layer.msg('请输入最高价格哦', {
            shift: 6
          });
        }
        if (!reg.test(price_max)) {
          $("input[name='price_max']").val('');
          return layer.msg("请输入数字", {
            shift: 6
          });
        }
        if (price_min > price_max) {
          return layer.msg('最低价格高于最高价格哦', {
            shift: 6
          });
        }
        data_params.startPrice = price_min;
        data_params.endPrice = price_max;
        var li_pri = $('#choose_show_details>li>span:first-child');
        if (p > 1) {
          li_pri.each(function () {
            if ($(this).text() === '价格区间') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(pri_text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append(
            '<li class="lf"><span class="tag">价格区间</span><span class="tag_choose"><span class="tag_text">' +
            pri_text + '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });

      //按行程天数
      $('#list_details_days').on('click', 'span', function () {
        layer.load();
        l++;
        var this_days = $(this);
        var day_text = this_days.text();
        var days = this_days.attr("data-days");
        data_params.days = days;
        if (day_text == "8天以上") {
          data_params.moreDay = this_days.attr("data-moreday");
        } else {
          data_params.moreDay = 0;
        }
        var day_title = this_days.parent().siblings().text();
        var li_day = $('#choose_show_details>li>span:first-child');
        if (l > 1) {
          li_day.each(function () {
            if ($(this).text() === '行程天数') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(day_text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append('<li class="lf"><span class="tag">' + day_title +
            '</span><span class="tag_choose"><span class="tag_text">' + day_text +
            '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });
      //按出发日期
      $('#list_details_date').on('click', 'span', function () {
        layer.load();
        j++;
        var this_date = $(this);
        var date_text = this_date.text();
        var date_title = this_date.parent().siblings().text();
        data_params.startDate = Wb.formatDate(this_date.attr('data-startdate'), 'Y-m-d');
        data_params.endDate = Wb.formatDate(this_date.attr('data-enddate'), 'Y-m-d');
        $('#start_dateTime').val(data_params.startDate); //所搜所在的出发日期,付空值；
        $('#end_dateTime').val(data_params.endDate); //所搜所在的截至日期，付空值；        
        var li_date = $('#choose_show_details>li>span:first-child');
        if (j > 1) {
          li_date.each(function () {
            if ($(this).text() === '出发日期') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(date_text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append('<li class="lf"><span class="tag">' + date_title +
            '</span><span class="tag_choose"><span class="tag_text">' + date_text +
            '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });
      //按出发时间区间搜索
      $('.btn_Date').click(function () {
        j++;
        var li_date = $('#choose_show_details>li>span:first-child');
        var startDate = $('#start_dateTime').val();
        var endDate = $('#end_dateTime').val();
        var date_text = ""
        if (endDate.length > 0) {
          date_text = startDate + '/' + endDate;
        }
        if (endDate.length == 0) {
          date_text = startDate;
        }
        if (startDate == '') {
          return layer.msg('请输入起始日期', {
            shift: 6
          });
        }
        //        if(endDate==''){
        //          return layer.msg('请输入截止日期',{shift:6});
        //        }
        if (endDate.length > 0) {
          if (startDate > endDate) {
            return layer.msg('截止日期不能早于起始日期哦', {
              shift: 6
            });
          }
        }
        data_params.startDate = startDate;
        data_params.endDate = endDate;
        if (j > 1) {
          li_date.each(function () {
            if ($(this).text() === '出发日期') {
              $(this).siblings().find('.tag_text').html('');
              $(this).siblings().find('.tag_text').append(date_text);
            }
          });
        } else {
          $('#choose_show>div').css("display", "block"); //显示'已选条件'
          $('#del_all_condition').css("display", "block"); //显示'全部清除'
          $('#choose_show_details').append(
            '<li class="lf"><span class="tag">出发日期</span><span class="tag_choose"><span class="tag_text">' +
            date_text + '</span><span></span><span class="condition_del">x</span></span></li>');
        }
        submit_params();
      });
      //单个点击删除已选条件
      $('#choose_show_details').on('click', '.condition_del', function () {
        layer.load();
        var this_ = $(this);
        this_.parent().parent().remove(); //移除当前点击的已选条件
        var current_text = this_.parent().siblings().text();
        var len = $('#choose_show_details').children();
        if (len.length == 0) {
          $('#choose_show>div').css("display", "none"); //隐藏已选条件
          $('#del_all_condition').css("display", "none"); //隐藏'全部清除'
        }
        //判断当当前的所选条件删除后，将对应条件下的初始值还原
        if (current_text === '出发城市') {
          m = 0;
          data_params.pubFromCityID = "";
          submit_params();
          $('#location_city').html('不限');
        }
        if (current_text === '供应商') {
          n = 0;
          data_params.sup_cpy_id = "";
          data_params.operateType = "";
          submit_params();
        }
        if (current_text === '价格区间') {
          p = 0;
          data_params.startPrice = "";
          data_params.endPrice = "";
          submit_params();
        }
        if (current_text === '行程天数') {
          l = 0;
          data_params.days = "";
          data_params.moreDay = "";
          submit_params();
        }
        if (current_text === '出发日期') {
          j = 0;
          data_params.startDate = startDate;
          data_params.endDate = "";
          $('#start_dateTime').val(Wb.formatDate(startDate, 'Y-m-d')); //所搜所在的出发日期；
          $('#end_dateTime').val(''); //所搜所在的出发日期；
          submit_params();
        }
        if (current_text === '产品类别') {
          num = 0;
          data_params.nav_id = "";
          submit_params();
        }
        console.log(num);
      });
      //全部清除
      $('#del_all_condition').click(function () {
        layer.load();
        $('#choose_show>div').css("display", "none"); //隐藏已选条件
        $('#del_all_condition').css("display", "none"); //隐藏'全部清除'
        $('#choose_show_details').children().remove(); //移除所有已选条件
        $("input[name='price_min']").val('');
        $("input[name='price_max']").val('');
        $('#start_dateTime').val('');
        $('#end_dateTime').val('');
        m = 0;
        n = 0;
        p = 0;
        l = 0;
        j = 0;
        num = 0;
        data_params.pubFromCityID = "", data_params.sup_cpy_id = "", data_params.operateType = "", data_params
          .startPrice = "", data_params.endPrice = "", data_params.days = "", data_params.moreDay = "",
          data_params.startDate = startDate, data_params.endDate = "", data_params.nav_id = "";
        $('#start_dateTime').val(Wb.formatDate(startDate, 'Y-m-d')); //所搜所在的出发日期；
        $('#end_dateTime').val(''); //所搜所在的出发日期；          
        $('#location_city').html('不限');
        submit_params();
      });
    }
    choose_condition();
    //-------按线路和按团期点击切换并加载相应的数据------------------------------
    //判断当前是线路还是团期
    $('#line_type').click(function () {
      data_params.page = 1;
      data_params.limit = 10;
      data_params.start = 0;
      layer.load();
      if ($(this).hasClass("pub_line_type")) {
        line_show();
      } else {
        $(this).removeClass("pub_plan_type");
        $(this).addClass("pub_line_type");
        $('#plan_type').removeClass("pub_line_type");
        $('#plan_type').addClass("pub_plan_type");
        line_show();
      }
      type_num = 0;
    });
    $('#plan_type').click(function () {
      data_params.page = 1;
      data_params.limit = 10;
      data_params.start = 0;
      layer.load();
      if ($(this).hasClass("pub_line_type")) {
        plan_show();
      } else {
        $(this).removeClass("pub_plan_type")
        $(this).addClass("pub_line_type");
        $('#line_type').removeClass("pub_line_type");
        $('#line_type').addClass("pub_plan_type");
        plan_show();
      }
      type_num = 1;
    });
    //按照选择的页码进行异步加载数据
    function getPageData() {
      $('.layui-laypage-molv').find('a').click(function () {
        var page_this = $(this);
        var page = page_this.attr("data-page");
        data_params.page = page;
        data_params.start = (page - 1) * 10;
        if (type_num == 0) {
          $.ajax({
            type: 'post',
            url: "main?xwl=345TF0H0UWPQ",
            data: data_params,
            success: function (text) {
              var data = JSON.parse(text).rows;
              var page_total = JSON.parse(text).total;
              var curr_page = JSON.parse(text).page;
              line_type_search(data, page_total, curr_page);
              window.scroll(0, 0);
            }
          });
        } else {
          $.ajax({
            type: 'post',
            url: "main?xwl=345TF0H0W4CB",
            data: data_params,
            success: function (text) {
              var data = JSON.parse(text).rows;
              var page_total = JSON.parse(text).total;
              var curr_page = JSON.parse(text).page;
              plan_type_search(data, page_total, curr_page);
              window.scroll(0, 0);
            }
          });
        }
      });
    }
    //-------综合筛选----------------------------------------------------------
    //鼠标移入显示改变颜色
    //综合排序
    $('#rank_all').click(function () {
      $(this).addClass('rank_all_active');
      layer.load();
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').removeClass("triangle_high_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').removeClass("triangle_high_active");
      $('.new_pro').removeClass("rank_all_active");
      $('.high_price').removeClass("rank_all_active");
      $('.m_price').removeClass("rank_all_active");
      $('.hot_sale').removeClass("rank_all_active");
      $("#rest_status_content").val('');
      $("#confirm_type_content").val('');
      data_params.endNumType = '';
      data_params.confirm_type = '';
      data_params.bySort = '';
      profit_rank = 0;
      price_rank = 0;
      submit_params();
    });
    //点击选中效果
    //价格
    $('.high_price').click(function () {
      $('.m_price').removeClass("rank_all_active");
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').addClass("triangle_high_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').removeClass("triangle_high_active");
      $('.high_price').addClass("rank_all_active");
      $('.new_pro').removeClass("rank_all_active");
      $('.hot_sale').removeClass("rank_all_active");
      $('#rank_all').removeClass('rank_all_active');
      profit_rank = 0;
      price_rank++;
      if (price_rank % 2 != 0) {
        $('.triangle_low').removeClass("triangle_low_active");
        $('.triangle_high').addClass("triangle_high_active");
        layer.load();
        data_params.bySort = 0;
        submit_params();
      } else {
        $('.triangle_high').removeClass("triangle_high_active");
        $('.triangle_low').addClass("triangle_low_active");
        layer.load();
        data_params.bySort = 1;
        submit_params();
      }
    });
    //利润
    $('.m_price').click(function () {
      $('.high_price').removeClass("rank_all_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').addClass("triangle_high_active");
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').removeClass("triangle_high_active");
      $('.m_price').addClass("rank_all_active");
      $('.new_pro').removeClass("rank_all_active");
      $('.hot_sale').removeClass("rank_all_active");
      $('#rank_all').removeClass('rank_all_active');
      price_rank = 0;
      profit_rank++;
      if (profit_rank % 2 != 0) {
        $('.m_triangle_low').removeClass("triangle_low_active");
        $('.m_triangle_high').addClass("triangle_high_active");
        layer.load();
        data_params.bySort = 2;
        submit_params();
      } else {
        $('.m_triangle_high').removeClass("triangle_high_active");
        $('.m_triangle_low').addClass("triangle_low_active");
        layer.load();
        data_params.bySort = 3;
        submit_params();
      }
    });
    //按销量来排序
    $('.hot_sale').click(function () {
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').removeClass("triangle_high_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').removeClass("triangle_high_active");
      $('#rank_all').removeClass('rank_all_active');
      $('.new_pro').removeClass("rank_all_active");
      $('.high_price').removeClass("rank_all_active");
      $('.m_price').removeClass("rank_all_active");
      $('.hot_sale').addClass("rank_all_active");
      profit_rank = 0;
      price_rank = 0;
      layer.load();
      data_params.bySort = 4;
      submit_params();
    });
    //按新品来排序
    $('.new_pro').click(function () {
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').removeClass("triangle_high_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').removeClass("triangle_high_active");
      $('#rank_all').removeClass('rank_all_active');
      $('.hot_sale').removeClass("rank_all_active");
      $('.high_price').removeClass("rank_all_active");
      $('.m_price').removeClass("rank_all_active");
      $('.new_pro').addClass("rank_all_active");
      profit_rank = 0;
      price_rank = 0;
      layer.load();
      data_params.bySort = 5;
      submit_params();
    });

    //按余位状态来查询
    $("#rest_status_content").change(function () {
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').removeClass("triangle_high_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').removeClass("triangle_high_active");
      $('#rank_all').removeClass('rank_all_active');
      $('.new_pro').removeClass("rank_all_active");
      $('.high_price').removeClass("rank_all_active");
      $('.m_price').removeClass("rank_all_active");
      $('.hot_sale').removeClass("rank_all_active");
      profit_rank = 0;
      price_rank = 0;
      layer.load();
      var endNumType = $(this).val();
      data_params.endNumType = endNumType;
      submit_params();
    });
    //按确认类型查询
    $("#confirm_type_content").change(function () {
      $('.triangle_low').removeClass("triangle_low_active");
      $('.triangle_high').removeClass("triangle_high_active");
      $('.m_triangle_low').removeClass("triangle_low_active");
      $('.m_triangle_high').removeClass("triangle_high_active");
      $('#rank_all').removeClass('rank_all_active');
      $('.new_pro').removeClass("rank_all_active");
      $('.high_price').removeClass("rank_all_active");
      $('.m_price').removeClass("rank_all_active");
      $('.hot_sale').removeClass("rank_all_active");
      profit_rank = 0;
      price_rank = 0;
      layer.load();
      var confirm_type = $(this).val();
      data_params.confirm_type = confirm_type;
      submit_params();
    });

    //--------------模板渲染----------------------------------------------- 

    //数据请求和模板渲染
    $.ajax({
      type: "post",
      url: "main?xwl=345TF0H0UWPQ",
      data: data_params,
      success: function (text) {
        var data = JSON.parse(text).rows;
        var page_total = JSON.parse(text).total;
        var curr_page = JSON.parse(text).page;
        layui.use("laytpl", function () {
          var laytpl = layui.laytpl;
          var product_tpl = page_tpl.innerHTML;
          var prodtct_view = document.getElementById("product_list");
          laytpl(product_tpl).render(data, function (html) {
            prodtct_view.innerHTML = html;
            line_type_search(data, page_total, curr_page);
          });
        });
      }
    });
    //按搜索条件搜索查询线路产品数据和分页
    function line_type_search(data, page_total, curr_page) {
      //         var data = JSON.parse(text).rows;
      var product_list_count = 0;
      var product_list_arr = [];
      for (var i = 0; i < data.length; i++) {
        product_list_count++;
        product_list_arr.push(data[i]);
      }
      //         console.log(product_list_arr);
      //判断如果没有数据提示
      if (product_list_count === 0) {
        layer.closeAll('loading');
        $("#page").children().remove();
        $("#page").append('<div class="tips">没有搜索到符合您条件的产品哦！</div>');
        $("#product_page").css("display", "none");
      } else {
        layui.use("laypage", function () {
          var laypage = layui.laypage; //分页
          laypage.render({
            elem: "product_page", //存放分页的容器
            count: page_total, //数据总数
            limit: 10, //每页显示的条数
            groups: 5, //连续出现的页码个数
            curr: curr_page,
            theme: '#169DF9',
            first: "首页",
            last: "尾页",
            layout: ["page", "next"],
            jump: function (obj, first) {
              //渲染模板
              if (!first) {
                $('#pagination2').children().remove();
              }
              document.getElementById("page").innerHTML = function () {
                var product_list_html = "";
                var product_list_li = "";
                //                         var Data = product_list_arr.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                var Data = product_list_arr.concat().splice(0, 10);
                //                         console.log(Data);
                layui.each(Data, function (obj, item) {
                  //右侧报名
                  product_list_li += ('<li class="pro_list">');
                  product_list_li += ('<div class="product_detail_R rt">');
                  product_list_li += ('<div class="product_price lf">');
                  if (userConfig.btb_price_type * 1 == 3) { //根据运营设置是否显示同行价和利润的配置来显示
                    if (hide_price) {
                      product_list_li += (
                        '<p class="market_price" style="margin-top:15px">市场价<span>￥<span class="data_market_price">' +
                        item.sadultPrice + '</span></span></p>');
                      product_list_li += (
                        '<p class="trade_price" style="display:none">同行价<span>￥<span class="data_trade_price">' +
                        item.adultPrice + '</span></span></p>');
                    } else if (!hide_price) {
                      product_list_li += (
                        '<p class="market_price" style="margin-top:0px">市场价<span>￥<span class="data_market_price">' +
                        item.sadultPrice + '</span></span></p>');
                      product_list_li += (
                        '<p class="trade_price" style="display:block">同行价<span>￥<span class="data_trade_price">' +
                        item.adultPrice + '</span></span></p>');
                    } else {
                      product_list_li += (
                        '<p class="market_price">市场价<span>￥<span class="data_market_price">' + item
                        .sadultPrice + '</span></span></p>');
                    }
                  } else {
                    product_list_li += (
                      '<p class="market_price" style="margin-top:15px">市场价<span>￥<span class="data_market_price">' +
                      item.sadultPrice + '</span></span></p>');
                  }
                  product_list_li += ('<div class="look_price_detail">查看价格详情</div>');
                  product_list_li += ('</div>');
                  product_list_li += ('<div class="sign_up_box lf">');
                  product_list_li += ('<a target="_blank" href="/sys/main?xwl=345TF0H13QHC&lineID=' +
                    item.lineID + '"><button class="sign_up">报名</button></a>');
                  product_list_li += (
                    '<div class="downLoad"><div class="down_load">下载附件</div><div class="down_load_box" style="display:none"></div></div>'
                    );
                  product_list_li += ('<div class="show_price_detail_box" style="display:none">');
                  product_list_li += ('<div class="detail_t">');
                  if (hide_price || userConfig.btb_price_type * 1 != 3) {
                    product_list_li += ('<table style="margin-top:24px">');
                  } else {
                    product_list_li += ('<table style="margin-top:0px">');
                  }
                  product_list_li += ('<thead>');
                  product_list_li += ('<tr>');
                  product_list_li += ('<td>价格类别</td>');
                  product_list_li += ('<td>成人</td>');
                  product_list_li += ('<td>儿童</td>');
                  product_list_li += ('</tr>');
                  product_list_li += ('</thead>');
                  product_list_li += ('<tbody>');
                  product_list_li += ('<tr">');
                  product_list_li += ('<td>市场价</td>');
                  product_list_li += ('<td>￥' + item.sadultPrice + '</td>');
                  product_list_li += ('<td>￥' + item.schildPrice + '</td>');
                  product_list_li += ('</tr>');
                  if (userConfig.btb_price_type * 1 == 3) {
                    if (hide_price) {
                      product_list_li += ('<tr class="trade_price_peers" style="display:none">');
                      product_list_li += ('<td>同行价</td>');
                      product_list_li += ('<td>￥' + item.adultPrice + '</td>');
                      product_list_li += ('<td>￥' + item.childPrice + '</td>');
                      product_list_li += ('</tr>');
                      product_list_li += ('<tr class="trade_price_profit" style="display:none">');
                      product_list_li += ('<td>利润</td>');
                      product_list_li += ('<td>￥' + (Number(item.sadultPrice) - Number(item
                        .adultPrice)) + '</td>');
                      product_list_li += ('<td>￥' + (Number(item.schildPrice) - Number(item
                        .childPrice)) + '</td>');
                      product_list_li += ('</tr>');
                    } else {
                      product_list_li += ('<tr class="trade_price_peers" style="display:table-row">');
                      product_list_li += ('<td>同行价</td>');
                      product_list_li += ('<td>￥' + item.adultPrice + '</td>');
                      product_list_li += ('<td>￥' + item.childPrice + '</td>');
                      product_list_li += ('</tr>');
                      product_list_li += ('<tr class="trade_price_profit" style="display:table-row">');
                      product_list_li += ('<td>利润</td>');
                      product_list_li += ('<td>￥' + (Number(item.sadultPrice) - Number(item
                        .adultPrice)) + '</td>');
                      product_list_li += ('<td>￥' + (Number(item.schildPrice) - Number(item
                        .childPrice)) + '</td>');
                      product_list_li += ('</tr>');
                    }
                  }
                  product_list_li += ('</tbody>');
                  product_list_li += ('</table>');
                  product_list_li += ('</div>');
                  product_list_li += ('<div class="hide_box">');
                  product_list_li += ('<div class="hide_box_d">收起</div>');
                  product_list_li += ('</div>');
                  product_list_li += ('</div>');
                  product_list_li += ('</div>');
                  product_list_li += ('</div>');
                  //左侧团期图片
                  if (item.img1 == null) {
                    product_list_li += (
                      '<div class="product_detail_L lf"><a target="blank"><img class="small_pic" src="https://tcdn.op110.com.cn/files/1/file/20180329/z_1522295362286.jpg"><div class="big_pic"><img src="https://tcdn.op110.com.cn/files/1/file/20180329/z_1522295362286.jpg"></div><div class="code" title="产品编号:' +
                      item.lineID + '">#' + item.lineID + '</div></a></div>');
                  } else {
                    product_list_li += (
                      '<div class="product_detail_L lf"><a target="blank"><img class="small_pic" src="' +
                      item.img1 + '"><div class="big_pic"><img src="' + item.img1 +
                      '"></div><div class="code" title="产品编号:' + item.lineID + '">#' + item.lineID +
                      '</div></a></div>');
                  }
                  //中部团期信息
                  product_list_li += ('<div class="product_detail_M lf">');
                  if (item.confirm_type == 2) {
                    product_list_li += (
                      '<div class="product_title"><a class="product_title_c" data-lineID =' + item
                      .lineID +
                      ' target="blank"><div><span class="confirm_type_icon" title="二次确认产品">二</span><span title="' +
                      item.lineTitle + '">' + item.lineTitle + '</span></div></a></div>');
                  } else {
                    product_list_li += (
                      '<div class="product_title"><a class="product_title_c" data-lineID =' + item
                      .lineID + ' target="blank"><div title="' + item.lineTitle + '">' + item
                      .lineTitle + '</div></a></div>');
                  }
                  product_list_li += ('<div style="height:20px;margin-top:17px;">');
                  product_list_li += (
                    '<div class="product_days lf"><span>行程天数：</span><span class="data_product_days">' +
                    item.days + '天</span></div>');
                  product_list_li += (
                  '<div class="product_plan lf"><span title="近7天内的团期">最近团期：</span>');
                  if (item.planDate == '' || item.planDate == null) {
                    product_list_li += (
                      '<span class="data_product_plan" style="color:#BDBDBD">暂无</span>');
                  } else {
                    var plan_Date = item.planDate.split(',');
                    for (var i = 0; i < plan_Date.length; i++) {
                      product_list_li += ('<span class="data_product_plan"><span>' + plan_Date[i] +
                        '</span></span>');
                    }
                  }
                  product_list_li += ('</div>');
                  product_list_li += ('</div>');
                  product_list_li += ('<div style="height:20px;margin-top:3px;">');
                  if (userConfig.user_show_sup_info == 1) { //根据运营设置是否显示供应商的配置来显示
                    if (item.sup_cpy_name != "") {
                      if (hide_supplier) {
                        product_list_li += (
                          '<div class="product_supplier lf" style="display:none"><span>供应商：</span><span class="data_supplier">' +
                          item.sup_cpy_name + ' (联系方式：' + item.sup_mobile + ')</span></div>');
                      } else if (!hide_supplier) {
                        product_list_li += (
                          '<div class="product_supplier lf" style="display:block"><span>供应商：</span><span class="data_supplier">' +
                          item.sup_cpy_name + ' (联系方式：' + item.sup_mobile + ')</span></div>');
                      }
                    }
                  }
                  product_list_li += ('</div>');
                  product_list_li += ('</div>');
                  product_list_li += ('</li>');
                });
                product_list_html += '<ul class="pagination" id="pagination2">' + product_list_li + '</ul>';
                //                         console.log(product_list_html);
                return product_list_html;
              }(); //匿名函数，自动调用
              layer.closeAll('loading');
              look();
              //分页按照选择页进行数据的异步获取
              getPageData();
            }
          });
          $("#product_page").css("display", "block"); //有数据时显示页码栏
        });
      }
    }
    //按搜索条件搜索查询团期产品数据和分页
    function plan_type_search(data, page_total, curr_page) {
      // var data = JSON.parse(text).rows;
      var product_list_plan_count = 0;
      var product_list_plan_arr = [];
      for (var i = 0; i < data.length; i++) {
        product_list_plan_count++;
        product_list_plan_arr.push(data[i]);
      }
      //判断如果没有数据提示
      if (product_list_plan_count === 0) {
        layer.closeAll('loading');
        $("#page").children().remove();
        $("#page").append('<div class="tips">没有搜索到符合您条件的产品哦！</div>');
        $("#product_page").css("display", "none");
      } else {
        layui.use("laypage", function () {
          var laypage = layui.laypage; //分页
          laypage.render({
            elem: "product_page", //存放分页的容器
            count: page_total, //数据总数
            limit: 10, //每页显示的条数
            groups: 5, //连续出现的页码个数
            curr: curr_page,
            theme: '#169DF9',
            first: "首页",
            last: "尾页",
            layout: ["page", "next"],
            jump: function (obj, first) {
              //渲染模板
              if (!first) {
                $('#pagination2').children().remove();
              }
              document.getElementById("page").innerHTML = function () {
                var product_list_plan_html = "";
                var product_list_plan_li = "";
                //                         var Data = product_list_plan_arr.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                var Data = product_list_plan_arr.concat().splice(0, 10);
                layui.each(Data, function (index, item) {
                  //右侧报名
                  var color_tag = Wb.decode(item.color_tag);
                  product_list_plan_li += ('<li class="pro_list">');
                  product_list_plan_li += ('<div class="product_detail_R rt">');
                  product_list_plan_li += ('<div class="product_price lf">');
                  if (userConfig.btb_price_type * 1 == 3) { //根据运营设置是否显示同行价和利润的配置来显示
                    if (hide_price) {
                      product_list_plan_li += (
                        '<p class="market_price" style="margin-top:15px">市场价<span>￥<span class="data_market_price">' +
                        item.sadultPrice + '</span></span></p>');
                      product_list_plan_li += (
                        '<p class="trade_price" style="display:none">同行价<span>￥<span class="data_trade_price">' +
                        item.adultPrice + '</span></span></p>');
                    } else if (!hide_price) {
                      product_list_plan_li += (
                        '<p class="market_price" style="margin-top:0px">市场价<span>￥<span class="data_market_price">' +
                        item.sadultPrice + '</span></span></p>');
                      product_list_plan_li += (
                        '<p class="trade_price" style="display:display">同行价<span>￥<span class="data_trade_price">' +
                        item.adultPrice + '</span></span></p>');
                    } else {
                      product_list_plan_li += (
                        '<p class="market_price">市场价<span>￥<span class="data_market_price">' + item
                        .sadultPrice + '</span></span></p>');
                    }
                  } else {
                    product_list_plan_li += (
                      '<p class="market_price" style="margin-top:15px">市场价<span>￥<span class="data_market_price">' +
                      item.sadultPrice + '</span></span></p>');
                  }
                  product_list_plan_li += ('<div class="look_price_detail">查看价格详情</div>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('<div class="sign_up_box lf">');
                  product_list_plan_li += (
                    '<a target="_blank" href="/sys/main?xwl=345TF0H13QHC&lineID=' + item.lineID +
                    '&planID=' + item.id + '"><button class="sign_up">报名</button></a>');
                  product_list_plan_li += (
                    '<div class="downLoad"><div class="down_load">下载附件</div><div class="down_load_box" style="display:none"></div></div>'
                    );
                  product_list_plan_li += ('<div class="show_price_detail_box" style="display:none">');
                  product_list_plan_li += ('<div class="detail_t">');
                  if (hide_price || userConfig.btb_price_type * 1 != 3) {
                    product_list_plan_li += ('<table style="margin-top:24px">');
                  } else {
                    product_list_plan_li += ('<table style="margin-top:0px">');
                  }
                  if (item.dingPrice > 0) {
                    product_list_plan_li += ('<table style="margin-top:-8px">');
                  }
                  product_list_plan_li += ('<thead>');
                  product_list_plan_li += ('<tr>');
                  product_list_plan_li += ('<td>价格类别</td>');
                  product_list_plan_li += ('<td>成人</td>');
                  product_list_plan_li += ('<td>儿童</td>');
                  product_list_plan_li += ('</tr>');
                  product_list_plan_li += ('</thead>');
                  product_list_plan_li += ('<tbody>');
                  product_list_plan_li += ('<tr">');
                  product_list_plan_li += ('<td>市场价</td>');
                  product_list_plan_li += ('<td>￥' + item.sadultPrice + '</td>');
                  product_list_plan_li += ('<td>￥' + item.schildPrice + '</td>');
                  product_list_plan_li += ('</tr>');
                  if (userConfig.btb_price_type * 1 == 3) {
                    if (hide_price) {
                      product_list_plan_li += ('<tr class="trade_price_peers" style="display:none">');
                      product_list_plan_li += ('<td>同行价</td>');
                      product_list_plan_li += ('<td>￥' + item.adultPrice + '</td>');
                      product_list_plan_li += ('<td>￥' + item.childPrice + '</td>');
                      product_list_plan_li += ('</tr>');
                      product_list_plan_li += ('<tr class="trade_price_peers" style="display:none">');
                      product_list_plan_li += ('<td>利润</td>');
                      product_list_plan_li += ('<td>￥' + (Number(item.sadultPrice) - Number(item
                        .adultPrice)) + '</td>');
                      product_list_plan_li += ('<td>￥' + (Number(item.schildPrice) - Number(item
                        .childPrice)) + '</td>');
                      product_list_plan_li += ('</tr>');
                      if (item.dingPrice > 0) {
                        product_list_plan_li += ('<tr class="trade_price_peers">');
                        product_list_plan_li += ('<td>定金</td>');
                        product_list_plan_li += ('<td colspan="2">￥' + item.dingPrice + '</td>');
                        product_list_plan_li += ('</tr>');
                      }
                    } else {
                      product_list_plan_li += (
                        '<tr class="trade_price_peers" style="display:table-row">');
                      product_list_plan_li += ('<td>同行价</td>');
                      product_list_plan_li += ('<td>￥' + item.adultPrice + '</td>');
                      product_list_plan_li += ('<td>￥' + item.childPrice + '</td>');
                      product_list_plan_li += ('</tr>');
                      product_list_plan_li += (
                        '<tr class="trade_price_peers" style="display:table-row">');
                      product_list_plan_li += ('<td>利润</td>');
                      product_list_plan_li += ('<td>￥' + (Number(item.sadultPrice) - Number(item
                        .adultPrice)) + '</td>');
                      product_list_plan_li += ('<td>￥' + (Number(item.schildPrice) - Number(item
                        .childPrice)) + '</td>');
                      product_list_plan_li += ('</tr>');
                      if (item.dingPrice > 0) {
                        product_list_plan_li += ('<tr class="trade_price_peers">');
                        product_list_plan_li += ('<td>定金</td>');
                        product_list_plan_li += ('<td colspan="2">￥' + item.dingPrice + '</td>');
                        product_list_plan_li += ('</tr>');
                      }
                    }
                  }
                  product_list_plan_li += ('</tbody>');
                  product_list_plan_li += ('</table>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('<div class="hide_box">');
                  product_list_plan_li += ('<div class="hide_box_d">收起</div>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('</div>');
                  //左侧团期图片
                  if (item.img1 == null) {
                    product_list_plan_li += (
                      '<div class="product_detail_L lf"><a target="blank"><img class="small_pic" src="https://tcdn.op110.com.cn/files/1/file/20180329/z_1522295362286.jpg"><div class="big_pic"><img src="https://tcdn.op110.com.cn/files/1/file/20180329/z_1522295362286.jpg"></div><div class="code" title="产品编号:' +
                      item.lineID + '">#' + item.lineID + '</div></a></div>');
                  } else {
                    product_list_plan_li += (
                      '<div class="product_detail_L lf"><a target="blank"><img class="small_pic" src="' +
                      item.img1 + '"><div class="big_pic"><img src="' + item.img1 +
                      '"></div><div class="code" title="产品编号:' + item.lineID + '">#' + item.lineID +
                      '</div></a></div>');

                  }
                  //中部团期信息
                  product_list_plan_li += ('<div class="product_detail_M lf">');
                  if (color_tag) {
                    var tag_html = "";
                    for (var m = 0; m < color_tag.length; m++) {
                      tag_html += '<span title="' + color_tag[m].tag_info +
                        '" class="small-tag recom-color-' + color_tag[m].color_num + '">' + color_tag[m]
                        .tag_name + '</span>';
                    }
                    product_list_plan_li += (
                      '<div class="product_title" style="position:relative;"><a class="product_title_c" data-lineID =' +
                      item.lineID + ' target="blank">' + tag_html +
                      '<div style="display:inline;margin-left:5px;" title="' + item.lineTitle + '">' +
                      item.lineTitle + '</div></a></div>');
                  } else {
                    product_list_plan_li += (
                      '<div class="product_title"><a class="product_title_c" data-lineID =' + item
                      .lineID + ' target="blank"><div title="' + item.lineTitle + '">' + item
                      .lineTitle + '</div></a></div>');
                  }
                  product_list_plan_li += ('<div style="height:20px;margin-top:17px;">');
                  product_list_plan_li += (
                    '<div class="product_city_plan lf"><span>出发城市：</span><span class="data_product_days" style="color:#FF7711;font-weight:bold">' +
                    item.fromCityName + '</span></div>');
                  product_list_plan_li += (
                    '<div class="product_days_plan lf"><span>行程天数：</span><span class="data_product_days">' +
                    item.days + '天</span></div>');
                  product_list_plan_li += (
                    '<div class="product_plan lf"><span>团号：</span><span class="data_product_plan">' +
                    item.planCode + '</span></div>');
                  product_list_plan_li += (
                    '<div class="product_planDate lf"><span>出团日期：</span><span class="data_product_planDate">' +
                    item.planDate + '</span></div>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('<div style="height:20px;margin-top:3px;">');
                  product_list_plan_li += ('<div class="product_num lf"><span>计划位：</span><span class="data_plan_num">' + item.planNum + '</span>');
                   var endNumStr;
                  if (userConfig.user_end_num_show_config == 1) {
                    if (item.endNum < userConfig
                      .user_end_num_config) { //余位为1至小于设置位置，根据判断有设置显示设置，没设置显示余位。（orange）
                      if (!Wb.isEmpty(userConfig.user_end_num_less_config)) {
                        endNumStr = userConfig.user_end_num_less_config;
                      } else {
                        endNumStr = item.endNum;
                      }
                    } else { //余位>=设置位置，根据位置判断，有设置，显示设置，没有设置显示余位。 （green）
                      if (!Wb.isEmpty(userConfig.user_end_num_than_config)) {
                        endNumStr = userConfig.user_end_num_than_config;
                      } else {
                        endNumStr = '≥' + userConfig.user_end_num_config;
                      }
                    }
                  }else{
                    endNumStr=item.endNum;
                  }
                  product_list_plan_li += ('<span>团期余位：</span><span class="data_plan_num">' + endNumStr + '</span></div>');
                  if (item.planInfo) {
                    product_list_plan_li += ('<div class="product_supplier_plan lf" title="' + item
                      .planInfo + '"><span>团期备注：</span><span class="data_supplier">' + item.planInfo +
                      '</span></div>');
                  } else {
                    product_list_plan_li += ('<div class="product_supplier_plan lf" title="' + item
                      .planInfo + '"><span>团期备注：<span style="color:#BDBDBD">暂无</span></span></div>');
                  }
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('</div>');
                  product_list_plan_li += ('</li>');
                });
                product_list_plan_html += '<ul class="pagination" id="pagination2">' +
                  product_list_plan_li + '</ul>';
                return product_list_plan_html;
              }(); //匿名函数，自动调用
              layer.closeAll('loading');
              look();
              //分页按照选择页进行数据的异步获取
              getPageData();
            }
          });
          $("#product_page").css("display", "block"); //当有数据时显示页码栏
          look();
        });
      }
    }
    //提交搜索参数渲染渲染返回的数据
    function submit_params() {
      if (type_num == 0) {
        $.ajax({
          type: "post",
          data: data_params,
          url: "main?xwl=345TF0H0UWPQ",
          success: function (text) {
            var data = JSON.parse(text).rows;
            var page_total = JSON.parse(text).total;
            var curr_page = JSON.parse(text).page;
            line_type_search(data, page_total, curr_page);
          }
        });
      } else if (type_num == 1) {
        $.ajax({
          type: "post",
          data: data_params,
          url: "main?xwl=345TF0H0W4CB",
          success: function (text) {
            var data = JSON.parse(text).rows;
            var page_total = JSON.parse(text).total;
            var curr_page = JSON.parse(text).page;
            plan_type_search(data, page_total, curr_page);
          }
        });
      }
    }
    //按线路查看
    function line_show() {
      $.ajax({
        type: "post",
        data: data_params,
        url: "main?xwl=345TF0H0UWPQ",
        success: function (text) {
          var data = JSON.parse(text).rows;
          var page_total = JSON.parse(text).total;
          var curr_page = JSON.parse(text).page;
          line_type_search(data, page_total, curr_page);
        }
      });
    }

    function plan_show() {
      $.ajax({
        type: "post",
        data: data_params,
        url: "main?xwl=345TF0H0W4CB",
        success: function (text) {
          var data = JSON.parse(text).rows;
          var page_total = JSON.parse(text).total;
          var curr_page = JSON.parse(text).page;
          plan_type_search(data, page_total, curr_page);
        }
      });
    }
    //---------------详情页数据获取和显示-----------------------------
    //遮罩和产品详情窗口
    function show_mask_procuct() {
      $('#product_list').on('click', '.product_title_c', function () {
        $('html,body').animate({
          scrollTop: 0
        }, 500);
        this_list = $(this);
        $('#product_detail_mask').css("display", "block");
        $('#product_detail_page').css("display", "block");
        //查询门店抬头信息
        $.ajax({
          type: "post",
          url: "main?xwl=548URQ3B5HL3",
          data: {},
          success: function (text) {
            var data = JSON.parse(text);
            //显示门店抬头信息(门店或抬头图片)
            showStoreHead(data);
          }
        });
        //判断如果是按线路获取并显示详情信息
        var lineID = this_list.attr('data-lineid');
        if (type_num == 0) {
          $.ajax({
            type: "post",
            url: "main?xwl=343QOPTFB1EE",
            data: {
              lineID: lineID
            },
            success: function (text) {
              var data = JSON.parse(text).rows[0];
              show_plan_details(data);
              consult_journey(data);
              print_journey(data);
            }
          });
          $.ajax({
            type: "post",
            url: "main?xwl=33ZGTNWXRD8K",
            data: {
              lineID: lineID
            },
            success: function (text) {
              var data = JSON.parse(text).rows;
              jurney_info(data);
            }
          });
          $.ajax({
            type: "post",
            url: "main?xwl=346M92FB2S8H",
            data: {
              lineID: lineID
            },
            success: function (text) {
              var data = JSON.parse(text);
              shopping_info(data);
            }
          });
        }
        if (type_num == 1) {
          $.ajax({
            type: "post",
            url: "main?xwl=343QOPTFB1EE",
            data: {
              lineID: lineID
            },
            success: function (text) {
              var data = JSON.parse(text).rows[0];
              show_plan_details(data);
              consult_journey(data);
              print_journey(data);
            }
          });
          $.ajax({
            type: "post",
            url: "main?xwl=33ZGTNWXRD8K",
            data: {
              lineID: lineID
            },
            success: function (text) {
              var data = JSON.parse(text).rows;
              jurney_info(data);
            }
          });
          $.ajax({
            type: "post",
            url: "main?xwl=346M92FB2S8H",
            data: {
              lineID: lineID
            },
            success: function (text) {
              var data = JSON.parse(text);
              shopping_info(data);
            }
          });
        }

        //显示门店抬头
        function showStoreHead(data) {
          if (data.store_head) { //表示设置了默认抬头
            if (data.img) { //表示有图片,优先显示图片，否则显示文字
              $('#store_head_img').attr("src", data.img);
            } else if (data.title) { //表示有文字抬头,显示文字抬头
              $('#store_head_div').html(data.title);
            }

          }
        }



        //显示详情页头部信息    
        function show_plan_details(data) {
          if (data.img2 == null) {
            $('.p_image>img').attr("src", "https://tcdn.op110.com.cn/files/1/file/20180329/z_1522295362286.jpg");
          } else {
            $('.p_image>img').attr("src", data.img2);
          }
          $('.p_intro_title').html(data.Title);
          $('.p_intro_title').attr("title", data.Title);
          if (data.Tags == null) {
            $('.description_con').html('暂无简要描述哦！');
            $('.description_con').attr("title", "");
            $('.description_con').removeClass("p_intro_para");
            $('.description_con').addClass("p_intro_para_blank");
            $('.description_con_more').css('display', 'none');
          } else {
            $('.description_con').removeClass("p_intro_para");
            $('.description_con').removeClass("p_intro_para_blank");
            $('.description_con').html(data.Tags);
            if (($('.description_con').outerHeight()) > 50) {
              $('.description_con').addClass("p_intro_para");
              $('.description_con_more').css('display', 'block');
              $('.description_con_more').children().attr("title", data.Tags);
            } else {
              $('.description_con_more').css('display', 'none');
            }
            $('.description_con').attr("title", data.Tags);
          }
          $('.pro_code').html(data.Code);
          $('.pro_day').html(data.Days);
          $('.line_type').html(data.lineTypeName);
          $('.line_type').attr("title", data.lineTypeName);
          $('.adult_price').html(data.sadultPrice);
          $('.child_price').html(data.schildPrice);
          //报名
          $('.line_detail_right').attr("target", "_blank");
          $('.line_detail_right').attr("href", "/sys/main?xwl=345TF0H13QHC&lineID=" + lineID);
        }
        //导出参考行程
        function consult_journey(data) {
          var fileName = data.Title;
          //WORD格式下载
          $(".download_consult_word").off("click");
          $('.download_consult_word').on("click", function (e) {
            e.stopPropagation();
            Wb.request({
              url: 'main?xwl=342PTXVGECO4',
              params: {
                lineID: lineID,
                fileName: fileName
              },
              success: function (r) {
                var json = r.responseText;
                Wb.download('main?xwl=33YODGG8X42Y', {
                  fileName: fileName + '.doc',
                  tplFile: 'Base_Line.doc',
                  jsonData: json
                });
                $('.x-hide-display').css("display", "none");
              }
            });
          });
          $('.download_attachment').attr("data-lineid", lineID);
          //PDF格式下载
          $('.download_consult_pdf').on('click', function (e) {
            e.stopPropagation();
            Wb.download('main?xwl=346SLNM1RSO8', {
              lineID: lineID
            });
          });
        }
        //打印行程
        function print_journey(data) {
          $('.print_travel').click(function () {
            var headhtml = "<html><head><title></title></head><body>";
            var foothtml = "</body>";
            // 获取div中的html内容
            var newhtml = $("#product_detail_page").html();

            // 获取原来的窗口界面body的html内容，并保存起来
            var oldhtml = document.body.innerHTML;
            // 给窗口界面重新赋值，赋自己拼接起来的html内容
            document.body.innerHTML = headhtml + newhtml + foothtml;
            // 调用window.print方法打印新窗口
            var style = document.createElement("style");
            document.head.appendChild(style);
            sheet = style.sheet
            sheet.addRule('.p_intro_para::after', 'display:none');
            $('.line_detail_right').css("display", "none");
            $('.download').css("display", "none");
            $('#p_btn').css("display", "none");
            $('.close_icon').css("display", "none");
            $('#print_title').removeClass('p_intro_title');
            $('#print_title').addClass('p_intro_title_print');
            $('.description_con').removeClass("p_intro_para");
            $('.description_con').addClass("p_intro_para_print");
            $('.description_con_more').hide();
            $('.description_con').html('');
            $('.description_con').css("max-height", "40px");
            //         console.log(data.Tags);
            $('.p_intro_text').after('<div class="clear" style="padding:10px;">' + data.Tags + '</div>')
            window.print();
            $('.line_detail_right').css("display", "block");
            $('.download').css("display", "block");
            $('#p_btn').css("display", "block");
            $('.close_icon').css("display", "block");
            // 将原来窗口body的html值回填展示
            document.body.innerHTML = oldhtml;
            sheet.addRule('.p_intro_para::after', 'display:block');
            $('#print_title').removeClass('p_intro_title_print');
            $('#print_title').addClass('p_intro_title');
            $('.description_con').removeClass("p_intro_para_print");
            $('.description_con').addClass("p_intro_para");
            $('.description_con').show();
            $('#product_detail_mask').css({
              "background": "#000",
              "opacity": "0.7"
            });
            location.reload();
            return false;
          });
        };
        //获取行程具体信息并显示
        function jurney_info(data) {
          var arrange_html = "";
          var line_plan = data[1].colss;
          var line_plan_2 = data[1].lineItemDetail;
          $('.travel_box').html('');
          if (data[0].lineItemDetail == "无") {
            $('.travel_box').html('暂无行程特色');
          } else {
            $('.travel_box').append(data[0].lineItemDetail);
          }
          if (line_plan_2 != undefined) {
            arrange_html += ('<div class="line_pic">' + line_plan_2 + '</div>');
            $('.arrangement_box').html('');
            $('.arrangement_box').append(arrange_html);
            console.log(222);
          } else if (line_plan_2 == undefined) {
            for (var j = 0; j < line_plan.length; j++) {
              arrange_html += (
                '<div class="line_plan_box"><div class="lineTypeName"><div class="trip-box-items"><div class="trip-day">第' +
                (j + 1) + '天</div></div><div>' + line_plan[j].theTitle + '</div></div>');
              arrange_html += ('<ul class="line_plan">');
              arrange_html += ('<li><i title="用餐" class="can_icon"></i><span>' + line_plan[j].theCan +
                '</span></li>');
              arrange_html += ('<li><i title="酒店" class="hotel_icon"></i><span>' + line_plan[j].theHotel +
                '</span></li>');
              arrange_html += ('<li><i title="交通" class="traffic_icon"></i><span>' + line_plan[j].theTraffic +
                '</span></li>');
              arrange_html += ('</ul>');
              arrange_html += ('<p class="line_discription">' + line_plan[j].theDesc + '</p>');
              arrange_html += ('<div class="line_pic">');
              if (line_plan[j].img == '') {
                arrange_html += ('<div></div>');
              } else {
                var imgArr = line_plan[j].img.split(',');
                for (var i = 0; i < imgArr.length; i++) {
                  arrange_html += ('<img src="' + imgArr[i] + '">');
                }
              }
              arrange_html += ('</div></div>');
            }
            $('.arrangement_box').html('');
            if (line_plan.length == 0) {
              $('.arrangement_box').html('暂无线路参考行程');
            } else {
              $('.arrangement_box').append(arrange_html);
            }
          }
          $('.flight_box').html('');
          if (data[2].lineItemDetail == "无") {
            $('.flight_box').html('暂无参考航班');
          } else {
            $('.flight_box').append(data[2].lineItemDetail);
          }
          $('.hotel_box').html('');
          if (data[3].lineItemDetail == "无") {
            $('.hotel_box').html('暂无参考酒店');
          } else {
            $('.hotel_box').append(data[3].lineItemDetail);
          }
          $('.fee_box').html('');
          if (data[4].lineItemDetail == "无") {
            $('.fee_box').html('暂无费用说明');
          } else {
            $('.fee_box').append(data[4].lineItemDetail);
          }
          $('.attention_box').html('');
          if (data[5].lineItemDetail == "无") {
            $('.attention_box').html('暂无注意事项');
          } else {
            $('.attention_box').append(data[5].lineItemDetail);
          }
        }
        //显示购物及自费项目
        function shopping_info(data) {
          var self_fee_html = '';
          var shopping_fee_html = '';
          if (data.selfFee.length == 0 && data.shopping.length == 0) {
            $('#shopping').css('display', 'none');
          } else {
            $('#shopping').css('display', 'block');
            if (data.selfFee.length == 0) {
              $('#self_fee').css('display', 'none');
            } else {
              $('#self_fee').css('display', 'block');
              for (var i = 0; i < data.selfFee.length; i++) {
                self_fee_html += '<div><li><div class="self_fee_time lf"><span>时间：</span>' + '第' + data.selfFee[i]
                  .theDay + '天' + '<span>' + data.selfFee[i].theTime +
                  '</span></div><div class="self_fee_place rt"><span>地点：</span>' + data.selfFee[i].place +
                  '</div></li>';
                //             self_fee_html+='<li></li>';
                //             self_fee_html+='<li><span>地点：</span>'+data.selfFee[i].place+'</li>';

                if (data.selfFee[i].productInfo == null) {
                  self_fee_html +=
                    '<li class="clear"><div class="lf self_fee_program"><span>费用：</span>暂无</div><div class="rt self_fee_stay"><span>时长：</span>' +
                    data.selfFee[i].stayTime + '</div></li>';
                } else {
                  self_fee_html += '<li class="clear"><div class="lf self_fee_program"><span>费用：</span>' + data
                    .selfFee[i].productInfo + '</div><div class="rt self_fee_stay"><span>时长：</span>' + data.selfFee[
                      i].stayTime + '</div></li>';
                }
                self_fee_html += '<li class="clear"><span>项目：</span>' + data.selfFee[i].name + '</li>';
                //             self_fee_html+='<li><span>时长：</span>'+data.selfFee[i].stayTime+'</li>';
                self_fee_html += '<li><span>其他说明：</span>' + data.selfFee[i].otherInfo + '</li></div>';
              }
            }
            $('#self_fee_list').html('');
            $('#self_fee_list').append(self_fee_html);
            if (data.shopping.length == 0) {
              $('#shopping_fee').css('display', 'none');
            } else {
              $('#shopping_fee').css('display', 'block');
              for (var j = 0; j < data.shopping.length; j++) {
                shopping_fee_html += '<div><li><div class="self_fee_time lf"><span>时间：</span>' + '第' + data
                  .shopping[j].theDay + '天' + '<span>' + data.shopping[j].theTime +
                  '</span></div><div class="self_fee_place rt"><span>地点：</span>' + data.shopping[j].place +
                  '</div></li>';
                //             shopping_fee_html+='<li><span>时间：</span>'+data.shopping[j].theTime+'</li>';
                //             shopping_fee_html+='<li><span>地点：</span>'+data.shopping[j].place+'</li>';
                shopping_fee_html += '<li><div class="lf self_fee_program"><span>购物场所：</span>' + data.shopping[j]
                  .name + '</div><div class="rt self_fee_stay"><span>停留时长：</span>' + data.shopping[j].stayTime +
                  '</div></li>';
                if (data.shopping[j].productInfo == null) {
                  shopping_fee_html += '<li class="clear"><span>商品信息：</span>暂无</li>';
                } else {
                  shopping_fee_html += '<li class="clear"><span>商品信息：</span>' + data.shopping[j].productInfo +
                    '</li>';
                }
                //             shopping_fee_html+='<li><span>停留时长：</span>'+data.shopping[j].stayTime+'</li>';
                shopping_fee_html += '<li><span>其他说明：</span>' + data.shopping[j].otherInfo + '</li></div>';
              }
            }
            $('#shopping_fee_list').html('');
            $('#shopping_fee_list').append(shopping_fee_html);
          }
        }
      });
      $('#product_detail_mask').click(function () {
        $('#product_detail_mask').css({
          "background": "#000",
          "opacity": "0.7"
        });
        $('#product_detail_mask').css("display", "none");
        $('#product_detail_page').css("display", "none");
      });
      $(document).keydown(function (e) {
        if (e.keyCode == 27) {
          $('#product_detail_mask').css({
            "background": "#000",
            "opacity": "0.7"
          });
          $('#product_detail_mask').css("display", "none");
          $('#product_detail_page').css("display", "none");
        }
      });
      //详情页的点击下载附件事件
      $('.download_attachment').hover(function () {
        var this_ = $(this);
        var lineID = $('.download_attachment').attr("data-lineid");
        this_.children('.down_load_box_2').css("display", "block");
        $.ajax({
          type: "post",
          url: "main?xwl=345VRFPPO2T2",
          data: {
            lineID: lineID
          },
          success: function (text) {
            var data = JSON.parse(text).rows;
            var li_files_html = '';
            if (data.length == 0) {
              this_.children('.down_load_box_2').html('');
              this_.children('.down_load_box_2').append(
                '<div style="height:150px;line-height:150px;font-size:14px;color:#9B9B9B;">没有可以下载的文件哦！</div>'
                );
            } else {
              this_.children('.down_load_box_2').html('');
              var fileUrl = [];
              for (var i = 0; i < data.length; i++) {
                li_files_html += ('<li>');
                li_files_html += ('<div class="down_load_file_btn rt"><a href="' + data[i].fileUrl +
                  '" download="' + data[i].fileUrl + '">下载</a></div>');
                li_files_html += (
                  '<div class="lf"><img src="https://tcdn.op110.com.cn/files/1/file/20180331/word_03_1522465502763.png" class="word_icon"></div>'
                  );
                li_files_html += ('<div class="file_info lf">');
                li_files_html += ('<div class="file_name">' + data[i].fileTitle + '</div>');
                li_files_html += ('<div class="file_up">' + data[i].admName + ' 上传</div>');
                li_files_html += ('</div>');
                li_files_html += ('</li>');
                fileUrl.push(data[i].fileUrl);
              }
              this_.children('.down_load_box_2').append('<ul>' + li_files_html +
                '</ul><div class="down_load_all"><a id="down_load_all_files">下载全部</a></div>');
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
              for (var i = 0; i < fileUrl.length; i++) {
                download(fileUrl[i]);
              }
            }
          }
        });
      }, function () {
        $('.down_load_box_2').css("display", "none");
      });

      //导出参考行程显示弹窗
      $('.download_consult').hover(function () {
        $('#download_consult_box').show();
      }, function () {
        $('#download_consult_box').hide();
      });

      $(document).click(function (e) {
        var div_blank_btn = $('.down_load_box_2'); // 设置目标区域
        if (!div_blank_btn.is(e.target) && div_blank_btn.has(e.target).length === 0) {
          $('.down_load_box_2').css("display", "none");
        }
      });

    }
    show_mask_procuct();

    //详情页返回顶部
    $(function () {
      $('#to_top').click(function () {
        $('html,body').animate({
          scrollTop: 0
        }, 500);
      });
      //关闭窗口
      $('#close').click(function () {
        $('#product_detail_mask').css({
          "background": "#000",
          "opacity": "0.7"
        });
        $('#product_detail_mask').css("display", "none");
        $('#product_detail_page').css("display", "none");
      });
      $('.close_icon').click(function () {
        $('#product_detail_mask').css({
          "background": "#000",
          "opacity": "0.7"
        });
        $('#product_detail_mask').css("display", "none");
        $('#product_detail_page').css("display", "none");
      });
    });
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
  }