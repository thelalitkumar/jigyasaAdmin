import express from "express";
import { addQuesController, deleteQuesByIdController, editQuesByIdController, getQuesByIdController, getQuesController } from "../controller/quesController.js";
import {  login,  signup } from "../controller/usersController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router=express.Router();
router.post('/signup',signup);
router.post('/login',login);

router.post('/add',requireAuth , addQuesController);
router.get('/all',requireAuth , getQuesController);
router.get('/:id',requireAuth , getQuesByIdController);
router.put('/:id',requireAuth , editQuesByIdController);
router.delete('/:id',requireAuth , deleteQuesByIdController);

export default router;