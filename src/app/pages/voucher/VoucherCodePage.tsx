/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDiscountCampaign } from "./functions";
import { Pagination } from "@mui/material";
import { LoadingButton } from "../../components";
import { DiscountCampaignResponse, ResponsePagination, Response } from "../../interfaces";
import { useMutation } from "react-query";
import { DiscountApi } from "../../apis";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx"
import dayjs from "dayjs";

export const VoucherCodePage: FC = () => {
  const params = useParams()
  const [p, setP] = useState(1)
  const id = params.id
  const { codes, total, total_page } = useGetDiscountCampaign(Number(id), {
    page: p,
    limit: 15
  })


  return (
    <div className={`card p-2`}>
      {/* begin::Header */}
      <ExportCode id={Number(id)} />
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='text-muted mt-1 fw-semobold fs-7'>{total} mã</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='min-w-125px'>Mã</th>
                <th className='min-w-125px'>Trạng thái</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {
                codes.map(i => (
                  <tr key={i.coupon_code}>
                    <td>
                      <span className='text-muted fw-semobold text-muted d-block fs-7'>
                        {i.coupon_code}
                      </span>
                    </td>
                    <td>
                      <span className='text-muted fw-semobold text-muted d-block fs-7'>
                        {i.status === 0 ? 'Chưa sử dụng' : 'Đã sử dụng'}
                      </span>
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
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          onChange={(_e, page) => setP(page)}
          count={total_page}
          color="primary"
        />
      </div>
    </div>
  )
}

interface ExportCodeProps {
  id: number;
  title?: string
}

export const ExportCode: FC<ExportCodeProps> = ({ id, title = ' Xuất mã giảm giá' }) => {
  const [totalPage, setTotalPage] = useState(1)
  const limit = 30
  const [codes, setCodes] = useState<DiscountCampaignResponse[]>([])
  const { mutate, data, isLoading } = useMutation<Response<ResponsePagination<DiscountCampaignResponse[]>>, Error, any>({
    mutationKey: ['DiscountCampaignResponse', id],
    mutationFn: (page: number) => DiscountApi.getCodeCampaign(id, { page, limit }),
    onSuccess(data) {
      const codesPerPage = data.context.data
      setCodes(prev => {
        return prev = [...prev, ...codesPerPage]
      })
      setTotalPage(Math.ceil(data.context.total / limit))
    },
  })

  const onGetCode = () => {
    setCodes([])
    setTotalPage(1)
    mutate(1)
  }
  useEffect(() => {
    if (totalPage > 1) {
      for (var i = 2; i <= totalPage; i++) { mutate(i) }
    }
  }, [totalPage])
  useEffect(() => {
    if (codes.length === data?.context.total) {
      onExportFile({
        file_name: `discount_${dayjs().format('YYYY-MM-DD')}`,
        codes: codes
      })
    }
  }, [codes, data?.context.total])
  return (
    <>
      <LoadingButton
        color="success"
        onClick={onGetCode}
        loading={isLoading}
        text="Lưu mã"
      />
    </>
  )
}
const onExportFile = ({ file_name, codes }: { file_name: string, codes: DiscountCampaignResponse[] }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  // Create an array of data with custom color and additional text

  // Create an array for the title row
  const titleRow = ['STT', 'Danh sách mã', 'Trạng thái sử dụng']; // Replace with your actual titles

  // Add the title row to the beginning of the data array
  const dataWithTitles = [titleRow, ...codes.map((item, i) => [i + 1, item.coupon_code, item.status === 0 ? "Chưa sử dụng" : "Đã sử dụng"])];

  // Convert the data array to a worksheet
  const ws = XLSX.utils.aoa_to_sheet(dataWithTitles);
  // Define column widths
  const columnWidths = [
    { wch: 8 }, // Width of column 3 (8 characters)
    { wch: 35 },
    { wch: 25 },
  ];

  // Set column widths in the worksheet
  ws['!cols'] = columnWidths;

  // Create a workbook containing the worksheet
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Convert the workbook to an Excel buffer
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the Excel buffer
  const data = new Blob([excelBuffer], { type: fileType });

  // Save the Blob as a file using FileSaver
  FileSaver.saveAs(data, `Ma_giam_gia_${file_name}_${dayjs().format('DDHHmmss')}` + fileExtension);

}