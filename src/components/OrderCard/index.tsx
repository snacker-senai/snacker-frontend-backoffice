import React from 'react'
import { Button } from 'primereact/button'

interface IOrderCardProps {
    tableNumber: string
    time: string
    products: {
        name: string
        quantity: number
        details?: string
    }[]
    buttonLabel: string
}

export const OrderCard = (props: IOrderCardProps) => {
    return (
        <div className="order-component">
            <div className="order-header">
                <h1 className="table">Mesa {props.tableNumber}</h1>
                <h1 className="time">{props.time}</h1>
            </div>
            {props.products.map((product) => (
                <div className="order-item">
                    <div className="item-info">
                        <div className="item-name">{product.name}</div>
                        <div className="item-quantity">{product.quantity}</div>
                    </div>
                    {product.details && (
                        <div className="item-observation">{product.details}</div>
                    )}
                </div>
            ))}
            <div className="order-actions">
                <Button label={props.buttonLabel} />
            </div>
        </div>
    )
}
