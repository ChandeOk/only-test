import classes from './SliderBlock.module.sass'

interface Props {
  year: number;
  body: string;
}

const SliderBlock = (props: Props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{props.year}</h2>
      <p className={classes.text}>{props.body}</p>
    </div>
  )
}

export default SliderBlock;