import classes from './App.module.sass'
import Carousel from './Carousel'
import data from '../../data';
import { useState } from 'react';
import Slider from './Slider';
const App = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div className={classes.root}>
      <div className={classes.title_container}>
        <div className={classes.title_border}></div>
        <div className={classes.title}>Исторические даты</div>
      </div>
      <Carousel points={5} startPosition={30} data={data} setCurrent={setCurrent} current={current}/>
      <Slider data={data[current].items}/>
    </div>
  )
}

export default App