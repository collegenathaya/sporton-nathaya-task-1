"use client";

import React, { useState } from 'react';
import { FiSearch, FiShoppingBag, FiX, FiTrash2, FiPlay } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';

// Data Produk (Gue lengkapin biar ada 6-8 barang kayak dashboard awal lu)
const products = [
  { id: 1, title: "SportsOn Hyperfast Shoes", category: "Running", price: 329000, img: "product-1.png", desc: "Lightweight and breathable running shoes designed for maximum speed and comfort." },
  { id: 2, title: "SportsOn Rockets Tennis", category: "Tennis", price: 999000, img: "product-2.png", desc: "Professional tennis shoes with superior grip and ankle support." },
  { id: 3, title: "SportsOn Slowlivin", category: "Running", price: 119000, img: "product-3.png", desc: "Perfect for casual jogging and everyday wear." },
  { id: 4, title: "SportsOn HyperSoccer v2", category: "Football", price: 458000, img: "product-4.png", desc: "Engineered for the player who demands precision, power, and unrivaled speed." },
  { id: 5, title: "SportsOn Pro Jersey", category: "Football", price: 249000, img: "product-5.png", desc: "High-performance jersey with moisture-wicking technology." },
  { id: 6, title: "SportsOn Training Kit", category: "Running", price: 599000, img: "product-6.png", desc: "Complete training kit for your daily workout sessions." },
];

export default function SportOnFullPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Fungsi Tambah ke Keranjang
  const addToCart = () => {
    const existingItem = cartItems.find(item => item.id === selectedProduct.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === selectedProduct.id ? { ...item, qty: item.qty + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { ...selectedProduct, qty: quantity }]);
    }
    setSelectedProduct(null); 
    setIsCartOpen(true); 
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <main className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased">
      
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 md:px-24 py-7 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
             <div className="w-3 h-3 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase">SPORT<span className="text-[#FF623E]">ON</span></span>
        </div>
        
        <div className="hidden md:flex gap-10 font-bold text-[10px] uppercase tracking-[0.2em]">
          <a href="#" className="text-[#FF623E] border-b-2 border-[#FF623E] pb-1">Home</a>
          <a href="#" className="text-gray-400 hover:text-black transition">Category</a>
          <a href="#" className="text-gray-400 hover:text-black transition">Explore Products</a>
        </div>

        <div className="flex items-center gap-6 text-xl relative">
          <FiSearch className="cursor-pointer hover:text-[#FF623E]" />
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
            <FiShoppingBag className="hover:text-[#FF623E]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF623E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* --- CART POPUP --- */}
          {isCartOpen && (
            <div className="absolute top-12 right-0 w-80 bg-white shadow-2xl rounded-xl border border-gray-100 z-[60] p-5 animate-in slide-in-from-top-2">
              <h3 className="text-center font-black uppercase italic text-sm mb-4 tracking-widest text-black">Shopping Cart</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-400 text-xs py-4 italic">Empty cart, Nath!</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={`/images/products/${item.img}`} className="w-12 h-12 bg-gray-100 rounded-lg object-contain" />
                      <div className="flex-1">
                        <h4 className="text-[10px] font-black uppercase leading-tight text-black">{item.title}</h4>
                        <p className="text-[#FF623E] text-[10px] font-black italic">{item.qty}x <span className="text-gray-400 font-normal ml-1">Rp {item.price.toLocaleString('id-ID')}</span></p>
                      </div>
                      <FiTrash2 onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 cursor-pointer text-sm" />
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest text-black">Total</span>
                    <span className="text-[#FF623E] font-black text-xs italic">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <Link href="/checkout">
                    <button className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-[#FF623E] transition-all flex items-center justify-center gap-2">
                      Checkout Now →
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col md:flex-row items-center px-8 md:px-24 py-12 md:py-20 overflow-hidden">
        <div className="flex-1 z-10 space-y-8">
          <p className="text-[#FF623E] font-extrabold text-sm italic tracking-widest uppercase">Friday Sale, 50%</p>
          <h1 className="text-6xl md:text-[80px] font-black leading-[0.85] tracking-tighter italic uppercase text-black">
            WEAR YOUR <br />
            <span className="text-[#1A1A1A]">TOP-QUALITY</span> <br />
            <span className="text-gray-100">SPORTSWEAR</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Engineered for endurance and designed for speed. Experience gear that moves as fast as you do.
          </p>
          <div className="flex items-center gap-8 pt-4">
            <button className="bg-[#FF623E] text-white px-9 py-5 rounded-sm font-black flex items-center gap-3 uppercase text-[11px] tracking-widest hover:bg-black transition-all">
              Explore More <MdKeyboardDoubleArrowRight size={20} />
            </button>
            <button className="flex items-center gap-4 font-black text-[11px] uppercase tracking-widest group text-black">
              <div className="w-12 h-12 border-2 border-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#FF623E] group-hover:text-white transition-all text-black">
                <FiPlay fill="currentColor" />
              </div>
              Watch Video
            </button>
          </div>
        </div>
        <div className="flex-1 relative flex justify-center items-center mt-16 md:mt-0">
          <div className="absolute w-[500px] h-[500px] border-[70px] border-orange-50/50 rounded-full -right-10 -z-10"></div>
          <img src="/images/img-hero.png" alt="Hero" className="w-full max-w-xl object-contain transform -rotate-6" />
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="px-8 md:px-24 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-black italic uppercase leading-none text-black">Browse By <br/><span className="text-[#FF623E]">Categories</span></h2>
          <a href="#" className="text-[#FF623E] text-[11px] font-black uppercase tracking-widest border-b-2 border-[#FF623E] pb-1">See All</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 text-black">
          {['Badminton', 'Basketball', 'Football', 'Running', 'Swimming', 'Tennis'].map((item) => (
            <div key={item} className="bg-[#F8F8F8] p-8 rounded-2xl flex flex-col items-center gap-4 hover:shadow-xl transition-all group">
              <img src={`/images/categories/category-${item.toLowerCase()}.png`} alt={item} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform" />
              <p className="font-black text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-black">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRODUCTS --- */}
      <section className="px-8 md:px-24 py-20 bg-[#FCFCFC]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase inline-block border-b-4 border-[#FF623E] pb-2 text-black">
            <span className="text-[#FF623E]">Our</span> Products
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col cursor-pointer" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
              <div className="aspect-[4/5] bg-[#F3F3F3] rounded-[32px] mb-6 relative overflow-hidden flex items-center justify-center p-8 transition-all group-hover:bg-white group-hover:shadow-2xl">
                <div className="absolute top-5 right-5 bg-[#FF623E] text-white w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold opacity-0 group-hover:opacity-100 transition-all z-20">+</div>
                <img src={`/images/products/${product.img}`} alt={product.title} className="w-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="px-2">
                <h3 className="font-black text-[14px] text-[#1A1A1A] uppercase italic leading-tight">{product.title}</h3>
                <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">{product.category}</p>
                <p className="text-[#FF623E] font-black mt-2 text-lg italic">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MODAL DETAIL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-5xl w-full p-10 relative flex flex-col md:flex-row gap-12 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-2xl hover:text-[#FF623E] text-black"><FiX /></button>
            <div className="flex-1 bg-gray-50 rounded-[32px] p-10 flex items-center justify-center">
              <img src={`/images/products/${selectedProduct.img}`} className="w-full object-contain transform rotate-[-10deg]" />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-black italic uppercase leading-tight text-black">{selectedProduct.title}</h2>
              <span className="bg-[#FFF0ED] text-[#FF623E] text-[10px] font-black px-4 py-1 rounded-full uppercase">{selectedProduct.category}</span>
              <p className="text-gray-400 text-sm leading-relaxed">{selectedProduct.desc}</p>
              <p className="text-4xl text-[#FF623E] font-black italic">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden h-14 text-black">
                  <div className="px-5 font-bold">{quantity}</div>
                  <div className="flex flex-col border-l-2 border-gray-100">
                    <button onClick={(e) => {e.stopPropagation(); setQuantity(q => q + 1)}} className="px-3 border-b border-gray-100 hover:bg-gray-100 text-[10px]">▲</button>
                    <button onClick={(e) => {e.stopPropagation(); setQuantity(q => Math.max(1, q - 1))}} className="px-3 hover:bg-gray-100 text-[10px]">▼</button>
                  </div>
                </div>
                <button onClick={addToCart} className="bg-[#FF623E] text-white flex-1 h-14 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-black transition-all">
                  <FiShoppingBag /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-[#111111] text-white px-8 md:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-gray-800 pb-16">
          <div className="space-y-6">
            <div className="text-3xl font-black italic uppercase tracking-tighter">SPORT<span className="text-[#FF623E]">ON</span></div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">Engineered for endurance and designed for speed.</p>
          </div>
          <div className="md:ml-auto">
            <h4 className="font-black mb-6 uppercase text-[10px] text-white/50">Menu</h4>
            <ul className="space-y-4 text-xs font-black uppercase">
              <li className="hover:text-[#FF623E] cursor-pointer">Home</li>
              <li className="hover:text-[#FF623E] cursor-pointer">Categories</li>
            </ul>
          </div>
          <div className="md:ml-auto">
            <h4 className="font-black mb-6 uppercase text-[10px] text-white/50">Design</h4>
            <div className="text-xs font-black uppercase">By Nath</div>
          </div>
        </div>
        <div className="pt-10 text-[9px] text-gray-600 font-black uppercase text-center tracking-[0.4em]">
          Sporton © 2026. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}