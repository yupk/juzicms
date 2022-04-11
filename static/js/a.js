
CP= function(i) {

    var _href = a._date_href,
        o = a.getMousePos(),
        action = (1 == a.isdt) ? a._date_href2 + '&it=1' : _href,
        myvalue = a._date_sp.split(','),
        u_sw = window.screen.width,
        u_sh = window.screen.height,
        u_url = a.GS(),
        r_url = a.GR(),
        u_scd = window.screen.colorDepth,
        u_bw = 1,
        u_bh = 1;
    if (window.innerWidth) {
        u_bw = window.innerWidth
    } else {
        if ((document.body) && (document.body.clientWidth)) {
            u_bw = document.body.clientWidth
        }
    }
    if (window.innerHeight) {
        u_bh = window.innerHeight
    } else {
        if ((document.body) && (document.body.clientHeight)) {
            u_bh = document.body.clientHeight
        }
    }

    var u_utz = a.GT(),
        u_fv = a.GF(),
        ucx = a.xx,
        ucy = a.yy,
        ucb = a.ucb,
        uce = a.uce,
        s_id = __wangzhai_s_id,
        cdate = new Date(),
        staytime = parseInt((cdate.getTime() - _sdate.getTime()) / 1000),
        _url = action + '&u_sw=' + u_sw + '&u_sh=' + u_sh + '&u_url=' + r_url + '&r_url=' + u_url + '&u_scd=' + u_scd + '&u_bw=' + u_bw +
        '&u_bh=' + u_bh + '&u_utz=' + u_utz + '&u_fv=' + u_fv + '&ucx=' + ucx + '&ucy=' + ucy + '&ucb=' + ucb + '&uce=' + uce + '&iv=' + _iv + '&vt=' + parseInt(new Date().getTime() / 1000) + '&s_id=' + s_id + '&imgid=' + myvalue[0] + '&plat=' + a.getPlatform() + '&staytime=' + staytime;

    if (2 == i) _url += '&it=1';
    if (1 == i) {
        return _url;
    } else {
        // a.dopv('click', __wangzhai_s_id, w_zoneid, myvalue[0], myvalue[2]);
        var has_c_p = a.GCO("_has_click_plan" + w_zoneid);
        if (has_c_p.indexOf('|' + myvalue[2] + '|') === -1) {
            has_c_p += '|' + myvalue[2] + '|';
        }
        cdate.setTime(cdate.getTime() + 2 * 3600000);
        a.SCO("_has_click_plan" + w_zoneid, has_c_p, cdate);
        window.location.href = _url;
    }

};

s=FJKSMQrEJf.CP.toString()
s=s.replace(/\n+/g,"\n").replace(' window.location.href = _url','alert(_url)')
s.replace(//)
 
 ss=eval('a='+);

 FJKSMQrEJf.CP=ss


 function rewriteFunc(func,fn){

    let strs=func.toString().replace(/\n+/g,"\n").replace(/a\./g,"DEhhjtGw.");
 
    strs=fn(strs)

    console.log(strs)
     
    return (new Function("return "+ strs))();

}

DEhhjtGw.CP =rewriteFunc(DEhhjtGw.CP,(s)=>{ return s.replace(' window.location.href = _url','alert(_url)')})