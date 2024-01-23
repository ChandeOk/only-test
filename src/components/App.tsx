import classes from './App.module.sass'
import autoImage from '../assets/1.jpg'
import Carousel from './Carousel'
import SliderBlock from './SliderBlock'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
type Props = {}

// // import "swiper/scss/bundle";
// import 'swiper/scss';
// import 'swiper/scss/pagination';

const App = (props: Props) => {
  console.log(classes, 'CLASSES')
  return (
    <div className={classes.root}>
        <div className={classes.title}>Исторические даты<span className={classes.title_border}></span></div>
      <hr className={classes.line}/>
      <div className={classes.line_vertical}></div>
      <Carousel points={5} startPosition={30} titles={['Наука', 'Кино', 'Музыка', 'Искусство', 'История']}/>
      <div className={classes.slider}>
        <Swiper
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: '.' + classes.slider_button_left,
          nextEl: '.' + classes.slider_button_right,
          disabledClass: classes.button_disabled,
        }}
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide><SliderBlock/></SwiperSlide>
          <SwiperSlide><SliderBlock/></SwiperSlide>
          <SwiperSlide><SliderBlock/></SwiperSlide>
          <SwiperSlide><SliderBlock/></SwiperSlide>
        </Swiper>
        <div className={classes.slider_button_left}>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2"/></svg>
        </div>
        <div className={classes.slider_button_right}>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2"/></svg>
        </div>
      </div>
    </div>
  )
}

export default App