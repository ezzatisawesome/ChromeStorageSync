import express from 'express';
import { Router } from 'express';
const router = Router()
import { c1col } from '../app.js'


router.get('/', async (req, res, next) => {
  //{ selector: '{"a":1}', limit: 10, sort: '["b"]', client: "clientid" }

  const selector = req.selector;
  const limit = req.limit;

  const result = await c1col
    .find(selector)
    .limit(limit);
});

router.post('/', async (req, res, next) => {

})

router.patch('/', async (req, res, next) => {

})

router.delete('/', (req, res, next) => {

})

export default router