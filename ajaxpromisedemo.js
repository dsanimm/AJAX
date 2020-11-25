let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return "Hours : " + date.getHours() + " Minutes : " + date.getMinutes() + " Seconds : " + date.getSeconds();
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            // console.log(methodType + " State Change Called At : " + showTime() + " RS : " + xhr.readyState + " Status : " + xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 Client Error Or 500 server error at : " + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else
            xhr.send();
        console.log("Request Sent to the server at : " + showTime());
    });
}

const getURL = "http://localhost:3000/employee_details/2";
makePromiseCall("GET", getURL, true).then(responseText => {
    console.log("Get User Data : " + responseText)
}).catch(error => console.log("Get Error Status : " + JSON.stringify(error)));
console.log("Made ajax GET call to server at : " + showTime());

const deleteURL = "http://localhost:3000/employee_details/13";
makePromiseCall("DELETE", deleteURL, false).then(responseText => {
    console.log("Deleted User Data : " + responseText)
}).catch(error => console.log("Delete Error Status : " + JSON.stringify(error)));
console.log("Made ajax DELETE call to server at : " + showTime());

const postURL = "http://localhost:3000/employee_details";
const data = {
    "company_name": "Capgemini",
    "name": "Mallika",
    "address": "TBD",
    "gender": "F",
    "salary": 6790000,
    "startDate": {
        "year": 2010,
        "month": 3,
        "day": 19
    },
    "department_ids": [
        3
    ]
};
makePromiseCall("POST", postURL, true, data).then(responseText => {
    console.log("Posted User Data : " + responseText)
}).catch(error => console.log("Post Error Status : " + JSON.stringify(error)));
console.log("Made ajax POST call to server at : " + showTime());