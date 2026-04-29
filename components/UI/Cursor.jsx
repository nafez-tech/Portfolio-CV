import React, { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const mouseElements = document.querySelectorAll("a, button, input, textarea, .cursor-link");

        const handleMouseMove = (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        };

        const handleMouseEnter = () => {
            cursor.classList.add("scale-cursor");
        };

        const handleMouseLeave = () => {
            cursor.classList.remove("scale-cursor");
        };

        document.addEventListener('mousemove', handleMouseMove);

        mouseElements.forEach((mouseElm) => {
            mouseElm.addEventListener("mouseenter", handleMouseEnter);
            mouseElm.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);

            mouseElements.forEach((mouseElm) => {
                mouseElm.removeEventListener("mouseenter", handleMouseEnter);
                mouseElm.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return <div id="cursor" ref={cursorRef}></div>;
};

export default Cursor;
