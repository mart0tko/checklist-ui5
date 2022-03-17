import React, { useEffect, useState } from 'react';

function useOpen(isOpen) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setIsDialogOpen(isOpen);
    }, [isOpen]);

    return [isDialogOpen, setIsDialogOpen];
}

export default useOpen;