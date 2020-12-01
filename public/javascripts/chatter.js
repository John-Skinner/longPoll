function signIn()
{

    window.PollPending = false;
    longPoll();


}
function longPoll()
{
    console.log(" long poll pollPending:" + window.PollPending);
    window.PollPending = true;
    let s = new XMLHttpRequest();
    s.timeout = 60000;
    s.addEventListener('error',(evt) =>
    {
        console.log("error:" + evt.type);

    });
    s.addEventListener('abort',(evt) =>
    {
        console.log("abort:" + evt.type);
    });
    let idElement = document.querySelector("#id");
    let id = idElement.innerHTML;
    s.onprogress = () =>
    {
        console.log(" progress event");
    };
    s.onerror = () =>
    {
        console.log(" error event");
    };
    s.onabort = () =>
    {
        console.log(" abort event")
    };
    s.ontimeout = () =>
    {
        window.PollPending = false;
        console.log(" poll pending off due to timeout");
//        longPoll();
    };
    s.open('put','/listen/' + id);
    console.log("opened here status:" + s.status);
    s.onload = ()=>
    {
        console.log(" fetch response");

    };

    s.onreadystatechange = () =>
    {
        console.log(" onreadystatechange status:" + s.readyState);
        if (s.readyState === 4)
        {
            window.PollPending = false;
            console.log(" poll pending off due to response");
            let resp = s.response;
            let status = resp.status;
            if (resp.length > 0)
            {
                let respObjext = JSON.parse(resp);
                let logElement = document.querySelector("#log");
                let message = respObjext.message;
                let currentLogText = logElement.innerHTML;
                // fixme use insertAdjacentHTML() for better performance.
                currentLogText = currentLogText + "\n" + message;
                logElement.innerHTML = currentLogText;

                console.log(' status:' + status);
            }
            else
            {
                console.log(' unusual empty response');
            }


            longPoll();
        }
        // let resp = s.response;

    }
    s.send();
    console.log("sent status:" + s.status);

}
function sendMsg(e)
{
    let msgElement = document.querySelector("#chatField");
    let req = new XMLHttpRequest();
    let idElement = document.querySelector("#id");
    let id = idElement.innerHTML;

    req.open('put','talk/' + id);
    let response = {
        message:msgElement.value
    };
    let responseText = JSON.stringify(response);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(responseText);

    console.log("msg event:" + msgElement.value)
}