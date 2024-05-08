import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { } from '../../Store/furnitureApiSlice'
import { useGetFurnitureByCategoryQuery } from '../../Store/furnitureApiSlice'
import { useAddFurnitureForBasketMutation } from '../../Store/basketApiSlice';
import useAuth from '../Hooks/useAuth';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';


const TablesC = () => {

    const [tables, setTables] = useState([]);
    const [allTables, setAllTables] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [search, setSearch] = useState("")

    const { data, isLoading, isError, error, refetch } = useGetFurnitureByCategoryQuery("table")

    useEffect(() => {
        tableFilter()
    }, [from, to, search])


    const tableFilter = () => {
        let filterTables
        
        if(search){
            console.log();
            if (from) {
                if (to) {
                    filterTables = allTables.filter((t) => t.price >= from && t.price <= to && t.description.includes(search))
                }
                else {
                    filterTables = allTables.filter((t) => t.price >= from && t.description.includes(search)) 
                }
            }
            else {
                if (to) {
                    filterTables = allTables.filter((t) => t.price <= to && t.description.includes(search))
                }
                else {
                    filterTables = allTables.filter((t) =>t.description.includes(search))
                }
            }
             
        }
        else{
            if (from) {
                if (to) {
                    filterTables = allTables.filter((t) => t.price >= from && t.price <= to)
                }
                else {
                    filterTables = allTables.filter((t) => t.price >= from)
                }
            }
            else {
                if (to) {
                    filterTables = allTables.filter((t) => t.price <= to)
                }
                else {
                    filterTables = allTables
                }
            }
        }
       
        setTables(filterTables)
    }


    const [addFunc] = useAddFurnitureForBasketMutation()
    const { _id } = useAuth()

    const HandleToBasket = (table) => {
        if (sessionStorage.getItem('token')) {//בשעשה לןגין
            addFunc({ user: _id, furniture: table })
        }
        else {

            const basket = JSON.parse(localStorage.getItem('basket')) || []
            const exsistFurniture = basket.find(f => f.furniture._id === table._id)
            if (exsistFurniture) {
                exsistFurniture.quantity += 1
            }
            else {
                const furnitureForBasket = {
                    furniture: table,
                    quantity: 1
                }
                basket.push(furnitureForBasket)
            }

            localStorage.setItem('basket', JSON.stringify(basket))
        }
    }

    useEffect(() => {
        if (data) {
            setTables(data);
            setAllTables(data);
        }
    }, [data]);

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <h2>{error}</h2>
    }



    const listItem = (table, index) => {
        return (
            <div className="col-12" key={table.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:6789/uploads/${table?.image?.split("\\")[2]}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{table.description}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{table.price} ₪</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => HandleToBasket(table)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (table) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={table.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        {/* <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{table.category}</span>
                        </div> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:6789/uploads/${table?.image?.split("\\")[2]}`} alt={table.name} />
                        <div className="text-2xl font-bold">{table.description}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{table.price} ₪</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => HandleToBasket(table)}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (table, layout, index) => {
        if (!table) {
            return;
        }
        if (layout === 'list') return listItem(table, index);
        else if (layout === 'grid') return gridItem(table);
    };

    const listTemplate = (tables, layout) => {
        console.log(tables);
        return <div className="grid grid-nogutter">{tables.map((table, index) => itemTemplate(table, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="headerCustomer">

                <div>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className="inputSearch" type="search" placeholder='חיפוש...' onChange={(e)=>{setSearch(e.target.value)}}/>
                    </span>
                    <InputText className="inputPrice" keyfilter="int" placeholder='עד מחיר' onChange={(e) => {
                        setTo(e.target.value);
                    }} />
                    <InputText className="inputPrice" keyfilter="int" placeholder='-ממחיר' onChange={(e) => {
                        setFrom(e.target.value);
                    }} />
                </div>

                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={tables} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )

}
export default TablesC