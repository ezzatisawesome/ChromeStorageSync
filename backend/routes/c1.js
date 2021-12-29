import express from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { c1col } from '../app.js'

const router = Router()

var jsonParser = bodyParser.json()

router.get('/', jsonParser, async (req, res, next) => {
  //{ selector: '{"a":1}', limit: 10, sort: '["b"]', client: "clientid" }
  const {
    selector,
    limit,
    client
  } = req.query

  console.log(req.query)
  console.log(selector)

  const result = c1col.find(JSON.parse(selector))

  const res_msg = []
  await result.forEach(e => {
    console.log(e)
    res_msg.push(e)
  })

  console.log(res_msg)

  res.status(200).send(res_msg)
});

router.post('/', jsonParser, async (req, res, next) => {
  delete req.body._id
  console.log('Inserting into MongoDb: ', req.body)
  c1col.insertOne(req.body)
  res.status(200)
})

router.patch('/', async (req, res, next) => {
  console.log(req)
})

router.delete('/', (req, res, next) => {
  console.log(req)
})

export default router