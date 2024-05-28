"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import impro from "public/WebsiteMaterial/Images/Impro1.jpeg";
import ReactPlayer from "react-player";

function Impro_part() {
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
                Tư Vấn & Phát Triển Công Nghệ Tự Động Nâng Cao Chất Lượng Hình
                Ảnh/Video
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Với kinh nghiệm nhiều năm nghiên cứu và phát triển các thuật
                toán xử lý nâng cao chất lượng hình ảnh. Chúng tôi đang sở hữu
                bộ thư viện xử lý nâng cao chất lượng hình ảnh với rất nhiều
                chức năng hiệu quả về mặt nghệ thuật và mạnh mẽ về mặt tốc độ xử
                lý. Chúng tôi sẵn sàng tư vấn và chuyển giao công nghệ cho những
                khách hàng có nhu cầu.
              </p>
            </div>
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a className="mt-8 inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-800">
              Thông tin chi tiết
            </a>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <p className="text-base font-semibold leading-7 text-indigo-600">
            Nâng cao chất lượng hình ảnh
          </p>
          <ReactPlayer
            className="md:max-w-none mx-auto rounded"
            url="../WebsiteMaterial/Videos/improvideo1.mp4"
            width="820"
            height="480"
            playing={true}
            loop={true}
            controls={false}
            muted={true}
            playbackRate={15}
          />

          {/*<figure className="mb-4">
            <ReactPlayer
              className="md:max-w-none mx-auto rounded"
              url="../WebsiteMaterial/Videos/improvideo1.mp4"
              width="820"
              height="480"
              playing={true}
              loop={true}
              controls={false}
              muted={true}
              playbackRate={15}
            />
            <figcaption className="mt-2 text-center">
              Video nhận dạng khuông mặt hướng dẫn viên du lịch
            </figcaption>
          </figure>*/}

          <Image
            className="md:max-w-none mx-auto rounded"
            src={impro}
            width="820"
            height="480"
            alt="impro1"
          />
        </div>
      </div>
    </div>
  );
}

export default Impro_part;
