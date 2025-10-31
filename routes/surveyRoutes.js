const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.post('/', surveyController.createSurveyRequest);
router.get('/', surveyController.getAllSurveys);

module.exports = router;
