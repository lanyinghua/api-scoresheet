/**
 * Created by huadu on 7/26/17.
 */
function deleteinfo() {
    document.getElementById('sc').addEventListener('submit', function deleteinfo (event) {
        event.preventDefault();
    });
    let deleteid = document.getElementById('deleteid').value;
    let infostr = localStorage.getItem(deleteid);//str,str,..
    if (!infostr){
        alert('请输入正确的学号')
    }else {
        let infoarr = infostr.split(',');
        if (confirm(`确定删除"${infoarr[0]}(学号:${infoarr[1]})"的成绩？`)) {
            localStorage.removeItem(infoarr[1]);
            alert('deleted')
        }
        else {
            alert("取消");
        }
    }
}

//all button
function printall() {
    $('#table').html('');
    $('#avgmedian').html('');
    let infostr='',infoarr=[];
    let totalarr=[];
    let newtr;
    for (let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i);
        infostr=localStorage.getItem(key);
        infoarr=infostr.split(',');
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
    let totaltr="<tr>"+
        "<td>"+medianOfTotalOfClass(totalarr)+"</td>"+
        "<td>"+avgOfTotalOfClass(totalarr)+"</td>"+
        "</tr>";
    $('#avgmedian').append(totaltr);
}