import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useAddFurnitureMutation, useDeleteFurnitureMutation, useGetFurnitureByCategoryQuery, useUpdateFurnitureMutation } from '../../Store/furnitureApiSlice'
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2'
import '../../CSS/Furniture.css'


const ArmchairsM = () => {

    const toast = useRef(null);

    const [armchairs, setArmchairs] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [updatearmchair, setUpdatearmchair] = useState(null)

    const [codeAdd, setCodeAdd] = useState("");
    const [descriptionAdd, setDescriptionAdd] = useState("");
    const [stockAdd, setStockAdd] = useState("");
    const [priceAdd, setPriceAdd] = useState("");
    const [imgUrlAdd, setImgUrlAdd] = useState("");

    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [stockUpdate, setStockUpdate] = useState("");
    const [priceUpdate, setPriceUpdate] = useState("");
    const [imgUrlUpdate, setImgUrlUpdate] = useState("");

    const [codeDisabledAdd, setCodeDisabledAdd] = useState(true);
    const [priceDisabledAdd, setPriceDisabledAdd] = useState(true);

    const [priceDisabledUpdate, setPriceDisabledUpdate] = useState(false);

    const { data, isLoading, isError, error } = useGetFurnitureByCategoryQuery("armchair")



    const handleAddImage = (event) => {
        setImgUrlAdd(event.target.files[0]);
    };

    const handleUpdateImage = (event) => {
        setImgUrlUpdate(event.target.files[0]);
    };


    const [deleteFunc] = useDeleteFurnitureMutation()
    const handleDeleteClick = (armchair) => {
        Swal.fire({
            title: "Are you sure?",
            text: "?that you want to delete this furniture",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes I want to delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFunc(armchair._id)
                
                Swal.fire({
                    title: "!Deleted",
                    text: "This furniture has been deleted",
                    icon: "success"
                });
            }
        });
    }

    const [updateFunc] = useUpdateFurnitureMutation()
    const handleUpdateClick = (armchair) => {
        const formData = new FormData()

        formData.append("_id", armchair._id)
        formData.append("description", descriptionUpdate)
        formData.append("stock", stockUpdate)
        formData.append("price", priceUpdate)
        formData.append("image", imgUrlUpdate)

        updateFunc(formData)
    }


    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const footerContentUpdate = (
        <div>
            <Button disabled={priceDisabledUpdate} label="עדכון" onClick={() => {
                setVisibleUpdate(false);
                handleUpdateClick(updatearmchair)
                setUpdatearmchair(null)
            }} autoFocus />
            <Button label="ביטול" onClick={() => {
                setPriceDisabledUpdate(false)
                setUpdatearmchair(null)
                setVisibleUpdate(false);
            }} className="p-button-text" />
        </div>
    );


    const [addFunc, { isError: isError_t }] = useAddFurnitureMutation()
    const handleAddClick = () => {
        const formData = new FormData()

        formData.append("code", codeAdd)
        formData.append("category", "armchair")
        formData.append("description", descriptionAdd)
        formData.append("price", priceAdd)
        formData.append("image", imgUrlAdd)

        if (stockAdd) {
            formData.append("stock", stockAdd)
        }
        addFunc(formData)
    }

    const [visibleAdd, setVisibleAdd] = useState(false);
    const footerContentAdd = (
        <div>
            <Button disabled={codeDisabledAdd || priceDisabledAdd} label="שמירה" onClick={() => {
                setVisibleAdd(false);
                setCodeDisabledAdd(true)
                setPriceDisabledAdd(true)
                handleAddClick()
            }} autoFocus />
            <Button label="ביטול" onClick={() => {
                setVisibleAdd(false);
                setCodeDisabledAdd(true)
                setPriceDisabledAdd(true)
            }} className="p-button-text" />
        </div>
    );

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'קוד תפוס', detail: 'הפריט לא נוסף', life: 3000 });
    }

    useEffect(() => {
        if (isError_t) {
            showError()
        }
    }, [isError_t])


    useEffect(() => {
        if (data) {
            setArmchairs(data);
        }
    }, [data]);

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <h2>{error}</h2>
    }


    const listItem = (armchair, index) => {
        return (
            <div className="col-12" key={armchair.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:6789/uploads/${armchair?.image?.split("\\")[2]}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">קוד מוצר: {armchair.code}</div>
                            <div className="text-2xl font-bold text-900">{armchair.description}</div>
                            <div className="text-1xl font-bold text-900">המלאי עומד על: {armchair.stock}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{armchair.price} ₪</span>
                            <Button onClick={() => { handleDeleteClick(armchair) }} icon="pi pi-trash" rounded outlined aria-label="Filter" />
                            <Button icon="pi pi-pencil" rounded outlined aria-label="Filter" onClick={() => {

                                setVisibleUpdate(true);
                                setUpdatearmchair(armchair);
                                setDescriptionUpdate(armchair.description);
                                setStockUpdate(armchair.stock);
                                setPriceUpdate(armchair.price);
                                setImgUrlUpdate(armchair.image);
                            }} />

                            <Dialog header="עריכת כורסא" visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => setVisibleUpdate(false)} footer={footerContentUpdate}>
                                <p className="m-0">
                                    <br />

                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputText
                                                keyfilter="int"
                                                value={priceUpdate}
                                                onChange={(e) => {
                                                    setPriceUpdate(e.target.value)
                                                    setPriceDisabledUpdate(!e.target.value.trim())
                                                }}
                                            />
                                            <label htmlFor="מחיר">מחיר*</label>
                                        </span>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputText keyfilter="int" value={stockUpdate} onChange={(e) => setStockUpdate(e.target.value)} />
                                            <label htmlFor="מלאי">מלאי</label>
                                        </span>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputTextarea value={descriptionUpdate} onChange={(e) => setDescriptionUpdate(e.target.value)} rows={4} cols={23} />
                                            <label htmlFor="תיאור מוצר">תיאור מוצר</label>
                                        </span>
                                    </div>

                                    <br />
                                    <input type="file" name="image" onChange={handleUpdateImage} />
                                </p>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (armchair) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={armchair.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:6789/uploads/${armchair?.image?.split("\\")[2]}`} alt={"armchair"} />
                        <div className="text-2xl font-bold text-900">קוד מוצר: {armchair.code}</div>
                        <div className="gridDescription">{armchair.description}</div>
                        <div className="text-1xl font-bold text-900">המלאי עומד על: {armchair.stock}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{armchair.price} ₪</span>
                        <span className='icons'>
                            <Button onClick={() => { handleDeleteClick(armchair) }} icon="pi pi-trash" rounded outlined aria-label="Filter" />
                            <Button icon="pi pi-pencil" rounded outlined aria-label="Filter" onClick={() => {
                                setVisibleUpdate(true);
                                setUpdatearmchair(armchair);
                                setDescriptionUpdate(armchair.description);
                                setStockUpdate(armchair.stock);
                                setPriceUpdate(armchair.price);
                                setImgUrlUpdate(armchair.image);
                            }} />

                            <Dialog header="עריכת כורסא" visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => setVisibleUpdate(false)} footer={footerContentUpdate}>
                                <p className="m-0">
                                    <br />

                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputText
                                                keyfilter="int"
                                                value={priceUpdate}
                                                onChange={(e) => {
                                                    setPriceUpdate(e.target.value)
                                                    setPriceDisabledUpdate(!e.target.value.trim())
                                                }}
                                            />
                                            <label htmlFor="מחיר">מחיר*</label>
                                        </span>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputText keyfilter="int" value={stockUpdate} onChange={(e) => setStockUpdate(e.target.value)} />
                                            <label htmlFor="מלאי">מלאי</label>
                                        </span>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputTextarea value={descriptionUpdate} onChange={(e) => setDescriptionUpdate(e.target.value)} rows={4} cols={23} />
                                            <label htmlFor="תיאור מוצר">תיאור מוצר</label>
                                        </span>
                                    </div>

                                    <br />
                                    <input type="file" name="image" onChange={handleUpdateImage} />
                                </p>
                            </Dialog>
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (armchair, layout, index) => {
        if (!armchair) {
            return;
        }

        if (layout === 'list') return listItem(armchair, index);
        else if (layout === 'grid') return gridItem(armchair);
    };

    const listTemplate = (armchairs, layout) => {
        return <div className="grid grid-nogutter">{armchairs.map((armchair, index) => itemTemplate(armchair, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="headerManager">
                <Button className="buttonAdd" label="הוספת כורסא" onClick={() => {
                    setVisibleAdd(true);
                    setCodeAdd("");
                    setDescriptionAdd("");
                    setStockAdd("");
                    setPriceAdd("");
                    setImgUrlAdd("");
                }} />

                <Toast ref={toast} position='top-center' />
                <Dialog header="כורסא" visible={visibleAdd} style={{ width: '50vw' }} onHide={() => setVisibleAdd(false)} footer={footerContentAdd}>
                    <p className="m-0">
                        <br />
                        <div className="dialogInput">
                            <span className="p-float-label">
                                <InputText
                                    keyfilter="int"
                                    value={codeAdd}
                                    onChange={(e) => {
                                        setCodeAdd(e.target.value)
                                        setCodeDisabledAdd(!e.target.value.trim())
                                    }} />
                                <label htmlFor="קוד">קוד*</label>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="dialogInput">
                            <span className="p-float-label">
                                <InputText keyfilter="int" value={stockAdd} onChange={(e) => setStockAdd(e.target.value)} />
                                <label htmlFor="מלאי">מלאי</label>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="dialogInput">
                            <span className="p-float-label">
                                <InputText keyfilter="int" value={priceAdd} onChange={(e) => {
                                    setPriceAdd(e.target.value)
                                    setPriceDisabledAdd(!e.target.value.trim())
                                }} />
                                <label htmlFor="מחיר">מחיר*</label>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className="dialogInput">
                            <span className="p-float-label">
                                <InputTextarea value={descriptionAdd} onChange={(e) => setDescriptionAdd(e.target.value)} rows={4} cols={23} />
                                <label htmlFor="תיאור מוצר">תיאור מוצר</label>
                            </span>
                        </div>
                        <br />
                        <input type="file" name="image" onChange={handleAddImage} />
                    </p>
                </Dialog>

                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>
            <div>
                <DataView value={armchairs} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </>
    )
}

export default ArmchairsM