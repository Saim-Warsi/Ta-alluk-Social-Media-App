export const protect = async (req,res,next)=>{
    try{
        const {userId} = await req.auth();
        if(!userId) {
            return res.json({success: false,
                message: "Not authenticated"

            })
        }
        next()
    } catch(err){
        return res.json({success: false,
            message: err.message

        })
    }
}
// export const protect = async (req, res, next) => {
//     try {
//         // Check if req.auth exists first
//         if (!req.auth) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Authentication middleware not configured"
//             });
//         }

//         const { userId } = await req.auth();
        
//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Not authenticated"
//             });
//         }
        
//         next();
//     } catch(err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message
//         });
//     }
// }