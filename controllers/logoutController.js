const {validationResult} = require('express-validator');
const conn = require('../config/dbConnection').promise();


exports.logout_karyawan = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const [rowLoginKaryawan] = await conn.execute(
            "SELECT * FROM tb_login_karyawan where email = ? order by date_login desc limit 1",
            [req.body.email]
        );

        if (rowLoginKaryawan.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        } else {
            const [rowsLogOutKaryawan] = await conn.execute('UPDATE tb_karyawan SET status_login = 0 WHERE email = ? ',[
                req.body.email
            ]);
            console.log("SUCCESS LOGOUT KARYAWAN ==>",rowsLogOutKaryawan);
            if (rowsLogOutKaryawan.affectedRows === 1) {
                const [rowsUpdateLoginKaryawan] = await conn.execute('UPDATE tb_login_karyawan SET date_logout = NOW() WHERE email = ? and nik = ? and date_login = ?',[
                    rowLoginKaryawan[0].email,
                    rowLoginKaryawan[0].nik,
                    rowLoginKaryawan[0].date_login
                ]);
                console.log("SUCCESS INSERT UPDATE LOGIN KARYAWAN ==>",rowsUpdateLoginKaryawan);
                return res.status(201).json({
                    message: "The user has been Logout.",
                });
            }   
        }
    }
    catch(err){
        next(err);
    }
}