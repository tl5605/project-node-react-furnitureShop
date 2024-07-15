import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useRegisterMutation } from '../Store/authApiSlice';
import { useNavigate } from "react-router-dom";
import '../CSS/Auth.css'



const Register = () => {

    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    const navigate = useNavigate()

    const toast = useRef(null);

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שם משתמש תפוס', life: 3000 });
    }

    useEffect(() => {
        if (isSuccess) {
            localStorage.removeItem("basket")
            navigate("/login")
        }
    }, [isSuccess])


    useEffect(() => {
        if (isError) {
            showError()
        }
    }, [isError])


    const formik = useFormik({
        initialValues: {
            name: '',
            userName: '',
            password: '',
            email: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'שדה חובה';
            }

            if (!data.userName) {
                errors.userName = 'שדה חובה';
            }

            if (!data.password) {
                errors.password = 'שדה חובה';
            }

            return errors;
        },
        onSubmit: (data) => {
            registerFunc(data)
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
                <h1>הרשמה</h1>
                <br />
                <br />
                <Toast ref={toast} position="top-center" />
                <span className="p-float-label">
                    <InputText
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={(e) => {
                            formik.setFieldValue('name', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                    />
                    <label htmlFor="name">שם*</label>
                </span>
                {getFormErrorMessage('name')}
                <br />
                <br />



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


                <span className="p-float-label">
                    <InputText id="email" value={formik.values.email} onChange={(e) => { formik.setFieldValue('email', e.target.value); }} />
                    <label htmlFor="email">מייל</label>
                </span>
                <br />
                <br />


                <Button type="submit" label="הרשמה" />
            </form>
        </div>
    )
}


export default Register
