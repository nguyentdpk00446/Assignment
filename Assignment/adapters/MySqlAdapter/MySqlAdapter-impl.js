/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
var cauTruyVanDangNhap = WL.Server.createSQLStatement("select * from tb_user where name = ? and pass = ?");
function DangNhap(ten, matkhau) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : cauTruyVanDangNhap,
		parameters : [ten, matkhau] 
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}

var procedureDS = WL.Server.createSQLStatement("select * from tb_user ");
function DS() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedureDS,
		parameters : [] 
	});
}

var cauTruyVanThemsv = WL.Server.createSQLStatement("INSERT INTO tb_user(name, maso, gender, birth, nganh, pass) VALUES (?,?,?,?,?,?)");
function Themsv(name, maso, gender, birth, nganh, pass) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : cauTruyVanThemsv,
		parameters : [name, maso, gender, birth, nganh, pass] 
	});
}

var cauTruyVanXoasv = WL.Server.createSQLStatement("DELETE FROM tb_user WHERE id = ? ");
function Xoasv(idsinhvien){
	return WL.Server.invokeSQLStatement({
		preparedStatement : cauTruyVanXoasv,
		parameters : [idsinhvien] 
	});
}


