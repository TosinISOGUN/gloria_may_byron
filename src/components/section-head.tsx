import type { ReactNode } from "react";

type Props = {
  title: string;
  sub?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Section heading with her own supporting line and an optional action on the right. */
export function SectionHead({ title, sub, action, as: Tag = "h2", className }: Props) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-10 gap-y-5 ${className ?? ""}`}>
      <div>
        <Tag className="display-lg max-w-[18ch]">{title}</Tag>
        {sub && <p className="lead mt-4">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
