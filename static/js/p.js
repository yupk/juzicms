
const requests = function(url, medth, data) {
    return new Promise(function(resolve, reject) {
        var query = null;
        if (typeof data == typeof {}) {
            if (medth == 'GET') {
                url = url + "?" + Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                    .join('&');

            } else {
                var query = Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                    .join('&');
            }
        } else {
            query = data;
        }
        var xhr = new XMLHttpRequest();
        xhr.open(medth, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr);
                    xhr = null;
                } else {
                    reject(xhr);
                }

            }
        }

        xhr.send(query);
    })

}


const pv=function(ini){
    let data={
        "type": 1,
        "target_id": 10001402493,
        "user_id": "",
        "time": "",
        "sex": "",
        "profession": "",
        "title": "2021年红谷滩区全民科学素质工作领导小组会议召开",
        "detail_id": 2221069,
        "age": "",
        "site_id": 13,
        "content_id": 1402493,
        "category": "event",
        "action": "comeIn",
        "source": "h5",
        "column_id": 91

    }

    data=Object.assign(data,ini);

    api="https://gapi.nctvcloud.com/api/analysis"

    requests(api,"POST",data).then(r=>{
        console.log(r);
    })

}

const like=function(ini){

    let data={
        id: "1402493",
        site_id: "4",
        type: "news",
        title:"2021年红谷滩区全民科学素质工作领导小组会议召开"
    }

    data=Object.assign(data,ini);

    let api="https://ncrm.nctvcloud.com/api/likes/do";

    requests(api,"POST",data).then(r=>{
        console.log(r);

        pv({action: "praise"});
          pv({action: "forward"});
    });



}


// like({});

// pv({});pv({});pv({});pv({});pv({});