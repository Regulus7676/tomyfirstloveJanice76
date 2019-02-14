var dataTable = null;
//var db = openDatabase('MyData','','My Database',102400);
var db = openDatabase("MsgData", "1.0", "留言表", 1024 * 1024, function () { });

function init(){
    dataTable = document.getElementById("dataTable");
    showAllData();
}

function removeAllData(){
    for(var i = dataTable.childNodes.length-1;i >= 0;i--){
        dataTable.removeChild(dataTable.childNodes[i]);
    }
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    th1.innerHTML = '姓名';
    th2.innerHTML = '留言';
    th3.innerHTML = '时间';
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    dataTable.appendChild(tr);
}

function showData(row){
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.innerHTML = row.name;
    var td2 = document.createElement('td');
    td2.innerHTML = row.message;
    var td3 = document.createElement('td');
    var t = new Date();
    t.setTime(row.time);
    td3.innerHTML = t.toLocaleDateString()+" "+t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    dataTable.appendChild(tr);
}

function showAllData(){
    db.transaction(function(tx){
        tx.executeSql('create table if not exists MsgData(name text,message text,time integer',[]);
        tx.executeSql('select * from MsgData',[],function(tx,rs){
            removeAllData();
            for(var i = 0;i < rs.rows.length;i++){
                showData(rs.rows.item[i]);
            }
        });
    });
}

function addData(name,message,time){
    db.transaction(function(tx){
        tx.executeSql(
        'insert into MsgData(name,message,time) values(?,?,?)',
        [name,message,time],
        function(tx,rs){
            alert("成功保存数据！");
        },
        function(tx,error){
            alert(error.source + "::" + error.message);
        }
        );
    });
}

function saveData(){
    var name = document.getElementById('name').value;
    var memo = document.getElementById('memo').value;
    var time = new Date().getTime();
//    alert(name + memo + time);
    addData(name,memo,time);
    showAllData();
}
