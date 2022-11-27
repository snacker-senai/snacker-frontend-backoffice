import { useState, useMemo, useRef } from 'react'

import { ColorPicker, ColorPickerChangeParams } from 'primereact/colorpicker';

import PreviewClient from '../../components/PreviewClient'
import './styles.css'
import { getColorsVariablesCss } from '../../util/variablesStyles';
import { Button } from 'primereact/button';
import { ThemesService } from '../../services/themes/ThemesService';
import { Loading } from '../../components/Loading';
import { Toast } from 'primereact/toast';

export type ColorsThemes = {
    primaryBackgroundColor?: string
    secondaryBackgroundColor?: string
    primaryFontColor?: string
    secondaryFontColor?: string
    thirdFontColor?: string
}

const IMAGE_LOGO = 'https://www.madrugaolanches.com.br/images/logo.png'

const Themes = () => {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useRef<any>(null);

    const [colors, setColors] = useState<ColorsThemes>(getColorsVariablesCss())

    const getColor = (e: ColorPickerChangeParams) => `#${e.value?.toString()}`

    const disabledButton = useMemo(() => JSON.stringify(colors) === JSON.stringify(getColorsVariablesCss()), [colors])


    const showSuccess = (sumary: string, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary: string, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    const onClick = async () => {
        setIsLoading(true)

        try {
            await ThemesService.post(colors, IMAGE_LOGO)
            showSuccess('Tema alterado com sucesso!', '')
        } catch (error) {
            console.log(error)
            showError('Falha ao alterar o tema!', '')
        }

        setIsLoading(false)
    }

    return (
        <div className="container-themes">
            <Toast ref={toast} />
            <Loading visible={isLoading} />

            <div className="themes__title">
                <h1 className='title__principal'>Personalização dos temas</h1>
            </div>

            <div className="group-colors">
                <div className="group-color-picker">
                    <ColorPicker value={colors.primaryBackgroundColor} onChange={(e) => setColors({ ...colors, primaryBackgroundColor: getColor(e) })} />
                    <h5>Cor de fundo primária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={colors.secondaryBackgroundColor} onChange={(e) => setColors({ ...colors, secondaryBackgroundColor: getColor(e) })} />
                    <h5>Cor de fundo secundária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={colors.primaryFontColor} onChange={(e) => setColors({ ...colors, primaryFontColor: getColor(e) })} />
                    <h5>Cor da letra primária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={colors.secondaryFontColor} onChange={(e) => setColors({ ...colors, secondaryFontColor: getColor(e) })} />
                    <h5>Cor da letra secundária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={colors.thirdFontColor} onChange={(e) => setColors({ ...colors, thirdFontColor: getColor(e) })} />
                    <h5>Cor da letra terciária</h5>
                </div>
            </div>

            <PreviewClient {...colors} img={IMAGE_LOGO} />

            <Button className='theme__button' disabled={disabledButton} type='submit' label='Alterar temas' onClick={onClick}></Button>
        </div>
    )
}

export default Themes