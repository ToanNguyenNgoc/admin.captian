import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetTicketDetail, usePostTicket, useUpdateTicket } from "./functions";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { PostTicket } from "../../interfaces";
import { LoadingButton } from "../../components";
import { entityObj } from "../../utils";

const today = new Date().toISOString().split('T')[0];

export const TicketFormPage: FC = () => {
  const id = useParams().id
  const [status, setStatus] = useState(false)
  const { handleSubmit, formState: { errors }, control, setValue } = useForm({
    defaultValues: {
      title: '',
      content: '',
      note: '',
      date_start: dayjs().format('YYYY-MM-DD'),
      date_end: dayjs().format('YYYY-MM-DD'),
      price: 0,
      price_sale: 0,
    }
  })
  useGetTicketDetail(Number(id), {
    enabled: !!id,
    onSuccess: (data) => {
      if (data.context) {
        const { title, content, status, price, price_sale, note, date_start, date_end } = data.context
        setStatus(status)
        setValue('title', title)
        setValue('content', content)
        setValue('price', price)
        setValue('price_sale', price_sale)
        setValue('note', note)
        setValue('date_start', dayjs(date_start).format('YYYY-MM-DD'))
        setValue('date_end', dayjs(date_end).format('YYYY-MM-DD'))
      }
    }
  })
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useUpdateTicket(Number(id), true)
  const { mutate: mutateCreate, isLoading: isLoadingCreate } = usePostTicket()
  const onSubmit = (data: any) => {
    const body: PostTicket = Object.assign(data, {
      status,
      price: Number(data.price),
      date_start: dayjs(data.date_start).format('YYYY-MM-DD HH:mm:ss'),
      date_end: dayjs(data.date_end).format('YYYY-MM-DD HH:mm:ss'),
    })
    if (id) {
      mutateUpdate(entityObj<PostTicket>(body))
    } else {
      mutateCreate(entityObj<PostTicket>(body))
    }
  }
  return (
    <div className="card p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-check form-switch">
            <input
              checked={status}
              onChange={e => setStatus(e.target.checked)} className="form-check-input"
              type="checkbox" id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Trạng thái</label>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-5">
          <div className="form-group col-12 col-md-6">
            <label>Tiêu đề</label>
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
            <label>Nội dung</label>
            <Controller
              rules={{ required: "Nhâp nội dung" }}
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <input onChange={e => onChange(e.target.value)} value={value} onBlur={onBlur} className="form-control" />
              )}
            />
            {errors.content && <small className="form-text text-muted">{errors.content.message}</small>}
          </div>
        </div>
        <div className="d-flex mt-5">
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
                // required: "Nhâp giá tiền",
                // validate: {
                //   isGreaterThan1000: (value) => Number(value) >= 1000 || 'Số tiền lớn hơn 1.000 đ'
                // }
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
        </div>
        <LoadingButton
          className="mt-5"
          text="Lưu"
          type="submit"
          loading={isLoadingCreate || isLoadingUpdate}
        />
      </form>
    </div>
  )
}