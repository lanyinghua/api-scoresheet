/**
 * Created by huadu on 7/27/17.
 */

var express = require('express');
var bodyParser=require('body-parser');
var expressapp = express();
// expressapp.use(bodyParser.json());
expressapp.use(bodyParser.urlencoded({extended:false}));

var count=0;
var redis= require('redis');
var redisclient=redis.createClient();

//-------- 查询--------
expressapp.get('/students',function(req,res){
    let key=req.query.stuid;//666,23...
    let keyarr=key.split(',');//keyarr=['666','23'...]
    let totalarr=[];
    redisclient.mget(keyarr,function (err,reply) {
        if (err){
            res.status(400).send('请按正确的格式输入要打印的学生的学号~*^_^*')
        }else {
            res.send(reply);
        }
    })
});

function medianOfTotalOfClass(arr) {//totalarr:[num]
    arr=arr.sort(function (compare1,compare2) {
        return compare1 - compare2
    });
    let midIndex=parseInt(arr.length/2);
    let median=0;
    if (arr.length%2===0){
        median=(arr[midIndex-1]+arr[midIndex])/2;
    }else {
        median=arr[midIndex];
    }
    return median;
}
function avgOfTotalOfClass(arr){//arr=totalarr:[num]
    let totaloftotal=0;
    for (let i=0;i<arr.length;i++){
        totaloftotal+=arr[i];
    }
    let l=0;l=arr.length;
    let avgoftotal=0;
    avgoftotal=(totaloftotal/l).toFixed(2);
    return avgoftotal;
}

expressapp.use(express.static('public'));
expressapp.get('/', function (req, res) {
    res.sendFile( __dirname + "/public/web-scoresheet.html" );
});


expressapp.post('/student',function (req,res) {
    let infobj={
       name: req.body.name,
       id: req.body.id,
       nation: req.body.nation,
       klass: req.body.klass,
       mat: req.body.mat,
       chi: req.body.chi,
       eng: req.body.eng,
       pro: req.body.pro,
        total:0,
        avg:0,
    };
    if (infobj.name.length<4 && infobj.name!==""&&infobj.id !==''){//如果输入格式正确就会返回
        infobj.total=parseInt(infobj.mat)+parseInt(infobj.chi)+parseInt(infobj.eng)+parseInt(infobj.pro);
        infobj.avg=(infobj.total/4).toFixed(2);
        let infostr=JSON.stringify(infobj);
        redisclient.set(infobj.id,infostr);
        redisclient.get(infobj.id,function (err,reply) {
            res.send(reply);
        })
    }else {//如果输入格式不正确
        res.status(400).send('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）')
    }

});

expressapp.put('/students/:id',function (req,res) {
    let id=req.params.id;
    redisclient.get(id,function (err,reply) {
        if(err){
            res.status(400).send(('请按正确的格式输入'));
        }else{
            let infobj={
                name: req.body.crtname,
                id: req.body.crtid,
                nation: req.body.crtnation,
                klass: req.body.crtklass,
                mat: req.body.crtmat,
                chi: req.body.crtchi,
                eng: req.body.crteng,
                pro: req.body.crtpro,
                total:0,
                avg:0,
            };
            if (infobj.name!==""&&infobj.id !==''){//如果输入格式正确就会返回
                infobj.total=parseInt(infobj.mat)+parseInt(infobj.chi)+parseInt(infobj.eng)+parseInt(infobj.pro);
                infobj.avg=(infobj.total/4).toFixed(2);
                let infostr=JSON.stringify(infobj);
                redisclient.set(infobj.id,infostr);
                redisclient.get(infobj.id,function (err,reply) {
                    res.send(reply);
                })
            }else {//如果输入格式不正确
                res.status(400).send('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）')
            }
        }
    })
});

expressapp.delete('/students/:id',function (req,res) {
    let key=req.params.id;
    redisclient.get('key',function (err,reply) {
        if (err){
            res.status(404).send(`该学生不存在`)
        }else {
            redisclient.del('key');
            res.send('该学生已成功删除')
        }
    })
});

expressapp.listen(8000,'localhost',function(){
    console.log('express is listening');
});
