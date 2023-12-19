import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import './Loader.scss'

const Loader = () => {
    return (
        <div className='loader'>
            <ThreeDots
                height="150"
                width="150"
                radius="9"
                color="#0099f8"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default Loader