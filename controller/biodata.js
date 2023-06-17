const model = require("../config/model/index");
const { Op } = require("sequelize");

const getAllBiodata = async (req, res) => {
  try {
    const biodata = await model.biodata.findAll({
      attributes: ["nip", "nama", "alamat", "umur", "pekerjaan", "status"],
      // =============== OP AND ==============

      // where: {
      //   [Op.and]: [{ nama: "reyhan" }, { pekerjaan: "pns" }],
      // },

      // ================= OP OR ========================
      // where: {
      //   pekerjaan: {
      //     [Op.or]: ["pns", "bumn"],
      //   },
      // },

      // ================== NESTED OP OR =================
      // where: {
      //   nip: {
      //     [Op.between]: [24, 27],
      //   },
      // },
      include: [
        {
          model: model.kantor,
        },
      ],
    });

    if (biodata.length > 0) {
      console.log(biodata);
      res.send({
        message: `Berhasil mendapatkan data dengan Jumlah ${biodata.length}`,
        data: biodata,
      });
    } else {
      res.send({
        message: "Data Tidak ditemukan ",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const getSearchBiodata = async (req, res) => {
  const search = req.query.keyword;
  try {
    const biodata = await model.biodata.findAll({
      attributes: ["nip", "nama", "alamat", "umur", "pekerjaan", "status"],
      where: {
        [Op.or]: [
          {
            nama: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            nip: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    console.log("Ini dia", biodata);
    if (biodata.length > 0) {
      res.send({
        message: `Berhasil mendapatkan ${biodata.length} Nama`,
        data: biodata,
      });
    } else {
      res.send({
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const getOneBiodata = async (req, res) => {
  try {
    const biodata = await model.biodata.findAll({
      where: {
        nip: req.params.nip,
      },
    });

    if (biodata.length > 0) {
      // console.log(biodata[0].dataValues.nama);

      res.send({
        message: `Berhasil dapat data atas nama = ${biodata[0].dataValues.nama}`,
        data: biodata,
      });
    } else
      res.send({
        message: "biodata Tidak ditemukan",
      });
  } catch (error) {
    res.send({
      message: "Ada yg Error",
    });
  }
};

const postBiodata = async (req, res) => {
  try {
    const biodata = await model.biodata.create({
      nip: req.body.nip,
      nama: req.body.nama,
      alamat: req.body.alamat,
      umur: req.body.umur,
      pekerjaan: req.body.pekerjaan,
      status: req.body.status,
      foto: req.file.path,
    });
    res.send({
      message: `Berhasil tambah biodata Karyawan dengan nama ${biodata.nama}`,
      data: biodata,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const putBiodata = async (req, res) => {
  try {
    const biodata = await model.biodata.update(
      {
        nama: req.body.nama,
        alamat: req.body.alamat,
        umur: req.body.umur,
        pekerjaan: req.body.pekerjaan,
        status: req.body.status,
      },
      {
        where: {
          nip: req.params.nip,
        },
      }
    );

    res.send({
      message: `Berhasil Update Biodata ${biodata.nama}`,
      data: biodata,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const deleteBiodata = async (req, res) => {
  try {
    const biodata = await model.biodata.findOne({
      where: {
        nip: req.params.nip,
      },
    });

    if (biodata) {
      const namaBiodata = biodata.nama;
      await biodata.destroy();

      res.send({
        message: `berhasil menghapus data karyawan dengan nama ${namaBiodata}`,
      });
    } else {
      res.send({
        message: `Gagal menemukan data dari nim ${biodata.nim}`,
      });
    }
  } catch (err) {
    res.send({
      message: `Terjasi kesalahan saat menghapus data`,
    });
  }
};

module.exports = {
  getAllBiodata,
  getOneBiodata,
  postBiodata,
  putBiodata,
  deleteBiodata,
  getSearchBiodata,
};
