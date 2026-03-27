import { useEffect, useRef } from 'react';

const ProjectBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const GRID_SPACING = 40; // Spacing between dots
        const DOT_RADIUS = 1.5;
        const DOT_OPACITY = 0.3; // Static opacity
        const COLOR = { r: 100, g: 116, b: 139 }; // Subtle gray/blue color

        const drawGrid = () => {
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / GRID_SPACING);
            const rows = Math.ceil(height / GRID_SPACING);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * GRID_SPACING;
                    const y = row * GRID_SPACING;

                    ctx.fillStyle = `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${DOT_OPACITY})`;
                    ctx.beginPath();
                    ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            drawGrid();
        };

        window.addEventListener('resize', handleResize);

        // Draw once (static, no animation loop)
        drawGrid();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: '#000000' }}
        />
    );
};

export default ProjectBackground;
