"use client";
import React from 'react';

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-white p-10 flex items-center justify-center">
      <div className="max-w-4xl flex gap-10 border p-10 rounded-3xl shadow-xl">
        <img src="/images/products/product-4.png" className="w-1/2 object-contain" alt="Shoes" />
        <div className="space-y-4">
          <h1 className="text-4xl font-black italic">SportsOn HyperSoccer v2</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Football</p>
          <p className="text-3xl text-[#FF623E] font-black italic">Rp. 458.000</p>
          <p className="text-sm text-gray-500 leading-relaxed">The SportOn HyperSoccer v2 is engineered for the player who demands precision, power and style on the pitch.</p>
          <div className="flex gap-4">
            <button className="bg-[#FF623E] text-white px-8 py-3 rounded-lg font-bold">ADD TO CART</button>
            <button className="border-2 border-black px-8 py-3 rounded-lg font-bold">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}