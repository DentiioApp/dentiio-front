import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import Button from '@material-ui/core/Button'
import palette from '../ColorTheme/Palette'

const images = [
  'https://cjasn.asnjournals.org/content/clinjasn/11/12/2168/F1.large.jpg',
  'https://i1.rgstatic.net/publication/331998676_Evaluation_of_Pediatric_Oral_and_Maxillofacial_Biopsies_from_a_Tertiary_Hospital_in_Sub-Saharan_Africa/links/5c9a9463a6fdccd4603cd2b4/largepreview.png'
]

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
