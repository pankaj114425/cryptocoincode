
const express=require('express');
const { getTop10Coins, saveHistorySnapshot, getCoinHistory } = require('../controllers/coinController');


const router=express.Router();

router.get('/coins', getTop10Coins);


router.post('/history', saveHistorySnapshot);  //for save hitory after 1 hour


router.get('/history/:coinId', getCoinHistory);



module.exports=router