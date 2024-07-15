import React, { useState } from "react";
import { Steps } from 'primereact/steps';
import Shipping from "./Shipping";
import Payment from "./Payment";
import '../../CSS/Order.css'


const Order = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [shipping, setShipping] = useState(false)
    const [details, setDetails] = useState({
        email :'',
        name: '',
        phone:'',
        city:'',
        street:'',
        num:'',
        apartment:''
    })

    const items = [
        {
            label: 'משלוח'
        },
        {
            label: 'תשלום'
        }
    ];

    const onStepChange = (e) => {
        setCurrentStep(e.index);
    };

    const moveToSecondStep = () => {
        setCurrentStep(1);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <Shipping setDetails={setDetails} shipping={shipping} setShipping={setShipping} moveToSecondStep={moveToSecondStep}/>
            case 1:
                return <Payment details={details} shipping={shipping}/>
            default:
                return null;
        }
    };

    return (
        <>
            <br/>
            <div style={{width:"50%"}}>
                <Steps model={items} activeIndex={currentStep} onSelect={onStepChange} />
            </div>
            <div style={{ marginTop: "20px" }}>
                {renderStepContent()}
            </div>
        </>
    )
}

export default Order