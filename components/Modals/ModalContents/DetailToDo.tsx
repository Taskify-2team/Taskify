import { Card, Column, Comment } from '@/types/dashboard'
import Image from 'next/image'
import kebabIcon from '@/public/icons/kebab.svg'
import closeIcon from '@/public/icons/close.svg'
import { useAppDispatch } from '@/hooks/useApp'
import { closeModal, openModal } from '@/store/reducers/modalReducer'
import ProgressChip from '@/components/Chips/ProgressChip'
import TagChip from '@/components/Chips/TagChip'
import CommentInput from '@/components/Inputs/CommentInput'
import CardInfoChip from '@/components/Chips/CardInfoChip'
import CommentItem from '@/components/Inputs/CommentItem'
import useAsync from '@/hooks/useAsync'
import { getComments } from '@/service/comments'
import { useCallback, useEffect, useState } from 'react'
import KebabEditButton from '@/components/Buttons/KebabEditButton'
import { deleteDashBoardCard } from '@/service/cards'
import { openToast } from '@/store/reducers/toastReducer'

interface ToDoDetailProps {
  card: Card
  columnTitle: string
  onDelete: (props: number) => void
  progressList: Column[]
}

export default function ToDoDetail({ card, progressList, columnTitle, onDelete }: ToDoDetailProps) {
  const dispatch = useAppDispatch()
  const [commentList, setCommentList] = useState<Comment[]>()
  const [openKebab, setOpenKebab] = useState(false)

  const { requestFunction: getCommentsRequest } = useAsync(getComments)
  const { requestFunction: deleteCardRequest } = useAsync(deleteDashBoardCard)

  const getCommentData = useCallback(async () => {
    const result = await getCommentsRequest(card.id)
    setCommentList(result?.data.comments)
  }, [card.id, getCommentsRequest])

  const deleteCardData = async () => {
    await deleteCardRequest(card.id)
    onDelete(card.id)
  }

  const handleDeleteCard = () => {
    deleteCardData()
    dispatch(closeModal())
    dispatch(openToast('successDeleteColumn'))
  }

  const handleAddComment = () => {
    getCommentData()
  }

  const handleUpdateComment = (updatedItem: Comment) => {
    setCommentList(
      commentList?.map((commentItem) =>
        updatedItem.id === commentItem.id ? updatedItem : commentItem,
      ),
    )
  }

  const handleDeleteComment = (deletedItem: Comment) => {
    setCommentList(commentList?.filter((commentItem) => deletedItem.id !== commentItem.id))
  }

  const handleKebabClick = () => {
    setOpenKebab(!openKebab)
  }

  const handleKebabClose = () => {
    if (openKebab) {
      setOpenKebab(false)
    }
  }

  useEffect(() => {
    getCommentData()
  }, [getCommentData])

  return (
    <div
      onClick={handleKebabClose}
      className="modal-layout max-h-[76.3rem] w-[73rem] overflow-auto"
    >
      <div className="absolute right-[2.8rem] top-[3.2rem] z-10 flex items-center gap-[2.4rem]">
        <button type="button" onClick={handleKebabClick}>
          <Image src={kebabIcon} alt="케밥" width={28} height={28} />
        </button>
        {openKebab && (
          <div className="absolute right-[6rem] top-[3rem] flex w-[9.3rem] flex-col gap-[0.5rem] rounded-[0.6rem] border border-var-gray3 bg-white p-[0.6rem]">
            <KebabEditButton
              text="수정하기"
              onClick={() =>
                dispatch(
                  openModal({
                    modalName: 'EditToDo',
                    modalProps: {
                      columnId: card.columnId,
                      card,
                      managerList: card.assignee,
                      progressList,
                    },
                  }),
                )
              }
            />
            <KebabEditButton text="삭제하기" onClick={handleDeleteCard} />
          </div>
        )}
        <button type="button" onClick={() => dispatch(closeModal())}>
          <Image src={closeIcon} alt="케밥" width={32} height={32} />
        </button>
      </div>
      <div className="relative pr-[22.4rem]">
        <h3 className="mb-[2.4rem] text-[2.4rem] font-bold">{card.title}</h3>
        <CardInfoChip card={card} />
        <div className="mb-[1.6rem] flex items-center gap-[2rem]">
          <ProgressChip progress={columnTitle} />
          <div className="h-[2rem] w-[0.1rem] bg-var-gray3" />
          <ul className="flex gap-[0.6rem]">
            {card.tags.map((tag) => (
              <TagChip key={tag} tag={tag} textColor="#D58D49" bgColor="#F9EEE3" />
            ))}
          </ul>
        </div>
        <p className="mb-[1.6rem] whitespace-pre-wrap text-[1.4rem] leading-[2.4rem]">
          {card.description}
        </p>
        {card.imageUrl && (
          <Image
            className="mb-[2.4rem] w-full rounded-[0.6rem]"
            src={card.imageUrl}
            alt="이미지"
            width={450}
            height={500}
            objectFit="cover"
            layout="responsive"
          />
        )}
        <CommentInput onAdd={handleAddComment} cardId={card.id} columnId={card.columnId} />
        <ul className="mt-[2rem] flex flex-col gap-[1rem]">
          {commentList?.map((commentItem) => (
            <CommentItem
              key={commentItem.id}
              comment={commentItem}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
