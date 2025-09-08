let mongoose = require('mongoose')
let EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})
let EnquiryModel = mongoose.model('Enquiry', EnquirySchema);

module.exports = EnquiryModel;