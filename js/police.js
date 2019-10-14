setInterval(function() {
    $.ajax({
        url: 'http://192.168.0.102/mapbox/src/getwarnInfo.php',
        type: "post",
        dataType: 'json',
        data: {

        },
        success: function(ret) {
            //  console.log(JSON.stringify(ret))
            if (ret) {
            //  console.log(JSON.stringify(ret))
                if (ret.errorCode == 0) {
                    $.each(ret.result.data, function(i, v) {
                        $.ajax({
                            url: 'http://192.168.0.102/shop/src/alarm_signal.php',
                            type: 'post',
                            dataType: "json",
                            data: {
                                type: 1,
                                user_id: '王建国',
                                units_id: ret.result.units_id,
                                address: ret.result.address,
                                host: v.host,
                                loopnumber: v.loopnumber,
                                codeaddress: v.codeaddress,
                                addtime: v.time,
                                alarm_signal: "火警"
                            },
                            success: function(ret) {
                              console.log(JSON.stringify(ret))
                              api.openWin({
                                  name: 'policeMessage',
                                  url: 'policeMessage/index.html',
                                  pageParam: {
                                     id:ret.id
                                  }
                              });
                            }

                        })
                    })

                }


            }
        }
    })
}, 10000)
