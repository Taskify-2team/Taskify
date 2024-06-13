import { AppLayout, MyDashBoardList, InviteList } from '@/components'
import { useLoadTheme } from '@/store/context/ThemeContext'

export default function MyDashBoard() {
  const { theme } = useLoadTheme()

  return (
    <AppLayout>
      <div className="flex w-[102.2rem] max-w-[calc(100vw-30rem)] flex-col p-[2rem] sm:max-w-[calc(100vw-6.7rem)] md:max-w-[calc(100vw-16rem)]">
        <MyDashBoardList />
        <div
          className={`mt-[3rem] flex w-full flex-col gap-[2rem] rounded-[0.8rem] ${theme === 'normal' ? 'bg-var-white' : 'bg-var-black2'} px-[2.8rem] py-[3rem]`}
        >
          <p
            className={`text-[2.4rem] font-bold ${theme === 'normal' ? 'text-var-black4' : 'text-var-white'}`}
          >
            초대받은 대시보드
          </p>
          <InviteList />
        </div>
      </div>
    </AppLayout>
  )
}
