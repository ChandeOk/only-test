import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classes from './Carousel.module.sass';
import gsap from 'gsap';

interface Props {
  points: number;
  startPosition?: number;
  titles: string[];
}
interface IDot {
  index: number;
  count: number;
  title: string;
  isActive: boolean;
  onClick: Function;
  onMouseEnter: Function;
  onMouseLeave: Function;
}
const Dot = ({ index, count, title, isActive, onClick, onMouseEnter, onMouseLeave } : IDot) => {
  
}

const Carousel = ({points, startPosition = 0, titles}: Props) => {
  const degree = 360 / points;
  const dots: any[] = [];
  const radius = 265;
  const dotsRef = useRef<Array<HTMLDivElement | null>>([])
  const circleRef = useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = useState<HTMLDivElement>();

  useEffect(() => {
   setActiveDot(dotsRef.current[0]);
   dotsRef.current.forEach((dot, i) => {
     gsap.set(dot, {rotation: 0})

   })
  }, [])
  useEffect(() => {
    if (!activeDot)
      return;
    activeDot.classList.add(classes.dot, classes.dot_active)
  }, [activeDot])

  const handleRotation = (i: number) => {
    console.log(i)
    const direction = +activeDot.getAttribute('key') < i ? 1 : -1;
    const rotation = degree * (points - i) * direction;
    const duration = 1;
    const dot = dotsRef.current[i];
    gsap.timeline({
      onUpdate: () => {
        const cur = gsap.getProperty(circleRef.current, 'rotation');
        gsap.set(dot, { rotation: -cur });
      },
    }).to(circleRef.current, {
      rotate: rotation,
      duration: duration,
    }).play();
    //More smoothly somehow
    // gsap.to(circleRef.current, {rotate: rotation, duration: duration});

    gsap.set(dot.lastChild, {opacity: 0, x: 76, position: 'absolute', fontWeight: 'bold'});
    gsap.to(dot.lastChild, {opacity: 1, duration: 0.7}).delay(0.3);
    console.log(dotsRef.current.filter(dot => dot !== dotsRef.current[i]));
    gsap.fromTo(dot, {backgroundColor: '#42567A', border: 'none', width: 6, height: 6}, {backgroundColor: 'white', border: '1px solid #303E5880', width: 56, height: 56, duration: 0.5})
    gsap.fromTo(dot.firstChild, {opacity: 0}, {display: 'block', opacity: 1, duration: 0.5});
    dotsRef.current.filter(dot => dot !== dotsRef.current[i])
    .forEach(dot => {
      gsap.set(dot, {rotation: -rotation, backgroundColor: '#42567A', border: 'none', width: 6, height: 6, overwrite: true});
      gsap.set(dot.firstChild, {opacity: 0, overwrite: true});
      gsap.set(dot.lastChild, {opacity: 0, overwrite: true});
    });
    setActiveDot(dotsRef.current[i]);
  }
  // console.log(activeDot);
  for (let i = 0; i < points; i++) {
    const rotation = startPosition + degree * i;

    dots.push(
      <div
        key={i}
        ref={(el) => dotsRef.current[i] = el}
        data-count={i+1}
        className={`${classes.dot} ${classes.dot}${i}`}
        style={{transform: `rotate(${rotation}deg) translateY(-265px)`}}
        onMouseEnter={(e) => {
          if (e.currentTarget === activeDot)
            return;
          const dot = dotsRef.current[i];
          gsap.set(dot, {backgroundColor: 'white'})
          gsap.fromTo(dot, {backgroundColor: '#42567A', border: 'none', width: 6, height: 6}, {backgroundColor: 'white', border: '1px solid #303E5880', width: 56, height: 56, duration: 0.5})
          gsap.fromTo(dot.firstChild, {opacity: 0}, {display: 'block', opacity: 1, duration: 0.5});
        }}
        onMouseLeave={(e) => {
          if (e.currentTarget === activeDot)
            return;
          const dot = dotsRef.current[i];
          gsap.fromTo(dot, {backgroundColor: 'white', border: '1px solid #303E5880', width: 56, height: 56},  {backgroundColor: '#42567A', border: 'none', width: 6, height: 6, duration: 0.5});
          gsap.fromTo(dot.firstChild, {opacity: 0}, {display: 'none', opacity: 0, duration: 0.5});
        }}
        onClick={(e) => {
          if (activeDot === e.currentTarget)
            return
          handleRotation(i);
        }}
      >
        <span 
          className={classes.number} 
          >
            {i + 1}
        </span>
        <span 
          className={classes.title} 
          >
          {titles[i]}
        </span>
      </div>
    );
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%'}}>
      <div className={classes.circle} ref={circleRef}>
        {dots}
      </div>
      <div className={classes.text}>
        <p className={classes.text_left}>2015</p>
        <p className={classes.text_right}>2022</p>
      </div>
    <div className={classes.control_container}>
        <p className={classes.control_container_pagination}>{'0' + activeDot?.getAttribute('data-count')}/{'0' + points}</p>
        <div className={classes.control_container_buttons}>
          <div className={classes.control_container_control_button} onClick={() => {
            const currentCount = +activeDot?.getAttribute('data-count');
            console.log('currentCount', currentCount);
            if (currentCount === 1)
              return;
            // console.log('clieck');
            const next =  dotsRef.current[currentCount - 2]
            handleRotation(currentCount - 2);
            setActiveDot(next)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M27.4999 18.75L21.2499 25L27.4999 31.25" stroke="#42567A" strokeWidth="2"/></svg>
          </div>
          <div className={classes.control_container_control_button} onClick={() => {
            const currentCount = +activeDot?.getAttribute('data-count');
            console.log('currentCount', currentCount);
            if (currentCount === points)
              return;
            // console.log('clieck');
            handleRotation(currentCount);
            const next =  dotsRef.current[currentCount]
            setActiveDot(next)
          }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M22.5001 18.75L28.7501 25L22.5001 31.25" stroke="#42567A" strokeWidth="2"/></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel