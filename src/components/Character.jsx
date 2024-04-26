import css from '@/components/Character.module.css'
import Image from 'next/image'
import { getImage, move } from '@/utils/helpers.js'

const Character = ({ name }) => {
  return (
    <article className={css.Character} title={name} draggable>
      <Image src={getImage(name)} fill sizes="20vw" alt={name} />
    </article>
  )
}

export default Character
