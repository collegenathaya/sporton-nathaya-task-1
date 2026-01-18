"use client";

import React, { useState } from 'react';
import { FiShoppingCart, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import Link from 'next/link';

export default function StatusPage() {
  // State buat simulasi pindah dari Pending ke Success
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-8 font-sans text-[#1A1A1A]">
      <h1 className="text-3xl font-black uppercase italic mb-10 tracking-tighter">Order Status</h1>

      <div className="bg-white rounded-[40px] shadow-sm p-12 max-w-lg w-full text-center animate-in fade-in zoom-in duration-500">
        
        {!isSuccess ? (
          /* --- TAMPILAN PENDING (20 POIN) --- */
          <div className="space-y-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-8">
              <FiShoppingCart size={40} />
            </div>
            
            <h2 className="text-2xl font-black uppercase italic leading-none text-black">Order Submitted !!</h2>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed px-6">
              Your Order is recorded in our system, we are still confirming the payment status, please wait and your order status will be updated in less than 12 hours.
            </p>

            <button 
              onClick={() => setIsSuccess(true)}
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#FF623E] transition-all mt-8"
            >
              <FiRefreshCw size={14} className="animate-spin" /> Refresh Order Status
            </button>
          </div>
        ) : (
          /* --- TAMPILAN SUCCESS (20 POIN) --- */
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-8">
              <FiCheckCircle size={40} />
            </div>
            
            <h2 className="text-2xl font-black uppercase italic leading-none text-black">Order Confirmed !!</h2>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed px-6">
              We have received your payment, and your order is currently processed by our staff, just wait until your favorite sportswear arrive in your home. We will contact you in Whatsapp for further shipping updates.
            </p>

            <Link href="/" className="block mt-8">
              <button className="w-full bg-[#FF623E] text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all">
                Back to Home
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-12 text-[10px] font-black uppercase text-gray-300 tracking-[0.4em]">
        Sporton © 2026
      </div>
    </main>
  );
}