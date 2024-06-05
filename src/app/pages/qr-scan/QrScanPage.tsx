import axios from "axios";
import { FC } from "react";
import style from './qr-scan.module.css'
import { Container, InitAlert, InitLoaderPage } from "../../components";
import { LoginForm } from "./components";
import { observer } from "mobx-react-lite";
import { useStores } from "../../models/store";
import QrReader from "react-qr-reader";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const QrScanPage: FC = observer(() => {
  const { userScanModel } = useStores()
  return (
    <Container style={{ backgroundColor: userScanModel.isLogin ? 'var(--bs-blue)' : 'var(--kt-white)' }}>
      {userScanModel.isLogin ? <Scanner /> : <LoginForm />}
    </Container>
  )
})

const Scanner: FC = () => {
  const navigate = useNavigate()
  const mutateReadQr = useMutation({
    mutationFn: (qr: string) => axios.get(qr),
    onSuccess: (data) => {
      InitLoaderPage.offLoading()
      const response = data?.data?.context
      if (response) {
        navigate(response.uuid, {
          state: response
        })
      }
    },
    onError: () => {
      InitLoaderPage.offLoading()
      InitAlert.alert({ message: 'Mã Qr không hợp lệ !', variant: 'warning', autoHide: 1500 })
    }
  })
  const handleScan = (e: string | null) => {
    if (e) {
      InitLoaderPage.onLoading()
      mutateReadQr.mutate(e)
    }
  }
  return (
    <div className={style.cnt}>
      <p className={style.title}>Quét mã vé</p>
      <div className={style.scanCnt}>
        <div className={style.scanReader}>
          <QrReader
            delay={500}
            onError={e => console.log(e)}
            onScan={handleScan}
          // chooseDeviceId={()=>selected}
          // style={{ width: "100%", height: "100%", position: 'absolute', zIndex: 1 }}
          />
        </div>
        <button
          onClick={() => handleScan('https://api.riseoftheunderdogs.com/api/ticket-code/')}
          className="btn btn-primary mt-8"
        >
          Test
        </button>
      </div>
    </div>
  )
}

