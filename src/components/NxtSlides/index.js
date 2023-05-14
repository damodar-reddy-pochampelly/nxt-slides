import {Component} from 'react'

import {v4} from 'uuid'

import Navbar from '../Navbar'
import SlideItem from '../SlideItem'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlideId: initialSlidesList[0].id,
    editHeading: false,
    editDescription: false,
  }

  onAddNewSlide = () => {
    const {slidesList, activeSlideId} = this.state

    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }

    const activeSlideIndex = slidesList.findIndex(eachSlide => {
      if (activeSlideId === eachSlide.id) {
        return true
      }
      return false
    })

    this.setState(prevState => ({
      slidesList: [
        ...prevState.slidesList.slice(0, activeSlideIndex + 1),
        newSlide,
        ...prevState.slidesList.slice(activeSlideIndex + 1, slidesList.length),
      ],
      activeSlideId: newSlide.id,
    }))
  }

  onChangeSlide = id => {
    this.setState({
      activeSlideId: id,
    })
  }

  onEditHeadingElement = () => {
    this.setState({editHeading: true})
  }

  onEditDescriptionElement = () => {
    this.setState({editDescription: true})
  }

  onBlurHeadingElement = () => {
    this.setState({
      editHeading: false,
    })
  }

  onBlurDescriptionElement = () => {
    this.setState({editDescription: false})
  }

  onChangeHeading = event => {
    const {activeSlideId} = this.state
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachSlide => {
        if (eachSlide.id === activeSlideId) {
          return {...eachSlide, heading: event.target.value}
        }
        return eachSlide
      }),
    }))
  }

  onChangeDescription = event => {
    const {activeSlideId} = this.state
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachSlide => {
        if (eachSlide.id === activeSlideId) {
          return {...eachSlide, description: event.target.value}
        }
        return eachSlide
      }),
    }))
  }

  renderDisplaySlide = () => {
    const {activeSlideId, slidesList, editHeading, editDescription} = this.state
    const cardDetails = slidesList.filter(
      eachSlide => eachSlide.id === activeSlideId,
    )
    const {heading, description} = cardDetails[0]

    const headingElement = editHeading ? (
      <input
        type="text"
        onChange={this.onChangeHeading}
        onBlur={this.onBlurHeadingElement}
        value={heading}
        className="heading-input"
      />
    ) : (
      <h1 className="display-slide-heading" onClick={this.onEditHeadingElement}>
        {heading}
      </h1>
    )
    const descriptionElement = editDescription ? (
      <input
        type="text"
        onChange={this.onChangeDescription}
        onBlur={this.onBlurDescriptionElement}
        value={description}
        className="description-input"
      />
    ) : (
      <p
        className="display-slide-description"
        onClick={this.onEditDescriptionElement}
      >
        {description}
      </p>
    )

    return (
      <div className="display-slide-content-container">
        {headingElement}
        {descriptionElement}
      </div>
    )
  }

  renderSlidesList = () => {
    const {slidesList, activeSlideId} = this.state

    return (
      <ol className="slides-list-container">
        {slidesList.map(eachSlide => {
          const slideNumber = slidesList.indexOf(eachSlide) + 1
          return (
            <SlideItem
              slideDetails={eachSlide}
              activeSlideId={activeSlideId}
              onChangeSlide={this.onChangeSlide}
              slideNumber={slideNumber}
              key={eachSlide.id}
            />
          )
        })}
      </ol>
    )
  }

  render() {
    return (
      <div className="nxt-slides-bg-container">
        <Navbar />
        <button type="button" className="add-btn" onClick={this.onAddNewSlide}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
            className="plus-icon"
          />
          <p className="btn-text">New</p>
        </button>
        <div className="body-container">
          {this.renderSlidesList()}
          <div className="display-slide-container">
            {this.renderDisplaySlide()}
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlides
