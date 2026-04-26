"use client";

interface Props {
  price: number; // in cents
  onBuyNow: () => void;
}

export default function PurchaseButton({ price, onBuyNow }: Props) {
  return (
    <button
      onClick={onBuyNow}
      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
    >
      Buy Now — ${(price / 100).toFixed(0)}
    </button>
  );
}
