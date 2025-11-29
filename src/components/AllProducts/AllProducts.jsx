import React, { use } from "react";
import SingleOfAllProd from "../SingleProduct/SingleOfAllProd";

const productsPromise = fetch(
  "https://smart-deals-server-seven-gamma.vercel.app/products"
).then((res) => res.json());

const AllProducts = () => {
  const productsData = use(productsPromise);

  return (
    <div className="max-w-11/12 mx-auto">
      <h1 className="text-5xl text-center my-10 font-semibold">
        All <span className="text-[#9810FA]">Products</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {productsData.map((product) => (
          <SingleOfAllProd
            key={product._id}
            product={product}
          ></SingleOfAllProd>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
