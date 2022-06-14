import React from 'react'
import { OrderCard } from '../../components/OrderCard'

import './styles.css'

export const Orders = () => {
    return (
        <div className="container-orders">
            <OrderCard
                buttonLabel="Finalizar"
                tableNumber="5"
                time="12:30:45"
                products={[
                    {
                        name: 'Pizza de brócolis',
                        quantity: 5,
                        details: 'Sem brócolis'
                    },
                    {
                        name: 'Pizza de cebola',
                        quantity: 2
                    }
                ]}
            />
        </div>
    )
}
