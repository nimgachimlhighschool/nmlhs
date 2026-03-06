let results = JSON.parse(localStorage.getItem("results")) || [];
let examInfo = JSON.parse(localStorage.getItem("examInfo")) || {};

document.getElementById("year").innerText = new Date().getFullYear();

const studentSection=document.getElementById("studentSection");
const adminLoginBox=document.getElementById("adminLogin");
const adminPanel=document.getElementById("adminPanel");
const menu=document.getElementById("menu");

/* MENU TOGGLE */
function toggleMenu(){ menu.classList.toggle("open"); }

/* ADMIN PAGE */
function showAdmin(){
    menu.classList.remove("open");
    studentSection.classList.add("hidden");
    adminLoginBox.classList.remove("hidden");
}
function logout(){
    menu.classList.remove("open");
    adminLoginBox.classList.add("hidden");
    adminPanel.classList.add("hidden");
    studentSection.classList.remove("hidden");
}

/* ADMIN LOGIN */
function adminLogin(){
    let mobile=document.getElementById("adminMobile").value;
    let pass=document.getElementById("adminPass").value;
    let captcha=document.getElementById("captcha").checked;
    if(mobile==="01700000000" && pass==="0909" && captcha){
        adminLoginBox.classList.add("hidden");
        adminPanel.classList.remove("hidden");
    }else{ alert("Invalid Login"); }
}

/* PUBLISH RESULT */
function publish(){
    let examName=document.getElementById("examName").value;
    let examYear=document.getElementById("examYear").value;
    let session=document.getElementById("session").value;
    let file=document.getElementById("excelFile").files[0];
    if(!file){ alert("Upload CSV file"); return; }
    examInfo={name:examName,year:examYear,session:session};
    results=[];
    let reader=new FileReader();
    reader.onload=function(e){
        let rows=e.target.result.split("\n");
        rows.forEach(r=>{
            let col=r.split(",");
            if(col.length>=4){
                results.push({name:col[0].trim(),reg:col[1].trim(),mobile:col[2].trim(),result:col[3].trim()});
            }
        });
        localStorage.setItem("results",JSON.stringify(results));
        localStorage.setItem("examInfo",JSON.stringify(examInfo));
        alert("✅ Result Published");
    }
    reader.readAsText(file);
}

/* SEARCH RESULT */
function searchResult(){
    let reg=document.getElementById("searchReg").value;
    let mobile=document.getElementById("searchMobile").value;
    let resultArea=document.getElementById("resultArea");
    let student=results.find(r=>r.reg===reg && r.mobile===mobile);
    if(student){
        resultArea.innerHTML=`
        <div class="result-sheet" id="resultSheet">
            <h2 class="center">NORSHUNDA COMPUTER TRAINING CENTER</h2>
            <h3 class="center">${examInfo.name}</h3>
            <div class="grid">
                <p><b>Year:</b> ${examInfo.year}</p>
                <p><b>Session:</b> ${examInfo.session}</p>
            </div>
            <hr>
            <div class="grid">
                <p><b>Name:</b> ${student.name}</p>
                <p><b>Registration:</b> ${student.reg}</p>
                <p><b>Mobile:</b> ${student.mobile}</p>
                <p><b>Result:</b> ${student.result}</p>
            </div>
            <div class="btn-group">
                <button class="btn" onclick="window.print()">Print</button>
            </div>
        </div>`;
    }else{ alert("Result Not Found"); }
}

