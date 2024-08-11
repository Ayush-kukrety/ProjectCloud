'use client'
import { DNA } from 'react-loader-spinner';
export default function Loader() {
    return (
        <div className='min-h-screen bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text flex justify-center items-center'>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"

            />
        </div>
    )
}
