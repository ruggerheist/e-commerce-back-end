const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const allTags = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }],
    })
    if (!allTags) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }    
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },      
    });
    console.log(updateTag);
    if (!updateTag){
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(deleteTag);
  if (!deleteTagho) {
    res.status(404).json({ message: 'No category found with that id'})
  }
    res.status(200).json(deleteTag)
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
