const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  recipients: { type: [String], required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  sentAt: { type: Date },
  metrics: {
    totalSent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    openRate: { type: Number, default: 0 },
    clickRate: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Campaign', CampaignSchema);
