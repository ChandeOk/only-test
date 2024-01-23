import classes from './SliderBlock.module.sass'

interface Props {
  title?: number;
  body?: string;
}

const SliderBlock = (props: Props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>2015</h2>
      <p className={classes.text}>13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды</p>
    </div>
  )
}

export default SliderBlock;