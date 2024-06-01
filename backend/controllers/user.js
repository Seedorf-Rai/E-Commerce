const { userSchema, userValidSchema } = require("../zodSchema/userSchema");
const User = require('../models/user')
const { matchPasswordandGenerateToken } = require('../models/user')



module.exports.SignupUser = async (req, res) => {
  //Created an object for checking if the data is valid or not
  const { username, email, password } = req.body;
  const data = {
    username,
    email,
    password,
  };
  //checking the input type of the given data
  let validation = userSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).json("validation error");
  }
  //check if user exist
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json('User existing');
  }
  await User.create({
    username,
    email,
    password
  });
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);
    return res.cookie("token", token).json( {"token" : token} )
  } catch (error) {
    console.log(error)
  }
};


module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email,
    password
  }
  const validation = userValidSchema.safeParse(data);
  if (!validation.success) {
    console.log(validation.error)
    return res.status(400).json({error : validation.error});
  }
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);
    console.log(token);
    return res.cookie("token", token).json( {"token" : token} )
  } catch (error) {
    console.log(error)
    return res.json({error : error});
  }
}

module.exports.logout = (req, res) => {
  try {
    const token = req.cookies.token;
    res.status(200).clearCookie("token").json("Successfully logout");
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
