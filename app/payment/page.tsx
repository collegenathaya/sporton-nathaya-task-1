"use client";

import React, { useState } from 'react';
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import Link from 'next/link';

export default function PaymentPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] p-8 md:p-20 font-sans text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase text-center mb-12 tracking-tighter">
          Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* --- BAGIAN KIRI: PAYMENT OPTIONS --- */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="font-black uppercase italic text-sm mb-6 tracking-widest text-black">Payment Options</h2>
            <div className="space-y-4">
              {[
                { name: 'BCA', acc: '0123182312' },
                { name: 'Mandiri', acc: '83923912013203123' },
                { name: 'BTPN', acc: '5238218923' }
              ].map((bank) => (
                <div key={bank.name} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <FiCheckCircle />
                    </div>
                    <div>
                      <p className="font-black text-xs text-black">{bank.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold tracking-tighter">{bank.acc}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase text-blue-500 bg-blue-50 px-3 py-1 rounded-full">Bank Transfer</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- BAGIAN KANAN: PAYMENT STEPS & UPLOAD --- */}
          <div className="bg-white rounded-3xl p-8 shadow-sm space-y-8">
            <div>
              <h2 className="font-black uppercase italic text-sm mb-4 tracking-widest text-black">Payment Steps</h2>
              <ol className="text-[11px] text-gray-600 space-y-3 leading-relaxed font-medium">
                <li>1. Transfer the total amount of <span className="font-black text-black">Rp. 1.035.000</span> to your preferred bank account listed under 'Payment Options'.</li>
                <li>2. After completing the transfer, <span className="font-black text-black">keep the payment receipt</span> or a screenshot of the transfer confirmation.</li>
                <li>3. Upload the payment receipt/screenshot using the <span className="font-black text-black">'Upload Receipt & Confirm'</span> button below to validate your transaction.</li>
              </ol>
            </div>

            {/* AREA UPLOAD FILE */}
            <div className="relative group">
              <input 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-red-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-red-50/30 group-hover:bg-red-50 transition-all">
                <FiUploadCloud className="text-[#FF623E] text-3xl" />
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  {fileName ? fileName : "Upload Your Payment Receipt here"}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase text-black tracking-widest">Total</span>
                <span className="text-[#FF623E] font-black text-xl italic">Rp. 1.035.000</span>
              </div>

              {/* TOMBOL KONFIRMASI (FLOW PEMBAYARAN) */}
              <Link href="/status">
                <button className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-[#FF623E] transition-all flex items-center justify-center gap-3 shadow-lg">
                  <FiCheckCircle size={18} /> Upload Receipt & Confirm
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}