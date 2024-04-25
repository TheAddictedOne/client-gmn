import css from '@/components/Character.module.css'
import Image from 'next/image'
import { move } from '@/utils/helpers.js'

export default function Character({ store, setStore, character }: CharacterParams) {
  const onClick = () => {
    setStore(move(store, character.slug, 'NONE'))
  }

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('text/plain', character.slug)
  }

  return (
    <article
      className={css.Character}
      title={character.name}
      draggable
      {...{ onClick, onDragStart }}
    >
      <Image src={character.image} fill sizes="20vw" alt={character.name} />
    </article>
  )
}
