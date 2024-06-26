import Image from 'next/image'
import addLogo from '@/public/icons/addLogo.svg'
import { ButtonHTMLAttributes } from 'react'
import { useLoadTheme } from '@/store/context/ThemeContext'
import { useLoadLanguage } from '@/store/context/LanguageContext'

export default function CreateColumnButton({ onClick }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { theme } = useLoadTheme()
  const { language } = useLoadLanguage()

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[7rem] w-[35.4rem] cursor-pointer items-center justify-center gap-[1.2rem] rounded-[0.6rem] border border-solid sm:w-full ${theme === 'normal' ? 'border-var-gray3 bg-var-white' : 'border-var-black2 bg-var-black2'} lg:w-[35.4rem]`}
    >
      <p
        className={`text-nowrap text-[1.8rem] font-bold ${theme === 'normal' ? 'text-var-black' : 'text-var-white'}`}
      >
        {language === 'ko' ? '새로운 컬럼 추가하기' : 'Adding a new Column'}
      </p>
      <div className="relative h-[2.2rem] w-[2.2rem] rounded-[0.4rem] border-var-gray3 bg-var-violet p-[0.3rem]">
        <Image src={addLogo} alt="더하기 이미지" fill />
      </div>
    </button>
  )
}
