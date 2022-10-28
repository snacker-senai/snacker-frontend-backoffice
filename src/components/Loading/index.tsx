import './styles.css'

export interface LoadingProps {
    visible: boolean
}

const loadingGif = require('./loader.gif')

export const Loading = (props: LoadingProps) => (
    <>
        {props.visible && (
            <div className='spinner-loading'>
                <img className='loading-gif' src={loadingGif} alt="" />
            </div>
        )}
    </>
)



