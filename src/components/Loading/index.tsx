import { Circles } from 'react-loader-spinner'

import './styles.css'

export interface LoadingProps {
    visible: boolean
}

export const Loading = (props: LoadingProps) => {
    return (
        <>
            {props.visible &&
                <div className='spinner-loading'>
                    <Circles color="#00BFFF" height={80} width={80} />
                </div>
            }
        </>
    )
}