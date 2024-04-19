import { useCallback, useMemo, useState, ChangeEvent, useEffect } from "react";
import Visibility from "../Visibility";

export default function App() {

    const [imageDataURL, setImageDataURL] = useState<string>();
    const [downloadHref, setDownloadHref] = useState<string>();

    const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
    const [showDownloadLink, setShowDownloadLink] = useState<boolean>(false);

    const handleFileInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (!event.target) return;

            const dataUrl = event.target.result;
            setImageDataURL(dataUrl?.toString())
        };

    }, []);

    const handleImageLoad = (image: HTMLImageElement) => {

        const canvasElement = document.querySelector("canvas");
        if (!canvasElement) return;

        const ctx = canvasElement.getContext('2d');

        if (ctx) {
            const borderWidth = image.width * 0.05;

            canvasElement.width = image.width + (borderWidth * 2);
            canvasElement.height = image.height + (borderWidth * 2);

            // Add background rectangle which will become border
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            ctx.drawImage(image, borderWidth, borderWidth);
            setShowImagePreview(true);

            const _downloadHref = canvasElement.toDataURL();
            setDownloadHref(_downloadHref);
            setShowDownloadLink(true);
        }
    }

    useEffect(() => {
        if (!imageDataURL) return;
        const image = new Image();
        image.src = imageDataURL;
        image.onload = () => handleImageLoad(image)
    }, [imageDataURL])



    return (
        <>
            <input type="file" accept="image/*" onChange={handleFileInputChange}></input>

            <Visibility visible={showImagePreview}>
                <canvas id="canvas" />
            </Visibility>

            <Visibility visible={showDownloadLink}>
                <a href={downloadHref} download>Download</a>
            </Visibility>
        </>
    )

}