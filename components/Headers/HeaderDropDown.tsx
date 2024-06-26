import { useLoadLanguage } from '@/store/context/LanguageContext'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface DropdownProps {
  theme: string
}

function Dropdown({ theme }: DropdownProps) {
  const handleLogout = () => {
    signOut()
  }
  const { language } = useLoadLanguage()

  return (
    <div
      className={`absolute left-[2.5rem] top-[4.5rem] flex w-[11rem] animate-slideDown flex-col overflow-hidden rounded-md border border-solid p-[0.5rem] text-center sm:left-[5rem] sm:top-[-9rem] sm:w-[10rem] md:left-[2.5rem] ${
        theme === 'normal'
          ? 'border-var-gray3 bg-var-white'
          : 'border-var-black1 bg-var-black1 text-white'
      } shadow-lg`}
    >
      <Link
        href="/mypage"
        className={`block w-full rounded-[0.4rem] px-4 py-[1rem] text-left text-[1.6rem] hover:bg-var-violet sm:text-[1.3rem] ${theme === 'normal' ? '' : 'hover:text-var-black3'}`}
      >
        {language === 'ko' ? '내 정보' : 'My Page'}
      </Link>
      <Link
        href="/mydashboard"
        className={`block w-full rounded-[0.4rem] px-4 py-[1rem] text-left text-[1.6rem] hover:bg-var-violet sm:text-[1.3rem] ${theme === 'normal' ? '' : 'hover:text-var-black3'}`}
      >
        {language === 'ko' ? '내 대시보드' : 'Dashboard'}
      </Link>
      <button
        type="button"
        className={`border-t-block w-full rounded-[0.4rem] px-4 py-[1rem] text-left text-[1.6rem] hover:bg-var-violet sm:text-[1.3rem] ${theme === 'normal' ? '' : 'hover:text-var-black3'}`}
        onClick={handleLogout}
      >
        {language === 'ko' ? '로그아웃' : 'Logout'}
      </button>
    </div>
  )
}

export default Dropdown
