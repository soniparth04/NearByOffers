const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  image: [{ type: String }],
  price: { type: String}
}, { timestamps: true });

module.exports = mongoose.model('Catalog', CatalogSchema);
