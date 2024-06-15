/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react'
import { CircleChip } from '@/components'
import { openModal } from '@/store/reducers/modalReducer'
import { useLoadTheme } from '@/store/context/ThemeContext'
import { useAppDispatch, useAppSelector } from '@/hooks/useApp'
import { useRouter } from 'next/router'
import useAsync from '@/hooks/useAsync'
import { getDashBoardInfo } from '@/service/dashboards'

interface DashBoardColumnHeaderProps {
  columnTitle: string
  columnId: number
}

export default function DashBoardColumnHeader({
  columnTitle,
  columnId,
}: DashBoardColumnHeaderProps) {
  const router = useRouter()
  const { dashboardId } = router.query
  const cardLength = useAppSelector((state) => state.card.totalCount[columnId])
  const renderCardLength = useAppSelector((state) => state.card.cardList[columnId])
  const dispatch = useAppDispatch()
  const { requestFunction } = useAsync(getDashBoardInfo)
  const [isMyDashBoard, setIsMyDashBoard] = useState(false)
  const { theme } = useLoadTheme()
  const [iconColor, setIconColor] = useState(false)

  const handleLoadDashBoard = useCallback(async () => {
    const result = await requestFunction(Number(dashboardId))
    setIsMyDashBoard(result.createdByMe)
  }, [dashboardId, requestFunction])

  useEffect(() => {
    handleLoadDashBoard()
  }, [handleLoadDashBoard])

  return (
    <div className="mb-[0.9rem] flex items-center justify-between">
      <div className="flex w-[calc(100%-3rem)] items-center gap-[0.8rem]">
        <CircleChip color="#5534DA" />
        <h3
          className={`ellipsis mr-[0.4rem] w-[calc(100%-4rem)] text-[1.8rem] font-[700] ${theme === 'normal' ? 'text-var-black4' : 'text-var-gray3'}`}
        >
          {columnTitle}
        </h3>
        <div
          className={`${theme === 'normal' ? 'bg-var-gray2 text-var-gray5' : 'bg-var-black2 text-var-gray3'} rounded-[0.4rem] px-[0.6rem] py-[0.3rem] text-[1.2rem]`}
        >
          {cardLength || renderCardLength?.length || 0}
        </div>
      </div>

      {isMyDashBoard && (
        <button
          onMouseEnter={() => setIconColor(true)}
          onMouseLeave={() => setIconColor(false)}
          type="button"
          onClick={() =>
            dispatch(
              openModal({
                modalName: 'EditColumn',
                modalProps: { columnId, columnTitle },
              }),
            )
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.73414 17.9163C8.54717 17.9163 8.38531 17.8535 8.24856 17.728C8.11181 17.6025 8.02954 17.4462 8.00176 17.2592L7.75979 15.3778C7.53649 15.3031 7.30759 15.1983 7.07308 15.0637C6.83856 14.9291 6.62889 14.7849 6.44406 14.631L4.70368 15.365C4.52526 15.443 4.34818 15.4521 4.17243 15.3922C3.99668 15.3324 3.85859 15.2202 3.75816 15.0557L2.50499 12.8731C2.4099 12.7085 2.38051 12.5328 2.41685 12.3458C2.45317 12.1588 2.54665 12.0082 2.69728 11.8939L4.2037 10.7545C4.18447 10.6305 4.17084 10.5061 4.16283 10.3811C4.15481 10.2561 4.15081 10.1316 4.15081 10.0077C4.15081 9.88908 4.15481 9.76861 4.16283 9.64628C4.17084 9.52395 4.18447 9.39013 4.2037 9.24484L2.69728 8.1054C2.54665 7.9911 2.45183 7.84046 2.41285 7.65349C2.37385 7.46653 2.40456 7.29079 2.50499 7.12626L3.75816 4.95963C3.85859 4.79511 3.99535 4.68292 4.16843 4.62309C4.3415 4.56326 4.51724 4.57234 4.69566 4.65034L6.43604 5.3763C6.6369 5.21711 6.85138 5.07154 7.07947 4.93959C7.30758 4.80763 7.53168 4.70159 7.75176 4.62147L8.00176 2.74007C8.02954 2.5531 8.11181 2.39685 8.24856 2.27132C8.38531 2.14578 8.54717 2.08301 8.73414 2.08301H11.2581C11.4451 2.08301 11.6083 2.14578 11.7477 2.27132C11.8871 2.39685 11.9707 2.5531 11.9985 2.74007L12.2405 4.62949C12.4905 4.72029 12.7167 4.82633 12.9192 4.94759C13.1217 5.06886 13.326 5.21176 13.5322 5.3763L15.3046 4.65034C15.483 4.57234 15.6588 4.56192 15.8318 4.61909C16.0049 4.67624 16.1417 4.78708 16.2421 4.95161L17.4953 7.12626C17.5957 7.29079 17.6264 7.46653 17.5874 7.65349C17.5484 7.84046 17.4536 7.9911 17.303 8.1054L15.7645 9.26886C15.7945 9.40349 15.8107 9.52929 15.8134 9.64628C15.8161 9.76327 15.8174 9.88106 15.8174 9.99966C15.8174 10.1129 15.8147 10.228 15.8094 10.345C15.8041 10.462 15.7848 10.5958 15.7517 10.7465L17.2741 11.8939C17.4248 12.0082 17.5196 12.1588 17.5586 12.3458C17.5976 12.5328 17.5669 12.7085 17.4665 12.8731L16.2133 15.0429C16.1128 15.2074 15.9726 15.3204 15.7926 15.3818C15.6126 15.4433 15.4333 15.435 15.2549 15.357L13.5322 14.623C13.326 14.7876 13.1155 14.9331 12.9008 15.0597C12.686 15.1863 12.4659 15.2897 12.2405 15.3698L11.9985 17.2592C11.9707 17.4462 11.8871 17.6025 11.7477 17.728C11.6083 17.8535 11.4451 17.9163 11.2581 17.9163H8.73414ZM9.16681 16.6663H10.8046L11.1043 14.4339C11.5295 14.3228 11.9181 14.165 12.2702 13.9604C12.6222 13.7558 12.9617 13.4927 13.2886 13.1711L15.3591 14.0413L16.1796 12.6247L14.3719 11.2625C14.4414 11.0467 14.4887 10.8351 14.5138 10.6279C14.5389 10.4206 14.5514 10.2112 14.5514 9.99966C14.5514 9.78278 14.5389 9.57338 14.5138 9.37145C14.4887 9.16953 14.4414 8.96334 14.3719 8.75286L16.1957 7.37465L15.3751 5.95799L13.2806 6.84101C13.0017 6.54293 12.6676 6.27957 12.2782 6.05095C11.8888 5.82231 11.4948 5.66045 11.0963 5.56536L10.8335 3.33299H9.17962L8.90399 5.55734C8.47877 5.65777 8.08614 5.81162 7.7261 6.01888C7.36606 6.22615 7.02258 6.49325 6.69566 6.82018L4.62514 5.95799L3.80462 7.37465L5.60431 8.71601C5.53486 8.91365 5.48625 9.11931 5.45847 9.33299C5.43069 9.54667 5.41681 9.77156 5.41681 10.0077C5.41681 10.2246 5.43069 10.4372 5.45847 10.6455C5.48625 10.8538 5.53219 11.0595 5.59628 11.2625L3.80462 12.6247L4.62514 14.0413L6.68764 13.1663C7.00388 13.4911 7.34201 13.7571 7.70206 13.9644C8.0621 14.1717 8.46007 14.3309 8.89597 14.442L9.16681 16.6663ZM10.0097 12.4996C10.7031 12.4996 11.2931 12.2563 11.7798 11.7697C12.2664 11.283 12.5097 10.693 12.5097 9.99966C12.5097 9.30629 12.2664 8.71629 11.7798 8.22963C11.2931 7.743 10.7031 7.49968 10.0097 7.49968C9.30784 7.49968 8.7157 7.743 8.23333 8.22963C7.75097 8.71629 7.50979 9.30629 7.50979 9.99966C7.50979 10.693 7.75097 11.283 8.23333 11.7697C8.7157 12.2563 9.30784 12.4996 10.0097 12.4996Z"
              fill={`${iconColor ? '#76a5ea' : '#787486'}`}
            />
          </svg>
        </button>
      )}
    </div>
  )
}
