import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useLoginMutation } from '../Store/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../Store/authSlice';
import { useDispatch } from 'react-redux';
import { Toast } from 'primereact/toast';
import '../CSS/Auth.css'



const Login = () => {


    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFunc, { isError, isSuccess, data }] = useLoginMutation()

    const toast = useRef(null);

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שם משתמש או הסיסמה אינם נכונים', life: 3000 });
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate("/")
        }
    }, [isSuccess])


    useEffect(() => {
        if (isError) {
            showError()
        }
    }, [isError])

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.userName) {
                errors.userName = 'שדה חובה';
            }

            if (!data.password) {
                errors.password = 'שדה חובה';
            }

            return errors;
        },
        onSubmit: (data) => {
            loginFunc(data);
            formik.resetForm();

        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (

        <div className="mainDiv">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <br />
                <h1>התחברות</h1>
                <br />
                <br />
                <Toast ref={toast} position="top-center" />
                <span className="p-float-label">
                    <InputText
                        id="userName"
                        name="userName"
                        value={formik.values.userName}
                        onChange={(e) => {
                            formik.setFieldValue('userName', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('userName') })}
                    />
                    <label htmlFor="userName">שם משתמש*</label>
                </span>
                {getFormErrorMessage('userName')}
                <br />
                <br />

                <span className="p-float-label">
                    <InputText
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                    />
                    <label htmlFor="password">סיסמה*</label>
                </span>
                {getFormErrorMessage('password')}
                <br />
                <br />

                <Button type="submit" label="התחברות" />
                <br />
                <br />
                <br />
                <span>עדיין לא רשומים?</span>
                <Button label="הרשמה" onClick={() => Navigate("/register")} />

            </form>
        </div>
    )
}


export default Login
