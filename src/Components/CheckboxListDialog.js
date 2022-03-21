import React, { useState } from 'react';
import { CheckBox, Dialog, Button } from '@ui5/webcomponents-react';
import { oChecklistFields } from '../constants';

function CheckboxListDialog({ handleCheckboxDialogSubmit, isOpen, onDecline }) {
    const [checkboxes, setCheckboxes] = useState({ ...oChecklistFields });

    const handleSubmit = () => {
        handleCheckboxDialogSubmit(checkboxes);
        setCheckboxes({ ...oChecklistFields });
    };

    const handleDecline = () => {
        setCheckboxes({ ...oChecklistFields });
        onDecline();
    };

    const handleOnCheckboxChange = (oEvent, key) => {
        const isChecked = oEvent.target.checked;
        const bChecked = checkboxes[key];

        if (bChecked !== isChecked) {
            checkboxes[key] = isChecked;
            setCheckboxes({ ...checkboxes });
        }
    }

    return (
        <Dialog open={isOpen}>
            {checkboxes && Object.keys(checkboxes).map((sKey) => (
                <>
                    <CheckBox key={sKey} text={sKey} checked={checkboxes[sKey]} onChange={(e) => handleOnCheckboxChange(e, sKey)} />
                    <br />
                </>
            ))}
            <Button design="Positive" onClick={handleSubmit}>Approve</Button>
            <Button design="Negative" onClick={handleDecline}>Decline</Button>
        </Dialog>
    );
}

export default CheckboxListDialog;