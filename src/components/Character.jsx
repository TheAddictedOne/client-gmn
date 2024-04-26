import css from '@/components/Character.module.css'
import Image from 'next/image'
import { getImage, move } from '@/utils/helpers.js'

const Character = ({ name }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', name)
  }
  const onDrop = () => {
    console.log('name?', name)
  }

  const onDragOver = (event) => event.preventDefault()

  const onDragEnter = (event) => event.preventDefault()

  const onDragLeave = (event) => event.preventDefault()

  return (
    <article
      className={css.Character}
      title={name}
      draggable
      {...{ onDragStart, onDrop, onDragOver, onDragEnter, onDragLeave }}
    >
      <Image src={getImage(name)} fill sizes="20vw" alt={name} />
    </article>
  )
}

export default Character
