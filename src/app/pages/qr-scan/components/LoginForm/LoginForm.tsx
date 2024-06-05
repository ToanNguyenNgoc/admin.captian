import { FC } from 'react'
import style from './login-form.module.css'
import * as Yup from 'yup'
import { useFormik } from "formik";
import clsx from "clsx";
import { useMutation } from 'react-query';
import { AuthApi } from '../../../../apis';
import { InitLoaderPage } from '../../../../components';
import { useStores } from '../../../../models/store';
import { storage_key } from '../../../../utils';


const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'hdlong.net@gmail.com',
  password: '123456',
}

export const LoginForm: FC = () => {
  const { userScanModel } = useStores()
  const mutateLogin = useMutation({
    mutationFn: (body: { email: string, password: string }) => AuthApi.login(body),
    onSuccess: (data) => {
      const response = data.context
      if (response) {
        userScanModel.onSetLogin()
        sessionStorage.setItem(storage_key.auth_token_scan, response.token)
      }
      InitLoaderPage.offLoading()
    },
    onError: (data) => {
      console.log(data)
      InitLoaderPage.offLoading()
    }
  })
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      InitLoaderPage.onLoading()
      mutateLogin.mutate(values)
    }
  })
  return (
    <div className={style.cnt}>
      <form
        className='form w-100'
        style={{ maxWidth: '500px' }}
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Sign In to Check in</h1>
        </div>
        {/* begin::Heading */}
        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              {/* begin::Label */}
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
              {/* end::Label */}
            </div>
          </div>
          <input
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <span className='indicator-label'>Continue</span>
          </button>
        </div>
        {/* end::Action */}
      </form>
    </div>
  )
}