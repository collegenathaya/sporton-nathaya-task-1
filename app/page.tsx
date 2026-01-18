"use client";

import React, { useState } from 'react';
import { FiSearch, FiShoppingBag, FiX, FiTrash2, FiPlay } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';

const products = [
  { id: 1, title: "SportsOn Hyperfast Shoes", category: "Running", price: 329000, img: "product-1.png", desc: "Sepatu lari super ringan untuk kecepatan dan kenyamanan maksimal setiap hari." },
  { id: 2, title: "SportsOn Rockets Tennis", category: "Tennis", price: 999000, img: "product-2.png", desc: "Dukungan engkel maksimal untuk stabilitas tinggi di lapangan tenis." },
  { id: 3, title: "SportsOn Slowlivin", category: "Running", price: 119000, img: "product-3.png", desc: "Didesain khusus untuk jalan santai dengan bantalan yang empuk." },
  { id: 4, title: "SportsOn HyperSoccer v2", category: "Football", price: 458000, img: "product-4.png", desc: "Kontrol bola lebih presisi dengan teknologi grip terbaru di bagian upper." },
  { id: 5, title: "SportsOn Pro Jersey", category: "Football", price: 249000, img: "product-5.png", desc: "Bahan breathable yang menjaga suhu tubuh tetap sejuk saat bertanding." },
  { id: 6, title: "SportsOn Training Kit", category: "Running", price: 599000, img: "product-6.png", desc: "Satu set perlengkapan latihan lengkap untuk performa terbaik Anda." },
];

export default function SportOn() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);

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
      
      <nav className="flex justify-between items-center px-6 md:px-24 py-5 md:py-7 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
             <div className="w-3 h-3 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-xl font-black italic uppercase">SPORT<span className="text-[#FF623E]">ON</span></span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 text-xl relative">
          <FiSearch className="cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
            <FiShoppingBag />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF623E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </div>

          {isCartOpen && (
            <div className="absolute top-12 right-0 w-[280px] md:w-80 bg-white shadow-2xl rounded-xl border border-gray-100 z-[60] p-5">
              <h3 className="text-center font-black uppercase italic text-sm mb-4 tracking-widest text-black">Shopping Cart</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 text-black">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-400 text-[10px] py-4 italic">Belum ada barang.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-3">
                      <img src={`/images/products/${item.img}`} className="w-10 h-10 bg-gray-100 rounded-lg object-contain" />
                      <div className="flex-1">
                        <h4 className="text-[9px] font-black uppercase leading-tight">{item.title}</h4>
                        <p className="text-[#FF623E] text-[9px] font-black">{item.qty}x <span className="text-gray-400 font-normal ml-1">Rp {item.price.toLocaleString('id-ID')}</span></p>
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
                    <button className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-[#FF623E] transition-all">Checkout Now →</button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <section className="relative flex flex-col md:flex-row items-center px-6 md:px-24 py-8 md:py-20 overflow-hidden">
        <div className="flex-1 z-10 space-y-6 md:space-y-8 text-center md:text-left">
          <p className="text-[#FF623E] font-extrabold text-[10px] md:text-sm italic tracking-widest uppercase text-black">Friday Sale, 50%</p>
          <h1 className="text-4xl md:text-[80px] font-black leading-[0.9] md:leading-[0.85] tracking-tighter italic uppercase text-black">
            WEAR YOUR <br />
            <span className="text-[#1A1A1A]">TOP-QUALITY</span> <br />
            <span className="text-gray-200">SPORTSWEAR</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xs md:max-w-sm mx-auto md:mx-0 leading-relaxed">
            Tingkatkan performa olahraga Anda dengan perlengkapan kualitas terbaik. Didesain untuk kenyamanan dan kecepatan.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 pt-4">
            <button className="w-full md:w-auto bg-[#FF623E] text-white px-8 md:px-9 py-4 md:py-5 rounded-sm font-black flex items-center justify-center gap-3 uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-black transition-all">
              Explore More <MdKeyboardDoubleArrowRight size={20} />
            </button>
            <button className="flex items-center gap-4 font-black text-[10px] md:text-[11px] uppercase tracking-widest text-black group">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#FF623E] group-hover:text-white transition-all">
                <FiPlay fill="currentColor" />
              </div>
              Watch Video
            </button>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center items-center mt-12 md:mt-0">
          <div className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] border-[40px] md:border-[70px] border-orange-50/30 rounded-full -z-10 animate-pulse"></div>
          <img src="/images/img-hero.png" alt="Hero" className="w-3/4 md:w-full max-w-xl object-contain transform -rotate-6" />
        </div>
      </section>

      <section className="px-6 md:px-24 py-12 md:py-20 bg-white">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase leading-none text-black">Browse By <br/><span className="text-[#FF623E]">Categories</span></h2>
          <a href="#" className="text-[#FF623E] text-[10px] font-black uppercase tracking-widest border-b-2 border-[#FF623E] pb-1">See All</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-black">
          {['Badminton', 'Basketball', 'Football', 'Running', 'Swimming', 'Tennis'].map((item) => (
            <div key={item} className="bg-[#F8F8F8] p-6 md:p-8 rounded-2xl flex flex-col items-center gap-4 hover:shadow-xl transition-all group cursor-pointer">
              <img src={`/images/categories/category-${item.toLowerCase()}.png`} alt={item} className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform" />
              <p className="font-black text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-black">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-12 md:py-20 bg-[#FCFCFC]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase inline-block border-b-4 border-[#FF623E] pb-2 text-black">
            Our Products
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
              <div className="aspect-[4/5] bg-[#F3F3F3] rounded-[32px] mb-6 relative flex items-center justify-center p-8 transition-all group-hover:bg-white group-hover:shadow-xl">
                <div className="absolute top-5 right-5 bg-[#FF623E] text-white w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">+</div>
                <img src={`/images/products/${product.img}`} alt={product.title} className="w-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="px-2">
                <h3 className="font-black text-[14px] text-black uppercase italic leading-tight">{product.title}</h3>
                <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">{product.category}</p>
                <p className="text-[#FF623E] font-black mt-2 text-lg italic">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] md:rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col md:flex-row shadow-2xl">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 md:top-8 md:right-8 text-2xl text-black hover:text-[#FF623E] z-10 transition-colors"><FiX /></button>
            <div className="w-full md:w-1/2 bg-[#F8F8F8] p-8 md:p-12 flex items-center justify-center relative">
              <img src={`/images/products/${selectedProduct.img}`} className="w-48 md:w-full max-w-[320px] object-contain drop-shadow-2xl transform md:rotate-[-10deg]" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <span className="bg-[#FFF0ED] text-[#FF623E] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3">{selectedProduct.category}</span>
                  <h2 className="text-3xl md:text-4xl font-black italic uppercase leading-none text-black">{selectedProduct.title}</h2>
                </div>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{selectedProduct.desc}</p>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 text-black">Price</p>
                  <p className="text-3xl md:text-4xl text-[#FF623E] font-black italic">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden h-14 w-full sm:w-auto text-black font-black">
                    <button onClick={(e) => {e.stopPropagation(); setQuantity(q => Math.max(1, q - 1))}} className="px-5 hover:bg-gray-50">-</button>
                    <div className="px-2 w-8 text-center">{quantity}</div>
                    <button onClick={(e) => {e.stopPropagation(); setQuantity(q => q + 1)}} className="px-5 hover:bg-gray-50">+</button>
                  </div>
                  <button onClick={addToCart} className="bg-[#1A1A1A] hover:bg-[#FF623E] text-white w-full sm:flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all">
                    <FiShoppingBag size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#111111] text-white px-8 md:px-24 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          <div className="space-y-4">
            <div className="text-2xl font-black italic uppercase">SPORT<span className="text-[#FF623E]">ON</span></div>
            <p className="text-gray-500 text-[10px] leading-relaxed max-w-xs">High-performance equipment for athletes.</p>
          </div>
          <div className="md:ml-auto hidden md:block text-right text-black">
            <h4 className="font-black mb-4 uppercase text-[10px] text-white/50 tracking-widest">Menu</h4>
            <ul className="space-y-2 text-[10px] font-black uppercase text-white">
              <li className="hover:text-[#FF623E] cursor-pointer">Home</li>
              <li className="hover:text-[#FF623E] cursor-pointer">Categories</li>
            </ul>
          </div>
          <div className="md:ml-auto text-center md:text-right">
            <h4 className="font-black mb-4 uppercase text-[10px] text-white/50 tracking-widest">Project By</h4>
            <div className="text-[10px] font-black uppercase tracking-widest">NATH</div>
          </div>
        </div>
        <div className="pt-8 text-[8px] text-gray-700 font-black uppercase tracking-[0.4em] text-center">Sporton © 2026. All Rights Reserved.</div>
      </footer>
    </main>
  );
}