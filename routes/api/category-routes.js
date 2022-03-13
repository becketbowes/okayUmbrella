const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [ 'id', 'category_name' ],
    include: [ { model: Product, attributes: [ 'id', 'product_name', 'price', 'stock'] } ] 
  })
  .then(catData => {
    if (!catData) {
      res.status(404).json({ message: 'files not found' });
      return;
    }
    res.json(catData);
  }) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    attributes: [ 'id', 'category_name' ],
    include: [ { model: Product, attributes: [ 'id', 'product_name', 'price', 'stock'] } ] 
  })
  .then(catData => {
    if (!catData) {
      res.status(404).json({ message: 'category not found' });
      return;
    }
    res.json(catData);
  }) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, { where: { id: req.params.id } })
  .then(catData => {
    if (!catData) {
      res.status(404).json({ message: 'no category found with this id' });
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catData => {
    if (!catData) {
      res.status(404).json({ message: 'no category found with this id'});
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
