import React, { useState, useEffect } from "react";
import { ThemeConfig } from "flowbite-react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import EnquiryList from "./EnquiryList";

export default function Enquiry() {
  // Initialize enquiry state
  let [enquiryList, setEnquiryList] = useState([]);

  // State to hold form data
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: ""
  });
  console.log("Form Data:", formData);

  const saveEnquiry = (e) => {
    e.preventDefault();

    
    if (formData._id) {
      // Update existing enquiry
      axios
        .put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
      .then(() => {
        toast.success("Enquiry updated successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: ""
        });
        // Refresh the enquiry list after update
        getAllEnquiries();
        e.target.reset();
      });
    }else {
       axios
      .post("http://localhost:8020/api/website/enquiry/insert", formData)
      .then((res) => {
        toast.success("Enquiry submitted successfully!");
        console.log(res.data);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        // Refresh the enquiry list after submission
        getAllEnquiries();
        e.target.reset();
      });
    }

  };

  let getAllEnquiries = () => {
    axios
      .get("http://localhost:8020/api/website/enquiry/list")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.data);
        }
      });
  };

  useEffect(() => {
    getAllEnquiries();
  }, []);
  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    console.log(inputName, inputValue);
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };
  return (
    <>
      <ToastContainer />
      <ThemeConfig dark={false} />
      <h1 className="text-3xl font-bold  text-center py-5">User Enquiry</h1>

      <div className="grid  grid-cols-[30%_auto] gap-10 ">
        <div className=" bg-gray-200 shadow-md  p-5">
          <h2 className="text-[25px] font-bold">Enquiry Form</h2>

          <form action="" onSubmit={saveEnquiry}>
            <div className="py-2.5">
              <Label htmlFor="name">Your Name</Label>
              <TextInput
                name="name"
                onChange={getValue}
                value={formData.name}
                type="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="py-2.5">
              <Label htmlFor="email">Your Email</Label>
              <TextInput
                name="email"
                onChange={getValue}
                type="email"
                value={formData.email}
                placeholder="example@123.com"
                required
              />
            </div>
            <div className="py-2.5">
              <Label htmlFor="phone">Your Phone</Label>
              <TextInput
                name="phone"
                onChange={getValue}
                value={formData.phone}
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="py-2.5">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                name="message"
                placeholder="Message"
                onChange={getValue}
                value={formData.message}
                required
                rows={4}
              />
            </div>
            <div className="py-4">
              <Button
                type="submit"
                className="w-full bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                {formData._id ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList
          data={enquiryList}
          getAllEnquiries={getAllEnquiries}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </>
  );
}
