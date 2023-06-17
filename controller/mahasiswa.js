const model = require("../config/model/index");

const controller = {};

const getAll = async (req, res) => {
  try {
    const mahasiswa = await model.mahasiswa.findAll();
    if (mahasiswa.length > 0) {
      res.send({
        message: "Get Method mahasiswa berhasil",
        data: mahasiswa,
      });
    } else {
      res.send({
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    res.send({
      message: "Erorr Bro",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const mahasiswa = await model.mahasiswa.findAll({
      where: {
        nim: req.params.nim,
      },
    });

    if (mahasiswa.length > 0) {
      console.log(mahasiswa[0].dataValues.nama);

      res.send({
        message: `berhasil dapat data atas nama = ${mahasiswa[0].dataValues.nama} , dan nim = ${mahasiswa[0].dataValues.nim} `,
        data: mahasiswa,
      });
    } else {
      res.send({
        message: "Data mahasiswa tidak ditemukan",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const postMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await model.mahasiswa.create({
      nim: req.body.nim,
      nama: req.body.nama,
      jurusan: req.body.jurusan,
      foto: req.file.path,
    });
    res.send({
      message: `Berhasil tambah mahasiswa dengan nama ${mahasiswa.nama}`,
      data: mahasiswa,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const putMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await model.mahasiswa.update(
      {
        nama: req.body.nama,
        jurusan: req.body.jurusan,
      },
      {
        where: {
          nim: req.params.nim,
        },
      }
    );

    res.send({
      message: `Berhasil ubah data mahasiswa ${req.body.nama} `,
      data: mahasiswa,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const deleteMahasiswa = async (req, res) => {
  try {
    // cari dulu satu nama sesuai dengan nim
    // karena dari variable mahasiswa nnti membawa dataValues
    const mahasiswa = await model.mahasiswa.findOne({
      where: {
        nim: req.params.nim,
      },
    });

    if (mahasiswa) {
      const namaData = mahasiswa.nama; // untuk ambil data yg ada di sql
      await mahasiswa.destroy(); // untuk hapus data

      res.send({
        message: `Berhasil hapus data mahasiswa dengan nama ${namaData}`,
      });
    } else {
      res.send({
        message: `Gagal menemukan data dari nim ${req.params.nim}`,
      });
    }
  } catch (error) {
    res.send({
      message: "Terjadi kesalaha saat menghapus data",
    });
  }
};

// const deleteMahasiswa = async (req, res) => {
//   try {
//     const mahasiswa = await model.mahasiswa.destroy({
//       where: {
//         nim: req.params.nim,
//       },
//     });
//     console.log(res);
//     res.send({
//       message: `Berhasil hapus data mahasiswa dengan nim ${req.params.nim} `,
//       data: mahasiswa,
//     });
//   } catch (error) {
//     res.send({
//       message: "error bro",
//     });
//   }
// };
module.exports = {
  getAll,
  getOne,
  postMahasiswa,
  putMahasiswa,
  deleteMahasiswa,
};
