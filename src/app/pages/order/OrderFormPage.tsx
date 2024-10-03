import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetail } from "./functions";
import { formatPrice, ORDER_STATUS } from "../../utils";
import { InitAlert, LoadingButton } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMutation } from "react-query";
import { OrderApi } from "../../apis";

export const OrderFormPage: FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState(ORDER_STATUS.PENDING)
  const { handleSubmit, formState: { errors }, control, setValue } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      telephone: '',
      note: '',
    }
  })
  const { detail, productable } = useGetOrderDetail(Number(params.id), {
    onSuccess(data) {
      if (data.context) {
        const { fullname, email, telephone } = data.context
        setValue('fullname', fullname)
        setValue('email', email)
        setValue('telephone', telephone)
        setValue('note', data.context.note || '')
        setStatus(data.context.status)
      }
    },
  })
  const { mutate, isLoading } = useMutation<any, any, any>({
    mutationFn: body => OrderApi.update(Number(params.id), body),
    onSuccess: () => {
      InitAlert.alert({ message: 'Cập nhật đơn hàng thành công !', variant: 'success' })
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    },
    onError: () => {
      InitAlert.alert({ message: 'Có lỗi xảy ra', variant: 'danger' })
    }
  })
  const onSubmit = (data: any) => {
    mutate(Object.assign(data, { status }))
  }
  return (
    <div className="card p-4">
      <div className='table-responsive'>
        <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
          <thead>
            <tr className='fw-bold text-muted'>
              <th className='min-w-50px'>Ticket Id</th>
              <th className='min-w-150px'>Tên vé</th>
              <th className='min-w-150px'>Giá vé</th>
              <th className='min-w-140px'>Giá mua</th>
              <th className='min-w-50px'>Số lượng</th>
              <th className='min-w-50px'>Check in</th>
              <th className='min-w-120px'>Tổng mua</th>
            </tr>
          </thead>
          <tbody>
            {
              productable.map(i => (
                <tr key={i.id}>
                  <td>
                    <p className='text-dark fw-bold text-hover-primary fs-6'>
                      {i.ticket?.id}
                    </p>
                  </td>
                  <td>
                    <p className='text-dark text-hover-primary fs-6'>
                      {i.ticket?.title}
                    </p>
                  </td>
                  <td>
                    <p className='text-dark text-hover-primary fs-6'>
                      {formatPrice(i.ticket?.price_sale || i.ticket?.price || 0)}
                    </p>
                  </td>
                  <td>
                    <p className="text-dark">
                      {formatPrice(i.base_price)}
                    </p>
                  </td>
                  <td>
                    <span className='text-muted fw-semobold text-muted d-block fs-7'>
                      {i.quantity}
                    </span>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        checked={i.is_check_in}
                        disabled
                        className="form-check-input" type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </td>
                  <td>
                    <span className='text-muted fw-semobold text-muted d-block fs-7'>
                      {formatPrice(i.quantity * i.base_price)}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormControl sx={{ m: 1, minWidth: 200, margin: 0 }} size="small">
              <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                {
                  Object.values(ORDER_STATUS).map(i => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div className="form-group col-12 col-md-6">
              <label>Họ và tên</label>
              <Controller
                rules={{ required: "Họ và tên" }}
                control={control}
                name="fullname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.fullname && <small className="form-text text-muted">{errors.fullname.message}</small>}
            </div>
            <div className="form-group col-12 col-md-5">
              <label>Email</label>
              <Controller
                rules={{ required: "Nhâp Email" }}
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.email && <small className="form-text text-muted">{errors.email.message}</small>}
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div className="form-group col-12 col-md-6">
              <label>Số điện thoại</label>
              <Controller
                rules={{ required: "Số điện thoại" }}
                control={control}
                name="telephone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.telephone && <small className="form-text text-muted">{errors.telephone.message}</small>}
            </div>
            <div className="form-group col-12 col-md-5">
              <label>Ghi chú</label>
              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.note && <small className="form-text text-muted">{errors.note.message}</small>}
            </div>
          </div>
          {/* <div className="d-flex mt-5">
            <div className="form-group col-12 col-md-3">
              <label>Giá gốc</label>
              <Controller
                rules={{
                  required: "Nhâp giá tiền",
                  validate: {
                    isGreaterThan1000: (value) => Number(value) >= 1000 || 'Số tiền lớn hơn 1.000 đ'
                  }
                }}
                control={control}
                name="price"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input type="number" onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.price && <small className="form-text text-muted">{errors.price.message}</small>}
            </div>
            <div className="form-group col-12 col-md-3">
              <label>Giá giảm</label>
              <Controller
                rules={{
                  required: "Nhâp giá tiền",
                  validate: {
                    isGreaterThan1000: (value) => Number(value) >= 1000 || 'Số tiền lớn hơn 1.000 đ'
                  }
                }}
                control={control}
                name="price_sale"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input type="number" onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.price_sale && <small className="form-text text-muted">{errors.price_sale.message}</small>}
            </div>
          </div>
          <div className="d-flex mt-5">
            <div className="form-group col-12 col-md-12">
              <label>Ghi chú</label>
              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.note && <small className="form-text text-muted">{errors.note.message}</small>}
            </div>
          </div>
          <div className="d-flex mt-5">
            <div className="form-group col-12 col-md-3">
              <label>Từ ngày</label>
              <Controller
                control={control}
                rules={{
                  required: 'Nhập ngày',
                }}
                name="date_start"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input
                    type="date" onChange={e => onChange(e.target.value)} value={value}
                    onBlur={onBlur} className="form-control"
                    min={today}
                  />
                )}
              />
              {errors.date_start && <small className="form-text text-muted">{errors.date_start.message}</small>}
            </div>
            <div className="form-group col-12 col-md-3" style={{ marginLeft: 12 }}>
              <label>Đến ngày</label>
              <Controller
                control={control}
                rules={{
                  required: 'Nhập ngày',
                }}
                name="date_end"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input
                    onChange={e => onChange(e.target.value)}
                    value={value}
                    onBlur={onBlur}
                    type="date"
                    min={dayjs().format('YYYY-MM-DD')}
                    className="form-control" />
                )}
              />
              {errors.date_start && <small className="form-text text-muted">{errors.date_start.message}</small>}
            </div>
          </div> */}
          <LoadingButton
            className="mt-5"
            text="Lưu"
            type="submit"
            loading={isLoading}
          // loading={isLoadingCreate || isLoadingUpdate}
          />
        </form>
      </div>
    </div>
  )
}