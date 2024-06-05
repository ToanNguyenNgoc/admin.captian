import { DetailedHTMLProps, FC, ReactElement } from "react";
import style from './container.module.css'

interface ContainerProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactElement
}

export const Container: FC<ContainerProps> = (props) => {
  return (
    <div {...props} className={style.cnt}>
      {props.children}
    </div>
  )
}