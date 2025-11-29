import axios from "axios";
import React from "react";
import { data } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateProduct = () => {
  const {user} = useAuth();
  const axiosSecure =useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const category = form.category.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const condition = form.condition.value;
    const usageTime = form.usageTime.value;
    const image = form.image.value;
    const sellerName = form.sellerName.value;
    const sellerEmail = form.sellerEmail.value;
    const sellerContact = form.sellerContact.value;
    const sellerImage = form.sellerImage.value;
    const location = form.location.value;
    const description = form.description.value;

    const newProduct ={
      title,
      category,
      minPrice,
      maxPrice,
      condition,
      usageTime,
      image,
      sellerName,
      sellerEmail,
      sellerContact,
      sellerImage,
      location,
      description};

      axiosSecure.post('/products', newProduct)
      .then(data=> {
        if(data.data.insertedId){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'your product has been created',
            showConfirmButton: false,
            timer: 1111
          })
        }
      })
  };


  return (
    <div className="min-h-screen bg-[#f5f6fa] py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-10">
          Create <span className="text-purple-600">A</span> Product
        </h1>

        <div className="bg-white shadow-md rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                name="title"
                type="text"
                placeholder="e.g. Yamaha Fz Guitar for Sale"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="category"
                className="w-full border rounded-lg px-4 py-2"
              >
                <option>Select a Category</option>
                <option>Electronic Gadgets</option>
                <option>Mobile Phone</option>
                <option>Laptop</option>
              </select>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Min Price</label>
                <input
                  name="minPrice"
                  type="number"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Max Price</label>
                <input
                  name="maxPrice"
                  type="number"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block mb-1 font-medium">
                Product Condition
              </label>
              <div className="flex gap-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="condition"
                    value="new"
                    defaultChecked
                  />
                  Brand New
                </label>
                <label>
                  <input type="radio" name="condition" value="used" />
                  Used
                </label>
              </div>
            </div>

            {/* Usage time */}
            <div>
              <label className="block mb-1 font-medium">Usage Time</label>
              <input
                name="usageTime"
                type="text"
                placeholder="e.g. 1 year 3 months"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block mb-1 font-medium">
                Product Image URL
              </label>
              <input
                name="image"
                type="text"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* Seller Fields */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Seller Name</label>
                <input
                  name="sellerName"
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  defaultValue={user.displayName} readOnly
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Seller Email</label>
                <input
                  name="sellerEmail"
                  type="email"
                  className="w-full border rounded-lg px-4 py-2"
                  defaultValue={user.email} readOnly
                />
              </div>
            </div>

            {/* Seller Contact + Image */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Seller Contact</label>
                <input
                  name="sellerContact"
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Seller Image URL
                </label>
                <input
                  name="sellerImage"
                  type="text"
                  className="w-full border rounded-lg px-4 py-2"
                  defaultValue={user.photoURL} readOnly
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                name="location"
                type="text"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                className="w-full border rounded-lg px-4 py-2 min-h-[110px]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 rounded-xl text-white text-lg font-semibold 
              bg-gradient-to-r from-[#632EE3] to-[#9F62F2]"
            >
              Create A Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
