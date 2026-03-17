/*
import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { userManager } from "../managers/UserManager.js";
import { userValidator } from "../middlewares/user-validator.js";
const router = Router()

router.post('/', userValidator, (req, res)=>{
    const response = userManager.create(req.body)
    res.json(response)
})

router.get('/', (req, res)=>{
    throw new Error('Error al obtener los usuarios')
})

router.post('/profile', upload.single("image"), (req, res)=>{
    const response = userManager.create({...req.body, image: req.file.path})
    res.json(response)
})

router.get('/:id', (req, res)=>{
    try {
        const { id } = req.params
        const response = userManager.getById(id)    //{ message, name, stack }
        res.json(response)
    } catch (error) {
        res.status(404).json({ message: error.message })    //{ message, name, stack }
    }
})


export default router;
*/