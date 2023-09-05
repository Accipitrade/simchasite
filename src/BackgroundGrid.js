import * as style from './gridStyle.css';
import ekahn1 from './ekahn1.jpg';
import ekahn2 from './ekahn2.jpg';
import ekahn3 from './ekahn3.jpg';
import ekahn4 from './ekahn4.jpg';
import ekahn5 from './ekahn5.jpg';

const images = [
    ekahn1, ekahn2, ekahn3, ekahn4, ekahn5
];

const BackgroundGrid = () => {
    /*
    return (
        <div className="background-grid">
            {images.map((img, index) => (
                <img key={index} src={img} alt={`Background ${index}`} />
            ))}
        </div>
    );
    */
    return (
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      );
}

export default BackgroundGrid;
