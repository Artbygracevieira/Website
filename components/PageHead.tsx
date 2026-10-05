import type { ReactNode } from "react";
import Flower, { Leaf } from "./Flower";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  wall?: "terracotta" | "pink" | "teal" | "mustard" | "sky" | "orange" | "paper";
  children?: ReactNode;
};

// Colored "wall" header used at the top of inner pages.
export default function PageHead({ eyebrow, title, lead, wall = "mustard", children }: Props) {
  return (
    <section className={`page-head wall-${wall}`}>
      <Flower className="deco spin-slow" size={150} color="var(--paper)" center="var(--rose)" style={{ right: "6%", top: "-36px" }} />
      <Leaf className="deco" size={70} rotate={30} style={{ right: "17%", bottom: "26px" }} />
      <Flower className="deco bob" size={60} color="var(--pink)" center="var(--mustard)" petals={6} style={{ right: "3%", bottom: "36px" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="eyebrow rise">{eyebrow}</div>
        <h1 className="rise d1">{title}</h1>
        {lead && <p className="lead rise d2">{lead}</p>}
        {children && <div className="rise d3" style={{ marginTop: 26, position: "relative", zIndex: 1 }}>{children}</div>}
      </div>
    </section>
  );
}
