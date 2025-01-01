const express = require('express');
const {
  createCampaign,
  getCampaigns,
  sendCampaign,
} = require('../controllers/campaignController');

const router = express.Router();

router.post('/', createCampaign);
router.get('/', getCampaigns);
router.post('/send/:id', sendCampaign);

module.exports = router;
