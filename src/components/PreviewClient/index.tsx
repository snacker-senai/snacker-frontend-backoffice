import './styles.css'

interface Props {
    primaryBackgroundColor?: string
    secondaryBackgroundColor?: string
    primaryFontColor?: string
    secondaryFontColor?: string
    thirdFontColor?: string
    img?: string
}

const PreviewClient = ({
    primaryBackgroundColor,
    secondaryBackgroundColor,
    primaryFontColor,
    secondaryFontColor,
    thirdFontColor,
    img,
}: Props) => (
    <div className="preview-client">
        <div className="header">
            <div className="header-principal" style={{ backgroundColor: `${primaryBackgroundColor}` }}>
                {img && <img src={img} alt="Logo do restaurante" />}
                <p className="title" style={{ color: `${primaryFontColor}` }}>Mesa 1</p>
                <div className="header-principal__end"></div>
            </div>
            <div className="subheader" style={{ backgroundColor: `${secondaryBackgroundColor}` }}>
                <p style={{ color: `${secondaryFontColor}` }}>Lanche</p>
                <p style={{ color: `${thirdFontColor}` }} className='subheader__deactive'>Pizza</p>
                <p style={{ color: `${thirdFontColor}` }} className='subheader__deactive'>Bebidas</p>
            </div>
        </div>

        <input disabled className='preview-button' type="text" placeholder='Busque pelo produto' />

        <h3 className='preview-categories-title'>Bebidas</h3>
        <div className="preview-categories">

            <div className="preview__products">

                <div className='preview__card'>
                    <div className="content-left">
                        <p className='title'>Coca Cola</p>
                        <p className="description">Bebida</p>
                        <p className="price">R$ 10,00</p>
                    </div>
                    <div className="content-right">
                        <img src="https://www.imigrantesbebidas.com.br/bebida/images/products/full/1984-refrigerante-coca-cola-lata-350ml.jpg" alt="" />
                    </div>
                </div>

                <div className="preview__card">
                    <div className="content-left">
                        <p className='title'>Pepsi</p>
                        <p className="description">Bebida</p>
                        <p className="price">R$ 10,00</p>
                    </div>
                    <div className="content-right">
                        <img src="https://m.media-amazon.com/images/I/61N5OnOkgfL._AC_SY679_.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default PreviewClient