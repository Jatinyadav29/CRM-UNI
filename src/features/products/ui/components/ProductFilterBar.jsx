import React from "react";
import {
  Search,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useAllCategories, useAllProduct } from "../../hook/useProductHooks";

const ProductFilterBar = ({ search, setSearch, category, setCategory }) => {
  let { data, isPending, errors } = useAllCategories();

  if (isPending) {
    return (
      <div className="flex justify-center items-center text-blue-700 p-4">
        Loading categories ....
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 mx-10 p-4 sm:p-5 shadow-2xs flex justify-between items-center">
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-50 border border-slate-200/80 text-slate-900 text-md rounded-2xl py-2.5 pl-10 pr-4 outline-none focus:border-purple-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="  border-slate-100 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-md font-semibold py-2.5 pl-3.5 pr-8 rounded-2xl outline-none cursor-pointer transition-colors capitalize"
          >
            <option value="">All Categories</option>
            {data.map((cat) => (
              <option
                key={typeof cat === "object" ? cat.slug || cat.name : cat}
                value={typeof cat === "object" ? cat.slug || cat.name : cat}
              >
                {typeof cat === "object" ? cat.name : cat}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterBar;
