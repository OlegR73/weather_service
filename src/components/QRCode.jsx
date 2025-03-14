import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

export default function QrCode({ value }) {
  return (
    <div className="qrCodeBox">
      <QRCodeCanvas
        value={`https://openweathermap.org/city/${value}`}
        size={80}
      />
    </div>
  );
}
