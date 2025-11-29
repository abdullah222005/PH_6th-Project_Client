import LatestProducts from "../LatestProducts/LatestProducts";
import Banner from "../Banner/Banner";
const LatestProductsPromise = fetch(
  "https://smart-deals-server-seven-gamma.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/* fallback element add.. */}
      <LatestProducts
        LatestProductsPromise={LatestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
