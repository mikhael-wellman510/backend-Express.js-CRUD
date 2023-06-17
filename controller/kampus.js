const model = require("../config/model/index");
const { Op } = require("sequelize");

const getKampus = async (req, res) => {
  try {
    const kampus = await model.kampus.findAll({
      attributes: ["nim", "nama", "kd_jurusan", "alamat", "angkatan"],

      // ================== OP AND =======================
      // data nya harus dapat nama dan kd jurusan
      // where: {
      //   [Op.and]: [{ nama: "Zakaria" }, { kd_jurusan: "mm" }],
      // },

      // ==================== OP OR ==========================
      // Op.or mencari data kd jurusan dan alamat . lalu tampil semua
      // where: {
      //   [Op.or]: [{ kd_jurusan: "dg" }, { alamat: "bogor" }],
      // },

      // ==================== NESTED OP OR =====================
      // where: {
      //   kd_jurusan: {
      //     [Op.or]: ["dg", "anm"],
      //   },
      // },

      // ===================== OP BETWEEN dan ORDER  ========================
      // diantara ... sampai ...
      // where: {
      //   angkatan: {
      //     [Op.between]: [2017, 2018],
      //   },
      // },
      // order: [["angkatan", "asc"]],
      // limit: 2,
    });

    if (kampus.length > 0) {
      console.log(kampus);
      res.send({
        message: `Berhasil mendapatkan semua data mahasiswa kampus`,
        data: kampus,
      });
    } else {
      res.send({
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

const getSearch = async (req, res) => {
  const search = req.query.keyword;
  try {
    const kampus = await model.kampus.findAll({
      attributes: ["nim", "nama", "kd_jurusan", "alamat", "angkatan"],
      where: {
        [Op.or]: [
          {
            nim: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            nama: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    console.log(kampus);
    if (kampus.length > 0) {
      res.send({
        message: `Berhasil mendapatkan  data mahasiswa kampus`,
        data: kampus,
      });
    } else {
      res.send({
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

const getOneKampus = async (req, res) => {
  try {
    const kampus = await model.kampus.findAll({
      where: {
        nim: req.params.nim,
      },
    });

    if (kampus.length > 0) {
      res.send({
        message: `Berhasil mendapatkan data mahasiswa ${req.params.nim}`,
        data: kampus,
      });
    } else {
      res.send({
        message: "Data kampus tidak ditemukan",
      });
    }
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

const postKampus = async (req, res) => {
  console.log(req.file);
  try {
    const kampus = await model.kampus.create({
      nim: req.body.nim,
      nama: req.body.nama,
      kd_jurusan: req.body.kd_jurusan,
      alamat: req.body.alamat,
      angkatan: req.body.angkatan,
      foto: req.file.path,
    });

    res.send({
      message: `sukses menambakan nama mahasiswa : ${req.body.nama}`,
      data: kampus,
    });
  } catch (error) {
    res.send({
      message: "Error Bos",
    });
  }
};

const putKampus = async (req, res) => {
  try {
    const kampus = await model.kampus.update(
      {
        nama: req.body.nama,
        kd_jurusan: req.body.kd_jurusan,
        alamat: req.body.alamat,
        angkatan: req.body.angkatan,
      },
      {
        where: {
          nim: req.params.nim,
        },
      }
    );

    res.send({
      message: `Berhasil ubah data kampus mahasiswa ${req.body.nama}`,
      data: kampus,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const deleteKampus = async (req, res) => {
  try {
    const kampus = await model.kampus.findOne({
      where: {
        nim: req.params.nim,
      },
    });

    if (kampus) {
      const namaKampus = kampus.nama;
      await kampus.destroy();

      res.send({
        message: `Berhasil hapus data mahasiswa dengan nama ${namaKampus}`,
      });
    } else {
      res.send({
        message: `Gagal menemukan data dari nim ${req.params.nim}`,
      });
    }
  } catch (error) {
    res.send({
      message: `Gagal`,
    });
  }
};

module.exports = {
  getKampus,
  getOneKampus,
  postKampus,
  putKampus,
  deleteKampus,
  getSearch,
};
