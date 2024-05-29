"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PuzzlePieceIcon, TruckIcon } from "@heroicons/react/20/solid";
import mophong120 from "public/WebsiteMaterial/Images/mophong120.png";
import tictactoe from "public/WebsiteMaterial/Images/TicTacToe_AI.png";

function Didong_part() {
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
                Tư Vấn & Phát Triển Ứng Dụng Di Động
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Chúng tôi có kinh nghiệm trong xây dựng và phát hành một số ứng
                dụng trên Apple Store & Google Play trong lĩnh vực Giáo dục và
                Game phát triển tư duy. Cụ thể:
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
                      Phát hành ứng dụng giáo dục “Luyện Thi Mô Phỏng 120 Tình
                      Huống”. Có chức năng hỗ trợ học viên học lái xe ô tô ôn
                      luyện 120 tình huống mô phỏng giao thông để vượt qua kỳ
                      thi lấy giấy phép lái xe, kết nối và chia sẻ dữ liệu học
                      tập với giáo viên phụ trách, cung cấp các công cụ phân
                      tích thống kê để đánh giá tiến trình và chất lượng học tập
                      của học viên, giúp tăng tỷ lệ đậu khi vào thi sát hạch.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <PuzzlePieceIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Phát hành trò chơi “Caro Thông Minh" giúp trẻ giải trí
                      nhưng cũng đồng thời rèn luyện tư duy trong quá trình
                      chơi. Trò chơi luôn được xếp hạng ở top trên bản xếp hạng
                      của cả Apple Store lấn Google Play từ năm 2018 đến nay.
                    </span>
                  </li>
                </ul>
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
            Các ứng dụng di động
          </p>
          <Image
            className="md:max-w-none mx-auto rounded"
            src={mophong120}
            width="820"
            height="480"
            alt="nhandang2"
          />

          <Image
            className="md:max-w-none mx-auto rounded"
            src={tictactoe}
            width="820"
            height="480"
            alt="nhandang1"
          />
        </div>
      </div>
    </div>
  );
}

export default Didong_part;
