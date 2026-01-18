"use client";

import React, { useState } from 'react';
import { FiSearch, FiShoppingBag, FiX, FiTrash2 } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';

// Data Produk
const products = [
  { id: 1, title: "SportsOn Hyperfast Shoes", category: "Running", price: 329000, img: "product-1.png", desc: "Lightweight and breathable running shoes designed for maximum speed and comfort." },
  { id: 2, title: "SportsOn Rockets Tennis", category: "Tennis", price: 999000, img: "product-2.png", desc: "Professional tennis shoes with superior grip and ankle support." },
  { id: 3, title: "SportsOn Slowlivin", category: "Running", price: 119000, img: "product-3.png", desc: "Perfect for casual jogging and everyday wear." },
  { id: 4, title: "SportsOn HyperSoccer v2", category: "Football", price: 458000, img: "product-4.png", desc: "The SportsOn HyperSoccer v2 is engineered for the player who demands precision, power, and unrivaled speed on the pitch." },
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
    setSelectedProduct(null); // Tutup Detail Modal
    setIsCartOpen(true); // Langsung buka Cart Popup di kanan atas
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <main className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased">
      
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-8 md:px-24 py-7 bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
             <div className="w-3 h-3 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase">SPORT<span className="text-[#FF623E]">ON</span></span>
        </div>
        
        <div className="flex items-center gap-6 text-xl relative">
          <FiSearch className="cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
            <FiShoppingBag />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF623E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* --- CART POPUP (SESUAI GAMBAR LU) --- */}
          {isCartOpen && (
            <div className="absolute top-12 right-0 w-80 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 p-5 animate-in slide-in-from-top-2">
              <h3 className="text-center font-black uppercase italic text-sm mb-4 tracking-widest">Shopping Cart</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-400 text-xs py-4 italic">Keranjang kosong, Nath!</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={`/images/products/${item.img}`} className="w-12 h-12 bg-gray-100 rounded-lg object-contain" />
                      <div className="flex-1">
                        <h4 className="text-[10px] font-black uppercase leading-tight">{item.title}</h4>
                        <p className="text-[#FF623E] text-[10px] font-bold">{item.qty}x <span className="text-gray-400 font-normal ml-1">Rp. {item.price.toLocaleString('id-ID')}</span></p>
                      </div>
                      <FiTrash2 onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 cursor-pointer text-sm" />
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total</span>
                    <span className="text-[#FF623E] font-black text-xs italic">Rp. {totalPrice.toLocaleString('id-ID')}</span>
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

      {/* --- LIST PRODUK --- */}
      <section className="px-8 md:px-24 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setQuantity(1); }}>
              <div className="aspect-[4/5] bg-[#F3F3F3] rounded-[32px] mb-6 flex items-center justify-center p-8 group-hover:shadow-xl transition-all">
                <img src={`/images/products/${product.img}`} className="w-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-black text-sm uppercase italic">{product.title}</h3>
              <p className="text-[#FF623E] font-black italic">Rp. {product.price.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRODUCT DETAIL MODAL (SESUAI GAMBAR LU) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-5xl w-full p-10 relative flex flex-col md:flex-row gap-12">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-2xl hover:text-[#FF623E]"><FiX /></button>
            <div className="flex-1 bg-gray-50 rounded-[32px] p-10 flex items-center justify-center">
              <img src={`/images/products/${selectedProduct.img}`} className="w-full object-contain transform rotate-[-10deg]" />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-black italic uppercase leading-tight">{selectedProduct.title}</h2>
              <span className="bg-[#FFF0ED] text-[#FF623E] text-[10px] font-black px-4 py-1 rounded-full uppercase">{selectedProduct.category}</span>
              <p className="text-gray-400 text-sm leading-relaxed">{selectedProduct.desc}</p>
              <p className="text-4xl text-[#FF623E] font-black italic">Rp. {selectedProduct.price.toLocaleString('id-ID')}</p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden h-14">
                  <div className="px-5 font-bold">{quantity}</div>
                  <div className="flex flex-col border-l-2 border-gray-100">
                    <button onClick={() => setQuantity(q => q + 1)} className="px-3 border-b border-gray-100 hover:bg-gray-100 text-[10px]">▲</button>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 hover:bg-gray-100 text-[10px]">▼</button>
                  </div>
                </div>
                <button onClick={addToCart} className="bg-[#FF623E] text-white flex-1 h-14 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2">
                  <FiShoppingBag /> Add to Cart
                </button>
                <Link href="/checkout" className="flex-1">
                   <button className="bg-[#1A1A1A] text-white w-full h-14 rounded-xl font-black uppercase text-xs">Checkout Now →</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}