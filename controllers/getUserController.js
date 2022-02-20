const jwt = require('jsonwebtoken');
const conn = require('../config/dbConnection').promise();

exports.getUser = async (req,res,next) => {

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const [row] = await conn.execute(
            "SELECT a.*, b.date_login  FROM tb_karyawan a join tb_login_karyawan b on b.nik = a.nik and b.email = a.email  WHERE a.id=? order by b.date_login desc limit 1",
            [decoded.id]
        );

        if(row.length > 0){
            return res.json(row[0]);
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}