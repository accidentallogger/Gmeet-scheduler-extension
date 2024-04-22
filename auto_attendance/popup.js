//leaves at 2 mins before endtime. so you can change it if you want in the code.

//waits for 5 mins before entering a new class but based on tests you will have to increase that because people join even more late and youdont want to be in the class alonw tih the teacher when you are afk.

//takes endtime from website and save the time in endpoint

//saves your pass and username in locally stored variables

console.log("we do some trolling!!");
console.log(document.domain);
console.log(window.location.href);

chrome.storage.sync.get(["time", "time2", "informatica"], (a) => {
    // localStorage.setItem("assuser", a.user);
    localStorage.setItem("asstime", a.time);
    // localStorage.setItem("asspass", a.pass);
    localStorage.setItem("asstime2", a.time2);
    var all_info = []
    for (let k = 0; k < a.informatica.length; k++) {
        all_info[k] = a.informatica[k][3];
    }
    chrome.storage.sync.set({ "urlscurr": all_info });
    localStorage.setItem("urllocal", all_info);
    console.log(a.informatica)
})
//var user = localStorage.getItem("assuser")
//var pass = localStorage.getItem("asspass")


// change to your username and pass and also find a way to use the popup so that you can get stuff from there.
var rejointime = localStorage.getItem("asstime2")

var urls = localStorage.getItem("urllocal")
var pretime = localStorage.getItem("asstime")
//change this to adjust leave time i have kept it at 2 mins so that it will leave at 2 mins prior to ending it.
console.log("rejoin: ", rejointime)
console.log("leavemin: ", pretime)
console.log(urls)





window.addEventListener("load",
    function () {
        chrome.storage.sync.get(["work", "informatica", "endp", "urlcurr", "endpl", "endpl2", "endp2"], function (items2) {


            console.log(items2.work)
            console.log(items2.endp2)
            if (items2.work == "true") {

                setTimeout(function () {
                    try {
                        var today = new Date()
                        var timeout = (today.getHours() * 3600 * 1000) + (today.getMinutes() * 60 * 1000)
                        if (document.domain == "meet.google.com") {

                            chrome.storage.sync.get(["endpl", "informatica", "endpl", "endp", "urlcurr", "endpl2", "endp2"], function (items) {
                                chrome.storage.sync.set({ "endpl": items.endp[0] })
                                chrome.storage.sync.set({ "endpl2": items.endp2[0] })
                                //console.log("here is the endtime:" + items.endp[0]);

                                //retrieve data

                                var endpp2 = items.endpl2;
                                var today = new Date()
                                var time = (today.getHours() * 3600 * 1000) + (today.getMinutes() * 60 * 1000)

                                var intervals = (endpp2 - time) - pretime

                                console.log("here is the interval: " + intervals);

                                console.log("here is the current time: " + time);

                                //close cam
                                document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .KWIIWd .gAGjv .vgJExf .Qmt7oc .KieQAe .ZUpb4c .oORaUb .mFzCLe .EhAUAc .GOH7Zb .GKGgdd .U26fgb .DPvwYc .IYwVEf .oTVIqe").click();
                                //mute mic
                                document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .KWIIWd .gAGjv .vgJExf .Qmt7oc .KieQAe .ZUpb4c .oORaUb .mFzCLe .EhAUAc .ZB88ed .dP0OSd .GKGgdd .U26fgb .DPvwYc .SUtDBe").click();

                                //join meet
                                document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .KWIIWd .gAGjv .vgJExf .Qmt7oc .KieQAe .d7iDfe .shTJQe .jtn8y .XCoPyb .VfPpkd-dgl2Hf-ppHlrf-sM5MNb .QJgqC .VfPpkd-vQzf8d").click();

                                //leave meet
                                setTimeout(function () {
                                    document.querySelector(".EIlDfe .MCcOAc .SSPGKf .T4LgNb .kFwPee .crqnQb .G03iKb .UnvNgf .Tmb7Fd .R5ccN .NHaLPe .VfPpkd-Bz112c-LgbsSe .VfPpkd-Bz112c-Jh9lGc").click()
                                    setTimeout(function () { window.open("https://meet.google.com/", "_top"); }, rejointime); //rejointime
                                    let news = items.endp.shift()
                                    let newa = items.endp2.shift()
                                    let news2 = items.urlcurr.shift()
                                    chrome.storage.sync.set({ "endp": news })
                                    chrome.storage.sync.set({ "endp2": newa })
                                    chrome.storage.sync.set({ "urlcurr": news2 })
                                    chrome.storage.sync.set({ "endpl": news[0] })
                                    chrome.storage.sync.set({ "endpl2": newa[0] })
                                    let updateinfo = items.informatica;
                                    updateinfo.shift()
                                    chrome.storage.sync.set({ "informatica": updateinfo })
                                    var f = items.urlcurr[0]

                                    window.open(f, "_top");
                                }, intervals) //intervals
                            });






                        } else if (timeout >= items2.endpl) {

                            chrome.storage.sync.get(["urlcurr", "informatica", "endp"], function (ak) {
                                var d = ak.urlcurr[0]
                                window.open(d, "_top");
                            })
                        }
                    } catch (error) {

                        if (window.location.href ==
                            "https://meet.google.com/") {
                            chrome.storage.sync.set({ "endpl": 86400000 }, function () {
                                console.log("data packet saved")
                            });
                            setInterval(function () { window.location.reload(); }, 60000);
                        }
                    }

                }, 3000);

            }
        })
    }


)
