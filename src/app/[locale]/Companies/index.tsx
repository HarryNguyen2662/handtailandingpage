"use client";

import React from "react";
import Image from "next/image";

import withAnimation from "../About/HOCs/withAnimation";
import SectionTitle from "../About/SectionTitle";
import airbnb from "./airbnb.png";
import facebook from "./facebook.png";
import hub from "./hub.png";
import microsoft from "./microsoft.png";
import tinder from "./tinder.png";

const Companies = () => {
  const featuredCompanies = [facebook, airbnb, tinder, microsoft, hub];
  const renderCompanies = featuredCompanies.map((company, index) => (
    <div key={index}>
      <Image className="" src={company} alt="company.fileName" key={index} />
    </div>
  ));

  return (
    <section className="my-10 md:my-32">
      <SectionTitle
        title="As featured In"
        caption="Pellentesque venenatis scelerisque"
      />
      <p className="text-gray-500 text-center max-w-xl mx-auto leading-relaxed">
        As featured in the following companies
      </p>
      <div className="flex items-center justify-center flex-wrap gap-11 mt-12 md:flex-nowrap">
        {/*renderCompanies*/}
        <Image className="" src={facebook} alt="Photocompany" />
        <Image className="" src={airbnb} alt="Photocompany" />
        <Image className="" src={tinder} alt="Photocompany" />
        <Image className="" src={microsoft} alt="Photocompany" />
        <Image className="" src={hub} alt="Photocompany" />
      </div>
    </section>
  );
};

export default withAnimation(Companies);
