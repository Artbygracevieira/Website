import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Brooklyn artist Grace Vieira.",
};

export default function Contact() {
  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <div className="eyebrow">Contact</div>
      <h1>Say hello</h1>
      <p className="lead" style={{ marginTop: 12, marginBottom: 36 }}>
        Questions about a painting, shipping, or an event? Send a note and Grace will get back to you.
        You can also reach her on Instagram at{" "}
        <a href={site.instagram} className="link" target="_blank" rel="noreferrer">{site.instagramHandle}</a>.
      </p>
      <ContactForm />
    </div>
  );
}
