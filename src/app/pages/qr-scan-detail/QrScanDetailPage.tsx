import { FC, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, InitAlert, InitLoaderPage, MBHeader } from "../../components";
import style from './qr-scan-detail.module.css'
import dayjs from "dayjs";
import { useMutation } from "react-query";
import { CheckInApi } from "../../apis";
import { AxiosError } from "axios";

export const QrScanDetailPage: FC = () => {
  const location = useLocation()
  const params = useParams() as { uid: string }
  const navigate = useNavigate()
  const state = location.state as any
  const [detail, setDetail] = useState<any>(state)
  const mutationCheckIn = useMutation({
    mutationFn: () => CheckInApi.checkInTicket(params.uid),
    onSuccess: (data) => {
      setDetail((prev: any) => {
        prev.is_checkin = 1
        return prev
      })
      InitLoaderPage.offLoading()
      InitAlert.alert({ message: 'Check in vé thành công !', variant: 'success' })
      setTimeout(() => navigate(-1), 1000)
    },
    onError: (error) => {
      InitLoaderPage.offLoading()
      const err = error as AxiosError
      if (err.response?.status === 400) {
        InitAlert.alert({ message: 'Vé này đã được check in !', variant: 'warning' })
      } else {
        InitAlert.alert({ message: 'Có lỗi xảy ra. Vui lòng thử lại !', variant: 'danger' })
      }
    }
  })
  const handleCheckIn = () => {
    if (params.uid) {
      InitLoaderPage.onLoading()
      mutationCheckIn.mutate()
    }
  }
  return (
    <div>
      <MBHeader title="Thông tin vé" />
      <Container style={{ paddingTop: '64px', paddingBottom: '100px' }}>
        {
          detail ?
            <div>
              <div className={style.section}>
                <p className={style.sectionTitle}>Thông tin người mua</p>
                <div className={style.detailRow}>
                  <p className={style.detailRowTitle} >Người mua</p>
                  <p>{detail.order?.fullname}</p>
                </div>
                <div className={style.detailRow}>
                  <p className={style.detailRowTitle} >Email</p>
                  <p>{detail.order?.email}</p>
                </div>
                <div className={style.detailRow}>
                  <p className={style.detailRowTitle} >Số điện thoại</p>
                  <p>{detail.order?.phone}</p>
                </div>
              </div>
              <div className={style.section}>
                <p className={style.sectionTitle}>Thông tin vé</p>
                <div className={style.detailRow}>
                  <p className={style.detailRowTitle} >Trạng thái</p>
                  <p>{detail.is_checkin === 1 ? 'Đã check in' : 'Chưa check in'}</p>
                </div>
                <div className={style.detailRow}>
                  <p className={style.detailRowTitle} >Tên vé</p>
                  <p>{detail.productable?.title}</p>
                </div>
                <div className={style.detailRow}>
                  <p className={style.detailRowTitle} >Ngày mua</p>
                  <p>{dayjs(detail.created_at).format('HH:mm [ngày] DD, [tháng] MM, [năm] YYYY')}</p>
                </div>
                <div className={style.bottomBtn}>
                  <button
                    onClick={handleCheckIn}
                    className='btn btn-lg btn-primary w-100'
                  >
                    Check in
                  </button>
                </div>
              </div>
            </div>
            :
            <p className={style.detailRowTitle} style={{ textAlign: 'center' }}>
              Không có thông tin
            </p>
        }
      </Container>
    </div>
  )
}