"use client"

import { Input } from "./input"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <div className="flex gap-2 items-center">
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-10 p-1 cursor-pointer"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className={className}
      />
    </div>
  )
}