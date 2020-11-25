function showTime() {
    const date = new Date();
    return "Hours : " + date.getHours() + " Minutes : " + date.getMinutes() + " Seconds : " + date.getSeconds();
}

function showSessionExpire() {
    console.log("Activity B : Your Session Expired At : " + showTime());
}

console.log("Activity A : Triggering Activity A At : " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity A : Triggered Activity B At : " + showTime() + " will execute after 5 seconds");