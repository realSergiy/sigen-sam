type CarouselContainerShadowProps = {
  isTop: boolean;
};

const edgeColor = 'rgba(55, 62, 65, 1)';
const transitionColor = 'rgba(55, 62, 65, 0.2)';

export function CarouselContainerShadow({
  isTop,
}: CarouselContainerShadowProps) {
  return (
    <div
      className={`pointer-events-none absolute h-8 w-full`}
      style={{
        background: `linear-gradient(${isTop ? `${edgeColor}, ${transitionColor}` : `${transitionColor}, ${edgeColor}`})`,
        top: isTop ? 0 : undefined,
        bottom: isTop ? undefined : 0,
      }}
    />
  );
}
