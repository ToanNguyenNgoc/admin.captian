import { FC, useState } from "react";
import QrReader from "react-qr-reader";

export const QrScanPage: FC = () => {
  const [data, setData] = useState('')
  const handleScan = (e: string | null) => {
    if (e) {
      setData(e)
    }
  }
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }} >
      <p>{data}</p>
      <QrReader
        delay={5000}
        style={{ width: "70vw", aspectRatio: '1/1' }}
        onScan={handleScan}
        onError={(e: any) => console.log(e)}
      />
    </div>
  )
}