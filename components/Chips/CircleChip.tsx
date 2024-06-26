interface CircleChipProps {
  color: string
}

export default function CircleChip({ color }: CircleChipProps) {
  return (
    <div
      className="h-[0.8rem] w-[0.8rem] shrink-0 rounded-full"
      style={{ backgroundColor: color }}
    />
  )
}
