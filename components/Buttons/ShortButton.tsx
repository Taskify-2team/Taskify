/* eslint-disable react/button-has-type */
import Link from 'next/link'
import { ButtonHTMLAttributes } from 'react'

interface ShortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  color: 'white' | 'purple'
  isDisabled?: boolean
  link?: string
  isGrowInMo?: boolean
  className?: string
}

export default function ShortButton({
  text,
  color,
  type = 'button',
  onClick,
  isDisabled,
  link,
  isGrowInMo,
  className = '',
}: ShortButtonProps) {
  const colorVariants = {
    white: 'border border-solid border-var-gray3 bg-var-white text-primary-violet',
    purple: 'bg-primary-violet text-var-white',
  }

  if (link) {
    return (
      <Link
        href={link}
        className={`${isDisabled ? 'button-disabled' : colorVariants[color]} inline-block w-[8.4rem] cursor-pointer rounded-[0.4rem] py-[0.7rem] text-center text-[1.4rem] leading-tight`}
      >
        {text}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`${className} ${isGrowInMo ? 'sm:grow' : ''} ${isDisabled ? 'button-disabled' : colorVariants[color]} inline-block w-[8.4rem] cursor-pointer rounded-[0.4rem] py-[0.7rem] text-center text-[1.4rem] leading-tight sm:text-[1.2rem]`}
    >
      {text}
    </button>
  )
}
