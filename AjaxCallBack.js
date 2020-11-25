let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return "Hours : " + date.getHours() + " Minutes : " + date.getMinutes() + " Seconds : " + date.getSeconds();
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // console.log(methodType + " State Change Called At : " + showTime() + " RS : " + xhr.readyState + " Status : " + xhr.status);
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
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
}

const getURL = "http://localhost:3000/employee_details/2";

function getUserDetails(data) {
    console.log("Get User Data at : " + showTime() + " Data : " + data)
}
makeAJAXCall("GET", getURL, getUserDetails, false);
console.log("Made ajax GET call to server at : " + showTime());

const deleteURL = "http://localhost:3000/employee_details/13";

function deletedDetails(data) {
    console.log("User Deleted at : " + showTime() + " Data : " + data);
}
makeAJAXCall("DELETE", deleteURL, deletedDetails, false);
console.log("Made ajax DELETE call to server at : " + showTime());

const postURL = "http://localhost:3000/employee_details";
const data = {
    "company_name": "Capgemini",
    "name": "Ratan",
    "address": "TBD",
    "gender": "M",
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

function addedUserData(data) {
    console.log("User Added at : " + showTime() + " Data : " + data);
}
makeAJAXCall("POST", postURL, addedUserData, true, data);
console.log("Made ajax POST call to server at : " + showTime());