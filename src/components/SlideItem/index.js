import './index.css'

const SlideItem = props => {
  const {slideDetails, activeSlideId, onChangeSlide, slideNumber} = props
  const {id, heading, description} = slideDetails

  const activeSlideClassName =
    activeSlideId === id
      ? `${'active-slide'} slides-list-item`
      : 'slides-list-item'

  const onClickChangeSlide = () => {
    onChangeSlide(id)
  }

  return (
    <li
      className={activeSlideClassName}
      testid={`slideTab${slideNumber}`}
      onClick={onClickChangeSlide}
    >
      <p className="slide-index">{slideNumber}</p>
      <div className="slide-card">
        <h1 className="slide-card-heading">{heading}</h1>
        <p className="slide-card-description">{description}</p>
      </div>
    </li>
  )
}

export default SlideItem
