import React, { use } from 'react';
import SingleProduct from '../SingleProduct/SingleProduct';

const LatestProducts = ({ LatestProductsPromise }) => {
  const productsData = use(LatestProductsPromise);
  return (
    <div className="max-w-11/12 mx-auto">
      <h1 className="text-5xl text-center my-10">
        Recent <span className="text-[#9810FA]">Products</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {productsData.map((product) => (
          <SingleProduct key={product._id} product={product}></SingleProduct>
        ))}
      </div>
      <button
        className="px-6 py-3 rounded-xl mx-auto block mt-11
          bg-gradient-to-r from-[#632EE3] to-[#9F62F2] 
      text-white font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
      >
        Show All
      </button>
    </div>
  );
};

export default LatestProducts;