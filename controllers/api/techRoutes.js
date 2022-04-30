const router = require('express').Router();
const { Tech } = require('../../models');
const withAuth = require('../../utils/auth');
const { readAndAppend, readFromFile } = require('../../utils/fsUtils');

router.get('/', (req, res) =>
    readFromFile('./seeds/techData.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', withAuth, async (req, res) => {
  try {
    const newTech = await Tech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    readAndAppend(newTech, './seeds/techData.json');

    res.status(200).json(newTech);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const techData = await Tech.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!techData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(techData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
