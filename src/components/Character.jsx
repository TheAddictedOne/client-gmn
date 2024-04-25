import css from '@/components/Character.module.css'
import Image from 'next/image'
import { getImage, move } from '@/utils/helpers.js'

const Character = ({ name }) => {
  const image = getImage(name)

  const onClick = () => {
    setStore(move(store, character.slug, 'NONE'))
  }

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', name)
  }

  return (
    <article className={css.Character} title={name} draggable {...{ onClick, onDragStart }}>
      <Image src={image} fill sizes="20vw" alt={name} />
    </article>
  )
}

export default Character
