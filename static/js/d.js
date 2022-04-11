//  (function() {
//      function json(obj) {
//          let d = {}
//          for (let a in obj) {
//              if (typeof(obj[a]) == 'function') {

//              } else if (typeof(obj[a]) != 'object') {
//                  d[a] = obj[a]
//              } else {
//                  d[a] = json(obj[a]);
//              }

//          }
//          return d

//      }

//      if(navigator.userAgent.indexOf("baidu")==-1){

//         let viewport={width:window.innerWidth,height:window.innerHeight}
//         let scale=parseInt(window.devicePixelRatio);
//            let img=   new Image()
    


//      img.src="http://admin.bucuome.vkandian.cn/index.php/admin/client?data="+encodeURI(JSON.stringify(json({viewport,scale,navigator})))
     

//      }

  
//  })()