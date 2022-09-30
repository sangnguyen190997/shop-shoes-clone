import React from "react";

export default function Videobg() {
  return (
    <div>
      <video className="w-full" loop autoPlay muted playsInline>
        <source src="https://cdn.sanity.io/files/qa41whrn/prod/d177236afc280be2ac111506fcb71b68ef5a1d60.mp4" />
      </video>
    </div>
  );
}
