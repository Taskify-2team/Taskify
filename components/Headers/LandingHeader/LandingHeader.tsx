import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/images/taskuitLogo_main.png'
import { useLoadTheme } from '@/store/context/ThemeContext'
import { useLoadLanguage } from '@/store/context/LanguageContext'
import themeIcon from '@/public/icons/brightness_89411.svg'
import themeIconWhite from '@/public/icons/brightnessWhite.svg'
import translateIcon from '@/public/icons/translateIcon.svg'
import translateIconWhite from '@/public/icons/translateIconWhite.svg'
import HeaderButton from '../DashBoardHeader/buttons/HeaderButton'

export default function LightHeader() {
  const [isLogoFontVisible, setIsLogoFontVisible] = useState(true)
  const { handleSetTheme, theme } = useLoadTheme()
  const { language, handleSetLanguage } = useLoadLanguage()

  useEffect(() => {
    const updateLogoFont = () => {
      if (window.innerWidth < 400) {
        setIsLogoFontVisible(false)
      } else {
        setIsLogoFontVisible(true)
      }
    }
    window.addEventListener('resize', updateLogoFont)
    updateLogoFont()

    return () => window.removeEventListener('resize', updateLogoFont)
  }, [])

  return (
    <div
      className={`flex h-[7rem] w-full items-center justify-between ${theme === 'normal' ? 'bg-var-white' : 'bg-var-black2 text-white'} sm:px-[2.4rem] sm:py-[1.6rem] md:px-[4rem] lg:px-[8rem]`}
    >
      <Link href="/">
        <div className="flex items-center gap-[1rem]">
          <Image src={logo} height={39} alt="라이트 헤더 로고" />
          {isLogoFontVisible && (
            <p className="font-[logo] text-[2.5rem] font-bold text-primary-violet sm:hidden">
              Taskuit
            </p>
          )}
        </div>
      </Link>
      <div className="flex items-center gap-[1.6rem] sm:gap-[1rem]">
        <HeaderButton
          buttonIcon={theme === 'normal' ? translateIcon : translateIconWhite}
          buttonName={language === 'ko' ? '언어' : 'Language'}
          handleOnClick={handleSetLanguage}
        />
        <HeaderButton
          buttonIcon={theme === 'normal' ? themeIcon : themeIconWhite}
          buttonName={language === 'ko' ? '테마' : 'Theme'}
          handleOnClick={handleSetTheme}
        />
        <Link href="/login" className="mx-[2rem] sm:ml-[1rem] sm:mr-0">
          <p className="text-[1.6rem]">{language === 'ko' ? '로그인' : 'Login'}</p>
        </Link>
        <Link href="/signup">
          <p className="text-[1.6rem]">{language === 'ko' ? '회원가입' : 'Singup'}</p>
        </Link>
      </div>
    </div>
  )
}
