import Modal from 'react-modal'
import { useMedia } from 'react-use-media'
import { Product } from '../../services/product/Models'

import { FaPlus, FaMinus } from 'react-icons/fa'

import { useState } from 'react'

import './styles.css'
import { Button } from 'primereact/button'
import { getPriceFormat } from '../../util/price'

interface Props {
    visible: boolean
    product: Product | null
    onClickBuy: (value: number, quantity: number, comment: string) => void
    onClose: () => void
}

const ModalRequesterProduct = ({ visible, product, onClickBuy, onClose }: Props) => {
    const [comment, setComment] = useState('')
    const [quantity, setQuantity] = useState(1)
    const isTablet = useMedia('(max-width: 1015px)')

    const customStyles = {
        overlay: {
            background: "rgba(0, 0, 0, 0.25)",
            zIndex: 1000
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100vw',
            maxHeight: isTablet ? '100%' : '50%',
            zIndex: 100000,
            background: 'rgb(246, 246, 246)',
            width: isTablet ? '100%' : '30%',
            borderRadius: '10px',
            height: '100%',
        }
    }

    const getPrice = () => getPriceFormat((product ? product.price : 0) * quantity)

    const clearForm = () => {
        setComment('')
        setQuantity(1)
    }

    const handleSubmit = () => {
        onClickBuy((product ? product.price : 0) * quantity, quantity, comment)
        clearForm()
    }

    const onBack = () => {
        clearForm()
        onClose()
    }

    return (
        <Modal ariaHideApp={false} style={customStyles} isOpen={visible}>
            <div className="modal-requester-product">
                <div className="product-header">
                    <i onClick={onBack} className="fa-solid fa-left-long"></i>
                </div>

                <div className="requester-product-content">
                    <p className='title'>{product?.name}</p>
                    <p className='description'>{product?.description}</p>
                </div>

                <div className="requester-product-comment">
                    <p>Algum comentário?</p>
                    <textarea name="" id="" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>

                <div className="requester-product-footer">
                    <div className="quantity">
                        <span onClick={() => setQuantity(quantity - 1)}>
                            <FaMinus />
                        </span>
                        <span className='quantity-value'>
                            {quantity}
                        </span>
                        <span className="plus" onClick={() => setQuantity(quantity + 1)}>
                            <FaPlus />
                        </span>
                    </div>

                    <Button type='submit' label={getPrice()} onClick={handleSubmit}></Button>
                </div>
            </div>
        </Modal >
    )
}



export default ModalRequesterProduct