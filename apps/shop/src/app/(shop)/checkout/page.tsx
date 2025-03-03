"use client";


import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Checkout",
    contact: "Contact Information",
    shipping: "Shipping Address",
    payment: "Payment Details",
    placeOrder: "Place Order",
    email: "Email",
    name: "Full Name",
    address: "Address",
    city: "City",
    country: "Country",
    cardNumber: "Card Number",
    expiry: "Expiry Date",
    cvv: "CVV",
    total: "Total",
  },
  ar: {
    total: "المجموع",
    title: "إتمام الشراء",
    contact: "معلومات الاتصال",
    shipping: "عنوان الشحن",
    payment: "تفاصيل الدفع",
    placeOrder: "إتمام الطلب",
    email: "البريد الإلكتروني",
    name: "الاسم الكامل",
    address: "العنوان",
    city: "المدينة",
    country: "الدولة",
    cardNumber: "رقم البطاقة",
    expiry: "تاريخ الانتهاء",
    cvv: "CVV",
  },
};

const CheckoutPage = () => {
  const router = useRouter();
  const language = useSelector((state: RootState) => state.language.current);
  const { total } = useSelector((state: RootState) => state.cart);
  const t = translations[language as keyof typeof translations];

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing order:", formData);

    setTimeout(() => {
      router.push("/order-success");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 dark:text-white">{t.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            {t.contact}
          </h3>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.email}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.name}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            {t.payment}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder={t.cardNumber}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder={t.expiry}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder={t.cvv}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold dark:text-white">
            {t.total}: ${total.toFixed(2)}
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md"
          >
            {t.placeOrder}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
