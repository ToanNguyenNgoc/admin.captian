import { FC, Suspense, createRef, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { AuthInit } from './modules/auth'
import { AppAlert, AppAlertHandle, InitAlert, InitLoaderPage, LoaderPage, LoaderPageHandle } from './components'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
            <RegisterGlobalLayout />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

const RegisterGlobalLayout: FC = () => {
  const loaderPageRef = createRef<LoaderPageHandle>()
  const alertRef = createRef<AppAlertHandle>()
  useEffect(() => {
    InitLoaderPage.register(loaderPageRef)
    InitAlert.register(alertRef)
  }, [loaderPageRef, alertRef])
  return (
    <>
      <LoaderPage ref={loaderPageRef} />
      <AppAlert ref={alertRef} />
    </>
  )
}

export { App }
