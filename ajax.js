function objToStr(data) {
    data.t = new Date().getTime()
    var res = [];
    for (var key in data) {
        //避免url出现中文
        res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    }
    return res.join('&')
}

function ajax(option) {
    var str = objToStr(option.data)
    var timer;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xml = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (option.type.toLowerCase() === 'get') {
        xml.open(option.type, option.url + "?" + str)
        xml.send()
    } else {
        xml.open(option.type, option.url)
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xml.send(str);
    }


    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            clearInterval(timer)
            if (xml.status == 200) {
                option.success(xml)
            } else {
                option.error(xml)

            }
        }
    }
    if (option.timeout) {
        timer = setInterval(() => {
            console.log("中断请求")
            xml.abort()
            clearInterval(timer)
        }, option.timeout);
    }

}