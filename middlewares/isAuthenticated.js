// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             })
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:"Invalid token",
//                 success:false
//             })
//         };
//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }
// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            });
        }

        req.user = { id: decoded.userId }; // Attach user info to request
        next();

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
