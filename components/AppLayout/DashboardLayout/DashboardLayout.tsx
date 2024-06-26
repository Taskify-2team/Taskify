import { Card } from '@/types/dashboard'
import { CreateColumnButton, DashBoardColumn } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/useApp'
import { openModal } from '@/store/reducers/modalReducer'
import { Dispatch, SetStateAction, useRef } from 'react'
import { getCardList, updateCard } from '@/service/cards'
import { deleteCardItem, orderingCardList } from '@/store/reducers/cardReducer'
import { Tag, updateTags } from '@/service/tag'
import useAsync from '@/hooks/useAsync'
import { useDbId } from '@/store/context/DbIdContext'

interface DashboardLayoutProps {
  dashboardId: number
  setIsDrag: Dispatch<SetStateAction<boolean>>
}

export default function DashboardLayout({ dashboardId, setIsDrag }: DashboardLayoutProps) {
  const { data: columnList } = useAppSelector((state) => state.column.columnList)
  const { requestFunction: updateTagsRequest } = useAsync(updateTags)
  const { dbId } = useDbId()
  const dragItemTags = useRef<Tag[]>([])
  const dispatch = useAppDispatch()
  const dragItem = useRef({ id: 0 })
  const baseColumn = useRef(0)
  const dragOverColumn = useRef(0)
  const cursorId = useAppSelector((state) => state.card.cursorId[dragOverColumn.current])

  const dragStart = (card: Card, id: number, tags: Tag[]) => {
    setIsDrag(false)
    dragItem.current = card
    baseColumn.current = id
    dragItemTags.current = tags
  }

  const dragEnter = (id: number) => {
    dragOverColumn.current = id
  }

  const drop = async () => {
    if (baseColumn.current !== dragOverColumn.current) {
      await dispatch(
        updateCard({
          newCardBody: { ...dragItem.current, columnId: dragOverColumn.current },
          cardId: dragItem.current.id,
        }),
      )

      await updateTagsRequest({
        userId: dbId,
        columnId: dragOverColumn.current,
        cardId: dragItem.current.id,
        tags: dragItemTags.current,
      })
      await dispatch(getCardList({ columnId: dragOverColumn.current, cursorId }))
      dispatch(orderingCardList({ columnId: dragOverColumn.current }))
      dispatch(deleteCardItem({ cardId: dragItem.current.id, columnId: baseColumn.current }))
    }
  }

  return (
    <div className="flex sm:w-full sm:flex-col">
      {columnList?.map((column) => (
        <DashBoardColumn
          key={column.id}
          columnId={column.id}
          columnTitle={column.title}
          dragStart={dragStart}
          dragEnter={dragEnter}
          drop={drop}
        />
      ))}
      <section className="p-[2rem] pt-[7.2rem] sm:px-[1.2rem] sm:pt-[1.2rem]">
        <CreateColumnButton
          onClick={() => {
            dispatch(openModal({ modalName: 'AddColumn', modalProps: { dashboardId } }))
          }}
        />
      </section>
    </div>
  )
}
