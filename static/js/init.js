(function ($) {


 
    var CACHEDATA = {};

    (function ($) {
        String.prototype.replaceAll = function (s1, s2) {
            return this.replace(new RegExp(s1, "gm"), s2);
        }

        var V = 1.0;
        var isMOBILE = $(window).width() < 640;

        /**
         * 加载
         *js
         * 
         * @param  {[type]}   u        [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        function loadjs(u, callback) {
            var sc = document.createElement('script');
            sc.setAttribute('src', u + "?v=" + V);
            if (typeof callback == 'function') {
                if (sc.readyState) {
                    sc.onreadystatechange = function () {
                        if (sc.readyState == "loaded" || sc.readyState == "complete") {
                            sc.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {
                    sc.onload = function () {
                        callback();
                    };
                }

            }

            document.body.appendChild(sc);
        }

        function loadcss(u) {
            var css = document.createElement('link');
            css.setAttribute('rel', 'stylesheet');
            css.setAttribute('type', 'text/css');
            css.setAttribute('href', u + "?v=" + V);
            document.body.appendChild(css);

        }

        function repair() {

            if (typeof layer.alert == 'undefined') {
                layer.openlayer = function (html, title) {
                    title = ((typeof title == 'undefined') && "标题") || title;
                    html = '<div class="am-panel am-panel-default">\
                          <div class="am-panel-hd am-g" style="line-height: 3em;height: 3em;padding:0px">\
                          <div class="am-u-sm-10">' + title + '</div>\
                            <div class="am-text-right am-u-sm-2 delclose"><em  class="am-icon-close" ></em></div>\
                          </div>\
                          <div class="am-panel-bd">\
                            ' + html + '\
                          </div>\
                        </div'

                    var pageii = layer.open({
                        type: 1,
                        content: html,
                        style: 'position:fixed; left:0; top:0; width:100%; height:100%; border:none;'
                    });

                    $(".delclose").click(function () {
                        layer.close(pageii);
                    })


                }
                layer.alert = function (msg) {
                    layer.open({
                        content: msg,
                        btn: ['知道了']
                    });

                }


                layer.confirm = function (ask, sucess, fail) {

                    var index = layer.open({
                        content: ask,
                        btn: ['确认', '取消'],
                        shadeClose: false,
                        yes: function () {
                            sucess.call(this, []);
                        },
                        no: function () {
                            fail.call(this, []);
                        }
                    });

                }

                layer.msg = function (msg, callback, t) {

                    layer.open({
                        content: msg,
                        style: 'background-color:rgba(23, 21, 21, 0.65); color:#fff;border:none;',
                        time: t || 2,
                        end: callback
                    });
                }

                layer.load = function (ini) {
                    return layer.open({
                        type: 2,
                        content: '努力加载中'
                    });

                }

            }

        }

        if (typeof layer === 'undefined') {
        
                loadjs("https://cdn.bootcss.com/layer/2.3/layer.js", repair);
                loadcss("https://cdn.bootcdn.net/ajax/libs/layer/2.3/skin/layer.css");
          

        }


        var __ajax = function (data, ini) {
            var index;
            var d = {
                "success": function (d) {
                    layer.close(index);
                    // console.log(d);
                },
                "beforeSend": function (request) {

                    index = layer.load({
                        shade: 0.3
                    });

                },
                "complete": function (d) {
                    layer.close(index);
                },
                "dataType": "json"
            }
            ini = $.extend(d, ini);
            if (window.beforeSend == false) {
                ini.beforeSend = null;
            };

            if (typeof (data) == "string") {
                data += "&_return=" + ini.dataType;
            } else {
                data = $.param(data) + "&_return=" + ini.dataType;
            }
            if (typeof (window.ajaxComplete) == 'function') {
                var f = ini.complete;
                ini.complete = function () {
                    f.call(this)
                    window.ajaxComplete.call(this); ///全局 ajax complete 回调接口

                }
            }

            if (typeof (window.ajaxSuccess) == 'function') {
                var f1 = ini.success;
                ini.success = function (d) {

                    f1.call(this, d);
                    window.ajaxSuccess.call(this, d); ///全局 ajax complete 回调接口

                }
            }


            function callback(d) {
                layer.close(index);

                ini.success.call(this, d);
            }

            $.ajax({
                type: ini.type,
                url: ini.url,
                'data': data,
                beforeSend: ini.beforeSend,
                complete: ini.complete,
                dataType: ini.dataType,
                success: callback

            });

        }


        $.extend({
            "Ajax": __ajax,
            "Get": function (url, data, callback, type) {
                return __ajax(data, {
                    url: url,
                    dataType: type,
                    success: callback || _callback,
                    "type": "get"
                });
            },
            "Post": function (url, data, callback, type) {
                return __ajax(data, {
                    url: url,
                    dataType: type,
                    success: callback || _callback,
                    type: "post"
                });
            }
        })
        $.fn.extend({

            "iframe": function () {
                console.log(this)
                $(this).find('[data-iframe]').click(function (event) {

                    console.log({
                        type: 2,
                        title: $(this).attr("title"),
                        shadeClose: true,
                        shade: 0.8,

                        area: [$(this).data("width"), $(this).data("height")],
                        content: $(this).attr("href")
                    })

                    layer.open({
                        type: 2,
                        title: $(this).attr("title"),
                        shadeClose: true,
                        shade: 0.8,

                        area: [$(this).data("width"), $(this).data("height")],
                        content: $(this).attr("href")
                    });

                    return false;

                });

            },

            "tab": function (ini) {

                // $.extend(ini, target object, object1);
                $tab = $(this).find(".am-tabs-nav li");
                $panel = $(this).find(".am-tab-panel");
                $tab.each(function (i) {
                    $(this).data("index", i);
                })
                $(this).delegate('.am-tabs-nav a', 'click', function (event) {
                    $tab.removeClass('am-active');
                    var p = $(this).parent('li');
                    p.addClass('am-active');
                    var body = $($panel[p.data("index")]);

                    var href = $(this).attr("href");
                    if (href) {
                        if (href.indexOf(".") == 0 || href.indexOf("#") == 0) {
                            body.html($(href).html());
                        } else {

                            $.get(href, function (h) {
                                body.html(h);
                            })
                        }

                    }
                    $panel.removeClass('am-active');
                    body.addClass('am-active')
                    return false;
                });

                $('.am-tabs-nav a').eq(0).click();



            },
            maxsize: function (eve) {

                $(this).find("[data-maxsize]").on(eve, function () {



                    var max = $(this).data("maxsize");



                    var num = max - $(this).val().length;

                    if (num < 0) {
                        $(this).val($(this).val().substring(0, max));
                        return false;
                    }

                    var t = $(this).siblings("p.tips");

                    if (t.length > 0) {
                        t.html("你还可以输入" + num + "个字");
                    } else {
                        $(this).after("<p class='tips'>你还可以输入" + num + "个字");


                    }
                })
            }
        });



        var ajax_request = function (form, ini) {

            // alert("----")
            var form = $(form);
            var config = {};
            config.type = form.attr("method");

            var url = form.attr("action");
            config.url = url ? url : location.href;
            var data = form.serialize();
            if (typeof ini == 'function') {
                ini = ini.call(form, []);
            }
            var i = $.extend(config, ini);

            console.log(i)
            __ajax(data, i);

        }

        //ajax 默认回调



        window._callback = function (data) {
            var me = this;

            var _alert = layer.alert;
            if (isMOBILE) {
                _alert = layer.msg;
            }

            if (data.info == 'location') {
                location.href = data.url;
                return;
            }

            _alert(data.info, function (index) {

                if (index) {
                    layer.close(index);
                }
                if (data.url == 'reload') {
                    location.reload();
                } else if (data.url.indexOf("js:") === 0) {
                    eval(data.url.substr(3));
                } else if (data.url == "reset") {

                    me.reset();
                } else if (data.url == '#' || data.url == '') {
                    return false;
                } else {
                    location.href = data.url;
                }


            }, 3);
        }

        //表单验证
        // data-filter='{"mobile":"不是正确的手机号码","_sucess":"telSucess","_fail":"telFail"}' _sucess _fail 成功/失败回调函数
        var filter = function (p, event) {
            this.iscango = true;
            var self = this;
            this.eles = $(p).find("[data-filter]");

            // console.log(this.eles)
            this.eles.each(function (k, o) {
                var rule = eval($(o).data('filter'));
                $(o).bind("filter", function () {
                    $(this).parents('.form-group').find(".errormsg").remove();
                    for (t in rule) {


                        if (t.indexOf('_') == -1) {

                            if (self[t](this, rule[t])) {


                                if (rule['_sucess']) {
                                    window[rule['_sucess']].call({
                                        "ele": this,
                                        "filter": self
                                    }, []);
                                }
                                $(this).removeClass('error');
                                $(this).data('status', "yes");


                            } else {

                                self.iscango = false;
                                $(this).addClass('error');
                                $(this).data('status', "no");

                                if (rule['_fail']) {
                                    window[rule['_fail']].call({
                                        "ele": this,
                                        "filter": self
                                    }, []);
                                }
                                return false;
                            }

                        }
                    }
                });
                if ($(o).data("event") != "off") {
                    $(o).bind(event, function (e) {
                        $(this).trigger('filter');
                    });
                }
            });
        }

        filter.prototype = {
            tips: function (ele, msg) {

                // $(ele).parents('.form-group').append("<span class='errormsg'>"+msg+"</span>");

                layer.msg(msg);
            },

            check: function (ele) {
                $(ele).trigger('filter');
            },

            checkall: function () {
                this.iscango = true;
                this.eles.each(function (index, el) {
                    $(el).trigger('filter');
                });
                return this.iscango;
            },
            func: function (o, rule) {
                rule = rule.split(',');
                if (window[rule[0]].apply(o, rule.slice(1, rule.length)) === false) {
                    this.iscango = false;
                    return false;
                }
                return true;
            },
            length: function (o, rule) {
                rule = rule.split(',');
                if (rule.length == 3) {
                    rule[3] = o;
                }
                var value = $(o).val();
                if (value.length < parseInt(rule[0]) || value.length > parseInt(rule[1])) {
                    this.iscango = false;
                    this.tips(rule[3], rule[2])
                    return false;
                }
                return true;
            },
            email: function (o, rule) {
                var mail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                if (mail.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule);
                    return false;
                }
                return true;
            },


            mobile: function (o, rule) {
                //data-filter='{"mobile":"不是正确的手机号码"}'
                var reg = /^1(3|5|8|7)\d{9,9}$/i;
                if ($(o).val().length < 10 || reg.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule);
                    return false;
                }
                return true;
            },

            sfz: function (o, rule) {
                //data-filter='{"sfz":"不是正确的身份证号码"}'
                var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/i;
                if ($(o).val().length < 18 || reg.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule);
                    return false;
                }
                return true;
            },
            zhenming: function (o, rule) {
                //data-filter='{"sfz":"不是正确的身份证号码"}'
                var reg = /^[\u4e00-\u9fa5]+$/i;
                if ($(o).val().length < 2 || reg.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule);
                    return false;
                }
                return true;
            },
            number: function (o, rule) {
                var reg = /^[1-9]+[0-9]*]*$/;;
                if (reg.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule);
                    return false;
                }
                return true;
            },

            alphaNumeric: function (o, rule) {
                var reg = /^[a-z]+\w*$/i;
                console.log(reg.test($(o).val()))
                if (reg.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule);
                    return false;
                }
                return true;
            },
            same: function (o, rule) {
                rule = rule.split(',');
                var value = $(o).val();
                if (value != $(rule[0]).val()) {
                    this.iscango = false;
                    this.tips(o, rule[1]);
                    return false;
                }
                return true;
            },
            reg: function (o, rule) {
                rule = rule.split(',');
                var r = new RegExp(rule[0]);
                if (r.test($(o).val()) === false) {
                    this.iscango = false;
                    this.tips(o, rule[1]);
                    return false;
                }
                return true;
            },
            ajax: function (o, rule) {
                rule = rule.split(',');
                var url = rule[0] + $(o).val();
                var self = this;
                var html = $.ajax({
                    url: url,
                    async: false
                }).responseText;
                if (html === 'fail') {
                    this.iscango = false;
                    self.tips(o, rule[1]);
                    return false;
                }
                return true;
            }
        }

        var _init = function (selecter) {
            var _ini = {
                "ajax_form": "form[data-ajax],form[ajax-submit]",
                "popbox": "[data-popbox]",
                'a_ajax': "a[data-ajax],span[data-ajax],div[data-ajax]",
                'plupload': "[data-plupload]",
                "ajax_update":"form[data-ajaxUpdate]",
                "ajax_update_link":"a[data-ajaxUpdate]"

            }

            function _(s) {

                return $(s, selecter);

            }



            var dataFilter = new filter(selecter, "blur");

            var _ajax_update=function(){

                var url=$(this).attr("action") || $(this).attr("href")||$(this).data("url") ;

                
                 var box=$(this).attr('data-ajaxupdate');

               

                var _callbackfn=function(html){
                  

                    console.log(box)
                    $(box).html($(html).find(box).html());

                }

              
                if(this.tagName=="FORM"){


                        var form = $(this);
                        var config = {};
                        config.type = form.attr("method");

                        var url = form.attr("action");
                        config.url = url ? url : location.href;
                        var data = form.serialize();
                        config.success=_callbackfn
                        config.data=data;
                        $.ajax(config);



               


                 }else{

                     $.get(url,_callbackfn);
                 }

                 return false;


            }

            $(selecter).on("submit",_ini.ajax_update,_ajax_update);
            $(selecter).on("click",_ini.ajax_update_link,_ajax_update);

            $(selecter).delegate(_ini.ajax_form, 'submit', function () {

                var _o = this;
                $(this).trigger('beforeSubmit');
                if ($(this).find("[data-filter]").length > 0) {


                    if (dataFilter.checkall() === false) {
                        // alert(1)
                        return false;
                    }

                }

                // console.log(this, 1111)
                var _filter = $(this).data("filter");
                if (_filter) {
                    if (_filter.call(_o) == false) {
                        return false;
                    }
                }
                ajax_request(this, function () {
                    var callback = $(this).data("callback");
                    var ini = {};
                    if (callback) {
                        if (callback.indexOf(".") > -1) {
                            var k = callback.split(".");
                            var c = window[k[0]][k[1]];
                        } else {
                            var c = window[callback];
                            console.log(c)
                        }
                    } else {
                        var c = _callback
                    }
                    ini.success = function (d) {

                        c.call(_o, d);
                    }
                    return ini;
                });
                return false;
            });


            /**ajax 链接*/
            $(selecter).delegate(_ini.a_ajax, "click", function () {
                var ini = {};
                var $this = $(this);
                ini.url = $this.attr("href") ? $this.attr("href") : $this.data("href");

                var callback = $this.data("callback");
                if (callback) {
                    if (callback.indexOf(".") > -1) {
                        var k = callback.split(".");
                        var c = window[k[0]][k[1]];
                    } else {
                        var c = window[callback];

                    }
                } else {
                    var c = _callback
                }

                var _o = this;
                var type = $this.data("type");
                if (type) {
                    ini.dataType = type;
                }
                ini.success = function (d) {
                    c.call(_o, d);

                }
                var ask = $this.data("ask");
                if (ask) {
                    layer.confirm(ask, function (index) {
                        __ajax({}, ini);
                    }, function (index) {
                        layer.close(index);
                        return false;
                    })
                } else {
                    __ajax({}, ini);
                }

                return false;

            });

        }

        window.setup = _init;
        $(function () {
            _init("body");
        })
    })($);



    /**
     * 搜索js 组件
     *
     * @param {[type]} dom [description]
     */
    window.Query = function (dom) {

        $(dom).click(function () {

            var data = $("[data-query]");
            var querstr = "";
            for (var i = 0; i < data.length; i++) {
                var o = $(data[i]);
                querstr += o.data("query") + ":" + o.data("op") + "=" + o.val() + "&";
            }
            var me = $(this);
            var url = me.data("url") + querstr;
            location.href = url;
        })



    }
})(jQuery);