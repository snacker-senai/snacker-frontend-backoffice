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
        orderHasProductId?: number
    }[]
    buttonLabel: string
    altButtonLabel: string
    handleButtonClick(): void
    handleAltButtonClick(value: number): void
}

export const OrderCard = (props: IOrderCardProps) => {
    return (
        <div className="order-component">
            <div className="order-header">
                <h1 className="table">Mesa {props.table}</h1>
                <h1 className="time">{moment(props.time).format('H:mm:ss')}</h1>
            </div>
            {props.products.map((product) => (
                <div className="order-item" key={`order-item-${product.productName}`}>
                    <div className="item-info">
                        <div className="p-d-flex p-ai-center" style={{ gap: '8px' }}>
                            <div className="item-quantity">{product.quantity}</div>
                            <div className="item-name">{product.productName}</div>
                        </div>
                        <Button
                            label={props.altButtonLabel}
                            onClick={() => props.handleAltButtonClick(product.orderHasProductId!)}
                            icon="pi pi-check"
                        />
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
