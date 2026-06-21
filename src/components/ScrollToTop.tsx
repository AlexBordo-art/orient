import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll to the top on every route change. Without this, a new page
// inherits the previous page's scroll offset (land mid-page after a click).
// Honors in-page anchors (#hash) and the browser's back/forward restoration.
const ScrollToTop: React.FC = () => {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (hash) return; // let the browser jump to the anchor
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
