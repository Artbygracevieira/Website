"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { type Artwork, formatPrice } from "@/lib/artworks";

// Every piece is one of one, so the cart is just a list of slugs (no quantities).

type CartCtx = {
  items: string[];
  pieces: Artwork[];
  clear: () => void;
  open: boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "abgv-cart";

// `pieces` comes from the server with live Square prices and availability.
export function CartProvider({ children, pieces }: { children: ReactNode; pieces: Artwork[] }) {
  const [items, setItems] = useState<string[]>([]);
  const bySlug = (slug: string) => pieces.find((p) => p.slug === slug);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved.filter((s) => bySlug(s)?.available));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (slug: string) => {
    setItems((cur) => (cur.includes(slug) ? cur : [...cur, slug]));
    setOpen(true);
  };
  const remove = (slug: string) => setItems((cur) => cur.filter((s) => s !== slug));
  const clear = () => setItems([]);

  return (
    <Ctx.Provider value={{ items, pieces, clear, open, add, remove, setOpen }}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function CartButton() {
  const { items, setOpen } = useCart();
  return (
    <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Cart, ${items.length} item${items.length === 1 ? "" : "s"}`}>
      Cart <span className="count">{items.length}</span>
    </button>
  );
}

export function AddToCart({ slug }: { slug: string }) {
  const { items, add } = useCart();
  const inCart = items.includes(slug);
  return (
    <button className="btn" style={{ width: "100%", padding: 20, fontSize: 17 }} onClick={() => add(slug)} disabled={inCart}>
      {inCart ? "In your cart" : <>Add to cart <span className="arrow">→</span></>}
    </button>
  );
}

function CartDrawer() {
  const { items, pieces: all, open, remove, setOpen } = useCart();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  if (!open) return null;

  const pieces = items.map((s) => all.find((p) => p.slug === s)).filter(Boolean);
  const subtotal = pieces.reduce((n, a) => n + (a?.price ?? 0), 0);

  async function checkout() {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.gone) data.gone.forEach((s: string) => remove(s));
      if (data.url) window.location.href = data.url;
      else setMsg(data.message || "Checkout isn't available yet.");
    } catch {
      setMsg("Something went wrong. Please try again.");
    }
    setBusy(false);
  }

  return (
    <>
      <div className="shade" onClick={() => setOpen(false)} />
      <aside className="drawer" aria-label="Your cart">
        <header>
          <h3>Your cart</h3>
          <button className="close" onClick={() => setOpen(false)}>Close</button>
        </header>
        {pieces.length === 0 && <p className="empty">Nothing here yet.</p>}
        {pieces.map((a) =>
          a ? (
            <div className="line" key={a.slug}>
              <Image src={a.image} alt={a.title} width={80} height={80} />
              <div>
                <h4>{a.title}</h4>
                <div className="sub">{a.size}, {a.medium.toLowerCase()}</div>
                <button className="remove" onClick={() => remove(a.slug)}>Remove</button>
              </div>
              <strong>{formatPrice(a.price)}</strong>
            </div>
          ) : null
        )}
        <div className="total">
          <div className="row big"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="row" style={{ color: "var(--muted)", fontSize: 14 }}>
            <span>Shipping and tax</span><span>At checkout</span>
          </div>
          <button className="btn" style={{ width: "100%", marginTop: 16, padding: 18 }} onClick={checkout} disabled={busy || pieces.length === 0}>
            {busy ? "One moment..." : "Check out"}
          </button>
          {msg && <p className="note" role="status">{msg}</p>}
          <p className="note">Payments are handled securely by Square.</p>
        </div>
      </aside>
    </>
  );
}
