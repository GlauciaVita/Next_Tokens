const jwt = require("jsonwebtoken");

const SECRET_KEY = "geradordetokenteste";

const nossoToken = jwt.sign(
    { name: "Aline", admin: true },
    SECRET_KEY,
    { subject: "1" },
    { expiresIn: "1y" }
);

const TOKEN_GERADO = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpbmUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzAxNzAxNDkxLCJzdWIiOiIxIn0.SrKmCj80GTb9TNsQmRd6kSIhoKqCGj2K_r9Yvr3H2sQ"

// console.log(nossoToken);
// // console.log(jwt.verify(TOKEN_GERADO, SECRET_KEY));
// console.log(jwt.decode(TOKEN_GERADO));