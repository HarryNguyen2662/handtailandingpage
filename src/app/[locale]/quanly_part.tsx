"use client";

import React from "react";
import {
  ArchiveBoxArrowDownIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  VideoCameraIcon,
} from "@heroicons/react/20/solid";
import ReactPlayer from "react-player";

function Quanly_part() {
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
                Tư Vấn & Phát Triển Hệ Thống Quản Lý Video (Video Management
                System)
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Với kinh nghiệm xây dựng và phát triển hệ thống quản lý video,
                gọi tắt là VMS, chúng tôi đã làm chủ công nghệ thu nhận video
                streaming từ các camera giám sát, lưu trữ và tái phân phối đến
                các dịch vụ xử lý AI và khách hàng xem live stream hoặc tìm
                kiếm. Cụ thể:
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
                    <VideoCameraIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Giải mã luồng video truyền về từ các camera theo thời gian
                      thực, tích hợp giải phát chống rớt gói tin để tránh hiệnt
                      ượng mất block trong hình ảnh, đứng hình.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ArchiveBoxArrowDownIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Lưu trữ video phục vụ tìm kiếm.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ComputerDesktopIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Live Streaming hình ảnh của camera phục vụ khách hàng xem
                      live.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CpuChipIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                      <strong className="font-semibold text-gray-900"></strong>{" "}
                      Tái phân phối video đến các dịch vụ AI để xử lý nhận dạng
                      theo thời gian thực.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Thư viện công nghệ mà chúng tôi xây dựng cho hiện quả tối ưu
                  về mặt chất lượng hình ảnh cũng như chi phí phần cứng phải đầu
                  tư. Nó thể hiện nhiều ưu việt so với các thư viện phổ biến như
                  OpenCV, Gstreamer,..
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
            VMS
          </p>
          <ReactPlayer
            className="md:max-w-none mx-auto rounded"
            url="../WebsiteMaterial/Videos/VMS_system.mp4"
            width="820"
            height="480"
            playing={true}
            loop={true}
            controls={false}
            playbackRate={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Quanly_part;
