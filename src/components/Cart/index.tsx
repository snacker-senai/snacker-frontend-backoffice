import './styles.css'

import { useEffect } from 'react'

import Modal from 'react-modal'
import { Button } from 'primereact/button'

import { useMedia } from 'react-use-media';
import { ProductsWithQuantity } from '../../services/order/Models';
import { getPriceFormat } from '../../util/price';
import { Table } from '../../services/table/Models';
import { useMemo, useState } from 'react';


interface Props {
    isVisible: boolean
    tables: Table[]
    products: ProductsWithQuantity[]
    onClickBack: () => void
    onClickSubmit: (tableId: number) => void
    onClickExclued: (product: ProductsWithQuantity) => void
}

const Cart = ({ tables, onClickSubmit, isVisible, products, onClickBack, onClickExclued }: Props) => {
    const [tableSelected, setTableSelected] = useState<number>(0)
    const isTablet = useMedia('(max-width: 1015px)')
    const [optionsTables, setOptionsTables] = useState<any[]>([])
    const customStyles = {
        overlay: {
            background: "rgba(0, 0, 0, 0.25)",
            zIndex: 100000
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100vw',
            maxHeight: isTablet ? '100%' : '90%',
            zIndex: 1000,
            background: 'rgb(246, 246, 246)',
            width: isTablet ? '100%' : '60%',
            borderRadius: '3px',
            height: '100%',
        }
    }

    useEffect(() => {
        let optionsTables: any[] = []

        if (tables.length > 0)
            setTableSelected(tables[0].id)

        const tablesFiltered = tables.filter((table: Table) => (table.active))

        tablesFiltered.forEach((table: Table) => {
            optionsTables.push({
                'name': table.number?.toString(),
                'code': table.id,
            })
        })

        console.log('optionsTables', optionsTables)

        setOptionsTables(optionsTables)
    }, [tables])

    const isEmpty = useMemo(() => products.length === 0, [products])
    console.log(optionsTables)
    return (
        <Modal ariaHideApp={false} style={customStyles} isOpen={isVisible}>
            <div className="cart-header">
                <h1 className='cart-header-title'>Pedidos</h1>
                <i className="fa-solid fa-xmark" onClick={onClickBack}></i>
                <hr />
            </div>

            {!isEmpty && (
                <div className="cart-table">
                    <label>Número da mesa</label>
                    <select className="dropdown" value={tableSelected} onChange={(e) => setTableSelected(Number(e.target.value))}>
                        {optionsTables.map(table => (
                            <option key={`table-${table.code}`} value={table.code} selected={tableSelected === table.code}>{table.name}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className="cart-items">
                {products.length > 0 ? (
                    <>
                        {products?.map((product: ProductsWithQuantity, index: number) => (
                            <div key={`product-${index}`} className={`cart-item ${index === 0 ? 'cart-item-margin' : ''}`}>
                                <div className="cart-information">
                                    <p className='cart-title'>{product.productName}</p>
                                    <p className='cart-description'>{product.details}</p>
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-quantity">
                                        <p>{product.quantity}</p>
                                    </div>

                                    <div className="cart-price">{getPriceFormat(product.price * product.quantity)}</div>
                                    <i className="fa-solid fa-trash" onClick={() => onClickExclued(product)}></i>
                                </div>

                            </div>
                        ))}
                    </>
                ) :
                    (
                        <h2 className='title-empty'>Nenhum produto selecionado!</h2>
                    )
                }
                {!isEmpty && <Button disabled={!tableSelected} type='submit' label='Fazer Pedido' onClick={() => onClickSubmit(tableSelected)}></Button>}
            </div>
        </Modal >
    )

}





export default Cart