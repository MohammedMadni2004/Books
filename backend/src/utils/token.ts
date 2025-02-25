import jwt from "jsonwebtoken";
export function generateToken(userId: string): string {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "365d" });
}
