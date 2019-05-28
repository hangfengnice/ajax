function objToStr(obj) {
    obj.t = new Date().getTime()
    var res = [];
    for (var key in obj) {
        //避免url出现中文 进行转码
        res.push(encodeURIComponent(key) + "=" +encodeURIComponent(obj[key]))
    }
    console.log(res)
    return res.join('&')
}

function ajax(url, obj,timeout, success, error) {
    var str = objToStr(obj)
    var timer;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xml = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xml.open('get', url + "?" + str)
    xml.send()
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            clearInterval(timer)
            if (xml.status == 200) {
                success(xml)
            } else {
                error(xml)

            }
        }
    }
    if(timeout){
        timer = setInterval(() => {
            console.log("中断请求")
            xml.abort()
            clearInterval(timer)
        }, timeout);
    }

}

