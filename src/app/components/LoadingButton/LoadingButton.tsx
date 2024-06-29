import React, { FC } from "react";

interface LoadingButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  text?: string
}

export const LoadingButton: FC<LoadingButtonProps> = ({
  loading,
  text = '',
  ...res
}) => {
  return (
    <button className="btn btn-primary" type="button" disabled={loading} style={{ width: 'fit-content' }} {...res}>
      {
        loading ?
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </>
          :
          <>
            {text}
          </>
      }
    </button>
  )
}