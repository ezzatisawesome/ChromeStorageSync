import express from 'express';
import { Router } from 'express';
const router = Router()
import { c1col } from '../app.js'
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json()

router.get('/', async (req, res, next) => {
  //{ selector: '{"a":1}', limit: 10, sort: '["b"]', client: "clientid" }

  const {
    params,
    sort,
    limit,
    skip,
    fields,
    whereExpr,
    orderByExprs,
    client
  } = req.query

  const result = await c1col
    .find(selector)
    .limit(limit);
});

router.post('/', jsonParser, async (req, res, next) => {
  console.log(req.body)
  console.log(req.query)
})

router.patch('/', async (req, res, next) => {
  console.log(req)
})

router.delete('/', (req, res, next) => {
  console.log(req)
})

export default router