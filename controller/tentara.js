const model = require("../config/model/index");
const { Op } = require("sequelize");

const getDataTentara = async (req, res) => {
  const nama = req.body.nama;
  const usia = req.body.usia;
  try {
    const tentara = await model.tentara.findAll({
      attributes: ["nip", "nama", "usia", "matra", "pangkat", "foto"],
      // where: {
      //   [Op.and]: [{ nama: nama }, { usia: usia }],
      // },
      // where: {
      //   usia: {
      //     [Op.between]: [20, 27],
      //   },
      // },
      // order: [["usia", "asc"]],
      include: [{ model: model.kantorTni }],
    });

    if (tentara.length > 0) {
      res.send({
        message: "Berhasil mendapatkan data",
        data: tentara,
      });
    } else {
      res.send({
        message: "Data Kosong",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const getOneTentara = async (req, res) => {
  try {
    const tentara = await model.tentara.findAll({
      where: {
        nip: req.params.nip,
      },
    });

    if (tentara.length > 0) {
      res.send({
        message: `Berhasil dapat data atas nama = ${tentara[0].dataValues.nama}`,
        data: tentara,
      });
    } else {
      res.send({
        message: error.message,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const postTentara = async (req, res) => {
  try {
    const tentara = await model.tentara.create({
      nip: req.body.nip,
      nama: req.body.nama,
      usia: req.body.usia,
      matra: req.body.matra,
      pangkat: req.body.pangkat,
      foto: req.file.path,
    });

    res.send({
      message: `Berhasil tambah biodata Anggot dengan nama : ${tentara.nama}`,
      data: tentara,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const putTentara = async (req, res) => {
  try {
    const tentara = await model.tentara.update(
      {
        nip: req.body.nip,
        nama: req.body.nama,
        usia: req.body.usia,
        matra: req.body.matra,
        pangkat: req.body.pangkat,
      },
      {
        where: {
          nip: req.params.nip,
        },
      }
    );

    res.send({
      message: `Berhasil ubah data kampus dengan nama ${req.body.nama}`,
      data: tentara,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const deleteTentara = async (req, res) => {
  try {
    const tentara = await model.tentara.findOne({
      where: {
        nip: req.params.nip,
      },
    });

    if (tentara) {
      const namaPrajurit = tentara.nama;
      await tentara.destroy();

      res.send({
        message: `berhasil menghapus nama prajurit ${namaPrajurit}`,
      });
    } else {
      res.send({
        message: `gagal menemukan data dari nip ${req.params.nip}`,
      });
    }
  } catch (error) {
    res.send({
      message: "gagal",
    });
  }
};

module.exports = {
  getDataTentara,
  getOneTentara,
  postTentara,
  putTentara,
  deleteTentara,
};
