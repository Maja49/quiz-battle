const bcrypt = require('bcryptjs')
const { db } = require('../config/db')

const registerUser = async (req, res) => {
    const{username, password} = req.body

    if(!username || !password) {
        return res.status(400).json({message: 'Username and password are required'})
    }

    try{
        const passwordHash = await bcrypt.hash(password, 10)

        const [result] = await db.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, passwordHash]
        )

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
        })
    } catch(error){
        if(error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({message: 'Username already taken'})
        }
        console.error('Register error: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({message: 'Username and password are required'})
    }

    try{
        const [rows] = await db.query(
            'SELECT id, username, password FROM users WHERE username = ?',  [username]
        )
        
        if(rows.length === 0){
            return res.status(401).json({message: 'Invalid username or password'})
        }

        const user = rows[0]
        const passwordMatches = await bcrypt.compare(password, user.password)
    
        if (!passwordMatches){
            return res.status(401).json({message: 'Invalid username or password'})
        }

        res.json({
            message: 'Login successful',
            user: {id: user.id, username: user.username}
        })
    } catch (error){
        console.error('Login error: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

const getUserById = (req, res) => {
    const {id} = req.params

    res.json({
        message: 'Get user controller reached',
        userId: id
    })
}

module.exports ={
    registerUser,
    loginUser,
    getUserById
}