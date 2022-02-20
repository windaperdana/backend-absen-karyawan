const conn = require('../config/dbConnection').promise();

exports.getKaryawan = async (req,res,next) => {

    try{

        const [row] = await conn.execute(
            "SELECT * FROM tb_karyawan"
        );

        if(row.length > 0){
            return res.json({
                listkaryawan:row
            });
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}