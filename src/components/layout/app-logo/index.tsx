// Customizable header logo + app name for white-labeling. Renders on both desktop and
// mobile (next to the hamburger). The logo/name resolution lives in LogoMark: partner
// logo (public/logo.<ext>, written by the BFF at deploy time, or a live data URL pushed
// from the App Builder via PREVIEW_BRANDING) → letter-badge fallback; app name from the
// preview or the resolved deploy/build name.
import './app-logo.scss';

export const AppLogo = () => (
    <a className='app-header__logo' href='/' aria-label='Deriv Bot home'>
        <span className='app-header__db-logo' aria-hidden='true'>
            DB
        </span>
    </a>
);
