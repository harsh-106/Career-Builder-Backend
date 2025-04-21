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

        const { userId } = jwt.verify(token, process.env.SECRET_KEY);
        req.id = userId;

        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({
            message: "Authentication failed. Invalid or expired token.",
            success: false,
        });
    }
};

export default isAuthenticated;
