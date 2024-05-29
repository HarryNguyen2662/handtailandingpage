import Image from "next/image";
import logo from "public/logo.png";
import mophong123 from "public/WebsiteMaterial/Images/120mophongimage.png";
import nguoi4 from "public/WebsiteMaterial/Images/Quang Minh.jpg";
import nguoi2 from "public/WebsiteMaterial/Images/Thay Chien.jpeg";
import { Balancer } from "react-wrap-balancer";

import { HeroSection } from "~/islands/marketing/hero-section";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { redirect } from "~/navigation";

import Content from "./content.mdx";

export default function TermsPage() {
  return (
    <>
      <GeneralShell>
        <section
          aria-labelledby="hero-heading"
          className="mx-auto mb-2 mt-8 flex w-full flex-col items-center justify-center gap-4 pt-10 text-center"
          id="hero"
        >
          <>
            <Balancer
              as="h1"
              className="mt-4 bg-gradient-to-br from-primary/60 from-10% via-primary/90 via-30% to-primary to-90% bg-clip-text font-heading text-2xl leading-[1.1] tracking-tighter text-transparent dark:from-zinc-400 dark:via-zinc-300 dark:to-zinc-600 sm:text-2xl md:text-3xl xl:text-4xl"
            >
              <Image
                className="md:max-w-none mx-auto rounded"
                src={logo}
                width="250"
                height="212"
                alt="Logo"
              />
              <span className="block max-w-5xl">
                Hệ Thống Phần Mềm Hỗ Trợ Học Viên Và Giáo Viên Trong Hoạt Động
                Ôn Luyện 120 Tình Huống Mô Phỏng Giao Thông
              </span>
            </Balancer>
          </>
        </section>
        <Image
          className="md:max-w-none mx-auto rounded"
          src={mophong123}
          width="1020"
          height="580"
          alt="nhandang2"
        />
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
