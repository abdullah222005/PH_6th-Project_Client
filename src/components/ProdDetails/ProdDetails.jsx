import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const ProdDetails = () => {
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const {
    title,
    category,
    price_min,
    price_max,
    created_at,
    _id,
    location,
    seller_contact,
    email,
    seller_name,
    condition,
    usageTime,
    description,
    image,
    status,
  } = product;

  const bidModalRef = useRef(null);
  const handleBid = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const image = e.target.imageUrl.value;
    const contactInfo = e.target.contactInfo.value;
    const newBid = {
      productId: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: image,
      buyer_bid: bid,
      buyer_contactInfo: contactInfo,
      status: "pending",
    };
    fetch("https://smart-deals-server-seven-gamma.vercel.app/products/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          toast.success("Your bid successfully placed.!!");
        }
      });
  };

  useEffect(() => {
    fetch(`https://smart-deals-server-seven-gamma.vercel.app/bids/${_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBids(data);
      });
  }, [_id]);

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-2xl w-full max-w-6xl mx-auto my-11">
      <div className="flex gap-10">
        {/* LEFT SIDE */}
        <div className="w-1/2 space-y-6">
          {/* Product Image */}
          <div className="w-full h-80 bg-gray-300 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>

            <div className="flex justify-between mb-3 text-sm">
              <p>
                <strong className="text-gray-600">Condition:</strong>{" "}
                <span className="text-purple-600">{condition}</span>
              </p>

              <p>
                <strong className="text-gray-600">Usage Time:</strong>{" "}
                <span className="text-purple-600">{usageTime}</span>
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">
          {/* Back Button */}
          <button className="text-gray-600 hover:text-black mb-4 text-sm">
            ← Back To Products
          </button>
          {/* Title */}
          <h1 className="text-3xl font-bold leading-snug">{title}</h1>
          {/* Category */}
          <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full mt-3 text-sm">
            {category}
          </span>

          {/* Price */}
          <p className="text-[#4CAF50] text-3xl font-bold mt-4">
            ৳ {price_min} - ৳ {price_max}
          </p>
          <p className="text-gray-400 text-sm">Price starts from</p>
          {/* Product Details Box */}
          <div className="mt-6 p-5 bg-gray-50 border rounded-xl text-sm">
            <h2 className="text-xl font-semibold mb-3">Product Details</h2>
            <p>
              <strong>Product ID:</strong> {_id}
            </p>
            <p>
              <strong>Posted:</strong> {created_at}
            </p>
          </div>

          {/* Seller Info */}
          <div className="mt-6 p-5 bg-gray-50 border rounded-xl text-sm">
            <h2 className="text-xl font-semibold mb-3">Seller Information</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-semibold">{seller_name}</p>
                <p className="text-gray-500 text-sm">{email}</p>
              </div>
            </div>
            <p className="mt-3">
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Contact:</strong> {seller_contact}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                {status}
              </span>
            </p>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBid}
            className="btn w-full mt-6 py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition"
          >
            I Want Buy This Product
          </button>

          {/* Modal */}
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="bg-white rounded-lg border border-gray-200  w-full p-6">
                {/* Header */}
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Give Seller Your Offered Price
                </h2>

                {/* Form Fields */}
                <form onSubmit={handleBidSubmit} ref={bidModalRef}>
                  {/* Buyer Name and Email - Side by side */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buyer Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.displayName}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buyer Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Buyer Image URL */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Buyer Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      defaultValue={user?.photoURL}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Place your Price */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Place your Price
                    </label>
                    <input
                      type="text"
                      name="bid"
                      placeholder="00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Info
                    </label>
                    <input
                      type="tel"
                      name="contactInfo"
                      placeholder="e.g. +8801*********"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-full px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                  >
                    Submit Bid
                  </button>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <h1 className="text-3xl font-semibold">
        Bids for this product:{" "}
        <span className="text-[#9810FA]">{bids.length}</span>
      </h1>
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-11">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Head */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  SL No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Seller
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Bid Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-200">
              {bids.map((bid, index) => (
                <tr
                  key={bid._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* SL No */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {index + 1}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={
                            bid.buyer_image || "https://via.placeholder.com/48"
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {`৳ ${price_min} - ৳ ${price_max}`}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Seller */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {bid.buyer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {bid.buyer_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 text-sm">
                      ${bid.buyer_bid}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-600 rounded hover:bg-green-100 transition-colors">
                        Accept Offer
                      </button>
                      <button className="px-4 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-600 rounded hover:bg-red-100 transition-colors">
                        Reject Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {bids.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              No bids yet for this product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProdDetails;
