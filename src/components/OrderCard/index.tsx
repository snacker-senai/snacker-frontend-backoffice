import React from 'react'
import { Button } from 'primereact/button'

import './styles.css'
import moment from 'moment'

interface IOrderCardProps {
    table: string
    time: string
    products: {
        productName: string
        quantity: number
        details?: string
    }[]
    buttonLabel: string
    handleButtonClick(): void
}

export const OrderCard = (props: IOrderCardProps) => {
    return (
        <div className="order-component">
            <div className="order-header">
                <h1 className="table">Mesa {props.table}</h1>
                <h1 className="time">{moment(props.time).format('H:mm:ss')}</h1>
            </div>
            {props.products.map((product) => (
                <div className="order-item">
                    <div className="item-info">
                        <div className="item-name">{product.productName}</div>
                        <div className="item-quantity">{product.quantity}</div>
                    </div>
                    {product.details && (
                        <div className="item-observation">{product.details}</div>
                    )}
                </div>
            ))}
            <div className="order-actions">
                <Button label={props.buttonLabel} onClick={props.handleButtonClick} />
            </div>
        </div>
    )
}
