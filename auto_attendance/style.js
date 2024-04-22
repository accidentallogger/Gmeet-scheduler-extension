console.log("set")
const entries = 0

window.addEventListener('load', function () {
    document.getElementById("addro").addEventListener("click", function () {
        let a = (document.getElementById("nameinfo").value).trim();
        let b = (document.getElementById("timeinfo").value).trim();
        let b2 = (document.getElementById("timeinfo2").value).trim();
        let c = (document.getElementById("linkinfo").value).trim();
        let info = [a, b, b2, c]

        chrome.storage.sync.set({ "nameinfo": (document.getElementById("nameinfo").value) })
        chrome.storage.sync.set({ "timeinfo": (document.getElementById("timeinfo").value) })
        chrome.storage.sync.set({ "timeinfo2": (document.getElementById("timeinfo2").value) })
        chrome.storage.sync.set({ "linkinfo": (document.getElementById("linkinfo").value) })

        if (a.length === 0 && b.length === 0 && c.length === 0 && b2.length === 0) {
            chrome.storage.sync.get(["nameinfo", "timeinfo2", "timeinfo", "linkinfo", "time", "time2", "informatica"], function (a) {
                chrome.storage.sync.set({ "informatica": a.informatica });
            });
            console.log("null");
        } else {

            chrome.storage.sync.get(["checkinfo", "nameinfo", "timeinfo", "linkinfo", "time", "time2", "informatica"], function (a) {
                const infomain = a.informatica;
                infomain.push(info);
                chrome.storage.sync.set({ "informatica": infomain });
                var table = document.getElementById("myTable");

                for (let i = 0; i < a.informatica.length; i++) {
                    var table = document.getElementById("myTable");
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);

                    cell1.innerHTML = a.informatica[i][0];
                    cell2.innerHTML = a.informatica[i][1];
                    cell3.innerHTML = a.informatica[i][2];
                    cell4.innerHTML = a.informatica[i][3];
                    cell5.innerHTML = "<input type='radio' id='check'>";

                }



                console.log(time)
            })
        }
    })

    document.getElementById("butn").addEventListener("click", function () {
        console.log("working")

        chrome.storage.sync.set({ "time": (document.getElementById("time").value) * 60 * 1000 })
        chrome.storage.sync.set({ "time2": (document.getElementById("time2").value) * 60 * 1000 })
        //chrome.storage.sync.set({ "nameinfo": (document.getElementById("nameinfo").value) })
        //chrome.storage.sync.set({ "timeinfo": (document.getElementById("timeinfo").value) })
        //chrome.storage.sync.set({ "linkinfo": (document.getElementById("linkinfo").value) })

        chrome.storage.sync.get(["endp", "checkinfo", "informatica", "nameinfo", "timeinfo", "linkinfo", "time", "time2"], function (a) {
            let newarr = []
            let newarr2 = []
            for (let lm = 0; lm < a.informatica.length; lm++) {
                let loc = ((parseInt(a.informatica[lm][1].substr(0, 2)) * 60) + (parseInt(a.informatica[lm][1].substr(3, 2)))) * 60 * 1000
                newarr.push(loc)
                chrome.storage.sync.set({ "endp": newarr })
                let loc2 = ((parseInt(a.informatica[lm][2].substr(0, 2)) * 60) + (parseInt(a.informatica[lm][2].substr(3, 2)))) * 60 * 1000
                newarr2.push(loc2)
                chrome.storage.sync.set({ "endp2": newarr2 })
            }

        })





    })
    if (localStorage.getItem("cheo") == "true") {

        document.getElementById("time").removeAttribute("disabled")
        document.getElementById("butn").removeAttribute("disabled")
        document.getElementById("time2").removeAttribute("disabled")
        document.getElementById("nameinfo").removeAttribute("disabled")
        document.getElementById("timeinfo").removeAttribute("disabled")
        document.getElementById("timeinfo2").removeAttribute("disabled")
        document.getElementById("linkinfo").removeAttribute("disabled")
        document.getElementById("addro").removeAttribute("disabled")
        document.getElementById("addro2").removeAttribute("disabled")
        document.getElementById("addro3").removeAttribute("disabled")

        chrome.storage.sync.get(["checkinfo", "informatica", "nameinfo", "timeinfo", "linkinfo", "time", "time2"], function (a) {
            document.getElementById("time").value = (a.time / 60000);
            document.getElementById("time2").value = (a.time2 / 60000);
            console.log(a.informatica);
            console.log(a.checkinfo);

            for (let i = 0; i < a.informatica.length; i++) {
                var table = document.getElementById("myTable");
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                cell1.innerHTML = a.informatica[i][0];
                cell2.innerHTML = a.informatica[i][1];
                cell3.innerHTML = a.informatica[i][2];
                cell4.innerHTML = a.informatica[i][3];
                cell5.innerHTML = "<input type='radio' id='check'>";


            }



            console.log(time)
        })
    }
    document.getElementById("addro3").addEventListener("click", function () {
        chrome.storage.sync.get(["informatica", "checkinfo"], function (a) {
            var table = document.getElementById("myTable");








        });

    });
    document.getElementById("addro2").addEventListener("click", function () {
        chrome.storage.sync.get(["informatica"], function () {
            chrome.storage.sync.set({ "informatica": [] });
        });
    });
    document.getElementById("cheo").addEventListener("click", function () {
        var checkbox = document.getElementById("cheo");
        localStorage.setItem("cheo", checkbox.checked);


        chrome.storage.sync.set({ "work": localStorage.getItem("cheo") }, function () {
            console.log("data packet saved")
            console.log(localStorage.getItem("cheo"))
        });

        window.location.reload();
    })

    var checked = JSON.parse(localStorage.getItem("cheo"));
    document.getElementById("cheo").checked = checked;





})

