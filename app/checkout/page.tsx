"use client";

import React, { useState } from 'react';
import { FiTrash2, FiCreditCard } from "react-icons/fi";
import Link from 'next/link';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([
    { id: 4, title: "SportsOn HyperSoccer v2", qty: 2, price: 458000, img: "product-4.png" },
    { id: 6, title: "SportsOn Slowlivin", qty: 1, price: 119000, img: "product-6.png" },
  ]);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <main className="min-h-screen bg-[#F8F8F8] p-8 md:p-20 font-sans text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase text-center mb-12 tracking-tighter">
          Checkout <span className="text-[#FF623E]">Now</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- BAGIAN KIRI: ORDER INFORMATION --- */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-sm">
            {/* Judul Section Warna Hitam */}
            <h2 className="font-black uppercase italic text-sm mb-8 tracking-widest border-b pb-4 text-black">
              Order Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-2 tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Type your full name" 
                  className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#FF623E] outline-none text-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-2 tracking-widest">Whatsapp Number</label>
                <input 
                  type="text" 
                  placeholder="+62xxxx" 
                  className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#FF623E] outline-none text-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-black mb-2 tracking-widest">Shipping Address</label>
                <textarea 
                  rows={4}
                  placeholder="Example Street, 18, West Jakarta, Indonesia, 66521" 
                  className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#FF623E] outline-none resize-none text-black"
                ></textarea>
              </div>
            </div>
          </div>

          {/* --- BAGIAN KANAN: CART ITEMS --- */}
          <div className="bg-white rounded-3xl p-10 shadow-sm flex flex-col">
            {/* Judul Section Warna Hitam */}
            <h2 className="font-black uppercase italic text-sm mb-8 tracking-widest border-b pb-4 text-black">
              Cart Items
            </h2>
            
            <div className="flex-1 space-y-6 overflow-y-auto max-h-[400px] mb-8 pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center group">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
                    <img src={`/images/products/${item.img}`} alt={item.title} className="w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] font-black uppercase leading-tight mb-1 text-black">{item.title}</h3>
                    {/* Kuantitas Hitam, Harga Jingga */}
                    <p className="text-black text-[10px] font-black italic">
                      {item.qty}x <span className="text-[#FF623E] ml-1">Rp. {item.price.toLocaleString('id-ID')}</span>
                    </p>
                  </div>
                  <FiTrash2 className="text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase text-black tracking-widest">Total</span>
                {/* Total Harga Jingga */}
                <span className="text-[#FF623E] font-black text-xl italic leading-none">
                  Rp. {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <Link href="/payment">
                <button className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-[#FF623E] transition-all flex items-center justify-center gap-3">
                  <FiCreditCard size={18} /> Proceed to Payment
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}