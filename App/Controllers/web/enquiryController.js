const EnquiryModel = require("../../Models/Enquiry.model");


let enquiryInsert = (req,res) => {
   const { name, email, phone, message } = req.body;
    let product =  new EnquiryModel({ 
        name,
        email,
        phone,
        message
    });
   product.save().then(() => {
      res.send({ status:1, message:"Enquiry saved successfully"})

   }).catch((err) => {
      res.send({ status:0, message:"error in Enquiry"}, err)

   });
}

let enquiryList =async (req, res) => {
   let enquiry = await EnquiryModel.find();
   res.send({ status:1, data:enquiry})
}

let enquiryDelete = async (req, res) => {
   let enqId = req.params.id;
   await EnquiryModel.deleteOne({_id:enqId});
   res.send({ status: 1, message: "Enquiry deleted successfully" });
}


let enquirySingleRow = async (req, res) => {
   let enqId = req.params.id;
   let enquiry = await EnquiryModel.findOne({ _id: enqId });
   res.send({ status: 1, enquiry });
}

let enquiryUpdate = async (req, res) => {
   let enqId = req.params.id;
   let { name, email, phone, message } = req.body;
   let updateObj = {
      name,
      email,
      phone,
      message
   };
   await EnquiryModel.updateOne({ _id: enqId }, updateObj);
   res.send({ status: 1, message: "Enquiry updated successfully" });
}

module.exports = {
   enquiryInsert,
   enquiryList,
   enquiryDelete,
   enquirySingleRow,
   enquiryUpdate
}