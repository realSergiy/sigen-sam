enum GradientTypes {
  fullGradient = 'fullGradient',
  bluePinkGradient = 'bluePinkGradient',
}

type Props = {
  gradientType?: GradientTypes;
  disabled?: boolean;
  rounded?: boolean;
  className?: string;
} & React.DOMAttributes<HTMLDivElement>;

export default function GradientBorder({
  gradientType = GradientTypes.fullGradient,
  disabled,
  rounded = true,
  className = '',
  children,
}: Props) {
  return (
    <div
      className={`border-2 border-transparent ${
        gradientType === GradientTypes.fullGradient
          ? 'bg-size-100-400 bg-rainbow-gradient transition-background-position duration-350'
          : 'bg-blue-pink-gradient'
      } ${!disabled && 'hover:bg-pos-300-100'} ${disabled && 'opacity-30'} ${
        rounded && 'rounded-full'
      } ${className}`}
    >
      {children}
    </div>
  );
}
