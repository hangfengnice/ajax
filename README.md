# ajax  

### ajax代码  
```javascript  
function objToStr(data) {
    data.t = new Date().getTime()                //使每次的URL不同
    var res = [];
    for (var key in data) {
        //避免url出现中文
        res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    }
    return res.join('&')
}

function ajax(option) {                          //对象的情况下，发送请求时位置可以随意
    var str = objToStr(option.data)
    var timer;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xml = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (option.type.toLowerCase() === 'get') {  //大小写均能成功发送请求
        xml.open(option.type, option.url + "?" + str)
        xml.send()
    } else {
        xml.open(option.type, option.url)
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xml.send(str);
    }
    xml.onreadystatechange = function () {     
        if (xml.readyState == 4) {
            clearInterval(timer)               //这里已经收到响应，解除定时器        
            if (xml.status == 200) {
                option.success(xml)
            } else {
                option.error(xml)

            }
        }
    }
    if (option.timeout) {                      //设定请求时间，超过设定时间，中断请求
        timer = setInterval(() => {
            console.log("中断请求")
            xml.abort()
            clearInterval(timer)
        }, option.timeout);
    }
}  
```  

### html代码  
```html  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>jquery</title>
    <!-- <script src='../node_modules/jquery/dist/jquery.js'></script> -->
    <script src='./ajax.js'></script>
    <script>
        window.onload = function () {
            var Btn = document.querySelector("button");
            Btn.onclick = function () {
                //   $.ajax({
                //       type: 'get',
                //       url: "./ajax.php",
                //       data:'name=hangfeng&age:12',
                //       success:function(xml){
                //           console.log(xml)
                //       },
                //       error:function(xml){
                //           console.log(xml.status)
                //       }
                //   })

                ajax({
                    type: "GET",
                    url: './ajax.php',
                    data: {
                        name: 'hangfeng',
                        age: 18
                    },
                    timeout: 3000, 
                    success: function (xml) {
                        console.log(xml.responseText)
                    },
                    error: function (xml) {
                        console.log('error')
                    }
                })
            }
        }
    </script>
</head>
<body>
    <button>发送请求</button>
</body>
</html>  
```
