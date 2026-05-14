const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['ativo', 'inativo'],
      default: 'ativo',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
