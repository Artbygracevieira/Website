import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import PageHead from "@/components/PageHead";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Brooklyn artist Grace Vieira.",
};

export default function Contact() {
  return (
    <>
      <PageHead wall="sky" eyebrow="Contact" title={<>Say <em>hello</em></>}
        lead={<>Questions about a painting, shipping, or an event? Send a note and Grace will get back to you.
          You can also reach her on Instagram at{" "}
          <a href={site.instagram} className="link" target="_blank" rel="noreferrer">{site.instagramHandle}</a>.</>} />
      <div className="wrap" style={{ maxWidth: 760, padding: "64px var(--px) 96px" }}>
        <ContactForm />
      </div>
    </>
  );
}
