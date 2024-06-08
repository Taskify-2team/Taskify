import { CreateTodoButton, DashBoardCard, DashBoardColumnHeader } from '@/components'
import { getDashBoardCard } from '@/service/cards'
import { useCallback, useEffect, useState } from 'react'
import useAsync from '@/hooks/useAsync'
import { Card, Column } from '@/types/dashboard'

interface DashBoardColumnProps {
  columnId: number
  columnTitle: string
  setColumns: React.Dispatch<React.SetStateAction<Column[] | undefined>> | undefined
}

export default function DashBoardColumn({
  columnId,
  columnTitle,
  setColumns,
}: DashBoardColumnProps) {
  const [cardList, setCardList] = useState<Card[]>([])
  const { requestFunction: getCardsRequest } = useAsync(getDashBoardCard)

  const getCardsData = useCallback(async () => {
    if (typeof columnId === 'number') {
      const result = await getCardsRequest(columnId)
      setCardList(result?.data.cards)
    }
  }, [columnId, getCardsRequest])

  const handleDeleteCard = (deletedCardId: number) => {
    setCardList(cardList.filter((cardItem) => cardItem.id !== deletedCardId))
  }

  useEffect(() => {
    if (columnId) {
      getCardsData()
    }
  }, [columnId, getCardsData])

  return (
    <section className="flex flex-col gap-[1.6rem] pr-[2rem]">
      <DashBoardColumnHeader
        setColumns={setColumns}
        cardList={cardList}
        columnId={columnId}
        columnTitle={columnTitle}
      />
      <CreateTodoButton />
      {cardList.length > 0 &&
        cardList.map((cardItem) => (
          <DashBoardCard
            key={cardItem.id}
            columnTitle={columnTitle}
            card={cardItem}
            onDelete={handleDeleteCard}
          />
        ))}
    </section>
  )
}