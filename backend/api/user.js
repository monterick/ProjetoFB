
module.exports = app=>{
const bcrypt = require('bcrypt-nodejs')
const {existsOrError,notExistsOrError,equalsOrError} = app.api.validation

    const save = async (req,res)=>{
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id


        const encryptPassword = password=>{
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(password,salt)
        }


        try{
            existsOrError(user.nome,'Nome não preenchido')
            existsOrError(user.cpf,'Cpf não preenchido')
            existsOrError(user.endereco,'Endereço não preenchido')
            existsOrError(user.password,'Senha não preenchida')
            existsOrError(user.confirmPassword,'Validação não preenchida')
            equalsOrError(user.password,user.confirmPassword,'Senhas não conferem')
        }catch(msg){
            return res.status(400).send(msg)
        }
        user.password = encryptPassword(user.password)
        delete user.confirmPassword
    }
    const get = (req,res)=>{
        res.send('User Get')
    }
    const getById = (req,res)=>{
        res.send('User GetById')
    }
    return {save,get,getById}
}