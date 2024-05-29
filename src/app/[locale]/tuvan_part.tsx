"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TruckIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import xetai1 from "public/WebsiteMaterial/Images/xetai1.png";
import xetai2 from "public/WebsiteMaterial/Images/xetai2.png";
import xetai3 from "public/WebsiteMaterial/Images/xetai3.png";
import xetai4 from "public/WebsiteMaterial/Images/xetai4.png";

function Tuvan_part() {
  const [valuevideo, setValuevideo] = useState(true);
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="sticky top-0 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              {/*<p className="text-base font-semibold leading-7 text-indigo-600">
                Deploy faster
              </p>*/}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Tư Vấn & Phát Triển Ứng Dụng Đánh Giá Chất Lượng Sản Phẩm
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Với kinh nghiệm thu được từ quá trình phát triển các Mô hình AI
                đánh giá chất lượng của container:
              </p>
            </div>
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                {/*<p>
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                  risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                  Id dolor praesent donec est. Odio penatibus risus viverra
                  tellus varius sit neque erat velit. Faucibus commodo massa
                  rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                  mauris semper sed amet vitae sed turpis id.
                </p>*/}
                {/* biome-ignore lint/a11y/noRedundantRoles: <explanation> */}
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <TruckIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Nhận dạng hàng chục loại hư hỏng hay biến dạng của các bộ
                      phận trên container. Phân loại mức độ hư hỏng theo nhiều
                      cấp độ theo tiêu chuẩn quốc tế với độ đo chính xác.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <TruckIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Phân loại các mức độ rỉ sét của các mặt panel hay mức độ
                      trầy xướt, vấy bẩn của mặt sàn.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Chúng tôi tự tin sẽ mang lại cho Khách hàng giải pháp tự động
                  hoá quy trình đánh giá chất lượng của sản phẩm với độ chính
                  xác cao và chi phí hợp lý.
                </p>
              </div>
            </div>
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a className="mt-8 inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-800">
              Thông tin chi tiết
            </a>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Đánh giá chất lượng Container
          </p>
          <Image
            className="md:max-w-none mx-auto rounded"
            src={xetai1}
            width="820"
            height="480"
            alt="nhandang1"
          />

          <Image
            className="md:max-w-none mx-auto rounded"
            src={xetai2}
            width="820"
            height="480"
            alt="nhandang2"
          />
          <Image
            className="md:max-w-none mx-auto rounded"
            src={xetai3}
            width="820"
            height="480"
            alt="nhandang3"
          />
          <Image
            className="md:max-w-none mx-auto rounded"
            src={xetai4}
            width="820"
            height="480"
            alt="nhandang2"
          />
        </div>
      </div>
    </div>
  );
}

export default Tuvan_part;
