import React from 'react';
import { offers } from '../assets/data/offers';
import { Carousel } from 'primereact/carousel';
import './OfferSection.css';

export const OfferSection = () => {
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const OfferTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={product.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                    </div>
                    <div>
                        <h5 className="mb-1 product-description">{product.description}</h5>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-demo">
                <Carousel value={offers} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                    itemTemplate={OfferTemplate} header={<h3 style={{color: 'whitesmoke', textAlign: 'center'}}>Currently offering products</h3>} />
        </div>
    )
}