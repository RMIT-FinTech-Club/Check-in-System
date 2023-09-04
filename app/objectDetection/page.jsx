"use client"
import { WebcamFeed } from "../../components/ObjectDetection";
import { TextDisplay } from "../../components/GetText";
import { useState, useEffect } from 'react';

export default function Page() {

    return (
        <div className="content">
            <h1>Camera Feed</h1>
            <WebcamFeed />
            <TextDisplay />
        </div>
    )
}