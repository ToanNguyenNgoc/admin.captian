import {  createRef, forwardRef, useImperativeHandle, useState } from "react";
import style from './loader-page.module.css'

export interface LoaderPageProps { }
export interface LoaderPageHandle {
  onLoading: () => void;
  offLoading: () => void
}

export class InitLoaderPage {
  private static loaderRef: React.RefObject<LoaderPageHandle> = createRef();
  static register(ref: React.RefObject<LoaderPageHandle>) {
    this.loaderRef = ref;
  }
  static onLoading() {
    this.loaderRef.current?.onLoading()
  }
  static offLoading() {
    this.loaderRef.current?.offLoading()
  }
}

export const LoaderPage = forwardRef<LoaderPageHandle, LoaderPageProps>((props, ref) => {
  const [loading, setLoading] = useState(false)
  useImperativeHandle(ref, () => ({
    onLoading: () => setLoading(true),
    offLoading: () => setLoading(false)
  }))
  if (!loading) return <></>
  return (
    <div className={style.cnt}>
      <span className={style.loader}></span>
    </div>
  )
})