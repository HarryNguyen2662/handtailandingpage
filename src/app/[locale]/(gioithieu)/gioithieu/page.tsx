import Image from "next/image";
import nguoi1 from "public/WebsiteMaterial/Images/Huu Tai.jpg";
import nguoi4 from "public/WebsiteMaterial/Images/Quang Minh.jpg";
import nguoi2 from "public/WebsiteMaterial/Images/Thay Chien.jpeg";
import nguoi3 from "public/WebsiteMaterial/Images/Thay Sinh.png";
import { Balancer } from "react-wrap-balancer";

import { HeroSection } from "~/islands/marketing/hero-section";
import { GeneralShell } from "~/islands/wrappers/general-shell";

export default function BlogPage() {
  return (
    <>
      <GeneralShell>
        <section
          aria-labelledby="hero-heading"
          className="mx-auto mb-2 mt-8 flex w-full flex-col items-center justify-center gap-4 pt-10 text-center"
          id="hero"
        >
          <HeroSection />
          <Balancer
            as="p"
            className="!max-w-5xl text-base leading-normal text-primary/90 sm:text-lg sm:leading-7"
          >
            Chúng tôi có một đội ngũ chuyên gia được đào tạo từ các nước Canada,
            Đài Loan, Nhật Bản, với bề dày kinh nghiệm trong lĩnh vực nghiên cứu
            và phát triển các hệ thống AI và IoT
          </Balancer>
        </section>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
              <div>
                <Image
                  className="md:max-w-none mx-auto rounded"
                  src={nguoi1}
                  width="420"
                  height="280"
                  alt="nhandang2"
                />
              </div>
              <div className="text-center py-8 sm:py-6">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  TS. Nguyễn Hữu Tài
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Sáng lập viên
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Giám đốc điều hành
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Trưởng bộ phận AI & IoT
                </p>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
              <div>
                <Image
                  className="md:max-w-none mx-auto rounded"
                  src={nguoi3}
                  width="320"
                  height="280"
                  alt="nhandang2"
                />
              </div>
              <div className="text-center py-8 sm:py-6">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  TS. Đỗ Sính
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Sáng lập viên
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Cố vấn marketing
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Cố vấn team IoT
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Chuyên gia AT & IoT
                </p>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
              <div>
                <Image
                  className="md:max-w-none mx-auto rounded"
                  src={nguoi2}
                  width="250"
                  height="250"
                  alt="nhandang2"
                />
              </div>
              <div className="text-center py-8 sm:py-6">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  TS. Lê Đình Chiến
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Sáng lập viên
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Trưởng team AI
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Chuyên gia AI & IoT
                </p>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
              <div>
                <Image
                  className="md:max-w-none mx-auto rounded"
                  src={nguoi4}
                  width="320"
                  height="280"
                  alt="nhandang2"
                />
              </div>
              <div className="text-center py-8 sm:py-6">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  Lê Quang Minh
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Sáng lập viên
                </p>
                <p className="text-base text-gray-600 font-normal">
                  • Giám đốc marketing tại thị trường Nhật Bản
                </p>
              </div>
            </div>
          </div>
        </section>
      </GeneralShell>
    </>
  );
}
