import type { Metadata } from "next";
import Notes from "@/components/notes/Notes";

export const metadata: Metadata = {
  title: "Handwritten Notes — Namaste AI",
  description:
    "Explore visual collection of handwritten notes, key concepts, diagrams, and learning takeaways from Namaste AI course by Akshay Saini from NamasteDev",
};

const Page = () => {
  return <Notes />;
};

export default Page;
