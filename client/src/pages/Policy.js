import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
    return (
        <Layout title={'Privacy Policy'}>
            <div className='row policy mt-5'>
                <div className='col-md-6'>
                    <img src="./images/contactus.jpeg" alt="policy" style={{ width: "100%" }} />
                </div>
                <div className='col-md-4 d-flex flex-column justify-content-center'>
                    <p className='text-justify mt-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                        officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                        perferendis eius temporibus dicta blanditiis doloremque explicabo
                        quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                        accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                        commodi illum quidem neque tempora nam.
                    </p>
                </div>
            </div>
        </Layout >
    )
}

export default Policy