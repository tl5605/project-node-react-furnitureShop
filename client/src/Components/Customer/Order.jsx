import React, { useState } from "react";
import { Steps } from 'primereact/steps';
import Shipping from "./Shipping";
import Payment from "./Payment";
import '../../CSS/Order.css'


const Order = () => {
    const [currentStep, setCurrentStep] = useState(0); // State to track current step
    const [shipping, setShipping] = useState(false)

    const items = [
        {
            label: 'משלוח'
        },
        {
            label: 'תשלום'
        }
    ];

    // Function to handle step change
    const onStepChange = (e) => {
        setCurrentStep(e.index);
    };

    const moveToSecondStep = () => {
        setCurrentStep(1);
    };

    // Content to be displayed for each step
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <Shipping shipping={shipping} setShipping={setShipping} moveToSecondStep={moveToSecondStep}/>
            case 1:
                return <Payment shipping={shipping}/>
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
            {/* <Button onClick={moveToSecondStep}/> */}
        </>
    )
}

export default Order