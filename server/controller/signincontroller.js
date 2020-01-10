const Usermodel = require('../model/Usermodel')
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')


class Signin{
    static login (req,res,next){
        let temporary = null
        const client = new OAuth2Client(process.env.TOKENGOOGLE);
        async function verify() {
        const ticket = await client.verifyIdToken({
        idToken: req.body.idtoken,
        audience: process.env.TOKENGOOGLE,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        temporary = payload
        return payload
        }
        verify()
        .then((data)=>{
            return Usermodel.findOne({
                email: data.email
            })
        })
        .then((data)=>{
            if(data === null){
                return Usermodel.create({
                    first_name: temporary.given_name,
                    last_name: temporary.family_name,
                    email: temporary.email,
                    password: process.env.GENERATEPASS
                })
            }
            return temporary
        })
        .then((data)=>{
            // let payload = {
            //     first_name: data.given_name,
            //     last_name: data.family_name,
            //     email: data.email
            // }
            const payload = {userId: data._id}
            let token = jwt.sign(payload,process.env.JWT_SECRET)
            console.log(token)
            res.status(200).json({token})
        })
        .catch((err)=>{
            next(err)
        });

    }

}

module.exports = Signin