const fs = require("fs");
var http = require("http");
var url =require("url");
var qs = require("qs");
GET_h=(req,res)=>{
    switch(req.url){
        case '/':
            let q = url.parse(req.url, true).query;
            console.log(q);
            let students=fs.readFileSync("StudentList.json", "utf8");
            res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
            res.end(students);
            break;
        default:
            req.url=req.url.replace('/', '');
            console.log(req.url);
            if(parseInt(req.url))
            {
             let students= JSON.parse(fs.readFileSync("StudentList.json", "utf8"));
             let k=0;
             students.forEach(element => {
                if(element.id == req.url)
                {
                   res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
                  res.end(JSON.stringify(element));
                   k++;
                }
            }); 
            if(!k)
            {
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
                res.end("Элементы не найдены");
            }
            }
            break;
}
};
POST_h=(req,res)=>{
    switch(req.url){
        case "/":
        let result='';
        req.on('data', (data)=>{result+=data;})
        req.on('end', ()=>{
            
            let newStudent =JSON.parse(result);
            let students= JSON.parse(fs.readFileSync("StudentList.json", "utf8"));
             let k=0;
             students.forEach(element => {
                if(element.id == newStudent.id)
                {
                   k++;
                }
            }); 
            if(k>0)
            {
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
                res.end("Элементы не найдены");
            }
            else
            {
                let students= JSON.parse(fs.readFileSync("StudentList.json", "utf8"));
                   students[students.length]=newStudent;
                   res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
                   res.end(JSON.stringify(newStudent));
                   fs.writeFileSync("StudentList.json", JSON.stringify(students));
            }
        })
        break;
        case '/backup':
            var myDate = new Date();
            var myDate = new Date();
            var month = myDate.getMonth()
            var hour = myDate.getHours();
            var minute = myDate.getMinutes();
            var second = myDate.getSeconds();
            var year = myDate.getFullYear()
            var day = myDate.getDate();
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            if (month < 10) {
                month = "0" + month;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            let students= JSON.parse(fs.readFileSync("StudentList.json", "utf8"));
            fs.writeFileSync('backup/'+year+""+(parseInt(month)+1)+""+day+""+hour+""+minute+""+second+"_StudentList.json", JSON.stringify(students));
}
};
PUT_h=(req,res)=>
{
    switch(req.url){
        case "/":
        let result='';
        req.on('data', (data)=>{result+=data;})
        req.on('end', ()=>{
            
            let newStudent =JSON.parse(result);
            let students= JSON.parse(fs.readFileSync("StudentList.json", "utf8"));
             let k=0;
             students.forEach(element => {
                if(element.id == newStudent.id)
                {
                    students[k]=newStudent;
                    fs.writeFileSync("StudentList.json", JSON.stringify(students));
                    res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
                   res.end(JSON.stringify(newStudent));
                  
                }
                k++;
            }); 
            if(k<1)
            {
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
                res.end("Элементы не найдены");
            }
           
           
        })
}
}
DELETE_h=(req,res)=>
{
    switch(req.url){
        default:
        req.url=req.url.replace('/', '');
            console.log(req.url);
            if(parseInt(req.url))
            {
             let students= JSON.parse(fs.readFileSync("StudentList.json", "utf8"));
             let k=0;
             students.forEach(element => {
                if(element.id == req.url)
                {
                    students.splice(k,1);
                    fs.writeFileSync("StudentList.json", JSON.stringify(students));
                   res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
                  res.end(JSON.stringify(element));
                   
                }
                k++;
            }); 
            if(!k)
            {
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
                res.end("Элементы не найдены");
            }
            }
            break;
           
           
        }
}

let server = http.createServer( (req, res)=>{
    switch (req.method){
        case 'GET':
            GET_h(req, res);
            //res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            //res.end(req.method +":"+req.url);
            break;
        case 'POST':
            POST_h(req,res);
            break;
        case 'PUT':
            PUT_h(req,res);
            break;
        case 'DELETE':
            DELETE_h(req,res);
            break;
    }
})
server.listen(3000, (v)=>{console.log('OK')})