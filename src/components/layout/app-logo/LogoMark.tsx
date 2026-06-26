// Shared logo + app name "mark" rendered in the header (desktop & mobile, next to the
// hamburger) and in the mobile drawer. Logo priority: live App Builder preview data URL
// → public/logo.<png|jpg|jpeg|webp> → DerivBotWordmark SVG → letter-badge fallback.
import { useEffect, useMemo, useState } from 'react';
import {
    getPreviewAppName,
    getPreviewLogo,
    subscribePreviewAppName,
    subscribePreviewLogo,
} from '@/utils/live-branding-store';
import { isPreviewMode } from '@/utils/is-preview-mode';
import { getAppName, LOGO_CANDIDATES } from '../../../utils/branding';
import { DerivBotWordmark } from './DerivBotWordmark';

type TLogoMarkProps = {
    height?: number;
};

export const LogoMark = ({ height = 32 }: TLogoMarkProps) => {
    const [previewLogo, setPreviewLogo] = useState<string | null>(getPreviewLogo());
    const [previewAppName, setPreviewAppName] = useState<string | null>(getPreviewAppName());
    const [candidateIndex, setCandidateIndex] = useState(0);

    useEffect(() => subscribePreviewLogo(setPreviewLogo), []);
    useEffect(() => subscribePreviewAppName(setPreviewAppName), []);

    const candidates = useMemo(() => {
        const fileFallbacks = isPreviewMode() ? [] : LOGO_CANDIDATES;
        return previewLogo ? [previewLogo, ...fileFallbacks] : [...fileFallbacks];
    }, [previewLogo]);

    useEffect(() => setCandidateIndex(0), [candidates]);

    const appName = previewAppName || getAppName();
    const logoSrc = candidateIndex < candidates.length ? candidates[candidateIndex] : null;
    const badgeLetter = appName.trim().charAt(0).toUpperCase() || 'A';

    // Partner uploaded a custom logo image — show it with their app name
    if (logoSrc) {
        return (
            <span className='app-header__logo-mark'>
                <img
                    data-logo
                    src={logoSrc}
                    alt={appName}
                    className='app-header__logo-img'
                    style={{ height: `${height}px` }}
                    onError={() => setCandidateIndex((index) => index + 1)}
                />
                <span className='app-header__logo-text'>{appName}</span>
            </span>
        );
    }

    // App Builder live preview with a custom name — show letter badge + custom name
    if (previewAppName) {
        return (
            <span className='app-header__logo-mark'>
                <span
                    className='app-header__logo-badge'
                    style={{ height: `${height}px`, width: `${height}px` }}
                    aria-hidden='true'
                >
                    {badgeLetter}
                </span>
                <span className='app-header__logo-text'>{previewAppName}</span>
            </span>
        );
    }

    // Default: show the official Deriv Bot SVG wordmark
    return (
        <span className='app-header__logo-mark'>
            <DerivBotWordmark />
        </span>
    );
};
