import express from 'express';
import { Router } from 'express';
const router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get

export default router
