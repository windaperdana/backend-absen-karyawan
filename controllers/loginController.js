const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../config/dbConnection').promise();


exports.login_karyawan = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const [row] = await conn.execute(
            "SELECT * FROM tb_karyawan WHERE email = ? ",
            [req.body.email]
        );
        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        } else {
            // PROSES UPLOAD FOTO
            const nameFile = req.files.file.name.split(".");
                    nameFile[0] = row[0].nik+"."+nameFile[1];
            if(req.files.file.mimetype == "image/jpeg" || req.files.file.mimetype == "image/png"|| req.files.file.mimetype == "image/gif" ){
                req.files.file.mv('public/images/'+nameFile[0] , async (reqs, ress) =>  {
                    console.log("======>",reqs)
                    var tempNmFile = nameFile[0];
                    console.log("NAMA FILE BARU ===>", tempNmFile);
                    const [rowsInsertLoginKaryawan] = await conn.execute('INSERT INTO tb_login_karyawan(nik,email,date_login,img) VALUES(?,?,NOW(),?)',[
                        row[0].nik,
                        req.body.email,
                        tempNmFile
                    ]);
                    console.log("SUCCESS INSERT LOGIN KARYAWAN ==>",rowsInsertLoginKaryawan);
                    if (rowsInsertLoginKaryawan.affectedRows === 1) {
                        const [rowsUpdateLoginKaryawan] = await conn.execute('UPDATE tb_karyawan SET status_login = 1 WHERE email = ? and nik = ?',[
                            row[0].email,
                            row[0].nik
                        ]);
                        console.log("SUCCESS INSERT UPDATE LOGIN KARYAWAN ==>",rowsUpdateLoginKaryawan);
                    }
                    const passMatch = await bcrypt.compare(req.body.password.toString(), row[0].password);
                    if(!passMatch){
                        return res.status(422).json({
                            message: "Incorrect password",
                        });
                    }

                    const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '2d' });

                    return res.json({
                        nik:row[0].nik,
                        email:row[0].email,
                        nama:row[0].nama_karyawan,
                        role_login:row[0].role_login,
                        token:theToken
                    });
                })
            } else {
                console.log("FORMAT SALAH")
                return res.status(422).json({
                    message: "This format file is not allowed , please upload file with '.png','.gif','.jpg'",
                });
            }
        }
    }
    catch(err){
        next(err);
    }
}

exports.login_admin = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const [row] = await conn.execute(
            "SELECT * FROM tb_user WHERE email = ? ",
            [req.body.email]
        );
        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        } else {
            const passMatch = await bcrypt.compare(req.body.password.toString(), row[0].password);
            if(!passMatch){
                return res.status(422).json({
                    message: "Incorrect password",
                });
            }

            const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '2d' });

            return res.json({
                nama:row[0].name,
                email:row[0].email,
                token_admin:theToken
            });
        }
    }
    catch(err){
        next(err);
    }
}