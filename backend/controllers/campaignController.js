const Campaign = require('../models/Campaign');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendCampaign = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    const { recipients, subject, content } = campaign;
    let sentCount = 0;

    for (const recipient of recipients) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: recipient,
          subject,
          text: content,
        });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send email to ${recipient}:`, err.message);
      }
    }

    campaign.sentAt = new Date();
    campaign.metrics.totalSent = sentCount;
    await campaign.save();

    res.json({ message: 'Emails sent successfully', campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
