import redis from "../../shared/redis"

const protect = async (req, res, next) => {
    try {
        const sessionId = req.Cookies?.session
        if (!sessionId){
           return res.status(400).json({message:"Uauthorized"})
        }
       const session =  await redis.get(`session-${sessionId}`)
       if (!session){
        return res.status(500).json({message:"Session expired. Login again"})
       }
       req.user = JSON.parse(session)
       next()
    } catch (error) {
        return res.status(500).json({message:`Protect error ${error}`})
    }
}

export default protect