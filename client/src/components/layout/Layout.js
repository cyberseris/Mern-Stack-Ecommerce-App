import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
/* import { Toaster } from 'react-hot-toast'; */
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '70vh' }}>
                <Toaster />
                {/* <ToastContainer /> */}
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: 'Ecommerce app - shop now',
    description: 'mern stack project',
    keywords: 'mern, react, node, mongodb',
    author: 'Seris'
}

export default Layout;
