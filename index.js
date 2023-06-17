const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// EXPORT Routers
const mahasiswaRoutes = require("./routes/mahasiswa");
const biodataRoutes = require("./routes/biodata");
const kampusRoutes = require("./routes/kampus");
const loginRoutes = require("./routes/authehtification");
const authBiodataRoutes = require("./routes/authBiodataRoutes");
const tentara = require("./routes/tentara");

app.use(morgan("dev")); // untuk mengetahui pakai method apa

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 3000;

app.use("/mahasiswa", mahasiswaRoutes);
app.use("/biodata", biodataRoutes);
app.use("/kampus", kampusRoutes);
app.use("/login", loginRoutes);
app.use("/authBiodata", authBiodataRoutes);
app.use("/tentara", tentara);

//jika foto not found
app.use("/assetsBiodata", express.static("assetsBiodata"));
app.use("/assets", express.static("assets"));

// Membuat error Handling
app.use((req, res, next) => {
  const error = new Error("Tidak ditemukan");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      messagae: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running in PORT ${PORT}`);
});
