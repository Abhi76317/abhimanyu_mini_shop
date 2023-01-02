import React from 'react';

const Container = ({ children }) => {
    return (
        <div style={{marginTop:'60px', width:'100%'}}>
            {children}
        </div>
    );
}

export default Container;
