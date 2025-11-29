import React from 'react';
import { Link } from 'react-router';

const SingleOfAllProd = ({product}) => {
  const { title, price_min, price_max, image, condition, _id } = product;

    return (
      <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white">
        <div className="w-full h-48 bg-gray-300 rounded-xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex mt-3 justify-between">
          <span className="bg-[#c6b5ff] py-1 px-3 rounded-3xl text-blue-700">
            On Sell
          </span>
          <span className="bg-[#c6b5ff] py-1 px-3 rounded-3xl text-blue-700">
            {condition}
          </span>
        </div>
        <h2 className="text-lg font-semibold mt-2">{title}</h2>

        <p className="text-purple-600 font-semibold text-lg mt-1">
          ৳ {price_min} - {price_max}
        </p>

        <Link
          to={`/productDetails/${_id}`}
          className="btn mt-4 block text-center py-2 rounded-xl border border-purple-400 text-purple-600 font-medium hover:bg-purple-50 transition"
        >
          View Details
        </Link>
      </div>
    );
};

export default SingleOfAllProd;