ip=localStorage.getItem("ip")
 var mySocket;
 (function(){
     mySocket = new WebSocket(`ws://${ip}:50020`,"my-custom-protocol");
     url="http://192.168.0.127/dutylist/src/api/xiaokong.php",
     mySocket.onopen = function Open() {
         // Show("连接打开");
     };
     mySocket.onmessage = function (evt) {
         var msg=evt.data
         if(msg!=""){
              user_id=localStorage.getItem("user_id")
             var data = eval('(' + msg + ')');
             if(data) {

              $.ajax({
                url:url,
                type:'post',
                dataType:"json",
                data:{
                  AppId:data.AppId,
                  Mtype:data.Mtype,
                  Addr:data.Addr,
                  ValueVal:data.ValueVal,
                  DateT:data.DateT,
                  user_id:user_id,
                  type:1
                },
                success:function (ret) {
                      console.log(JSON.stringify(ret))
                },
                error:function(ret){
                  console.log(JSON.stringify(ret))
                }

              })

               api.openWin({
                   name: 'policeMessage',
                   url: './policeMessage/index.html',
                   pageParam: {
                       AppId:data.AppId
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
