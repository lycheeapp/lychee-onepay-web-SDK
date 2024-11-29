import React, { useState } from 'react';
import './Popup.css';
import { FaTimes, FaCheck, FaTimesCircle } from 'react-icons/fa';
import shieldCheckIcon from './assets/images/shield-checkmark.png';  // Adjust the path as needed
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

function Popup({ togglePopup, price, logoImage, apiKey, secretKey, name, urlHost }) {
    const [code, setCode] = useState('');
    const [isValidCode, setIsValidCode] = useState(null); // Initially null, set true or false based on the response
    const [errorMessage, setErrorMessage] = useState(''); // Initially null, set true or false based on the response
    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handlePayment = () => {
        // Simulate an API call to validate the payment
        submitPayment();
    };

    const handleIsValidCode = () => {
        setIsValidCode(null);
    };

    const spacebetween = {
        justifyContent: 'space-between',
    };


    const center = {
        justifyContent: 'center',
    };

    const imagestyle = {
        background: 'white',
        width: '30px',
        height: '30px',
    };

    const flexStyle = {
        flex: '1', // Correctly setting the flex style
    };

    const closebuttonStyle = {
        background: '#EFF1F4',
        borderRadius: '50%',
        padding: '1%',
    };

    const successStyle = {
        color: 'green',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25%',
    };

    const failureStyle = {
        color: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25%',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        marginTop: '20px',
        borderRadius: '50px 50px 50px 50px', // Adjust the values as needed
        border: 'none', // Optional, to remove the default border
    };


    function createSignature(payload, secretKey) {
        try {
            const hmac = sha256(secretKey + payload); // Concatenate secretKey and payload
            const hmacBase64 = Base64.stringify(hmac); // Convert the HMAC to Base64
            return hmacBase64;
        } catch (e) {
            setIsValidCode(false);
        }
    }

    function submitPayment() {
        // Implement the API call to your server here
        var amount = price;
        var deviceUDID = 'adedxd1234312wdxc';
        var signature = createSignature(`amount:${amount}.00$$$code:${code}$$$deviceUDID:${deviceUDID}`, secretKey);
        fetch(urlHost+'/rest/lychee-v2/public/one-pay/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey,
                'X-Signature': signature,
            },
            body: JSON.stringify({
                amount,
                code,
                deviceUDID,
            }),
        })
            .then(response => {
                if (!response.ok) { // Check if response status is not in the range 200-299
                    return response.json().then(errorData => {
                        // Throw an error with the response data to be caught in the catch block
                        return Promise.reject(errorData);
                    });
                }
                return response.json(); // Process the successful response
            })
            .then(data => {
                setIsValidCode(true);
            })
            .catch(error => {
                setIsValidCode(false);
                setErrorMessage(error.message);
                console.error('Error:', error);
            });
    }



    return (
        <div id="sdk-popup" className="popup-overlay">
            <div className="popup">
                {isValidCode === null ? (
                    <>
                        <div className="popup-header">
                            <div style={flexStyle}></div>
                            <h2>Pay with Lychee</h2>
                            <div style={flexStyle}></div>
                            <FaTimes className="close-icon" style={closebuttonStyle} onClick={togglePopup} />
                        </div>

                        <div className="popup-body">
                            <div className="row" style={spacebetween}>
                                <div className="left">
                                    <img src={logoImage} alt="Example logo" className="logo-icon" style={imagestyle} />
                                    <span style={{ fontWeight: 'bold' }}>{name}</span>
                                </div>
                                <div className="right">
                                    <span style={{ color: '#0E76D2', fontWeight: 'bold' }}>ILS {price}</span>
                                </div>
                            </div>

                            <div className="row" >
                                <div className="input-group">
                                    <label htmlFor="code" className='input-label'>Enter your onepay code to pay</label>
                                    <input
                                        id='code'
                                        type="text"
                                        placeholder="9EIMDB"
                                        value={code}
                                        onChange={handleInputChange}
                                        style={{ fontSize: '35px' }}
                                    />
                                    <img src='https://lycheedev.s3-accelerate.amazonaws.com/business-logos/1723063139417OnePayLogo.jpg' alt="Example logo" className="input-icon" />
                                </div>
                            </div>

                            <div className="row">
                                <button
                                    className="pay-now-btn"
                                    disabled={!code}
                                    onClick={handlePayment}
                                >
                                    Pay Now
                                </button>
                            </div>

                            <div className="row" style={center}>
                                <a href="#" className="get-code-link" style={{ borderBottom: '2px solid black', display: 'inline-block' }}>
                                    No voucher? Get a code.
                                </a>
                            </div>

                            <div className="row" style={center}>
                                <img src={shieldCheckIcon} alt="Shield Check" className="shield-icon" style={imagestyle} />

                                <span>Secured by <b>onepay</b>.</span>
                            </div>
                        </div>
                    </>
                ) : isValidCode ? (
                    <div style={{ ...successStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <FaCheck style={{ fontSize: '50px', color: 'white', backgroundColor: 'green', borderRadius: '50%', padding: '10px' }} />
                        <h2 style={{ fontWeight: 'bold', fontSize: '24px', color: 'black' }}>Payment Success!</h2>
                        <p style={{ color: 'black' }}>
                            Your payment of <span style={{ fontWeight: 'bold', color: 'black' }}>ILS {price}</span> has been successfully done.
                        </p>
                        <button style={{ ...buttonStyle, backgroundColor: 'green', color: 'white' }} onClick={togglePopup}>Done</button>
                    </div>
                ) : (
                    <div style={failureStyle}>
                        <FaTimesCircle style={{ fontSize: '50px', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '10px' }} />
                        <h2 style={{ fontWeight: 'bold', fontSize: '24px', color: 'black'  }}>Payment Failed!</h2>
                        <p style={{ color: 'black', marginLeft: '12%' }}>{errorMessage}</p>
                        <button style={{ ...buttonStyle, backgroundColor: '#6c757d', color: 'white' }} onClick={handleIsValidCode}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Popup;
