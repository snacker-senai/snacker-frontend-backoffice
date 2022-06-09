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

    const productTemplate = (product: Product) => {
        return (
            <Card
                key={product.name + product.description}
                title={product.name}
                style={{ width: '17em', height: '100%' }}
                footer={footer(product)}
            >
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <p><strong>Descrição:</strong> {product.description}</p>
                <p><strong>Preço:</strong> {product.price}</p>
                <p><strong>Ativo:</strong> {product.active ? 'Sim' : 'Não'}</p>
                <p><strong>Categoria:</strong> {product.productCategory.name}</p>
            </Card>
        );
    }

    const showError = (sumary, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    return (
        <div className="container-products">
            <Loading visible={showSpinnerLoading} />
            <Toast ref={toast} />
            <ProductDialog onHide={() => loadingAndSetVisibleDialog(false)} visible={visibleDialog} product={productCurrent} />
            <div className="card">
                <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                    itemTemplate={productTemplate} header={header} />
            </div>
        </div >
    )
}