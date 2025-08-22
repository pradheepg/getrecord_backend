import jwt, { JwtPayload } from "jsonwebtoken";

interface AdminJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export const verifyAdminToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET!);


    if (typeof decoded !== "object" || !("id" in decoded) || !("role" in decoded)) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.admin = decoded as AdminJwtPayload; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
