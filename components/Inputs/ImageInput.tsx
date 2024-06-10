import Image from 'next/image'
import addButton from '@/public/icons/addLogo.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import InputLayout from './InputLayout'

interface ImageInputProps {
  currentImage?: string
  id: string
  label: string
  isRequired?: boolean
  size: 's' | 'm'
  onChange: (file: File) => void
}

export default function ImageInput({
  currentImage = '',
  size,
  id,
  label,
  isRequired = false,
  onChange,
}: ImageInputProps) {
  const [preview, setPreview] = useState(currentImage)

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  useEffect(() => {
    setPreview(currentImage)
  }, [currentImage])

  return (
    <InputLayout id={id} label={label} isRequired={isRequired}>
      <div
        className={`${size === 'm' ? 'size-[18.2rem]' : 'size-[7.6rem]'} relative flex size-[18.2rem] shrink-0 items-center justify-center overflow-hidden rounded-[0.6rem] bg-var-gray2`}
      >
        <div className="relative size-[3rem]">
          <Image fill src={addButton} alt="이미지 추가 버튼 이미지" />
        </div>
        {preview && (
          <div>
            <Image fill src={preview} alt="프로필 이미지" />
          </div>
        )}
        <input
          type="file"
          onChange={handleChangeFile}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </InputLayout>
  )
}