import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useAddFurnitureMutation, useDeleteFurnitureMutation, useGetFurnitureByCategoryQuery, useUpdateFurnitureMutation } from '../../Store/furnitureApiSlice'
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import '../../CSS/Furniture.css'


const ChairsM = () => {

    const [chairs, setChairs] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [updateChair, setUpdateChair] = useState(null)

    const [codeAdd, setCodeAdd] = useState("");
    const [descriptionAdd, setDescriptionAdd] = useState("");
    const [stockAdd, setStockAdd] = useState("");
    const [priceAdd, setPriceAdd] = useState("");
    const [imgUrlAdd, setImgUrlAdd] = useState("");

    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [stockUpdate, setStockUpdate] = useState("");
    const [priceUpdate, setPriceUpdate] = useState("");
    const [imgUrlUpdate, setImgUrlUpdate] = useState("");

    const [codeDisabled, setCodeDisabled] = useState(true);
    const [priceDisabled, setPriceDisabled] = useState(true);

    const [priceDisabledUpdate, setPriceDisabledUpdate] = useState(false);

    const { data, isLoading, isError, error } = useGetFurnitureByCategoryQuery("chair")

    const handleAddImage = (event) => {
        setImgUrlAdd(event.target.files[0]);
    };

    const handleUpdateImage = (event) => {
        setImgUrlUpdate(event.target.files[0]);
    };

    const [deleteFunc] = useDeleteFurnitureMutation()
    const handleDeleteClick = (chair) => {
        deleteFunc(chair._id)
    }

    const [updateFunc] = useUpdateFurnitureMutation()
    const handleUpdateClick = (chair) => {
        const formData = new FormData()

        formData.append("_id", chair._id)
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
                handleUpdateClick(updateChair)
                setUpdateChair(null)
            }} autoFocus />
            <Button label="ביטול" onClick={() => {
                setPriceDisabledUpdate(false)
                setUpdateChair(null)
                setVisibleUpdate(false);
            }} className="p-button-text" />
        </div>
    );


    const [addFunc] = useAddFurnitureMutation()
    const handleAddClick = () => {
        const formData = new FormData()

        formData.append("code", codeAdd)
        formData.append("category", "chair")
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
            <Button disabled={codeDisabled || priceDisabled} label="שמירה" onClick={() => {
                setVisibleAdd(false);
                setCodeDisabled(true)
                setPriceDisabled(true)
                handleAddClick()
            }} autoFocus />
            <Button label="ביטול" onClick={() => {
                setVisibleAdd(false);
                setCodeDisabled(true)
                setPriceDisabled(true)
            }} className="p-button-text" />
        </div>
    );


    useEffect(() => {
        if (data) {
            setChairs(data);
        }
    }, [data]);

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <h2>{error}</h2>
    }


    const listItem = (chair, index) => {
        return (
            <div className="col-12" key={chair.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:6789/uploads/${chair?.image?.split("\\")[2]}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">קוד מוצר: {chair.code}</div>
                            <div className="text-2xl font-bold text-900">{chair.description}</div>
                            <div className="text-1xl font-bold text-900">המלאי עומד על: {chair.stock}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{chair.price} ₪</span>
                            <Button onClick={() => { handleDeleteClick(chair) }} icon="pi pi-trash" rounded outlined aria-label="Filter" />
                            <Button icon="pi pi-pencil" rounded outlined aria-label="Filter" onClick={() => {
                                setVisibleUpdate(true);
                                setUpdateChair(chair);
                                setDescriptionUpdate(chair.description);
                                setStockUpdate(chair.stock);
                                setPriceUpdate(chair.price);
                                setImgUrlUpdate(chair.imgUrl);
                            }} />

                            <Dialog header="עריכת כסא" visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => setVisibleUpdate(false)} footer={footerContentUpdate}>
                                <p className="m-0">
                                    <br />

                                    <div className="dialogInput">
                                        <span className="p-float-label">
                                            <InputText
                                                keyfilter="int"
                                                value={priceUpdate}
                                                onChange={(e) => {
                                                    setPriceDisabledUpdate(!e.target.value.trim())
                                                    setPriceUpdate(e.target.value)
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

    const gridItem = (chair) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={chair.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:6789/uploads/${chair?.image?.split("\\")[2]}`} alt={chair.name} />
                        <div className="text-2xl font-bold text-900">קוד מוצר: {chair.code}</div>
                        <div className="text-2xl font-bold text-900">{chair.description}</div>
                        <div className="text-1xl font-bold text-900">המלאי עומד על: {chair.stock}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{chair.price} ₪</span>
                        <Button onClick={() => { handleDeleteClick(chair) }} icon="pi pi-trash" rounded outlined aria-label="Filter" />
                        <Button icon="pi pi-pencil" rounded outlined aria-label="Filter" onClick={() => {
                            setVisibleUpdate(true);
                            setUpdateChair(chair);
                            setDescriptionUpdate(chair.description);
                            setStockUpdate(chair.stock);
                            setPriceUpdate(chair.price);
                            setImgUrlUpdate(chair.imgUrl);
                        }} />

                        <Dialog header="עריכת כסא" visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => setVisibleUpdate(false)} footer={footerContentUpdate}>
                            <p className="m-0">
                                <br />

                                <div className="dialogInput">
                                    <span className="p-float-label">
                                        <InputText
                                            keyfilter="int"
                                            value={priceUpdate}
                                            onChange={(e) => {
                                                setPriceDisabledUpdate(!e.target.value.trim())
                                                setPriceUpdate(e.target.value)
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
        );
    };

    const itemTemplate = (chair, layout, index) => {
        if (!chair) {
            return;
        }

        if (layout === 'list') return listItem(chair, index);
        else if (layout === 'grid') return gridItem(chair);
    };

    const listTemplate = (chairs, layout) => {
        return <div className="grid grid-nogutter">{chairs.map((chair, index) => itemTemplate(chair, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="headerManager">
                <Button className="buttonAdd" label="הוספת כסא" onClick={() => {
                    setVisibleAdd(true);
                    setCodeAdd("");
                    setDescriptionAdd("");
                    setStockAdd("");
                    setPriceAdd("");
                    setImgUrlAdd("");
                }} />

                <Dialog header="כסא" visible={visibleAdd} style={{ width: '50vw' }} onHide={() => setVisibleAdd(false)} footer={footerContentAdd}>
                    <p className="m-0">
                        <br />
                        <div className="dialogInput">
                            <span className="p-float-label">
                                <InputText
                                    keyfilter="int"
                                    value={codeAdd}
                                    onChange={(e) => {
                                        setCodeAdd(e.target.value)
                                        setCodeDisabled(!e.target.value.trim())
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
                                    setPriceDisabled(!e.target.value.trim())
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
            <div className="card">
                <DataView value={chairs} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </>
    )
}

export default ChairsM

