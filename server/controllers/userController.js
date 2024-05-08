const bcrypt = require('bcrypt')
const User = require("../models/User")

const getAllUsers = async(req,res)=>{
    const user = await User.find().lean()
    if(!user?.length){
        return res.json([])
    }
    res.json(user)
}


const createNewUser = async(req,res)=>{
    const {name, userName, password, email, role} = req.body
    if(!name || !userName || !password){
        return res.status(400).json({message:'fields name, userName and password are required'})
    }

    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate userName" })
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const newUser = await User.create({name, userName, password:hashedPwd, email, role})
    if(newUser){
        return res.json(newUser)
    }
    res.status(400).json({ message: 'Failed to create new user' }) 
}


const updateUser = async(req,res)=>{
    const {_id} = req.params
    const { name, userName, password, email} = req.body

    if(!_id || !name || !userName || !password){
        return res.status(400).json({message:'fields id, name, userName and password are required'})
    }

    const updUser = await User.findById(_id)
    if(!updUser){
        res.status(400).json({message:'User not found'})
    }

    updUser.name = name
    updUser.userName = userName
    updUser.password = password
    updUser.email = email

    const theUpdateUser = await updUser.save()

    res.json(`${theUpdateUser.userName} updated`)
}


const deleteUser = async(req,res)=>{
    const {_id} = req.params
    const delUser = await User.findById(_id)

    if(!delUser){
        return res.status(400).json({message:'User not found'})
    }

    const del = await delUser.deleteOne()

    res.json(del)
}


module.exports = {getAllUsers, createNewUser, updateUser, deleteUser}