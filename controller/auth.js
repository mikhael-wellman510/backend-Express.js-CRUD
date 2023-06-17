const model = require("../config/model/index");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const auth = await model.usermodel.create({
      username: username,
      password: hashedPassword,
      email: email,
    });
    console.log(password);
    res.send({
      message: "Berhasil mendaftar",
      data: auth,
    });
  } catch (error) {
    res.send({
      message: "Error Boss ku",
    });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const ceklogin = await model.usermodel.findOne({
      where: {
        username: username,
      },
    });

    if (!ceklogin) {
      res.send({
        message: "Username tidak terdaftar",
      });
    } else {
      const resultLogin = bcrypt.compareSync(password, ceklogin.password);

      if (!resultLogin) {
        res.send({
          message: "username atau password salah",
        });
      } else {
        res.send({
          message: "Username terdaftar",
          data: ceklogin.password,
        });
      }
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};
module.exports = {
  register,
  login,
};
