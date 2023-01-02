import './testimonial.css'
import { Data } from './Data';
import React from 'react';


const Testimonials = () => {


    return(
        <section className="testimonial container section">
            <h2 className="section__title">Testimonials</h2>
            <span className="section__subtitle">Clients' opinion</span>


            <div className="testimonial__container">
                {Data.map(({id,image,title,description}) => {
                    return(
                        <div className='testimonial__card' key={id}>
                            <img src={image} alt=""
                            className='testimonial__img' />

                            <h3 className="testimonial__name">{title}</h3>
                            <p className="testimonial__description">{description}</p>
                            
                        </div>
                    )
                })}
            </div>

        </section>
    )
}



export default Testimonials;