import { FC, useState } from "react";
import { useGetTickets, useUpdateTicket } from "./functions";
import { useNavigate } from "react-router-dom";
import { KTSVG } from "../../../_metronic/helpers";
import dayjs from "dayjs";
import { formatPrice } from "../../utils";
import { TicketResponse } from "../../interfaces";

export const TicketPage: FC = () => {
  const { tickets, total = 0 } = useGetTickets({ page: 1, limit: 100 })
  const navigate = useNavigate()
  return (
    <div>
      <div className={`card`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='text-muted mt-1 fw-semobold fs-7'>{total} Vé</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <div
              onClick={() => navigate('/crafted/ticket-form')}
              className='btn btn-sm btn-light-primary'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_invite_friends'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Tạo mới
            </div>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-140px'>Tiêu đề</th>
                  <th className='min-w-120px'>Nội dung</th>
                  <th className='min-w-120px'>Trạng thái</th>
                  <th className='min-w-120px'>Giá gốc</th>
                  <th className='min-w-120px'>Giá giảm</th>
                  <th className='min-w-120px'>Từ ngày</th>
                  <th className='min-w-120px'>Đến ngày</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {
                  tickets.map(i => (
                    <Item key={i.id} i={i} />
                  ))
                }
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </div>
  )
}

const Item: FC<{ i: TicketResponse }> = ({
  i
}) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(i.status)
  const { mutate } = useUpdateTicket(i.id)
  const onChangeStatus = (st: number) => {
    setStatus(st)
    mutate(Object.assign(i, { status: st }))
  }
  return (
    <tr key={i.id}>
      <td>
        <span className='text-dark fw-bold text-hover-primary fs-6'>
          {i.title}
        </span>
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-7'>
          {i.content}
        </span>
      </td>
      <td>
        <div className="form-check form-switch">
          <input
            onChange={e => onChangeStatus(e.target.checked ? 1 : 0)}
            checked={status === 1 ? true : false}
            className="form-check-input" type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </div>
      </td>
      <td>
        {formatPrice(i.price)}
      </td>
      <td>
        {formatPrice(i.price_sale)}
      </td>
      <td>
        {dayjs(i.date_start).format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(i.date_end).format("DD/MM/YYYY")}
      </td>
      <td>
        <div className='d-flex justify-content-end flex-shrink-0'>
          <div
            onClick={() => navigate(String(i.id))}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen019.svg'
              className='svg-icon-3'
            />
          </div>
          <div
            onClick={() => navigate(`/crafted/ticket-form/${i.id}`)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </div>
          {/* <div
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen027.svg'
              className='svg-icon-3'
            />
          </div> */}
        </div>
      </td>
    </tr>
  )
}