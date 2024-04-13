import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import one from './1.jpg';
import two from './2.jpg';
import three from './3.jpg';
import four from './4.jpg';
import five from './5.jpg';
import six from './6.jpg';


const Gallery = () => {

    const images = [
        {
          original: one,
          thumbnail: one
        },
        {
          original: two,
          thumbnail: two
        },
        {
          original: three,
          thumbnail: three
        },
        {
          original: four,
          thumbnail: four
        },
        {
          original: five,
          thumbnail: five
        },
        {
          original: six,
          thumbnail: six
        }
      ];

      return(
        <div>
            <ImageGallery items={images} showFullscreenButton={false} showBullets={false} showThumbnails={false} showPlayButton={false} />
        </div>
      )

}

export default Gallery;