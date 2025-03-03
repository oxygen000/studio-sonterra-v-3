"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/store/languageSlice";
import { ShoppingBag, Globe, User } from "lucide-react";
import { RootState } from "@/store/store";
import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.current);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-yellow-500">
          Studio Sonterra
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => dispatch(setLanguage(language === "en" ? "ar" : "en"))}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-yellow-500"
            >
              <Globe size={20} />
              {language.toUpperCase()}
            </button>
            <ThemeToggle />
            <Link href="/cart" className="relative">
              <ShoppingBag size={24} className="text-gray-600 dark:text-gray-300 hover:text-yellow-500" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <i><Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500"><User/></Link></i>
          </div>
        </div>
      </div>
    </nav>
  );
};
