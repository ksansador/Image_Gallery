const express = require('express');
const config = require('../config');
const path = require("path");
const router = express.Router();
const Card = require('../models/Card');
const multer = require('multer');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const {nanoid} = require("nanoid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async(req, res) => {
    const query = {};

    if(req.query.user) {
        query.user = req.query.user;
    }

    try {
        const cards = await Card.find(query).populate('user', 'displayName');
        res.send(cards);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async(req, res) => {
 try {
     const card = await Card
         .findById(req.params.id)
         .populate('user', 'displayName');

     if(!card) {
         return res.status(404).send({message: 'Card not found!'});
     }

     res.send(card);
 } catch {
     res.sendStatus(500);
 }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    if(!title) {
        return res.status(400).send({message: 'Data not valid'});
    }

    const cardData = {
        title,
        user: user._id,
        image: null,
    }

    if(!req.file) {
        return res.status(400).send({message: 'Data not valid'});
    } else {
        cardData.image = 'uploads/' + req.file.filename;
    }

    try {
        const card = new Card(cardData);
        await card.save();
        res.send(card);

    } catch (e) {
        res.status(400).send({errors: e.errors});
    }
});

router.put('/publish/:id', auth, permit('admin'), async (req, res) => {
   const cardId = req.params.id;
    try {
        const card = await Card.findById(cardId);

        if(!card) {
            return res.status(404).send({message: 'Card not found!'});
        }

        card.publish = true;
        await card.save();
        res.send(card);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.put('/generation/:id', auth, async (req, res) => {
    const cardId = req.params.id;
    const  user = req.user;

    try {
        const card = await Card.findOne({_id: cardId, user: user._id});

        if(!card) {
            return res.status(404).send({message: 'Card not found!'});
        }

        card.token = nanoid();
        await card.save();
        res.send(card);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  const cardId = req.params.id;

   try {
       const card = await Card.findById(cardId);

       if (!card) {
           res.status(404).send({message: 'Card not found!'});
       }

       await Card.findByIdAndDelete(cardId);

       res.sendStatus(200);
   }  catch {
       res.sendStatus(500);
   }
});

module.exports = router;