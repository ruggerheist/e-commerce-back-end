const router = require('express').Router();
const { Category, Product } = require('../../models');
// const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
    })
    if (!allCategories) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      
    });
    console.log(updateCategory);
    if (!updateCategory){
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err)
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(deleteCategory);
  if (!deleteCategory) {
    res.status(404).json({ message: 'No category found with that id'})
  }
    res.status(200).json(deleteCategory)
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
