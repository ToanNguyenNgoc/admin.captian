import { FC } from "react";
import { TablesWidget9 } from "../../../_metronic/partials/widgets";
import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import { useGetDiscounts } from "./functions";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const VoucherPage: FC = () => {
  const { discounts, total = 0 } = useGetDiscounts()
  const navigate = useNavigate()
  return (
    <div>
      <div className={`card`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='text-muted mt-1 fw-semobold fs-7'>{total} Mã</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <div
              onClick={() => navigate('/crafted/voucher-form')}
              className='btn btn-sm btn-light-primary'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_invite_friends'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              New Member
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
                  <th className='min-w-150px'>Code</th>
                  <th className='min-w-140px'>Tiêu đề</th>
                  <th className='min-w-120px'>Số lượng mã</th>
                  <th className='min-w-120px'>Campaign</th>
                  <th className='min-w-120px'>Giảm giá còn</th>
                  <th className='min-w-120px'>Từ ngày</th>
                  <th className='min-w-120px'>Đến ngày ngày</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {
                  discounts.map(i => (
                    <tr key={i.id}>
                      <td>
                        <span className='text-dark fw-bold text-hover-primary fs-6'>
                          {i.coupon_code}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {i.title}
                        </span>
                      </td>
                      <td>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-muted me-2 fs-7 fw-semobold'>
                            {i.total || 'Không giới hạn'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input disabled checked={i.is_campaign === 1 ? true : false} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        </div>
                      </td>
                      <td>
                        {i.discount_value}
                      </td>
                      <td>
                        {dayjs(i.valid_from).format("DD/MM/YYYY")}
                      </td>
                      <td>
                        {dayjs(i.valid_util).format("DD/MM/YYYY")}
                      </td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <div
                            onClick={()=> navigate(String(i.id))}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </div>
                          {/* <div
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                          </div>
                          <div
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