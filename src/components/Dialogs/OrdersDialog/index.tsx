/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import { OrderWithProducts } from "../../../services/order/Models"
import { OrderService } from "../../../services/order/OrderService"
import { Loading } from "../../Loading"
import './styles.css'

interface IProductWithQuantity {
  productId: number
  productName: string
  quantity: number
  price: number
}

interface IOrderStatus {
  id: number
  name: string
}

interface OrdersDialogProps {
  tableId: number
  visible: boolean
  onHide(): void
}

export const OrdersDialog = ({ tableId, visible, onHide }: OrdersDialogProps) => {
  const [orders, setOrders] = useState<OrderWithProducts[]>([])

  const getOrders = async () => {
    const orders = await OrderService.getOrdersByTableId(tableId)
    console.log(orders)
    setOrders(orders)
  }

  useEffect(() => {
    getOrders()
  }, [tableId])

  const getTotalPrice = () => {
    let totalPrice = 0

    orders.forEach(order => {
      order.productsWithQuantity.forEach(product => totalPrice += product.price * product.quantity)
    })

    return totalPrice
  }

  const renderBillProducts = (products: IProductWithQuantity[], orderStatus: IOrderStatus) => {
    let subtotal = 0

    products.forEach(product => subtotal += product.price * product.quantity)

    return (
      <div className="order-card">
        {products.map((product) => (
          <div className="product-info">
            <div className="product-name">{product.quantity}x {product.productName}</div>
            <div className="product-price">R$ {product.price * product.quantity}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px' }}>
          <div className={`order-status status-${orderStatus.id}`}>{orderStatus.name}</div>
          <div className="subtotal">Subtotal R$ {subtotal}</div>
        </div>
      </div>
    )
  }

  return (
    <Dialog visible={visible} onHide={onHide} style={{ width: '60%' }}>
      <div className="content">
        {!!orders.length && (
          <>
            {orders.map(order => renderBillProducts(order.productsWithQuantity, order.orderStatus))}
          </>
        )}
        {!orders.length && (
          <Loading visible={true} />
        )}
      </div>
      {!!orders.length && (
        <div className="totalPrice">
          Total: R$ {(getTotalPrice())}
        </div>
      )}
      <div className="p-d-flex p-jc-end p-mt-3">
        <Button label="Fechar conta" />
      </div>
    </Dialog>
  )
}