const baseurl='http://localhost:8000';
const xmlhttp=new XMLHttpRequest();
function addinfo() {
    document.getElementById('tj').addEventListener('submit', function addinfo (event){
        event.preventDefault()});
    let idarr=["name","id","nation","klass","mat","chi","eng","pro"];
    let infoarr=idarr.map(function (item) {
        return document.getElementById(item).value;
    });

    if (infoarr[0].length<4 && infoarr[0]!==""){//如果输入格式正确就会返回
        localStorage.setItem(`${infoarr[1]}`,infoarr);
        let str = `学生${infoarr[0]}的成绩被添加`;
        alert(str);
    }else {//如果输入格式不正确
        alert('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）')
    }
};



function printscoresheet() {
    $('#table').html('');
    $('#avgmedian').html('');
    let key=document.getElementById("stuid").value;//666,23...
    let keyarr=key.split(',');//keyarr=['666','23'...]
    let newtr;
    let totalarr=[];
  for (let i=0;i<keyarr.length;i++){
      let infostr=localStorage.getItem(keyarr[i]);
      //all info of the student by id(key)
      if (!infostr){
          alert('请按正确的格式输入要打印的学生的学号~*^_^*')
      }else {
          let infoarr=infostr.split(',');
          let total=0;total=parseInt(infoarr[4])+parseInt(infoarr[5])+parseInt(infoarr[6])+parseInt(infoarr[7]);
          totalarr.push(total);
          newtr="<tr >"+
              "<td>"+infoarr[0]+"</td>"+
              "<td>"+infoarr[1]+"</td>"+
              "<td>"+infoarr[4]+"</td>"+
              "<td>"+infoarr[5]+"</td>"+
              "<td>"+infoarr[6]+"</td>"+
              "<td>"+infoarr[7]+"</td>"+
              "<td>"+total+"</td>"+
              "</tr>";
          $('#table').append(newtr);

      }
  }
  let totaltr="<tr>"+
      "<td>"+medianOfTotalOfClass(totalarr)+"</td>"+
      "<td>"+avgOfTotalOfClass(totalarr)+"</td>"+
      "</tr>";
    $('#avgmedian').append(totaltr);

};


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

function changeinfo(event) {
    let idarr=["crtname","crtid","crtnation","crtklass","crtmat","crtchi","crteng","crtpro"];
    let infoarr=idarr.map(function (item) {
        return document.getElementById(item).value;
    });
    let sameIdstr=localStorage.getItem(infoarr[1]);
    if (!sameIdstr){
        alert('请按正确的格式输入');
    }else {
        let sameIdArr=sameIdstr.split(',');//same id's student info(str)
        if (sameIdArr[1]===infoarr[1]){
            localStorage.removeItem(sameIdArr[1]);
            localStorage.setItem(infoarr[1],infoarr);
            alert('finished');
        }else{
            alert('请按正确的格式输入');
        }
    }

}


