import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useDeleteFurnitureMutation, useGetAllFurnitureQuery, useUpdateFurnitureMutation } from '../../Store/furnitureApiSlice'
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import '../../CSS/Furniture.css'
import Swal from 'sweetalert2';


const ShopM = () => {

    const [furniture, setFurniture] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [updateFurniture, setUpdateFurniture] = useState(null)


    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [stockUpdate, setStockUpdate] = useState("");
    const [priceUpdate, setPriceUpdate] = useState("");
    const [imgUrlUpdate, setImgUrlUpdate] = useState("");


    const [priceDisabledUpdate, setPriceDisabledUpdate] = useState(false);

    const { data, isLoading, isError, error } = useGetAllFurnitureQuery()


    const handleUpdateImage = (event) => {
        setImgUrlUpdate(event.target.files[0]);
    };

    const [deleteFunc] = useDeleteFurnitureMutation()
    const handleDeleteClick = (furniture) => {
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
                deleteFunc(furniture._id)

                Swal.fire({
                    title: "!Deleted",
                    text: "This furniture has been deleted",
                    icon: "success"
                });
            }
        });
    }

    const [updateFunc] = useUpdateFurnitureMutation()
    const handleUpdateClick = (furniture) => {
        const formData = new FormData()

        formData.append("_id", furniture._id)
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
                handleUpdateClick(updateFurniture)
                setUpdateFurniture(null)
            }} autoFocus />
            <Button label="ביטול" onClick={() => {
                setPriceDisabledUpdate(false)
                setUpdateFurniture(null)
                setVisibleUpdate(false);
            }} className="p-button-text" />
        </div>
    );



    useEffect(() => {
        if (data) {
            setFurniture(data);
        }
    }, [data]);

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <h2>{error}</h2>
    }


    const listItem = (furniture, index) => {
        return (
            <div className="col-12" key={furniture.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:6789/uploads/${furniture?.image?.split("\\")[2]}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">קוד מוצר: {furniture.code}</div>
                            <div className="text-2xl font-bold text-900">{furniture.description}</div>
                            <div className="text-1xl font-bold text-900">המלאי עומד על: {furniture.stock}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{furniture.price} ₪</span>
                            <Button onClick={() => { handleDeleteClick(furniture) }} icon="pi pi-trash" rounded outlined aria-label="Filter" />
                            <Button icon="pi pi-pencil" rounded outlined aria-label="Filter" onClick={() => {
                                setVisibleUpdate(true);
                                setUpdateFurniture(furniture);
                                setDescriptionUpdate(furniture.description);
                                setStockUpdate(furniture.stock);
                                setPriceUpdate(furniture.price);
                                setImgUrlUpdate(furniture.imgUrl);
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

    const gridItem = (furniture) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={furniture.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:6789/uploads/${furniture?.image?.split("\\")[2]}`} alt={furniture.name} />
                        <div className="text-2xl font-bold text-900">קוד מוצר: {furniture.code}</div>
                        <div className="gridDescription">{furniture.description}</div>
                        <div className="text-1xl font-bold text-900">המלאי עומד על: {furniture.stock}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{furniture.price} ₪</span>
                        <span className='icons'>
                            <Button onClick={() => { handleDeleteClick(furniture) }} icon="pi pi-trash" rounded outlined aria-label="Filter" />
                            <Button icon="pi pi-pencil" rounded outlined aria-label="Filter" onClick={() => {
                                setVisibleUpdate(true);
                                setUpdateFurniture(furniture);
                                setDescriptionUpdate(furniture.description);
                                setStockUpdate(furniture.stock);
                                setPriceUpdate(furniture.price);
                                setImgUrlUpdate(furniture.imgUrl);
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
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (furniture, layout, index) => {
        if (!furniture) {
            return;
        }

        if (layout === 'list') return listItem(furniture, index);
        else if (layout === 'grid') return gridItem(furniture);
    };

    const listTemplate = (furniture, layout) => {
        return <div className="grid grid-nogutter">{furniture.map((furniture, index) => itemTemplate(furniture, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="headerManager">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>
            <div>
                <DataView value={furniture} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </>
    )
}

export default ShopM

