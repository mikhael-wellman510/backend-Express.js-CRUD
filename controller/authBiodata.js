const model = require("../config/model/index");

const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const getData = await model.authBiodata.findOne({
      where: {
        username: username,
      },
    });
    if (!getData) {
      res.send({
        message: "Username tidak terdaftar",
      });
    } else {
      const hasilLogin = bcrypt.compareSync(password, getData.password);
      console.log(hasilLogin);
      //   console.log(password);

      if (!hasilLogin) {
        res.send({
          message: "Username atau password salah",
        });
      } else {
        res.send({
          message: "password betul",
          data: `passwordnya adalah ${getData.password}`,
        });
      }
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const authBiodata = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  try {
    const tambahAkun = await model.authBiodata.create({
      username: username,
      password: hashedPassword,
      email: email,
    });
    console.log(tambahAkun);
    res.send({
      message: "Berhasil membuat akun",
      data: tambahAkun,
    });
  } catch (error) {
    res.send({
      message: "Error bos !!!",
      error: error.message,
    });
  }
};

module.exports = {
  authBiodata,
  login,
};
