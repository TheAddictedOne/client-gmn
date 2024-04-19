import Image from "next/image"

export default function Character({ name, slug, image, add }) {
  const onClick = (event) => {
    add(event.currentTarget.id, 'listOfCharacters')
  }

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.currentTarget.id)
  }

  return (
    <article id={slug} draggable {...{ onDragStart, onClick } } title={name}>
      <Image src={image} width={400} height={400} alt={name} />
    </article>
  )
}