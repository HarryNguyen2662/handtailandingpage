import React from "react";
import { cn } from "~/utils";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

import { buttonVariants } from "~/islands/primitives/button";
import { Link } from "~/navigation";

function ContactInfo() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Liên hệ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Địa chỉ</h3>
            <p className="text-gray-600">
              123 Lý Đạo Thành, Quận Sơn Trà, TP. Đà Nẵng
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Liên hệ</h3>
            <p className="text-gray-600">Điện thoại: 0905103928</p>
            <p className="text-gray-600">Email: contact@htaitech.net</p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Theo dõi chúng tôi:
          </h3>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="email@example.com"
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              &#9993; {/* Unicode envelope symbol */}
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-1">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "ghost",
              }),
            )}
          >
            <Facebook className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "ghost",
              }),
            )}
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">X (known as Twitter)</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "ghost",
              }),
            )}
          >
            <Youtube className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "ghost",
              }),
            )}
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">X (known as Twitter)</span>
          </Link>
          {/* UNCOMMENT AS NEEDED & ADD <Room /> TO LocaleLayout */}
          {/* {env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY !== null &&
                env.DEV_DEMO_NOTES === "true" && <ExtraContent />} */}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          © 2024 CÔNG TY TNHH MTV CÔNG NGHỆ TRÍ TUỆ NHÂN TẠO H&T. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
