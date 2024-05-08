import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Summary from "./Summary";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from 'primereact/utils';
import { RadioButton } from "primereact/radiobutton";


const Shipping = ({ shipping, setShipping, moveToSecondStep }) => {

    const categories = [
        { name: 'איסוף עצמי', key: 'bySelf' },
        { name: 'משלוח עד הבית', key: 'home' }
    ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);


    useEffect(() => {
        if (selectedCategory.key === 'home') {
            setShipping(true)
        }
        else {
            setShipping(false)
        }
    }, [selectedCategory])

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            city: '',
            street: '',
            building: '',
            apartment: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'שדה חובה';
            }

            if (!data.firstName) {
                errors.firstName = 'שדה חובה';
            }

            if (!data.lastName) {
                errors.lastName = 'שדה חובה';
            }

            if (!data.phone) {
                errors.phone = 'שדה חובה';
            }

            if (selectedCategory.key === "home") {
                if (!data.city) {
                    errors.city = 'שדה חובה';
                }

                if (!data.street) {
                    errors.street = 'שדה חובה';
                }

                if (!data.building) {
                    errors.building = 'שדה חובה';
                }
            }

            return errors;
        },
        onSubmit: () => {
            moveToSecondStep()
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (
        <>
            <div className="warpper">
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">

                    <label htmlFor="email">כתובת דוא"ל *</label>
                    <InputText
                        // keyfilter="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                    />
                    {getFormErrorMessage('email')}

                    <label htmlFor="firstName">שם פרטי *</label>
                    <InputText
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={(e) => {
                            formik.setFieldValue('firstName', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('firstName') })}
                    />
                    {getFormErrorMessage('firstName')}

                    <label htmlFor="lastName">שם משפחה *</label>
                    <InputText
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={(e) => {
                            formik.setFieldValue('lastName', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('lastName') })}
                    />
                    {getFormErrorMessage('lastName')}

                    <label htmlFor="phone">מספר טלפון *</label>
                    <InputText
                        keyfilter="int"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={(e) => {
                            formik.setFieldValue('phone', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                    />
                    {getFormErrorMessage('phone')}

                    {categories.map((category) => {
                        return (
                            <div key={category.key} className="flex align-items-center">
                                <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} />
                                <label htmlFor={category.key} className="ml-2">{category.name}</label>
                            </div>
                        );
                    })}

                    {selectedCategory.key === "home" ?
                        <>
                            <label htmlFor="city">עיר *</label>
                            <InputText
                                id="city"
                                name="city"
                                value={formik.values.city}
                                onChange={(e) => {
                                    formik.setFieldValue('city', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('city') })}
                            />
                            {getFormErrorMessage('city')}

                            <label htmlFor="street">רחוב *</label>
                            <InputText
                                id="street"
                                name="street"
                                value={formik.values.street}
                                onChange={(e) => {
                                    formik.setFieldValue('street', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('street') })}
                            />
                            {getFormErrorMessage('street')}

                            <label htmlFor="building">מספר *</label>
                            <InputText
                                id="building"
                                name="building"
                                value={formik.values.building}
                                onChange={(e) => {
                                    formik.setFieldValue('building', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('building') })}
                            />
                            {getFormErrorMessage('building')}

                            <label htmlFor="apartment">דירה</label>
                            <InputText
                                id="apartment"
                                name="apartment"
                                value={formik.values.apartment}
                                onChange={(e) => {
                                    formik.setFieldValue('apartment', e.target.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('apartment') })}
                            />


                        </>
                        : <></>}

                    <Button type="submit" label="הבא" />
                </form>

                <Summary shipping={shipping} />
            </div>
        </>
    )
}

export default Shipping