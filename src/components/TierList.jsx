import Character from '@/components/Character.jsx'
import css from '@/components/TierList.module.css'

export default function TierList({ store, add }) {
  const dragFunctions = { onDrop, onDragOver, onDragEnter, onDragLeave }

  return (
    <div className={css.TierList}>
      <section className={css.Tier} { ...dragFunctions } data-tier="s">
        <header className={css.TierS}>Allez !</header>
        {store.s.map(({ name, slug, image }, i) => {
          return <Character key={i} { ...{ name, slug, image, add }} /> 
        })}
      </section>
      <section className={css.Tier} { ...dragFunctions } data-tier="a">
        <header className={css.TierA}>Probable</header>
        {store.a.map(({ name, slug, image }, i) => {
          return <Character key={i} { ...{ name, slug, image, add }} /> 
        })}
      </section>
      <section className={css.Tier} { ...dragFunctions } data-tier="b">
        <header className={css.TierB}>Neutre</header>
        {store.b.map(({ name, slug, image }, i) => {
          return <Character key={i} { ...{ name, slug, image, add }} /> 
        })}
      </section>
      <section className={css.Tier} { ...dragFunctions } data-tier="c">
        <header className={css.TierC}>Nope !</header>
        {store.c.map(({ name, slug, image }, i) => {
          return <Character key={i} { ...{ name, slug, image, add }} /> 
        })}
      </section>
    </div>
  )

  function onDrop(event) {
    event.preventDefault()
  
    const data = event.dataTransfer.getData('text/plain')
    const tier = event.currentTarget.dataset.tier
    event.currentTarget.classList.remove(css.TierHighlighted)
    add(data, tier)
  }
  
  function onDragOver(event) {
    event.preventDefault()
  }
  
  function onDragEnter(event) {
    event.currentTarget.classList.add(css.TierHighlighted)
  }
  
  function onDragLeave(event) {
    event.currentTarget.classList.remove(css.TierHighlighted)
  }
}