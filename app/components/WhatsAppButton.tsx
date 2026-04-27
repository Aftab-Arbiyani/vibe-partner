"use client";

const WHATSAPP_NUMBER = "919999999999"; // replace with your number in international format, no + or spaces
const WHATSAPP_MESSAGE = "Hi! I found VibePartner and I'd like to know more.";

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ background: "#25D366" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="30"
        height="30"
        fill="white"
        aria-hidden="true"
      >
        <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.96 6.88 2.64 9.73L4 44l10.53-2.6A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36c-3.27 0-6.34-.9-8.97-2.46l-.64-.38-6.25 1.54 1.57-6.07-.42-.67A15.93 15.93 0 0 1 8 24c0-8.84 7.16-16 16-16s16 7.16 16 16-7.16 16-16 16zm8.77-11.87c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.02-.74-3.85-2.36-1.42-1.27-2.38-2.83-2.66-3.31-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.01-.6-.02-.92-.02-.32 0-.84.12-1.28.6-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z" />
      </svg>
    </a>
  );
}
