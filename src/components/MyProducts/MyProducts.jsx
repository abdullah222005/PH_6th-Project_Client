import React, { use, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://smart-deals-server-seven-gamma.vercel.app/bids?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {});
    }
  }, [user?.email]);

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
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {product.map((bid, index) => {
              const productData = product[bid.productId] || {};
              return (
                <tr
                  key={product._id || index}
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
                          {product.buyer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.buyer_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 text-sm">
                      ${product.buyer_bid}
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {product.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No products has created yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
