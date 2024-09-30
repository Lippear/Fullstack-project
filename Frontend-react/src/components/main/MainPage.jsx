import './MainPage.scss';
import Search from './search/Search';
import { useState, useEffect } from 'react';
import Button from '/src/components/button/Button.jsx';

export default function MainPage() {
  const [freagnses, setFreganses] = useState([]);

  function SetFoundFreganses(foundFreganses) {
    setFreganses(foundFreganses);
  }

  useEffect(() => {
    fetch(`http://localhost:3500/api/fragrances`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('случилась ошибка');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setFreganses(data.perfumes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="main__page">
      <div className="filter"></div>
      <div className="product__page">
        <Search />
        <div className="freganses__container">
          {freagnses.map((perfume, index) => (
            <Button className="freganse__button" key={index}>
              <img src={perfume.photo} className='image' alt={perfume.name } />
              <span className="brand">{perfume.brand}</span>
              <span className="name">{perfume.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
