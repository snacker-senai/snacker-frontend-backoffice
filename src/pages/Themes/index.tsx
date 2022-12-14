import { useState, useMemo, useRef } from 'react'

import { ColorPicker, ColorPickerChangeParams } from 'primereact/colorpicker';

import PreviewClient from '../../components/PreviewClient'
import './styles.css'
import { Button } from 'primereact/button';
import { ThemesService } from '../../services/themes/ThemesService';
import { Loading } from '../../components/Loading';
import { Toast } from 'primereact/toast';
import { useTheme } from '../../context/ThemeContext';
import { FileUpload } from 'primereact/fileupload';
import InputUploadFile from '../../components/InputUploadFile';

const Themes = () => {
    const themesNow = useTheme().theme
    const [isLoading, setIsLoading] = useState(false)
    const [newThemes, setNewThemes] = useState(themesNow)
    const toast = useRef<any>(null);

    const getColor = (e: ColorPickerChangeParams) => `#${e.value?.toString()}`

    const disabledButton = useMemo(() => JSON.stringify(themesNow) === JSON.stringify(newThemes), [themesNow, newThemes])

    const showSuccess = (sumary: string, detail: string) => {
        toast.current.show({ severity: 'success', summary: sumary, detail: detail, life: 3000 });
    }

    const showError = (sumary: string, detail: string) => {
        toast.current.show({ severity: 'error', summary: sumary, detail: detail, life: 3000 });
    }

    const onClick = async () => {
        setIsLoading(true)

        try {
            await ThemesService.post(newThemes)
            showSuccess('Tema alterado com sucesso!', '')
        } catch (error) {
            console.log(error)
            showError('Falha ao alterar o tema!', '')
        }

        setIsLoading(false)
    }


    const onChangeInputFile = (fileBase64?: string) => {
        setNewThemes({ ...newThemes, icon: fileBase64 })
    }

    return (
        <div className="container-themes">
            <Toast ref={toast} />
            <Loading visible={isLoading} />

            <div className="themes__title">
                <h1 className='title__principal'>Personalização dos temas</h1>
            </div>

            <div className='themes__logo'>
                <InputUploadFile label='Logo' onChange={onChangeInputFile} />
            </div>

            <div className="group-colors">
                <div className="group-color-picker">
                    <ColorPicker value={newThemes.color} onChange={(e) => setNewThemes({ ...newThemes, color: getColor(e) })} />
                    <h5>Cor de fundo primária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={newThemes.secondaryColor} onChange={(e) => setNewThemes({ ...newThemes, secondaryColor: getColor(e) })} />
                    <h5>Cor de fundo secundária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={newThemes.fontColor} onChange={(e) => setNewThemes({ ...newThemes, fontColor: getColor(e) })} />
                    <h5>Cor da letra primária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={newThemes.secondaryFontColor} onChange={(e) => setNewThemes({ ...newThemes, secondaryFontColor: getColor(e) })} />
                    <h5>Cor da letra secundária</h5>
                </div>

                <div className="group-color-picker">
                    <ColorPicker value={newThemes.tertiaryFontColor} onChange={(e) => setNewThemes({ ...newThemes, tertiaryFontColor: getColor(e) })} />
                    <h5>Cor da letra terciária</h5>
                </div>
            </div>

            <PreviewClient {...newThemes} />

            <Button className='theme__button' disabled={disabledButton} type='submit' label='Alterar temas' onClick={onClick}></Button>
        </div>
    )
}

export default Themes