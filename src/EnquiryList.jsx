import React from "react";
import axios from "axios";
import { Button, ThemeConfig } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";

export default function EnquiryList({ data, getAllEnquiries, Swal, setFormData }) {
  let deletedEnquiry = (delId) => {
    Swal.fire({
      title: "Do you want to Delete this Enquiry?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save"
    }).then((result) => {
      
      if (result.isConfirmed) {
        axios
      .delete(`http://localhost:8020/api/website/enquiry/delete/${delId}`)
      .then(() => {
        toast.success("Enquiry deleted successfully!");
        getAllEnquiries();
      })
      .catch(() => {
        toast.error("Failed to delete enquiry!");
      });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  };

  let editEnquiry = (editId) => {
   axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editId}`)
      .then((res) => {  
         let data = res.data;
         setFormData(data.enquiry);
      })
  } 


  return (
    <>
      <ThemeConfig dark={false} />
      <div className=" bg-gray-200 shadow-md  p-5">
        
        <h2 className="text-[25px] font-bold">Enquiry List</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr No.</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span className=" text-black">Edit</span>
              </TableHeadCell>
              <TableHeadCell>
                <span className="text-black">Delete</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="bg-white">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <Button color="blue" className="cursor-pointer" onClick={() => editEnquiry(item._id)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="red"
                        className="cursor-pointer"
                        onClick={() => deletedEnquiry(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-white">
                <TableCell colSpan={7} className="text-center">
                  No Enquiries Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
