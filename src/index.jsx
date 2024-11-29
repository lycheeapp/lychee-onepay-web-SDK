import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from ReactDOM
import Popup from "./Popup";

export function popupRender(element, props) {
    const root = createRoot(element); // Create a root for the provided element
    root.render(<Popup {...props} />);
}
