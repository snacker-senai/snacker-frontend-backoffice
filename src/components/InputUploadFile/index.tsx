import './styles.css'

interface Props {
    onChange: (fileBase64?: string) => void
    className?: string
    label: string
}

const InputUploadFile = ({ onChange, label, className }: Props) => {
    const uploadFile = (e) => {
        const file = e?.target?.files?.[0]

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            onChange(fileReader?.result?.toString())
        };
    }

    return (
        <div className="group-input-upload">
            <label className={`input-upload-file ${className}`}>
                {label}
            </label>
            <input type="file" id="images" accept="image/*" onChange={uploadFile} />
        </div>
    )
}

export default InputUploadFile