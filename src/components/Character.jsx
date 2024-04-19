import css from '@/components/Character.module.css'
import Image from "next/image"

export default function Character({ name, slug, image, add }) {
  const onClick = (event) => {
    add(event.currentTarget.id, 'listOfCharacters')
  }

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.currentTarget.id)
  }

  return (
    <article id={slug} className={css.Character} draggable {...{ onDragStart, onClick } } title={name}>
      <Image src={image} fill sizes="20vw" alt={name} />
    </article>
  )
}