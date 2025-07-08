import jwt from "jsonwebtoken";

export function generateToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d", // Token will expire in 30 days
    }
  );
  return token;
}
