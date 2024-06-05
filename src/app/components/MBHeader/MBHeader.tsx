import { FC, ReactElement } from "react";
import style from './mb-header.module.css'
import { Icon } from "../../../assets/svg";
import { useNavigate } from "react-router-dom";

interface MBHeaderProps {
  title?: string;
  iconRight?: ReactElement
}

export const MBHeader: FC<MBHeaderProps> = ({
  title = 'Tiêu đề',
  iconRight = <div style={{ width: '36px' }} />
}) => {
  const navigate = useNavigate()
  return (
    <div className={style.cnt}>
      <div className={style.btn} onClick={()=> navigate(-1)}>
        <img src={Icon.LeftWhite} alt="" />
      </div>
      <span className={style.title}>{title}</span>
      {iconRight}
    </div>
  )
}