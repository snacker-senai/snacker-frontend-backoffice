import { useEffect, useState, useRef } from 'react';
import './styles.css'

import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Carousel } from 'primereact/carousel';
import { Toast } from 'primereact/toast';
import { Product } from '../../services/product/Models';
import { ProductDialog } from '../../components/Dialogs/ProductDialog';
import { Loading } from '../../components/Loading';
import { ProductService } from '../../services/product/ProductService';

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [productCurrent, setProductCurrent] = useState<Product | undefined>(undefined)
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
    const toast = useRef<any>(null);

    useEffect(() => {
        buildProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const buildProducts = async () => {
        setShowSpinnerLoading(true)

        try {
            await ProductService.get().then((data: Product[]) => setProducts(data))
        } catch (error: any) {
            console.log(error)
            showError("Erro ao buscar os produtos!", `Erro: ${error.message}`)
        }

        setShowSpinnerLoading(false)
    }

    const loadingAndSetVisibleDialog = (visible: boolean) => {
        setVisibleDialog(visible)
        buildProducts()
    }

    const footer = (product: Product) => {
        return (
            <div className='card-footer'>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        setProductCurrent(product)
                        setVisibleDialog(true)
                    }}
                />
            </div>
        );
    }

    const rightToolbar = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    className="p-inputtext-sm block mb-2"
                    placeholder="Pesquise..."
                />
            </span>
        )
    }

    const leftToolbar = () => {
        return (
            <Button
                label="Adicionar produto"
                icon="pi pi-plus"
                className="p-button-success mr-2"
                onClick={() => {
                    setProductCurrent(undefined)
                    setVisibleDialog(true)
                }}
            />
        )
    }

    const header = <Toolbar className="mb-2" left={leftToolbar} right={rightToolbar}></Toolbar>

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '850px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-products">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />
            <ProductDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} product={productCurrent} />
            <div className="products-list">
                {products.map(product => (
                    <div className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <p className="product-category">{product.productCategory.name}</p>
                            <p className="product-name">{product.name}</p>
                            <p className="product-description">{product.description}</p>
                            <div className="p-d-flex p-justify-between p-mt-4">
                                <p className="product-price">R$ {product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                                {product.active 
                                    ? <p className="product-active">Ativo</p> 
                                    : <p className="product-inactive">Inativo</p>    
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}