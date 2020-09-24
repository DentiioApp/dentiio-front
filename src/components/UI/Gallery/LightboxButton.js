import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import Button from '@material-ui/core/Button'
import palette from '../ColorTheme/Palette'

export default class LightboxButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false
    }
  }

  render () {
    const { photoIndex, isOpen } = this.state
    const images = this.props.images

    return (
      <div>
        <Button onClick={() => this.setState({ isOpen: true })} style={{ color: palette.white, backgroundColor: palette.primary }}>
                    Consulter la biopsy
        </Button>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })}
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })}
          />
        )}
      </div>
    )
  }
}
