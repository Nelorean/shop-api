const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find({ status: 'ativo' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name, status: 'ativo' });
    if (exists) {
      return res.status(400).json({ message: 'Categoria já existe' });
    }
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar a categoria' });
  }
};
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar a categoria' });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { status: 'inativo' },
      { returnDocument: 'after' }
    );
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar categoria' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
