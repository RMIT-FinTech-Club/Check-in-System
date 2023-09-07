'use client';

import { Button } from "antd";
import { useState } from "react";


export default function LoadingButton({size, api, children, style, onUpdateLoading}) {
    function enterLoading() {
        setLoading(true);
        onUpdateLoading(true);
        setTimeout(() => {
            console.log('first')
            setLoading(false);
            onUpdateLoading(false);
        }, 2000);
    }

    const [loading, setLoading] = useState(false);

    return (
        <Button
        size={size}
        type='primary'
        loading={loading}
        style={style}
        onClick={enterLoading}
        >
            {children}
        </Button>
    )
}