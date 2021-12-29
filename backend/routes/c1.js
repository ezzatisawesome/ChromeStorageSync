import express from 'express';
import { Router } from 'express';
const router = Router()

router.get('/', (req, res, next) => {
  //{ selector: '{"a":1}', limit: 10, sort: '["b"]', client: "clientid" },
});

export default router