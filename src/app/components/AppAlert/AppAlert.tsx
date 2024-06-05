import { createRef, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import style from './app-alert.module.css'

interface AppAlertProps { }
interface AlertOptions {
  message?: string;
  variant?: 'success' | 'danger' | 'warning';
  autoHide?: number
}
export interface AppAlertHandle {
  alert: (options?: AlertOptions) => void
}
export class InitAlert {
  private static alertRef: React.RefObject<AppAlertHandle> = createRef();
  static register(ref: React.RefObject<AppAlertHandle>) {
    this.alertRef = ref
  }
  static alert(options: AlertOptions) {
    this.alertRef.current?.alert(options)
  }
}

export const AppAlert = forwardRef<AppAlertHandle, AppAlertProps>((props, ref) => {
  const [msg, setMsg] = useState('Tiêu đề')
  const [variant, setVariant] = useState('primary')
  const boxRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => ({
    alert(options) {
      if (boxRef.current) {
        boxRef.current.classList.add(style.show)
        if (options?.message) setMsg(options.message);
        if (options?.variant) setVariant(options.variant);
        setTimeout(() => {
          boxRef.current?.classList.remove(style.show)
        }, options?.autoHide || 3000)
      }
    },
  }))
  return (
    <div className={style.cnt} ref={boxRef}>
      <Alert variant={variant} style={{ boxShadow: 'var(--box-shadow)' }}>
        {msg}
      </Alert>
    </div>
  )
})