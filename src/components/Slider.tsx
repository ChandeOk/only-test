import SliderBlock from './SliderBlock'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';

import classes from './Slider.module.sass'
import { useEffect } from 'react';
import gsap from 'gsap';
type Props = {
  data: {year: number; body: string}[];
}

const Slider = ({ data }: Props) => {
  useEffect(() => {
    gsap.fromTo(`.${classes.slider}`, {opacity: 0}, {opacity: 1, duration: 1.5})
  }, [data])
  return (
    <div className={classes.slider}>
      <Swiper
      modules={[Pagination, Navigation, FreeMode]}
      navigation={{
        prevEl: '.' + classes.slider_button_left,
        nextEl: '.' + classes.slider_button_right,
        disabledClass: classes.button_disabled,
      }}
      freeMode={true}
      spaceBetween={25}
      slidesPerView='auto'
      slideNextClass={classes.next}
      breakpoints={{
        481: {
          slidesPerView: 3,
          freeMode: false,
          spaceBetween: 50,
          slideActiveClass: 'swiper-slide-active',
          slideNextClass: 'swiper-slide-next'
        }
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((article, i) => <SwiperSlide><SliderBlock body={article.body} year={article.year} key={i}/></SwiperSlide>)}
      </Swiper>
      <div className={classes.slider_button_left}>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2"/></svg>
      </div>
      <div className={classes.slider_button_right}>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2"/></svg>
      </div>
  </div>
  )
}

export default Slider