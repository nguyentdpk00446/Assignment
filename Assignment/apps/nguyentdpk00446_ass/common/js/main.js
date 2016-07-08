var waitingTime = null;
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
    waitingTime = new WL.BusyIndicator(null,{ text: 'Đang kiểm tra...', textColor: "red"});
    $('#chitietwait').click(waitingTimeDemo);
}



function KiemTraDangNhap(){
	var ten = $("#idusername").val();
	var matkhau = $("#idpassword").val();
	
	if(ten == "admin" && matkhau == "admin"){
		danhs();
		return false;
	}
	
	var invocationData = {
		adapter: 'MySqlAdapter',
        procedure : "DangNhap",
        parameters : [ten, matkhau]
	};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadSQLQueerySuccess, //success callback
		onFailure : loadSQLQueeryFailure // failure callback
	});
	function loadSQLQueerySuccess(result){
		
		var soLuongKetQua = result.invocationResult.resultSet.length;
		
		
		if(soLuongKetQua == 1){
			var items = result.invocationResult.resultSet;
			alert("Dang nhap thanh cong");
			sign();
		}else if(soLuongKetQua <= 0){
			alert("Dang nhap that bai");
		}
	}

	function loadSQLQueeryFailure(result){
		alert("Ket noi CSDL that bai");
	}
	
	
}

function sign(){
	$.mobile.changePage("#page3", {
		reverse : false,
		transition : "slide"
	});
}

function danhs(){
	$.mobile.changePage("#page2", {
		reverse : false,
		transition : "slide"
	});
}


function waitingTimeDemo(){
	navigator.notification.alert("Load success", null, "Title", "All done");
	waitingTime.show();
	setTimeout(function(){ waitingTime.hide();}, 2000);
	return false;
}
function formattedDate(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('/');
}

function danhsach() {
	$.mobile.changePage("#page3", {
		reverse : false,
		transition : "slide"
	});
	DSSV();
}



function DSSV(){
	var invocationData = {
		adapter: 'MySqlAdapter',
        procedure : "DS",
        parameters : []
	};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadDSSVSuccess, //success callback
		onFailure : loadDSSVFailure // failure callback
	});
	function loadDSSVSuccess(result){
		var soLuongKetQua = result.invocationResult.resultSet.length;
		var tableds = $("#dssv");
		
		if(soLuongKetQua > 0){
			var items = result.invocationResult.resultSet;
			var text = "";
			for(i = 0; i<items.length; i++){
				text +="<tr>"+
					   "<th>"+items[i].id+"</th>"+
					   "<td>"+items[i].name+"</td>"+
					   "<td>"+items[i].maso+"</td>"+
					   "<td>"+items[i].gender+"</td>"+
					   "<td>" +  formattedDate(items[i].birth)  + "</td>" +
					   "<td>"+items[i].nganh+"</td>"+
					   "<td>"+'<input type="button" onclick="deleteSv('+items[i].id+')" value="Xóa" idsinhvien = "'+items[i].id+'" />'+"</td>"
					   "</tr>";
			}
			
//			var scriptStr = "<script>" +
//	        "$(document).ready(function(){" +
//	        "$('input').click(function(){" +
//	        " var idSv = $(this).attr('idsinhvien');" +
//	        "deleteSv(idSv);" +
//	        "});" +
//	        "});" +
//	        "</script>";
			
			tableds.html(text);
		}
		
	}

	function loadDSSVFailure(result){
		alert("Ket noi CSDL that bai");
	}
}

function insertSv(){
	var name = $("#username").val();
	var maso = $("#maso").val();
	var gender = $("#gender").val();
	var birth = $("#birth").val();
	var nganh = $("#nganh").val();
	var pass = $("#psw").val();
	var invocationData = {
			adapter: 'MySqlAdapter',
	        procedure : "Themsv",
	        parameters : [name, maso, gender, birth, nganh, pass]
		};
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : themSvSuccess, //success callback
		onFailure : themSvFailure // failure callback
	});
	function themSvSuccess(result){
		alert("Them sinh vien thanh cong")
		DSSV();
	}
	function themSvFailure(result){
		alert("Them sinh vien that bai");
	}
}

function deleteSv(idSv){
	var invocationData = {
			adapter: 'MySqlAdapter',
	        procedure : "Xoasv",
	        parameters : [idSv]
		};
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : xoaSvSuccess, //success callback
		onFailure : xoaSvFailure // failure callback
	});
	function xoaSvSuccess(result){
		alert("Xoa sinh vien thanh cong");
		DSSV();
	}
	function xoaSvFailure(result){
		alert("Xoa sinh vien that bai");
	}
}
