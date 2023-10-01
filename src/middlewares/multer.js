import multer from 'multer'

const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const { docType } = req.params;
        cb(null, `./src/public/${docType}`)
    },
    filename: (req, file, cb) =>{
        const fileOriginalName = file.originalname.replace(/\s+/g, '')
        cb(null, formattedDate + `-user-` + fileOriginalName)
    },
})

const prodsStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, `./src/public/products`)
    },
    filename: (req, file, cb) =>{
        const prod = JSON.parse(req.body.prodData)
        const fileExtension = file.originalname.split('.').pop();
        cb(null, formattedDate + '-prod-' + prod.title.replace(/\s+/g, '') + '.' + fileExtension)
    }
})

export const upload = multer({storage: storage})
export const uploadProd = multer({storage: prodsStorage})