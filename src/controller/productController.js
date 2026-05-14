const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const filters = { status: 'ativo' };
    if (category) {
      filters.category = category;
    }
    const product = await Product.find(filters).populate('category');
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};
const getById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      status: 'ativo',
    }).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock, status } =
      req.body;
    const exists = await Product.findOne({ name, status: 'ativo' });
    if (exists) {
      return res.status(400).json({ message: `Produto ${name} já existe` });
    }
    const categoryExists = await Category.findOne({
      _id: category,
      status: 'ativo',
    });

    if (!categoryExists) {
      return res.status(400).json({ message: 'Categoria inválida' });
    }
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
      status,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar produto' });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock, status } =
      req.body;
    if (category) {
      const categoryExists = await Category.findOne({
        _id: category,
        status: 'ativo',
      });

      if (!categoryExists) {
        return res.status(400).json({ message: 'Categoria inválida' });
      }
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        stock,
        status,
      },
      { returnDocument: 'after', runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o produto' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: 'inativo' },
      { returnDocument: 'after', runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: `Produto ${product.name} deletado com sucesso` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o produto' });
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
