const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const formidable = require('formidable');

const PORT = 2400;
const UPLOAD_DIR = path.join(__dirname, 'public/uploads');
const app = express();

// cors setup
app.options('*', cors());

// logging
app.use(morgan('combined'));

// use ejs for frontend
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));

// main routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit-form', (req, res, next) => {
    var namafile
    // preparasi variabel untuk menangkap form field
    var nama
    var alamat
    var kegiatan
    var acara
    var hari
    var pasaran
    var tanggal
    var pukul
    var keterangan
    var tempat
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            // pointing masing2 form field ke variabel di baris 25
            if (name == "nama") { nama = field; }
            if (name == "alamat") { alamat = field; }
            if (name == "kegiatan") { kegiatan = field; }
            if (name == "acara") { acara = field; }
            if (name == "hari") { hari = field; }
            if (name == "pasaran") { pasaran = field; }
            if (name == "tanggal") { tanggal = field; }
            if (name == "pukul") { pukul = field; }
            if (name == "keterangan") { keterangan = field; }
            if (name == "tempat") { tempat = field; }
        })
        .on('fileBegin', (name, file) => {
            var fileExt = file.name.split('.').pop();
            namasekarang = jenis_struk + " - " + nama_struk + "." + fileExt;
            file.path = path.join(UPLOAD_DIR, namasekarang)
            // file.path = path.join(UPLOAD_DIR, file.name)
        })
        .on('file', (name, file) => {
            namafile = `/public/uploads/${namasekarang}`
            console.log(`${new Date()} new file ${name} received!`)
        })
        .on('error', (err) => {
            console.error(err)
            next(err)
            return
        })
        .on('end', () => {
            // ketika data sudah ter-upload, tampilkan halaman cetak.ejs beserta data yang
            // ingin ditampilkan
            res.render('cetak', { 'data': {
                  'bukti': namafile,
                  nama,
                  alamat,
                  kegiatan,
                  acara,
                  hari,
                  pasaran,
                  tanggal,
                  pukul,
                  keterangan,
                  tempat
                //   id_struk 
                }
            });
        });

});

// application entrypoint
app.listen(PORT, () => {
    console.log(`application start on  :${PORT}`);
});

