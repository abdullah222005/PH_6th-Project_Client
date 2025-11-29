import React from 'react';
import { Search } from 'lucide-react';
import BannerLeft from '../../assets/bg-hero-left.png'
import BannerRight from '../../assets/bg-hero-right.png'

const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-r from-pink-100 via-purple-50 to-cyan-50 py-16 px-4 relative">
                <img className='absolute left-0 -top-[50px]' src={BannerLeft} alt="" />
                <img className='absolute right-0 -top-[50px]' src={BannerRight} alt="" />
            <div className="max-w-4xl mx-auto text-center">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Deal Your <span className="text-purple-600">Products</span>
                <br />
                In A <span className="text-purple-600">Smart</span> Way !
                </h1>
                
                {/* Subheading */}
                <p className="text-gray-600 text-base md:text-lg mb-8">
                SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
                </p>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-6">
                <div className="relative flex items-center">
                    <input
                    type="text"
                    placeholder="search For Products, Categoriees..."
                    className="w-full px-6 py-4 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-r-lg transition-colors">
                    <Search className="w-5 h-5" />
                    </button>
                </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Watch All Products
                </button>
                <button className="bg-white hover:bg-gray-50 text-purple-600 px-6 py-3 rounded-lg font-medium border-2 border-purple-600 transition-colors">
                    Post an Product
                </button>
                </div>
            </div>
        </div>
    )
};

export default Banner;