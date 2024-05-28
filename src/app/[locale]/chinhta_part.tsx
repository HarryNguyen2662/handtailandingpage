"use client";

import React from "react";
import ReactPlayer from "react-player";

function Nhandang_part() {
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
                Tư Vấn & Phát Triển Công Nghệ Kiểm Tra Chính Tả - Lọc Nội Dung
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Với kinh nghiệm xây dựng và phát triển lõi công nghệ phân tích
                nội dung, tạo nên phần mềm kiểm tra và sửa chữa lỗi chính tả,
                dưới dạng Add-In tích hợp vào Microsoft Word. Phần mềm có thể
                phân tích ngữ nghĩa để tìm ra các lỗi chính tả và đề xuất phương
                án sửa chữa thay thế từ hay cụm từ, với độ chính xác cao, với
                nhiều điểm ưu việt khi so sánh với các phần mềm kiểm tra chính
                tả Tiếng Việt hiện có.
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
                <p className="mt-8">
                  Với sự bùng nổ của nhiều loại hình mạng xã hội như hiện nay,
                  nhu cầu tự động phân tích nội dụng được tạo ra bởi người dùng
                  đang ngày càng trở nên bức thiết hơn bao giờ hết, nhằm đảm bảo
                  duy trì một môi trường mạng xã hội lành mạnh và có văn hóa.
                  Với công nghệ và kinh nghiệm của mình, chúng tôi tin rằng sẽ
                  tư vấn và xây dựng cho khách hàng giải pháp công nghệ tốt
                  nhất, hiệu quả nhất về mặt chất lượng cũng như chi phí vận
                  hành.
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
            Phần mềm sửa lỗi chính tả Tiếng Việt
          </p>
          <ReactPlayer
            className="md:max-w-none mx-auto rounded"
            url="../WebsiteMaterial/Videos/Vnspellchecker_video.mp4"
            width="820"
            height="480"
            playing={true}
            loop={true}
            controls={false}
            playbackRate={2}
          />
        </div>
      </div>
    </div>
  );
}

export default Nhandang_part;
