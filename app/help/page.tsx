"use client";

import { useMemo, useState } from "react";
import BrowseTopicsSection from "@/components/Help-sections/BrowseTopicsSection";
import HelpFaqSection from "@/components/Help-sections/HelpFaqSection";
import HelpHero from "@/components/Help-sections/HelpHero";
import TalkToHumanSection from "@/components/Help-sections/TalkToHumanSection";
import { helpCategories } from "./helpContent";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    const firstMatch = helpCategories
      .flatMap((category) => category.items)
      .find((item) =>
        item.question.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );

    if (firstMatch) {
      const el = document.getElementById(`faq-${firstMatch.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.getElementById("help-faq")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = useMemo(() => helpCategories, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <HelpHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />
      <BrowseTopicsSection categories={categories} />
      <div id="help-faq">
        <HelpFaqSection categories={categories} searchQuery={searchQuery} />
      </div>
      <TalkToHumanSection />
    </div>
  );
}
