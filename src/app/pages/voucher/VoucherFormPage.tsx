import dayjs from "dayjs";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePostDiscount } from "./functions";
import { PostDiscount } from "../../interfaces";

const isValidDate = (dateString: string) => {
  // Validate DD/MM/YYYY format using regular expression
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
};
const today = new Date().toISOString().split('T')[0];


export const VoucherFormPage: FC = () => {
  const [campaign, setCampaign] = useState(0)
  const { mutate } = usePostDiscount()
  const { control, formState: { errors }, getValues, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      coupon_code: '',
      description: '',
      valid_from: '',
      valid_util: '',
      discount_value: 1000,
      total: 0
    }
  })
  const onSubmit = (data: any) => {
    const value: PostDiscount = Object.assign(data, {
      valid_from:dayjs(data.valid_from).format('YYYY-MM-DD HH:mm:ss'),
      valid_util:dayjs(data.valid_util).format('YYYY-MM-DD HH:mm:ss'),
      discount_value: Number(data.discount_value),
      total: campaign === 1 ? Number(data.total) : undefined,
      is_campaign:campaign
    })
    mutate(value)
  }
  return (
    <div className="card" style={{ padding: 12 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-check form-switch">
            <input onChange={e => setCampaign(e.target.checked ? 1 : 0)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Campaign</label>
          </div>
          {
            campaign === 1 &&
            <div className="form-group mt-5 col-12 col-md-3">
              <label>Số lượng mã</label>
              <Controller
                control={control}
                rules={{
                  required: 'Nhập số lượng mã', // Required validation rule
                  validate: {
                    isGreaterThan1000: (value) => Number(value) >= 1 || 'Số tiền lớn hơn 1'
                  }
                }}
                name="total"
                render={({ field: { onChange, onBlur, value } }) => (
                  <input type="number" onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
                )}
              />
              {errors.total && <small className="form-text text-muted">{errors.total.message}</small>}
            </div>
          }
        </div>
        <div className="d-flex justify-content-between mt-5">
          <div className="form-group col-12 col-md-6">
            <label>TIêu đề</label>
            <Controller
              rules={{ required: "Nhâp tiêu đề" }}
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
              )}
            />
            {errors.title && <small className="form-text text-muted">{errors.title.message}</small>}
          </div>
          <div className="form-group col-12 col-md-5">
            <label>Code</label>
            <Controller
              rules={{ required: "Nhâp mã" }}
              control={control}
              name="coupon_code"
              render={({ field: { onChange, onBlur, value } }) => (
                <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
              )}
            />
            {errors.coupon_code && <small className="form-text text-muted">{errors.coupon_code.message}</small>}
          </div>
        </div>
        <div className="form-group mt-5">
          <label>Mô tả</label>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
            )}
          />
        </div>
        <div className="form-group mt-5 col-12 col-md-3">
          <label>Giảm giá còn</label>
          <Controller
            control={control}
            rules={{
              required: 'Nhập số tiền', // Required validation rule
              validate: {
                isGreaterThan1000: (value) => Number(value) >= 1000 || 'Số tiền lớn hơn 1.000 đ'
              }
            }}
            name="discount_value"
            render={({ field: { onChange, onBlur, value } }) => (
              <input type="number" onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
            )}
          />
          {errors.discount_value && <small className="form-text text-muted">{errors.discount_value.message}</small>}
        </div>
        <div className="d-flex mt-5">
          <div className="form-group col-12 col-md-3">
            <label>Áp dụng từ ngày</label>
            <Controller
              control={control}
              rules={{
                required: 'Nhập ngày',
              }}
              name="valid_from"
              render={({ field: { onChange, onBlur, value } }) => (
                <input type="date" onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" min={today} />
              )}
            />
            {errors.valid_from && <small className="form-text text-muted">{errors.valid_from.message}</small>}
          </div>
          <div className="form-group col-12 col-md-3" style={{ marginLeft: 12 }}>
            <label>Đến ngày</label>
            <Controller
              control={control}
              rules={{
                required: 'Nhập ngày',
              }}
              name="valid_util"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur}
                  type="date"
                  min={getValues('valid_from') ? dayjs(getValues('valid_from')).format('YYYY-MM-DD') : today}
                  className="form-control" />
              )}
            />
            {errors.valid_util && <small className="form-text text-muted">{errors.valid_util.message}</small>}

          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">Submit</button>
      </form>
    </div>
  )
}