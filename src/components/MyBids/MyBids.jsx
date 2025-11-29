import React, { use, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyBids = () => {
    const [bids, setBids] = useState([]);
    const {user} = use(AuthContext);
    const [product, setProduct] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
      axiosSecure.get(`/bids?email=${user.email}`)
      .then(data=>{
        setBids(data.data);
      })
    },[user, axiosSecure])

 useEffect(() => {
   if (bids.length > 0) {
     // Fetch product details for each unique productId
     const productIds = [...new Set(bids.map((bid) => bid.productId))];

     productIds.forEach((productId) => {
       fetch(`http://localhost:3333/products/${productId}`)
         .then((res) => res.json())
         .then((data) => {
           setProduct((prev) => ({
             ...prev,
             [productId]: data,
           }));
         })
     });
   }
 }, [bids]);

 const handleDeleteBid =(_id) =>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3333/bids/${_id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount){
          console.log(data.deletedCount);
          
          const remainingBids = bids.filter(bid=> bid._id !== _id);
          setBids(remainingBids);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          })
      }})
    }
  });
 }

    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-11 max-w-11/12 mx-auto">
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
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-200">
              {bids.map((bid, index) => {
                const productData = product[bid.productId] || {};
                return (
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
                              productData.image ||
                              "https://via.placeholder.com/48"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {productData.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {`৳ ${productData.price_min} - ৳ ${productData.price_max}`}
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

                    <td className="px-6 py-4">
                      <span className="font-semibold text-sm bg-yellow-200 py-1 pb-2 capitalize text-yellow-700 px-3 rounded-3xl">
                        {bid.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={()=>handleDeleteBid(bid._id)} className="btn px-4 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-600 rounded hover:bg-red-100 transition-colors">
                          Remove Bid
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
    );
};

export default MyBids;