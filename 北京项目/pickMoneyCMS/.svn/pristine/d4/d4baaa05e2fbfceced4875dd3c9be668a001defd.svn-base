$(function(){
    // 页面初始化
    initialize();
    function initialize(){
        // $.ajax({
        //     type:'GET',
        //     uel:'',
        //     data:{page:1},
        //     dataType:'json',
        //     success:function(data){
        //         console.log(data);
        layui.use(['element','form','laypage','layer','laydate','upload'],function(){
            var element=layui.element;
            var form=layui.form;
            var laypage=layui.laypage;
            var layer=layui.layer;
            var laydate=layui.laydate;
            var upload=layui.upload;
            //监听面板折叠状态
            element.on('collapse(test)', function(data){
                layer.msg('展开状态：'+ data.show);
            });
            laypage.render({
                elem:'demo11',
                // count:data.count,
                count:1000,
                limit:100,
                limits:[100,300,500]
                // jump:function(obj){
                    // 当前页码为obj.curr
                    // $.ajax({
                    //     type:'GET',
                    //     url:'',
                    //     data:{page:obj.curr},
                    //     dataType:'json',
                    //     success:function(data){
                    //         console.log(data);
                    //     }
                    // })
                // }
            });
            laypage.render({
                elem:'demo12',
                // count:data.count,
                count:1000,
                limit:100,
                limits:[100,300,500]
                // jump:function(obj){
                    // 当前页码为obj.curr
                    // $.ajax({
                    //     type:'GET',
                    //     url:'',
                    //     data:{page:obj.curr},
                    //     dataType:'json',
                    //     success:function(data){
                    //         console.log(data);
                    //     }
                    // })
                // }
            });
            laypage.render({
                elem:'demo13',
                // count:data.count,
                count:1000,
                limit:100,
                limits:[100,300,500]
                // jump:function(obj){
                    // 当前页码为obj.curr
                    // $.ajax({
                    //     type:'GET',
                    //     url:'',
                    //     data:{page:obj.curr},
                    //     dataType:'json',
                    //     success:function(data){
                    //         console.log(data);
                    //     }
                    // })
                // }
            });
            laydate.render({
                elem:'#seltime1',
                showBottom: false
            });
            laydate.render({
                elem:'#seltime2',
                showBottom: false
            });
            laydate.render({
                elem:'#seltime3',
                showBottom: false
            });
            upload.render({
                elem: '#test2',
                url: '/upload/',
                multiple: true,
                before: function(obj){
                  //预读本地文件示例，不支持ie8
                  obj.preview(function(index, file, result){
                    $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
                  });
                },
                done: function(res){
                  //上传完毕
                }
            });
            upload.render({
                elem: '#test-upload-more',
                url: '/upload/',
                multiple: true,
                before: function(obj){
                  //预读本地文件示例，不支持ie8
                  obj.preview(function(index, file, result){
                    $('#test-upload-more-list').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
                  });
                },
                done: function(res){
                  //上传完毕
                }
            })
        })
    }
    //百万红包-红包规则设置-删除
    $('.bwhb .layui-collapse').on('click','.delpz',function(e){
        e.preventDefault();
        var that = $(this);
        var c_id = that.data('id');
        layer.confirm('确定要删除吗？',function (index) {
           $.post('/admin/millions/set_status',{'status':9,'c_id':c_id},function (result) {
               if (result.status == 1) {
                   that.parents('.layui-colla-item').remove();
                   layer.msg('删除成功');
                   layer.close(index);
               } else {
                   layer.msg('删除失败');
                   layer.close(index);
               }
           },'json');
        });
    });
    // 百万红包-内容配置-领取记录删除
    $('.hbrecord').on('click','.deletetr',function(){
        $(this).parents('tr').remove();
    });
    // 表格全选与否
    var isChecked=true;
    // 全选与取消
    $('.totaltr').click(function(){
        isChecked=!isChecked;
        if(isChecked){
            $(this).parent().prev().find('input').prop('checked',false);
        }else{
            $(this).parent().prev().find('input').prop('checked',true);
        }
    });
    // 单个选择--->>全选
    $('table tbody').on('click','input',function(){
        //each 便利每一个元素，让其执行该函数
        $('table tbody input').each(function(){
            if(!$(this).prop('checked')){
                $(this).parents('table').next().find('.totaltr').prop('checked',false);
                //有一个不满足就 跳出该循环，避免执行下面
                return false;
            }else{
                $(this).parents('table').next().find('.totaltr').prop('checked',true);
            }
        })
    });
    // 转变两位小数格式
    function returnFloat(value){
        var value=Math.round(parseFloat(value)*100)/100;
        var xsd=value.toString().split(".");
        if(xsd.length==1){
            value=value.toString()+".00";
            return value;
        }
        if(xsd.length>1){
            if(xsd[1].length<2){
                value=value.toString()+"0";
            }
            return value;
        }
    }
    // 广告管理-广告管理部分，点击编辑进行更改
    $('.bwhb .reset').click(function(){
        var that=$(this);
        if(that.text()=='编辑'){
            layer.msg('请修改领取金额');
            var t=that.parents('.layui-colla-content').find('.range_min').val();
            that.parents('.layui-colla-content').find('.range_min').removeClass('ee').addClass('ff').removeAttr('disabled').val('').focus().val(t);
            that.parents('.layui-colla-content').find('.range_max').removeClass('ee').addClass('ff').removeAttr('disabled');
            that.text('保存').removeClass('edit').removeClass('layui-btn-normal').addClass('layui-btn-success').addClass('resave');
            layui.form.render();
            layui.element.init();
        }else{
            var price_min=that.parents('.layui-colla-content').find('.range_min').val();
            var price_max=that.parents('.layui-colla-content').find('.range_max').val();
            var c_id=that.attr('data-id');
            $.ajax({
                type:'post',
                url:'/admin/millions/up_config',
                data:{price_min:price_min,price_max:price_max,c_id:c_id},
                dataType:'json',
                success:function(data){
                    console.log(data);
                    if(data.status==1){
                        layer.msg(data.msg);
                        that.parents('.layui-colla-content').find('.range_min').removeClass('ff').addClass('ee').attr('disabled','disabled').val(returnFloat(price_min));
                        that.parents('.layui-colla-content').find('.range_max').removeClass('ff').addClass('ee').attr('disabled','disabled').val(returnFloat(price_max));
                        that.text('编辑').removeClass('resave').removeClass('layui-btn-success').addClass('layui-btn-normal').addClass('reset');
                        layui.form.render();
                        layui.element.init();
                    }
                },
                error:function(){
                    console.log('ajax请求失败');
                }
            });
        }
    });
});