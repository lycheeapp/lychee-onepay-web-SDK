# Lychee OnePay SDK

The Lychee OnePay SDK allows you to integrate a secure payment popup into your application. Follow the steps below to include the SDK in your project and start using it.

## Getting Started

### Step 1: Import SDK into Your Project

In your `index.html`, import the necessary files for the Lychee OnePay SDK:

```html
<script src="https://onepay.lycheeapp.org/Lychee-SDK.umd.js"></script>
<link rel="stylesheet" type="text/css" href="https://onepay.lycheeapp.org/style.css">
```

### Step 2: Add the Popup to Your Code

In your code (React example shown here, but you can use any framework), add the following HTML where you want to use the popup:

```jsx
<button onClick={togglePopup}>Lychee One Pay</button>
<div id="popup-root"></div>
```

Ensure you include a `div` with the ID you intend to use, such as `popup-root`.

### Step 3: Implement the Toggle Function and Use the SDK

Add the following JavaScript code to handle the popup:

```jsx
const [show, setShow] = useState(false);

function togglePopup() {
  setShow(prevState => !prevState);
}

React.useEffect(() => {
  const popup = document.getElementById("sdk-popup");

  if (show) {
    const container = document.getElementById('popup-root');
    window.Lychee_SDK.popupRender(container, {
      togglePopup: togglePopup,
      price: <price>,
      logoImage: <store logo url>,
      apiKey: <Lychee onepay API key>,
      secretKey: <Lychee onepay Secret Key>,
      name: <Store name>,
      urlHost: <Lychee host>
    });
  } else {
    popup && popup.remove();
  }
}, [show]);
```

**Note:** Do not change the ID `sdk-popup`, as it is used by the library. The popup will be added to the container with the specified ID (`popup-root` in this example).

## Parameters

* **price**: The total price of the items purchased by the user.
* **logoImage**: URL of your store's logo.
* **apiKey**: The API key provided by Lychee when you register as a store.
* **secretKey**: The secret key provided by Lychee when you register as a store. **Do not share this value with any party.**
* **name**: Your store name.
* **urlHost**: The Lychee host URL, which will be provided to you along with the API key and secret key.

## Example Usage

Here's how you can use the SDK within a React component. Modify the values according to your requirements:

```jsx
const [show, setShow] = useState(false);

function togglePopup() {
  setShow(prevState => !prevState);
}

React.useEffect(() => {
  const popup = document.getElementById("sdk-popup");

  if (show) {
    const container = document.getElementById('popup-root');
    window.Lychee_SDK.popupRender(container, {
      togglePopup: togglePopup,
      price: 99.99,
      logoImage: "https://example.com/logo.png",
      apiKey: "YOUR_API_KEY",
      secretKey: "YOUR_SECRET_KEY",
      name: "Your Store Name",
      urlHost: "https://your-lychee-host.com"
    });
  } else {
    popup && popup.remove();
  }
}, [show]);
```

## Additional Notes

* Ensure that you use secure methods to store and handle the `apiKey` and `secretKey`.
* The popup will appear when the `togglePopup` function is triggered (e.g., by clicking the button).

For more detailed information, refer to the official Lychee OnePay documentation.