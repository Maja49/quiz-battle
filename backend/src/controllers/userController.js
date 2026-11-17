const registerUser = (req, res) => {
    const {username, password} = req.body
    
    res.json({
        message: 'Register controller reached',
        receivedData: {
            username,
            password
        }
    })
}

const loginUser = (req, res) => {
    const{username, password} = req.body

        res.json({
            message:'Login controller reached',
            receivedData: {
                username,
                password
            } 
        })
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