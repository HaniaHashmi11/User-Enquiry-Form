let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete,  enquirySingleRow, enquiryUpdate } = require('../../Controllers/web/enquiryController');
let enquiryRouter = express.Router();

enquiryRouter.post('/insert', enquiryInsert)

enquiryRouter.get('/list', enquiryList )

enquiryRouter.delete('/delete/:id', enquiryDelete);

enquiryRouter.get('/single/:id', enquirySingleRow);

enquiryRouter.put('/update/:id', enquiryUpdate);

module.exports = enquiryRouter;