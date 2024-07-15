import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetBasketsUserQuery } from '../../Store/basketApiSlice';
import useAuth from '../Hooks/useAuth';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom'
import { useUpdateQuantityMutation, useDeleteFurnitureFromBasketMutation } from '../../Store/basketApiSlice'
import '../../CSS/Basket.css'


const BasketC = () => {

    const [products, setProducts] = useState([]);
    const [localStorageProducts, setLocalStorageProducts] = useState([]);
    const { _id } = useAuth();
    const { data, isLoading, refetch } = useGetBasketsUserQuery(_id);
    const [UpdateQuantityFunc] = useUpdateQuantityMutation()
    const [DeleteFurnitureFromBasketFunc] = useDeleteFurnitureFromBasketMutation()
    const [isEmpty, setIsEmpty] = useState(false);

    const Navigate = useNavigate()

    useEffect(() => {
        if (!_id) {
            const dataLocalStorage = localStorage.getItem('basket');
            setLocalStorageProducts(dataLocalStorage ? JSON.parse(dataLocalStorage) : []);
        }
    }, [_id]);


    useEffect(() => {
        if (data) {
            setProducts(data.items);
        }
    }, [data]);


    useEffect(() => {
        if (!_id) {
            setIsEmpty(localStorageProducts.length === 0);
        }
    }, [localStorageProducts])


    if (isLoading) {
        return <div className='message'>Loading...</div>;
    }
    else {
        if (!data || isEmpty) {
            return <h3 className='message'>אין מוצרים בסל...</h3>
        }
    }


    const UpdateQuantityFromLocal = (furniture, quantity) => {
        const localBasket = localStorage.getItem('basket');
        const tmpf = localBasket ? JSON.parse(localBasket) : [];
        const updatedBasket = tmpf.map(item => {
            if (item.furniture._id === furniture) {
                return { ...item, quantity };
            }
            return item;
        });
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
        setLocalStorageProducts(updatedBasket);
    };


    const DeleteFurnitureFromlocalStorage = (furnitureId) => {
        const localBasket = localStorage.getItem('basket');
        const tmpf = localBasket ? JSON.parse(localBasket) : [];
        const updatedBasket = tmpf.filter(item => item.furniture._id !== furnitureId);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
        setLocalStorageProducts(updatedBasket);
    };


    const itemTemplate = (f, index) => {

        return (

            <div className="col-12" key={f.furniture.id} dir="ltr">
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">


                        <div className="flex justify-content-center">
                            <span className="p-buttonset">
                                <Button icon="pi pi-trash" rounded aria-label="Filter" onClick={() => { _id ? DeleteFurnitureFromBasketFunc({ _id: data._id, furniture: f.furniture._id }) : DeleteFurnitureFromlocalStorage(f.furniture._id) }} />
                            </span>
                        </div>


                        <div id='quantityDiv'>
                            <label htmlFor="change quantity" className="font-bold block mb-2">כמות </label>

                            <InputNumber
                                inputId="change quantity"
                                value={f.quantity}
                                onValueChange={(e) => { _id ? UpdateQuantityFunc({ _id: data._id, furniture: f.furniture._id, quantity: e.value }) : UpdateQuantityFromLocal(f.furniture._id, e.value) }}
                                mode="decimal"
                                showButtons
                                min={1}
                                max={100}
                            />
                            <br /><br />
                            {f.furniture.stock < f.quantity ? <div className='redMessage'>נותרו פריטים {f.furniture.stock} במלאי</div> : <div></div>}
                        </div>

                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{f.furniture.description}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{f.furniture.category}</span>
                                </span>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">₪ {(f.furniture.price) * (f.quantity)}</span>
                            </div>
                        </div>


                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block border-round" src={`http://localhost:6789/uploads/${f.furniture?.image?.split("\\")[2]}`} />


                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {

        if (!items || items.length === 0) return null;

        let list = items.map((f, index) => {
            if (f.furniture != null) {
                return itemTemplate(f, index);
            }

        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <>
            <div>
                <DataView value={_id ? products : localStorageProducts} listTemplate={listTemplate} />
            </div>
            <br />
            <div className="flex flex-wrap justify-content-center gap-3">
                <Button label="תשלום" onClick={() => {
                    refetch()
                    setTimeout(() => {
                        _id ? Navigate("/order") : Navigate("/login")
                    }, 1000)
                }

                } />
            </div>
        </>
    );
}

export default BasketC;