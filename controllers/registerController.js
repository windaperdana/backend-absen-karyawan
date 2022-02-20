const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../config/dbConnection').promise();

exports.register_karyawan = async(req,res,next) => {
    console.log("REQ ==>",req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const [row] = await conn.execute(
            "SELECT email FROM tb_karyawan WHERE email = ? and nik = ?",
            [req.body.email, req.body.nik]
        );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        var tempNik = req.body.nik.toString();
        const hashPass = await bcrypt.hash(tempNik, 12);
        const [rows] = await conn.execute('INSERT INTO tb_karyawan(nik,nama_karyawan,email,no_tlp,password,status_karyawan,role_login,date_join,status_login) VALUES(?,?,?,?,?,0,?,NOW(),0)',[
            req.body.nik,
            req.body.nama_karyawan,
            req.body.email,
            req.body.no_tlp,
            hashPass,
            req.body.role_login
        ]);
        console.log("SUCCESS INSERT KARYAWAN ==>",rows);
        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        console.log("ERRR ==>",err);
        next(err);
    }
}
