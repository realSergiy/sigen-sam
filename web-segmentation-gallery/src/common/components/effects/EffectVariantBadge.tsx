type Props = {
  label: string;
};

export default function VariantBadge({ label }: Props) {
  return (
    <div className="absolute right-1 top-1 rounded-[6px] bg-[#280578] px-1 py-1 text-[9px] font-bold tabular-nums text-[#D2D2FF]">
      {label}
    </div>
  );
}
