  ip=localStorage.getItem("ip")

   var mySocket;
   (function(){
       mySocket = new WebSocket(`ws://${ip}:50020`);
       url="",
       mySocket.onopen = function Open() {
           // Show("连接打开");
       };
       mySocket.onmessage = function (evt) {
           user_id=localStorage.getItem("user_id")
           var msg=evt.data
           if(msg!=""){
               var data = eval('(' + msg + ')');
               if(data) {
                alert("有一条报警信息")
                $.ajax({
                  url:url,
                  type:'post',
                  dataType: "json",
                  data:{
                    AppId:data.AppId,
                    Mtype:data.Mtype,
                    Addr:data.Addr,
                    ValueVal:data.ValueVal,
                    DateT:data.DateT,
                    user_id:user_id
                  },
                  success: function (ret) {

                  }

                })
                 api.openWin({
                     name: 'policeMessage',
                     url: '../policeMessage/policeMessage.html',
                     pageParam: {
                         data: data
                     }
                 });
               }


           }

       };
       mySocket.onclose = function Close() {
          //  Show("连接关闭");
           mySocket.close();
       };
      //  window.setInterval(function(){ //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
      //      var ping = {"type":"ping"};
      //      mySocket.send(JSON.stringify(ping));
      //  },1000)
   }())
