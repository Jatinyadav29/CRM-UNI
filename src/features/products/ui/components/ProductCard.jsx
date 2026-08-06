import React from "react";
import { Star, ShoppingCart, Heart, Tag } from "lucide-react";

const ProductCard = ({ product }) => {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      <div className="relative aspect-square w-full bg-slate-100/70 p-6 flex items-center justify-center overflow-hidden">
        {product.discountPercentage > 0 && (
          <div className="absolute top-3.5 left-3.5 z-10 bg-purple-600 text-white text-sm font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Tag className="w-3 h-3" />
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}

        <button
          type="button"
          aria-label="Add to Wishlist"
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-400 hover:text-rose-500 hover:bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
        >
          <Heart className="w-4 h-4" />
        </button>

        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        <div className="absolute bottom-3 left-3.5 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/60 text-sm font-semibold text-slate-600 capitalize">
          {product.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm font-semibold text-purple-600">
            <span>{product.brand}</span>
            <span
              className={`text-sm font-medium px-2 py-0.5 rounded-md ${
                product.stock > 0
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              {product.availabilityStatus}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>

          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-800">
                {product.rating}
              </span>
              <span className="text-[11px] text-slate-400">
                ({product.reviews?.length || 0})
              </span>
            </div>

            <div className="text-right">
              <div className="text-base font-black text-slate-900">
                ${discountedPrice}
              </div>
              {product.discountPercentage > 0 && (
                <div className="text-[11px] font-medium text-slate-400 line-through">
                  ${product.price}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-slate-900 hover:bg-purple-600 text-white text-xs font-semibold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
