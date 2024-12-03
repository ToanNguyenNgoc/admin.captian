import { FC } from "react";
import { useGetOrders } from "./functions";
import { KTSVG } from "../../../_metronic/helpers";
import { formatPrice } from "../../utils";
import dayjs from "dayjs";
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { OrderRequest } from "../../interfaces";
import { identity, omit, pickBy } from "lodash";
import { useGetTickets } from "../ticket/functions";

const status = ['PAID', 'PENDING', 'ERROR', 'CANCELED']

const renderStatus = (status: 'PAID' | 'PENDING' | 'ERROR' | 'CANCELED' | 'CANCELED_BY_USER') => {
  let el = (<span className='badge badge-light-success'>{status}</span>);
  switch (status) {
    case 'PENDING':
      el = <span className='badge badge-light-warning'>{status}</span>
      break;
    case 'CANCELED':
      el = <span className='badge badge-light-danger'>{status}</span>
      break;
    case 'ERROR':
      el = <span className='badge badge-light-danger'>{status}</span>
      break;
    case 'CANCELED_BY_USER':
      el = <span className='badge badge-light-danger'>{status}</span>
      break;
    default:
      break;
  }
  return el
}

export const OrderPage: FC = () => {
  const { tickets } = useGetTickets({ page: 1, limit: 100 })
  const location = useLocation()
  const navigate = useNavigate()
  const params = queryString.parse(location.search) as OrderRequest
  const { orders, total_page, total } = useGetOrders(Object.assign(params, {
    page: 1,
    limit: 10,
    sort: '-created_at'
  }))
  const onChangePage = (page: number) => {
    let newParams = Object.assign(params, { page })
    if (page === 1) {
      //@ts-ignore
      newParams = omit(newParams, ['page'])
    }
    navigate(`?${queryString.stringify(newParams)}`)
  }
  const handleChange = (event: SelectChangeEvent) => {
    const newParams = pickBy(Object.assign(omit(params, ['page']), { status: event.target.value }), identity())
    navigate(`?${queryString.stringify(newParams)}`)
  };
  const handleChangeSelectTicket = (event: SelectChangeEvent) => {
    const newParams = pickBy(Object.assign(omit(params, ['page']), { ticket_id: event.target.value }), identity())
    navigate(`?${queryString.stringify(newParams)}`)
  }
  return (
    <div className={`card`} style={{ minHeight: 800 }}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='text-muted mt-1 fw-semobold fs-7'>{total} Đơn</span>
        </h3>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={params.status || ''}
            onChange={handleChange}
          >
            <MenuItem value={''}>Tất cả</MenuItem>
            {
              status.map(i => (
                <MenuItem key={i} value={i}>{i}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small-label">Vé</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={params.ticket_id || ''}
            onChange={handleChangeSelectTicket}
          >
            <MenuItem value={''}>Tất cả</MenuItem>
            {
              tickets.map(i => (
                <MenuItem key={i.id} value={i.id}>{i.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-50px'>Order Id</th>
                <th className='min-w-150px'>Code</th>
                <th className='min-w-140px'>Tên KH</th>
                <th className='min-w-120px'>Email</th>
                <th className='min-w-120px'>Số điện thoại</th>
                <th className='min-w-120px'>Thanh toán</th>
                <th className='min-w-120px'>Trạng thái</th>
                <th className='min-w-120px'>Ngày mua</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {
                orders.map(i => (
                  <tr key={i.id}>
                    <td>
                      <p className='text-dark fw-bold text-hover-primary fs-6'>
                        {i.id}
                      </p>
                    </td>
                    <td>
                      <p className='text-dark text-hover-primary fs-6'>
                        {i.tran_uid}
                      </p>
                    </td>
                    <td>
                      <p className="text-dark"> {i.fullname}</p>
                    </td>
                    <td>
                      <span className='text-muted fw-semobold text-muted d-block fs-7'>{i.email}</span>
                    </td>
                    <td>
                      <span className='text-muted fw-semobold text-muted d-block fs-7'>{i.telephone}</span>
                    </td>
                    <td>
                      <p className='text-dark fw-bold text-hover-primary fs-6'>
                        {formatPrice(i.amount)}
                      </p>
                    </td>
                    <td>
                      {renderStatus(i.status)}
                    </td>
                    <td>
                      {dayjs(i.created_at).format('HH:mm, [ngày] DD/MM/YYYY')}
                    </td>
                    <td className='text-end'>
                      {/* <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                      </a> */}
                      <Link
                        to={`/crafted/order-form/${i.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                      </Link>
                      <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                      </a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <Pagination
          count={total_page}
          color="primary"
          page={Number(params.page || 1)}
          onChange={(_e, page) => onChangePage(page)}
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}